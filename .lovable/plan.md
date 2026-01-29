
# خطة إصلاح مشكلة التمرير على الموبايل (Android Chrome)

## المشكلة
عند الضغط على أزرار التمرير مثل "اتصل الآن" أو "تعرف على المزيد" على هاتف Android باستخدام Chrome، التمرير يعمل مرة واحدة فقط. الضغطات اللاحقة لا تعمل إلا بعد تحديث الصفحة.

## تحليل السبب الجذري

الكود الحالي يستخدم `setTimeout` مع تأخير 10ms:

```typescript
const scrollToElement = (elementId: string) => {
  setTimeout(() => {
    const element = document.getElementById(elementId);
    if (element) {
      const yOffset = -20;
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.scrollY;
      const offsetPosition = absoluteElementTop + yOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, 10);
};
```

**أسباب المشكلة:**

1. `setTimeout` لا يتزامن مع دورة رسم المتصفح مما يسبب حسابات خاطئة للموقع
2. `window.scrollY` قد لا يُرجع قيمة صحيحة على بعض متصفحات Android
3. الأزرار بدون `type="button"` قد تتداخل مع سلوكيات المتصفح

## الحل

### التغيير في `src/components/HeroSection.tsx`

**1. تحديث دالة `scrollToElement`:**

```typescript
const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  requestAnimationFrame(() => {
    const yOffset = -20;
    const elementRect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetPosition = elementRect.top + scrollTop + yOffset;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
};
```

**2. إضافة `type="button"` للأزرار:**

```tsx
<Button 
  type="button"
  variant="accent" 
  size="lg" 
  onClick={() => scrollToElement('contact-form')}
>
  احصل على عرض
</Button>

<Button 
  type="button"
  variant="accent" 
  size="xl"
  onClick={() => scrollToElement('contact-info')}
>
  <Phone className="ml-2 h-5 w-5" />
  اتصل الآن
</Button>

<Button 
  type="button"
  variant="outline" 
  size="xl"
  onClick={() => scrollToElement('contact-form')}
>
  تعرف على المزيد
</Button>
```

## الملفات المتأثرة

| الملف | التغيير |
|-------|---------|
| `src/components/HeroSection.tsx` | تحديث دالة التمرير + إضافة `type="button"` |

## لماذا هذا الحل يعمل؟

| المشكلة | الحل |
|---------|------|
| `setTimeout` غير متزامن مع الرسم | `requestAnimationFrame` يتزامن مع دورة رسم المتصفح |
| `window.scrollY` غير موثوق | `window.pageYOffset \|\| document.documentElement.scrollTop` أكثر توافقية |
| سلوك زر غير متوقع | `type="button"` يمنع أي سلوك افتراضي |

## خطوات التنفيذ

1. تحديث دالة `scrollToElement` لاستخدام `requestAnimationFrame`
2. إضافة `type="button"` لجميع الأزرار الثلاثة
3. اختبار على Android Chrome للتأكد من حل المشكلة
