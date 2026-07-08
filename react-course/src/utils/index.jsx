export const totalPrice = (products) => {
  return products.reduce((acc, product) => acc + product.precio * product.quantity, 0)
}
export const totalProducts = (products) => {
  return products.reduce((acc, product) => acc + product.quantity, 0)
}
export const dateTime = () => {
  const date = new Date().toLocaleDateString();
  return date
}
export const fetchWithAuth = async (endpoint, options = {}) => {
 
  const res = await fetch(`${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
  return res;
};

export const  apiRequest = async(endpoint, method = "POST",token = "", userId=0, payload = {}, withMeta = true) => {
  let dataToSend = { ...payload };
  if (withMeta && method === "POST") {
    dataToSend = {
      ...dataToSend,
      createdAt: new Date().toISOString(),
      createdBy: userId,
    };
  }

  if (withMeta && (method === "PUT" || method === "PATCH")) {
    dataToSend = {
      ...dataToSend,
      updatedAt: new Date().toISOString(),
      updatedBy: userId,
    };
  }

  const res = await fetch(`${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: ["GET", "DELETE"].includes(method) ? null : JSON.stringify(dataToSend),
  });
  
    const resul = await res.json();
  if (!res.ok) {
    throw new Error(resul.message || "Error en la petición");
  }

  return resul;
}