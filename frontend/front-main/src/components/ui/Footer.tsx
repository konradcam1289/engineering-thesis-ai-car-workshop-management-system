import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-700 text-white py-6 mt-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <p className="text-sm">&copy; {new Date().getFullYear()} CarWorkshop. Wszelkie prawa zastrzeżone.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="/services" className="hover:text-orange-400 transition">Usługi</a>
          <a href="/contact" className="hover:text-orange-400 transition">Kontakt</a>
          <a href="/about" className="hover:text-orange-400 transition">O nas</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
