import { settlementApi } from "./api";

// 1. getSettlements
export const getSettlementsFromServer = async (fromDate = null, toDate = null) => {
  try {
    const data = {};
    if (fromDate) data.from_date = fromDate;
    if (toDate) data.to_date = toDate;

    const response = await settlementApi.post("/get_settlements", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "فشل جلب التقارير المالية للفرع" };
  }
};

// 2. getFinancialReports
export const getFinancialReportsFromServer = async (period) => {
  try {
    const response = await settlementApi.post(`/reports`, { period });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "فشل جلب الملخص المالي للفترة المحددة" };
  }
};

// 3. getSettlementDetails
export const getSettlementDetailsFromServer = async (id) => {
  try {
    const response = await settlementApi.post(`/show`, { id });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "فشل جلب تفاصيل التسوية" };
  }
};

// 4. deleteSettlement
// export const deleteSettlementFromServer = async (id) => {
//  try {
//     const response = await settlementApi.delete('/delete', { 
//       data: { id: Number(id) } 
//     }); 
//     return response.data;
//   } catch (error) {
//     throw error.response?.data || { message: "حدث خطأ أثناء حذف التسوية" };
//   }
// };