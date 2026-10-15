import React from "react";
import { ClipboardCheck, CalendarDays, Users, Package, ArrowUpRight } from "lucide-react";

export default function SupervisorDashboard() {
  const features = [
    { title: "Check-in", detail: "Keep site arrival records up to date", icon: ClipboardCheck, tone: "bg-orange-50 text-orange-600" },
    { title: "Daily logs", detail: "Capture progress from the field", icon: CalendarDays, tone: "bg-blue-50 text-blue-600" },
    { title: "Attendance", detail: "View workforce attendance activity", icon: Users, tone: "bg-emerald-50 text-emerald-600" },
    { title: "Materials", detail: "Review site material requirements", icon: Package, tone: "bg-violet-50 text-violet-600" },
  ];

  return (
    <div className="min-h-screen bg-slate-50/70 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-7">
        <section className="relative overflow-hidden rounded-2xl bg-slate-900 px-6 py-7 text-white shadow-xl sm:px-8 sm:py-9">
          <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="relative">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-300">NIRMAAN / Site operations</p>
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Supervisor dashboard</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              A quick view of the everyday site activities that keep work moving safely.
            </p>
          </div>
        </section>

        <section>
          <div className="mb-4">
            <h2 className="text-lg font-bold tracking-tight text-slate-900">Daily operations</h2>
            <p className="mt-1 text-sm text-slate-500">Quick access to the key on-site workflows.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {features.map(({ title, detail, icon: Icon, tone }) => (
              <div key={title} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg">
                <div className="mb-5 flex items-start justify-between">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone}`}>
                    <Icon size={21} strokeWidth={1.9} />
                  </span>
                  <ArrowUpRight size={17} className="text-slate-300 transition group-hover:text-orange-500" />
                </div>
                <h3 className="font-bold text-slate-900">{title}</h3>
                <p className="mt-1.5 text-sm leading-5 text-slate-500">{detail}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
