import ProductVariants from '@/components/Employee_components/ProductVariants/ProductVariants'
import React from 'react'

function EmployeeProductVariants_page({addToInvoice}) {
  return (
    <div><ProductVariants addToInvoice={addToInvoice}/></div>
  )
}

export default EmployeeProductVariants_page