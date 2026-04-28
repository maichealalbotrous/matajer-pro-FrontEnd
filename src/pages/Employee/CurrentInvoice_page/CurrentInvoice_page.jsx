import CurrentInvoice from '@/components/Employee_components/CurrentInvoice/CurrentInvoice'
import React from 'react'

function CurrentInvoice_page({ cartItems, setCartItems }) {
  return (
    <div>            <CurrentInvoice cartItems={cartItems} setCartItems={setCartItems} />
</div>
  )
}

export default CurrentInvoice_page