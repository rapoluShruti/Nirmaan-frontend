export interface Task {
  id: string;
  category: string;
  description: string;
  assignedWorkers: string[];
  beforePhoto: string;
  afterPhoto: string;
  status: 'Completed' | 'In Progress' | 'Blocked';
  endDate: string;
  waitingForApproval: boolean;
  priority: 'High' | 'Medium' | 'Low';
}

export interface Worker {
  id: string;
  name: string;
  role: string;
  present: boolean;
}

export interface Material {
  id: string;
  name: string;
  issued: number;
  remaining: number;
  unit: string;
}

export const budgetData = {
  total: 2500000,
  spent: 1750000,
  remaining: 750000,
  currency: 'USD',
};

export const tasks: Task[] = [
  {
    id: 'T001',
    category: 'Foundation',
    description: 'Pour concrete for basement level 2',
    assignedWorkers: ['John Smith', 'Mike Johnson'],
    beforePhoto: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&h=150&fit=crop',
    afterPhoto: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=200&h=150&fit=crop',
    status: 'Completed',
    endDate: '2025-12-23',
    waitingForApproval: false,
    priority: 'High',
  },
  {
    id: 'T002',
    category: 'Electrical',
    description: 'Install main electrical panel on floor 3',
    assignedWorkers: ['David Lee', 'Sarah Connor'],
    beforePhoto: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&h=150&fit=crop',
    afterPhoto: '',
    status: 'In Progress',
    endDate: '2025-12-26',
    waitingForApproval: false,
    priority: 'High',
  },
  {
    id: 'T003',
    category: 'Plumbing',
    description: 'Connect water supply lines to kitchen area',
    assignedWorkers: ['Tom Wilson'],
    beforePhoto: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=200&h=150&fit=crop',
    afterPhoto: '',
    status: 'Blocked',
    endDate: '2025-12-20',
    waitingForApproval: false,
    priority: 'Medium',
  },
  {
    id: 'T004',
    category: 'Framing',
    description: 'Complete roof framing section A',
    assignedWorkers: ['James Brown', 'Robert Taylor', 'Chris Evans'],
    beforePhoto: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=200&h=150&fit=crop',
    afterPhoto: 'https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?w=200&h=150&fit=crop',
    status: 'Completed',
    endDate: '2025-12-24',
    waitingForApproval: true,
    priority: 'High',
  },
  {
    id: 'T005',
    category: 'HVAC',
    description: 'Install ductwork for floor 2',
    assignedWorkers: ['Alex Martinez'],
    beforePhoto: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=200&h=150&fit=crop',
    afterPhoto: '',
    status: 'In Progress',
    endDate: '2025-12-28',
    waitingForApproval: false,
    priority: 'Medium',
  },
  {
    id: 'T006',
    category: 'Masonry',
    description: 'Build exterior wall section B',
    assignedWorkers: ['Carlos Garcia', 'Luis Rodriguez'],
    beforePhoto: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=150&fit=crop',
    afterPhoto: '',
    status: 'In Progress',
    endDate: '2025-12-18',
    waitingForApproval: false,
    priority: 'Low',
  },
  {
    id: 'T007',
    category: 'Painting',
    description: 'Prime and paint interior walls floor 1',
    assignedWorkers: ['Emily Davis'],
    beforePhoto: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=200&h=150&fit=crop',
    afterPhoto: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=200&h=150&fit=crop',
    status: 'Completed',
    endDate: '2025-12-22',
    waitingForApproval: true,
    priority: 'Low',
  },
  {
    id: 'T008',
    category: 'Flooring',
    description: 'Install hardwood flooring in main lobby',
    assignedWorkers: ['Kevin Moore', 'Nancy White'],
    beforePhoto: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=200&h=150&fit=crop',
    afterPhoto: '',
    status: 'Blocked',
    endDate: '2025-12-19',
    waitingForApproval: false,
    priority: 'High',
  },
];

export const workers: Worker[] = [
  { id: 'W001', name: 'John Smith', role: 'Foreman', present: true },
  { id: 'W002', name: 'Mike Johnson', role: 'Laborer', present: true },
  { id: 'W003', name: 'David Lee', role: 'Electrician', present: true },
  { id: 'W004', name: 'Sarah Connor', role: 'Electrician', present: false },
  { id: 'W005', name: 'Tom Wilson', role: 'Plumber', present: true },
  { id: 'W006', name: 'James Brown', role: 'Carpenter', present: true },
  { id: 'W007', name: 'Robert Taylor', role: 'Carpenter', present: true },
  { id: 'W008', name: 'Chris Evans', role: 'Carpenter', present: false },
  { id: 'W009', name: 'Alex Martinez', role: 'HVAC Tech', present: true },
  { id: 'W010', name: 'Carlos Garcia', role: 'Mason', present: true },
  { id: 'W011', name: 'Luis Rodriguez', role: 'Mason', present: false },
  { id: 'W012', name: 'Emily Davis', role: 'Painter', present: true },
  { id: 'W013', name: 'Kevin Moore', role: 'Flooring Specialist', present: true },
  { id: 'W014', name: 'Nancy White', role: 'Flooring Specialist', present: true },
  { id: 'W015', name: 'Peter Black', role: 'Safety Officer', present: true },
];

export const materials: Material[] = [
  { id: 'M001', name: 'Cement', issued: 450, remaining: 150, unit: 'bags' },
  { id: 'M002', name: 'Steel Rebar', issued: 2800, remaining: 1200, unit: 'kg' },
  { id: 'M003', name: 'Bricks', issued: 15000, remaining: 5000, unit: 'pcs' },
  { id: 'M004', name: 'Lumber', issued: 340, remaining: 160, unit: 'pieces' },
  { id: 'M005', name: 'Electrical Wire', issued: 800, remaining: 400, unit: 'meters' },
  { id: 'M006', name: 'PVC Pipes', issued: 120, remaining: 80, unit: 'pieces' },
];

export const getTaskStats = () => {
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const inProgress = tasks.filter(t => t.status === 'In Progress').length;
  const blocked = tasks.filter(t => t.status === 'Blocked').length;
  const waitingApproval = tasks.filter(t => t.waitingForApproval).length;
  
  return { completed, inProgress, blocked, total: tasks.length, waitingApproval };
};

export const getWorkerStats = () => {
  const present = workers.filter(w => w.present).length;
  const absent = workers.filter(w => !w.present).length;
  
  return { present, absent, total: workers.length };
};

export const getDelayedTasks = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return tasks.filter(task => {
    const endDate = new Date(task.endDate);
    endDate.setHours(0, 0, 0, 0);
    return endDate < today && task.status !== 'Completed';
  });
};

export const getPriorityStats = () => {
  const high = tasks.filter(t => t.priority === 'High').length;
  const medium = tasks.filter(t => t.priority === 'Medium').length;
  const low = tasks.filter(t => t.priority === 'Low').length;
  
  return { high, medium, low };
};
