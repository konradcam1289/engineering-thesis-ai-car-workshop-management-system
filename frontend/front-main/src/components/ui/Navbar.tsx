import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, logout, getRole } from "../../services/authService";
import { LogIn, UserPlus, Home, LogOut } from "lucide-react";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!getToken();
    const role = getRole();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

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
        <nav className="bg-blue-700 text-white px-6 py-4 flex items-center justify-between shadow-md z-50 w-full">
            <div className="text-2xl font-bold flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
                <Home size={28} /> CarWorkshop
            </div>

            <div className="flex gap-6 items-center">
                <Link to="/" className="hover:text-orange-400 transition">Strona Główna</Link>
                <Link to="/services" className="hover:text-orange-400 transition">Usługi</Link>
                <Link to="/contact" className="hover:text-orange-400 transition">Kontakt</Link>
                <Link to="/about" className="hover:text-orange-400 transition">O nas</Link>

                {isAuthenticated ? (
                    <>
                        <button
                            onClick={() => navigate(getHomePath())}
                            className="bg-white text-blue-700 font-semibold py-2 px-4 rounded-lg transition hover:bg-gray-100"
                        >
                            Panel Główny
                        </button>

                        <button
                            onClick={handleLogout}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition"
                        >
                            <LogOut size={18} /> Wyloguj
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:text-orange-400 transition flex items-center gap-1">
                            <LogIn size={18} /> Logowanie
                        </Link>
                        <Link to="/register" className="hover:text-orange-400 transition flex items-center gap-1">
                            <UserPlus size={18} /> Rejestracja
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
