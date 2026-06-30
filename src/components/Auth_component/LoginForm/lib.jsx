import api from './api';

//login
export const LoginUser = async (phone, password) => {
    try {
        const response = await api.post('/Auth/login', { phone, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "حدث خطأ في الاتصال" };
    }
};

//register
export const RegisterAdmin = async (name, phone, password) => {
    try {
        const response = await api.post('/Auth/register', { name, phone, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "حدث خطأ أثناء إنشاء الحساب" };
    }
};

//Logout
export const LogoutUser = async () => {
    try {
        // يتم إرسال الطلب، وسيأخذ كود الـ Axios التوكن تلقائياً من الـ Headers إذا كان مبرمجاً لديك
        const response = await api.post('/Auth/logout');
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "حدث خطأ أثناء تسجيل الخروج من السيرفر" };
    }
};

//handleAuthSubmit

export const handleAuthSubmit = async ({ 
    isLoginMode, 
    formData, 
    setLoading, 
    navigate, 
    setAlertConfig,
    login 
}) => {
    setLoading(true);
    try {
        if (isLoginMode) {
            const response = await LoginUser(formData.phone, formData.password);
            
            login(response.user, response.token);

            if (response.role === 'super_admin') {
                navigate('/ProgramerDashboard');
            } 
            else if (response.role === 'admin') {
                if (!response.branch_id) {
                    setAlertConfig({ isVisible: true, title: "إعداد مطلوب", description: "يرجى إضافة فرع للمتابعة" });
                    setTimeout(() => {
                    setAlertConfig({ isVisible:false, title: "", description: "" });
                    }, 3000);
                    navigate('/Branches');
                } else if (!response.is_active) {
                    setAlertConfig({ isVisible: true, title: "تفعيل مطلوب", description: response.message });
                   setTimeout(() => {
                    setAlertConfig({ isVisible:false, title: "", description: "" });
                    }, 3000);
                    navigate('/ValidateCode');
                } else {
                    navigate('/AdminDashboard');
                     setTimeout(() => {
                    setAlertConfig({ isVisible:false, title: "", description: "" });
                    }, 3000);
                    setAlertConfig({ isVisible: true, title: `${response.user.name} مرحباً بك أيها المدير`, description: response.message });
                }
            } 
            else if (response.role === 'employee') {
                const user = response.user;

                if (!user || !user.branch_id) {
                    setAlertConfig({ 
                        isVisible: true, 
                        title: "المستخدم غير موجود", 
                        description: "هذا الحساب غير مرتبط بفرع حالياً" 
                    });
                      setTimeout(() => {
                    setAlertConfig({ isVisible:false, title: "", description: "" });
                    }, 3000);
                    navigate('/Auth');
                } 
            else if (!response.is_active || (user.branch && !user.branch.is_active)) {
                setAlertConfig({ 
                    isVisible: true, 
                    title: "اشتراك منتهي", 
                    description: "الفرع التابع لك غير مفعل حالياً" 
                });
                 setTimeout(() => {
                    setAlertConfig({ isVisible:false, title: "", description: "" });
                    }, 3000);
                navigate('/Auth');
            } 
            else {
                navigate('/EmployeeDashboard');
                setAlertConfig({ 
                    isVisible: true, 
                    title: `مرحباً بك ${user.name}`, 
                    description: response.message || "تم تسجيل الدخول بنجاح" 
                });
                  setTimeout(() => {
                    setAlertConfig({ isVisible:false, title: "", description: "" });
                    }, 3000);
            }
        }
        } else {
            const data = await RegisterAdmin(formData.name, formData.phone, formData.password);
            
            login(data.user, data.token);
            
            navigate('/Branches');
            setAlertConfig({ isVisible: true, title: "تم الإنشاء", description: "يرجى إضافة بيانات فرعك الآن" });
          setTimeout(() => {
                    setAlertConfig({ isVisible:false, title: "", description: "" });
                    }, 3000);
        }
    } catch (error) {
        setAlertConfig({ 
            isVisible: true, 
            title: "خطأ", 
            description: error.message || "حدث خطأ غير متوقع" 
        });
          setTimeout(() => {
         setAlertConfig({ isVisible:false, title: "", description: "" });
         }, 3000);
    } finally {
        setLoading(false);
    }
};



export const handleLogoutSubmit = async ({
    setLoading,
    navigate,
    setAlertConfig,
    logout 
}) => {
    if (setLoading) setLoading(true);
    
    try {
        await LogoutUser();
        
        if (logout) logout();
        
        navigate('/Auth');
        
        setAlertConfig({
            isVisible: true,
            title: "تم تسجيل الخروج",
            description: "تم إنهاء جلستك بنجاح وأمان."
        });
        setTimeout(() => {
            setAlertConfig({ isVisible: false, title: "", description: "" });
        }, 3000);

    } catch (error) {
        if (logout) logout();
        navigate('/Auth');
        
        setAlertConfig({ 
            isVisible: true, 
            title: "تنبيه", 
            description: error.message || "تم تسجيل الخروج محلياً." 
        });
        setTimeout(() => {
            setAlertConfig({ isVisible: false, title: "", description: "" });
        }, 3000);
    } finally {
        if (setLoading) setLoading(false);
    }
}