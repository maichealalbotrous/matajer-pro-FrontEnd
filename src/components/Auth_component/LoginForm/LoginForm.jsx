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
    <div className="   flex items-center justify-center p-4 antialiased" dir="rtl">
      <Card className=" w-full max-w-[420px] rounded-[2.5rem] border-none shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-6 md:p-10 bg-white">
        
        <CardHeader className="space-y-2 text-center p-0 mb-8">
          <CardTitle className="text-2xl font-bold text-[#0f172a]">
            {Login === true ? "تسجيل الدخول" : "إنشاء حساب جديد"}
          </CardTitle>
          <CardDescription className="text-slate-400 font-medium text-sm">
            مرحباً بك مجدداً، يرجى إدخال بياناتك
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0 space-y-5">
          {Login === true ? (
            <>
              <MyInput placeholder="example_user" LabelTitle="اسم المستخدم" type="text" />
              <div className="space-y-1 px-1">
                <MyInput placeholder="••••••••" LabelTitle="كلمة المرور" type="password" />
               
                  <div className="flex justify-between items-center px-1">
                   <a href="#" className="text-xs font-bold text-[#3198c1] hover:underline">نسيت كلمة المرور؟</a>
                </div>
              </div>
            </>
          ) : (
            <>
              <MyInput placeholder="الاسم الكامل" LabelTitle="اسم المستخدم" type="text" />
              <MyInput placeholder="09xxxxxxxx" LabelTitle="رقم الهاتف" type="tel" />
              <MyInput placeholder="••••••••" LabelTitle="كلمة المرور" type="password" />
            </>
          )}

          {Login && (
            <div className="flex items-center gap-2 px-1 py-2">
              <input type="checkbox" id="remember" className=" cursor-pointer w-4 h-4 rounded border-slate-300 accent-[#0f172a]" />
              <label htmlFor="remember" className="text-xs font-semibold text-slate-400 cursor-pointer">
                تذكرني على هذا الجهاز
              </label>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-0 mt-8 flex flex-col gap-6">
          <MyButton 
            title={Login === true ? "دخول النظام" : "إنشاء الحساب"} 
          />

          <div className="text-center">
            <p className="text-sm text-slate-400 font-medium">
              {Login === true ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"}
              <button 
                onClick={() => Setlogin(!Login)}
                className=" cursor-pointer mr-2 mb-5 text-[#0f172a] font-black hover:underline underline-offset-4 transition-all"
              >
                {Login === true ? "إنشاء حساب جديد" : "سجل الدخول الآن"}
              </button>
            </p>
          </div>
        </CardFooter>

      </Card>
    </div>
  )
}