import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { UserPlus, User, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import MyInput from '@/components/MyInput/MyInput';
import MyButton from '@/components/MyButton/MyButton';

function EmployeeModal({ isOpen, onClose, onSave, employee = null }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
  });

  // 💡 حالة التحكم بإظهار أو إخفاء كلمة المرور
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (employee) {
        setFormData({
          name: employee.name,
          phone: employee.phone,
          password: '',
        });
      } else {
        setFormData({ name: '', phone: '', password: '' });
      }
      setShowPassword(false); // إعادة تعيين حالة العين عند فتح المودال
    }
  }, [employee, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      alert('يرجى ملء الحقول الأساسية المطلوبة');
      return;
    }

    const dataToSave = {
      name: formData.name,
      phone: formData.phone,
    };

    // إرسال كلمة المرور فقط في حال الإضافة الجديدة أو إذا قام المدير بكتابة كلمة جديدة لتحديثها
    if (!employee || formData.password) {
      dataToSave.password = formData.password;
    }

    onSave(dataToSave);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[450px] rounded-[40px] border-none p-8 bg-white outline-none"
        showCloseButton={false}
      >
        <DialogHeader className="text-right">
          <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0f172a] mb-4">
            <UserPlus size={28} />
          </div>
          <DialogTitle className="text-2xl font-black text-[#0f172a]">
            {employee ? 'تعديل بيانات موظف' : 'إضافة موظف جديد'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-8" dir="rtl">
          {/* اسم الموظف */}
          <div className="space-y-1.5 text-right">
            <label className="block text-sm font-bold text-black">
            اسم الموظف الكامل
            </label>
            <MyInput
              icon={<User size={18} />}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="اسم الموظف الثلاثي"
            />
          </div>

          {/* رقم الهاتف */}
          <div className="space-y-1.5 text-right">
            <label className="block text-sm font-bold text-black">
              رقم الهاتف
            </label>
            <MyInput
              icon={<Phone size={18} />}
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="09xxxxxxxx"
            />
          </div>

          {/* كلمة المرور */}
          <div className="space-y-1.5 text-right">
            <label className="block text-sm font-bold text-black">
              {employee
                ? 'كلمة المرور الجديدة (اتركها فارغة لعدم التغيير)'
                : 'كلمة المرور'}
            </label>
            <div className="relative">
              <MyInput
                type={showPassword ? 'text' : 'password'}
                placeholder="........"
                icon={<Lock size={18} />}
                className="pr-6 pl-12" // ترك مسافة يسار للأيقونة
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                tabIndex={-1}
                aria-label={
                  showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'
                }
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <MyButton
            title={employee ? 'تحديث بيانات الموظف' : 'إضافة الموظف للفرع'}
            type="submit"
            className="w-full mt-4 py-4 bg-[#0f172a] text-white rounded-2xl font-black shadow-xl"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EmployeeModal;
