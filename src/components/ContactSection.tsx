import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
                    <div className="text-lg font-semibold" dir="ltr">+966 XX XXX XXXX</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                    <Mail className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <div className="text-primary-foreground/70 text-sm">البريد الإلكتروني</div>
                    <div className="text-lg font-semibold">info@alo80.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <div className="text-primary-foreground/70 text-sm">العنوان</div>
                    <div className="text-lg font-semibold">المملكة العربية السعودية</div>
                  </div>
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
