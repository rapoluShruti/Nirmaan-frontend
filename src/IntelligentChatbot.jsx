import { useState, useRef, useEffect } from "react";


export default function IntelligentChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "👋 Hello! I'm your Nirmaan AI Assistant. I can help you with:",
      options: [
        "📋 Pending Tasks",
        "📊 Project Progress",
        "🏗️ Material Requests",
        "📅 Today's Schedule",
        "👥 Attendance Report",
        "📸 Site Photos",
        "🗺️ Project Map"
      ],
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced mock data
  const mockData = {
    pendingTasks: [
      { 
        id: "T001", 
        title: "Install electrical wiring - Floor 2",
        description: "Complete electrical wiring installation for all rooms on floor 2",
        status: "PENDING", 
        priority: "HIGH",
        assignedTo: "Ramesh Kumar",
        dueDate: "2026-01-25",
        progress: 45,
        location: "Block A, Floor 2"
      },
      { 
        id: "T002", 
        title: "Plumbing work - Bathroom 3",
        description: "Install pipes and fixtures in bathroom 3",
        status: "IN_PROGRESS", 
        priority: "MEDIUM",
        assignedTo: "Suresh Yadav",
        dueDate: "2026-01-26",
        progress: 70,
        location: "Block B, Floor 1"
      },
      { 
        id: "T003", 
        title: "Painting - Living Room",
        description: "Complete painting work in living room area",
        status: "PENDING", 
        priority: "LOW",
        assignedTo: "Mohan Singh",
        dueDate: "2026-01-28",
        progress: 20,
        location: "Block A, Floor 3"
      }
    ],
    
    projectProgress: {
      overall: 68,
      phases: [
        { name: "Foundation", progress: 100, status: "COMPLETED" },
        { name: "Structure", progress: 85, status: "IN_PROGRESS" },
        { name: "Electrical", progress: 60, status: "IN_PROGRESS" },
        { name: "Plumbing", progress: 55, status: "IN_PROGRESS" },
        { name: "Finishing", progress: 30, status: "PENDING" }
      ],
      timeline: {
        startDate: "2023-06-01",
        expectedEnd: "2026-12-31",
        daysElapsed: 238,
        daysRemaining: 340
      }
    },

    materialRequests: [
      { 
        id: "M001", 
        item: "Cement bags (50kg)",
        quantity: 50,
        unit: "bags",
        status: "PENDING",
        requestedBy: "Site Engineer",
        requestDate: "2026-01-20",
        urgency: "HIGH",
        estimatedCost: "₹15,000",
        supplier: "ABC Suppliers"
      },
      { 
        id: "M002", 
        item: "Steel rods (12mm)",
        quantity: 100,
        unit: "pieces",
        status: "APPROVED",
        requestedBy: "Supervisor",
        requestDate: "2026-01-19",
        urgency: "MEDIUM",
        estimatedCost: "₹45,000",
        supplier: "XYZ Steel"
      },
      { 
        id: "M003", 
        item: "Paint buckets (20L)",
        quantity: 20,
        unit: "buckets",
        status: "DELIVERED",
        requestedBy: "Contractor",
        requestDate: "2026-01-18",
        urgency: "LOW",
        estimatedCost: "₹12,000",
        supplier: "Paint World"
      }
    ],

    todaySchedule: [
      { 
        time: "09:00 AM", 
        task: "Site inspection with client",
        location: "Block A - Main Entrance",
        attendees: ["Manager", "Client", "Site Engineer"],
        duration: "1 hour",
        status: "UPCOMING"
      },
      { 
        time: "11:00 AM", 
        task: "Material delivery check",
        location: "Main Gate - Storage Area",
        attendees: ["Supervisor", "Store Keeper"],
        duration: "30 mins",
        status: "UPCOMING"
      },
      { 
        time: "02:00 PM", 
        task: "Team meeting - Progress review",
        location: "Site Office",
        attendees: ["All Team Members"],
        duration: "1.5 hours",
        status: "UPCOMING"
      },
      { 
        time: "04:00 PM", 
        task: "Safety inspection",
        location: "Block B - All Floors",
        attendees: ["Safety Officer", "Site Engineer"],
        duration: "1 hour",
        status: "UPCOMING"
      }
    ],

    attendance: {
      date: "2026-01-24",
      present: 45,
      absent: 5,
      total: 50,
      onLeave: 2,
      categories: {
        mason: { present: 8, absent: 2, total: 10 },
        helper: { present: 12, absent: 3, total: 15 },
        electrician: { present: 4, absent: 1, total: 5 },
        plumber: { present: 3, absent: 1, total: 4 },
        carpenter: { present: 5, absent: 1, total: 6 },
        painter: { present: 3, absent: 0, total: 3 }
      },
      lateArrivals: 3,
      earlyDepartures: 1
    },

    sitePhotos: {
      beforeAfter: [
        {
          title: "Main Entrance",
          before: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400",
          after: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400",
          date: "2026-01-20",
          description: "Main entrance construction progress"
        },
        {
          title: "Living Room",
          before: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400",
          after: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400",
          date: "2026-01-22",
          description: "Living room finishing work"
        }
      ],
      recent: [
        {
          url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400",
          caption: "Block A - Floor 2 Progress",
          date: "2026-01-24",
          uploadedBy: "Site Engineer"
        },
        {
          url: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400",
          caption: "Electrical work completion",
          date: "2026-01-23",
          uploadedBy: "Supervisor"
        }
      ]
    },

    projectMap: {
      location: "Sector 12, Delhi",
      coordinates: { lat: 28.5355, lng: 77.3910 },
      blocks: [
        { name: "Block A", status: "70% Complete", floors: 5 },
        { name: "Block B", status: "55% Complete", floors: 4 },
        { name: "Block C", status: "30% Complete", floors: 3 }
      ]
    }
  };

  // Parse user query
  const parseQuery = (query) => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("pending") || lowerQuery.includes("task")) {
      return { intent: "pending_tasks" };
    }
    if (lowerQuery.includes("progress") || lowerQuery.includes("project")) {
      return { intent: "project_progress" };
    }
    if (lowerQuery.includes("material")) {
      return { intent: "material_requests" };
    }
    if (lowerQuery.includes("schedule") || lowerQuery.includes("today") || lowerQuery.includes("itinerary")) {
      return { intent: "todays_schedule" };
    }
    if (lowerQuery.includes("attendance")) {
      return { intent: "attendance" };
    }
    if (lowerQuery.includes("photo") || lowerQuery.includes("site photo")) {
      return { intent: "site_photos" };
    }
    if (lowerQuery.includes("map") || lowerQuery.includes("project map")) {
      return { intent: "project_map" };
    }

    return { intent: "unknown" };
  };

  // Generate response
  const generateResponse = (intent) => {
    switch (intent) {
      case "pending_tasks":
        return {
          type: "tasks",
          data: mockData.pendingTasks
        };

      case "project_progress":
        return {
          type: "progress",
          data: mockData.projectProgress
        };

      case "material_requests":
        return {
          type: "materials",
          data: mockData.materialRequests
        };

      case "todays_schedule":
        return {
          type: "schedule",
          data: mockData.todaySchedule
        };

      case "attendance":
        return {
          type: "attendance",
          data: mockData.attendance
        };

      case "site_photos":
        return {
          type: "photos",
          data: mockData.sitePhotos
        };

      case "project_map":
        return {
          type: "map",
          data: mockData.projectMap
        };

      default:
        return {
          type: "text",
          text: "I can help you with:\n• Pending tasks\n• Project progress\n• Material requests\n• Today's schedule\n• Attendance\n• Site photos\n• Project map"
        };
    }
  };

  const handleSendMessage = async (text = inputText) => {
    if (!text.trim()) return;

    const userMessage = {
      type: "user",
      text: text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const { intent } = parseQuery(text);
      const response = generateResponse(intent);

      const botMessage = {
        type: "bot",
        ...response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleOptionClick = (option) => {
    handleSendMessage(option);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Render message function
  const renderMessage = (msg, idx) => {
    if (msg.type === "user") {
      return (
        <div key={idx} className="flex justify-end">
          <div className="max-w-[80%] bg-blue-600 text-white rounded-2xl rounded-br-none px-4 py-3 shadow-lg">
            <p className="text-sm">{msg.text}</p>
            <p className="text-xs text-blue-100 mt-1">
              {msg.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      );
    }

    // Bot messages
    return (
      <div key={idx} className="flex justify-start">
        <div className="max-w-[90%] bg-white rounded-2xl rounded-bl-none shadow-lg border border-gray-200 overflow-hidden">
          {msg.text && (
            <div className="px-4 py-3">
              <p className="text-sm text-gray-800 whitespace-pre-line">{msg.text}</p>
            </div>
          )}

          {/* Options */}
          {msg.options && (
            <div className="px-4 pb-3 flex flex-wrap gap-2">
              {msg.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleOptionClick(option)}
                  className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-medium transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Tasks Display */}
          {msg.type === "tasks" && msg.data && (
            <div className="p-4 space-y-3">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <span className="text-lg">📋</span>
                Pending Tasks ({msg.data.length})
              </h3>
              {msg.data.map((task, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm">{task.id}</p>
                      <p className="text-sm text-gray-700 mt-1">{task.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{task.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      task.priority === "HIGH" ? "bg-red-100 text-red-700" :
                      task.priority === "MEDIUM" ? "bg-yellow-100 text-yellow-700" :
                      "bg-green-100 text-green-700"
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-600 mt-2">
                    <span>👤 {task.assignedTo}</span>
                    <span>📍 {task.location}</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-gray-800">{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Project Progress */}
          {msg.type === "progress" && msg.data && (
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                <span className="text-lg">📊</span>
                Project Progress
              </h3>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                  <span className="text-2xl font-bold text-blue-600">{msg.data.overall}%</span>
                </div>
                <div className="w-full bg-white rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all"
                    style={{ width: `${msg.data.overall}%` }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2">
                {msg.data.phases.map((phase, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{phase.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-800">{phase.progress}%</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          phase.status === "COMPLETED" ? "bg-green-100 text-green-700" :
                          phase.status === "IN_PROGRESS" ? "bg-blue-100 text-blue-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {phase.status}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${
                          phase.status === "COMPLETED" ? "bg-green-500" :
                          phase.status === "IN_PROGRESS" ? "bg-blue-500" :
                          "bg-gray-400"
                        }`}
                        style={{ width: `${phase.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Material Requests */}
          {msg.type === "materials" && msg.data && (
            <div className="p-4 space-y-3">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <span className="text-lg">🏗️</span>
                Material Requests ({msg.data.length})
              </h3>
              {msg.data.map((material, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm">{material.id}</p>
                      <p className="text-sm text-gray-700 mt-1">{material.item}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      material.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                      material.status === "APPROVED" ? "bg-blue-100 text-blue-700" :
                      "bg-green-100 text-green-700"
                    }`}>
                      {material.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-2">
                    <div>
                      <p className="text-gray-500">Quantity</p>
                      <p className="font-semibold text-gray-800">{material.quantity} {material.unit}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Cost</p>
                      <p className="font-semibold text-gray-800">{material.estimatedCost}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Today's Schedule */}
          {msg.type === "schedule" && msg.data && (
            <div className="p-4 space-y-3">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <span className="text-lg">📅</span>
                Today's Schedule
              </h3>
              {msg.data.map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3 border-l-4 border-blue-500">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                      {item.time}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm">{item.task}</p>
                      <p className="text-xs text-gray-600 mt-1">📍 {item.location}</p>
                      <p className="text-xs text-gray-600 mt-1">⏱️ {item.duration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Attendance */}
          {msg.type === "attendance" && msg.data && (
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                <span className="text-lg">👥</span>
                Attendance Report
              </h3>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-green-600">{msg.data.present}</p>
                  <p className="text-xs text-gray-600 mt-1">Present</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-red-600">{msg.data.absent}</p>
                  <p className="text-xs text-gray-600 mt-1">Absent</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-blue-600">{msg.data.total}</p>
                  <p className="text-xs text-gray-600 mt-1">Total</p>
                </div>
              </div>
              <div className="space-y-2">
                {Object.entries(msg.data.categories).map(([category, data], i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 capitalize">{category}</span>
                      <span className="text-sm font-semibold text-gray-800">
                        {data.present}/{data.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${(data.present / data.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Site Photos */}
          {msg.type === "photos" && msg.data && (
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                <span className="text-lg">📸</span>
                Site Progress Photos
              </h3>
              {msg.data.beforeAfter.map((photo, i) => (
                <div key={i} className="mb-4">
                  <p className="font-semibold text-gray-800 text-sm mb-2">{photo.title}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <img 
                        src={photo.before} 
                        alt="Before" 
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <p className="text-xs text-center text-gray-600 mt-1">Before</p>
                    </div>
                    <div>
                      <img 
                        src={photo.after} 
                        alt="After" 
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <p className="text-xs text-center text-gray-600 mt-1">After</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{photo.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Project Map */}
          {msg.type === "map" && msg.data && (
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                <span className="text-lg">🗺️</span>
                Project Location
              </h3>
              <div className="bg-gray-100 rounded-lg p-3 mb-3">
                <p className="text-sm text-gray-700">📍 {msg.data.location}</p>
              </div>
              <div className="space-y-2">
                {msg.data.blocks.map((block, i) => (
                  <div key={i} className="bg-blue-50 rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{block.name}</p>
                      <p className="text-xs text-gray-600">{block.floors} Floors</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold">
                      {block.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="px-4 pb-3">
            <p className="text-xs text-gray-400">
              {msg.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center z-50 hover:scale-110"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 w-[450px] h-[700px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Nirmaan AI Assistant</h3>
                <p className="text-xs text-blue-100">Smart Construction Helper</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => renderMessage(msg, idx))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-sm border border-gray-200">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim()}
                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}