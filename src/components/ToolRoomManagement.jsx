import React, { useState } from "react";
import QRCode from "react-qr-code";
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
  const [allocatedTool, setAllocatedTool] = useState(null);
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

    setTools((prev) => [...prev, newTool]);
    setAllocatedTool(newTool);
    setScreen("success");
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
      <div className="min-h-screen bg-[#f4f7f4] px-4 py-10 text-[#183a35] md:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-3xl border border-[#dce7e1] bg-white shadow-xl">
            <div className="bg-[#102b2a] px-6 py-7 text-white md:px-8">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-9 w-9 text-emerald-300" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.18em] text-teal-100">Allocation complete</p>
                  <h1 className="mt-1 text-2xl font-bold">Tool issued successfully</h1>
                </div>
              </div>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">A unique tool ID and QR label have been generated. Print or scan this label to identify the issued tool and its assignment.</p>
            </div>
            {allocatedTool ? (
              <div className="grid gap-6 p-6 md:grid-cols-[minmax(0,1fr)_240px] md:p-8">
                <div>
                  <div className="rounded-2xl border border-[#dce7e1] bg-[#f7faf8] p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#71847d]">Unique tool ID</p>
                    <p className="mt-2 font-mono text-3xl font-bold tracking-tight text-[#102b2a]">{allocatedTool.id}</p>
                    <div className="mt-5 grid grid-cols-2 gap-4">
                      <div><p className="text-xs text-[#71847d]">Tool</p><p className="mt-1 font-semibold">{allocatedTool.name}</p></div>
                      <div><p className="text-xs text-[#71847d]">Category</p><p className="mt-1 font-semibold">{allocatedTool.category}</p></div>
                      <div><p className="text-xs text-[#71847d]">Assigned to</p><p className="mt-1 font-semibold">{allocatedTool.issuedTo}</p></div>
                      <div><p className="text-xs text-[#71847d]">Site zone</p><p className="mt-1 font-semibold">{allocatedTool.zone}</p></div>
                    </div>
                    <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800"><CheckCircle2 size={14} /> Issued · Working condition</div>
                  </div>
                  <p className="mt-4 text-xs leading-5 text-[#71847d]">QR content identifies this tool and assignment in the current app. This is a client-generated label; backend persistence and a dedicated scan workflow are separate integrations.</p>
                </div>
                <div className="flex flex-col items-center justify-center rounded-2xl border border-[#dce7e1] p-5 text-center">
                  <div className="rounded-xl bg-white p-3"><QRCode value={JSON.stringify({ app: "NIRMAAN", type: "tool", id: allocatedTool.id, name: allocatedTool.name, assignedTo: allocatedTool.issuedTo, zone: allocatedTool.zone })} size={180} level="M" /></div>
                  <p className="mt-4 text-sm font-bold">Tool QR label</p>
                  <p className="mt-1 text-xs text-[#71847d]">Keep with the equipment</p>
                  <button onClick={() => window.print()} className="mt-4 w-full rounded-xl border border-[#dce7e1] px-4 py-2.5 text-sm font-bold text-[#244740] transition hover:bg-[#f4f7f4]">Print label</button>
                </div>
                <div className="md:col-span-2">
                  <button onClick={() => { setScreen("list"); setSelectedType(null); setSelectedTool(null); setAllocatedTool(null); setAllocateForm({ worker: "", zone: "" }); }} className="w-full rounded-xl bg-[#0f766e] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#0b5d57]">Return to tool room</button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="font-semibold">Tool record updated successfully.</p>
                <button onClick={() => setScreen("list")} className="mt-5 rounded-xl bg-[#0f766e] px-5 py-3 text-sm font-bold text-white">Return to tool room</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}