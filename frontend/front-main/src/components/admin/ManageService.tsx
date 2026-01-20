import React, { useEffect, useState } from "react";
import servicesService from "../../services/servicesService";
import { Plus, Trash2, Edit3, Wrench } from "lucide-react";

const ManageServices: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    price: "",
    description: "",
    available: false,
  });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data = await servicesService.getServices();
      setServices(data);
    } catch (error) {
      console.error(" Błąd pobierania usług:", error);
    }
  };

  const deleteService = async (id: number) => {
    try {
      await servicesService.deleteService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      console.error(" Błąd usuwania usługi:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(formData.price);

    if (!formData.name || isNaN(price) || !formData.description) {
      alert("Wypełnij wszystkie pola poprawnie.");
      return;
    }

    try {
      if (formData.id === null) {
        const newService = await servicesService.createService({
          name: formData.name,
          price,
          description: formData.description,
          available: formData.available,
        });
        setServices([...services, newService]);
      } else {
        const updatedService = await servicesService.updateService(formData.id, {
          name: formData.name,
          price,
          description: formData.description,
          available: formData.available,
        });

        setServices((prev) => prev.map((s) => (s.id === formData.id ? updatedService : s)));
      }

      setShowModal(false);
      setFormData({ id: null, name: "", price: "", description: "", available: false });
    } catch (error) {
      console.error(" Błąd zapisywania usługi:", error);
    }
  };

  const openAddModal = () => {
    setFormData({ id: null, name: "", price: "", description: "", available: false });
    setShowModal(true);
  };

  const openEditModal = (service: any) => {
    setFormData({
      id: service.id,
      name: service.name,
      price: service.price.toString(),
      description: service.description,
      available: service.available,
    });
    setShowModal(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-blue-700 flex items-center gap-2">
          <Wrench className="w-7 h-7" />
          Zarządzanie usługami
        </h1>
        <button
          onClick={openAddModal}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg shadow flex items-center gap-2"
        >
          <Plus size={18} /> Dodaj nową usługę
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-5 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h2>
            <p className="text-gray-600 mb-1">
              Cena: <span className="font-semibold text-green-600">{service.price} PLN</span>
            </p>
            <p className="text-gray-600 mb-1">
              Opis: <span>{service.description}</span>
            </p>
            <p className="text-gray-600 mb-4">
              Dostępna: <span>{service.available ? "Tak" : "Nie"}</span>
            </p>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => deleteService(service.id)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg shadow flex items-center justify-center gap-2"
              >
                <Trash2 size={16} /> Usuń
              </button>
              <button
                onClick={() => openEditModal(service)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg shadow flex items-center justify-center gap-2"
              >
                <Edit3 size={16} /> Edytuj
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl mb-4 font-semibold text-blue-700">
              {formData.id === null ? "Dodaj nową usługę" : "Edytuj usługę"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium">Nazwa usługi:</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Cena:</label>
                <input
                  type="number"
                  className="w-full border p-2 rounded"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Opis:</label>
                <textarea
                  className="w-full border p-2 rounded"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                />
                <label>Dostępna</label>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Zapisz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServices;
