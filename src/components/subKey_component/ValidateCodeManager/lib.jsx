import { ActiveBranchapi } from "./api";

export const ActivateBranch = async (branchId, activationCode) => {
    try {
        const response = await ActiveBranchapi.post(`?branch_id=${branchId}&activation_code=${activationCode}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "فشل الاتصال بالسيرفر، يرجى المحاولة لاحقاً" };
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
        
        const user = JSON.parse(localUserData);
        const branchId = user.branch_id; 

        const finalActivationCode = `SAND-${otpValue.substring(0,4)}-${otpValue.substring(4,8)}`.toUpperCase();

        const response = await ActivateBranch(branchId, finalActivationCode);

        if (response.status === 'success') {

            localStorage.setItem('user', JSON.stringify(user));

            setAlertConfig({
                isVisible: true,
                title: "تم التفعيل بنجاح",
                description: response.message
            });

            setTimeout(() => {
                navigate('/AdminDashboard');
            }, 3000);
        }
        
    } catch (error) {
        setAlertConfig({
            isVisible: true,
            title: "فشل التفعيل",
            description: error.message || "كود التفعيل غير صحيح أو مستخدم مسبقاً"
        });
    } finally {
        setIsSubmitting(false);
    }
};