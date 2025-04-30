/* eslint-disable @typescript-eslint/no-explicit-any */
interface Product {
  id: number;
  assignDate: string;         // The date when the product was assigned (ISO string format)
  code: string;               // A unique code or identifier for the product
  stage: string;              // The current stage of the product (e.g., "In Production", "Completed")
  tailorId: number;           // The ID of the tailor responsible for the product
  productInfo: Record<string, any>; // Additional information about the product (could be dynamic)
  materialRequestId: number;  // The ID of the related material request
}

interface ProductStockStage {
  id: number;              // Unique identifier for the product stock stage
  stage: string;  
  stageDate: string;         // The name or description of the stage (e.g., "In Stock", "Shipped")
  stockId: number;  // The ID of the related product stock
  invoiceId: number;          // The current status of the stage (e.g., "Completed", "Pending", etc.)
  staffId: number;      // Optional start date of the stage (ISO string)
}

interface ProductStock {
  id: number;
  productionCode: string;           // The unique production code for the product stock
  pushedBy: number;                 // The ID of the user who pushed the product to the stock
  receivedBy: number;               // The ID of the user who received the product into the stock
  productInfo: Record<string, any>; // Additional information about the product (could be dynamic)
  isAvailable: boolean;             // Indicates if the product is currently available in stock
  productDefId: number;             // The ID of the product definition associated with this stock
}

interface ProductionStages {
  id: number;            // Unique identifier for the production stage
  changeDate: string;      // The date when the stage was changed (ISO string format)
  stageName: string;       // The name of the production stage (e.g., "In Progress", "Completed")
  description: string;     // A description of the stage or any relevant details
  productionId: number;   // The ID of the production this stage is associated with
  staffId: number;        // The ID of the staff member responsible for this stage
}

interface ProductInProduction {
  id: number;               // Unique identifier for the product in production
  dateRequested: string;        // The date when the product was requested (ISO string format)
  requestedBy: number;          // The ID of the person who requested the product for production
  quantity: Record<string, any>; // The quantity of products requested, could be an object depending on the data structure
  productGuide: Record<string, any>; // Additional guide or instructions for the product, flexible structure
  isActive: boolean;            // Indicates if the product request is active
  productId: number;            // The ID of the product being requested
}

interface ProductDef {
  id: number;               // Unique identifier for the product definition
  code: string;               // A unique code for the product definition
  name: string;               // Name of the product
  cost: number;               // The cost associated with the product
  def: Record<string, any>;   // Additional properties or specifications for the product (could be dynamic)
  productSizes: Record<string, any>; // Sizes related to the product (could include different size types)
  description: string;        // A detailed description of the product
  genderType: string;         // Gender type associated with the product (e.g., "Male", "Female", "Unisex")
  creatorId: number;          // The ID of the user who created the product definition
}
