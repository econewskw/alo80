
## الهدف
إصلاح مشكلة أن أزرار التمرير في الموبايل (Android / Chrome) تعمل مرة واحدة فقط، بحيث تعمل كل مرة بدون الحاجة لتحديث الصفحة.

---

## ما اكتشفته في الكود الحالي (سبب محتمل للمشكلة)
1) **هناك `scroll-behavior: smooth` مفعّلة على عنصر `html` في `src/index.css`**  
   هذا يجعل كل عمليات التمرير البرمجية “ناعمة” بشكل افتراضي، وأحيانًا يتسبب في سلوك غير مستقر على بعض أجهزة Android عند الجمع بين:
   - CSS smooth scroll
   - و `window.scrollTo({ behavior: "smooth" })` في JavaScript

2) **التمرير الحالي يعتمد على `window.scrollTo(...)` وحسابات مكان العنصر**  
   رغم أن التحسين السابق (requestAnimationFrame + pageYOffset) جيد، إلا أن Android Chrome قد “يتجاهل” استدعاءات smooth scroll أحيانًا بعد أول مرة (خصوصًا إذا كان هناك تركيز Focus على عنصر/كيبورد، أو حصلت حركة سحب/Scroll بيد المستخدم بين الضغطات).

3) **عناصر زخرفية `absolute` في الـ Hero قد تلتقط اللمس على الموبايل أحيانًا**  
   في `HeroSection` يوجد عناصر زخرفية `absolute` كبيرة (دوائر blur). بدون `pointer-events: none` قد يحدث أن تضغط على منطقة فوق الزر فعليًا لكن الحدث يذهب للعنصر الزخرفي وليس للزر (سلوك يظهر أكثر على شاشات الموبايل بسبب تداخل الطبقات).

---

## التغييرات المقترحة (حل عملي ومستقر على Android Chrome)
سأعالج المشكلة من جهتين: (أ) ضمان أن الضغط يصل للزر دائمًا، (ب) جعل التمرير نفسه أكثر “مناعة” ضد مشاكل smooth scroll على Android.

### 1) منع العناصر الزخرفية من التقاط اللمس (HeroSection)
**الملف:** `src/components/HeroSection.tsx`

- إضافة `pointer-events-none` + ترتيب طبقات واضح:
  - للدوائر الزخرفية + موجة الـ SVG في الأسفل: `pointer-events-none` ويفضل وضعها “خلف” المحتوى بـ `-z-10` أو جعل محتوى الـ container `relative z-10`.

**النتيجة:** الضغط على الأزرار سيصل لها دائمًا حتى لو كان هناك عنصر زخرفي يغطي المنطقة بصريًا.

---

### 2) تغيير طريقة التمرير إلى `scrollIntoView` مع Offset نظيف (بدون حسابات Y يدوية قدر الإمكان)
بدل الاعتماد على `getBoundingClientRect + scrollTop + window.scrollTo(smooth)`، سنستخدم:
- `element.scrollIntoView(...)` (عادةً أكثر ثباتًا على الموبايل)
- ونضيف Offset باستخدام CSS `scroll-margin-top` عبر Tailwind (`scroll-mt-*`)

**الملف:** `src/components/ContactSection.tsx`

- إضافة `scroll-mt-5` (أو قيمة مناسبة) إلى العناصر الهدف:
  - `#contact-info`
  - `#contact-form`

مثال (تصوّر):
- `<div id="contact-info" className="... scroll-mt-5">`
- و `motion.div` الخاص بـ `id="contact-form"`: إضافة `scroll-mt-5` داخل `className`.

**النتيجة:** التمرير يقف في مكان صحيح مع مسافة بسيطة أعلى العنصر بدون أي حسابات في JavaScript.

---

### 3) تقوية دالة التمرير ضد مشاكل Android (إلغاء أي scroll ناعم عالق + blur للتركيز + fallback)
**الملف:** `src/components/HeroSection.tsx`

سأحدث `scrollToElement` لتصبح بالشكل التالي (منطقيًا):

1) العثور على العنصر بالـ id، وإن لم يوجد نخرج.
2) **إزالة التركيز** من أي عنصر نشط (مفيد جدًا لو كان المستخدم تعامل مع inputs/keyboard سابقًا):
   - `if (document.activeElement instanceof HTMLElement) document.activeElement.blur();`
3) **إلغاء أي smooth scroll سابق** قبل بدء تمرير جديد:
   - `window.scrollTo({ top: window.scrollY, behavior: "auto" });`
4) داخل `requestAnimationFrame`:
   - `element.scrollIntoView({ block: "start", behavior: "auto" });`
   ملاحظة: استخدام `behavior: "auto"` هنا مقصود لتجنب مشاكل Android مع `behavior:"smooth"`، لأن الـ CSS عندنا يطبق smooth أساسًا (وسنعالجه بالخطوة التالية).
5) **Fallback (اختياري لكن قوي)**: بعد 250–400ms نفحص إن لم تتحرك الصفحة فعليًا، نجرب مرة ثانية بتمرير “فوري” إلى نفس الهدف (auto) لضمان عدم الفشل.

---

### 4) تعديل CSS الخاص بالـ smooth scroll ليكون أقل تسببًا بالمشاكل ويحترم تقليل الحركة
**الملف:** `src/index.css`

بدل:
```css
html { scroll-behavior: smooth; }
```

سنحوّله إلى:
- smooth فقط عندما المستخدم لا يفعّل “تقليل الحركة”:
```css
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}
```

**النتيجة:** سلوك أنظف على الأجهزة + تحسين وصول (Accessibility) + تقليل احتمالات تعارضات Android.

---

## قائمة الملفات المتأثرة
- `src/components/HeroSection.tsx`
  - إضافة `pointer-events-none` / ضبط z-index للعناصر الزخرفية
  - تحديث `scrollToElement` ليستخدم `scrollIntoView` + cancel/blur/fallback
- `src/components/ContactSection.tsx`
  - إضافة `scroll-mt-*` للـ targets: `contact-info` و `contact-form`
- `src/index.css`
  - نقل `scroll-behavior: smooth` إلى media query لـ `prefers-reduced-motion`

---

## معايير النجاح (Acceptance Criteria)
على Android Chrome:
1) اضغط “اتصل الآن” → ينقلك إلى “معلومات التواصل”.
2) ارجع لأعلى (بالسكرول اليدوي) → اضغط “اتصل الآن” مرة ثانية → يعمل مباشرة.
3) كرر نفس الشيء 5 مرات متتالية بدون تحديث الصفحة.
4) جرّب أيضًا بعد فتح/إغلاق الكيبورد (مثلاً لمس حقل في الفورم ثم الرجوع للأعلى) ثم الضغط مرة أخرى.

---

## ملاحظات تقنية (مهمة)
- `scrollIntoView` مع `scroll-mt-*` عادةً يعطي أفضل توافق على الموبايل من حسابات `getBoundingClientRect` + `window.scrollTo`.
- `pointer-events-none` على العناصر الزخرفية يزيل احتمال “الضغط لا يصل للزر” وهو سبب شائع جدًا على الموبايل بسبب طبقات overlay الشفافة.
