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

export default function AppRoutes() {
  const [cartItems, setCartItems] = useState([]);

  const addToInvoice = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  return (
    <Routes>
      <Route path="/Auth" element={<Auth_page />} />

      {/* --- (Admin Routes) --- */}
      <Route path="/AdminDashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/Inventory" element={<ProtectedRoute><Inventory_page /></ProtectedRoute>} />
      <Route path="/Invoices" element={<ProtectedRoute><Invoices_page /></ProtectedRoute>} />
      <Route path="/Settlements" element={<ProtectedRoute><Settlements_page /></ProtectedRoute>} />
      <Route path="/products" element={<ProtectedRoute><Products_page /></ProtectedRoute>} />
      <Route path="/products/:product_id/variants" element={<ProtectedRoute><ProductVariantsPage /></ProtectedRoute>} />
      <Route path="/Reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
      <Route path="/Employees" element={<ProtectedRoute><Employee_page /></ProtectedRoute>} />
      <Route path="/Expenses" element={<ProtectedRoute><Expenses_page /></ProtectedRoute>} />
      <Route path="/Discounts" element={<ProtectedRoute><DiscountsManager /></ProtectedRoute>} />

      {/* --- (Employee Flow Routes) --- */}
      
      <Route 
        path="/EmployeeDashboard" 
        element={<ProtectedRoute><EmployeeDashboard_page /></ProtectedRoute>} 
      />

      <Route 
        path="/EmployeeProducts" 
        element={<ProtectedRoute><EmployeeProducts_page /></ProtectedRoute>} 
      />

      <Route 
        path="/EmployeeProducts/:productId/variants" 
        element={
          <ProtectedRoute>
            <EmployeeProductVariants_page addToInvoice={addToInvoice} />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/CurrentInvoice" 
        element={
          <ProtectedRoute>
            <CurrentInvoice_page cartItems={cartItems} setCartItems={setCartItems} />
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