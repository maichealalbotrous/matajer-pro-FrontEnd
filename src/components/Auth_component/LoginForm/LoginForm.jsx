import MyInput from "@/components/MyInput/MyInput"
import MyButton from "@/components/MyButton/MyButton"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react"

export function LoginForm() {
  const [Login, Setlogin] = useState(true)

  return (
    // أضفنا تدرج لوني للخلفية ليبرز الكارد
    <div className="min-h-screen flex items-center justify-center p-4 antialiased from-slate-50 via-white to-slate-100" dir="rtl">
      
      {/* الكارد: أضفنا ظل عميق وشفافية بسيطة */}
      <Card className="w-full max-w-[420px] rounded-[2.5rem] border border-slate-100/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] p-8 md:p-10  backdrop-blur-xl">
        
        <CardHeader className="space-y-2 text-center p-0 mb-8">
          <CardTitle className="text-3xl font-extrabold text-[#0f172a] tracking-tighter">
            {Login === true ? "مرحباً بعودتك" : "إنشاء حساب جديد"}
          </CardTitle>
          <CardDescription className="text-slate-500 font-medium text-sm">
            {Login === true 
              ? "سعداء برؤيتك مجدداً، يرجى تسجيل الدخول" 
              : "ابدأ رحلتك معنا بإنشاء حساب جديد"}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0 space-y-5">
          <div className="transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
            {Login === true ? (
              <>
                <MyInput placeholder="اسم المستخدم" LabelTitle="اسم المستخدم" type="text" />
                <div className="space-y-2">
                  <MyInput placeholder="••••••••" LabelTitle="كلمة المرور" type="password" />
                  <div className="flex justify-end px-1">
                    <a href="#" className="text-xs font-bold text-[#3198c1] hover:text-[#257a9c] transition-colors">نسيت كلمة المرور؟</a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <MyInput placeholder="أدخل اسمك الكامل" LabelTitle="الاسم الكامل" type="text" />
                <MyInput placeholder="09xxxxxxxx" LabelTitle="رقم الهاتف" type="tel" />
                <MyInput placeholder="••••••••" LabelTitle="كلمة المرور" type="password" />
              </>
            )}
          </div>

          {Login && (
            <div className="flex items-center gap-2 px-1 py-2">
              {/* تحسين مظهر التشيك بوكس */}
              <input 
                type="checkbox" 
                id="remember" 
                className="w-4 h-4 rounded border-slate-300 accent-[#0f172a] cursor-pointer hover:accent-[#1e293b] transition-all" 
              />
              <label htmlFor="remember" className="text-xs font-semibold text-slate-500 cursor-pointer hover:text-slate-700 transition-colors">
                تذكرني على هذا الجهاز
              </label>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-0 mt-8 flex flex-col gap-6">
          <div className="w-full transform transition-transform hover:scale-[1.02] active:scale-[0.98]">
            <MyButton 
              title={Login === true ? "دخول النظام" : "إنشاء الحساب"} 
            />
          </div>

          <div className="text-center w-full">
            <p className="text-sm text-slate-500 font-medium">
              {Login === true ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"}
              <button 
                onClick={() => Setlogin(!Login)}
                className="cursor-pointer mb-3 mr-2 text-[#0f172a] font-bold hover:underline underline-offset-4 decoration-2 transition-all"
              >
                {Login === true ? "إنشاء حساب" : "سجل الدخول"}
              </button>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}