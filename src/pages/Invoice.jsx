
import React, { useState } from 'react';
import { CheckCircle, XCircle, FileText, Download, Upload, Camera, X, History, Calendar, Database, RefreshCw, Printer } from 'lucide-react';

const MaterialManagementSystem = () => {
  const [view, setView] = useState('supervisor');
  const [tasks] = useState([
    { id: 'T001', name: 'Foundation Work - Block A', project: 'Residential Complex', location: 'Plot 45, Sector 12', approved: true, costCenter: 'SITE001-CIVIL-FOUNDATION' },
    { id: 'T002', name: 'Brick Masonry - 1st Floor', project: 'Commercial Building', location: 'Site B, Zone 3', approved: true, costCenter: 'SITE002-CIVIL-MASONRY' },
    { id: 'T003', name: 'Plastering Work - Block C', project: 'Residential Complex', location: 'Plot 45, Sector 12', approved: true, costCenter: 'SITE001-CIVIL-FINISHING' }
  ]);
  
  const [materials] = useState([
    { id: 'M001', name: 'Cement (50kg)', category: 'Building Material', gstRate: 28, hsnCode: '2523' },
    { id: 'M002', name: 'TMT Steel Bars (12mm)', category: 'Steel', gstRate: 18, hsnCode: '7214' },
    { id: 'M003', name: 'Red Bricks (Standard)', category: 'Building Material', gstRate: 12, hsnCode: '6904' },
    { id: 'M004', name: 'River Sand (Brass)', category: 'Aggregates', gstRate: 5, hsnCode: '2505' },
    { id: 'M005', name: 'M20 Ready Mix Concrete', category: 'Concrete', gstRate: 28, hsnCode: '3824' },
    { id: 'M006', name: 'Crushed Stone Aggregate (20mm)', category: 'Aggregates', gstRate: 5, hsnCode: '2517' },
    { id: 'M007', name: 'White Cement (25kg)', category: 'Building Material', gstRate: 28, hsnCode: '2523' },
    { id: 'M008', name: 'Plywood (18mm)', category: 'Wood Products', gstRate: 18, hsnCode: '4412' },
    { id: 'M009', name: 'Paint - Asian Paints (20L)', category: 'Finishing', gstRate: 28, hsnCode: '3208' },
    { id: 'M010', name: 'Ceramic Tiles (2x2 ft)', category: 'Finishing', gstRate: 28, hsnCode: '6907' }
  ]);

  const [vendors] = useState([
    { id: 'V001', name: 'Shree Cement Suppliers', gstin: '27AAAAA0000A1Z5', state: 'Maharashtra', category: 'material' },
    { id: 'V002', name: 'Reliable Labour Contractors', gstin: '27BBBBB0000B1Z5', state: 'Maharashtra', category: 'labour' },
    { id: 'V003', name: 'Heavy Equipment Rentals', gstin: '27CCCCC0000C1Z5', state: 'Maharashtra', category: 'equipment' },
    { id: 'V004', name: 'Swift Transport Services', gstin: '27DDDDD0000D1Z5', state: 'Maharashtra', category: 'transport' }
  ]);

  const [requests, setRequests] = useState([
    {
      id: 'REQ-1733097600000',
      token: 'MAT-123456789',
      taskId: 'T001',
      taskName: 'Foundation Work - Block A',
      project: 'Residential Complex',
      location: 'Plot 45, Sector 12',
      materialId: 'M001',
      materialName: 'Cement (50kg)',
      quantity: 100,
      gstRate: 28,
      hsnCode: '2523',
      requiredDate: '2026-12-05',
      status: 'approved',
      approvedQty: 100,
      createdAt: '2026-12-02T10:30:00.000Z',
      createdBy: 'Supervisor',
      tallySync: false
    },
    {
      id: 'REQ-1733097600001',
      token: 'MAT-234567890',
      taskId: 'T002',
      taskName: 'Brick Masonry - 1st Floor',
      project: 'Commercial Building',
      location: 'Site B, Zone 3',
      materialId: 'M003',
      materialName: 'Red Bricks (Standard)',
      quantity: 5000,
      gstRate: 12,
      hsnCode: '6904',
      requiredDate: '2026-12-06',
      status: 'approved',
      approvedQty: 4800,
      createdAt: '2026-12-02T11:15:00.000Z',
      createdBy: 'Supervisor',
      tallySync: false
    },
    {
      id: 'REQ-1733097600002',
      token: 'MAT-345678901',
      taskId: 'T001',
      taskName: 'Foundation Work - Block A',
      project: 'Residential Complex',
      location: 'Plot 45, Sector 12',
      materialId: 'M002',
      materialName: 'TMT Steel Bars (12mm)',
      quantity: 50,
      gstRate: 18,
      hsnCode: '7214',
      requiredDate: '2026-12-07',
      status: 'approved',
      approvedQty: 50,
      createdAt: '2026-12-02T09:00:00.000Z',
      createdBy: 'Supervisor',
      tallySync: false
    },
    {
      id: 'REQ-1733097600003',
      token: 'MAT-456789012',
      taskId: 'T002',
      taskName: 'Brick Masonry - 1st Floor',
      project: 'Commercial Building',
      location: 'Site B, Zone 3',
      materialId: 'M004',
      materialName: 'River Sand (Brass)',
      quantity: 200,
      gstRate: 5,
      hsnCode: '2505',
      requiredDate: '2026-12-08',
      status: 'approved',
      approvedQty: 200,
      createdAt: '2026-12-02T10:30:00.000Z',
      createdBy: 'Supervisor',
      tallySync: false
    },
    {
      id: 'REQ-1733097600004',
      token: 'MAT-567890123',
      taskId: 'T001',
      taskName: 'Foundation Work - Block A',
      project: 'Residential Complex',
      location: 'Plot 45, Sector 12',
      materialId: 'M005',
      materialName: 'M20 Ready Mix Concrete',
      quantity: 30,
      gstRate: 28,
      hsnCode: '3824',
      requiredDate: '2026-12-10',
      status: 'approved',
      approvedQty: 30,
      createdAt: '2026-12-02T16:00:00.000Z',
      createdBy: 'Supervisor',
      tallySync: false
    },
    {
      id: 'REQ-1733097600005',
      token: 'MAT-678901234',
      taskId: 'T003',
      taskName: 'Plastering Work - Block C',
      project: 'Residential Complex',
      location: 'Plot 45, Sector 12',
      materialId: 'M006',
      materialName: 'Crushed Stone Aggregate (20mm)',
      quantity: 150,
      gstRate: 5,
      hsnCode: '2517',
      requiredDate: '2026-12-11',
      status: 'approved',
      approvedQty: 150,
      createdAt: '2026-12-02T14:00:00.000Z',
      createdBy: 'Supervisor',
      tallySync: false
    },
    {
      id: 'REQ-1733097600006',
      token: 'MAT-789012345',
      taskId: 'T003',
      taskName: 'Plastering Work - Block C',
      project: 'Residential Complex',
      location: 'Plot 45, Sector 12',
      materialId: 'M007',
      materialName: 'White Cement (25kg)',
      quantity: 40,
      gstRate: 28,
      hsnCode: '2523',
      requiredDate: '2026-12-12',
      status: 'approved',
      approvedQty: 40,
      createdAt: '2026-12-02T15:00:00.000Z',
      createdBy: 'Supervisor',
      tallySync: false
    }
  ]);

  const [requestHistory] = useState({
    'T001': [
      { date: '2026-11-20', material: 'Cement (50kg)', quantity: 80, status: 'completed' },
      { date: '2026-11-22', material: 'River Sand (Brass)', quantity: 150, status: 'completed' },
      { date: '2026-11-25', material: 'TMT Steel Bars (12mm)', quantity: 40, status: 'completed' }
    ],
    'T002': [
      { date: '2026-11-21', material: 'Red Bricks (Standard)', quantity: 3000, status: 'completed' },
      { date: '2026-11-24', material: 'Cement (50kg)', quantity: 60, status: 'completed' }
    ],
    'T003': [
      { date: '2026-11-23', material: 'White Cement (25kg)', quantity: 30, status: 'completed' },
      { date: '2026-11-26', material: 'Paint - Asian Paints (20L)', quantity: 10, status: 'completed' }
    ]
  });
  
  const [tokens, setTokens] = useState([
    {
      id: 'REQ-1733097600000',
      token: 'MAT-123456789',
      taskId: 'T001',
      taskName: 'Foundation Work - Block A',
      project: 'Residential Complex',
      location: 'Plot 45, Sector 12',
      materialId: 'M001',
      materialName: 'Cement (50kg)',
      quantity: 100,
      gstRate: 28,
      hsnCode: '2523',
      requiredDate: '2026-12-05',
      status: 'approved',
      approvedQty: 100,
      approvedBy: 'Site Engineer',
      approvedAt: '2026-12-02T14:20:00.000Z',
      active: false,
      redeemed: true,
      redeemedQty: 100,
      redeemedAt: '2026-12-02T16:30:00.000Z',
      createdAt: '2026-12-02T10:30:00.000Z',
      createdBy: 'Supervisor',
      photos: ['photo1.jpg'],
      confirmed: true,
      tallyVoucherId: null
    },
    {
      id: 'REQ-1733097600001',
      token: 'MAT-234567890',
      taskId: 'T002',
      taskName: 'Brick Masonry - 1st Floor',
      project: 'Commercial Building',
      location: 'Site B, Zone 3',
      materialId: 'M003',
      materialName: 'Red Bricks (Standard)',
      quantity: 5000,
      gstRate: 12,
      hsnCode: '6904',
      requiredDate: '2026-12-06',
      status: 'approved',
      approvedQty: 4800,
      approvedBy: 'Site Engineer',
      approvedAt: '2026-12-02T15:45:00.000Z',
      active: false,
      redeemed: true,
      redeemedQty: 4800,
      redeemedAt: '2026-12-02T17:30:00.000Z',
      createdAt: '2026-12-02T11:15:00.000Z',
      createdBy: 'Supervisor',
      photos: ['photo2.jpg'],
      confirmed: true,
      tallyVoucherId: null
    },
    {
      id: 'REQ-1733097600002',
      token: 'MAT-345678901',
      taskId: 'T001',
      taskName: 'Foundation Work - Block A',
      project: 'Residential Complex',
      location: 'Plot 45, Sector 12',
      materialId: 'M002',
      materialName: 'TMT Steel Bars (12mm)',
      quantity: 50,
      gstRate: 18,
      hsnCode: '7214',
      requiredDate: '2026-12-07',
      status: 'approved',
      approvedQty: 50,
      approvedBy: 'Site Engineer',
      approvedAt: '2026-12-02T13:00:00.000Z',
      active: false,
      redeemed: true,
      redeemedQty: 50,
      redeemedAt: '2026-12-02T18:00:00.000Z',
      createdAt: '2026-12-02T09:00:00.000Z',
      createdBy: 'Supervisor',
      photos: ['photo3.jpg'],
      confirmed: true,
      tallyVoucherId: null
    },
    {
      id: 'REQ-1733097600003',
      token: 'MAT-456789012',
      taskId: 'T002',
      taskName: 'Brick Masonry - 1st Floor',
      project: 'Commercial Building',
      location: 'Site B, Zone 3',
      materialId: 'M004',
      materialName: 'River Sand (Brass)',
      quantity: 200,
      gstRate: 5,
      hsnCode: '2505',
      requiredDate: '2026-12-08',
      status: 'approved',
      approvedQty: 200,
      approvedBy: 'Site Engineer',
      approvedAt: '2026-12-02T14:30:00.000Z',
      active: false,
      redeemed: true,
      redeemedQty: 200,
      redeemedAt: '2026-12-02T18:30:00.000Z',
      createdAt: '2026-12-02T10:30:00.000Z',
      createdBy: 'Supervisor',
      photos: ['photo4.jpg'],
      confirmed: true,
      tallyVoucherId: null
    },
    {
      id: 'REQ-1733097600004',
      token: 'MAT-567890123',
      taskId: 'T001',
      taskName: 'Foundation Work - Block A',
      project: 'Residential Complex',
      location: 'Plot 45, Sector 12',
      materialId: 'M005',
      materialName: 'M20 Ready Mix Concrete',
      quantity: 30,
      gstRate: 28,
      hsnCode: '3824',
      requiredDate: '2026-12-10',
      status: 'approved',
      approvedQty: 30,
      approvedBy: 'Site Engineer',
      approvedAt: '2026-12-02T16:30:00.000Z',
      active: false,
      redeemed: true,
      redeemedQty: 30,
      redeemedAt: '2026-12-02T19:00:00.000Z',
      createdAt: '2026-12-02T16:00:00.000Z',
      createdBy: 'Supervisor',
      photos: ['photo5.jpg'],
      confirmed: true,
      tallyVoucherId: null
    },
    {
      id: 'REQ-1733097600005',
      token: 'MAT-678901234',
      taskId: 'T003',
      taskName: 'Plastering Work - Block C',
      project: 'Residential Complex',
      location: 'Plot 45, Sector 12',
      materialId: 'M006',
      materialName: 'Crushed Stone Aggregate (20mm)',
      quantity: 150,
      gstRate: 5,
      hsnCode: '2517',
      requiredDate: '2026-12-11',
      status: 'approved',
      approvedQty: 150,
      approvedBy: 'Site Engineer',
      approvedAt: '2026-12-02T14:45:00.000Z',
      active: false,
      redeemed: true,
      redeemedQty: 150,
      redeemedAt: '2026-12-02T19:30:00.000Z',
      createdAt: '2026-12-02T14:00:00.000Z',
      createdBy: 'Supervisor',
      photos: ['photo6.jpg'],
      confirmed: true,
      tallyVoucherId: null
    },
    {
      id: 'REQ-1733097600006',
      token: 'MAT-789012345',
      taskId: 'T003',
      taskName: 'Plastering Work - Block C',
      project: 'Residential Complex',
      location: 'Plot 45, Sector 12',
      materialId: 'M007',
      materialName: 'White Cement (25kg)',
      quantity: 40,
      gstRate: 28,
      hsnCode: '2523',
      requiredDate: '2026-12-12',
      status: 'approved',
      approvedQty: 40,
      approvedBy: 'Site Engineer',
      approvedAt: '2026-12-02T15:30:00.000Z',
      active: false,
      redeemed: true,
      redeemedQty: 40,
      redeemedAt: '2026-12-02T20:00:00.000Z',
      createdAt: '2026-12-02T15:00:00.000Z',
      createdBy: 'Supervisor',
      photos: ['photo7.jpg'],
      confirmed: true,
      tallyVoucherId: null
    }
  ]);
  
  const [confirmedData] = useState({
    material: [
      { token: 'MAT-123456789', materialName: 'Cement (50kg)', quantity: 100, rate: 450, gstRate: 28, hsnCode: '2523', date: '2026-12-02' },
      { token: 'MAT-234567890', materialName: 'Red Bricks (Standard)', quantity: 4800, rate: 8, gstRate: 12, hsnCode: '6904', date: '2026-12-02' },
      { token: 'MAT-345678901', materialName: 'TMT Steel Bars (12mm)', quantity: 50, rate: 5500, gstRate: 18, hsnCode: '7214', date: '2026-12-02' },
      { token: 'MAT-456789012', materialName: 'River Sand (Brass)', quantity: 200, rate: 450, gstRate: 5, hsnCode: '2505', date: '2026-12-02' },
      { token: 'MAT-567890123', materialName: 'M20 Ready Mix Concrete', quantity: 30, rate: 4500, gstRate: 28, hsnCode: '3824', date: '2026-12-02' },
      { token: 'MAT-678901234', materialName: 'Crushed Stone Aggregate (20mm)', quantity: 150, rate: 380, gstRate: 5, hsnCode: '2517', date: '2026-12-02' },
      { token: 'MAT-789012345', materialName: 'White Cement (25kg)', quantity: 40, rate: 650, gstRate: 28, hsnCode: '2523', date: '2026-12-02' }
    ],
    labour: [
      { token: 'LAB-001', workerName: 'Rajesh Kumar (Mason)', days: 5, rate: 800, gstRate: 18, date: '2026-12-02' },
      { token: 'LAB-002', workerName: 'Suresh Yadav (Helper)', days: 5, rate: 600, gstRate: 18, date: '2026-12-02' },
      { token: 'LAB-003', workerName: 'Ramesh Singh (Carpenter)', days: 4, rate: 850, gstRate: 18, date: '2026-12-02' },
      { token: 'LAB-004', workerName: 'Vijay Sharma (Electrician)', days: 3, rate: 900, gstRate: 18, date: '2026-12-02' },
      { token: 'LAB-005', workerName: 'Anil Verma (Plumber)', days: 3, rate: 850, gstRate: 18, date: '2026-12-02' },
      { token: 'LAB-006', workerName: 'Mohan Lal (Painter)', days: 6, rate: 750, gstRate: 18, date: '2026-12-02' }
    ],
    equipment: [
      { token: 'EQP-001', equipmentName: 'JCB Excavator', hours: 8, rate: 1500, gstRate: 18, date: '2026-12-02' },
      { token: 'EQP-002', equipmentName: 'Concrete Mixer (10/7)', hours: 6, rate: 800, gstRate: 18, date: '2026-12-02' },
      { token: 'EQP-003', equipmentName: 'Tower Crane', hours: 10, rate: 2500, gstRate: 18, date: '2026-12-02' },
      { token: 'EQP-004', equipmentName: 'Vibrator Machine', hours: 5, rate: 600, gstRate: 18, date: '2026-12-02' },
      { token: 'EQP-005', equipmentName: 'Welding Machine', hours: 4, rate: 500, gstRate: 18, date: '2026-12-02' }
    ],
    transport: [
      { token: 'TRN-001', description: 'Material Transport - Cement', trips: 3, rate: 2000, gstRate: 5, date: '2026-12-02' },
      { token: 'TRN-002', description: 'Material Transport - Bricks', trips: 5, rate: 1800, gstRate: 5, date: '2026-12-02' },
      { token: 'TRN-003', description: 'Material Transport - Steel', trips: 2, rate: 2200, gstRate: 5, date: '2026-12-02' },
      { token: 'TRN-004', description: 'Material Transport - Sand & Aggregate', trips: 4, rate: 1500, gstRate: 5, date: '2026-12-02' }
    ]
  });
  
  const [currentRequest, setCurrentRequest] = useState({
    taskId: '',
    materialId: '',
    quantity: '',
    requiredDate: ''
  });

  const [selectedToken, setSelectedToken] = useState(null);
  const [redemptionQty, setRedemptionQty] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedTaskHistory, setSelectedTaskHistory] = useState(null);

  const [invoices, setInvoices] = useState([]);
  const [tallyLogs, setTallyLogs] = useState([]);
  const [showTallyModal, setShowTallyModal] = useState(false);
  const [syncInProgress, setSyncInProgress] = useState(false);
  const [billingCategory, setBillingCategory] = useState('');
  const [billingDateType, setBillingDateType] = useState('');
  const [customBillingDate, setCustomBillingDate] = useState('');

  // PDF Download Function using html2pdf
  const downloadInvoiceAsPDF = () => {
    const element = document.getElementById('invoice-content');
    
    // Options for PDF generation
    const opt = {
      margin: 10,
      filename: `Invoice_${invoices[invoices.length - 1]?.invoiceNo || 'document'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Check if html2pdf is available
    if (typeof window.html2pdf !== 'undefined') {
      window.html2pdf().set(opt).from(element).save();
    } else {
      // Fallback: Use browser print
      alert('PDF library not loaded. Using browser print instead.');
      window.print();
    }
  };

  // All your existing functions
  const generateTallyXML = (invoice) => {
    const task = tasks.find(t => t.id === invoice.items[0]?.taskId);
    const costCenter = task?.costCenter || 'GENERAL';
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<ENVELOPE>
  <HEADER>
    <TALLYREQUEST>Import Data</TALLYREQUEST>
  </HEADER>
  <BODY>
    <IMPORTDATA>
      <REQUESTDESC>
        <REPORTNAME>Vouchers</REPORTNAME>
        <STATICVARIABLES>
          <SVCURRENTCOMPANY>Construction Company Ltd</SVCURRENTCOMPANY>
        </STATICVARIABLES>
      </REQUESTDESC>
      <REQUESTDATA>
        <TALLYMESSAGE xmlns:UDF="TallyUDF">
          <VOUCHER REMOTEID="${invoice.id}" VCHTYPE="Purchase" ACTION="Create">
            <DATE>${invoice.date.split('-').reverse().join('')}</DATE>
            <VOUCHERTYPENAME>Purchase</VOUCHERTYPENAME>
            <VOUCHERNUMBER>${invoice.invoiceNo}</VOUCHERNUMBER>
            <PARTYLEDGERNAME>${invoice.vendor.name}</PARTYLEDGERNAME>
            <PARTYGSTIN>${invoice.vendor.gstin}</PARTYGSTIN>
            <COSTCENTRENAME>${costCenter}</COSTCENTRENAME>
            ${invoice.items.map(item => `
            <ALLLEDGERENTRIES.LIST>
              <LEDGERNAME>${item.description}</LEDGERNAME>
              <ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>
              <AMOUNT>-${item.taxableAmount.toFixed(2)}</AMOUNT>
              <CATEGORYALLOCATIONS.LIST>
                <CATEGORY>Primary Cost Category</CATEGORY>
                <COSTCENTRENAME>${costCenter}</COSTCENTRENAME>
              </CATEGORYALLOCATIONS.LIST>
            </ALLLEDGERENTRIES.LIST>
            <ALLLEDGERENTRIES.LIST>
              <LEDGERNAME>CGST @ ${item.gstRate/2}%</LEDGERNAME>
              <ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>
              <AMOUNT>-${item.cgst.toFixed(2)}</AMOUNT>
            </ALLLEDGERENTRIES.LIST>
            <ALLLEDGERENTRIES.LIST>
              <LEDGERNAME>SGST @ ${item.gstRate/2}%</LEDGERNAME>
              <ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>
              <AMOUNT>-${item.sgst.toFixed(2)}</AMOUNT>
            </ALLLEDGERENTRIES.LIST>
            `).join('')}
            <ALLLEDGERENTRIES.LIST>
              <LEDGERNAME>${invoice.vendor.name}</LEDGERNAME>
              <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
              <AMOUNT>${invoice.grandTotal.toFixed(2)}</AMOUNT>
            </ALLLEDGERENTRIES.LIST>
          </VOUCHER>
        </TALLYMESSAGE>
      </REQUESTDATA>
    </IMPORTDATA>
  </BODY>
</ENVELOPE>`;
  };

  const simulateTallySync = async (invoice) => {
    setSyncInProgress(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const xml = generateTallyXML(invoice);
    const voucherId = `TALLY-VCHR-${Date.now()}`;
    
    const logEntry = {
      timestamp: new Date().toISOString(),
      invoiceNo: invoice.invoiceNo,
      voucherId: voucherId,
      status: 'success',
      category: invoice.category,
      amount: invoice.grandTotal,
      xml: xml,
      response: {
        status: 'SUCCESS',
        message: 'Voucher created successfully in Tally',
        voucherId: voucherId,
        companyName: 'Construction Company Ltd'
      }
    };
    
    setTallyLogs([logEntry, ...tallyLogs]);
    setInvoices(invoices.map(inv => 
      inv.id === invoice.id 
        ? { ...inv, tallyVoucherId: voucherId, tallySynced: true, tallySyncedAt: new Date().toISOString() }
        : inv
    ));
    
    setSyncInProgress(false);
    alert(`✓ Synced to Tally!\nVoucher ID: ${voucherId}`);
    return voucherId;
  };

  const generateToken = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `MAT-${timestamp.toString().slice(-6)}${random}`;
  };

  const generateBarcode = (tokenId) => {
    const chars = tokenId.split('');
    return (
      <svg width="300" height="80" className="mx-auto">
        {chars.map((char, i) => {
          const isDigit = !isNaN(char);
          const width = isDigit ? 8 : 4;
          return (
            <rect key={i} x={i * 10} y="0" width={width} height="60" fill={i % 2 === 0 ? '#000' : '#333'} />
          );
        })}
        <text x="150" y="75" textAnchor="middle" fontSize="10" fill="#000">{tokenId}</text>
      </svg>
    );
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    const photoUrls = files.map(file => URL.createObjectURL(file));
    setUploadedPhotos([...uploadedPhotos, ...photoUrls]);
  };

  const removePhoto = (index) => {
    setUploadedPhotos(uploadedPhotos.filter((_, i) => i !== index));
  };

  const createRequest = () => {
    if (!currentRequest.taskId || !currentRequest.materialId || !currentRequest.quantity) {
      alert('Please fill all required fields');
      return;
    }

    const task = tasks.find(t => t.id === currentRequest.taskId);
    const material = materials.find(m => m.id === currentRequest.materialId);
    const token = generateToken();
    
    const newRequest = {
      id: `REQ-${Date.now()}`,
      token,
      taskId: currentRequest.taskId,
      taskName: task.name,
      project: task.project,
      location: task.location,
      materialId: currentRequest.materialId,
      materialName: material.name,
      quantity: parseInt(currentRequest.quantity),
      gstRate: material.gstRate,
      hsnCode: material.hsnCode,
      requiredDate: currentRequest.requiredDate,
      status: 'pending',
      createdAt: new Date().toISOString(),
      createdBy: 'Supervisor',
      tallySync: false
    };

    setRequests([...requests, newRequest]);
    setCurrentRequest({ taskId: '', materialId: '', quantity: '', requiredDate: '' });
    alert(`Material request created with token: ${token}`);
  };

  const handleApproval = (requestId, action, modifiedQty) => {
    setRequests(requests.map(req => {
      if (req.id === requestId) {
        if (action === 'approve') {
          const activeToken = {
            ...req,
            status: 'approved',
            approvedQty: modifiedQty || req.quantity,
            approvedBy: 'Site Engineer',
            approvedAt: new Date().toISOString(),
            active: true,
            redeemed: false,
            confirmed: false,
            tallyVoucherId: null
          };
          setTokens([...tokens, activeToken]);
          return { ...req, status: 'approved', approvedQty: modifiedQty || req.quantity };
        } else if (action === 'reject') {
          return { ...req, status: 'rejected', rejectedBy: 'Site Engineer' };
        }
      }
      return req;
    }));
  };

  const redeemToken = (tokenId) => {
    if (!redemptionQty || parseInt(redemptionQty) <= 0) {
      alert('Please enter valid quantity');
      return;
    }
    if (uploadedPhotos.length === 0) {
      alert('Please upload at least one photo of received material');
      return;
    }

    const token = tokens.find(t => t.token === tokenId);
    if (parseInt(redemptionQty) > token.approvedQty) {
      alert('Redemption quantity cannot exceed approved quantity');
      return;
    }

    setTokens(tokens.map(t => {
      if (t.token === tokenId) {
        return {
          ...t,
          redeemed: true,
          redeemedQty: parseInt(redemptionQty),
          redeemedAt: new Date().toISOString(),
          active: false,
          photos: uploadedPhotos,
          confirmed: false
        };
      }
      return t;
    }));

    setSelectedToken(null);
    setRedemptionQty('');
    setUploadedPhotos([]);
    alert('Token redeemed successfully with photo verification!');
  };

  const confirmRedemption = () => {
    const redeemedTokens = tokens.filter(t => t.redeemed && !t.confirmed);
    if (redeemedTokens.length === 0) {
      alert('No redeemed tokens available for confirmation');
      return;
    }

    setTokens(tokens.map(t => {
      if (t.redeemed && !t.confirmed) {
        return { ...t, confirmed: true };
      }
      return t;
    }));

    alert('Redemptions confirmed! Ready for billing.');
    setView('billing');
  };

  const showHistory = (taskId) => {
    setSelectedTaskHistory(requestHistory[taskId] || []);
    setShowHistoryModal(true);
  };

  const generateInvoiceForCategory = () => {
    if (!billingCategory) {
      alert('Please select a billing category');
      return;
    }
    if (!billingDateType) {
      alert('Please select date type (Today or Custom)');
      return;
    }
    if (billingDateType === 'custom' && !customBillingDate) {
      alert('Please select a custom date');
      return;
    }

    const invoiceDate = billingDateType === 'today' ? '2026-12-02' : customBillingDate;
    let invoiceItems = [];
    let vendorInfo = vendors.find(v => v.category === billingCategory) || vendors[0];

    if (billingCategory === 'material') {
      const materialData = confirmedData.material.filter(m => m.date === invoiceDate);
      invoiceItems = materialData.map(item => {
        const itemTotal = item.quantity * item.rate;
        const gstAmount = (itemTotal * item.gstRate) / 100;
        return {
          description: item.materialName,
          token: item.token,
          quantity: item.quantity,
          unit: 'units',
          rate: item.rate,
          hsnCode: item.hsnCode,
          taxableAmount: itemTotal,
          gstRate: item.gstRate,
          cgst: gstAmount / 2,
          sgst: gstAmount / 2,
          totalAmount: itemTotal + gstAmount
        };
      });
    } else if (billingCategory === 'labour') {
      const labourData = confirmedData.labour.filter(l => l.date === invoiceDate);
      invoiceItems = labourData.map(item => {
        const itemTotal = item.days * item.rate;
        const gstAmount = (itemTotal * item.gstRate) / 100;
        return {
          description: item.workerName,
          token: item.token,
          quantity: item.days,
          unit: 'days',
          rate: item.rate,
          hsnCode: '9954',
          taxableAmount: itemTotal,
          gstRate: item.gstRate,
          cgst: gstAmount / 2,
          sgst: gstAmount / 2,
          totalAmount: itemTotal + gstAmount
        };
      });
    } else if (billingCategory === 'equipment') {
      const equipmentData = confirmedData.equipment.filter(e => e.date === invoiceDate);
      invoiceItems = equipmentData.map(item => {
        const itemTotal = item.hours * item.rate;
        const gstAmount = (itemTotal * item.gstRate) / 100;
        return {
          description: item.equipmentName,
          token: item.token,
          quantity: item.hours,
          unit: 'hours',
          rate: item.rate,
          hsnCode: '9973',
          taxableAmount: itemTotal,
          gstRate: item.gstRate,
          cgst: gstAmount / 2,
          sgst: gstAmount / 2,
          totalAmount: itemTotal + gstAmount
        };
      });
    } else if (billingCategory === 'transport') {
      const transportData = confirmedData.transport.filter(t => t.date === invoiceDate);
      invoiceItems = transportData.map(item => {
        const itemTotal = item.trips * item.rate;
        const gstAmount = (itemTotal * item.gstRate) / 100;
        return {
          description: item.description,
          token: item.token,
          quantity: item.trips,
          unit: 'trips',
          rate: item.rate,
          hsnCode: '9965',
          taxableAmount: itemTotal,
          gstRate: item.gstRate,
          cgst: gstAmount / 2,
          sgst: gstAmount / 2,
          totalAmount: itemTotal + gstAmount
        };
      });
    }

    if (invoiceItems.length === 0) {
      alert('No data available for selected date');
      return;
    }

    const subtotal = invoiceItems.reduce((sum, item) => sum + item.taxableAmount, 0);
    const totalGST = invoiceItems.reduce((sum, item) => sum + item.cgst + item.sgst, 0);
    const grandTotal = invoiceItems.reduce((sum, item) => sum + item.totalAmount, 0);

    const invoice = {
      id: `INV-${Date.now()}`,
      invoiceNo: `2026-25/${invoices.length + 1}`,
      date: invoiceDate,
      category: billingCategory,
      vendor: vendorInfo,
      items: invoiceItems,
      subtotal: subtotal,
      totalGST: totalGST,
      grandTotal: grandTotal,
      tallySynced: false,
      tallyVoucherId: null
    };

    setInvoices([...invoices, invoice]);
    setBillingCategory('');
    setBillingDateType('');
    setCustomBillingDate('');
    setView('invoice');
  };

  const renderSupervisorView = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Total Active</span>
            <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
          </div>
          <div className="text-4xl font-bold text-gray-900 font-mono">{String(requests.length).padStart(2, '0')}</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-blue-600 uppercase tracking-wider font-medium">Approved</span>
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
          <div className="text-4xl font-bold text-blue-600 font-mono">
            {String(requests.filter(r => r.status === 'approved').length).padStart(2, '0')}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-red-600 uppercase tracking-wider font-medium">Pending</span>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
          <div className="text-4xl font-bold text-red-600 font-mono">
            {String(requests.filter(r => r.status === 'pending').length).padStart(2, '0')}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-green-600 uppercase tracking-wider font-medium">Today</span>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-4xl font-bold text-green-600 font-mono">
            {String(requests.filter(r => r.createdAt.startsWith('2026-12-02')).length).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">Search</label>
          <input
            type="text"
            placeholder="Task / location / ID"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">Status</label>
          <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
            <option>All</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">Date</label>
          <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent">
            <option>All</option>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="text-sm text-gray-600 hover:text-gray-900 font-medium uppercase tracking-wider">
          Reset
        </button>
      </div>

      {/* Material Request Form */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Material Request</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Select Approved Task</label>
            <select 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={currentRequest.taskId}
              onChange={(e) => setCurrentRequest({...currentRequest, taskId: e.target.value})}
            >
              <option value="">-- Select Task --</option>
              {tasks.filter(t => t.approved).map(task => (
                <option key={task.id} value={task.id}>{task.name} ({task.project})</option>
              ))}
            </select>
          </div>

          {currentRequest.taskId && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs text-gray-600 uppercase tracking-wider">Project</span>
                  <p className="font-medium text-gray-900 mt-1">{tasks.find(t => t.id === currentRequest.taskId).project}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-600 uppercase tracking-wider">Location</span>
                  <p className="font-medium text-gray-900 mt-1">{tasks.find(t => t.id === currentRequest.taskId).location}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-xs text-gray-600 uppercase tracking-wider">Cost Center</span>
                  <p className="font-medium text-gray-900 mt-1">{tasks.find(t => t.id === currentRequest.taskId).costCenter}</p>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-700 mb-2">Select Material</label>
            <select 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={currentRequest.materialId}
              onChange={(e) => setCurrentRequest({...currentRequest, materialId: e.target.value})}
            >
              <option value="">-- Select Material --</option>
              {materials.map(mat => (
                <option key={mat.id} value={mat.id}>{mat.name} (GST: {mat.gstRate}% | HSN: {mat.hsnCode})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Quantity</label>
            <input 
              type="number" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={currentRequest.quantity}
              onChange={(e) => setCurrentRequest({...currentRequest, quantity: e.target.value})}
              placeholder="Enter quantity"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Required Date</label>
            <input 
              type="date" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={currentRequest.requiredDate}
              onChange={(e) => setCurrentRequest({...currentRequest, requiredDate: e.target.value})}
            />
          </div>

          <button 
            onClick={createRequest}
            className="w-full bg-orange-600 text-white py-3.5 rounded-lg font-medium hover:bg-orange-700 transition-colors"
          >
            Create Material Request
          </button>
        </div>
      </div>

      {/* My Requests Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">My Requests</h3>
        </div>
        
        {requests.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <FileText size={48} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">No requests created yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Token</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {requests.map((req, idx) => (
                  <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900">{String(idx + 1).padStart(2, '0')}</td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-medium text-gray-900">{req.token}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{req.materialName}</div>
                      <div className="text-xs text-gray-500">{req.quantity} units</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full uppercase ${
                        req.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        req.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{req.taskName}</div>
                      <div className="text-xs text-gray-500 uppercase">{req.location}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const renderApprovalView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900">Pending Approvals</h2>
        <p className="text-sm text-gray-600 mt-1">Review and approve material requests</p>
      </div>
      
      {requests.filter(r => r.status === 'pending').length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <CheckCircle size={64} className="mx-auto mb-4 text-green-500 opacity-30" />
          <p className="text-gray-500 font-medium">No pending requests</p>
          <p className="text-sm text-gray-400 mt-1">All material requests have been processed</p>
        </div>
      ) : (
        requests.filter(r => r.status === 'pending').map(req => (
          <div key={req.id} className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{req.token}</h3>
                  <p className="text-sm text-gray-600 mt-1">Created: {new Date(req.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => showHistory(req.taskId)}
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors flex items-center gap-1.5 uppercase"
                  >
                    <History size={14} /> History
                  </button>
                  <span className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-lg text-xs font-bold uppercase">PENDING</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 uppercase mb-1">Material</p>
                  <p className="font-medium text-gray-900">{req.materialName}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 uppercase mb-1">Quantity</p>
                  <p className="font-medium text-gray-900">{req.quantity} units</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 uppercase mb-1">GST Rate</p>
                  <p className="font-medium text-gray-900">{req.gstRate}%</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 uppercase mb-1">Task</p>
                  <p className="font-medium text-gray-900 text-sm">{req.taskName}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 uppercase mb-1">Location</p>
                  <p className="font-medium text-gray-900 text-sm">{req.location}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 uppercase mb-1">HSN Code</p>
                  <p className="font-medium text-gray-900">{req.hsnCode}</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50">
              <div className="grid grid-cols-3 gap-3">
                <button 
                  onClick={() => handleApproval(req.id, 'approve', null)}
                  className="bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2 uppercase text-sm"
                >
                  <CheckCircle size={18} /> Approve
                </button>
                <button 
                  onClick={() => {
                    const newQty = prompt('Enter modified quantity:', req.quantity);
                    if (newQty) handleApproval(req.id, 'approve', parseInt(newQty));
                  }}
                  className="bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors uppercase text-sm"
                >
                  Modify & Approve
                </button>
                <button 
                  onClick={() => handleApproval(req.id, 'reject', null)}
                  className="bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2 uppercase text-sm"
                >
                  <XCircle size={18} /> Reject
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {showHistoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-xl">
              <div>
                <h3 className="text-xl font-bold text-gray-900 uppercase">Request History</h3>
                <p className="text-sm text-gray-600 mt-1">Previous material requests for this task</p>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              {selectedTaskHistory && selectedTaskHistory.length > 0 ? (
                <div className="space-y-3">
                  {selectedTaskHistory.map((item, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-600 uppercase mb-1">Date</p>
                          <p className="font-medium text-gray-900">{item.date}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 uppercase mb-1">Status</p>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium uppercase">
                            {item.status}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 uppercase mb-1">Material</p>
                          <p className="font-medium text-gray-900 text-sm">{item.material}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 uppercase mb-1">Quantity</p>
                          <p className="font-medium text-gray-900">{item.quantity} units</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <History size={64} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500 font-medium">No previous requests found</p>
                  <p className="text-sm text-gray-400 mt-1">This is the first request for this task</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderTokensView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900">Active Tokens</h2>
        <p className="text-sm text-gray-600 mt-1">Approved material tokens ready for redemption</p>
      </div>
      
      {tokens.filter(t => t.active && !t.redeemed).length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <FileText size={64} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500 font-medium">No active tokens available</p>
          <p className="text-sm text-gray-400 mt-1">Approved material requests will appear here</p>
        </div>
      ) : (
        tokens.filter(t => t.active && !t.redeemed).map(token => (
          <div key={token.token} className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-green-600">{token.token}</h3>
                  <p className="text-sm text-gray-600 mt-1">Approved: {new Date(token.approvedAt).toLocaleString()}</p>
                </div>
                <span className="px-3 py-1.5 bg-green-100 text-green-800 rounded-lg text-xs font-bold uppercase">ACTIVE</span>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-xs text-gray-600 text-center mb-3 font-bold uppercase tracking-wide">Material Token Barcode</p>
                {generateBarcode(token.token)}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 uppercase mb-1">Material</p>
                  <p className="font-medium text-gray-900">{token.materialName}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 uppercase mb-1">Approved Quantity</p>
                  <p className="font-medium text-gray-900">{token.approvedQty} units</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 uppercase mb-1">Task</p>
                  <p className="font-medium text-gray-900 text-sm">{token.taskName}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 uppercase mb-1">Location</p>
                  <p className="font-medium text-gray-900 text-sm">{token.location}</p>
                </div>
              </div>
            </div>

            {selectedToken === token.token ? (
              <div className="p-6 bg-gray-50 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">Received Quantity</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter received quantity"
                    value={redemptionQty}
                    onChange={(e) => setRedemptionQty(e.target.value)}
                    max={token.approvedQty}
                  />
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-white">
                  <label className="block text-sm font-medium text-gray-700 mb-3 uppercase tracking-wide flex items-center gap-2">
                    <Camera size={18} className="text-orange-600" />
                    Upload Material Photos (Required)
                  </label>
                  
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id={`photo-upload-${token.token}`}
                  />
                  
                  <label
                    htmlFor={`photo-upload-${token.token}`}
                    className="cursor-pointer bg-blue-50 hover:bg-blue-100 border-2 border-blue-300 rounded-lg p-6 block text-center transition-colors"
                  >
                    <Upload className="mx-auto mb-2 text-blue-600" size={32} />
                    <p className="text-sm text-blue-600 font-medium">Click to upload photos</p>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG accepted • Multiple files allowed</p>
                  </label>

                  {uploadedPhotos.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {uploadedPhotos.map((photo, idx) => (
                        <div key={idx} className="relative group">
                          <img src={photo} alt={`Upload ${idx + 1}`} className="w-full h-24 object-cover rounded-lg border-2 border-gray-200" />
                          <button
                            onClick={() => removePhoto(idx)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {uploadedPhotos.length > 0 && (
                    <p className="text-xs text-green-600 mt-3 font-medium flex items-center gap-1.5">
                      <CheckCircle size={14} />
                      {uploadedPhotos.length} photo(s) uploaded successfully
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => redeemToken(token.token)}
                    disabled={uploadedPhotos.length === 0}
                    className="bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors uppercase text-sm"
                  >
                    Confirm Redemption
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedToken(null);
                      setRedemptionQty('');
                      setUploadedPhotos([]);
                    }}
                    className="bg-gray-400 text-white py-3 rounded-lg font-medium hover:bg-gray-500 transition-colors uppercase text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-gray-50">
                <button 
                  onClick={() => setSelectedToken(token.token)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 uppercase text-sm"
                >
                  <CheckCircle size={18} /> Redeem Token
                </button>
              </div>
            )}
          </div>
        ))
      )}

      {tokens.filter(t => t.redeemed && !t.confirmed).length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 uppercase">Redeemed Tokens (Pending Confirmation)</h3>
            <p className="text-sm text-gray-600 mt-1">Review and confirm redeemed materials</p>
          </div>
          <div className="p-6 space-y-3">
            {tokens.filter(t => t.redeemed && !t.confirmed).map(token => (
              <div key={token.token} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 mb-1">{token.token}</p>
                    <p className="text-sm text-gray-700 mb-2">{token.materialName} - {token.redeemedQty} units</p>
                    <p className="text-xs text-green-600 font-medium flex items-center gap-1.5">
                      <CheckCircle size={12} />
                      Photo verified ({token.photos?.length || 0} photos)
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(token.redeemedAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <button 
              onClick={confirmRedemption}
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 uppercase text-sm"
            >
              <CheckCircle size={18} /> Confirm Redemptions
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderBillingView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900">Billing Center</h2>
        <p className="text-sm text-gray-600 mt-1">Generate invoices for different expense categories</p>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 uppercase mb-4">Select Billing Category</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <button
            onClick={() => setBillingCategory('material')}
            className={`p-6 rounded-lg border-2 transition-all ${
              billingCategory === 'material'
                ? 'border-orange-600 bg-orange-50'
                : 'border-gray-300 hover:border-orange-400 hover:bg-gray-50'
            }`}
          >
            <FileText className="mx-auto mb-3 text-orange-600" size={32} />
            <p className="font-bold text-gray-900 uppercase text-sm">Material</p>
            <p className="text-xs text-gray-500 mt-1">Construction materials</p>
          </button>

          <button
            onClick={() => setBillingCategory('labour')}
            className={`p-6 rounded-lg border-2 transition-all ${
              billingCategory === 'labour'
                ? 'border-orange-600 bg-orange-50'
                : 'border-gray-300 hover:border-orange-400 hover:bg-gray-50'
            }`}
          >
            <FileText className="mx-auto mb-3 text-orange-600" size={32} />
            <p className="font-bold text-gray-900 uppercase text-sm">Labour</p>
            <p className="text-xs text-gray-500 mt-1">Workers & contractors</p>
          </button>

          <button
            onClick={() => setBillingCategory('equipment')}
            className={`p-6 rounded-lg border-2 transition-all ${
              billingCategory === 'equipment'
                ? 'border-orange-600 bg-orange-50'
                : 'border-gray-300 hover:border-orange-400 hover:bg-gray-50'
            }`}
          >
            <FileText className="mx-auto mb-3 text-orange-600" size={32} />
            <p className="font-bold text-gray-900 uppercase text-sm">Equipment</p>
            <p className="text-xs text-gray-500 mt-1">Machinery rental</p>
          </button>

          <button
            onClick={() => setBillingCategory('transport')}
            className={`p-6 rounded-lg border-2 transition-all ${
              billingCategory === 'transport'
                ? 'border-orange-600 bg-orange-50'
                : 'border-gray-300 hover:border-orange-400 hover:bg-gray-50'
            }`}
          >
            <FileText className="mx-auto mb-3 text-orange-600" size={32} />
            <p className="font-bold text-gray-900 uppercase text-sm">Transport</p>
            <p className="text-xs text-gray-500 mt-1">Logistics & delivery</p>
          </button>
        </div>

        {billingCategory && (
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 uppercase">Select Invoice Date</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setBillingDateType('today')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  billingDateType === 'today'
                    ? 'border-orange-600 bg-orange-50'
                    : 'border-gray-300 hover:border-orange-400 hover:bg-gray-50'
                }`}
              >
                <Calendar className="mx-auto mb-2 text-orange-600" size={24} />
                <p className="font-bold text-gray-900 uppercase text-sm">Today's Invoice</p>
                <p className="text-xs text-gray-500 mt-1">December 2, 2026</p>
              </button>

              <button
                onClick={() => setBillingDateType('custom')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  billingDateType === 'custom'
                    ? 'border-orange-600 bg-orange-50'
                    : 'border-gray-300 hover:border-orange-400 hover:bg-gray-50'
                }`}
              >
                <Calendar className="mx-auto mb-2 text-orange-600" size={24} />
                <p className="font-bold text-gray-900 uppercase text-sm">Custom Date</p>
                <p className="text-xs text-gray-500 mt-1">Select specific date</p>
              </button>
            </div>

            {billingDateType === 'custom' && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2 uppercase tracking-wide">Select Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={customBillingDate}
                  onChange={(e) => setCustomBillingDate(e.target.value)}
                />
              </div>
            )}

            {billingDateType && (
              <button
                onClick={generateInvoiceForCategory}
                className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 uppercase text-sm"
              >
                <FileText size={18} /> Generate Invoice
              </button>
            )}
          </div>
        )}
      </div>

      {billingCategory && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 uppercase">
              Available {billingCategory.charAt(0).toUpperCase() + billingCategory.slice(1)} Data
            </h3>
          </div>
          <div className="p-6 space-y-3">
            {confirmedData[billingCategory].map((item, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-1">
                      {item.materialName || item.workerName || item.equipmentName || item.description}
                    </p>
                    <p className="text-sm text-gray-600">
                      Token: <span className="font-mono">{item.token}</span> | Date: {item.date}
                    </p>
                  </div>
                  <span className="text-sm text-green-600 font-bold flex items-center gap-1.5">
                    <CheckCircle size={14} />
                    CONFIRMED
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderInvoiceView = () => {
    if (invoices.length === 0) {
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <FileText size={64} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500 font-medium">No invoices generated yet</p>
          <p className="text-sm text-gray-400 mt-1">Generated invoices will appear here</p>
        </div>
      );
    }

    const invoice = invoices[invoices.length - 1];

    return (
      <div className="space-y-6">
        {/* Tally Sync Section - OPTIONAL FOR REAL LIFE */}
        {/* RECOMMENDATION: Remove this section for client-facing invoices */}
        {/* Keep it only for internal accounting team */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 print:hidden">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Database size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 uppercase">Accounting Integration (Internal Only)</h3>
                <p className="text-sm text-gray-600 mt-0.5">
                  {invoice.tallySynced 
                    ? `✓ Synced to Tally (Voucher: ${invoice.tallyVoucherId})`
                    : 'Not synced to accounting system'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {!invoice.tallySynced && (
                <button
                  onClick={() => simulateTallySync(invoice)}
                  disabled={syncInProgress}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:bg-gray-400 transition-colors font-medium text-sm uppercase"
                >
                  {syncInProgress ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" />
                      Syncing...
                    </>
                  ) : (
                    <>
                      <Database size={18} />
                      Sync to Tally
                    </>
                  )}
                </button>
              )}
              <button
                onClick={() => setShowTallyModal(true)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2 transition-colors font-medium text-sm uppercase"
              >
                <FileText size={18} />
                View Logs
              </button>
            </div>
          </div>
        </div>

        {/* Invoice Display */}
        <div className="bg-white rounded-lg border border-gray-200 p-8" id="invoice-content">
          <div className="border-4 border-gray-800 p-6">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 uppercase">Tax Invoice</h1>
              <p className="text-sm text-gray-600 mt-1">GST Compliant Invoice as per Indian Tax Laws</p>
              <p className="text-sm font-bold text-orange-600 mt-2 uppercase">
                Category: {invoice.category}
              </p>
              {/* REMOVE THIS IN PRODUCTION - Only for internal reference */}
              {invoice.tallySynced && (
                <p className="text-xs text-green-600 mt-2 flex items-center justify-center gap-1.5 print:hidden">
                  <CheckCircle size={14} />
                  Internal Ref: Synced to Tally ERP | Voucher ID: {invoice.tallyVoucherId}
                </p>
              )}
            </div>

            <div className="flex justify-center mb-6">
              <div className="text-center border-2 border-gray-300 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-2 font-bold uppercase tracking-wide">Invoice Barcode</p>
                {generateBarcode(invoice.invoiceNo)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6 text-sm">
              <div>
                <h3 className="font-bold mb-2 border-b border-gray-300 pb-2 uppercase">Vendor Details</h3>
                <p className="font-bold text-gray-900">{invoice.vendor.name}</p>
                <p className="text-gray-700">GSTIN: {invoice.vendor.gstin}</p>
                <p className="text-gray-700">State: {invoice.vendor.state}</p>
              </div>
              <div className="text-right">
                <h3 className="font-bold mb-2 border-b border-gray-300 pb-2 uppercase">Invoice Details</h3>
                <p className="text-gray-700"><strong>Invoice No:</strong> {invoice.invoiceNo}</p>
                <p className="text-gray-700"><strong>Date:</strong> {invoice.date}</p>
                <p className="text-gray-700"><strong>Place of Supply:</strong> Maharashtra</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full mb-6 text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="border border-gray-400 p-2 text-left uppercase">Description</th>
                    <th className="border border-gray-400 p-2 text-center uppercase">HSN/SAC</th>
                    <th className="border border-gray-400 p-2 text-center uppercase">Token</th>
                    <th className="border border-gray-400 p-2 text-center uppercase">Qty</th>
                    <th className="border border-gray-400 p-2 text-center uppercase">Unit</th>
                    <th className="border border-gray-400 p-2 text-right uppercase">Rate</th>
                    <th className="border border-gray-400 p-2 text-right uppercase">Taxable</th>
                    <th className="border border-gray-400 p-2 text-center uppercase">GST%</th>
                    <th className="border border-gray-400 p-2 text-right uppercase">CGST</th>
                    <th className="border border-gray-400 p-2 text-right uppercase">SGST</th>
                    <th className="border border-gray-400 p-2 text-right uppercase">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-300">
                      <td className="border border-gray-300 p-2">{item.description}</td>
                      <td className="border border-gray-300 p-2 text-center text-xs font-mono">{item.hsnCode}</td>
                      <td className="border border-gray-300 p-2 text-center text-xs font-mono">{item.token}</td>
                      <td className="border border-gray-300 p-2 text-center">{item.quantity}</td>
                      <td className="border border-gray-300 p-2 text-center text-xs">{item.unit}</td>
                      <td className="border border-gray-300 p-2 text-right">₹{item.rate.toFixed(2)}</td>
                      <td className="border border-gray-300 p-2 text-right">₹{item.taxableAmount.toFixed(2)}</td>
                      <td className="border border-gray-300 p-2 text-center">{item.gstRate}%</td>
                      <td className="border border-gray-300 p-2 text-right">₹{item.cgst.toFixed(2)}</td>
                      <td className="border border-gray-300 p-2 text-right">₹{item.sgst.toFixed(2)}</td>
                      <td className="border border-gray-300 p-2 text-right font-bold">₹{item.totalAmount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="border border-gray-300 p-4 rounded-lg">
                <h4 className="font-bold mb-3 uppercase">GST Summary</h4>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-2 uppercase">GST%</th>
                      <th className="text-right py-2 uppercase">Taxable</th>
                      <th className="text-right py-2 uppercase">CGST</th>
                      <th className="text-right py-2 uppercase">SGST</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...new Set(invoice.items.map(i => i.gstRate))].map(rate => {
                      const items = invoice.items.filter(i => i.gstRate === rate);
                      const taxable = items.reduce((sum, i) => sum + i.taxableAmount, 0);
                      const cgst = items.reduce((sum, i) => sum + i.cgst, 0);
                      const sgst = items.reduce((sum, i) => sum + i.sgst, 0);
                      return (
                        <tr key={rate} className="border-b border-gray-200">
                          <td className="py-2">{rate}%</td>
                          <td className="text-right py-2">₹{taxable.toFixed(2)}</td>
                          <td className="text-right py-2">₹{cgst.toFixed(2)}</td>
                          <td className="text-right py-2">₹{sgst.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="border-2 border-gray-800 p-4 rounded-lg">
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-gray-700">Subtotal (Taxable Amount):</span>
                  <span className="font-medium">₹{invoice.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-gray-700">Total GST:</span>
                  <span className="font-medium">₹{invoice.totalGST.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t-2 border-gray-800 pt-3 mt-3">
                  <span className="uppercase">Grand Total:</span>
                  <span>₹{invoice.grandTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-600 mt-2 italic">
                  (Rupees {new Intl.NumberFormat('en-IN').format(Math.round(invoice.grandTotal))} Only)
                </p>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-4 mt-4">
              <p className="text-xs text-gray-600">
                <strong>Terms & Conditions:</strong> Payment due within 30 days. 
                All disputes subject to Maharashtra jurisdiction.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 print:hidden">
            <button 
              onClick={downloadInvoiceAsPDF}
              className="bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2 uppercase text-sm"
            >
              <Download size={18} /> Download PDF
            </button>
            <button 
              onClick={() => window.print()}
              className="bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 uppercase text-sm"
            >
              <Printer size={18} /> Print Invoice
            </button>
            <button 
              onClick={() => setView('billing')}
              className="bg-gray-600 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors uppercase text-sm"
            >
              Back to Billing
            </button>
          </div>
        </div>

        {/* Tally Logs Modal */}
        {showTallyModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Database size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 uppercase">Tally Sync Logs</h3>
                    <p className="text-sm text-gray-600 mt-0.5">Accounting system integration history</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowTallyModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6">
                {tallyLogs.length === 0 ? (
                  <div className="text-center py-12">
                    <Database size={64} className="mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500 font-medium">No sync logs available</p>
                    <p className="text-sm text-gray-400 mt-1">Tally sync history will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {tallyLogs.map((log, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-bold text-gray-900">Invoice: {log.invoiceNo}</p>
                            <p className="text-sm text-gray-600 mt-0.5">
                              {new Date(log.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                            log.status === 'success' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {log.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                          <div className="bg-white rounded p-2">
                            <p className="text-xs text-gray-600 uppercase mb-1">Category</p>
                            <p className="font-medium text-gray-900">{log.category}</p>
                          </div>
                          <div className="bg-white rounded p-2">
                            <p className="text-xs text-gray-600 uppercase mb-1">Amount</p>
                            <p className="font-medium text-gray-900">₹{log.amount.toFixed(2)}</p>
                          </div>
                          <div className="bg-white rounded p-2">
                            <p className="text-xs text-gray-600 uppercase mb-1">Tally Voucher ID</p>
                            <p className="font-medium text-gray-900 font-mono text-xs">{log.voucherId}</p>
                          </div>
                          <div className="bg-white rounded p-2">
                            <p className="text-xs text-gray-600 uppercase mb-1">Company</p>
                            <p className="font-medium text-gray-900 text-xs">{log.response.companyName}</p>
                          </div>
                        </div>

                        <details className="mt-3">
                          <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-800 font-medium uppercase">
                            View XML Request
                          </summary>
                          <pre className="mt-3 p-4 bg-gray-900 text-green-400 text-xs rounded-lg overflow-x-auto font-mono">
                            {log.xml}
                          </pre>
                        </details>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Add html2pdf library */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button 
              onClick={() => setView('supervisor')}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                view === 'supervisor' 
                  ? 'bg-orange-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Material Request
            </button>
            <button 
              onClick={() => setView('approval')}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                view === 'approval' 
                  ? 'bg-orange-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Approvals ({requests.filter(r => r.status === 'pending').length})
            </button>
            <button 
              onClick={() => setView('tokens')}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                view === 'tokens' 
                  ? 'bg-orange-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Active Tokens ({tokens.filter(t => t.active && !t.redeemed).length})
            </button>
            <button 
              onClick={() => setView('billing')}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                view === 'billing' 
                  ? 'bg-orange-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Billing
            </button>
            <button 
              onClick={() => setView('invoice')}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                view === 'invoice' 
                  ? 'bg-orange-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Invoice ({invoices.length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div>
          {view === 'supervisor' && renderSupervisorView()}
          {view === 'approval' && renderApprovalView()}
          {view === 'tokens' && renderTokensView()}
          {view === 'billing' && renderBillingView()}
          {view === 'invoice' && renderInvoiceView()}
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #invoice-content, #invoice-content * {
            visibility: visible;
          }
          #invoice-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MaterialManagementSystem;
