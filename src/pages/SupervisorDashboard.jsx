import React, { useState } from "react";
import { supervisorTasks } from "./supervisorTasks";
import { ClipboardList, Users, Package, CalendarDays, WifiOff, MapPinned, X, Mic, Image as ImageIcon, Clock3, ArrowUpRight } from "lucide-react";

const priorityStyles = {
  High: "bg-rose-50 text-rose-700 border-rose-200",
  Medium: "bg-amber-50 text-amber-800 border-amber-200",
  Low: "bg-emerald-50 text-emerald-700 border-emerald-200",
};
const pinStyles = { High: "bg-rose-500 ring-rose-200", Medium: "bg-amber-400 ring-amber-100", Low: "bg-emerald-500 ring-emerald-100" };

const SupervisorDashboard = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const requiredWorkers = supervisorTasks.reduce((sum, task) => sum + Number(task.workersRequired || 0), 0);
  const materialsCount = supervisorTasks.reduce((sum, task) => sum + (task.materials?.length || 0), 0);
  const stats = [
    { label: "Tasks for today", value: supervisorTasks.length, icon: ClipboardList, tone: "bg-[#e6f3ee] text-teal-800" },
    { label: "Workers required", value: requiredWorkers, icon: Users, tone: "bg-slate-100 text-slate-700" },
    { label: "Material lines", value: materialsCount, icon: Package, tone: "bg-amber-50 text-amber-800" },
  ];

  return (
    <div className="min-h-screen bg-[#f4f7f4] px-4 py-6 text-[#183a35] md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="relative overflow-hidden rounded-[28px] bg-[#102b2a] p-6 text-white shadow-xl md:p-8">
          <div className="absolute -right-12 -top-16 h-64 w-64 rounded-full border-[34px] border-white/5" />
          <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-teal-100"><MapPinned size={14} /> SITE WORKSPACE</p>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Supervisor overview</h1>
              <p className="mt-2 text-sm text-slate-300">Select a task on the layout or from the work list to inspect its details.</p>
            </div>
            <span className="inline-flex items-center gap-2 self-start rounded-full border border-amber-200/20 bg-amber-300/10 px-3 py-2 text-xs font-semibold text-amber-100 sm:self-auto"><WifiOff size={14} /> Offline mode</span>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map(({ label, value, icon: Icon, tone }) => <div key={label} className="rounded-2xl border border-[#dce7e1] bg-white p-5 shadow-sm"><div className="flex items-center justify-between gap-3"><div><p className="text-sm text-[#71847d]">{label}</p><p className="mt-3 text-3xl font-bold">{value}</p></div><span className={`rounded-xl p-3 ${tone}`}><Icon size={20} /></span></div></div>)}
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,.8fr)]">
          <div className="overflow-hidden rounded-2xl border border-[#dce7e1] bg-white shadow-sm">
            <div className="flex items-center justify-between gap-3 border-b border-[#e5ede8] px-5 py-4 md:px-6"><div><h2 className="font-bold">Project layout</h2><p className="mt-1 text-xs text-[#71847d]">Select a marker to view the assigned work</p></div><span className="rounded-full bg-[#f4f7f4] px-3 py-1 text-xs font-semibold text-[#5f756e]">{supervisorTasks.length} markers</span></div>
            <div className="flex min-h-[360px] items-center justify-center overflow-auto bg-[linear-gradient(45deg,#f7faf8_25%,transparent_25%),linear-gradient(-45deg,#f7faf8_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f7faf8_75%),linear-gradient(-45deg,transparent_75%,#f7faf8_75%)] bg-[length:24px_24px] p-4 md:p-6">
              <div className="relative inline-block max-w-full overflow-hidden rounded-xl border border-[#dce7e1] bg-white shadow-sm">
                <img src="/1520189063040.jpg" alt="Project floor layout" className="block max-h-[68vh] max-w-full object-contain" />
                {supervisorTasks.map(task => <button key={task.id} type="button" onClick={() => setSelectedTask(task)} aria-label={`Open ${task.category} task`} title={task.category} className={`absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white ring-4 shadow-md transition hover:scale-125 ${pinStyles[task.priority] || pinStyles.Medium}`} style={{ left: `${task.coordinates.xPercent}%`, top: `${task.coordinates.yPercent}%` }} />)}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 border-t border-[#e5ede8] px-5 py-3 text-xs text-[#71847d] md:px-6"><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-rose-500" /> High priority</span><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-amber-400" /> Medium priority</span><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Low priority</span></div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#dce7e1] bg-white shadow-sm">
            <div className="border-b border-[#e5ede8] px-5 py-4 md:px-6"><h2 className="font-bold">Today's tasks</h2><p className="mt-1 text-xs text-[#71847d]">Priority, workforce and materials at a glance</p></div>
            <div className="max-h-[650px] space-y-3 overflow-y-auto p-4 md:p-5">
              {supervisorTasks.map(task => <button key={task.id} type="button" onClick={() => setSelectedTask(task)} className={`w-full rounded-xl border p-4 text-left transition hover:border-teal-200 hover:bg-[#fbfdfb] ${selectedTask?.id === task.id ? "border-teal-300 bg-[#e6f3ee]" : "border-[#dce7e1] bg-white"}`}>
                <div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="font-bold leading-5 text-[#203c38]">{task.category}</p><p className="mt-1 line-clamp-2 text-xs leading-5 text-[#71847d]">{task.description}</p></div><span className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-bold ${priorityStyles[task.priority] || priorityStyles.Medium}`}>{task.priority}</span></div>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#5f756e]"><span className="inline-flex items-center gap-1.5"><Users size={14} />{task.workersRequired} workers</span><span className="inline-flex items-center gap-1.5"><Package size={14} />{task.materials?.length || 0} materials</span>{task.voiceNote && <span className="inline-flex items-center gap-1.5"><Mic size={14} />Voice note</span>}{task.images?.length > 0 && <span className="inline-flex items-center gap-1.5"><ImageIcon size={14} />{task.images.length} photos</span>}</div>
                <div className="mt-3 flex items-center justify-end gap-1 text-xs font-bold text-teal-800">View task <ArrowUpRight size={14} /></div>
              </button>)}
            </div>
          </div>
        </section>
      </div>

      {selectedTask && <div className="fixed inset-0 z-50 flex justify-end bg-[#102b2a]/50 backdrop-blur-sm" onClick={() => setSelectedTask(null)}>
        <aside className="h-full w-full max-w-lg overflow-y-auto bg-[#f4f7f4] shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/10 bg-[#102b2a] px-5 py-5 text-white"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-teal-100">Task details</p><h2 className="mt-1 text-xl font-bold">{selectedTask.category}</h2><p className="mt-1 text-sm text-slate-300">Task ID · {selectedTask.id}</p></div><button onClick={() => setSelectedTask(null)} aria-label="Close task details" className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"><X size={20} /></button></div>
          <div className="space-y-5 p-5">
            {selectedTask.voiceNote && <section className="rounded-2xl border border-[#dce7e1] bg-white p-4"><h3 className="mb-3 text-sm font-bold">Voice instructions</h3><audio controls className="w-full"><source src={selectedTask.voiceNote} /></audio></section>}
            {selectedTask.images?.length > 0 && <section className="rounded-2xl border border-[#dce7e1] bg-white p-4"><h3 className="mb-3 text-sm font-bold">Reference photos</h3><div className="grid grid-cols-2 gap-3">{selectedTask.images.map((img, i) => <img key={i} src={img} alt={`Task reference ${i+1}`} className="aspect-square w-full rounded-xl border border-[#dce7e1] object-cover" />)}</div></section>}
            <section className="rounded-2xl border border-[#dce7e1] bg-white p-5"><div className="mb-4 flex items-center justify-between"><h3 className="font-bold">Assignment</h3><span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${priorityStyles[selectedTask.priority] || priorityStyles.Medium}`}>{selectedTask.priority} priority</span></div><div className="space-y-3 text-sm"><p><span className="text-[#71847d]">Workers required</span><strong className="float-right">{selectedTask.workersRequired}</strong></p><p><span className="text-[#71847d]">Materials</span><strong className="float-right">{selectedTask.materials?.length || 0}</strong></p><p><span className="text-[#71847d]">Schedule</span><strong className="float-right text-right">{selectedTask.startDate} → {selectedTask.endDate}</strong></p><div className="border-t border-[#e5ede8] pt-3"><p className="mb-1 text-xs font-bold uppercase tracking-wide text-[#71847d]">Description</p><p className="leading-6 text-[#36504b]">{selectedTask.description || "No additional description provided."}</p></div><div className="border-t border-[#e5ede8] pt-3"><p className="mb-1 text-xs font-bold uppercase tracking-wide text-[#71847d]">Materials required</p><p className="leading-6 text-[#36504b]">{selectedTask.materials?.length ? selectedTask.materials.join(", ") : "No materials listed."}</p></div></div></section>
            <p className="flex items-center gap-2 text-xs text-[#71847d]"><CalendarDays size={14} /> Review the schedule and field instructions before starting work.</p>
          </div>
        </aside>
      </div>}
    </div>
  );
};

export default SupervisorDashboard;
