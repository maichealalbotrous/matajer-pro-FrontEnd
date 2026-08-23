import { invoiceApi } from './api';

// 1. getInvoices
export const getInvoicesServer = async (period = 'today') => {
  try {
    // 💡 إرسال الـ period كـ params (يقوم axios بوضعها تلقائياً بالشكل المناسب)
    const response = await invoiceApi.get('/index', {
      params: { period }
    });
    
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

// 4. approveAllInvoices -
export const approveAllInvoicesServer = async (period) => {
  try {
    // 💡 إرسال الـ period مع الطلب لكي يعتمده السيرفر للفترة المحددة فقط
    const response = await invoiceApi.post('/approve-all', { period });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "حدث خطأ غير متوقع أثناء محاولة اعتماد الفواتير معاً." };
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


// 5. deleteInvoice
export const deleteInvoiceServer = async (invoiceId) => {
  try {
    const response = await invoiceApi.delete('/deleteInvoice', { data: { id: invoiceId } });
    if (response.data && response.data.success) {
      return response.data;
    }
    throw new Error("فشل حذف الفاتورة");
  } catch (error) {
    throw error.response?.data || { message: "حدث خطأ أثناء محاولة حذف الفاتورة" };
  }
};