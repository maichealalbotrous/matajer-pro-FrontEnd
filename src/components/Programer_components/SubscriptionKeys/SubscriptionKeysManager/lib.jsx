import api from './api';


export const getSubscriptionKeysServer = async () => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 
      error.response?.data?.error ||
      "حدث خطأ أثناء تحميل أكواد الاشتراكات من السيرفر."
    );
  }
};


export const generateSubscriptionKeysServer = async (data) => {
  try {
    const payload = {
      count: parseInt(data.count, 10),
      duration_months: parseInt(data.duration_months, 10)
    };

    const response = await api.post('/generate', payload);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 
      error.response?.data?.error ||
      "فشلت عملية توليد الأكواد، يرجى التحقق من الصلاحيات والمخرجات."
    );
  }
};