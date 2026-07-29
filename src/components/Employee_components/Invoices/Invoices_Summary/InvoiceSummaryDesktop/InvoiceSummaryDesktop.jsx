import React from 'react';
import InvoiceSummaryContent from '../InvoiceSummaryContent/InvoiceSummaryContent';

// Desktop variant: the original sticky card, unchanged, just isolated in its own folder/file.
const InvoiceSummaryDesktop = (props) => {
  return (
    <div className="hidden lg:block bg-[#050b1a] rounded-[40px] p-8 shadow-2xl text-white sticky top-8 text-right">
      <h2 className="text-xl font-black mb-6">إتمام العملية</h2>
      <InvoiceSummaryContent {...props} />
    </div>
  );
};

export default InvoiceSummaryDesktop;