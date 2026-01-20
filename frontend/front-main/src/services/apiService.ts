export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("token");

    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
    };

    const response = await fetch(`${endpoint}`, {
        ...options,
        headers
    });

    if (response.status === 401 || response.status === 403) {
        console.warn("Sesja wygasła lub brak dostępu. Przekierowanie do logowania...");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/login";
        throw new Error("Sesja wygasła. Zaloguj się ponownie.");
    }

    if (response.status === 204 || response.headers.get("Content-Length") === "0") {
        return {};
    }

    const text = await response.text();
    return text ? JSON.parse(text) : {};
};
