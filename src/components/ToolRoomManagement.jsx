import React, { useState } from "react";
import {
  Hammer,
  Wrench,
  Truck,
  History,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

/*
  COMMERCIAL TOOL ROOM MANAGEMENT SYSTEM
  - Stock-aware allocation
  - Unique ID per issued tool
  - Full audit history
  - Damage description + repair confirmation
  - Heavy / Light / Repair segregation
*/

export default function ToolRoomManagement() {
  const [screen, setScreen] = useState("list");
  const [activeTab, setActiveTab] = useState("light");
  const [selectedType, setSelectedType] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const workers = ["Raj Kumar", "Amit Sharma", "Vikas Patel", "Team A"];
  const zones = ["Basement", "Ground Floor", "1st Floor", "Parking"];

  const [allocateForm, setAllocateForm] = useState({ worker: "", zone: "" });
  const [returnCondition, setReturnCondition] = useState("working");
  const [damageNote, setDamageNote] = useState("");
  const [sentForRepair, setSentForRepair] = useState(false);

  /* ---------------- TOOL TYPES (STOCK) ---------------- */

  const [toolTypes] = useState([
    { name: "Hammer", category: "Light", prefix: "HAM", total: 12, icon: Hammer },
    { name: "Measuring Tape", category: "Light", prefix: "TAP", total: 8, icon: Wrench },
    { name: "Drilling Machine", category: "Heavy", prefix: "DRL", total: 5, icon: Truck },
    { name: "Concrete Mixer", category: "Heavy", prefix: "MIX", total: 3, icon: Truck },
  ]);

  /* ---------------- ISSUED TOOL UNITS ---------------- */

  const [tools, setTools] = useState([]);

  const generateToolId = (prefix) => {
    const count = tools.filter((t) => t.prefix === prefix).length + 1;
    return `${prefix}-${String(count).padStart(3, "0")}`;
  };

  const remainingCount = (type) =>
    type.total -
    tools.filter(
      (t) => t.prefix === type.prefix && t.status !== "Under Repair"
    ).length;

  /* ---------------- ALLOCATE ---------------- */

  const allocateTool = () => {
    const alreadyIssued = tools.find(
      (t) =>
        t.prefix === selectedType.prefix &&
        t.issuedTo === allocateForm.worker &&
        t.status === "Issued"
    );

    if (alreadyIssued) {
      alert("This worker already has this tool allocated.");
      return;
    }

    if (remainingCount(selectedType) <= 0) {
      alert("No tools available in stock.");
      return;
    }

    const newTool = {
      id: generateToolId(selectedType.prefix),
      name: selectedType.name,
      prefix: selectedType.prefix,
      category: selectedType.category,
      status: "Issued",
      condition: "Working",
      issuedTo: allocateForm.worker,
      zone: allocateForm.zone,
      history: [
        {
          action: "Allocated",
          note: `Allocated to ${allocateForm.worker} at ${allocateForm.zone}`,
          date: new Date().toLocaleString(),
          condition: "Working",
        },
      ],
    };

    setTools([...tools, newTool]);
    finishAction();
  };

  /* ---------------- RETURN ---------------- */

  const returnTool = () => {
    if (returnCondition === "damaged") {
      if (!damageNote.trim()) {
        alert("Damage description is required.");
        return;
      }
      if (!sentForRepair) {
        alert("Please confirm tool sent for repair.");
        return;
      }
    }

    setTools((prev) =>
      prev.map((t) =>
        t.id === selectedTool.id
          ? {
              ...t,
              status:
                returnCondition === "damaged"
                  ? "Under Repair"
                  : "Available",
              condition:
                returnCondition === "damaged" ? "Damaged" : "Working",
              issuedTo: null,
              zone: null,
              history: [
                ...t.history,
                {
                  action:
                    returnCondition === "damaged"
                      ? "Returned (Damaged)"
                      : "Returned",
                  note:
                    returnCondition === "damaged"
                      ? `Damage noted: ${damageNote}. Sent for repair.`
                      : "Returned in good condition.",
                  date: new Date().toLocaleString(),
                  condition:
                    returnCondition === "damaged"
                      ? "Damaged"
                      : "Working",
                },
              ],
            }
          : t
      )
    );

    finishAction();
  };

  const finishAction = () => {
    setScreen("success");
    setTimeout(() => {
      setScreen("list");
      setSelectedType(null);
      setSelectedTool(null);
      setAllocateForm({ worker: "", zone: "" });
      setReturnCondition("working");
      setDamageNote("");
      setSentForRepair(false);
    }, 1400);
  };

  /* ---------------- FILTER ---------------- */

  const filteredTools = tools.filter((t) => {
    if (activeTab === "repair") return t.status === "Under Repair";
    return t.category.toLowerCase() === activeTab;
  });

  /* ---------------- LIST ---------------- */

  if (screen === "list") {
    return (
      <div className="p-5 bg-white min-h-screen">
        <h1 className="text-xl font-bold">Tool Room Management</h1>

        <div className="mt-4 flex gap-2">
          {["light", "heavy", "repair"].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded-xl border font-semibold ${
                activeTab === t ? "bg-teal-700 text-white" : ""
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* TOOL TYPES */}
        {activeTab !== "repair" && (
          <div className="mt-5 space-y-3">
            {toolTypes
              .filter((t) => t.category.toLowerCase() === activeTab)
              .map((t) => {
                const Icon = t.icon;
                return (
                  <div key={t.name} className="border rounded-2xl p-4 flex justify-between">
                    <div className="flex gap-3 items-center">
                      <Icon className="w-6 h-6 text-teal-700" />
                      <div>
                        <p className="font-bold">{t.name}</p>
                        <p className="text-xs text-gray-500">
                          Remaining: {remainingCount(t)} / {t.total}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedType(t);
                        setScreen("allocate");
                      }}
                      className="px-4 py-2 bg-teal-700 text-white rounded-xl"
                    >
                      Allocate
                    </button>
                  </div>
                );
              })}
          </div>
        )}

        {/* ISSUED / REPAIR LIST */}
        <div className="mt-6 space-y-3">
          {filteredTools.length === 0 && (
            <div className="p-5 border rounded-xl text-center text-gray-500">
              <AlertTriangle className="mx-auto w-5 h-5" />
              No tools found
            </div>
          )}

          {filteredTools.map((t) => (
            <div key={t.id} className="border rounded-2xl p-4">
              <div className="flex justify-between">
                <div>
                  <p className="font-mono text-xs">{t.id}</p>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-xs">
                    {t.status} · {t.condition}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedTool(t);
                      setShowHistory(true);
                    }}
                    className="px-3 py-2 border rounded-xl"
                  >
                    <History className="w-4 h-4" />
                  </button>

                  {t.status === "Issued" && (
                    <button
                      onClick={() => {
                        setSelectedTool(t);
                        setScreen("return");
                      }}
                      className="px-3 py-2 border rounded-xl"
                    >
                      Return
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* HISTORY DRAWER */}
        {showHistory && selectedTool && (
          <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
            <div className="w-full max-w-md bg-white p-5">
              <button onClick={() => setShowHistory(false)}>Close</button>
              <h2 className="font-bold mt-2">{selectedTool.id} History</h2>

              <div className="mt-4 space-y-3">
                {selectedTool.history.map((h, i) => (
                  <div key={i} className="border-l-2 pl-3">
                    <p className="font-semibold text-sm">{h.action}</p>
                    <p className="text-xs text-gray-500">{h.date}</p>
                    <p className="text-xs">{h.note}</p>
                    <p className="text-xs font-semibold">
                      Condition: {h.condition}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ---------------- ALLOCATE ---------------- */

  if (screen === "allocate") {
    return (
      <div className="p-5">
        <button onClick={() => setScreen("list")}>
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h2 className="mt-4 font-bold">Allocate {selectedType.name}</h2>

        <select
          className="mt-3 w-full border p-3 rounded-xl"
          value={allocateForm.worker}
          onChange={(e) =>
            setAllocateForm({ ...allocateForm, worker: e.target.value })
          }
        >
          <option value="">Select Worker</option>
          {workers.map((w) => (
            <option key={w}>{w}</option>
          ))}
        </select>

        <select
          className="mt-3 w-full border p-3 rounded-xl"
          value={allocateForm.zone}
          onChange={(e) =>
            setAllocateForm({ ...allocateForm, zone: e.target.value })
          }
        >
          <option value="">Select Zone</option>
          {zones.map((z) => (
            <option key={z}>{z}</option>
          ))}
        </select>

        <button
          onClick={allocateTool}
          className="mt-4 w-full bg-teal-700 text-white py-3 rounded-xl"
        >
          Generate ID & Allocate
        </button>
      </div>
    );
  }

  /* ---------------- RETURN ---------------- */

  if (screen === "return") {
    return (
      <div className="p-5">
        <button onClick={() => setScreen("list")}>
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <h2 className="mt-4 font-bold">
          Return {selectedTool.name} ({selectedTool.id})
        </h2>

        <div className="mt-3 flex gap-2">
          {["working", "damaged"].map((c) => (
            <button
              key={c}
              onClick={() => setReturnCondition(c)}
              className={`flex-1 py-3 rounded-xl border ${
                returnCondition === c ? "bg-teal-700 text-white" : ""
              }`}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>

        {returnCondition === "damaged" && (
          <div className="mt-3 space-y-2">
            <textarea
              rows={4}
              className="w-full border rounded-xl p-3"
              placeholder="Describe damage clearly..."
              value={damageNote}
              onChange={(e) => setDamageNote(e.target.value)}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={sentForRepair}
                onChange={(e) => setSentForRepair(e.target.checked)}
              />
              Confirm tool sent for repair
            </label>
          </div>
        )}

        <button
          onClick={returnTool}
          className="mt-4 w-full bg-teal-700 text-white py-3 rounded-xl"
        >
          Confirm Return
        </button>
      </div>
    );
  }

  /* ---------------- SUCCESS ---------------- */

  if (screen === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-6 border rounded-3xl shadow-xl text-center">
          <CheckCircle2 className="mx-auto text-teal-700 w-8 h-8" />
          <p className="mt-3 font-bold">Action Completed</p>
          <p className="text-sm text-gray-500">
            Tool record updated successfully
          </p>
        </div>
      </div>
    );
  }

  return null;
}