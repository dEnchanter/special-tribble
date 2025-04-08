type ProductionItem = {
  itemName: string;
  size: number;
  tailor: string;
  status: 'In Production' | 'Await QA' | 'Rejected' | 'Cleared';
  expectedTime: string; // assuming this is a date in the format of 'DD MMM'
};
