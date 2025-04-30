/* eslint-disable @typescript-eslint/no-explicit-any */
interface Invoice {
  id: number;                   // The unique identifier for the invoice
  invoiceNo: string;               // The unique invoice number (e.g., "INV12345")
  invoiceDetails: Record<string, any>;  // Additional details about the invoice (could be dynamic)
  customerId: number;              // The ID of the customer associated with the invoice
  generatedById: number;           // The ID of the user who generated the invoice
  status: string;                  // The status of the invoice (e.g., "Pending", "Paid", "Overdue")
}

interface InvoiceStages {
  id: number;            // The unique identifier for the invoice stage
  state: string;          // The state of the invoice stage (e.g., "Processing", "Completed")
  stageDate: string;      // The date when the invoice stage was reached (ISO string format)
  invoiceId: number;      // The ID of the associated invoice
  staffId: number;        // The ID of the staff member responsible for this stage
}