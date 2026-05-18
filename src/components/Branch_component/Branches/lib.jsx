import { StoreBranchApi } from "./api";
export const CreateBranchRequest = async (branchData) => {
    try {
        const response = await StoreBranchApi.post('', branchData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "فشل الاتصال بالسيرفر، يرجى المحاولة لاحقاً" };
    }
};


export const executeBranchCreation = async ({
    formData,
    setIsSubmitting,
    setAlertConfig,
    onSuccess
}) => {
    setIsSubmitting(true);
    try {
        const response = await CreateBranchRequest({
            name: formData.name,
            location: formData.location
        });

        if (response.status === 'success') {
            const localUserData = localStorage.getItem('user');
            if (localUserData) {
                const user = JSON.parse(localUserData);
                user.branch_id = response.branch_id;
                user.is_active = 0;
                localStorage.setItem('user', JSON.stringify(user));
            }

            setAlertConfig({
                isVisible: true,
                title: "تم إنشاء الفرع بنجاح",
                description: response.message,
                status: "success"
            });

            if (onSuccess) {
                setTimeout(() => onSuccess(response.branch_id), 2500);
            }
        }
    } catch (error) {
        setAlertConfig({
            isVisible: true,
            title: "فشل إنشاء الفرع",
            description: error.message || "حدث خطأ غير متوقع أثناء الحفظ",
            status: "error"
        });
    } finally {
        setIsSubmitting(false);
    }
};