import { settlementApi } from "../../Sales_Components/SettlementsManager/api";

export const getInventoryAuditFromServer = async (backendFilters = {}) => {
  try {
    const response = await settlementApi.post('/inventory_audit', backendFilters);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "حدث خطأ أثناء تحميل بيانات الجرد المالي." };
  }
};