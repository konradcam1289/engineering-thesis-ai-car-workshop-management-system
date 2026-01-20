import React from "react";
import { useNavigate } from "react-router-dom";

const ButtonHome: React.FC = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    const getHomePath = () => {
        switch (role) {
            case "ROLE_ADMIN":
                return "/admin/home";
            case "ROLE_WORKER":
                return "/worker/home";
            case "ROLE_CLIENT":
                return "/client/home";
            default:
                return "/";
        }
    };

    return (
        <button
            onClick={() => navigate(getHomePath())}
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg text-lg mb-6"
        >
            Przejdź do panelu głównego
        </button>
    );
};

export default ButtonHome;
