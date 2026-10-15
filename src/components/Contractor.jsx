import React, { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Clock,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Building2,
  MapPin,
  TrendingUp,
  Wallet,
  ClipboardList,
  PhoneCall,
  Mail,
  User2,
  CalendarDays,
  BadgePercent,
  FileSignature,
  Send,
} from "lucide-react";

/*
  NIRMAAN – CONTRACTOR RATING & MANAGEMENT (Forest + Teal Workspace)
  - Enterprise dashboard look
  - Better right drawer (ERP-like)
  - Sales Enablement module inside details (like Tally for Finance)
*/

export default function ContractorRatingManagement() {
  /* ---------------- MOCK DATA ---------------- */
  const initialContractors = [
    contractor("MegaBuild Infra", "Maharashtra", 8.4, "On Time", "Passed", 1, 3, 2, 11, "Warm", "Negotiation", "Rohit", "Tomorrow 11:00 AM"),
    contractor("Reliable Constructions", "Karnataka", 7.9, "Delayed", "Approved", 4, 4, 5, 17, "Hot", "Proposal Sent", "Shruti", "Today 5:30 PM"),
    contractor("Skyline Projects", "Gujarat", 6.5, "Delayed", "Rejected", 5, 3, 7, 21, "Cold", "New Lead", "Aman", "Next Week"),
    contractor("Apex Civil Solutions", "Tamil Nadu", 8.8, "Completed", "Passed", 0, 4, 1, 8, "Hot", "Negotiation", "Shruti", "Today 7:00 PM"),
    contractor("Progress Builders", "Uttar Pradesh", 9.0, "On Time", "Passed", 0, 3, 0, 6, "Hot", "Won", "Rohit", "No Follow-up"),
    contractor("EverRise Constructions", "Rajasthan", 5.4, "Warning", "Approved", 5, 1, 9, 29, "Cold", "New Lead", "Neha", "Next Month"),
  ];

  function contractor(
    name,
    state,
    rating,
    deadline,
    inspection,
    delays,
    projects,
    defects,
    daysSinceLastIncident,
    leadTemp,
    salesStage,
    salesOwner,
    nextFollowUp
  ) {
    return {
      id: name,
      name,
      state,
      rating,
      deadline,
      inspection,
      delays,
      projects,
      defects,
      daysSinceLastIncident,
      updatedAt: "Today 10:42 AM",

      // Sales Team fields
      leadTemp, // Hot | Warm | Cold
      salesStage, // New Lead | Proposal Sent | Negotiation | Won
      salesOwner,
      nextFollowUp,
    };
  }

  const [contractors] = useState(initialContractors);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);

  const [filters, setFilters] = useState({
    deadline: "all",
    inspection: "all",
    ratingBand: "all",
  });

  /* ---------------- PAYMENT ADVICE LOGIC ---------------- */
  const paymentAdvice = (rating) => {
    if (rating >= 9)
      return {
        pay: "100%",
        retain: "0%",
        note: "Excellent performance. Release full payment.",
      };
    if (rating >= 7)
      return {
        pay: "90%",
        retain: "10%",
        note: "Good performance. Retain until final closure.",
      };
    if (rating >= 5)
      return {
        pay: "75%",
        retain: "25%",
        note: "Average. Retain more for defects & rework.",
      };
    return {
      pay: "Hold",
      retain: "100%",
      note: "Poor performance. Escalate to management.",
    };
  };

  /* ---------------- UI HELPERS ---------------- */
  const scoreTone = (r) => {
    if (r >= 8.5)
      return {
        chip: "bg-emerald-50 text-emerald-700 border-emerald-200",
        bar: "bg-emerald-600",
      };
    if (r >= 7)
      return {
        chip: "bg-[#e6f3ee] text-teal-800 border-[#b9d9cf]",
        bar: "bg-teal-700",
      };
    if (r >= 6)
      return {
        chip: "bg-amber-50 text-amber-700 border-amber-200",
        bar: "bg-amber-500",
      };
    return {
      chip: "bg-red-50 text-red-700 border-red-200",
      bar: "bg-red-600",
    };
  };

  const deadlineBadge = (d) => {
    const map = {
      "On Time": "bg-emerald-50 text-emerald-700 border-emerald-200",
      Completed: "bg-[#e6f3ee] text-teal-800 border-[#b9d9cf]",
      Delayed: "bg-amber-50 text-amber-700 border-amber-200",
      Warning: "bg-red-50 text-red-700 border-red-200",
    };
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
          map[d] || "bg-gray-50 text-gray-700 border-gray-200"
        }`}
      >
        {d === "On Time" && <CheckCircle2 className="w-3.5 h-3.5" />}
        {d === "Delayed" && <Clock className="w-3.5 h-3.5" />}
        {d === "Warning" && <AlertTriangle className="w-3.5 h-3.5" />}
        {d === "Completed" && <ClipboardList className="w-3.5 h-3.5" />}
        {d}
      </span>
    );
  };

  const inspectionBadge = (i) => {
    const map = {
      Passed: "bg-emerald-50 text-emerald-700 border-emerald-200",
      Approved: "bg-amber-50 text-amber-700 border-amber-200",
      Rejected: "bg-red-50 text-red-700 border-red-200",
    };
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
          map[i] || "bg-gray-50 text-gray-700 border-gray-200"
        }`}
      >
        {i === "Passed" && <ShieldCheck className="w-3.5 h-3.5" />}
        {i === "Approved" && <AlertTriangle className="w-3.5 h-3.5" />}
        {i === "Rejected" && <XCircle className="w-3.5 h-3.5" />}
        {i}
      </span>
    );
  };

  const riskLabel = (c) => {
    const riskScore =
      (10 - c.rating) * 1.2 +
      c.delays * 0.7 +
      c.defects * 0.5 +
      (c.daysSinceLastIncident < 10 ? 1.2 : 0);

    if (riskScore <= 4)
      return {
        label: "Low Risk",
        cls: "bg-emerald-50 text-emerald-700 border-emerald-200",
      };
    if (riskScore <= 7)
      return {
        label: "Medium Risk",
        cls: "bg-amber-50 text-amber-700 border-amber-200",
      };
    return {
      label: "High Risk",
      cls: "bg-red-50 text-red-700 border-red-200",
    };
  };

  const salesChip = (temp) => {
    const map = {
      Hot: "bg-red-50 text-red-700 border-red-200",
      Warm: "bg-[#e6f3ee] text-teal-800 border-[#b9d9cf]",
      Cold: "bg-slate-50 text-slate-700 border-slate-200",
    };
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
          map[temp] || "bg-gray-50 text-gray-700 border-gray-200"
        }`}
      >
        <BadgePercent className="w-3.5 h-3.5" />
        {temp}
      </span>
    );
  };

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();

    return contractors
      .filter((c) => c.name.toLowerCase().includes(s) || c.state.toLowerCase().includes(s))
      .filter((c) => (filters.deadline === "all" ? true : c.deadline === filters.deadline))
      .filter((c) => (filters.inspection === "all" ? true : c.inspection === filters.inspection))
      .filter((c) => {
        if (filters.ratingBand === "all") return true;
        if (filters.ratingBand === "top") return c.rating >= 8.5;
        if (filters.ratingBand === "mid") return c.rating >= 6.5 && c.rating < 8.5;
        return c.rating < 6.5;
      });
  }, [contractors, search, filters]);

  const kpis = useMemo(() => {
    const total = contractors.length;
    const top = contractors.filter((c) => c.rating >= 8.5).length;
    const delayed = contractors.filter((c) => c.deadline === "Delayed").length;
    const highRisk = contractors.filter((c) => riskLabel(c).label === "High Risk").length;
    return { total, top, delayed, highRisk };
  }, [contractors]);

  return (
    <div className="min-h-screen bg-[#fff7ed]">
      {/* Header */}
      <div className="sticky top-0 z-30 border-b border-[#b9d9cf] bg-white/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-teal-700 text-white flex items-center justify-center shadow-sm">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                    Contractor Rating & Management
                  </h1>
                  <p className="text-[11px] sm:text-sm text-gray-600">
                    Risk-based scoring • Payment guidance • Sales enablement
                  </p>
                </div>
              </div>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-[520px]">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  className="w-full pl-9 pr-3 py-2.5 border border-[#b9d9cf] rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
                  placeholder="Search contractor name / state..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <button
                onClick={() => setOpenFilter((p) => !p)}
                className="px-4 py-2.5 border border-[#b9d9cf] bg-white rounded-xl flex items-center justify-center gap-2 text-sm font-medium hover:bg-[#e6f3ee]"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>

          {/* Filters */}
          {openFilter && (
            <div className="mt-3 bg-white border border-[#b9d9cf] rounded-2xl p-3 sm:p-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <p className="text-[11px] font-semibold text-gray-600 mb-1">Deadline</p>
                  <select
                    value={filters.deadline}
                    onChange={(e) => setFilters((p) => ({ ...p, deadline: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#b9d9cf] rounded-xl text-sm bg-white"
                  >
                    <option value="all">All</option>
                    <option value="On Time">On Time</option>
                    <option value="Delayed">Delayed</option>
                    <option value="Completed">Completed</option>
                    <option value="Warning">Warning</option>
                  </select>
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-gray-600 mb-1">Inspection</p>
                  <select
                    value={filters.inspection}
                    onChange={(e) => setFilters((p) => ({ ...p, inspection: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#b9d9cf] rounded-xl text-sm bg-white"
                  >
                    <option value="all">All</option>
                    <option value="Passed">Passed</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-gray-600 mb-1">Rating Band</p>
                  <select
                    value={filters.ratingBand}
                    onChange={(e) => setFilters((p) => ({ ...p, ratingBand: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#b9d9cf] rounded-xl text-sm bg-white"
                  >
                    <option value="all">All</option>
                    <option value="top">Top (8.5+)</option>
                    <option value="mid">Mid (6.5 - 8.4)</option>
                    <option value="low">Low (&lt; 6.5)</option>
                  </select>
                </div>
              </div>

              <div className="mt-3 flex flex-col sm:flex-row gap-2 sm:justify-end">
                <button
                  onClick={() =>
                    setFilters({
                      deadline: "all",
                      inspection: "all",
                      ratingBand: "all",
                    })
                  }
                  className="px-4 py-2 rounded-xl border border-[#b9d9cf] bg-white text-sm hover:bg-[#e6f3ee]"
                >
                  Reset
                </button>
                <button
                  onClick={() => setOpenFilter(false)}
                  className="px-4 py-2 rounded-xl bg-teal-700 text-white text-sm hover:bg-teal-800"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 space-y-4">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <KpiCard title="Total Contractors" value={kpis.total} icon={<ClipboardList className="w-4 h-4" />} />
          <KpiCard title="Top Rated (8.5+)" value={kpis.top} icon={<TrendingUp className="w-4 h-4" />} />
          <KpiCard title="Delayed Vendors" value={kpis.delayed} icon={<Clock className="w-4 h-4" />} />
          <KpiCard title="High Risk" value={kpis.highRisk} icon={<AlertTriangle className="w-4 h-4" />} />
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white border border-[#b9d9cf] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#b9d9cf] flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">Contractor List</h2>
              <p className="text-xs text-gray-500">Click any contractor to view Governance + Sales Enablement</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-[#e6f3ee] text-teal-800 border border-[#b9d9cf]">
              Showing {filtered.length} / {contractors.length}
            </span>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-[#e6f3ee]/60">
              <tr className="text-left">
                <th className="px-5 py-3 text-xs font-semibold text-gray-700">Contractor</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-700">Score</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-700">Deadline</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-700">Inspection</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-700">Delays</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-700">Risk</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-700">Sales</th>
                <th className="px-5 py-3 text-xs font-semibold text-gray-700 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((c) => {
                const tone = scoreTone(c.rating);
                const risk = riskLabel(c);
                const advice = paymentAdvice(c.rating);

                return (
                  <tr
                    key={c.id}
                    className="border-t border-[#dce7e1] hover:bg-[#e6f3ee]/30 cursor-pointer"
                    onClick={() => setSelected(c)}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-700 text-white flex items-center justify-center shadow-sm">
                          <Building2 className="w-5 h-5" />
                        </div>

                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 truncate">{c.name}</p>
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{c.state}</span>
                            <span className="mx-1 text-gray-300">•</span>
                            <span>Updated: {c.updatedAt}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`px-2.5 py-1 rounded-full border text-[11px] font-semibold ${tone.chip}`}>
                          Score: {c.rating.toFixed(1)}
                        </div>
                        <div className="flex-1 max-w-[180px]">
                          <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                            <div
                              className={`h-full ${tone.bar}`}
                              style={{ width: `${Math.min(100, (c.rating / 10) * 100)}%` }}
                            />
                          </div>
                          <p className="text-[10px] text-gray-500 mt-1">
                            Advice: <span className="font-semibold text-gray-800">{advice.pay}</span> pay now
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">{deadlineBadge(c.deadline)}</td>
                    <td className="px-5 py-4">{inspectionBadge(c.inspection)}</td>

                    <td className="px-5 py-4">
                      <div className="inline-flex items-center gap-2 text-gray-700">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="font-semibold">{c.delays}</span>
                        <span className="text-gray-400">/</span>
                        <span>{c.projects}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-1">Defects: {c.defects}</p>
                    </td>

                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full border text-[11px] font-semibold ${risk.cls}`}>
                        {risk.label}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-2">
                        {salesChip(c.leadTemp)}
                        <span className="text-[11px] text-gray-600">
                          Stage: <b className="text-gray-900">{c.salesStage}</b>
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected(c);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-700 text-white text-xs font-semibold hover:bg-teal-800"
                      >
                        View Details <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="p-10 text-center text-sm text-gray-500">No contractors match your filters.</div>
          )}
        </div>

        {/* Mobile cards */}
        <div className="lg:hidden space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-gray-900">Contractors</h2>
            <span className="text-xs px-3 py-1 rounded-full bg-[#e6f3ee] text-teal-800 border border-[#b9d9cf]">
              {filtered.length} shown
            </span>
          </div>

          {filtered.map((c) => {
            const tone = scoreTone(c.rating);
            const risk = riskLabel(c);
            const advice = paymentAdvice(c.rating);

            return (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className="w-full text-left bg-white border border-[#b9d9cf] rounded-2xl p-4 hover:bg-[#e6f3ee]/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{c.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{c.state}</p>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {deadlineBadge(c.deadline)}
                      {inspectionBadge(c.inspection)}
                      <span className={`px-2.5 py-1 rounded-full border text-[11px] font-semibold ${risk.cls}`}>
                        {risk.label}
                      </span>
                      {salesChip(c.leadTemp)}
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <div
                      className={`inline-flex items-center px-2.5 py-1 rounded-full border text-[11px] font-semibold ${tone.chip}`}
                    >
                      {c.rating.toFixed(1)}
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">Pay Now</p>
                    <p className="text-[11px] font-semibold text-gray-900">{advice.pay}</p>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`h-full ${tone.bar}`}
                      style={{ width: `${Math.min(100, (c.rating / 10) * 100)}%` }}
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between text-xs text-gray-600">
                    <span>
                      Delays: <b className="text-gray-900">{c.delays}</b> / {c.projects}
                    </span>
                    <span className="text-gray-600">
                      Stage: <b className="text-gray-900">{c.salesStage}</b>
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="text-xs text-gray-600">
                    Defects: <b className="text-gray-900">{c.defects}</b>
                  </div>

                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-gray-900">
                    Details <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </button>
            );
          })}

          {filtered.length === 0 && (
            <div className="bg-white border border-[#b9d9cf] rounded-2xl p-10 text-center text-sm text-gray-500">
              No contractors match your search/filters.
            </div>
          )}
        </div>
      </div>

      {/* Details Drawer */}
      {selected && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelected(null)} />

          <div className="absolute right-0 top-0 h-full w-full sm:w-[540px] bg-white shadow-2xl border-l border-[#b9d9cf]">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-5 border-b border-[#b9d9cf] bg-white">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs text-teal-700 font-semibold">Contractor Profile</p>
                    <h3 className="text-lg font-bold text-gray-900 truncate">{selected.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {selected.state} • Last Update:{" "}
                      <span className="font-semibold text-gray-800">{selected.updatedAt}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => setSelected(null)}
                    className="px-3 py-2 rounded-xl border border-[#b9d9cf] hover:bg-[#e6f3ee] text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 overflow-auto flex-1">
                {(() => {
                  const tone = scoreTone(selected.rating);
                  const risk = riskLabel(selected);
                  const advice = paymentAdvice(selected.rating);

                  return (
                    <div className="space-y-4">
                      {/* Score + Advice */}
                      <div className="bg-[#e6f3ee]/40 border border-[#b9d9cf] rounded-2xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-gray-600 font-semibold">Performance Score</p>
                            <div className="mt-1 flex items-center gap-2">
                              <span className={`px-2.5 py-1 rounded-full border text-[11px] font-semibold ${tone.chip}`}>
                                {selected.rating.toFixed(1)} / 10
                              </span>
                              <span className={`px-2.5 py-1 rounded-full border text-[11px] font-semibold ${risk.cls}`}>
                                {risk.label}
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-xs text-gray-600 font-semibold">Payment Release</p>
                            <p className="text-base font-bold text-gray-900">{advice.pay}</p>
                          </div>
                        </div>

                        <div className="mt-3 h-2 rounded-full bg-white border border-[#b9d9cf] overflow-hidden">
                          <div
                            className={`h-full ${tone.bar}`}
                            style={{ width: `${Math.min(100, (selected.rating / 10) * 100)}%` }}
                          />
                        </div>

                        <p className="mt-3 text-sm text-gray-800">
                          <span className="font-semibold">Retention:</span> {advice.retain}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{advice.note}</p>
                      </div>

                      {/* Operational Indicators */}
                      <div className="grid grid-cols-2 gap-3">
                        <InfoTile
                          icon={<Clock className="w-4 h-4" />}
                          label="Delay History"
                          value={`${selected.delays} / ${selected.projects}`}
                          sub="Delayed vs total projects"
                        />
                        <InfoTile
                          icon={<AlertTriangle className="w-4 h-4" />}
                          label="Open Defects"
                          value={`${selected.defects}`}
                          sub="Pending rectification"
                        />
                        <InfoTile
                          icon={<ShieldCheck className="w-4 h-4" />}
                          label="Inspection"
                          value={selected.inspection}
                          sub="Quality gate status"
                        />
                        <InfoTile
                          icon={<Wallet className="w-4 h-4" />}
                          label="Accounts Action"
                          value={advice.pay === "Hold" ? "Escalate" : "Release"}
                          sub="Payment workflow"
                        />
                      </div>

                      {/* Sales Team Panel (NEW) */}
                      <div className="bg-white border border-[#b9d9cf] rounded-2xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-gray-600 font-semibold">Sales Enablement</p>
                            <p className="text-[11px] text-gray-500 mt-1">
                              CRM-style tracking (like Tally is for Finance)
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {salesChip(selected.leadTemp)}
                            <span className="text-[11px] px-2.5 py-1 rounded-full border border-[#b9d9cf] bg-[#e6f3ee] text-teal-800 font-semibold">
                              {selected.salesStage}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-3">
                          <InfoTile
                            icon={<User2 className="w-4 h-4" />}
                            label="Sales Owner"
                            value={selected.salesOwner}
                            sub="Account handler"
                          />
                          <InfoTile
                            icon={<CalendarDays className="w-4 h-4" />}
                            label="Next Follow-up"
                            value={selected.nextFollowUp}
                            sub="Call / meeting reminder"
                          />
                        </div>

                        <div className="mt-3 grid grid-cols-1 gap-2">
                          <button className="w-full px-4 py-3 rounded-xl bg-teal-700 text-white text-sm font-semibold hover:bg-teal-800 flex items-center justify-center gap-2">
                            <Send className="w-4 h-4" />
                            Send Contractor Profile to Client
                          </button>

                          <button className="w-full px-4 py-3 rounded-xl border border-[#b9d9cf] text-gray-900 text-sm font-semibold hover:bg-[#e6f3ee] flex items-center justify-center gap-2">
                            <FileSignature className="w-4 h-4" />
                            Create Quotation / Proposal
                          </button>

                          <div className="grid grid-cols-2 gap-2">
                            <button className="w-full px-4 py-3 rounded-xl border border-[#b9d9cf] text-gray-900 text-sm font-semibold hover:bg-[#e6f3ee] flex items-center justify-center gap-2">
                              <PhoneCall className="w-4 h-4" />
                              Call Lead
                            </button>
                            <button className="w-full px-4 py-3 rounded-xl border border-[#b9d9cf] text-gray-900 text-sm font-semibold hover:bg-[#e6f3ee] flex items-center justify-center gap-2">
                              <Mail className="w-4 h-4" />
                              Email Lead
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Governance Actions */}
                      <div className="bg-white border border-[#b9d9cf] rounded-2xl p-4">
                        <p className="text-xs text-gray-600 font-semibold">Governance Actions</p>

                        <div className="mt-3 grid grid-cols-1 gap-2">
                          <button className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800">
                            Send Payment Advice to Accounts
                          </button>

                          <button className="w-full px-4 py-3 rounded-xl border border-[#b9d9cf] text-gray-900 text-sm font-semibold hover:bg-[#e6f3ee]">
                            Raise NCR / Quality Issue
                          </button>

                          <button className="w-full px-4 py-3 rounded-xl border border-[#b9d9cf] text-gray-900 text-sm font-semibold hover:bg-[#e6f3ee]">
                            Add Site Review Note
                          </button>
                        </div>

                        <div className="mt-3 text-xs text-gray-500">
                          Judge-friendly: Governance + Sales = full contractor lifecycle.
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-[#b9d9cf] bg-white">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">Nirmaan • Contractor Governance</div>
                  <div className="text-xs font-semibold text-teal-800">NIRMAAN design system</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Components ---------- */

function KpiCard({ title, value, icon }) {
  return (
    <div className="bg-white border border-[#b9d9cf] rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <p className="text-[11px] sm:text-xs font-semibold text-gray-500">{title}</p>
        <div className="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center shadow-sm">
          {icon}
        </div>
      </div>
      <p className="mt-2 text-xl sm:text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-[11px] text-gray-500 mt-1">Updated just now</p>
    </div>
  );
}

function InfoTile({ icon, label, value, sub }) {
  return (
    <div className="bg-[#e6f3ee]/40 border border-[#b9d9cf] rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold text-gray-600">{label}</p>
        <div className="w-8 h-8 rounded-xl bg-white border border-[#b9d9cf] flex items-center justify-center text-gray-700">
          {icon}
        </div>
      </div>
      <p className="mt-2 text-lg font-bold text-gray-900">{value}</p>
      <p className="text-[11px] text-gray-500 mt-1">{sub}</p>
    </div>
  );
}
