import { settlementApi } from "../../Sales_Components/SettlementsManager/api";

// 1. getTopProfitab
export const getTopProfitableServer = async () => {
  try {
    const response = await settlementApi.get("/top_products"); 
    if (response.data && response.data.success) {
      return Array.isArray(response.data.data) ? response.data.data : [];
    }
    return [];
  } catch (error) {
    throw error.response?.data || { message: "فشل جلب بيانات الأصناف الأكثر ربحية" };
  }
};

// 2.  getLowStock
export const getLowStockAlertsServer = async () => {
  try {
    const response = await settlementApi.get("/lowStockAlerts"); 
    if (response.data && response.data.success) {
      return Array.isArray(response.data.items) ? response.data.items : [];
    }
    return [];
  } catch (error) {
    throw error.response?.data || { message: "فشل جلب تنبيهات المخزون المنخفض" };
  }
};