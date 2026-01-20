import React from "react";
import { useNavigate } from "react-router-dom";
import ServiceCards from "./ServiceCards";
import { LogIn, UserPlus } from "lucide-react";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col pt-20 bg-white text-gray-800">
      <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 text-center">
        <div className="max-w-2xl">
          <h1 className="text-7xl md:text-5xl font-extrabold mb-4 drop-shadow-xl">
            Twoje Auto w Najlepszych Rękach
          </h1>
          <p className="text-lg md:text-2xl mb-6 opacity-90">
            Warsztat samochodowy 24h | Serwis, diagnostyka, naprawy
          </p>
          <button
            onClick={() => navigate("/services")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300"
          >
            Dowiedz się więcej
          </button>
        </div>
      </section>

      <section className="py-16 bg-gray-100 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-10">
          Nasze Usługi
        </h2>
        <ServiceCards />
      </section>

      <section className="py-16 bg-white text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-10">
          Dlaczego My?
        </h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {[
            {
              title: "Nowoczesny sprzęt",
              desc: "Używamy najlepszej diagnostyki i technologii dla Twojego auta.",
            },
            {
              title: "Doświadczeni mechanicy",
              desc: "Nasz zespół to lata praktyki i tysiące naprawionych aut.",
            },
            {
              title: "Szybkie terminy",
              desc: "Gwarantujemy ekspresowe przyjęcia i krótkie czasy realizacji.",
            },
          ].map(({ title, desc }, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-md transition"
            >
              <h3 className="text-2xl font-semibold mb-3 text-blue-800">
                {title}
              </h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-blue-700 text-white text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Dołącz do nas i umów swoją wizytę już dziś!
        </h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8">
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-blue-700 font-semibold py-3 px-8 rounded-full shadow-md hover:bg-gray-200 transition flex items-center gap-2"
          >
            <LogIn size={20} /> Zaloguj się
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition flex items-center gap-2"
          >
            <UserPlus size={20} /> Zarejestruj się
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
