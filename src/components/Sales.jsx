import React, { useState } from 'react';
import { Calculator, Layers, Home, ChevronDown } from 'lucide-react';

export default function Sales() {
  const [selectedFloor, setSelectedFloor] = useState('ground');
  const [selectedFlat, setSelectedFlat] = useState(null);

  const floorData = {
    ground: {
      name: 'Ground Floor',
      flats: [
        { id: 'G-101', type: '2 BHK', area: 850, sellPerSqFt: 5000, costPerSqFt: 3942, marginPerSqFt: 1058, status: 'sold', owner: 'राज कुमार' },
        { id: 'G-102', type: '1 BHK', area: 650, sellPerSqFt: 5000, costPerSqFt: 3942, marginPerSqFt: 1058, status: 'available' },
        { id: 'G-103', type: '2 BHK', area: 850, sellPerSqFt: 5000, costPerSqFt: 3942, marginPerSqFt: 1058, status: 'sold', owner: 'अमित शर्मा' },
        { id: 'G-104', type: '3 BHK', area: 1200, sellPerSqFt: 5200, costPerSqFt: 3942, marginPerSqFt: 1258, status: 'available' },
        { id: 'G-105', type: '2 BHK', area: 850, sellPerSqFt: 5000, costPerSqFt: 3942, marginPerSqFt: 1058, status: 'available' },
        { id: 'G-106', type: '1 BHK', area: 650, sellPerSqFt: 5000, costPerSqFt: 3942, marginPerSqFt: 1058, status: 'sold', owner: 'विकास पटेल' },
        { id: 'G-107', type: '2 BHK', area: 850, sellPerSqFt: 5000, costPerSqFt: 3942, marginPerSqFt: 1058, status: 'available' },
        { id: 'G-108', type: '2 BHK', area: 850, sellPerSqFt: 5000, costPerSqFt: 3942, marginPerSqFt: 1058, status: 'available' },
        { id: 'G-109', type: '1 BHK', area: 650, sellPerSqFt: 5000, costPerSqFt: 3942, marginPerSqFt: 1058, status: 'available' },
        { id: 'G-110', type: '3 BHK', area: 1200, sellPerSqFt: 5200, costPerSqFt: 3942, marginPerSqFt: 1258, status: 'sold', owner: 'सुनील गुप्ता' },
        { id: 'G-111', type: '2 BHK', area: 850, sellPerSqFt: 5000, costPerSqFt: 3942, marginPerSqFt: 1058, status: 'available' },
      ]
    },
    first: {
      name: 'First Floor',
      flats: [
        { id: 'F1-201', type: '2 BHK', area: 850, sellPerSqFt: 5100, costPerSqFt: 3942, marginPerSqFt: 1158, status: 'available' },
        { id: 'F1-202', type: '1 BHK', area: 650, sellPerSqFt: 5100, costPerSqFt: 3942, marginPerSqFt: 1158, status: 'sold', owner: 'प्रिया शर्मा' },
        { id: 'F1-203', type: '2 BHK', area: 850, sellPerSqFt: 5100, costPerSqFt: 3942, marginPerSqFt: 1158, status: 'available' },
        { id: 'F1-204', type: '3 BHK', area: 1200, sellPerSqFt: 5300, costPerSqFt: 3942, marginPerSqFt: 1358, status: 'available' },
        { id: 'F1-205', type: '2 BHK', area: 850, sellPerSqFt: 5100, costPerSqFt: 3942, marginPerSqFt: 1158, status: 'sold', owner: 'रोहित मेहता' },
        { id: 'F1-206', type: '1 BHK', area: 650, sellPerSqFt: 5100, costPerSqFt: 3942, marginPerSqFt: 1158, status: 'available' },
        { id: 'F1-207', type: '2 BHK', area: 850, sellPerSqFt: 5100, costPerSqFt: 3942, marginPerSqFt: 1158, status: 'available' },
        { id: 'F1-208', type: '2 BHK', area: 850, sellPerSqFt: 5100, costPerSqFt: 3942, marginPerSqFt: 1158, status: 'available' },
        { id: 'F1-209', type: '1 BHK', area: 650, sellPerSqFt: 5100, costPerSqFt: 3942, marginPerSqFt: 1158, status: 'sold', owner: 'नीता देसाई' },
        { id: 'F1-210', type: '3 BHK', area: 1200, sellPerSqFt: 5300, costPerSqFt: 3942, marginPerSqFt: 1358, status: 'available' },
        { id: 'F1-211', type: '2 BHK', area: 850, sellPerSqFt: 5100, costPerSqFt: 3942, marginPerSqFt: 1158, status: 'available' },
      ]
    }
  };

  const currentFloor = floorData[selectedFloor];
  const totalFlats = currentFloor.flats.length;
  const soldFlats = currentFloor.flats.filter(f => f.status === 'sold').length;
  const availableFlats = totalFlats - soldFlats;
  const totalArea = currentFloor.flats.reduce((sum, f) => sum + f.area, 0);
  
  const avgCostPerSqFt = currentFloor.flats.reduce((sum, f) => sum + f.costPerSqFt, 0) / totalFlats;
  const avgSellPerSqFt = currentFloor.flats.reduce((sum, f) => sum + f.sellPerSqFt, 0) / totalFlats;

  const formatLakhs = (amount) => {
    return '₹' + (amount / 100000).toFixed(2) + 'L';
  };

  const formatRupees = (amount) => {
    return '₹' + Math.round(amount).toLocaleString('en-IN');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Header */}
    

      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-teal-700 p-3 rounded-xl">
            <Calculator className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900">Project Cost Analyzer</h1>
            <p className="text-gray-500 mt-1">Real estate inventory + profit analytics (builder dashboard)</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-[#e6f3ee] border border-[#dce7e1] rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-sm text-gray-600 mb-1">TOTAL FLATS</div>
                <div className="text-4xl font-black text-gray-900">{totalFlats}</div>
                <div className="text-sm text-gray-500 mt-1">कुल फ्लैट</div>
              </div>
              <div className="bg-[#e6f3ee] p-3 rounded-xl">
                <svg className="w-6 h-6 text-teal-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-sm text-gray-600 mb-1">SOLD</div>
                <div className="text-4xl font-black text-gray-900">{soldFlats}</div>
                <div className="text-sm text-gray-500 mt-1">बेचे गए</div>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-[#e6f3ee] border border-[#dce7e1] rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-sm text-gray-600 mb-1">AVAILABLE</div>
                <div className="text-4xl font-black text-gray-900">{availableFlats}</div>
                <div className="text-sm text-gray-500 mt-1">उपलब्ध</div>
              </div>
              <div className="bg-[#e6f3ee] p-3 rounded-xl">
                <Home className="w-6 h-6 text-teal-700" />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-sm text-gray-600 mb-1">TOTAL AREA</div>
                <div className="text-4xl font-black text-gray-900">{totalArea.toLocaleString()}</div>
                <div className="text-sm text-gray-500 mt-1">Total carpet area</div>
              </div>
              <div className="bg-gray-100 p-3 rounded-xl">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Floor Tabs */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setSelectedFloor('ground')}
            className={`px-6 py-3 rounded-xl font-bold transition ${
              selectedFloor === 'ground'
                ? 'bg-teal-700 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Ground Floor
          </button>
          <button
            onClick={() => setSelectedFloor('first')}
            className={`px-6 py-3 rounded-xl font-bold transition ${
              selectedFloor === 'first'
                ? 'bg-teal-700 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            First Floor
          </button>
        </div>
      </div>

      <div className="px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Floor Snapshot */}
          <div className="col-span-3">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Layers className="w-6 h-6 text-teal-700" />
                <div>
                  <h2 className="font-black text-lg text-gray-900">{currentFloor.name}</h2>
                  <p className="text-sm text-gray-500">Floor snapshot</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Total</div>
                  <div className="text-3xl font-black text-gray-900">{totalFlats}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Area</div>
                  <div className="text-3xl font-black text-gray-900">{totalArea.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">sq.ft</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                  <div className="text-sm text-green-700 font-semibold mb-1">Sold</div>
                  <div className="text-3xl font-black text-green-700">{soldFlats}</div>
                </div>
                <div className="bg-[#e6f3ee] border-2 border-[#b9d9cf] rounded-xl p-4">
                  <div className="text-sm text-teal-800 font-semibold mb-1">Available</div>
                  <div className="text-3xl font-black text-teal-800">{availableFlats}</div>
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-6">
                Table view in middle is the main "builder inventory" system.
              </p>
            </div>
          </div>

          {/* Middle - Inventory Table */}
          <div className="col-span-6">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="font-black text-xl text-gray-900">Inventory (Professional Table)</h2>
                <p className="text-sm text-gray-500 mt-1">Includes rate, cost, margin, and sold details</p>
                
                <div className="flex gap-4 mt-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                    <span className="text-sm text-gray-600">Cost/Sq.Ft: </span>
                    <span className="font-bold text-red-600">{formatRupees(avgCostPerSqFt)}</span>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                    <span className="text-sm text-gray-600">Avg Sell/Sq.Ft: </span>
                    <span className="font-bold text-green-600">{formatRupees(avgSellPerSqFt)}</span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-black text-gray-600 uppercase">Flat</th>
                      <th className="px-4 py-3 text-left text-xs font-black text-gray-600 uppercase">Type</th>
                      <th className="px-4 py-3 text-right text-xs font-black text-gray-600 uppercase">Area</th>
                      <th className="px-4 py-3 text-right text-xs font-black text-gray-600 uppercase">Sell/Sq.Ft</th>
                      <th className="px-4 py-3 text-right text-xs font-black text-gray-600 uppercase">Cost/Sq.Ft</th>
                      <th className="px-4 py-3 text-right text-xs font-black text-gray-600 uppercase">Margin/Sq.Ft</th>
                      <th className="px-4 py-3 text-right text-xs font-black text-gray-600 uppercase">Total Sell</th>
                      <th className="px-4 py-3 text-right text-xs font-black text-gray-600 uppercase">Profit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentFloor.flats.map((flat) => {
                      const totalSell = flat.area * flat.sellPerSqFt;
                      const totalProfit = flat.area * flat.marginPerSqFt;
                      
                      return (
                        <tr
                          key={flat.id}
                          onClick={() => setSelectedFlat(flat)}
                          className={`hover:bg-[#e6f3ee] cursor-pointer transition ${
                            selectedFlat?.id === flat.id ? 'bg-[#e6f3ee]' : ''
                          }`}
                        >
                          <td className="px-4 py-3 font-black text-gray-900">{flat.id}</td>
                          <td className="px-4 py-3 text-gray-700">
                            {flat.type.split(' ')[0]}<br/>
                            <span className="text-xs text-gray-500">{flat.type.split(' ')[1]}</span>
                          </td>
                          <td className="px-4 py-3 text-right text-gray-700">
                            {flat.area}<br/>
                            <span className="text-xs text-gray-500">sq.ft</span>
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-gray-900">
                            {formatRupees(flat.sellPerSqFt)}
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-red-600">
                            {formatRupees(flat.costPerSqFt)}
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-green-600">
                            {formatRupees(flat.marginPerSqFt)}
                          </td>
                          <td className="px-4 py-3 text-right font-black text-gray-900">
                            {formatLakhs(totalSell)}
                          </td>
                          <td className="px-4 py-3 text-right font-black text-green-600">
                            {formatLakhs(totalProfit)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Selected Flat Details */}
          <div className="col-span-3">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-6">
              {selectedFlat ? (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <Home className="w-6 h-6 text-teal-700" />
                    <h2 className="font-black text-lg text-gray-900">Flat Details</h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Flat ID</div>
                      <div className="text-2xl font-black text-gray-900">{selectedFlat.id}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Type</div>
                        <div className="font-bold text-gray-900">{selectedFlat.type}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Area</div>
                        <div className="font-bold text-gray-900">{selectedFlat.area} sq.ft</div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="text-xs text-gray-500 mb-2">Status</div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        selectedFlat.status === 'sold'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-[#e6f3ee] text-teal-800'
                      }`}>
                        {selectedFlat.status === 'sold' ? '✓ Sold' : '◯ Available'}
                      </span>
                    </div>

                    {selectedFlat.owner && (
                      <div className="pt-4 border-t border-gray-200">
                        <div className="text-xs text-gray-500 mb-1">Owner</div>
                        <div className="font-bold text-gray-900">{selectedFlat.owner}</div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-200 space-y-3">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-500 mb-1">Selling Price</div>
                        <div className="text-xl font-black text-gray-900">
                          {formatLakhs(selectedFlat.area * selectedFlat.sellPerSqFt)}
                        </div>
                      </div>

                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="text-xs text-green-700 mb-1">Profit</div>
                        <div className="text-xl font-black text-green-700">
                          {formatLakhs(selectedFlat.area * selectedFlat.marginPerSqFt)}
                        </div>
                      </div>

                      <div className="bg-[#e6f3ee] rounded-lg p-3">
                        <div className="text-xs text-teal-800 mb-1">Margin per Sq.Ft</div>
                        <div className="text-xl font-black text-teal-800">
                          {formatRupees(selectedFlat.marginPerSqFt)}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Home className="w-16 h-16 text-teal-700 mx-auto mb-4" />
                  <h3 className="font-black text-gray-900 mb-2">Select a flat</h3>
                  <p className="text-sm text-gray-500">Click any table row to open<br/>profitability + sold details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}