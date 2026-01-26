import { motion } from "framer-motion";
import { Phone, Clock, Users, Headphones, BarChart3, Shield } from "lucide-react";

const services = [
  {
    icon: Phone,
    title: "المكالمات الواردة",
    description: "استقبال وإدارة جميع المكالمات الواردة من عملائك باحترافية عالية",
  },
  {
    icon: Headphones,
    title: "المكالمات الصادرة",
    description: "حملات اتصال فعالة للتسويق والمبيعات ومتابعة العملاء",
  },
  {
    icon: Clock,
    title: "خدمة 24/7",
    description: "دعم متواصل على مدار الساعة طوال أيام الأسبوع",
  },
  {
    icon: Users,
    title: "إدارة علاقات العملاء",
    description: "نظام متكامل لإدارة وتتبع تفاعلات العملاء",
  },
  {
    icon: BarChart3,
    title: "تقارير وتحليلات",
    description: "تقارير تفصيلية ولوحات تحكم لمتابعة الأداء",
  },
  {
    icon: Shield,
    title: "أمان البيانات",
    description: "حماية متقدمة لبيانات عملائك وفق أعلى المعايير",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            خدماتنا <span className="text-gradient">المتكاملة</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            نوفر لك مجموعة شاملة من خدمات الكول سنتر لتلبية جميع احتياجات عملك
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-card p-8 rounded-2xl shadow-soft hover:shadow-card transition-all duration-300 border border-border/50"
            >
              <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-300">
                <service.icon className="h-7 w-7 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
