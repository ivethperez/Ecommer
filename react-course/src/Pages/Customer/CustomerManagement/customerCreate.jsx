import { useState } from "react";
import { useShopiContext } from "../../../Context";
import PageStart from "../../PageStart";
import '../../../Styles/styles.css'
import BtnOnBack from "../../../Components/BtnOnBack";
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
                setShowAlert(true);
                setMensajeAlerta("Cliente creado con éxito.")
            }
        }
        catch (error) {
            setShowAlert(true)
            setMensajeAlerta(error);
        }
    };

    return (
        <PageStart>
            <BtnOnBack onBack={onBack}/>
            <div className="rounded-lg sm:overflow-visible mt-3">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Agregar cliente</h1>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Nombre
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre"
                                value={formData?.name ?? ''}
                                onChange={handleChange}
                                className={`w-full p-2 border rounded placeholder-gray-400 ${errors.name ? "border-red-500" : ""
                                    }`}
                                required
                            />
                        </div>
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                        <div>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Apellido
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Apellido"
                                value={formData?.lastName ?? ''}
                                onChange={handleChange}
                                className="w-full p-2 border rounded placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Teléfono
                            </label>
                            <input
                                name="phone"
                                placeholder="Teléfono"
                                value={formData?.phone ?? ''}
                                onChange={handleChange}
                                className="w-full p-2 border rounded placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Correo
                            </label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Correo eléctronico"
                                value={formData?.email ?? ''}
                                onChange={handleChange}
                                className="w-full p-2 border rounded placeholder-gray-400"
                            />
                        </div>
                        <div >
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                                Dirección
                            </label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Dirección"
                                value={formData?.address ?? ''}
                                onChange={handleChange}
                                className="w-full p-2 border rounded placeholder-gray-400"
                            />
                        </div>
                        <div className="pt-4">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-4">
                                <input
                                    type="checkbox"
                                    checked={formData?.active ?? true}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-green-500 border-gray-300 rounded focus:ring-2 focus:ring-green-300"
                                />
                                <span className="text-gray-700 pl-2 font-medium">Activo</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-4 py-2 mb-4 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </PageStart>
    );
}
export default customerCreate;