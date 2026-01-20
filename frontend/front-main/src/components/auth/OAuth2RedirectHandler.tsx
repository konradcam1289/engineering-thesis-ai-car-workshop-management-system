import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get("token");

        if (token) {
            console.log(" Otrzymano token OAuth2:", token);
            localStorage.setItem("token", token);

            setTimeout(() => {
                console.log("➡️ Przekierowanie do /client/home...");
                navigate("/client/home");
            }, 500);
        } else {
            console.error(" Brak tokena w URL!");
            navigate("/login");
        }
    }, [navigate, searchParams]);

    return <p> Przekierowywanie...</p>;
};

export default OAuth2RedirectHandler;
