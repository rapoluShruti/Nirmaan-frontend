export const supervisorTodayData = {
  date: "12 Jan 2025",

  carriedForwardTasks: [
    { id: "CF-01", name: "Plumbing – Block A", priority: "High" },
    { id: "CF-02", name: "Electrical – Staircase", priority: "Medium" }
  ],

  todaysTasks: [
    { id: "TD-01", name: "Tile Fixing – Floor 2" },
    { id: "TD-02", name: "Painting – Lobby Area" },
    { id: "TD-03", name: "Waterproofing – Terrace" }
  ],

  workers: {
    requiredToday: 18,
    present: 14,
    absent: 4
  },

  materials: {
    lowStock: [
      { name: "Cement", qty: "5 bags" },
      { name: "PVC Pipes", qty: "12 units" }
    ],
    okStock: [
      "Sand",
      "Bricks",
      "Paint"
    ]
  },

  equipmentRequired: [
    "Drilling Machine",
    "Concrete Mixer",
    "Ladder",
    "Safety Helmets"
  ],

  alerts: {
    safety: "Helmet compliance low in Block B",
    delayRisk: "Plumbing task may delay slab casting"
  }
};
