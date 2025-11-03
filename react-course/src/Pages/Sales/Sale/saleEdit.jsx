import { useState, useEffect } from "react";
import { useShopiContext } from "../../../Context";
import Menu from "../../../Components/Menu";
import Alert from "../../../Components/Alert"
const SaleEdit=({onBack, saleId, view})=>{
    const {  setMensajeAlerta, setShowAlert, showAlert } = useShopiContext();
 useEffect(() => {
    if (view === "edit") {
      const fetchPrice = async () => {
        try {
          await getPaymentMethods();
          await getCustomers();
          await getOrdersList();
          await getStatusSale();
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchPrice();
    }
  }, [view]);

}
export default SaleEdit