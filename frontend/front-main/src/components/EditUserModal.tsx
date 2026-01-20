import React, { useState } from "react";

interface UserData {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
}

interface Props {
    user: UserData;
    onClose: () => void;
    onSave: (updatedUser: UserData) => void;
}

const EditUserModal: React.FC<Props> = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState(user);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4 text-center text-blue-700">Edytuj użytkownika</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input className="w-full border p-2 rounded" name="username" value={formData.username} onChange={handleChange} placeholder="Nazwa użytkownika" />
                    <input className="w-full border p-2 rounded" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                    <input className="w-full border p-2 rounded" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Imię" />
                    <input className="w-full border p-2 rounded" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Nazwisko" />
                    <input className="w-full border p-2 rounded" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Telefon" />
                    <input className="w-full border p-2 rounded" name="address" value={formData.address} onChange={handleChange} placeholder="Adres" />
                    
                    <div className="flex justify-end gap-3 pt-3">
                        <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-lg shadow">
                            Anuluj
                        </button>
                        <button type="submit" className="bg-yellow-400 px-4 py-2 rounded-lg shadow">
                            Zapisz
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal;
