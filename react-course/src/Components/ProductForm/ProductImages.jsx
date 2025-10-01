import { useEffect } from "react";
import { useShopiContext } from '../../Context'
import { dateTime } from "../../utils";

const ProductImages = ({productId}) => {
    const { images,setImages,getImagesProduct, updateProductImages } = useShopiContext();
    useEffect(() => {
    if (productId) {
      getImagesProduct(productId); // aquí decides cuándo ejecutar la acción
    }
  }, [productId]);

  
  // Manejar cambios en campos
  const handleChange = (index, field, value) => {
    const updatedImages = [...images];
    updatedImages[index][field] = value;
    setImages(updatedImages);
  };

  // Agregar nueva imagen
  const addImage = () => {
    setImages([
      ...images,
      { imageUrl: "", altText: "", orderImage: images.length + 1, active: true },
    ]);
  };

  // Eliminar imagen
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

    const handleFileChange = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedImages = [...images];
      updatedImages[index].preview = reader.result; // Solo preview
      updatedImages[index].file = file; // Guardamos archivo real
      updatedImages[index].imageUrl = file.name;
      setImages(updatedImages);
    };
    if (file) {
      reader.readAsDataURL(file);
    }  
  };

    // Simulación de envío
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    images.forEach((img, i) => {
      if (img.file) {
        formData.append(`images[${i}]`, img.file);
      }
      formData.append(`id[${i}]`, img.id);
      formData.append(`imageUrl[${i}]`, img.imageUrl);
      formData.append(`altText[${i}]`, img.altText);
      formData.append(`orderImage[${i}]`, img.orderImage);
      formData.append(`active[${i}]`, img.active);
      formData.append(`updateBy[${i}]`, localStorage.getItem("userId"));
    });
    updateProductImages(formData);
  };

  return (
        <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-2xl shadow-md"
    >
      {images.map((img, index) => (
        <div
          key={index}
          className="flex items-start gap-6 border rounded-xl p-4 shadow-sm bg-gray-50 relative"
        >
          {/* Botón eliminar */}
          <button
            type="button"
            onClick={() => removeImage(index)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            ✕
          </button>

          {/* Vista previa */}
          <div className="flex-shrink-0">
            {img.imageUrl ? (
              <img
                src={img.imageUrl}
                alt={img.altText || "preview"}
                className="w-32 h-32 object-cover rounded-lg border"
              />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded-lg text-gray-500 text-sm">
                Sin imagen
              </div>
            )}

            {/* Input file */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleFileChange(index, e.target.files[0])
              }
              className="mt-2 block text-sm text-gray-600"
            />
          </div>

          {/* Inputs */}
          
          <div className="flex-1 grid grid-cols-2 gap-4">
           <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                value={img.imageUrl.split("/").pop()}
                onChange={(e) =>
                  handleChange(index, "imageUrl", e.target.value)
                }
                className="w-full border rounded-lg p-2 text-sm"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Texto alternativo
              </label>
              <input
                type="text"
                value={img.altText}
                onChange={(e) =>
                  handleChange(index, "altText", e.target.value)
                }
                className="w-full border rounded-lg p-2 text-sm"
                placeholder="Ej: img_mangomita"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Orden
              </label>
              <input
                type="number"
                value={img.orderImage}
                onChange={(e) =>
                  handleChange(index, "orderImage", Number(e.target.value))
                }
                className="w-full border rounded-lg p-2 text-sm"
              />
            </div>

            <div className="col-span-2 flex items-center space-x-2">
              <input
                type="checkbox"
                checked={img.active}
                onChange={(e) =>
                  handleChange(index, "active", e.target.checked)
                }
                className="h-4 w-4 text-blue-600 rounded"
              />
              <span className="text-sm text-gray-700">Imagen activa</span>
            </div>
          </div>
        </div>
      ))}

      {/* Botones */}
      <div className="flex space-x-3">
        <button
          type="button"
          
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          ➕ Agregar nueva imagen
        </button>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Guardar cambios
        </button>
      </div>
    </form>
  );
};

export default ProductImages;