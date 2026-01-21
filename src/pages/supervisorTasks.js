export const supervisorTasks = [
  {
    id: "T-101",
    category: "Plumbing",
    status: "To Do",
    priority: "High",
    startDate: "2025-01-10",
    endDate: "2025-01-20",
    workersRequired: 5,
    materials: ["Pipes", "Valves", "PVC joints"],
    description: "Bathroom plumbing work for Block A – Floor 1",
    voiceNote: "/demo/voice1.mp3",
    images: [
      "/1520189063040.jpg",
      "/1520189063040.jpg"
    ],
    coordinates: { xPercent: 28, yPercent: 42 }
  },

  {
    id: "T-102",
    category: "Electrical",
    status: "In Progress",
    priority: "Medium",
    startDate: "2025-01-12",
    endDate: "2025-01-22",
    workersRequired: 3,
    materials: ["Wires", "Switch boards"],
    description: "Wiring and switch installation for Floor 1",
    voiceNote: "/demo/voice2.mp3",
    images: [
      "/1520189063040.jpg"
    ],
    coordinates: { xPercent: 55, yPercent: 30 }
  },

  {
    id: "T-103",
    category: "Painting",
    status: "Completed",
    priority: "Low",
    startDate: "2025-01-05",
    endDate: "2025-01-15",
    workersRequired: 4,
    materials: ["White paint", "Rollers"],
    description: "Interior wall painting for reception area",
    voiceNote: "/demo/voice3.mp3",
    images: [
      "/1520189063040.jpg"
    ],
    coordinates: { xPercent: 70, yPercent: 60 }
  }
];
