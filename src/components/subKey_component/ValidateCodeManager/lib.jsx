import { ActiveBranchapi } from "./api";

export const ActivateBranch = async (branchId, activationCode) => {
    try {
        const response = await ActiveBranchapi.post(``, { branch_id: branchId, activation_code: activationCode });
        
        if (response.data.status !== 'success') {
            throw new Error(response.data.message || "فشل التفعيل. يرجى المحاولة مرة أخرى.");
        }
        
        return response.data;
    } catch (error) {
        if (error.response) {
            const status = error.response.status;
            const responseData = error.response.data;
            
            let message = "فشل الاتصال بالسيرفر، يرجى المحاولة لاحقاً";
            if (status === 404) {
                message = "الخادم غير موجود أو لا يمكن الوصول إليه. يرجى التحقق من اتصالك بالإنترنت.";
            } else if (status >= 500) {
                message = "حدث خطأ في الخادم. يرجى المحاولة مرة أخرى في وقت لاحق.";
            } else if (responseData) {
                if (typeof responseData === "string") {
                    message = responseData;
                } else if (typeof responseData === "object" && responseData.message) {
                    message = responseData.message;
                }
            }
            throw new Error(message);
        } else if (error.request) {
            throw new Error("لا يمكن الوصول إلى الخادم. يرجى التحقق من اتصالك بالإنترنت.");
        } else {
            throw new Error(error.message || "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.");
        }
    }
};
export default ActiveBranchapi;


export const executeBranchVerification = async ({
    otpValue,
    setIsSubmitting,
    setAlertConfig,
    navigate
}) => {
    setIsSubmitting(true);
    try {
        const localUserData = localStorage.getItem('user');
        if (!localUserData) {
            throw new Error("لم يتم العثور على بيانات المستخدم، يرجى تسجيل الدخول مجدداً");
        }
        
        let user = JSON.parse(localUserData);
        const branchId = user.branch_id; 

        const finalActivationCode = `SAND-${otpValue.substring(0,4)}-${otpValue.substring(4,8)}`.toUpperCase();

        const response = await ActivateBranch(branchId, finalActivationCode);

        user.is_active = true;
        localStorage.setItem('user', JSON.stringify(user));

        setAlertConfig({
            isVisible: true,
            title: "تم التفعيل بنجاح",
            description: response.message
        });

        setTimeout(() => {
            navigate('/AdminDashboard');
        }, 3000);
        
    } catch (error) {
        setAlertConfig({
            isVisible: true,
            title: "فشل التفعيل",
            description: error.message
        });
    } finally {
        setIsSubmitting(false);
    }
};