import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Auth_page from "@/pages/Auth/Auth_page";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AdminDashboard from "@/pages/ِAdmin/AdminDashboard/AdminDashboard";
import Inventory_page from "@/pages/ِAdmin/Inventory/Inventory_page";
import Invoices_page from "@/pages/ِAdmin/Invoices/Invoices_page";
import Products_page from "@/pages/ِAdmin/Products/Products_page";
import ProductVariantsPage from "@/components/Admin_component/Products/ProductVariantsPage/ProductVariantsPage";
import Reports from "@/pages/ِAdmin/Reports/Reports";
import Employee_page from "@/pages/ِAdmin/Employee/Employee_page";
import Expenses_page from "@/pages/ِAdmin/Expenses_page/Expenses_page";
import Settlements_page from "@/pages/ِAdmin/Settlements/Settlements_page";
import DiscountsManager from "@/components/Admin_component/Discounts/DiscountsManager/DiscountsManager";
import EmployeeDashboard_page from "@/pages/Employee/EmployeeDashboard_page/EmployeeDashboard_page";
import CurrentInvoice_page from "@/pages/Employee/CurrentInvoice_page/CurrentInvoice_page";
import EmployeeProducts_page from "@/pages/Employee/Products_page/Products_page";
import EmployeeProductVariants_page from "@/pages/Employee/ProductVariants_page/EmployeeProductVariants_page";
import {ProgramerLayout} from '../../Layout/ProgramerSideBar/ProgramerLayout'
import ProgramerDashboard_page from "@/pages/Programer/ProgramerDashboard_page/ProgramerDashboard_page";
import Branches_page from "@/pages/Programer/Branches/Branches_page";
import Payments_page from "@/pages/Programer/payments/Payments_page";
import SubKey_Page from "@/pages/Programer/KeySub/SubKey_Page";
import {AdminLayout} from "@/Layout/AdminSideBar/AdminLayout";
import EmployeeLayout from "@/Layout/EmployeeSideBar/EmployeeLayout";
import ValidateCode_page from "@/pages/validateCode/validateCode_page";
import Branches from "@/components/Branch_component/Branches/Branches";

export default function AppRoutes() {
  const [cartItems, setCartItems] = useState([]);

  const addToInvoice = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  return (
    <Routes>
      <Route path="/Auth" element={<Auth_page />} />
      <Route path="/ValidateCode" element={<ValidateCode_page />} />
      <Route path="/Branches" element={<Branches />} />




      {/* --- (Admin Routes) --- */}
      <Route path="/AdminDashboard" element={<ProtectedRoute><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
      <Route path="/Inventory" element={<ProtectedRoute><AdminLayout><Inventory_page /></AdminLayout></ProtectedRoute>} />
      <Route path="/Invoices" element={<ProtectedRoute><AdminLayout><Invoices_page /></AdminLayout></ProtectedRoute>} />
      <Route path="/Settlements" element={<ProtectedRoute><AdminLayout><Settlements_page /></AdminLayout></ProtectedRoute>} />
      <Route path="/products" element={<ProtectedRoute><AdminLayout><Products_page /></AdminLayout></ProtectedRoute>} />
      <Route path="/products/:product_id/variants" element={<ProtectedRoute><AdminLayout><ProductVariantsPage /></AdminLayout></ProtectedRoute>} />
      <Route path="/Reports" element={<ProtectedRoute><AdminLayout><Reports /></AdminLayout></ProtectedRoute>} />
      <Route path="/Employees" element={<ProtectedRoute><AdminLayout><Employee_page /></AdminLayout></ProtectedRoute>} />
      <Route path="/Expenses" element={<ProtectedRoute><AdminLayout><Expenses_page /></AdminLayout></ProtectedRoute>} />
      <Route path="/Discounts" element={<ProtectedRoute><AdminLayout><DiscountsManager /></AdminLayout></ProtectedRoute>} />

      {/* --- (Employee Flow Routes) --- */}
      
      <Route 
        path="/EmployeeDashboard" 
        element={<ProtectedRoute><EmployeeLayout><EmployeeDashboard_page /></EmployeeLayout></ProtectedRoute>} 
      />

      <Route 
        path="/EmployeeProducts" 
        element={<ProtectedRoute><EmployeeLayout><EmployeeProducts_page /></EmployeeLayout></ProtectedRoute>} 
      />

      <Route 
        path="/EmployeeProducts/:productId/variants" 
        element={
          <ProtectedRoute>
            <EmployeeLayout>
            <EmployeeProductVariants_page addToInvoice={addToInvoice} />
            </EmployeeLayout>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/CurrentInvoice" 
        element={
          <ProtectedRoute>
           <EmployeeLayout>
            <CurrentInvoice_page cartItems={cartItems} setCartItems={setCartItems} />
          </EmployeeLayout>
        </ProtectedRoute>
        } 
      />

      {/*Programer Routes */}

      {/*programer Dashboard */}

<Route 
  path="/ProgramerDashboard" 
  element={
    <ProtectedRoute>
      <ProgramerLayout>
        <ProgramerDashboard_page />
      </ProgramerLayout>
    </ProtectedRoute>
  } 
/>
{/*programer branches */}
<Route 
  path="/ProgramerBranches" 
  element={
    <ProtectedRoute>
      <ProgramerLayout>
        <Branches_page />
      </ProgramerLayout>
    </ProtectedRoute>
  } 
/>

{/*payments programer */}
<Route 
  path="/payments" 
  element={
    <ProtectedRoute>
      <ProgramerLayout>
        <Payments_page />
      </ProgramerLayout>
    </ProtectedRoute>
  } 
/>


{/*SubscriptionKeys */}
<Route 
  path="/subscriptions" 
  element={
    <ProtectedRoute>
      <ProgramerLayout>
        <SubKey_Page />
      </ProgramerLayout>
    </ProtectedRoute>
  } 
/>

      <Route path="/" element={<Navigate to="/Auth" />} />
      <Route path="*" element={<div>404 - الصفحة غير موجودة</div>} />
    </Routes>
  );
}