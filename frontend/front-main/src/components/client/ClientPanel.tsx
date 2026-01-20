import React from "react";
import { useNavigate } from "react-router-dom";

const ClientPanel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg text-center">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">Panel Klienta</h1>

      <div className="flex flex-col md:flex-row gap-6 justify-center flex-wrap">
        <button
          onClick={() => navigate("/client/new-reservation")}
          className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-lg text-lg font-semibold shadow-md transition"
        >
          Dodaj nową rezerwację
        </button>

        <button
          onClick={() => navigate("/client/reservations")}
          className="bg-orange-500 hover:bg-orange-600 text-white py-4 px-8 rounded-lg text-lg font-semibold shadow-md transition"
        >
          Moje rezerwacje
        </button>

        <button
          onClick={() => navigate("/client/profile")}
          className="bg-gray-700 hover:bg-gray-800 text-white py-4 px-8 rounded-lg text-lg font-semibold shadow-md transition"
        >
          Edytuj dane
        </button>

        <button
          onClick={() => navigate("/client/diagnose")}
          className="bg-green-600 hover:bg-green-700 text-white py-4 px-8 rounded-lg text-lg font-semibold shadow-md transition"
        >
          Zdiagnozuj usterkę z AI
        </button>
      </div>
    </div>
  );
};

export default ClientPanel;
