import { useState } from "react";
import { useShopiContext } from "../../../Context";
import Menu from "../../../Components/Menu";
const customerCreate = ({ onBack }) => {
    const { customerCreate, setMensajeAlerta, setShowAlert } = useShopiContext();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        active: true
    })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = "El nombre del cliente es requerido";
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        try {
            const newCustomer = await customerCreate(formData);
            if (newCustomer) {
                onBack();
                setShowAlert(true)
                setMensajeAlerta("Cliente creado con éxito.")
            }
        }
        catch (error) {
            setShowAlert(true)
                setMensajeAlerta(error);
        }
    };

    return (
        <div className="w-full bg-white fixed flex  left-0 h-full">
            <Menu />
            <div className="ml-64 flex-1 p-6">
                <div className="bg-white rounded-lg shadow overflow-hidden h-full">
                    <div className="h-full overflow-y-auto space-y-6 p-6">
                        <button
                            onClick={onBack}
                            className=""
                        >
                            ⬅ Volver
                        </button>
                        <h1 className="">Agregar cliente</h1>

                        <form
                            onSubmit={handleSubmit}
                            className="bg-white p-6 rounded  space-y-4"
                        >
                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full p-2 border rounded ${errors.name ? "border-red-500" : ""
                                    }`}
                                required
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                            )}
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Apellido"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                            <textarea
                                name="phone"
                                placeholder="Teléfono"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                name="email"
                                placeholder="Correo eléctronico"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Dirección"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full p-2 border rounded"
                            />

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.active}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-2 focus:ring-green-300"
                                />
                                <span className="text-gray-700 font-medium">Activo</span>
                            </label>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Guardar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default customerCreate;