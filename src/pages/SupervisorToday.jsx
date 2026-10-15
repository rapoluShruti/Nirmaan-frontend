import React from "react";
import { supervisorTodayData } from "./supervisorTodayData";
import { CalendarDays, ClipboardList, Users, Package, AlertTriangle, HardHat, WifiOff, Clock3, CheckCircle2, Truck } from "lucide-react";

const SupervisorToday = () => {
  const data = supervisorTodayData;
  const stats = [
    { title: "Carry-forward", value: data.carriedForwardTasks.length, note: "Needs attention", icon: Clock3, tone: "amber" },
    { title: "Today's tasks", value: data.todaysTasks.length, note: "Planned work", icon: ClipboardList, tone: "teal" },
    { title: "Workers required", value: data.workers.requiredToday, note: "Today's workforce", icon: Users, tone: "slate" },
    { title: "Low-stock items", value: data.materials.lowStock.length, note: "Inventory alerts", icon: Package, tone: "rose" },
  ];
  const tones = {
    amber: "bg-amber-50 text-amber-800 border-amber-100",
    teal: "bg-[#e6f3ee] text-teal-800 border-[#cce4d9]",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    rose: "bg-rose-50 text-rose-700 border-rose-100",
  };

  return (
    <div className="min-h-screen bg-[#f4f7f4] px-4 py-6 text-[#183a35] md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="relative overflow-hidden rounded-[28px] bg-[#102b2a] p-6 text-white shadow-xl md:p-8">
          <div className="absolute -right-12 -top-16 h-64 w-64 rounded-full border-[34px] border-white/5" />
          <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-teal-100"><HardHat size={14} /> SITE OPERATIONS</p>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Today's site plan</h1>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-300"><CalendarDays size={15} /> {data.date}</p>
            </div>
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-amber-200/20 bg-amber-300/10 px-3 py-2 text-xs font-semibold text-amber-100 md:self-auto"><WifiOff size={14} /> Offline-ready view</div>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ title, value, note, icon: Icon, tone }) => (
            <div key={title} className="rounded-2xl border border-[#dce7e1] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-medium text-[#71847d]">{title}</p><p className="mt-3 text-3xl font-bold tracking-tight">{value}</p></div><span className={`rounded-xl border p-3 ${tones[tone]}`}><Icon size={20} /></span></div>
              <p className="mt-3 text-xs text-[#71847d]">{note}</p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <Section title="Carry-forward tasks" subtitle="Work carried over from previous days" icon={AlertTriangle} accent="amber" count={data.carriedForwardTasks.length}>
            {data.carriedForwardTasks.length ? data.carriedForwardTasks.map(t => <ListItem key={t.id} text={t.name} badge={t.priority} tone="amber" />) : <EmptyState text="No outstanding carry-forward tasks." />}
          </Section>
          <Section title="Today's work" subtitle="Planned tasks for this shift" icon={ClipboardList} accent="teal" count={data.todaysTasks.length}>
            {data.todaysTasks.length ? data.todaysTasks.map(t => <ListItem key={t.id} text={t.name} />) : <EmptyState text="No tasks are scheduled for today." />}
          </Section>
          <Section title="Workforce status" subtitle="Required vs. available workers" icon={Users} accent="slate">
            <div className="space-y-3">
              <MetricRow label="Required" value={data.workers.requiredToday} />
              <MetricRow label="Present" value={data.workers.present} tone="green" />
              <MetricRow label="Absent" value={data.workers.absent} tone={data.workers.absent ? "rose" : "muted"} />
              <div className="pt-2"><div className="mb-2 flex justify-between text-xs text-[#71847d]"><span>Coverage</span><span>{data.workers.requiredToday ? Math.min(100, Math.round((data.workers.present / data.workers.requiredToday) * 100)) : 0}%</span></div><div className="h-2 overflow-hidden rounded-full bg-[#eaf0ec]"><div className="h-full rounded-full bg-teal-700" style={{ width: `${data.workers.requiredToday ? Math.min(100, (data.workers.present / data.workers.requiredToday) * 100) : 0}%` }} /></div></div>
            </div>
          </Section>
          <Section title="Low-stock materials" subtitle="Items to replenish" icon={Package} accent="rose" count={data.materials.lowStock.length}>
            {data.materials.lowStock.length ? data.materials.lowStock.map((m, i) => <div key={i} className="flex items-center justify-between gap-3 border-b border-[#edf2ee] py-3 last:border-0"><div className="flex min-w-0 items-center gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-700"><Package size={16} /></span><span className="truncate text-sm font-semibold">{m.name}</span></div><span className="rounded-lg bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700">{m.qty} left</span></div>) : <EmptyState text="No low-stock materials reported." />}
          </Section>
          <Section title="Equipment for today" subtitle="Tools and machinery on the plan" icon={Truck} accent="slate" count={data.equipmentRequired.length}>
            {data.equipmentRequired.length ? data.equipmentRequired.map((e, i) => <div key={i} className="flex items-center gap-3 border-b border-[#edf2ee] py-3 last:border-0"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700"><Truck size={16} /></span><p className="text-sm font-medium">{e}</p></div>) : <EmptyState text="No equipment requirements listed." />}
          </Section>
          <Section title="Site alerts" subtitle="Safety and delivery risks" icon={AlertTriangle} accent="amber">
            <AlertRow label="Safety" value={data.alerts.safety} tone="rose" />
            <AlertRow label="Schedule" value={data.alerts.delayRisk} tone="amber" />
          </Section>
        </section>
        <p className="flex items-center justify-center gap-2 pb-2 text-xs text-[#71847d]"><CheckCircle2 size={14} /> Site overview designed for quick checks on mobile and desktop</p>
      </div>
    </div>
  );
};

const Section = ({ title, subtitle, icon: Icon, accent = "teal", count, children }) => {
  const accents = { teal: "bg-[#e6f3ee] text-teal-800", amber: "bg-amber-50 text-amber-800", rose: "bg-rose-50 text-rose-700", slate: "bg-slate-100 text-slate-700" };
  return <section className="rounded-2xl border border-[#dce7e1] bg-white p-5 shadow-sm md:p-6"><div className="mb-4 flex items-start justify-between gap-3"><div className="flex items-start gap-3"><span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${accents[accent]}`}><Icon size={19} /></span><div><h2 className="font-bold tracking-tight">{title}</h2><p className="mt-1 text-xs leading-5 text-[#71847d]">{subtitle}</p></div></div>{count !== undefined && <span className="rounded-full bg-[#f4f7f4] px-2.5 py-1 text-xs font-bold text-[#5f756e]">{count}</span>}</div><div>{children}</div></section>;
};
const ListItem = ({ text, badge, tone = "teal" }) => <div className="flex items-center justify-between gap-3 border-b border-[#edf2ee] py-3 last:border-0"><span className="text-sm font-medium leading-5 text-[#36504b]">{text}</span>{badge && <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${tone === "amber" ? "bg-amber-50 text-amber-800" : "bg-[#e6f3ee] text-teal-800"}`}>{badge}</span>}</div>;
const MetricRow = ({ label, value, tone = "muted" }) => <div className="flex items-center justify-between rounded-xl bg-[#f7faf8] px-3.5 py-3"><span className="text-sm text-[#5f756e]">{label}</span><span className={`text-sm font-bold ${tone === "green" ? "text-emerald-700" : tone === "rose" ? "text-rose-700" : "text-[#203c38]"}`}>{value}</span></div>;
const AlertRow = ({ label, value, tone }) => <div className={`mb-3 rounded-xl border p-4 last:mb-0 ${tone === "rose" ? "border-rose-100 bg-rose-50" : "border-amber-100 bg-amber-50"}`}><p className={`mb-1 text-xs font-bold uppercase tracking-wide ${tone === "rose" ? "text-rose-700" : "text-amber-800"}`}>{label}</p><p className={`text-sm leading-5 ${tone === "rose" ? "text-rose-800" : "text-amber-900"}`}>{value}</p></div>;
const EmptyState = ({ text }) => <div className="rounded-xl border border-dashed border-[#dce7e1] px-4 py-6 text-center text-sm text-[#71847d]">{text}</div>;

export default SupervisorToday;
