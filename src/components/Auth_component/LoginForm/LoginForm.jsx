import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import MyInput from "@/components/MyInput/MyInput";
import MyButton from "@/components/MyButton/MyButton";
import { LoginUser } from "./lib";
import Public_Alert from "@/components/public_Alert/Public_Alert";
import { handleAuthSubmit } from "./lib"; 
import AuthHeader from "../AuthHeader/AuthHeader";
import { useAuth } from "@/context/AuthContext/AuthContext";

export function LoginForm() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: ''
  });

  const [AlertConfig, setAlertConfig] = useState({
    isVisible: false,
    title: "",
    description: ""
  });

  const { login } = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();
    handleAuthSubmit({
        isLoginMode,
        formData,
        setLoading,
        navigate,
        setAlertConfig,
        login 
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 antialiased" dir="rtl">
     {AlertConfig.isVisible && (
        <Public_Alert 
          isVisible={AlertConfig.isVisible} 
          title={AlertConfig.title} 
          dis={AlertConfig.description}
          onClose={() => setAlertConfig(prev => ({...prev, isVisible: false}))} 
        />
      )}
      <Card className="w-full max-w-[440px] rounded-[3rem] border-none shadow-[0_30px_100px_-20px_rgba(0,0,0,0.06)] p-10 md:p-14 bg-white/90 backdrop-blur-sm">
        
        <CardHeader className="space-y-1 text-right p-0 mb-8">
          <CardTitle className="text-3xl font-[900] text-[#0f172a]">
            {isLoginMode ? "تسجيل الدخول" : "إنشاء حساب"}
          </CardTitle>
          <CardDescription className="text-slate-400 font-bold text-sm">
            {isLoginMode ? "مرحباً بك مجدداً، يرجى إدخال بياناتك (ملاحظة هذا الخيار مخصص للمدير والموظف)" : "ابدأ رحلتك معنا بإعداد حسابك الشخصي (ملاحظة هذا الخيار مخصص فقط للمدير صاحب الفرع)"}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0 space-y-5">
          {/* الاسم الكامل */}
          {!isLoginMode && (
            <div className="space-y-1.5 text-right">
              <label className="block text-sm font-bold text-black">
                الاسم الكامل
              </label>
              <MyInput 
                placeholder="مثال: أحمد محمد" 
                className="bg-slate-50 border-none rounded-2xl h-14 px-6 font-bold"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          
          {/* رقم الهاتف أو المستخدم */}
          <div className="space-y-1.5 text-right">
            <label className="block text-sm font-bold text-black">
              رقم الهاتف 
            </label>
            <MyInput 
              placeholder="مثال: 01012345678" 
              type="tel" 
              className="bg-slate-50 border-none rounded-2xl h-14 px-6 font-bold"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          
          {/* كلمة المرور */}
          <div className="space-y-1.5 text-right">
            <label className="block text-sm font-bold text-black">
              كلمة المرور
            </label>
            <div className="relative">
              <MyInput 
                placeholder="••••••••" 
                type={showPassword ? "text" : "password"} 
                className="bg-slate-50 border-none rounded-2xl h-14 pr-6 pl-12 font-bold"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {isLoginMode && (
              <div className="flex justify-start px-1 pt-1">
                <button type="button" className="text-[11px] font-black text-[#3198c1] hover:text-[#257a9c]">نسيت كلمة المرور؟</button>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-0 mt-8 flex flex-col items-center w-full">
          <div className="w-full mb-5">
            <MyButton 
              className="bg-slate-900 hover:bg-slate-800 text-white w-full py-3.5 rounded-xl text-sm font-bold transition-all active:scale-[0.99] disabled:opacity-50"
              title={loading ? "جاري المعالجة..." : (isLoginMode ? "دخول النظام ←" : "إنشاء الحساب ←")} 
              onClick={onSubmit} 
              disabled={loading}
            />
          </div>

          <div className="text-center w-full mb-8">
            <button 
              type="button"
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="text-xs font-black text-slate-400 hover:text-slate-700 transition-colors"
            >
              {isLoginMode ? "ليس لديك حساب؟ انشئ حساباً الآن" : "لديك حساب بالفعل؟ سجل الدخول الآن"}
            </button>
          </div>

          <div className="w-full text-center border-t border-slate-100/70 pt-4 opacity-40 hover:opacity-100 transition-opacity duration-300">
            <p className="text-[10px] font-mono tracking-wider text-slate-600">
              © 2026 matajer-Pro. Crafted with Code by{" "}
              <span className="font-bold text-sm text-blue-800">ENG.Michael_Alboutros</span>
            </p>
          </div>
        </CardFooter>

      </Card>
    </div>
  );
}