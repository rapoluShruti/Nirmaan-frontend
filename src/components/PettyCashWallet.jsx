import React, { useState, useEffect } from 'react';
import { Wallet, ReceiptText, MapPin, Plus, ArrowUpRight, ShieldCheck, RefreshCw, CalendarDays, Clock3, Paperclip, CheckCircle2, MapPinned, TrendingDown } from 'lucide-react';

const PettyCashWallet = () => {
  const [balance, setBalance] = useState(1500.00);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      activity: 'Office Stationery Purchase',
      amount: '45.50',
      date: new Date(2026, 0, 25, 9, 30),
      location: { lat: 19.0760, lng: 72.8777, accuracy: 25 },
      verified: true,
      type: 'manual',
      receiptImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="250"%3E%3Crect fill="%23f0f0f0" width="200" height="250"/%3E%3Ctext x="50%25" y="30" text-anchor="middle" font-size="16" font-weight="bold"%3ERECEIPT%3C/text%3E%3Ctext x="10" y="60" font-size="12"%3EOffice Supplies Co.%3C/text%3E%3Ctext x="10" y="80" font-size="11"%3E123 Main St, Mumbai%3C/text%3E%3Cline x1="10" y1="95" x2="190" y2="95" stroke="%23999" stroke-width="1"/%3E%3Ctext x="10" y="115" font-size="12"%3EStationery Items%3C/text%3E%3Ctext x="190" y="115" text-anchor="end" font-size="12"%3E$45.50%3C/text%3E%3Cline x1="10" y1="130" x2="190" y2="130" stroke="%23999" stroke-width="1"/%3E%3Ctext x="10" y="150" font-size="13" font-weight="bold"%3ETOTAL%3C/text%3E%3Ctext x="190" y="150" text-anchor="end" font-size="13" font-weight="bold"%3E$45.50%3C/text%3E%3Ctext x="10" y="180" font-size="10" fill="%23666"%3EDate: Jan 25, 2026%3C/text%3E%3Ctext x="10" y="200" font-size="10" fill="%23666"%3EThank you!%3C/text%3E%3C/svg%3E'
    },
    {
      id: 2,
      activity: 'Client Lunch Meeting',
      amount: '125.00',
      date: new Date(2026, 0, 25, 13, 15),
      location: { lat: 19.0820, lng: 72.8850, accuracy: 18 },
      verified: true,
      type: 'manual',
      receiptImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="250"%3E%3Crect fill="%23fff8f0" width="200" height="250"/%3E%3Ctext x="50%25" y="30" text-anchor="middle" font-size="16" font-weight="bold"%3ERESTAURANT%3C/text%3E%3Ctext x="10" y="60" font-size="12"%3EThe Fine Dine%3C/text%3E%3Ctext x="10" y="80" font-size="11"%3EMumbai Premium Location%3C/text%3E%3Cline x1="10" y1="95" x2="190" y2="95" stroke="%23999" stroke-width="1"/%3E%3Ctext x="10" y="115" font-size="12"%3ELunch for 3%3C/text%3E%3Ctext x="190" y="115" text-anchor="end" font-size="12"%3E$125.00%3C/text%3E%3Cline x1="10" y1="130" x2="190" y2="130" stroke="%23999" stroke-width="1"/%3E%3Ctext x="10" y="150" font-size="13" font-weight="bold"%3ETOTAL%3C/text%3E%3Ctext x="190" y="150" text-anchor="end" font-size="13" font-weight="bold"%3E$125.00%3C/text%3E%3Ctext x="10" y="180" font-size="10" fill="%23666"%3EDate: Jan 25, 2026%3C/text%3E%3C/svg%3E'
    },
    {
      id: 3,
      activity: 'Taxi to Site Visit',
      amount: '35.75',
      date: new Date(2026, 0, 24, 10, 45),
      location: { lat: 19.0680, lng: 72.8690, accuracy: 32 },
      verified: true,
      type: 'transport',
      receiptImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="250"%3E%3Crect fill="%23f0f8ff" width="200" height="250"/%3E%3Ctext x="50%25" y="30" text-anchor="middle" font-size="16" font-weight="bold"%3ETAXI RECEIPT%3C/text%3E%3Ctext x="10" y="60" font-size="12"%3ECab Service Mumbai%3C/text%3E%3Ctext x="10" y="80" font-size="11"%3ETrip ID: TX8829%3C/text%3E%3Cline x1="10" y1="95" x2="190" y2="95" stroke="%23999" stroke-width="1"/%3E%3Ctext x="10" y="115" font-size="11"%3EFrom: Office%3C/text%3E%3Ctext x="10" y="135" font-size="11"%3ETo: Site B%3C/text%3E%3Ctext x="10" y="155" font-size="12"%3EDistance: 12.5km%3C/text%3E%3Cline x1="10" y1="170" x2="190" y2="170" stroke="%23999" stroke-width="1"/%3E%3Ctext x="10" y="190" font-size="13" font-weight="bold"%3EFARE%3C/text%3E%3Ctext x="190" y="190" text-anchor="end" font-size="13" font-weight="bold"%3E$35.75%3C/text%3E%3Ctext x="10" y="215" font-size="10" fill="%23666"%3EDate: Jan 24, 2026%3C/text%3E%3C/svg%3E',
      source: 'Site B'
    },
    {
      id: 4,
      activity: 'Material Request: Cement Bags',
      amount: '180.00',
      date: new Date(2026, 0, 24, 14, 20),
      location: { lat: 19.0750, lng: 72.8800, accuracy: 22 },
      verified: true,
      type: 'material_request',
      receiptImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="250"%3E%3Crect fill="%23f5f5f5" width="200" height="250"/%3E%3Ctext x="50%25" y="30" text-anchor="middle" font-size="16" font-weight="bold"%3EINVOICE%3C/text%3E%3Ctext x="10" y="60" font-size="12"%3EConstruction Supplies%3C/text%3E%3Ctext x="10" y="80" font-size="11"%3EWarehouse C%3C/text%3E%3Cline x1="10" y1="95" x2="190" y2="95" stroke="%23999" stroke-width="1"/%3E%3Ctext x="10" y="115" font-size="12"%3ECement Bags (6)%3C/text%3E%3Ctext x="190" y="115" text-anchor="end" font-size="12"%3E$180.00%3C/text%3E%3Cline x1="10" y1="130" x2="190" y2="130" stroke="%23999" stroke-width="1"/%3E%3Ctext x="10" y="150" font-size="13" font-weight="bold"%3ETOTAL%3C/text%3E%3Ctext x="190" y="150" text-anchor="end" font-size="13" font-weight="bold"%3E$180.00%3C/text%3E%3Ctext x="10" y="180" font-size="10" fill="%23666"%3EOrder: MAT-1024%3C/text%3E%3Ctext x="10" y="200" font-size="10" fill="%23666"%3EDate: Jan 24, 2026%3C/text%3E%3C/svg%3E',
      source: 'Warehouse C'
    },
    {
      id: 5,
      activity: 'Printing & Photocopying',
      amount: '22.50',
      date: new Date(2026, 0, 23, 11, 0),
      location: { lat: 19.0790, lng: 72.8820, accuracy: 15 },
      verified: true,
      type: 'manual',
      receiptImage: null
    },
    {
      id: 6,
      activity: 'Transport: Delivery Van Fuel',
      amount: '95.00',
      date: new Date(2026, 0, 23, 16, 30),
      location: { lat: 19.0700, lng: 72.8750, accuracy: 28 },
      verified: true,
      type: 'transport',
      receiptImage: null,
      source: 'Gas Station'
    },
    {
      id: 7,
      activity: 'Emergency Tool Purchase',
      amount: '65.25',
      date: new Date(2026, 0, 22, 15, 10),
      location: { lat: 19.0810, lng: 72.8880, accuracy: 20 },
      verified: true,
      type: 'manual',
      receiptImage: null
    },
    {
      id: 8,
      activity: 'Material Request: Steel Rods',
      amount: '310.00',
      date: new Date(2026, 0, 22, 9, 45),
      location: { lat: 19.0765, lng: 72.8795, accuracy: 24 },
      verified: true,
      type: 'material_request',
      receiptImage: null,
      source: 'Warehouse A'
    }
  ]);
  const [gpsActive, setGpsActive] = useState(false);
  const [activityName, setActivityName] = useState('');
  const [activityAmount, setActivityAmount] = useState('');
  const [receiptFile, setReceiptFile] = useState(null);
  const [syncStatus, setSyncStatus] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const materialRequests = [
    { id: 1, description: "Construction Materials", amount: 250.50, date: new Date(2026, 0, 25), location: "Warehouse A" },
    { id: 2, description: "Office Supplies", amount: 75.25, date: new Date(2026, 0, 25), location: "Main Office" },
    { id: 3, description: "Paint & Brushes", amount: 145.00, date: new Date(2026, 0, 25), location: "Hardware Store" },
    { id: 4, description: "Electrical Wiring", amount: 210.75, date: new Date(2026, 0, 25), location: "Warehouse B" }
  ];

  const transportData = [
    { id: 1, description: "Delivery Truck Fuel", amount: 120.00, date: new Date(2026, 0, 25), location: "Gas Station" },
    { id: 2, description: "Taxi Fare", amount: 45.50, date: new Date(2026, 0, 25), location: "Downtown" },
    { id: 3, description: "Auto Rickshaw", amount: 28.00, date: new Date(2026, 0, 25), location: "Site A" },
    { id: 4, description: "Bike Courier Service", amount: 55.25, date: new Date(2026, 0, 25), location: "Client Office" }
  ];

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
          setGpsActive(true);
        },
        (error) => {
          setGpsActive(false);
          console.error('GPS Error:', error);
        }
      );
    } else {
      setGpsActive(false);
    }
  };

  const addManualExpense = () => {
    if (!gpsActive) {
      alert('⚠️ GPS location is required! Please enable location services and refresh the page.');
      return;
    }

    if (!activityName.trim()) {
      alert('Please enter an activity description');
      return;
    }

    if (!activityAmount || parseFloat(activityAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (!receiptFile) {
      alert('Please upload a receipt image or payment screenshot');
      return;
    }

    const expense = {
      id: Date.now() + Math.random(),
      activity: activityName,
      amount: parseFloat(activityAmount).toFixed(2),
      date: new Date(),
      location: currentLocation,
      verified: true,
      type: 'manual',
      receiptImage: null
    };

    const reader = new FileReader();
    reader.onload = function(e) {
      expense.receiptImage = e.target.result;
      setExpenses(prev => [expense, ...prev]);
      setBalance(prev => prev - parseFloat(expense.amount));
      clearForm();
    };
    reader.readAsDataURL(receiptFile);
  };

  const clearForm = () => {
    setActivityName('');
    setActivityAmount('');
    setReceiptFile(null);
  };

  const syncMaterialRequests = () => {
    if (!gpsActive) {
      alert('⚠️ GPS location is required! Please enable location services and refresh the page.');
      return;
    }

    const newExpenses = materialRequests.map(item => ({
      id: Date.now() + Math.random(),
      activity: `Material Request: ${item.description}`,
      amount: item.amount.toFixed(2),
      date: item.date,
      location: currentLocation,
      verified: true,
      type: 'material_request',
      receiptImage: null,
      source: item.location
    }));

    setExpenses(prev => [...newExpenses, ...prev]);
    setBalance(prev => prev - newExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0));
    setSyncStatus('Material requests synced successfully');
    setTimeout(() => setSyncStatus(''), 3000);
  };

  const syncTransportData = () => {
    if (!gpsActive) {
      alert('⚠️ GPS location is required! Please enable location services and refresh the page.');
      return;
    }

    const newExpenses = transportData.map(item => ({
      id: Date.now() + Math.random(),
      activity: `Transport: ${item.description}`,
      amount: item.amount.toFixed(2),
      date: item.date,
      location: currentLocation,
      verified: true,
      type: 'transport',
      receiptImage: null,
      source: item.location
    }));

    setExpenses(prev => [...newExpenses, ...prev]);
    setBalance(prev => prev - newExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0));
    setSyncStatus('Transport data synced successfully');
    setTimeout(() => setSyncStatus(''), 3000);
  };

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const calculateDailyTotal = () => {
    if (!dateFilter) return 0;

    const filteredExpenses = expenses.filter(exp => {
      const expDate = new Date(exp.date);
      const expDateStr = expDate.toISOString().split('T')[0];
      return expDateStr === dateFilter;
    });

    return filteredExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  };

  const filteredExpenses = dateFilter ? expenses.filter((exp) => new Date(exp.date).toISOString().split('T')[0] === dateFilter) : expenses;
  const grandTotal = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  const dailyTotal = calculateDailyTotal();

  return (
    <div className="petty-cash-page min-h-screen bg-[#f4f7f4] px-4 py-6 md:px-8 md:py-8 text-[#183a35]">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="relative overflow-hidden rounded-[28px] bg-[#102b2a] p-6 text-white shadow-xl md:p-9">
          <div className="absolute -right-10 -top-16 h-64 w-64 rounded-full border-[36px] border-white/5" />
          <div className="absolute right-24 top-20 h-24 w-24 rounded-full bg-teal-400/10 blur-2xl" />
          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-teal-100">
                <ShieldCheck size={14} /> VERIFIED SITE EXPENSES
              </div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Petty cash</h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300 md:text-base">A clear view of site spending, receipts and GPS-verified transactions.</p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${gpsActive ? "bg-emerald-400/15 text-emerald-300" : "bg-amber-400/15 text-amber-200"}`}><MapPinned size={20} /></span>
              <div>
                <p className="text-xs text-slate-300">Location verification</p>
                <p className="mt-0.5 text-sm font-semibold">{gpsActive ? "GPS connected" : "GPS required"}</p>
              </div>
              {!gpsActive && <button onClick={getLocation} className="ml-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-[#102b2a]">Retry</button>}
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-[#dce7e1] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between"><span className="text-sm font-medium text-[#6c8179]">Available balance</span><span className="rounded-xl bg-[#e6f3ee] p-2 text-teal-800"><Wallet size={19} /></span></div>
            <p className="mt-4 text-3xl font-bold tracking-tight tabular-nums">${balance.toFixed(2)}</p>
            <p className="mt-2 text-xs text-[#71847d]">Remaining petty cash</p>
          </div>
          <div className="rounded-2xl border border-[#dce7e1] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between"><span className="text-sm font-medium text-[#6c8179]">Recorded expenses</span><span className="rounded-xl bg-[#eef2f7] p-2 text-slate-700"><ReceiptText size={19} /></span></div>
            <p className="mt-4 text-3xl font-bold tracking-tight tabular-nums">{expenses.length}</p>
            <p className="mt-2 text-xs text-[#71847d]">Across all expense sources</p>
          </div>
          <div className="rounded-2xl border border-[#dce7e1] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between"><span className="text-sm font-medium text-[#6c8179]">Total recorded</span><span className="rounded-xl bg-[#fff4dd] p-2 text-[#80571a]"><TrendingDown size={19} /></span></div>
            <p className="mt-4 text-3xl font-bold tracking-tight tabular-nums">${grandTotal.toFixed(2)}</p>
            <p className="mt-2 text-xs text-[#71847d]">Lifetime expense log</p>
          </div>
          <div className="rounded-2xl border border-[#dce7e1] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between"><span className="text-sm font-medium text-[#6c8179]">GPS accuracy</span><span className="rounded-xl bg-[#e6f3ee] p-2 text-teal-800"><MapPin size={19} /></span></div>
            <p className="mt-4 text-3xl font-bold tracking-tight">{gpsActive && currentLocation ? `±${currentLocation.accuracy.toFixed(0)}m` : "—"}</p>
            <p className="mt-2 text-xs text-[#71847d]">{gpsActive ? "Current location confirmed" : "Enable location to submit"}</p>
          </div>
        </section>

        <section className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(340px,.9fr)]">
          <div className="rounded-2xl border border-[#dce7e1] bg-white p-5 shadow-sm md:p-7">
            <div className="mb-6 flex items-start gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f3ee] text-teal-800"><Plus size={22} /></span>
              <div><h2 className="text-xl font-bold">Record an expense</h2><p className="mt-1 text-sm text-[#71847d]">Receipt and current GPS location are required.</p></div>
            </div>
            <div className={`mb-5 flex items-start gap-3 rounded-xl border p-4 text-sm ${gpsActive ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-amber-200 bg-amber-50 text-amber-900"}`}>
              {gpsActive ? <CheckCircle2 size={18} className="mt-0.5 shrink-0" /> : <MapPin size={18} className="mt-0.5 shrink-0" />}
              <div><p className="font-semibold">{gpsActive ? "Location verified for this session" : "Location access is needed"}</p><p className="mt-1 text-xs leading-5">{gpsActive && currentLocation ? `Accuracy ±${currentLocation.accuracy.toFixed(0)} metres. Expense records will include this location.` : "Allow location access in your browser, then retry. Expense submission stays disabled until GPS is active."}</p></div>
              {!gpsActive && <button onClick={getLocation} className="shrink-0 rounded-lg border border-amber-300 bg-white px-3 py-2 text-xs font-bold">Retry</button>}
            </div>
            <div className="space-y-5">
              <label className="block"><span className="mb-2 block text-sm font-semibold text-[#36504b]">Expense description <span className="text-rose-600">*</span></span><input type="text" value={activityName} onChange={(e) => setActivityName(e.target.value)} placeholder="e.g. Site transport, safety equipment" disabled={!gpsActive} className="w-full rounded-xl border border-[#dce7e1] bg-[#fbfcfb] px-4 py-3 text-sm outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10 disabled:cursor-not-allowed disabled:opacity-50" /></label>
              <label className="block"><span className="mb-2 block text-sm font-semibold text-[#36504b]">Amount <span className="text-rose-600">*</span></span><div className="flex overflow-hidden rounded-xl border border-[#dce7e1] bg-[#fbfcfb] focus-within:border-teal-700 focus-within:ring-4 focus-within:ring-teal-700/10"><span className="flex items-center border-r border-[#dce7e1] bg-[#f1f5f2] px-4 text-sm font-semibold text-[#5f756e]">$</span><input type="number" value={activityAmount} onChange={(e) => setActivityAmount(e.target.value)} placeholder="0.00" step="0.01" min="0" disabled={!gpsActive} className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none disabled:opacity-50" /></div></label>
              <div><span className="mb-2 block text-sm font-semibold text-[#36504b]">Receipt or payment screenshot <span className="text-rose-600">*</span></span><label className="flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-[#b9d9cf] bg-[#f7fbf8] px-4 py-6 text-center transition hover:bg-[#eaf5ef]"><span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-teal-800 shadow-sm"><Paperclip size={20} /></span><span className="text-sm font-semibold text-[#244740]">{receiptFile?.name || "Choose a receipt image"}</span><span className="mt-1 text-xs text-[#71847d]">JPG, PNG or screenshot</span><input type="file" onChange={(e) => setReceiptFile(e.target.files?.[0] || null)} accept="image/*" disabled={!gpsActive} className="mt-3 block w-full max-w-xs text-xs text-[#5f756e] file:mr-3 file:rounded-lg file:border-0 file:bg-[#e6f3ee] file:px-3 file:py-2 file:text-xs file:font-bold file:text-teal-800 disabled:opacity-50" /></label></div>
              <button onClick={addManualExpense} disabled={!gpsActive} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0f766e] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#0b5d57] focus:outline-none focus:ring-4 focus:ring-teal-700/20 disabled:cursor-not-allowed disabled:bg-slate-300"><Plus size={17} /> {gpsActive ? "Add expense record" : "Enable GPS to continue"}</button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-[#dce7e1] bg-white p-5 shadow-sm md:p-6">
              <div className="mb-5 flex items-start gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f3ee] text-teal-800"><RefreshCw size={19} /></span><div><h2 className="text-lg font-bold">Import expense sources</h2><p className="mt-1 text-sm text-[#71847d]">Bring material and transport entries into the ledger.</p></div></div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                <button onClick={syncMaterialRequests} disabled={!gpsActive} className="flex items-center justify-between gap-3 rounded-xl border border-[#dce7e1] p-4 text-left transition hover:border-teal-300 hover:bg-[#f7fbf8] disabled:opacity-50"><span><span className="block text-sm font-bold">Material requests</span><span className="mt-1 block text-xs text-[#71847d]">{materialRequests.length} available entries</span></span><ArrowUpRight size={17} className="shrink-0 text-teal-800" /></button>
                <button onClick={syncTransportData} disabled={!gpsActive} className="flex items-center justify-between gap-3 rounded-xl border border-[#dce7e1] p-4 text-left transition hover:border-teal-300 hover:bg-[#f7fbf8] disabled:opacity-50"><span><span className="block text-sm font-bold">Transport records</span><span className="mt-1 block text-xs text-[#71847d]">{transportData.length} available entries</span></span><ArrowUpRight size={17} className="shrink-0 text-teal-800" /></button>
              </div>
              {syncStatus && <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-800"><CheckCircle2 size={17} />{syncStatus}</div>}
              <p className="mt-4 text-xs leading-5 text-[#71847d]">Imported entries use the current GPS location and are added to the expense history.</p>
            </div>
            <div className="rounded-2xl border border-[#dce7e1] bg-white p-5 shadow-sm md:p-6">
              <div className="mb-4 flex items-center justify-between gap-3"><div><h2 className="text-lg font-bold">Spending overview</h2><p className="mt-1 text-sm text-[#71847d]">Review totals for a selected day.</p></div><CalendarDays size={20} className="text-teal-800" /></div>
              <label className="block text-sm font-semibold text-[#36504b]">Filter by date<input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="mt-2 w-full rounded-xl border border-[#dce7e1] bg-[#fbfcfb] px-4 py-3 text-sm outline-none focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10" /></label>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                <div className="rounded-xl bg-[#f4f7f4] p-4"><p className="text-xs font-medium text-[#71847d]">{dateFilter ? "Selected day total" : "Select a date"}</p><p className="mt-2 text-xl font-bold tabular-nums">${dailyTotal.toFixed(2)}</p></div>
                <div className="rounded-xl bg-[#102b2a] p-4 text-white"><p className="text-xs text-slate-300">All expenses</p><p className="mt-2 text-xl font-bold tabular-nums">${grandTotal.toFixed(2)}</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-[#dce7e1] bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-[#e5ede8] p-5 md:flex-row md:items-center md:px-7 md:py-6">
            <div><h2 className="text-xl font-bold">Expense ledger</h2><p className="mt-1 text-sm text-[#71847d]">{filteredExpenses.length} transactions shown · Select a receipt to preview it</p></div>
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-[#e6f3ee] px-3 py-1.5 text-xs font-bold text-teal-800"><ShieldCheck size={14} /> GPS-verified records</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead><tr className="bg-[#f7faf8] text-[11px] uppercase tracking-wider text-[#71847d]"><th className="px-6 py-4 font-bold">Date & time</th><th className="px-6 py-4 font-bold">Expense</th><th className="px-6 py-4 text-right font-bold">Amount</th><th className="px-6 py-4 font-bold">Location</th><th className="px-6 py-4 text-center font-bold">Receipt</th></tr></thead>
              <tbody className="divide-y divide-[#edf2ee]">
                {filteredExpenses.length === 0 ? <tr><td colSpan="5" className="px-6 py-14 text-center"><ReceiptText size={28} className="mx-auto mb-3 text-[#9aaca4]" /><p className="font-semibold text-[#36504b]">No expenses found</p><p className="mt-1 text-sm text-[#71847d]">Try another date or add a new record.</p></td></tr> : filteredExpenses.map((exp) => (
                  <tr key={exp.id} className="transition hover:bg-[#fbfdfb]">
                    <td className="whitespace-nowrap px-6 py-4"><p className="text-sm font-semibold">{new Date(exp.date).toLocaleDateString("en-IN",{month:"short",day:"numeric",year:"numeric"})}</p><p className="mt-1 flex items-center gap-1.5 text-xs text-[#71847d]"><Clock3 size={12} />{new Date(exp.date).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}</p></td>
                    <td className="px-6 py-4"><p className="text-sm font-semibold text-[#203c38]">{exp.activity}</p><p className="mt-1 text-xs text-[#71847d]">{exp.type === "manual" ? "Manual entry" : exp.type === "material_request" ? "Material request" : exp.type === "transport" ? "Transport" : "Receipt"}{exp.source ? ` · ${exp.source}` : ""}</p></td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-bold tabular-nums text-[#0f766e]">${Number(exp.amount).toFixed(2)}</td>
                    <td className="px-6 py-4"><p className="flex items-center gap-1.5 text-xs font-medium text-[#36504b]"><MapPin size={13} />{exp.location ? `${Number(exp.location.lat).toFixed(4)}, ${Number(exp.location.lng).toFixed(4)}` : "Location unavailable"}</p><p className="mt-1 text-xs text-[#71847d]">{exp.location?.accuracy != null ? `±${Number(exp.location.accuracy).toFixed(0)}m accuracy` : "Unverified"}</p></td>
                    <td className="px-6 py-4 text-center">{exp.receiptImage ? <button onClick={() => openModal(exp.receiptImage)} className="inline-flex items-center gap-2 rounded-lg border border-[#dce7e1] bg-white p-1.5 pr-3 text-xs font-semibold text-teal-800 transition hover:border-teal-300 hover:bg-[#f7fbf8]"><img src={exp.receiptImage} alt="Receipt thumbnail" className="h-9 w-9 rounded-md object-cover" />View</button> : <span className="text-xs text-[#9aaca4]">No receipt</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col gap-2 border-t border-[#e5ede8] bg-[#fbfdfb] px-6 py-4 text-xs text-[#71847d] sm:flex-row sm:items-center sm:justify-between"><span>Amounts shown in the ledger's configured currency.</span><span className="font-semibold text-[#36504b]">{expenses.length} total records</span></div>
        </section>
      </div>

      {showModal && (
        <div onClick={closeModal} className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#102b2a]/80 p-5 backdrop-blur-sm">
          <div onClick={(e) => e.stopPropagation()} className="relative max-h-[90vh] max-w-[92vw] rounded-2xl bg-white p-3 shadow-2xl">
            <button onClick={closeModal} aria-label="Close receipt preview" className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#102b2a] text-xl font-bold text-white shadow-lg">×</button>
            <img src={modalImage} alt="Receipt preview" className="max-h-[82vh] max-w-full rounded-xl object-contain" />
          </div>
        </div>
      )}
    </div>
  );

};

export default PettyCashWallet;