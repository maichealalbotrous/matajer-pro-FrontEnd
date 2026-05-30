import { settlementApi } from "../../Sales_Components/SettlementsManager/api";

export const getInventoryAuditFromServer = async () => {
  try {
    const response = await settlementApi.get("/inventory_audit"); 
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "فشل جلب بيانات جرد المخزون الحالية" };
  }
};