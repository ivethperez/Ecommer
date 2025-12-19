import { useState } from "react";
import { useShopiContext } from "../../../Context";
import PageStart from "../../PageStart";
import BtnOnBack from "../../../Components/BtnOnBack";
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
        <PageStart>
           <BtnOnBack onBack={onBack}/>
            <div className="rounded-lg sm:overflow-visible mt-3">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Editar cliente</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div >
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Nombre
                            </label>
                            <input
                                type="text"
                                onChange={(e) => handleChange("name", e.target.value)}
                                defaultValue={data?.name ?? ""}
                                placeholder="Nombre"
                                className="w-full p-2 border rounded placeholder-gray-400"
                            />
                        </div>
                        <div >
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Apellido
                            </label>
                            <input
                                type="text"
                                onChange={(e) => handleChange("lastName", e.target.value)}
                                defaultValue={data?.lastName ?? ""}
                                placeholder="Apellido"
                                className="w-full p-2 border rounded placeholder-gray-400"
                            />
                        </div>
                        <div >
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Teléfono
                            </label>
                            <input
                                type="text"
                                onChange={(e) => handleChange("phone", e.target.value)}
                                defaultValue={data?.phone ?? ""}
                                placeholder="Teléfono"
                                className="w-full p-2 border rounded placeholder-gray-400"
                            />
                        </div>
                        <div >
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Correo
                            </label>
                            <input
                                type="text"
                                onChange={(e) => handleChange("email", e.target.value)}
                                defaultValue={data?.email ?? ""}
                                placeholder="Correo"
                                className="w-full p-2 border rounded placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Dirección
                            </label>
                            <input
                                type="text"
                                onChange={(e) => handleChange("address", e.target.value)}
                                defaultValue={data?.address ?? ""}
                                placeholder="Dirección"
                                className="w-full p-2 border rounded placeholder-gray-400"
                            />
                        </div>
                        <div className="pt-4" >
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data?.active}
                                    onChange={(e) => handleChange("active", e.target.value)}
                                    className="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-2 focus:ring-green-300"
                                />
                                <span className="text-gray-700 font-medium">Activo</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Actializar
                        </button>
                    </div>
                </form>
            </div>
        </PageStart>
    )
}
export default CustomerEdit;