import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/authService";

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        roles: ["CLIENT"],
    });

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(formData);
            alert("Rejestracja zakończona sukcesem!");
            navigate("/login");
        } catch (error) {
            alert("Błąd rejestracji!");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Rejestracja</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text" name="username" placeholder="Nazwa użytkownika" onChange={handleChange} required className="p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="password" name="password" placeholder="Hasło" onChange={handleChange} required className="p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" name="firstName" placeholder="Imię" onChange={handleChange} required className="p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" name="lastName" placeholder="Nazwisko" onChange={handleChange} required className="p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" name="phoneNumber" placeholder="Telefon" onChange={handleChange} required className="p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" name="address" placeholder="Adres" onChange={handleChange} required className="p-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="submit" className="mt-4 p-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">Zarejestruj się</button>
            </form>
        </div>
    );
};

export default Register;
