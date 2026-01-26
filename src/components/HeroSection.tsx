import { motion } from "framer-motion";
import { Phone, Headphones, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileNav from "@/components/MobileNav";
import logo from "@/assets/alo80-logo.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 pt-8">
        {/* Navigation */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between py-4"
        >
          <img src={logo} alt="Alo 80" className="h-12 md:h-16" />
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-foreground/80 hover:text-accent transition-colors font-medium">الخدمات</a>
            <a href="#features" className="text-foreground/80 hover:text-accent transition-colors font-medium">المميزات</a>
            <a href="#contact" className="text-foreground/80 hover:text-accent transition-colors font-medium">تواصل معنا</a>
          </div>
          <Button variant="accent" size="lg" className="hidden md:flex">
            احصل على عرض
          </Button>
          <MobileNav />
        </motion.nav>

        {/* Hero Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 pt-16 md:pt-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 text-center lg:text-right"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              حلول <span className="text-gradient">كول سنتر</span>
              <br />
              متكاملة لأعمالك
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 lg:mr-0">
              نقدم لك خدمات مركز اتصال احترافية على مدار الساعة، مع فريق مدرب وتقنيات حديثة لتعزيز تواصلك مع عملائك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="accent" size="xl">
                <Phone className="ml-2 h-5 w-5" />
                اتصل الآن
              </Button>
              <Button variant="outline" size="xl">
                تعرف على المزيد
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 relative"
          >
            <div className="relative">
              {/* Floating icons */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 right-10 bg-card p-4 rounded-2xl shadow-card"
              >
                <Headphones className="h-8 w-8 text-accent" />
              </motion.div>
              <motion.div 
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 -left-4 bg-card p-4 rounded-2xl shadow-card"
              >
                <MessageCircle className="h-8 w-8 text-primary" />
              </motion.div>
              <motion.div 
                animate={{ y: [-5, 15, -5] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 right-20 bg-card p-4 rounded-2xl shadow-card"
              >
                <Phone className="h-8 w-8 text-accent" />
              </motion.div>

              {/* Main illustration circle */}
              <div className="w-72 h-72 md:w-96 md:h-96 mx-auto bg-gradient-accent rounded-full flex items-center justify-center shadow-accent">
                <div className="w-56 h-56 md:w-72 md:h-72 bg-card rounded-full flex items-center justify-center shadow-soft">
                  <img src={logo} alt="Alo 80" className="w-40 md:w-52" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
