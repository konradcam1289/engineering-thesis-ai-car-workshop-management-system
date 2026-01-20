import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../services/apiService";

const rolesList = ["CLIENT", "WORKER", "ADMIN"];

const AddUser: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    roles: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleRole = (role: string) => {
    setForm((prev) => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    apiRequest("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(() => {
        alert(" Użytkownik został dodany");
        navigate("/admin/users");
      })
      .catch((err) => {
        console.error(" Błąd tworzenia użytkownika:", err);
        alert(" Wystąpił błąd przy dodawaniu użytkownika.");
      });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">➕ Dodaj nowego użytkownika</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
  "username",
  "email",
  "password",
  "firstName",
  "lastName",
  "phoneNumber",
  "address",
].map((field) => (
  <label key={field} className="block font-semibold mb-1 capitalize">
    {field}
    <input
      type={field === "password" ? "password" : "text"}
      name={field}
      value={(form as any)[field]}
      onChange={handleChange}
      required
      className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
    />
  </label>
))}


        <div>
          <label className="block font-semibold mb-1">Role użytkownika</label>
          <div className="flex flex-col gap-1">
            {rolesList.map((role) => (
              <label key={role} htmlFor={`role-${role}`} className="text-sm">
                <input
                  id={`role-${role}`}
                  type="checkbox"
                  checked={form.roles.includes(role)}
                  onChange={() => toggleRole(role)}
                  className="mr-2"
                />
                {role}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Zapisz użytkownika
        </button>
      </form>
    </div>
  );
};

export default AddUser;
