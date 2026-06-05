import api from './api';


//getBranchesServer
export const getBranchesServer = async () => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "حدث خطأ أثناء تحميل الفروع.");
  }
};


//deleteBranchServer
export const deleteBranchServer = async (branchId) => {
  try {
    const response = await api.delete('/Delete', { data: { id: branchId } });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "فشلت عملية حذف الفرع.");
  }
};

//toggleBranchStatusServer
export const toggleBranchStatusServer = async (branchId) => {
  try {
    const response = await api.post('toggle-status', { id: branchId });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "فشل تعديل حالة الفرع.");
  }
};


//manualRenewBranchServer
export const manualRenewBranchServer = async (branchId, monthsCount) => {
  try {
    const response = await api.post('manualRenew', {
      id: branchId,
      months: parseInt(monthsCount, 10)
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "فشلت عملية تجديد الفرع يدوياً.");
  }
};

