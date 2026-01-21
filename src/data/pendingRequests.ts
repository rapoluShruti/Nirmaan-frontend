export interface PendingRequest {
  id: string;
  siteId: string;
  type: 'Material' | 'Payment' | 'Equipment' | 'Other';
  item: string;
  quantity?: string;
  requestedBy: string;
  priority: 'low' | 'medium' | 'high';
  age: string;
  amount?: string;
}

export const pendingRequests: PendingRequest[] = [
  {
    id: 'r1',
    siteId: '1',
    type: 'Material',
    item: 'Cement - OPC 43',
    quantity: '500 bags',
    requestedBy: 'Supervisor - Suresh',
    priority: 'high',
    age: '2 days',
    amount: '₹2.5L',
  },
  {
    id: 'r2',
    siteId: '1',
    type: 'Material',
    item: 'MS Rebar 50T',
    quantity: '50 Ton',
    requestedBy: 'Supervisor - Amit',
    priority: 'high',
    age: '1 day',
    amount: '₹6.8L',
  },
  {
    id: 'r3',
    siteId: '3',
    type: 'Material',
    item: 'Sand - M-sand',
    quantity: '200 cu.m',
    requestedBy: 'Supervisor - Ramesh',
    priority: 'medium',
    age: '6 hours',
  },
  {
    id: 'r4',
    siteId: '5',
    type: 'Equipment',
    item: 'Mini Excavator - 1 month',
    requestedBy: 'Supervisor - Kiran',
    priority: 'low',
    age: '3 days',
    amount: '₹1.2L',
  },
  {
    id: 'r5',
    siteId: '2',
    type: 'Material',
    item: 'Tiles - Porcelain 600x600',
    quantity: '1000 pcs',
    requestedBy: 'Supervisor - Leena',
    priority: 'medium',
    age: '12 hours',
  },
];

export const getPendingMaterialRequests = () =>
  pendingRequests.filter((r) => r.type === 'Material');
