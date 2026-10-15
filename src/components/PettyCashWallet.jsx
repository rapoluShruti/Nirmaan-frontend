import React, { useState, useEffect } from 'react';

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

  const grandTotal = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  const dailyTotal = calculateDailyTotal();

  return (
    <div style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      background: '#f4f7f4',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #102b2a 0%, #0f766e 100%)',
        color: 'white',
        padding: '30px',
        borderRadius: '12px',
        marginBottom: '20px',
        boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)'
      }}>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '700' }}>
          Petty Cash Management
        </h1>
        <p style={{ margin: 0, opacity: 0.95, fontSize: '15px' }}>
          Track and manage expenses with GPS verification
        </p>
      </div>

      {/* Available Balance */}
      <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '10px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        textAlign: 'center'
      }}>
       
      </div>

      {/* GPS Status */}
      <div style={{
        background: gpsActive ? '#e8f5e9' : '#ffebee',
        padding: '14px 18px',
        borderRadius: '8px',
        marginBottom: '20px',
        fontSize: '14px',
        color: gpsActive ? '#2e7d32' : '#c62828',
        fontWeight: '600',
        border: `2px solid ${gpsActive ? '#4caf50' : '#f44336'}`,
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <span style={{ fontSize: '20px' }}>{gpsActive ? '✅' : '❌'}</span>
        {gpsActive 
          ? `GPS Location Active (±${currentLocation?.accuracy.toFixed(0)}m accuracy)` 
          : 'GPS Location Required - Please enable location services to add expenses'}
      </div>

      {/* Add Expense */}
      <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '10px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        opacity: gpsActive ? 1 : 0.6,
        pointerEvents: gpsActive ? 'auto' : 'none'
      }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: '600', color: '#333' }}>
          Add Expense
        </h2>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#555' }}>
            Description *
          </label>
          <input
            type="text"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
            placeholder="Enter expense description"
            disabled={!gpsActive}
            style={{
              width: '100%',
              padding: '10px 14px',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#0f766e'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#555' }}>
            Amount *
          </label>
          <input
            type="number"
            value={activityAmount}
            onChange={(e) => setActivityAmount(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0"
            disabled={!gpsActive}
            style={{
              width: '100%',
              padding: '10px 14px',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = '#0f766e'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#555' }}>
            Receipt / Payment Screenshot * (Required)
          </label>
          <div style={{
            border: '2px dashed #0f766e',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center',
            background: '#fff8f5'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '10px' }}>📸</div>
            <input
              type="file"
              onChange={(e) => setReceiptFile(e.target.files[0])}
              accept="image/*"
              disabled={!gpsActive}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            />
            <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#666' }}>
              Upload bill receipt or payment screenshot
            </p>
          </div>
        </div>

        <button
          onClick={addManualExpense}
          disabled={!gpsActive}
          style={{
            width: '100%',
            padding: '14px',
            background: gpsActive ? '#0f766e' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: gpsActive ? 'pointer' : 'not-allowed',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => gpsActive && (e.target.style.background = '#e85a28')}
          onMouseOut={(e) => gpsActive && (e.target.style.background = '#0f766e')}
        >
          {gpsActive ? 'Add Expense' : 'Enable GPS to Add Expense'}
        </button>
      </div>

      {/* Sync Data */}
      <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '10px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        opacity: gpsActive ? 1 : 0.6,
        pointerEvents: gpsActive ? 'auto' : 'none'
      }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: '600', color: '#333' }}>
          Sync External Data
        </h2>
        
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={syncMaterialRequests}
            disabled={!gpsActive}
            style={{
              flex: '1',
              minWidth: '200px',
              padding: '12px 20px',
              background: 'white',
              color: '#0f766e',
              border: '2px solid #0f766e',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: gpsActive ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => gpsActive && (e.target.style.background = '#0f766e', e.target.style.color = 'white')}
            onMouseOut={(e) => gpsActive && (e.target.style.background = 'white', e.target.style.color = '#0f766e')}
          >
            Sync Material Requests
          </button>

          <button
            onClick={syncTransportData}
            disabled={!gpsActive}
            style={{
              flex: '1',
              minWidth: '200px',
              padding: '12px 20px',
              background: 'white',
              color: '#0f766e',
              border: '2px solid #0f766e',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: gpsActive ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => gpsActive && (e.target.style.background = '#0f766e', e.target.style.color = 'white')}
            onMouseOut={(e) => gpsActive && (e.target.style.background = 'white', e.target.style.color = '#0f766e')}
          >
            Sync Transport Data
          </button>
        </div>

        {syncStatus && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            background: '#e8f5e9',
            color: '#2e7d32',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            border: '1px solid #c8e6c9'
          }}>
            {syncStatus}
          </div>
        )}
      </div>

      {/* Expenses Table */}
      <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600', color: '#333' }}>
            Expense History
          </h2>
          
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              fontSize: '13px',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = '#0f766e'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
          />
        </div>

        {dateFilter && (
          <div style={{
            padding: '12px 16px',
            background: '#fff3e0',
            borderRadius: '6px',
            marginBottom: '16px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#e65100'
          }}>
            Daily Total: ${dailyTotal.toFixed(2)}
          </div>
        )}

        <div style={{
          padding: '12px 16px',
          background: '#e3f2fd',
          borderRadius: '6px',
          marginBottom: '20px',
          fontSize: '15px',
          fontWeight: '700',
          color: '#1565c0'
        }}>
          Grand Total: ${grandTotal.toFixed(2)}
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#666' }}>Date & Time</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#666' }}>Description</th>
                <th style={{ padding: '12px', textAlign: 'right', fontSize: '13px', fontWeight: '600', color: '#666' }}>Amount</th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#666' }}>Location</th>
                <th style={{ padding: '12px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#666' }}>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#999', fontSize: '14px' }}>
                    No expenses recorded
                  </td>
                </tr>
              ) : (
                expenses.map(exp => (
                  <tr 
                    key={exp.id}
                    style={{ borderBottom: '1px solid #f0f0f0', transition: 'background 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#fafafa'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '16px 12px', fontSize: '13px', color: '#333' }}>
                      <div style={{ fontWeight: '500' }}>
                        {new Date(exp.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </div>
                      <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>
                        {new Date(exp.date).toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </td>
                    <td style={{ padding: '16px 12px', fontSize: '13px', color: '#333' }}>
                      <div style={{ fontWeight: '500' }}>{exp.activity}</div>
                      <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                        {exp.type === 'manual' ? '📝 Manual Entry' : 
                         exp.type === 'material_request' ? '📦 Material Request' : 
                         exp.type === 'transport' ? '🚗 Transport' : 'Receipt'}
                        {exp.source && ` • ${exp.source}`}
                      </div>
                    </td>
                    <td style={{ padding: '16px 12px', fontSize: '15px', fontWeight: '600', color: '#0f766e', textAlign: 'right' }}>
                      ${exp.amount}
                    </td>
                    <td style={{ padding: '16px 12px', fontSize: '12px', color: '#666' }}>
                      <div>{exp.location.lat.toFixed(4)}, {exp.location.lng.toFixed(4)}</div>
                      <div style={{ fontSize: '11px', color: '#999', marginTop: '2px' }}>
                        ±{exp.location.accuracy.toFixed(0)}m
                      </div>
                    </td>
                    <td style={{ padding: '16px 12px', textAlign: 'center' }}>
                      {exp.receiptImage ? (
                        <img
                          onClick={() => openModal(exp.receiptImage)}
                          src={exp.receiptImage}
                          alt="Receipt"
                          style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'cover',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            border: '1px solid #e0e0e0'
                          }}
                        />
                      ) : (
                        <div style={{ color: '#ccc', fontSize: '12px' }}>—</div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
        >
          <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }}>
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                fontSize: '20px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              ×
            </button>
            <img
              src={modalImage}
              alt="Receipt"
              style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '8px' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PettyCashWallet;