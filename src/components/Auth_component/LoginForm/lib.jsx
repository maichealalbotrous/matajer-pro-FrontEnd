import api from './api';

export const LoginUser = async (phone, password) => {
    try {
        const response = await api.post('/Auth/login', { phone, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "حدث خطأ في الاتصال" };
    }
};

export const RegisterAdmin= async (name, phone, password) => {
    try {
        const response = await api.post('/Auth/register', { name, phone, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "حدث خطأ أثناء إنشاء الحساب" };
    }
};

// handleAuthSubmit function
export const handleAuthSubmit = async ({ 
    isLoginMode, 
    formData, 
    setLoading, 
    navigate, 
    setAlertConfig 
}) => {
    setLoading(true);
    try {
        if (isLoginMode) {
            const response = await LoginUser(formData.phone, formData.password);
            
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));

            // (Routing Logic)
            if (response.is_super) {
                navigate('/ProgramerDashboard');
            } 
            else if (response.role === 'admin') {
                if (!response.branch_id) {
                    setAlertConfig({ isVisible: true, title: "إعداد مطلوب", description: "يرجى إضافة فرع للمتابعة" });
                    navigate('/Branches');
                } else if (!response.is_active) {
                    setAlertConfig({ isVisible: true, title: "تفعيل مطلوب", description: response.message });
                    navigate('/ValidateCode');
                } else {
                    navigate('/AdminDashboard');
                    setAlertConfig({ isVisible: true, title: `${response.user.name} مرحباً بك أيها المدير`, description: response.message });
                }
            } 
            else if (response.role === 'employee') {
                if (!response.branch_id) {
                    setAlertConfig({ isVisible: true, title: "المستخدم غير موجود", description: "هذا الحساب غير مرتبط بفرع" });
                    navigate('/Auth');
                } else if (!response.is_active) {
                    setAlertConfig({ isVisible: true, title: "اشتراك منتهي", description: "الفرع غير مفعل حالياً" });
                    navigate('/Auth');
                } else {
                    navigate('/EmployeeDashboard');
                    setAlertConfig({ isVisible: true, title: `${response.user.name} مرحباً بك`, description: response.message });
                }
            }
        } else {
            // RegisterAdmin
            const data = await RegisterAdmin(formData.name, formData.phone, formData.password);
            localStorage.setItem('token', data.token);
            navigate('/Branches');
            setAlertConfig({ isVisible: true, title: "تم الإنشاء", description: "يرجى إضافة بيانات فرعك الآن" });
        }
    } catch (error) {
        setAlertConfig({ 
            isVisible: true, 
            title: "خطأ", 
            description: error.message || "حدث خطأ غير متوقع" 
        });
    } finally {
        setLoading(false);
    }
};