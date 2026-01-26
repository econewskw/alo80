import logo from "@/assets/alo80-logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Alo 80" className="h-10 brightness-0 invert" />
          </div>
          
          <div className="flex items-center gap-6 text-primary-foreground/80">
            <a href="#services" className="hover:text-accent transition-colors">الخدمات</a>
            <a href="#features" className="hover:text-accent transition-colors">المميزات</a>
            <a href="#contact" className="hover:text-accent transition-colors">تواصل معنا</a>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} Alo 80. جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
