import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import MyInput from "@/components/MyInput/MyInput";
import MyButton from "@/components/MyButton/MyButton";
import { LoginUser } from "./lib";
import Public_Alert from "@/components/public_Alert/Public_Alert";
 import { handleAuthSubmit } from "./lib"; 
import AuthHeader from "../AuthHeader/AuthHeader";

export function LoginForm() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  // onSubmit
  const onSubmit = () => {
    handleAuthSubmit({
      isLoginMode,
      formData,
      setLoading,
      navigate,
      setAlertConfig
    });
  };
  return (

    <div className="min-h-screen flex items-center justify-center p-4 antialiased " dir="rtl">
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
            {isLoginMode ? "مرحباً بك مجدداً، يرجى إدخال بياناتك" : "ابدأ رحلتك معنا بإعداد حسابك الشخصي"}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0 space-y-6">
          {!isLoginMode && (
            <MyInput 
              placeholder="مثال: أحمد محمد" 
              LabelTitle="الاسم الكامل" 
              className="bg-slate-50 border-none rounded-2xl h-14 px-6 font-bold"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          )}
          
          <MyInput 
            placeholder="مثال: 01012345678" 
            LabelTitle="رقم الهاتف أو المستخدم" 
            type="tel" 
            className="bg-slate-50 border-none rounded-2xl h-14 px-6 font-bold"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
          
          <div className="space-y-2">
            <MyInput 
              placeholder="••••••••" 
              LabelTitle="كلمة المرور" 
              type="password" 
              className="bg-slate-50 border-none rounded-2xl h-14 px-6 font-bold"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            {isLoginMode && (
              <div className="flex justify-start px-1">
                <button className="text-[11px] font-black text-[#3198c1] hover:text-[#257a9c]">نسيت كلمة المرور؟</button>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-0 mt-10 flex flex-col gap-8">
          <div className="w-full">
           <MyButton 
              className="bg-gray-900 text-white"
              title={loading ? "جاري المعالجة..." : (isLoginMode ? "دخول النظام ←" : "إنشاء الحساب ←")} 
              onClick={onSubmit} 
              disabled={loading}
            />
          </div>

          <div className="text-center w-full">
            <button 
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="  mb-4 text-xs font-bold text-slate-400 hover:text-[#0f172a] transition-all"
            >
              {isLoginMode ? "ليس لديك حساب؟ انشئ حساباً الآن" : "لديك حساب بالفعل؟ سجل الدخول الآن"}
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}