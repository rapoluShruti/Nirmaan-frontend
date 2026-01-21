import React, { useState } from 'react';
import { Camera, AlertTriangle, CheckCircle, X, Upload, Building2, FileText, Image as ImageIcon } from 'lucide-react';

export default function SafetyReporter() {
  const [view, setView] = useState('home'); // 'home', 'register', 'report', 'admin'
  const [sites, setSites] = useState([]);
  const [reports, setReports] = useState([]);
  
  // Registration form
  const [regData, setRegData] = useState({
    legalName: '',
    registrationNumber: '',
    projectName: '',
    siteAddress: '',
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    estimatedCompletion: ''
  });

  // Report form
  const [reportData, setReportData] = useState({
    type: 'Fall Hazard',
    description: '',
    location: '',
    hazardImages: [],
    siteNameBoardImage: null,
    reporterName: '',
    reporterContact: '',
    claimedSite: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const hazardTypes = [
    'Fall Hazard',
    'Electrical Safety',
    'Equipment Malfunction',
    'Unsafe Practice',
    'Missing Safety Gear',
    'Structural Issue',
    'Fire Hazard',
    'Chemical Spill',
    'Other'
  ];

  // Register Construction Site
  const handleSiteRegistration = () => {
    if (!regData.legalName || !regData.registrationNumber || !regData.projectName || !regData.siteAddress) {
      alert('Please fill all required fields');
      return;
    }

    const newSite = {
      ...regData,
      id: 'SITE-' + Date.now(),
      registeredOn: new Date().toLocaleString(),
      status: 'active',
      verified: true
    };

    setSites(prev => [newSite, ...prev]);
    alert('Construction site registered successfully!');
    setRegData({
      legalName: '',
      registrationNumber: '',
      projectName: '',
      siteAddress: '',
      contactPerson: '',
      contactPhone: '',
      contactEmail: '',
      estimatedCompletion: ''
    });
    setView('home');
  };

  // Handle hazard image upload
  const handleHazardImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setReportData(prev => ({
      ...prev,
      hazardImages: [...prev.hazardImages, ...imageUrls]
    }));
  };

  // Handle site name board image
  const handleSiteNameBoardUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setReportData(prev => ({
        ...prev,
        siteNameBoardImage: imageUrl
      }));
    }
  };

  const removeHazardImage = (index) => {
    setReportData(prev => ({
      ...prev,
      hazardImages: prev.hazardImages.filter((_, i) => i !== index)
    }));
  };

  // Submit Report
  const handleReportSubmit = () => {
    if (!reportData.description || !reportData.location || reportData.hazardImages.length === 0) {
      alert('Please provide description, location, and at least one photo of the hazard');
      return;
    }

    const newReport = {
      ...reportData,
      id: 'RPT-' + Date.now(),
      timestamp: new Date().toLocaleString(),
      status: 'pending_verification',
      verifiedSite: null
    };

    setReports(prev => [newReport, ...prev]);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setView('home');
      setReportData({
        type: 'Fall Hazard',
        description: '',
        location: '',
        hazardImages: [],
        siteNameBoardImage: null,
        reporterName: '',
        reporterContact: '',
        claimedSite: ''
      });
    }, 3000);
  };

  // Home Screen
  if (view === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <AlertTriangle className="text-orange-600 mx-auto mb-4" size={64} />
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Construction Safety System</h1>
              <p className="text-gray-600">Register sites & report safety hazards</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setView('report')}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg flex items-center justify-center gap-3 transition"
              >
                <Camera size={24} />
                Report Safety Issue
              </button>

              <button
                onClick={() => setView('register')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg flex items-center justify-center gap-3 transition"
              >
                <Building2 size={24} />
                Register Construction Site
              </button>

              <button
                onClick={() => setView('admin')}
                className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-lg shadow-lg flex items-center justify-center gap-3 transition"
              >
                <FileText size={24} />
                View Reports & Sites ({reports.length} reports, {sites.length} sites)
              </button>
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>How it works:</strong><br />
                1. Construction companies register their sites with legal details<br />
                2. Anyone can report safety issues with photos<br />
                3. Admin verifies which site the report belongs to
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Register Construction Site
  if (view === 'register') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Register Construction Site</h2>
              <button onClick={() => setView('home')} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700">
                  <strong>⚠️ Legal Registration:</strong> All construction sites must be registered with proper legal documentation. This helps verify reports and ensure accountability.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Legal Company Name *</label>
                  <input
                    type="text"
                    value={regData.legalName}
                    onChange={(e) => setRegData(prev => ({ ...prev, legalName: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="ABC Construction Pvt Ltd"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Company Registration No. *</label>
                  <input
                    type="text"
                    value={regData.registrationNumber}
                    onChange={(e) => setRegData(prev => ({ ...prev, registrationNumber: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="CIN: U12345MH2020PTC123456"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Project Name *</label>
                <input
                  type="text"
                  value={regData.projectName}
                  onChange={(e) => setRegData(prev => ({ ...prev, projectName: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Metro Bridge Construction - Phase 2"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Complete Site Address *</label>
                <textarea
                  value={regData.siteAddress}
                  onChange={(e) => setRegData(prev => ({ ...prev, siteAddress: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Plot No. 123, Sector 45, Near Railway Station, Mumbai - 400001"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Site Manager Name *</label>
                  <input
                    type="text"
                    value={regData.contactPerson}
                    onChange={(e) => setRegData(prev => ({ ...prev, contactPerson: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Rajesh Kumar"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Contact Phone *</label>
                  <input
                    type="tel"
                    value={regData.contactPhone}
                    onChange={(e) => setRegData(prev => ({ ...prev, contactPhone: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    value={regData.contactEmail}
                    onChange={(e) => setRegData(prev => ({ ...prev, contactEmail: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="manager@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Estimated Completion Date</label>
                <input
                  type="date"
                  value={regData.estimatedCompletion}
                  onChange={(e) => setRegData(prev => ({ ...prev, estimatedCompletion: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleSiteRegistration}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition mt-6"
              >
                Register Site
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Report Safety Issue
  if (view === 'report') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="text-green-600 mx-auto mb-4" size={64} />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Report Submitted Successfully!</h2>
                <p className="text-gray-600 mb-2">Thank you for reporting this safety issue.</p>
                <p className="text-sm text-gray-500">Our team will verify the site details and notify the concerned authorities.</p>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Report Safety Issue</h2>
                  <button onClick={() => setView('home')} className="text-gray-500 hover:text-gray-700">
                    <X size={24} />
                  </button>
                </div>

                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
                  <h3 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                    <ImageIcon size={20} />
                    Photo Evidence Required
                  </h3>
                  <p className="text-sm text-gray-700">
                    Please take photos of: (1) The safety hazard, and (2) The site name board. This helps us verify which construction site the report belongs to.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Type of Hazard *</label>
                    <select
                      value={reportData.type}
                      onChange={(e) => setReportData(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    >
                      {hazardTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Description *</label>
                    <textarea
                      value={reportData.description}
                      onChange={(e) => setReportData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      rows="4"
                      placeholder="Describe what you observed..."
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Specific Location *</label>
                    <input
                      type="text"
                      value={reportData.location}
                      onChange={(e) => setReportData(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., Floor 5, near east corner..."
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Photos of Hazard * (Required)</label>
                    <div className="border-2 border-dashed border-orange-300 rounded-lg p-6 text-center bg-orange-50">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleHazardImageUpload}
                        className="hidden"
                        id="hazard-upload"
                      />
                      <label htmlFor="hazard-upload" className="cursor-pointer">
                        <Camera className="mx-auto text-orange-500 mb-2" size={48} />
                        <p className="text-gray-700 font-semibold">Take/Upload Photos of the Hazard</p>
                        <p className="text-sm text-gray-500">Multiple photos help us understand better</p>
                      </label>
                    </div>
                    {reportData.hazardImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        {reportData.hazardImages.map((img, index) => (
                          <div key={index} className="relative">
                            <img src={img} alt={`Hazard ${index + 1}`} className="w-full h-24 object-cover rounded" />
                            <button
                              onClick={() => removeHazardImage(index)}
                              className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Photo of Site Name Board (Recommended)</label>
                    <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center bg-blue-50">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleSiteNameBoardUpload}
                        className="hidden"
                        id="nameboard-upload"
                      />
                      <label htmlFor="nameboard-upload" className="cursor-pointer">
                        <Building2 className="mx-auto text-blue-500 mb-2" size={48} />
                        <p className="text-gray-700 font-semibold">Photo of Construction Site Name Board</p>
                        <p className="text-sm text-gray-500">Helps us identify the site quickly</p>
                      </label>
                    </div>
                    {reportData.siteNameBoardImage && (
                      <div className="mt-4">
                        <img src={reportData.siteNameBoardImage} alt="Site name board" className="w-full max-h-48 object-contain rounded border" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Which site is this? (Optional)</label>
                    <input
                      type="text"
                      value={reportData.claimedSite}
                      onChange={(e) => setReportData(prev => ({ ...prev, claimedSite: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      placeholder="If you know the project name, enter it here..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Your Name (Optional)</label>
                      <input
                        type="text"
                        value={reportData.reporterName}
                        onChange={(e) => setReportData(prev => ({ ...prev, reporterName: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        placeholder="Anonymous OK"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Contact (Optional)</label>
                      <input
                        type="text"
                        value={reportData.reporterContact}
                        onChange={(e) => setReportData(prev => ({ ...prev, reporterContact: e.target.value }))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        placeholder="Phone/Email"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleReportSubmit}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition mt-6"
                  >
                    Submit Safety Report
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Admin View
  if (view === 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
              <button onClick={() => setView('home')} className="text-blue-600 hover:text-blue-800 font-semibold">
                ← Back to Home
              </button>
            </div>
          </div>

          {/* Registered Sites */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Registered Construction Sites ({sites.length})</h3>
            {sites.length === 0 ? (
              <p className="text-gray-500">No sites registered yet.</p>
            ) : (
              <div className="space-y-4">
                {sites.map(site => (
                  <div key={site.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded font-bold">{site.id}</span>
                        <h4 className="text-lg font-bold text-gray-800 mt-1">{site.projectName}</h4>
                        <p className="text-sm text-gray-600">{site.legalName}</p>
                        <p className="text-xs text-gray-500">Registration: {site.registrationNumber}</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2"><strong>Address:</strong> {site.siteAddress}</p>
                    <p className="text-sm text-gray-700"><strong>Contact:</strong> {site.contactPerson} - {site.contactPhone}</p>
                    <p className="text-xs text-gray-500 mt-2">Registered on: {site.registeredOn}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Safety Reports */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Safety Reports ({reports.length})</h3>
            {reports.length === 0 ? (
              <p className="text-gray-500">No reports submitted yet.</p>
            ) : (
              <div className="space-y-4">
                {reports.map(report => (
                  <div key={report.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="text-orange-600" size={20} />
                        <span className="font-semibold text-gray-800">{report.type}</span>
                      </div>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Needs Verification</span>
                    </div>
                    
                    {report.claimedSite && (
                      <p className="text-sm mb-2">
                        <strong className="text-blue-700">Claimed Site:</strong> {report.claimedSite}
                      </p>
                    )}
                    
                    <p className="text-gray-700 mb-2">{report.description}</p>
                    <p className="text-sm text-gray-600 mb-3"><strong>Location:</strong> {report.location}</p>
                    
                    <div className="mb-3">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Hazard Photos:</p>
                      <div className="flex gap-2">
                        {report.hazardImages.map((img, i) => (
                          <img key={i} src={img} alt={`Hazard ${i + 1}`} className="w-24 h-24 object-cover rounded border" />
                        ))}
                      </div>
                    </div>
                    
                    {report.siteNameBoardImage && (
                      <div className="mb-3">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Site Name Board Photo:</p>
                        <img src={report.siteNameBoardImage} alt="Site board" className="w-48 h-32 object-contain rounded border" />
                      </div>
                    )}
                    
                    {report.reporterName && (
                      <p className="text-sm text-gray-600"><strong>Reported by:</strong> {report.reporterName} {report.reporterContact && `(${report.reporterContact})`}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">{report.timestamp}</p>
                    
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs text-blue-600">👉 Admin: Match this report to a registered site using the photos and claimed site name</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}