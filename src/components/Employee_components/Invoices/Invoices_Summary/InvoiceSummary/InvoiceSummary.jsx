import React from 'react';
import InvoiceSummaryDesktop from '../InvoiceSummaryDesktop/InvoiceSummaryDesktop';
import InvoiceSummaryMobile from '../InvoiceSummaryMobile/InvoiceSummaryMobile';

// Main entry point — kept as the single import used by CurrentInvoice.
// Same props in/out as before; internally it just renders the desktop
// card and the mobile bar/sheet, each isolated in its own folder/file.
const InvoiceSummary = (props) => {
  return (
    <>
      <InvoiceSummaryDesktop {...props} />
      <InvoiceSummaryMobile {...props} />
    </>
  );
};

export default InvoiceSummary;