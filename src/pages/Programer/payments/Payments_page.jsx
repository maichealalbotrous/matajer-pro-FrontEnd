import PaymentsManager from '@/components/Programer_components/Payments/PaymentsManager/PaymentsManager'
import React from 'react'

function Payments_page({isOpen, setIsOpen}) {
  return (
    <div><PaymentsManager isOpen={isOpen} setIsOpen={setIsOpen}/></div>
  )
}

export default Payments_page