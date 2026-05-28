import React, { useEffect, useState } from 'react'
import HeaderDashboard from '@/components/Admin_component/HeaderDashboard/HeaderDashboard'
import SideBarDashboard from '@/components/Admin_component/SideBarDashboard/SideBarDashboard'
import InformationCard from '@/components/Admin_component/InformationCard/InformationCard'
import InvoicesCard from '@/components/Admin_component/Invoices/InvoicesCard/InvoicesCard'
import BranchesOverviewCard from '@/components/Branch_component/BranchesOverviewCard/BranchesOverviewCard'
import EmployeesMiniCard from '@/components/Admin_component/Employee/EmployeesMiniCard/EmployeesMiniCard'
import InventoryCard from '@/components/Admin_component/Inventory/InventoryCard/InventoryCard'

// البيانات التجريبية والاحتياطية
import { testEmployees } from '@/components/Admin_component/Employee/EmployeesMiniCard/lib';
import { testInvoices } from '@/components/Admin_component/Invoices/InvoicesCard/lib';
import { testinformationData } from '@/components/Admin_component/InformationCard/lib';
import ProductsStateCard from '@/components/Admin_component/Products/ProductsStatCard/ProductsStatCard'
import { testInventoryData } from '@/components/Admin_component/Inventory/InventoryCard/lib.jsx';
import ExpensesCard from '@/components/Admin_component/Expenses/ExpensesCard/ExpensesCard'
import DiscountsStatsCard from '@/components/Admin_component/Discounts/DiscountsStatsCard/DiscountsStatsCard'
import { getProductsFromServer } from '@/components/Admin_component/Products/ProductsManager/lib'
import { getDiscountsFromServer } from '@/components/Admin_component/Discounts/DiscountsManager/lib'

function AdminDashboard() {
  const [productsList, setProductsList] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Error, setError] = useState(null);

  const [DiscountssList, setDiscountssList] = useState([]);
  const [loadingDiscounts, setLoadingDiscounts] = useState(true);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        setLoadingDiscounts(true);
        const data = await getDiscountsFromServer();
        setDiscountssList(data);
      } catch (err) {
        console.error("فشل جلب الخصومات للكارت الإحصائي:", err);
      } finally {
        setLoadingDiscounts(false);
      }
    };

    fetchDiscounts();
  }, []);

  const calculateAverageDiscount = () => {
    // فلترة الخصومات النشطة والتي تعتمد على النسبة المئوية
    const percentageDiscounts = DiscountssList.filter(
      d => d.discount_type === 'percentage' && d.is_active
    );

    if (percentageDiscounts.length === 0) return 0;

    const total = percentageDiscounts.reduce((sum, item) => sum + Number(item.discount_value), 0);
    
    // إرجاع المتوسط مقرباً لأقرب رقم صحيح
    return Math.round(total / percentageDiscounts.length);
  };

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProductsFromServer();
        if (isMounted) {
          setProductsList(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        if (isMounted) {
          setError(err.message || "فشل تحميل المنتجات من السيرفر.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();
    return () => { isMounted = false; };
  }, []);


  useEffect(()=>{

  },[])

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden" dir="rtl">
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 transition-all duration-300">
          <div className="max-w-7xl mx-auto space-y-10">
            
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-[#0f172a]">مرحباً بك في لوحة التحكم</h1>
              <p className="text-slate-400 font-bold">هذه نظرة عامة على أداء النظام اليوم.</p>
            </div>

            {/* InformationCard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <InformationCard InformationData={testinformationData}/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* InvoicesCard */}
              <div className="md:col-span-5">
                <InvoicesCard invoices={testInvoices} />
              </div>

              {/* BranchesOverviewCard */}
              <div className="md:col-span-7">
                <BranchesOverviewCard BranchCount={12} />
              </div>

              {/* ProductsStateCard - تمرير آمن يحمي الكرت من الـ undefined */}
              <div className="md:col-span-4">
                <ProductsStateCard ProductsData={productsList && productsList.length > 0 ? productsList[0] : null} />
              </div>

              {/* EmployeesMiniCard */}
              <div className="md:col-span-4">
                <EmployeesMiniCard EmployeeData={testEmployees}/>
              </div>

              {/* InventoryCard */}
              <div className="md:col-span-4">
                <InventoryCard InventoryData={testInventoryData[0]} />
              </div>

              {/* ExpensesCard */}
              <div className="md:col-span-4">
                <ExpensesCard amount={128400} />
              </div>

              {/* DiscountsStatsCard */}
             <DiscountsStatsCard 
             averageDiscount={loadingDiscounts ? "..." : calculateAverageDiscount()} 
            />

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard;