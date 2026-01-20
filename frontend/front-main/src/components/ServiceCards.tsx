import React from "react";
import { Wrench, Car, ShieldCheck } from "lucide-react";

const ServiceCards: React.FC = () => {
  const services = [
    { icon: <Wrench size={40} />, title: "Mechanika pojazdowa", desc: "Kompleksowe naprawy mechaniczne aut osobowych i dostawczych." },
    { icon: <ShieldCheck size={40} />, title: "Diagnostyka komputerowa", desc: "Nowoczesna diagnostyka, szybka analiza usterek i błędów." },
    { icon: <Car size={40} />, title: "Pomoc drogowa 24h", desc: "Awaria na drodze? Nasza pomoc drogowa działa całą dobę!" },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-10 px-6">
      {services.map((service, index) => (
        <div
          key={index}
          className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center hover:shadow-lg transition"
        >
          <div className="text-blue-700 mb-4">{service.icon}</div>
          <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
          <p className="text-gray-600 text-center">{service.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceCards;
