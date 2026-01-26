import { motion } from "framer-motion";
import { Check } from "lucide-react";

const features = [
  "فريق محترف ومدرب على أعلى مستوى",
  "تقنيات حديثة ومتطورة",
  "تقارير دورية مفصلة",
  "مرونة في الخطط والأسعار",
  "دعم متعدد اللغات",
  "تكامل مع أنظمتك الحالية",
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-card p-4 sm:p-8 rounded-2xl shadow-card text-center"
              >
                <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-accent mb-1 sm:mb-2">+500</div>
                <div className="text-muted-foreground font-medium text-sm sm:text-base">عميل راضٍ</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-card p-4 sm:p-8 rounded-2xl shadow-card text-center"
              >
                <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-primary mb-1 sm:mb-2">24/7</div>
                <div className="text-muted-foreground font-medium text-sm sm:text-base">خدمة متواصلة</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-card p-4 sm:p-8 rounded-2xl shadow-card text-center"
              >
                <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-accent mb-1 sm:mb-2">+1M</div>
                <div className="text-muted-foreground font-medium text-sm sm:text-base">مكالمة شهرياً</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-card p-4 sm:p-8 rounded-2xl shadow-card text-center"
              >
                <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-primary mb-1 sm:mb-2">98%</div>
                <div className="text-muted-foreground font-medium text-sm sm:text-base">نسبة الرضا</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Features list */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              لماذا تختار <span className="text-gradient">Alo 80</span>؟
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              نحن شريكك الموثوق في تقديم تجربة عملاء استثنائية تميز علامتك التجارية
            </p>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <span className="text-foreground font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
