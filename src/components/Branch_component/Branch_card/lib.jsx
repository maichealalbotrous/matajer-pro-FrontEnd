import { branchIndexApi } from "./api";

export const fetchBranchesFromServer = async () => {
    try {
        const response = await branchIndexApi.get('');
        
        if (response.data && response.data.status === 'success') {
            return response.data.data; 
        }
        
        if (Array.isArray(response.data)) {
            return response.data;
        }
        
        return [];
    } catch (error) {
        if (error.response) {
            const status = error.response.status;
            if (status === 401) throw new Error("جلسة العمل انتهت، يرجى تسجيل الدخول مجدداً");
            if (status === 404) throw new Error("لم يتم العثور على مسار الفروع في السيرفر");
            throw new Error(error.response.data?.message || "فشل جلب بيانات الفروع من الخادم");
        }
        throw new Error("لا يمكن الوصول للسيرفر، تأكد من اتصال الشبكة");
    }
};