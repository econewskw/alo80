import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            تواصل <span className="text-gradient">معنا</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            نحن هنا لمساعدتك! تواصل معنا واحصل على استشارة مجانية
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="bg-gradient-primary p-8 rounded-2xl text-primary-foreground">
              <h3 className="text-2xl font-bold mb-6">معلومات التواصل</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                    <Phone className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <div className="text-primary-foreground/70 text-sm">اتصل بنا</div>
                    <div className="text-lg font-semibold" dir="ltr">1808080 - 1808082</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                    <Mail className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <div className="text-primary-foreground/70 text-sm">البريد الإلكتروني</div>
                    <div className="text-lg font-semibold">cco@alo80.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <div className="text-primary-foreground/70 text-sm">العنوان</div>
                    <div className="text-lg font-semibold">الكويت</div>
                  </div>
                </div>
              </div>
              
              {/* Social Media Icons */}
              <div className="pt-4 border-t border-primary-foreground/20">
                <div className="text-primary-foreground/70 text-sm mb-4">تابعنا على</div>
                <div className="flex items-center gap-3">
                  <a 
                    href="https://wa.me/9651808080" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <WhatsAppIcon />
                  </a>
                  <a 
                    href="https://www.instagram.com/alo80kwt/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Instagram className="h-6 w-6 text-accent-foreground" />
                  </a>
                  <a 
                    href="https://www.instagram.com/alo80kwt/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <XIcon />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-card p-8 rounded-2xl shadow-card border border-border/50"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">أرسل رسالتك</h3>
            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input 
                  placeholder="الاسم الكامل" 
                  className="h-12 bg-secondary border-0 text-right"
                />
                <Input 
                  type="email" 
                  placeholder="البريد الإلكتروني" 
                  className="h-12 bg-secondary border-0 text-right"
                />
              </div>
              <Input 
                type="tel" 
                placeholder="رقم الهاتف" 
                className="h-12 bg-secondary border-0 text-right"
              />
              <Input 
                placeholder="اسم الشركة" 
                className="h-12 bg-secondary border-0 text-right"
              />
              <Textarea 
                placeholder="رسالتك..." 
                className="min-h-[120px] bg-secondary border-0 text-right resize-none"
              />
              <Button variant="accent" size="xl" className="w-full">
                <Send className="ml-2 h-5 w-5" />
                إرسال الرسالة
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
