import React from "react";
import { FcGoogle } from "react-icons/fc";

const GOOGLE_AUTH_URL = "http://localhost:8080/oauth2/authorization/google";

const GoogleLogin: React.FC = () => {
    const handleGoogleLogin = () => {
        window.location.href = GOOGLE_AUTH_URL;
    };

    return (
        <button
            onClick={handleGoogleLogin}
            className="w-full border border-gray-300 py-3 rounded-md flex items-center justify-center gap-3 hover:bg-gray-100 transition"
        >
            <FcGoogle className="text-2xl" />
            Zaloguj przez Google
        </button>
    );
};

export default GoogleLogin;
