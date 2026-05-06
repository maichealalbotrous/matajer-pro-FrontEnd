import SubscriptionKeysManager from '@/components/Programer_components/SubscriptionKeys/SubscriptionKeysManager/SubscriptionKeysManager'
import React from 'react'

function SubKey_Page({isOpen, setIsOpen}) {
  return (
    <div><SubscriptionKeysManager isOpen={isOpen} setIsOpen={setIsOpen}/></div>
  )
}

export default SubKey_Page