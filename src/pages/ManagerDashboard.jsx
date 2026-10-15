import { Link, Outlet } from "react-router-dom";
import { ClipboardList, FileCheck2, CalendarCheck, Package, Plus, MapPinned, ArrowUpRight } from "lucide-react";

export default function ManagerDashboard() {
  const features = [
    { name: "Tasks", path: "tasks", description: "Track assignments and site progress", icon: ClipboardList },
    { name: "DPRs", path: "dprs", description: "Review daily progress reports", icon: FileCheck2 },
    { name: "Attendance", path: "attendance", description: "Monitor workforce attendance", icon: CalendarCheck },
    { name: "Materials", path: "materials", description: "Keep material workflows organized", icon: Package },
  ];

  return (
    <div className="min-h-screen bg-slate-50/70 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-7">
        <section className="relative overflow-hidden rounded-2xl bg-slate-900 px-6 py-7 text-white shadow-xl sm:px-8 sm:py-9">
          <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-300">NIRMAAN / Workspace</p>
              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Manager dashboard</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                Keep projects, site activity and daily decisions moving from one workspace.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="create-project" className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-orange-950/20 transition hover:bg-orange-600">
                <Plus size={17} /> Create project
              </Link>
              <Link to="map-view" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                <MapPinned size={17} /> View project map
              </Link>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-slate-900">Workspace shortcuts</h2>
              <p className="mt-1 text-sm text-slate-500">Your core project operations, grouped in one place.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.name} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-lg">
                  <div className="mb-5 flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                      <Icon size={21} strokeWidth={1.9} />
                    </span>
                    <ArrowUpRight size={17} className="text-slate-300 transition group-hover:text-orange-500" />
                  </div>
                  <h3 className="font-bold text-slate-900">{feature.name}</h3>
                  <p className="mt-1.5 text-sm leading-5 text-slate-500">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <Outlet />
        </section>
      </div>
    </div>
  );
}
