import React from "react";
import { FaTools } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";

import audiImg from "../../assets/audi.jpg";
import bmwImg from "../../assets/bmw.jpg";
import mercedesImg from "../../assets/mercedes.jpg";

const About: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto mt-20 p-8 bg-white rounded-xl shadow-xl">
            <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center flex items-center justify-center gap-2">
                <FaTools /> O nas
            </h1>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Kim jesteśmy?</h2>
                <p className="text-gray-600 text-lg">
                    AutoWorkshop to profesjonalny serwis samochodowy działający od ponad 15 lat na rynku.
                    Naszą misją jest dostarczanie usług najwyższej jakości w przystępnych cenach. 
                    Nasz zespół to doświadczeni mechanicy i diagności, którzy z pasją dbają o każdy pojazd.
                </p>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Dlaczego warto nas wybrać?</h2>
                <ul className="text-gray-600 text-lg space-y-2">
                    <li className="flex items-center gap-2">
                        <BsCheckCircleFill className="text-green-500" /> Nowoczesne zaplecze diagnostyczne
                    </li>
                    <li className="flex items-center gap-2">
                        <BsCheckCircleFill className="text-green-500" /> Wykwalifikowani i doświadczeni mechanicy
                    </li>
                    <li className="flex items-center gap-2">
                        <BsCheckCircleFill className="text-green-500" /> Krótkie terminy realizacji
                    </li>
                    <li className="flex items-center gap-2">
                        <BsCheckCircleFill className="text-green-500" /> Indywidualne podejście do klienta
                    </li>
                    <li className="flex items-center gap-2">
                        <BsCheckCircleFill className="text-green-500" /> Atrakcyjne ceny i rabaty dla stałych klientów
                    </li>
                    <li className="flex items-center gap-2">
                        <BsCheckCircleFill className="text-green-500" /> Gwarancja jakości na wykonane usługi
                    </li>
                </ul>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nasze realizacje:</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gray-100 p-4 rounded-lg shadow text-center">
                        <img src={bmwImg} alt="Realizacja BMW" className="rounded-lg mb-4 w-full h-48 object-cover" />
                        <p className="font-semibold">Kompleksowa naprawa silnika BMW</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg shadow text-center">
                        <img src={audiImg} alt="Realizacja Audi" className="rounded-lg mb-4 w-full h-48 object-cover" />
                        <p className="font-semibold">Wymiana skrzyni biegów Audi</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg shadow text-center">
                        <img src={mercedesImg} alt="Realizacja Mercedes" className="rounded-lg mb-4 w-full h-48 object-cover" />
                        <p className="font-semibold">Lakierowanie i naprawa powypadkowa Mercedesa</p>
                    </div>
                </div>
            </section>

            <section className="text-center mt-10">
                <h2 className="text-2xl font-semibold mb-4">Masz pytania? Skontaktuj się z nami!</h2>
                <a
                    href="/contact"
                    className="inline-block bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg text-lg shadow"
                >
                    Skontaktuj się
                </a>
            </section>
        </div>
    );
};

export default About;
