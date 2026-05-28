import discountApi from './api';


// 1. getDiscounts
export const getDiscountsFromServer = async () => {
  try {
    const response = await discountApi.get('/index');
    if (response.data && response.data.success) {
      return Array.isArray(response.data.data) ? response.data.data : [];
    }
    return [];
  } catch (error) {
    throw error.response?.data || { message: "فشل جلب قائمة الخصومات من النظام" };
  }
};

// 2.addDiscount
export const addDiscountToServer = async (discountData) => {
  try {
    const response = await discountApi.post('/store', discountData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "فشل إنشاء قاعدة الخصم" };
  }
};

// 3. تحديث قاعدة خصم حالية
export const updateDiscountOnServer = async (discountData) => {
  try {
    const response = await discountApi.post('/update', discountData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "فشل تحديث بيانات الخصم" };
  }
};

// 4.  deleteDiscount
export const deleteDiscountFromServer = async (id) => {
  try {
    const response = await discountApi.delete('/destroy', { 
      data: { id: Number(id) } 
    }); 
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "حدث خطأ أثناء حذف قاعدة الخصم" };
  }
};