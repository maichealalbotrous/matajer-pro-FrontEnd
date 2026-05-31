import React, { useEffect, useState } from 'react'
import HeaderDashboard from '@/components/Admin_component/HeaderDashboard/HeaderDashboard'
import SideBarDashboard from '@/components/Admin_component/SideBarDashboard/SideBarDashboard'
import InformationCard from '@/components/Admin_component/InformationCard/InformationCard'
import InvoicesCard from '@/components/Admin_component/Invoices/InvoicesCard/InvoicesCard'
import BranchesOverviewCard from '@/components/Branch_component/BranchesOverviewCard/BranchesOverviewCard'
import EmployeesMiniCard from '@/components/Admin_component/Employee/EmployeesMiniCard/EmployeesMiniCard'
import InventoryCard from '@/components/Admin_component/Inventory/InventoryCard/InventoryCard'

import ProductsStateCard from '@/components/Admin_component/Products/ProductsStatCard/ProductsStatCard'
import ExpensesCard from '@/components/Admin_component/Expenses/ExpensesCard/ExpensesCard'
import DiscountsStatsCard from '@/components/Admin_component/Discounts/DiscountsStatsCard/DiscountsStatsCard'
import { getProductsFromServer } from '@/components/Admin_component/Products/ProductsManager/lib'
import { getDiscountsFromServer } from '@/components/Admin_component/Discounts/DiscountsManager/lib'
import { getExpensesFromServer } from '@/components/Admin_component/Expenses/ExpensesManager/lib'
import { getInventoryAuditFromServer } from '@/components/Admin_component/Inventory/InventoryManager/lib'
import { getInvoicesServer } from '@/components/Admin_component/Invoices/InvoiceManager/lib'
import { getEmployees } from '@/components/Admin_component/Employee/EmployeeManager/lib'

function AdminDashboard() {
 const [Error, setError] = useState(null);


{/** Information Cards States //////////////////////////////////////////////////////////////*/}
const [informationData, setInformationData] = useState([]);
const [loadingStats, setLoadingStats] = useState(true);
{/** Information Cards States //////////////////////////////////////////////////////////////*/}

 {/**EmployeesList //////////////////////////////////////////////////////////////*/}
const [employeesList, setEmployeesList] = useState([]);
const [loadingEmployees, setLoadingEmployees] = useState(true);
{/**EmployeesList //////////////////////////////////////////////////////////////*/}


 {/**InvoicesList //////////////////////////////////////////////////////////////*/}
const [invoicesList, setInvoicesList] = useState([]);
const [loadingInvoices, setLoadingInvoices] = useState(true);
 {/**InvoicesList //////////////////////////////////////////////////////////////*/}


 {/**InventorysList //////////////////////////////////////////////////////////////*/}
  const [InventorysListList, setInventorysListList] = useState([]);
  const [LoadingInventory, setLoadingInventory] = useState(true);
    const [InventoryCardData, setInventoryCardData] = useState({});
 {/**InventorysList //////////////////////////////////////////////////////////////*/}

 {/**productsList //////////////////////////////////////////////////////////////*/}
  const [productsList, setProductsList] = useState([]);
  const [Loading, setLoading] = useState(true);
 {/**productsList //////////////////////////////////////////////////////////////*/}

 {/**DiscountssList //////////////////////////////////////////////////////////////*/}
  const [DiscountssList, setDiscountssList] = useState([]);
  const [loadingDiscounts, setLoadingDiscounts] = useState(true);
 {/**DiscountssList //////////////////////////////////////////////////////////////*/}


 {/**ExpensesList //////////////////////////////////////////////////////////////*/}
  const [ExpensesList, setExpensesList] = useState([]);
  const [loadingExpenses, setLoadingExpenses] = useState(true);
 {/**ExpensesList //////////////////////////////////////////////////////////////*/}

{/**Fetch & Calculate Stats UseEffect //////////////////////////////////////////////////////*/}


useEffect(() => {
  const fetchDashboardStats = async () => {
  try {
    setLoadingStats(true);

    // (Invoices & Employees)
    const [invoicesRes, employeesData] = await Promise.all([
      getInvoicesServer().catch(() => ({ data: [], statistics: {} })),
      getEmployees().catch(() => [])
    ]);

    const invoices = invoicesRes.data || [];
    const stats = invoicesRes.statistics || {};

    const pendingInvoices = invoices.filter(inv => inv.status === 'pending' || inv.status === 'انتظار' || inv.status === 'عالقة');
    
    const approvedInvoices = invoices.filter(inv => inv.status === 'approved' || inv.status === 'معتمدة');

    const dashboardStats = [
      {
        title: "صافي الأرباح المعتمدة",
        amount: stats.total_profits ? Number(stats.total_profits).toLocaleString('ar-EG') : "0",
        currency: "ل.س",
        percentage: stats.profit_growth || "0%+",
        trend: parseFloat(stats.profit_growth) >= 0 ? "up" : "down"
      },
      {
        title: "فواتير بانتظار الاعتماد",
        amount: pendingInvoices.length.toString(),
        currency: "فاتورة",
        percentage: pendingInvoices.length > 0 ? `${pendingInvoices.length} إجراء معلق` : "مستقر",
        trend: pendingInvoices.length > 0 ? "neutral" : "up"
      },
      {
        title: "الفواتير المرحّلة بنجاح",
        amount: approvedInvoices.length.toString(),
        currency: "عملية",
        percentage: "جاهزة بالتسويات",
        trend: "up"
      },
      {
        title: "إجمالي طاقم العمل",
        amount: employeesData.length.toString(),
        currency: "موظف",
        percentage: "نشط حالياً",
        trend: "up"
      }
    ];

    setInformationData(dashboardStats);
  } catch (err) {
    console.error("حدث خطأ أثناء إعداد إحصائيات لوحة التحكم:", err);
  } finally {
    setLoadingStats(false);
  }
};

  fetchDashboardStats();
}, []);
{/**🔄 Fetch & Calculate Stats UseEffect //////////////////////////////////////////////////////*/}



  {/**Employee UseEffect and fcuntions //////////////////////////////////////////////////////////////*/}


useEffect(() => {

 const fetchEmployeesCardData = async () => {
  try {
    setLoadingEmployees(true);
    const data = await getEmployees();
    setEmployeesList(data || []);
  } catch (err) {
    console.error("خطأ أثناء جلب قائمة الموظفين للكارد:", err);
  } finally {
    setLoadingEmployees(false);
  }
};

  fetchEmployeesCardData();
}, []);
  {/**Employee UseEffect and fcuntions //////////////////////////////////////////////////////////////*/}


  {/**Invoices UseEffect and fcuntions //////////////////////////////////////////////////////////////*/}

  useEffect(() => {
    const fetchInvoicesCardData = async () => {
  try {
    setLoadingInvoices(true);
    const res = await getInvoicesServer(); 
    
    const approvedInvoices = (res.data || [])
      .filter(inv => inv.status === 'approved' || inv.status === 'معتمدة')
      .slice(0, 3); 

    setInvoicesList(approvedInvoices);
  } catch (err) {
    console.error("خطأ أثناء جلب فواتير الكارد التلخيصي:", err);
  } finally {
    setLoadingInvoices(false);
  }
}
fetchInvoicesCardData();
},[])
  {/**Inventory UseEffect and fcuntions //////////////////////////////////////////////////////////////*/



  {/**Inventory UseEffect and fcuntions //////////////////////////////////////////////////////////////*/}
  useEffect(() => {

    const fetchInventoryCardData = async () => {
    try {
      setLoadingInventory(true);
      const res = await getInventoryAuditFromServer();
      
      setInventorysListList(res.items || []);
   
      const totalPieces = (res.items || []).reduce((sum, item) => sum + (Number(item.total_group_qty) || 0), 0);
      
      setInventoryCardData(prev => ({
        ...prev,
        count: totalPieces,
        subtitle: totalPieces > 0 ? "حالة المخزون العام مستقرة" : "المخزون فارغ حالياً",
        type: totalPieces > 0 ? "stable" : "warning"
      }));

    } catch (error) {
      console.error("Error fetching inventory for card:", error);
    } finally {
      setLoadingInventory(false);
    }
  };
fetchInventoryCardData();
  },[])
  {/**Inventory UseEffect and fcuntions //////////////////////////////////////////////////////////////*/}


  {/**Expenses UseEffect and fcuntions //////////////////////////////////////////////////////////////*/}

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoadingExpenses(true);
        const data = await getExpensesFromServer();
        setExpensesList(data);
      } catch (err) {
        console.error("فشل جلب المصاريف لكارت الإحصائيات:", err);
      } finally {
        setLoadingExpenses(false);
      }
    };

    fetchExpenses();
  }, []);

  // calculateTotalExpenses for the branch
  const calculateTotalExpenses = () => {
    if (ExpensesList.length === 0) return 0;
    
    return ExpensesList.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  };


  {/**Expenses UseEffect and fcuntions //////////////////////////////////////////////////////////////*/}


  {/**Discunts UseEffect and fcuntions //////////////////////////////////////////////////////////////*/}
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
    const percentageDiscounts = DiscountssList.filter(
      d => d.discount_type === 'percentage' && d.is_active
    );

    if (percentageDiscounts.length === 0) return 0;

    const total = percentageDiscounts.reduce((sum, item) => sum + Number(item.discount_value), 0);
    
    return Math.round(total / percentageDiscounts.length);
  };
   {/**Discunts UseEffect and fcuntions //////////////////////////////////////////////////////////////*/}


  {/**Products UseEffect and fcuntions //////////////////////////////////////////////////////////////*/}
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
  {/**Products UseEffect and fcuntions //////////////////////////////////////////////////////////////*/}



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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {loadingStats ? (
              Array(4).fill(0).map((_, n) => (
                <div key={n} className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-50 w-full animate-pulse space-y-4">
                  <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                  <div className="h-8 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-6 bg-slate-100 rounded-full w-1/3 mt-2"></div>
                </div>
              ))
            ) : (
              <InformationCard InformationData={informationData} />
            )}
          </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* InvoicesCard */}
              <div className="md:col-span-5">
                <InvoicesCard invoices={invoicesList} isLoading={loadingInvoices} />
              </div>

              {/* BranchesOverviewCard */}
          <div className="md:col-span-3">
            <BranchesOverviewCard />
          </div>

              {/* ProductsStateCard - تمرير آمن يحمي الكرت من الـ undefined */}
              <div className="md:col-span-4">
                <ProductsStateCard ProductsData={productsList && productsList.length > 0 ? productsList[0] : null} />
              </div>

              {/* EmployeesMiniCard */}
          <div className="md:col-span-4">
  <EmployeesMiniCard EmployeeData={employeesList} isLoading={loadingEmployees} />
</div>

              {/* InventoryCard */}
              <div className="md:col-span-4">
          <InventoryCard InventoryData={InventoryCardData} />   
           </div>

              {/* ExpensesCard */}
              <div className="md:col-span-4">
              <ExpensesCard 
              amount={loadingExpenses ? "..." : calculateTotalExpenses()} 
              /> 
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
}
export default AdminDashboard;