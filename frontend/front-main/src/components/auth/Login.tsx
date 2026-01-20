import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import GoogleLogin from "./GoogleLogin";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const data = await login(username, password);

            if (!data || !data.token || !data.role || !data.username) {
                setErrorMessage("Błędna odpowiedź serwera.");
                return;
            }

            const token = data.token;
            const role = data.role;
            const loggedInUsername = data.username;

            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            localStorage.setItem("username", loggedInUsername);

            switch (role) {
                case "ROLE_ADMIN":
                    navigate("/admin/home");
                    break;
                case "ROLE_WORKER":
                    navigate("/worker/home");
                    break;
                case "ROLE_CLIENT":
                    navigate("/client/home");
                    break;
                default:
                    setErrorMessage(`Nieznana rola użytkownika: ${role}`);
            }
        } catch (error) {
            setErrorMessage("Nie udało się zalogować. Sprawdź login i hasło.");
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Logowanie</h2>

            {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

            <input
                type="text"
                placeholder="Login"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="password"
                placeholder="Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                onClick={handleLogin}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-lg font-semibold mb-6 transition-colors"
            >
                Zaloguj
            </button>

            <div className="mb-4 text-gray-500 text-sm">lub</div>

            <GoogleLogin />
        </div>
    );
};

export default Login;
