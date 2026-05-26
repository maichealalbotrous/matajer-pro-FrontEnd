import { variantApi } from "./api";

/** getVariantsFromFilter */
export const getVariantsserver = async (backendFilters = {}) => {
  try {
    if (backendFilters && Object.keys(backendFilters).length > 0) {
      const response = await variantApi.post('/filter', backendFilters);
      if (response.data && response.data.success) {
        return Array.isArray(response.data.data) ? response.data.data : [];
      }
      throw new Error(response.data.message || "لاتوجد بيانات متوافقة مع البحث");

    } else {
      const response = await variantApi.get('/index');
      return Array.isArray(response.data) ? response.data : [];
    }
    // return [];
  } catch (error) {
    throw error.response?.data || { message: "حدث خطأ أثناء جلب البيانات من الفلتر" };
  }
};

/**
 * 4. addVariant
 */
export const addVariantToServer = async (productId, colorsGroups) => {
  try {
    const response = await variantApi.post('/add', {
      id: Number(productId), 
      colors_groups: colorsGroups
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "حدث خطأ أثناء إضافة الموديل" };
  }
};

/**
 * 5. updateVariant
 */
export const updateVariantOnServer = async (productId, colorsGroups) => {
  try {
    const response = await variantApi.post('/update', {
      id: Number(productId), 
      colors_groups: colorsGroups
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "حدث خطأ أثناء تحديث الموديل" };
  }
};

/**
 * 6. deleteVariant
 */
export const deleteVariantFromServer = async (variantId) => {
  try {
    const response = await variantApi.delete('/delete', { 
      data: { id: Number(variantId) } 
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "حدث خطأ أثناء حذف الموديل" };
  }
};