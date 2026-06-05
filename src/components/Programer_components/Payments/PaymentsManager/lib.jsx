import api from "./api";

// 1. جلب المدفوعات مع الفلاتر والباجينيشن المتاحة بـ Laravel Index
export const getPaymentsServer = async (branchId, filters = {}, page = 1) => {
  try {
    // التعديل: نرسل البيانات مباشرة في كائن الـ body دون تغليفها بكلمة params
    const response = await api.post('', {
      branch_id: branchId,
      page: page,
      payment_method: filters.payment_method || undefined,
      date_from: filters.date_from || undefined,
      date_to: filters.date_to || undefined,
    });
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.response?.data?.message || "حدث خطأ أثناء جلب البيانات المالية.");
  }
};

// 2. إضافة دفعة مالية جديدة
export const storePaymentServer = async (paymentData) => {
  try {
    const response = await api.post('/store', paymentData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "فشلت عملية حفظ البيانات المادية.");
  }
};

// 3. تعديل دفعة مالية سابقة
export const updatePaymentServer = async (paymentData) => {
  try {
    const response = await api.post('/update', paymentData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "فشلت عملية تحديث البيانات المادية.");
  }
};

// 4. حذف السجل المالي
export const destroyPaymentServer = async (id, branchId) => {
  try {
    const response = await api.delete('/delete', {
      data: { id, branch_id: branchId }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "فشلت عملية حذف السجل.");
  }
};