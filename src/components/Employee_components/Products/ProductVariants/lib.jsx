import { invoiceApi } from "./api";

export const getEmployeeInvoicesServer = async () => {
  try { 
    const response = await invoiceApi.get('/employeeInvoices');
    
    if (response.data && response.data.success) {
      return {
        statistics: response.data.statistics,
        data: Array.isArray(response.data.data) ? response.data.data : []
      };
    }
    throw new Error("فشل في استخراج بيانات الفواتير");
  } catch (error) {
    throw error.response?.data || { message: "حدث خطأ أثناء جلب الفواتير من السيرفر" };
  }
};



export const storeInvoiceServer = async (invoiceData) => {
  try {
    const response = await invoiceApi.post('/storeInvoice', invoiceData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "حدث خطأ أثناء حفظ الفاتورة بالسيرفر" };
  }
};


export const returnInvoiceServer = async (returnData) => {
  try {
    const response = await invoiceApi.post('/returnInvoice', returnData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "حدث خطأ أثناء معالجة المرتجع" };
  }
};


export const exchangeInvoiceServer = async (exchangeData) => {
  try {
    const response = await invoiceApi.post('/exchangeInvoice', exchangeData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "حدث خطأ أثناء معالجة الاستبدال" };
  }
};