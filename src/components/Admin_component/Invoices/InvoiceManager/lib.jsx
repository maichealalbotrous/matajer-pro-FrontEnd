import { invoiceApi } from './api';

// 1. getInvoices
export const getInvoicesServer = async () => {
  try {
    const response = await invoiceApi.get('/index');
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

// 2. showInvoiceDetails
export const showInvoiceDetailsServer = async (id) => {
  try {
    const response = await invoiceApi.post('/show', { id });
    if (response.data && response.data.success) {
      return response.data.data;
    }
    throw new Error("لم يتم العثور على تفاصيل الفاتورة");
  } catch (error) {
    throw error.response?.data || { message: "خطأ أثناء جلب تفاصيل الفاتورة" };
  }
};

// 3. approveInvoice
export const approveInvoiceServer = async (invoiceId) => {
  try {
  const response = await invoiceApi.post('/approve', { invoiceId });
    if (response.data && response.data.success) {
      return response.data.data;
    }
  } catch (error) {
    throw error.response?.data || { message: "فشل اعتماد الفاتورة مالياً" };
  }
};

// 4. revertInvoiceApproval
export const revertInvoiceApprovalServer = async (invoiceId) => {
   try {
    const response = await invoiceApi.post('/revertApproval', { invoiceId });
    if (response.data && response.data.success) {
      return response.data.data;
    }
   } catch (error) {
     throw error.response?.data || { message: "حدث خطأ أثناء حذف المصروف" };
   }
};