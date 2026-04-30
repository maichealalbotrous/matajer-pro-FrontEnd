import { Key, LayoutGrid, Wallet } from "lucide-react";

export const defaultStats = [
    { 
      title: "إجمالي الإيرادات", 
      value: "482,900", unit: "ر.س", 
      subValue: "+12% منذ الشهر الماضي", 
      icon: Wallet, colorClass: "bg-blue-50 text-[#3198c1]", trend: 12 
    },
    { 
      title: "الاشتراكات النشطة", 
      value: "1,240", unit: "مفتاح", 
      subValue: "85 اشتراك جديد اليوم", 
      icon: Key, colorClass: "bg-orange-50 text-orange-500" 
    },
    { 
      title: "إجمالي الفروع", 
      value: "56", unit: "موقع", 
      subValue: "4 فروع قيد التجهيز", 
      icon: LayoutGrid, colorClass: "bg-indigo-50 text-indigo-500" 
    }
  ];

 