import React, { useMemo, useState } from "react";
import QRCode from "react-qr-code";
import {
  ArrowLeft,
  CheckCircle2,
  Search,
  Wrench,
  ClipboardList,
  AlertTriangle,
} from "lucide-react";

export default function ToolLibrary() {
  const [screen, setScreen] = useState("list"); // list | allocate | return | repair | success
  const [activeTab, setActiveTab] = useState("heavy"); // heavy | light | repair
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedTool, setSelectedTool] = useState(null);
  const [allocationLabel, setAllocationLabel] = useState(null);

  // Supervisor enters Tool ID manually (main workflow)
  const [toolIdInput, setToolIdInput] = useState("");

  const workers = useMemo(
    () => ["राज कुमार", "अमित शर्मा", "विकास पटेल", "टीम A", "टीम B"],
    []
  );

  // Allocation form (Supervisor action)
  const [allocateForm, setAllocateForm] = useState({
    worker: "",
    purpose: "",
    zone: "",
  });

  // Return flow
  const [returnForm, setReturnForm] = useState({
    condition: "good", // good | damaged
    damageNote: "",
  });

  // Repair Ticket (progress)
  const repairStages = useMemo(
    () => [
      { key: "reported", label: "Reported" },
      { key: "picked", label: "Picked up" },
      { key: "diagnosis", label: "Diagnosis" },
      { key: "in_repair", label: "Repair in progress" },
      { key: "testing", label: "Testing" },
      { key: "ready", label: "Ready to return" },
    ],
    []
  );

  const zones = useMemo(
    () => ["Basement", "Ground Floor", "1st Floor", "2nd Floor", "Parking", "External"],
    []
  );

  // -------------------- DATA --------------------
  const heavyTools = useMemo(
    () => [
      {
        id: "HT-001",
        name: "Drilling Machine",
        type: "Machine",
        category: "Heavy",
        status: "Available", // Available | Issued | Under Repair
        qty: 1,
        issuedTo: "-",
        issuedOn: "-",
      },
      {
        id: "HT-002",
        name: "Concrete Mixer",
        type: "Machine",
        category: "Heavy",
        status: "Issued",
        qty: 1,
        issuedTo: "टीम A",
        issuedOn: "24 Jan 2026",
      },
      {
        id: "HT-003",
        name: "Welding Machine",
        type: "Machine",
        category: "Heavy",
        status: "Available",
        qty: 1,
        issuedTo: "-",
        issuedOn: "-",
      },
      {
        id: "HT-004",
        name: "Excavator",
        type: "Heavy Machine",
        category: "Heavy",
        status: "Under Repair",
        qty: 1,
        issuedTo: "विकास पटेल",
        issuedOn: "21 Jan 2026",
      },
    ],
    []
  );

  const lightTools = useMemo(
    () => [
      {
        id: "LT-001",
        name: "Hammer Set",
        type: "Tool Kit",
        category: "Light",
        status: "Available",
        qty: 5,
        issuedTo: "-",
        issuedOn: "-",
      },
      {
        id: "LT-002",
        name: "Screwdriver Set",
        type: "Small Tool",
        category: "Light",
        status: "Available",
        qty: 10,
        issuedTo: "-",
        issuedOn: "-",
      },
      {
        id: "LT-003",
        name: "Measuring Tape",
        type: "Small Tool",
        category: "Light",
        status: "Issued",
        qty: 8,
        issuedTo: "राज कुमार",
        issuedOn: "24 Jan 2026",
      },
      {
        id: "LT-006",
        name: "Chisel Set",
        type: "Tool Kit",
        category: "Light",
        status: "Under Repair",
        qty: 3,
        issuedTo: "टीम B",
        issuedOn: "20 Jan 2026",
      },
    ],
    []
  );

  const repairTickets = useMemo(
    () => ({
      "HT-004": {
        stageKey: "in_repair",
        vendor: "Shree Tools Service",
        eta: "28 Jan 2026",
        costEstimate: "₹ 4,500",
        note: "Hydraulic leak + bucket joint loose",
        updatedOn: "25 Jan 2026, 11:20 AM",
      },
      "LT-006": {
        stageKey: "testing",
        vendor: "Local Workshop",
        eta: "26 Jan 2026",
        costEstimate: "₹ 900",
        note: "Chisel edge damaged, regrinding needed",
        updatedOn: "25 Jan 2026, 09:10 AM",
      },
    }),
    [repairStages]
  );

  const allTools = useMemo(() => [...heavyTools, ...lightTools], [heavyTools, lightTools]);

  const toolsForTab = useMemo(() => {
    if (activeTab === "heavy") return heavyTools;
    if (activeTab === "light") return lightTools;
    if (activeTab === "repair") return allTools.filter((t) => t.status === "Under Repair");
    return [];
  }, [activeTab, heavyTools, lightTools, allTools]);

  const filteredTools = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return toolsForTab;

    return toolsForTab.filter((t) => {
      return (
        t.id.toLowerCase().includes(q) ||
        t.name.toLowerCase().includes(q) ||
        t.type.toLowerCase().includes(q) ||
        (t.issuedTo || "").toLowerCase().includes(q)
      );
    });
  }, [toolsForTab, searchTerm]);

  // -------------------- HELPERS --------------------
  const badge = (status) => {
    if (status === "Available") {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
          Available
        </span>
      );
    }
    if (status === "Issued") {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
          Issued
        </span>
      );
    }
    if (status === "Under Repair") {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
          Under Repair
        </span>
      );
    }
    return null;
  };

  const resetFlow = () => {
    setSelectedTool(null);
    setToolIdInput("");
    setAllocateForm({ worker: "", purpose: "", zone: "" });
    setReturnForm({ condition: "good", damageNote: "" });
  };

  const findToolById = (id) => {
    const clean = (id || "").trim().toUpperCase();
    if (!clean) return null;
    return allTools.find((t) => t.id === clean) || null;
  };

  const handleOpenAllocateByToolId = () => {
    const tool = findToolById(toolIdInput);
    if (!tool) {
      alert("Tool not found. Please enter valid Tool ID (example: HT-001 / LT-003).");
      return;
    }

    if (tool.status === "Under Repair") {
      alert("This tool is under repair. Allocate not allowed.");
      return;
    }

    if (tool.status === "Issued") {
      alert("This tool is already issued. Use Return option first.");
      return;
    }

    setSelectedTool(tool);
    setScreen("allocate");
  };

  const handleAllocate = () => {
    if (!allocateForm.worker) {
      alert("Please select worker/team.");
      return;
    }
    if (!allocateForm.zone) {
      alert("Please select zone/location.");
      return;
    }

    setAllocationLabel({
      tool: selectedTool,
      worker: allocateForm.worker,
      purpose: allocateForm.purpose,
      zone: allocateForm.zone,
      issuedAt: new Date().toISOString(),
    });
    setScreen("success");
  };

  const handleReturnOpen = (tool) => {
    setSelectedTool(tool);
    setScreen("return");
  };

  const handleRepairOpen = (tool) => {
    setSelectedTool(tool);
    setScreen("repair");
  };

  const handleReturnSubmit = () => {
    if (returnForm.condition === "damaged" && !returnForm.damageNote.trim()) {
      alert("Please add damage note.");
      return;
    }

    // If damaged, take supervisor to repair ticket screen directly
    if (returnForm.condition === "damaged") {
      setScreen("repair");
      return;
    }

    setScreen("success");
    setTimeout(() => {
      setScreen("list");
      resetFlow();
    }, 1800);
  };

  // -------------------- LIST --------------------
  if (screen === "list") {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="px-5 py-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-wide text-teal-700 uppercase">
                  Tool Library
                </p>
                <h1 className="text-xl font-bold text-gray-900 mt-1">
                  Issue • Return • Repair Tracking
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Supervisor allocation via Tool ID (no toy UI)
                </p>
              </div>

              <div className="w-10 h-10 rounded-xl bg-[#e6f3ee] border border-[#b9d9cf] flex items-center justify-center">
                <Wrench className="w-5 h-5 text-teal-800" />
              </div>
            </div>

            {/* ID Allocate (Supervisor workflow) */}
            <div className="mt-4 bg-white rounded-2xl border border-gray-200 shadow-sm p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center">
                  <ClipboardList className="w-5 h-5 text-gray-700" />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Allocate tool to worker</p>
                  <p className="text-xs text-gray-500">Enter Tool ID (example: HT-001)</p>
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <input
                  value={toolIdInput}
                  onChange={(e) => setToolIdInput(e.target.value.toUpperCase())}
                  placeholder="Tool ID (HT-001 / LT-003)"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 text-sm"
                />
                <button
                  onClick={handleOpenAllocateByToolId}
                  className="px-4 py-3 rounded-xl bg-teal-700 text-white text-sm font-semibold hover:bg-teal-800 transition"
                >
                  Allocate
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setActiveTab("heavy")}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold border transition ${
                  activeTab === "heavy"
                    ? "bg-teal-700 text-white border-orange-600"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                Heavy
              </button>

              <button
                onClick={() => setActiveTab("light")}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold border transition ${
                  activeTab === "light"
                    ? "bg-teal-700 text-white border-orange-600"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                Light
              </button>

              <button
                onClick={() => setActiveTab("repair")}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold border transition ${
                  activeTab === "repair"
                    ? "bg-teal-700 text-white border-orange-600"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
              >
                Repair
              </button>
            </div>

            {/* Search */}
            <div className="mt-3 relative">
              <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by ID / name / issued to..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 text-sm"
              />
            </div>
          </div>
        </div>

        {/* List */}
        <div className="px-5 py-4 space-y-3">
          {filteredTools.length === 0 ? (
            <div className="p-6 rounded-2xl border border-gray-200 bg-gray-50 text-center">
              <AlertTriangle className="w-6 h-6 mx-auto text-gray-500" />
              <p className="mt-2 text-sm font-semibold text-gray-800">No tools found</p>
              <p className="text-xs text-gray-500 mt-1">Try searching by HT-001 or LT-003</p>
            </div>
          ) : (
            filteredTools.map((t) => (
              <div
                key={t.id}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-gray-900 px-2 py-1 rounded-lg bg-gray-50 border border-gray-200">
                          {t.id}
                        </span>
                        {badge(t.status)}
                      </div>

                      <p className="mt-2 text-base font-bold text-gray-900">{t.name}</p>
                      <p className="text-sm text-gray-500">{t.type}</p>

                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-600">
                        <div className="rounded-xl bg-gray-50 border border-gray-200 p-2">
                          <p className="text-[11px] text-gray-500">Issued to</p>
                          <p className="font-semibold text-gray-800">{t.issuedTo}</p>
                        </div>
                        <div className="rounded-xl bg-gray-50 border border-gray-200 p-2">
                          <p className="text-[11px] text-gray-500">Issued on</p>
                          <p className="font-semibold text-gray-800">{t.issuedOn}</p>
                        </div>
                      </div>
                    </div>

                    <div className="min-w-[120px] flex flex-col gap-2">
                      {t.status === "Available" && (
                        <button
                          onClick={() => {
                            setToolIdInput(t.id);
                            setSelectedTool(t);
                            setScreen("allocate");
                          }}
                          className="px-3 py-2.5 rounded-xl bg-teal-700 text-white text-sm font-semibold hover:bg-teal-800 transition"
                        >
                          Allocate
                        </button>
                      )}

                      {t.status === "Issued" && (
                        <button
                          onClick={() => handleReturnOpen(t)}
                          className="px-3 py-2.5 rounded-xl bg-white text-gray-900 text-sm font-semibold border border-gray-200 hover:bg-gray-50 transition"
                        >
                          Return
                        </button>
                      )}

                      {t.status === "Under Repair" && (
                        <button
                          onClick={() => handleRepairOpen(t)}
                          className="px-3 py-2.5 rounded-xl bg-white text-gray-900 text-sm font-semibold border border-gray-200 hover:bg-gray-50 transition"
                        >
                          View Repair
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // -------------------- ALLOCATE (Supervisor) --------------------
  if (screen === "allocate") {
    return (
      <div className="min-h-screen bg-white">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="px-5 py-4 flex items-center justify-between">
            <button
              onClick={() => {
                setScreen("list");
                resetFlow();
              }}
              className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <p className="text-sm font-semibold text-gray-900">Allocate Tool</p>

            <div className="w-8 h-8 rounded-lg bg-[#e6f3ee] border border-[#b9d9cf] flex items-center justify-center">
              <Wrench className="w-4 h-4 text-teal-800" />
            </div>
          </div>
        </div>

        <div className="px-5 py-5 space-y-4">
          {/* Tool Summary */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-bold text-gray-900 px-2 py-1 rounded-lg bg-gray-50 border border-gray-200">
                  {selectedTool?.id}
                </span>
                <p className="mt-2 text-lg font-bold text-gray-900">{selectedTool?.name}</p>
                <p className="text-sm text-gray-500">{selectedTool?.type}</p>
              </div>
              <div>{badge("Available")}</div>
            </div>
          </div>

          {/* Worker */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
            <label className="text-sm font-semibold text-gray-900">Worker / Team</label>
            <select
              value={allocateForm.worker}
              onChange={(e) => setAllocateForm({ ...allocateForm, worker: e.target.value })}
              className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
            >
              <option value="">Select...</option>
              {workers.map((w, i) => (
                <option key={i} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>

          {/* Zone */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
            <label className="text-sm font-semibold text-gray-900">Zone / Location</label>
            <select
              value={allocateForm.zone}
              onChange={(e) => setAllocateForm({ ...allocateForm, zone: e.target.value })}
              className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
            >
              <option value="">Select...</option>
              {zones.map((z, i) => (
                <option key={i} value={z}>
                  {z}
                </option>
              ))}
            </select>
          </div>

          {/* Purpose */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
            <label className="text-sm font-semibold text-gray-900">Purpose (optional)</label>
            <input
              value={allocateForm.purpose}
              onChange={(e) => setAllocateForm({ ...allocateForm, purpose: e.target.value })}
              placeholder="e.g., slab drilling / shuttering work"
              className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleAllocate}
            disabled={!allocateForm.worker || !allocateForm.zone}
            className="w-full py-3.5 rounded-2xl bg-teal-700 text-white font-semibold hover:bg-teal-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Confirm Allocation
          </button>

          <p className="text-xs text-gray-500">
            Note: In backend, this will create issue record + update inventory status.
          </p>
        </div>
      </div>
    );
  }

  // -------------------- RETURN --------------------
  if (screen === "return") {
    return (
      <div className="min-h-screen bg-white">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="px-5 py-4 flex items-center justify-between">
            <button
              onClick={() => {
                setScreen("list");
                resetFlow();
              }}
              className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <p className="text-sm font-semibold text-gray-900">Return Tool</p>

            <div className="w-8 h-8 rounded-lg bg-[#e6f3ee] border border-[#b9d9cf] flex items-center justify-center">
              <Wrench className="w-4 h-4 text-teal-800" />
            </div>
          </div>
        </div>

        <div className="px-5 py-5 space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-bold text-gray-900 px-2 py-1 rounded-lg bg-gray-50 border border-gray-200">
                  {selectedTool?.id}
                </span>
                <p className="mt-2 text-lg font-bold text-gray-900">{selectedTool?.name}</p>
                <p className="text-sm text-gray-500">Issued to: {selectedTool?.issuedTo}</p>
              </div>
              <div>{badge("Issued")}</div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
            <p className="text-sm font-semibold text-gray-900">Tool condition</p>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={() => setReturnForm({ ...returnForm, condition: "good" })}
                className={`py-3 rounded-xl border text-sm font-semibold transition ${
                  returnForm.condition === "good"
                    ? "bg-teal-700 text-white border-orange-600"
                    : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"
                }`}
              >
                Good
              </button>

              <button
                onClick={() => setReturnForm({ ...returnForm, condition: "damaged" })}
                className={`py-3 rounded-xl border text-sm font-semibold transition ${
                  returnForm.condition === "damaged"
                    ? "bg-teal-700 text-white border-orange-600"
                    : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"
                }`}
              >
                Damaged
              </button>
            </div>

            {returnForm.condition === "damaged" && (
              <div className="mt-3">
                <label className="text-sm font-semibold text-gray-900">Damage note</label>
                <textarea
                  value={returnForm.damageNote}
                  onChange={(e) => setReturnForm({ ...returnForm, damageNote: e.target.value })}
                  rows={4}
                  placeholder="Describe issue clearly..."
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400"
                />
              </div>
            )}
          </div>

          <button
            onClick={handleReturnSubmit}
            className="w-full py-3.5 rounded-2xl bg-teal-700 text-white font-semibold hover:bg-teal-800 transition"
          >
            Confirm Return
          </button>
        </div>
      </div>
    );
  }

  // -------------------- REPAIR --------------------
  if (screen === "repair") {
    const ticket = selectedTool ? repairTickets[selectedTool.id] : null;
    const currentStageKey = ticket?.stageKey || "reported";
    const currentIndex = repairStages.findIndex((s) => s.key === currentStageKey);

    return (
      <div className="min-h-screen bg-white">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="px-5 py-4 flex items-center justify-between">
            <button
              onClick={() => {
                setScreen("list");
                resetFlow();
              }}
              className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <p className="text-sm font-semibold text-gray-900">Repair Tracking</p>

            <div className="w-8 h-8 rounded-lg bg-[#e6f3ee] border border-[#b9d9cf] flex items-center justify-center">
              <Wrench className="w-4 h-4 text-teal-800" />
            </div>
          </div>
        </div>

        <div className="px-5 py-5 space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-bold text-gray-900 px-2 py-1 rounded-lg bg-gray-50 border border-gray-200">
                  {selectedTool?.id}
                </span>
                <p className="mt-2 text-lg font-bold text-gray-900">{selectedTool?.name}</p>
                <p className="text-sm text-gray-500">{selectedTool?.type}</p>
              </div>
              {badge("Under Repair")}
            </div>
          </div>

          {/* Repair Progress */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
            <p className="text-sm font-semibold text-gray-900 mb-3">Progress</p>

            <div className="space-y-3">
              {repairStages.map((s, idx) => {
                const done = idx < currentIndex;
                const active = idx === currentIndex;

                return (
                  <div key={s.key} className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center ${
                        done
                          ? "bg-teal-700 border-orange-600"
                          : active
                          ? "bg-[#e6f3ee] border-orange-300"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      {done ? (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      ) : (
                        <span className={`text-xs font-bold ${active ? "text-teal-800" : "text-gray-400"}`}>
                          {idx + 1}
                        </span>
                      )}
                    </div>

                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${active ? "text-gray-900" : "text-gray-700"}`}>
                        {s.label}
                      </p>
                      {active && (
                        <p className="text-xs text-teal-800 font-semibold">Current Stage</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ticket Details */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-4">
            <p className="text-sm font-semibold text-gray-900 mb-3">Ticket details</p>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-xl bg-gray-50 border border-gray-200 p-3">
                <p className="text-[11px] text-gray-500">Vendor</p>
                <p className="font-semibold text-gray-900">{ticket?.vendor || "Not assigned"}</p>
              </div>

              <div className="rounded-xl bg-gray-50 border border-gray-200 p-3">
                <p className="text-[11px] text-gray-500">ETA</p>
                <p className="font-semibold text-gray-900">{ticket?.eta || "-"}</p>
              </div>

              <div className="rounded-xl bg-gray-50 border border-gray-200 p-3">
                <p className="text-[11px] text-gray-500">Estimate</p>
                <p className="font-semibold text-gray-900">{ticket?.costEstimate || "-"}</p>
              </div>

              <div className="rounded-xl bg-gray-50 border border-gray-200 p-3">
                <p className="text-[11px] text-gray-500">Last Update</p>
                <p className="font-semibold text-gray-900">{ticket?.updatedOn || "-"}</p>
              </div>
            </div>

            <div className="mt-3 rounded-xl bg-gray-50 border border-gray-200 p-3">
              <p className="text-[11px] text-gray-500">Repair note</p>
              <p className="text-sm text-gray-800 font-semibold">
                {ticket?.note || "No notes added"}
              </p>
            </div>
          </div>

          {/* Update / Save (frontend demo) */}
          <button
            onClick={() => {
              setScreen("success");
              setTimeout(() => {
                setScreen("list");
                resetFlow();
              }, 1600);
            }}
            className="w-full py-3.5 rounded-2xl bg-teal-700 text-white font-semibold hover:bg-teal-800 transition"
          >
            Save / Update Repair
          </button>

          <p className="text-xs text-gray-500">
            In backend: this will update stage, vendor, ETA and repair cost entries.
          </p>
        </div>
      </div>
    );
  }

  // -------------------- SUCCESS --------------------
  if (screen === "success") {
    return (
      <div className="min-h-screen bg-[#f4f7f4] px-4 py-10 text-[#183a35] md:px-8">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-[#dce7e1] bg-white shadow-xl">
          <div className="bg-[#102b2a] px-6 py-7 text-white md:px-8">
            <div className="flex items-center gap-3"><CheckCircle2 className="h-9 w-9 text-emerald-300" /><div><p className="text-xs font-bold uppercase tracking-[.18em] text-teal-100">Tool allocation</p><h1 className="mt-1 text-2xl font-bold">{allocationLabel ? "QR label generated" : "Action completed"}</h1></div></div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{allocationLabel ? "Keep this QR label with the equipment so the assigned tool can be identified quickly." : "The selected tool action has been processed in this interface."}</p>
          </div>
          {allocationLabel ? (
            <div className="grid gap-6 p-6 md:grid-cols-[minmax(0,1fr)_240px] md:p-8">
              <div className="rounded-2xl border border-[#dce7e1] bg-[#f7faf8] p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#71847d]">Tool ID</p>
                <p className="mt-2 font-mono text-3xl font-bold text-[#102b2a]">{allocationLabel.tool?.id || toolIdInput}</p>
                <div className="mt-5 space-y-4">
                  <div><p className="text-xs text-[#71847d]">Equipment</p><p className="mt-1 font-semibold">{allocationLabel.tool?.name}</p></div>
                  <div><p className="text-xs text-[#71847d]">Assigned to</p><p className="mt-1 font-semibold">{allocationLabel.worker}</p></div>
                  <div><p className="text-xs text-[#71847d]">Work zone</p><p className="mt-1 font-semibold">{allocationLabel.zone}</p></div>
                  {allocationLabel.purpose && <div><p className="text-xs text-[#71847d]">Purpose</p><p className="mt-1 font-semibold">{allocationLabel.purpose}</p></div>}
                </div>
                <span className="mt-5 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800">Issued assignment</span>
              </div>
              <div className="flex flex-col items-center justify-center rounded-2xl border border-[#dce7e1] p-5 text-center">
                <div className="rounded-xl bg-white p-3"><QRCode value={JSON.stringify({ app: "NIRMAAN", type: "tool", toolId: allocationLabel.tool?.id || toolIdInput, toolName: allocationLabel.tool?.name, assignedTo: allocationLabel.worker, purpose: allocationLabel.purpose, zone: allocationLabel.zone, issuedAt: allocationLabel.issuedAt })} size={180} level="M" /></div>
                <p className="mt-4 text-sm font-bold">Tool QR label</p><p className="mt-1 text-xs text-[#71847d]">Scan-ready assignment details</p>
                <button onClick={() => window.print()} className="mt-4 w-full rounded-xl border border-[#dce7e1] px-4 py-2.5 text-sm font-bold text-[#244740] hover:bg-[#f4f7f4]">Print label</button>
              </div>
            </div>
          ) : (
            <div className="p-6"><div className="rounded-xl border border-[#dce7e1] bg-[#f7faf8] p-4"><p className="text-xs font-semibold text-[#71847d]">Reference</p><p className="mt-1 font-mono font-bold">{selectedTool?.id || toolIdInput || "—"}</p></div></div>
          )}
          <div className="px-6 pb-6 md:px-8 md:pb-8"><p className="mb-4 text-xs leading-5 text-[#71847d]">QR labels are generated in the browser from the current allocation details. Connecting the QR payload to a backend record or live scanning workflow can be added separately.</p><button onClick={() => { setScreen("list"); resetFlow(); setAllocationLabel(null); }} className="w-full rounded-xl bg-[#0f766e] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#0b5d57]">Back to tool library</button></div>
        </div>
      </div>
    );
  }

  return null;
}
