import { useState } from "react";
import { useShopiContext } from "../../../Context";
import Menu from "../../../Components/Menu";
const CustomerEdit = ({ onBack, data }) => {
    const { customerUpdate, setMensajeAlerta, setShowAlert } = useShopiContext();
    const [formData, setFormData] = useState(data);

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updated = await customerUpdate(formData);
            if (updated) {
                onBack();
                setShowAlert(true)
                setMensajeAlerta("Cliente editado con éxito.")
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full bg-white fixed flex left-0 h-full">
            <Menu />
            <div className="ml-64 flex-1 p-6 ">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="h-full overflow-y-auto space-y-6 p-6">
                        <button
                            onClick={onBack}
                            className=""
                        >
                            ⬅ Volver
                        </button>
                        <h1 className="">Editar Producto</h1>

                        <form onSubmit={handleSubmit} className="p-4 space-y-4">
                            <input
                                type="text"
                                onChange={(e) => handleChange("name", e.target.value)}
                                defaultValue={data?.name ?? ""}
                                placeholder="Nombre"
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                onChange={(e) => handleChange("lastName", e.target.value)}
                                defaultValue={data?.lastName ?? ""}
                                placeholder="Apellido"
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                onChange={(e) => handleChange("phone", e.target.value)}
                                defaultValue={data?.phone ?? ""}
                                placeholder="Teléfono"
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                onChange={(e) => handleChange("email", e.target.value)}
                                defaultValue={data?.email ?? ""}
                                placeholder="Correo"
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                onChange={(e) => handleChange("address", e.target.value)}
                                defaultValue={data?.address ?? ""}
                                placeholder="Dirección"
                                className="w-full p-2 border rounded"
                            />
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data?.active}
                                    onChange={(e) => handleChange("active", e.target.value)}
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

    )
}
export default CustomerEdit;