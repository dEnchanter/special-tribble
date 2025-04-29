/* eslint-disable @typescript-eslint/no-explicit-any */
interface ItemType { 
  id: number;         // Unique identifier for the item type
  name: string;           // Name of the item type (e.g., "Electronics", "Clothing")
  code: string;           // Date when the item type was last updated (ISO string format)
  unit: string;
}
interface RawItems {
  id: number;            // Unique identifier for the raw item
  name: string;
  code: string;
  quantity: number;
  description: string;
  unit: string;
  image_url: string;
  typeId: number;
}

interface RawItemTracker {
  staffId: number;      // The ID of the staff associated with the item tracking
  itemId: number;       // The ID of the item being tracked
  trackerDate: string;  // The date when the tracking event occurred (ISO string format)
  quantity: number;     // The quantity of items being tracked
  isAdded: boolean;     // Indicates if the item was added (true) or removed (false)
}

interface MaterialRequest {
  id: number;             // Unique identifier for the material request
  requestDate: string;           // The date when the material request was made (ISO string format)
  approveDate: string;           // The date when the material request was approved (ISO string format)
  requesterId: number;           // The ID of the person who made the request
  approvedId: number;            // The ID of the person who approved the request
  quantity: Record<string, any>; // The quantity of materials requested, could be an object depending on the data structure
  materials: Record<string, any>; // The materials being requested, could include metadata or specific details
  isAssigned: boolean;           // Indicates whether the materials are assigned to the production
  productionId: number;          // The ID of the production associated with this material request
}