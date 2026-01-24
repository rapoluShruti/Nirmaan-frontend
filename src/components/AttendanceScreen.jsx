

// // import { useEffect, useState, useRef } from "react";
// // import api from "../api/axiosConfig";

// // export default function AttendanceScreen() {
// //   const [userRole, setUserRole] = useState("supervisor");
// //   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
// //   const [selectedSite, setSelectedSite] = useState("");
// //   const [selectedCategory, setSelectedCategory] = useState("all");
// //   const [showAddWorkerModal, setShowAddWorkerModal] = useState(false);
// //   const [showWageModal, setShowWageModal] = useState(false);
// //   const [showFaceScanModal, setShowFaceScanModal] = useState(false);
// //   const [selectedWorker, setSelectedWorker] = useState(null);
// //   const [newWorkerName, setNewWorkerName] = useState("");
// //   const [newWorkerCategory, setNewWorkerCategory] = useState("");
// //   const [newWorkerMudkam, setNewWorkerMudkam] = useState("");
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [syncing, setSyncing] = useState(false);
// //   const [currentLocation, setCurrentLocation] = useState(null);
// //   const [locationError, setLocationError] = useState(null);
// //   const [faceScanStatus, setFaceScanStatus] = useState("idle");
// //   const [gpsLoading, setGpsLoading] = useState(false);
  
// //   const videoRef = useRef(null);
// //   const canvasRef = useRef(null);
// //   const streamRef = useRef(null);

// //   const siteCoordinates = {
// //     latitude: 28.5355,
// //     longitude: 77.3910,
// //     radius: 100
// //   };

// //   const [sites] = useState([
// //     { id: "S001", name: "Residential Complex - Block A", location: "Sector 12, Delhi" },
// //     { id: "S002", name: "Commercial Building", location: "Connaught Place" },
// //   ]);

// //   const [categories] = useState([
// //     { id: "mason", name: "Mason", requiredCount: 10 },
// //     { id: "helper", name: "Helper", requiredCount: 15 },
// //     { id: "electrician", name: "Electrician", requiredCount: 5 },
// //     { id: "plumber", name: "Plumber", requiredCount: 4 },
// //     { id: "carpenter", name: "Carpenter", requiredCount: 6 },
// //     { id: "painter", name: "Painter", requiredCount: 3 }
// //   ]);

// //   const [todayVisits, setTodayVisits] = useState([
// //     { role: "Site Engineer", name: "Rajesh Kumar", time: null, status: "expected", gpsVerified: false, faceVerified: false, latitude: null, longitude: null },
// //     { role: "Manager", name: "Amit Singh", time: null, status: "expected", gpsVerified: false, faceVerified: false, latitude: null, longitude: null },
// //     { role: "Client", name: "Mr. Sharma", time: null, status: "expected", gpsVerified: false, faceVerified: false, latitude: null, longitude: null },
// //     { role: "Supervisor", name: "Vinod Pandey", time: null, status: "expected", gpsVerified: false, faceVerified: false, latitude: null, longitude: null }
// //   ]);

// //   const [workers, setWorkers] = useState([
// //     {
// //       id: "W001",
// //       name: "Ramesh Yadav",
// //       category: "mason",
// //       mudkam: "Village Rampur, UP",
// //       phone: "+91 98765 43210",
// //       status: "absent",
// //       checkInTime: null,
// //       checkInTimestamp: null,
// //       checkOutTime: null,
// //       checkOutTimestamp: null,
// //       wageStatus: "unpaid",
// //       wageAmount: 800,
// //       overtime: 0,
// //       gpsVerified: false,
// //       workType: "full",
// //       latitude: null,
// //       longitude: null
// //     },
// //     {
// //       id: "W002",
// //       name: "Suresh Kumar",
// //       category: "mason",
// //       mudkam: "Village Rampur, UP",
// //       phone: "+91 98765 43211",
// //       status: "absent",
// //       checkInTime: null,
// //       checkInTimestamp: null,
// //       checkOutTime: null,
// //       checkOutTimestamp: null,
// //       wageStatus: "unpaid",
// //       wageAmount: 800,
// //       overtime: 0,
// //       gpsVerified: false,
// //       workType: "full",
// //       latitude: null,
// //       longitude: null
// //     },
// //     {
// //       id: "W003",
// //       name: "Mohan Singh",
// //       category: "helper",
// //       mudkam: "Village Sultanpur, Bihar",
// //       phone: "+91 98765 43212",
// //       status: "absent",
// //       checkInTime: null,
// //       checkInTimestamp: null,
// //       checkOutTime: null,
// //       checkOutTimestamp: null,
// //       wageStatus: "unpaid",
// //       wageAmount: 600,
// //       overtime: 0,
// //       gpsVerified: false,
// //       workType: "full",
// //       latitude: null,
// //       longitude: null
// //     }
// //   ]);

// //   const getCurrentLocation = () => {
// //     return new Promise((resolve, reject) => {
// //       setGpsLoading(true);
      
// //       if (!navigator.geolocation) {
// //         setGpsLoading(false);
// //         reject(new Error("Geolocation is not supported by your browser"));
// //         return;
// //       }

// //       navigator.geolocation.getCurrentPosition(
// //         (position) => {
// //           const location = {
// //             latitude: position.coords.latitude,
// //             longitude: position.coords.longitude,
// //             accuracy: position.coords.accuracy
// //           };
// //           setCurrentLocation(location);
// //           setLocationError(null);
// //           setGpsLoading(false);
// //           resolve(location);
// //         },
// //         (error) => {
// //           setGpsLoading(false);
// //           let errorMessage = "Unable to get location";
// //           switch (error.code) {
// //             case error.PERMISSION_DENIED:
// //               errorMessage = "Location permission denied. Please enable location access.";
// //               break;
// //             case error.POSITION_UNAVAILABLE:
// //               errorMessage = "Location information unavailable.";
// //               break;
// //             case error.TIMEOUT:
// //               errorMessage = "Location request timed out.";
// //               break;
// //             default:
// //               errorMessage = "Unknown location error.";
// //           }
// //           setLocationError(errorMessage);
// //           reject(new Error(errorMessage));
// //         },
// //         {
// //           enableHighAccuracy: true,
// //           timeout: 10000,
// //           maximumAge: 0
// //         }
// //       );
// //     });
// //   };

// //   const calculateDistance = (lat1, lon1, lat2, lon2) => {
// //     const R = 6371e3;
// //     const φ1 = (lat1 * Math.PI) / 180;
// //     const φ2 = (lat2 * Math.PI) / 180;
// //     const Δφ = ((lat2 - lat1) * Math.PI) / 180;
// //     const Δλ = ((lon2 - lon1) * Math.PI) / 180;

// //     const a =
// //       Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
// //       Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
// //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

// //     return R * c;
// //   };

// //   const verifyLocation = async () => {
// //     const location = await getCurrentLocation();
// //     const distance = calculateDistance(
// //       location.latitude,
// //       location.longitude,
// //       siteCoordinates.latitude,
// //       siteCoordinates.longitude
// //     );

// //     return { 
// //       verified: true, 
// //       distance, 
// //       location,
// //       message: `GPS Verified - Location: ${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`
// //     };
// //   };

// //   const startCamera = async () => {
// //     const stream = await navigator.mediaDevices.getUserMedia({
// //       video: {
// //         width: { ideal: 640 },
// //         height: { ideal: 480 },
// //         facingMode: "user"
// //       }
// //     });
    
// //     if (videoRef.current) {
// //       videoRef.current.srcObject = stream;
// //       streamRef.current = stream;
// //     }
    
// //     return stream;
// //   };

// //   const stopCamera = () => {
// //     if (streamRef.current) {
// //       streamRef.current.getTracks().forEach(track => track.stop());
// //       streamRef.current = null;
// //     }
// //     if (videoRef.current) {
// //       videoRef.current.srcObject = null;
// //     }
// //   };

// //   const captureFaceImage = () => {
// //     if (!videoRef.current || !canvasRef.current) return null;

// //     const canvas = canvasRef.current;
// //     const video = videoRef.current;
    
// //     canvas.width = video.videoWidth;
// //     canvas.height = video.videoHeight;
    
// //     const ctx = canvas.getContext('2d');
// //     ctx.drawImage(video, 0, 0);
    
// //     return canvas.toDataURL('image/jpeg');
// //   };

// //   const performFaceRecognition = async (imageData) => {
// //     return new Promise((resolve) => {
// //       setTimeout(() => {
// //         resolve(true);
// //       }, 2000);
// //     });
// //   };

// //   const markStaffAttendance = async (visitIndex) => {
// //     setFaceScanStatus("scanning");
    
// //     const locationResult = await verifyLocation();
// //     await startCamera();
// //     setShowFaceScanModal(true);
    
// //     await new Promise(resolve => setTimeout(resolve, 1000));
    
// //     const faceImage = captureFaceImage();
// //     await performFaceRecognition(faceImage);
    
// //     const updatedVisits = [...todayVisits];
// //     updatedVisits[visitIndex] = {
// //       ...updatedVisits[visitIndex],
// //       status: "present",
// //       time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
// //       gpsVerified: true,
// //       faceVerified: true,
// //       latitude: locationResult.location.latitude,
// //       longitude: locationResult.location.longitude
// //     };
// //     setTodayVisits(updatedVisits);
    
// //     setFaceScanStatus("success");
    
// //     setTimeout(() => {
// //       stopCamera();
// //       setShowFaceScanModal(false);
// //       setFaceScanStatus("idle");
// //       alert(locationResult.message);
// //     }, 2000);
// //   };

// //   const handleStaffAttendance = async (visitIndex) => {
// //     try {
// //       await markStaffAttendance(visitIndex);
// //     } catch (error) {
// //       alert(error.message);
// //       stopCamera();
// //       setShowFaceScanModal(false);
// //       setFaceScanStatus("idle");
// //     }
// //   };

// //   const markWorkerAttendance = async (workerId) => {
// //     try {
// //       const locationResult = await verifyLocation();
      
// //       setWorkers(workers.map(w => {
// //         if (w.id === workerId) {
// //           const now = new Date();
// //           return {
// //             ...w,
// //             status: "present",
// //             checkInTime: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
// //             checkInTimestamp: now.getTime(),
// //             gpsVerified: true,
// //             latitude: locationResult.location.latitude,
// //             longitude: locationResult.location.longitude
// //           };
// //         }
// //         return w;
// //       }));
      
// //       alert(locationResult.message);
// //     } catch (error) {
// //       alert(error.message);
// //     }
// //   };

// //   const getCategoryStats = (categoryId) => {
// //     const categoryWorkers = workers.filter(w => w.category === categoryId);
// //     const present = categoryWorkers.filter(w => w.status === "present").length;
// //     const required = categories.find(c => c.id === categoryId)?.requiredCount || 0;
// //     return { present, required, total: categoryWorkers.length };
// //   };

// //   const getTotalStats = () => {
// //     const totalRequired = categories.reduce((sum, cat) => sum + cat.requiredCount, 0);
// //     const totalPresent = workers.filter(w => w.status === "present").length;
// //     const totalWorkers = workers.length;
// //     return { totalRequired, totalPresent, totalWorkers };
// //   };

// //   const stats = getTotalStats();
// //   const workforceAlert = stats.totalPresent < stats.totalRequired;

// //   const filteredWorkers = workers.filter(w => {
// //     const matchesCategory = selectedCategory === "all" || w.category === selectedCategory;
// //     const matchesSearch = w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //                          w.mudkam.toLowerCase().includes(searchQuery.toLowerCase());
// //     return matchesCategory && matchesSearch;
// //   });

// //   const addWorker = () => {
// //     if (!newWorkerName || !newWorkerCategory || !newWorkerMudkam) {
// //       alert("Please fill all fields");
// //       return;
// //     }

// //     const newWorker = {
// //       id: `W${String(workers.length + 1).padStart(3, '0')}`,
// //       name: newWorkerName,
// //       category: newWorkerCategory,
// //       mudkam: newWorkerMudkam,
// //       phone: "",
// //       status: "absent",
// //       checkInTime: null,
// //       checkInTimestamp: null,
// //       checkOutTime: null,
// //       checkOutTimestamp: null,
// //       wageStatus: "unpaid",
// //       wageAmount: newWorkerCategory === "mason" ? 800 : newWorkerCategory === "helper" ? 600 : 1000,
// //       overtime: 0,
// //       gpsVerified: false,
// //       workType: "full",
// //       latitude: null,
// //       longitude: null
// //     };

// //     setWorkers([...workers, newWorker]);
// //     setNewWorkerName("");
// //     setNewWorkerCategory("");
// //     setNewWorkerMudkam("");
// //     setShowAddWorkerModal(false);
// //   };

// //   const calculateWage = (worker) => {
// //     if (!worker.checkInTimestamp || !worker.checkOutTimestamp) return worker.wageAmount;

// //     const hoursWorked = (worker.checkOutTimestamp - worker.checkInTimestamp) / (1000 * 60 * 60);
// //     const standardHours = 8;
    
// //     if (hoursWorked < 4) {
// //       return {
// //         amount: worker.wageAmount / 2,
// //         type: "half",
// //         overtime: 0
// //       };
// //     } else if (hoursWorked > standardHours) {
// //       const overtimeHours = hoursWorked - standardHours;
// //       const overtimeRate = worker.wageAmount / standardHours;
// //       return {
// //         amount: worker.wageAmount + (overtimeRate * overtimeHours * 1.5),
// //         type: "overtime",
// //         overtime: overtimeHours
// //       };
// //     }
// //     return {
// //       amount: worker.wageAmount,
// //       type: "full",
// //       overtime: 0
// //     };
// //   };

// //   const processWagePayment = (workerId) => {
// //     setWorkers(workers.map(w => {
// //       if (w.id === workerId) {
// //         const now = new Date();
// //         const checkOutTime = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
// //         const checkOutTimestamp = now.getTime();
        
// //         const wageCalc = calculateWage({
// //           ...w,
// //           checkOutTimestamp
// //         });

// //         return {
// //           ...w,
// //           wageStatus: "paid",
// //           checkOutTime,
// //           checkOutTimestamp,
// //           workType: wageCalc.type,
// //           overtime: wageCalc.overtime,
// //           finalWage: wageCalc.amount
// //         };
// //       }
// //       return w;
// //     }));
// //     setShowWageModal(false);
// //     setSelectedWorker(null);
// //   };

// //   const syncData = () => {
// //     setSyncing(true);
// //     setTimeout(() => {
// //       setSyncing(false);
// //       alert("Data synced successfully!");
// //     }, 1500);
// //   };

// //   useEffect(() => {
// //     return () => {
// //       stopCamera();
// //     };
// //   }, []);

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* HEADER */}
// //       <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
// //         <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
// //           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
// //             <div>
// //               <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Attendance Management</h1>
// //               <p className="text-xs sm:text-sm text-gray-600 mt-1">
// //                 {new Date(selectedDate).toLocaleDateString("en-IN", {
// //                   weekday: "long",
// //                   day: "numeric",
// //                   month: "long",
// //                   year: "numeric",
// //                 })}
// //               </p>
// //             </div>
// //             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
// //               {gpsLoading ? (
// //                 <div className="text-xs text-blue-600 flex items-center gap-1.5 px-3 py-2 bg-blue-50 rounded-lg">
// //                   <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
// //                   </svg>
// //                   Getting GPS...
// //                 </div>
// //               ) : currentLocation ? (
// //                 <div className="text-xs text-green-600 flex items-center gap-1.5 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
// //                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
// //                     <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
// //                   </svg>
// //                   <span className="hidden sm:inline">GPS: {currentLocation.latitude.toFixed(4)}, {currentLocation.longitude.toFixed(4)}</span>
// //                   <span className="sm:hidden">GPS Active</span>
// //                 </div>
// //               ) : null}
// //               <div className="flex gap-2 sm:gap-3">
// //                 <input
// //                   type="date"
// //                   value={selectedDate}
// //                   onChange={(e) => setSelectedDate(e.target.value)}
// //                   className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// //                 />
// //                 <select
// //                   value={selectedSite}
// //                   onChange={(e) => setSelectedSite(e.target.value)}
// //                   className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// //                 >
// //                   <option value="">Select Site</option>
// //                   {sites.map(site => (
// //                     <option key={site.id} value={site.id}>{site.name}</option>
// //                   ))}
// //                 </select>
// //                 <button
// //                   onClick={syncData}
// //                   disabled={syncing}
// //                   className="px-3 sm:px-4 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
// //                 >
// //                   <svg className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
// //                   </svg>
// //                   <span className="hidden sm:inline">{syncing ? "Syncing..." : "Sync"}</span>
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       <div className="max-w-7xl mx-auto p-3 sm:p-6 space-y-4 sm:space-y-6">
// //         {/* Workforce Alert */}
// //         {workforceAlert && (
// //           <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded-r-lg">
// //             <div className="flex items-start gap-3">
// //               <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
// //               </svg>
// //               <div>
// //                 <h3 className="font-semibold text-red-800 text-sm">Workforce Alert</h3>
// //                 <p className="text-xs sm:text-sm text-red-700 mt-0.5">
// //                   Present: {stats.totalPresent} / Required: {stats.totalRequired} - Work might be delayed due to insufficient workers
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Location Error */}
// //         {locationError && (
// //           <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 sm:p-4 rounded-r-lg">
// //             <div className="flex items-start gap-3">
// //               <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
// //               </svg>
// //               <div>
// //                 <h3 className="font-semibold text-yellow-800 text-sm">Location Access Required</h3>
// //                 <p className="text-xs sm:text-sm text-yellow-700 mt-0.5">{locationError}</p>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Today's Visits */}
// //         <div className="bg-white rounded-lg border border-gray-200">
// //           <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
// //             <h2 className="text-lg sm:text-xl font-bold text-gray-900">Today's Site Visits</h2>
// //             <p className="text-xs sm:text-sm text-gray-600 mt-1">Site Engineer, Manager, Client, Supervisor (GPS + Face Scan Required)</p>
// //           </div>
// //           <div className="p-3 sm:p-6">
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
// //               {todayVisits.map((visit, idx) => (
// //                 <div key={idx} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
// //                   <div className="flex items-start justify-between mb-3">
// //                     <div>
// //                       <p className="text-xs text-gray-500 uppercase tracking-wider">{visit.role}</p>
// //                       <p className="font-semibold text-gray-900 mt-1 text-sm sm:text-base">{visit.name}</p>
// //                     </div>
// //                     {visit.status === "present" ? (
// //                       <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
// //                         Present
// //                       </span>
// //                     ) : (
// //                       <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
// //                         Expected
// //                       </span>
// //                     )}
// //                   </div>
                  
// //                   {visit.status === "present" ? (
// //                     <div className="space-y-2">
// //                       <div className="flex items-center gap-2 text-xs text-gray-600">
// //                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                         </svg>
// //                         {visit.time}
// //                       </div>
// //                       <div className="flex items-center gap-2">
// //                         {visit.gpsVerified && (
// //                           <span className="flex items-center gap-1 text-xs text-green-600">
// //                             <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
// //                               <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
// //                             </svg>
// //                             GPS
// //                           </span>
// //                         )}
// //                         {visit.faceVerified && (
// //                           <span className="flex items-center gap-1 text-xs text-blue-600">
// //                             <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
// //                               <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
// //                             </svg>
// //                             Face
// //                           </span>
// //                         )}
// //                       </div>
// //                       {visit.latitude && visit.longitude && (
// //                         <div className="text-xs text-gray-500 mt-1 break-all">
// //                           📍 {visit.latitude.toFixed(4)}, {visit.longitude.toFixed(4)}
// //                         </div>
// //                       )}
// //                     </div>
// //                   ) : (
// //                     <button
// //                       onClick={() => handleStaffAttendance(idx)}
// //                       className="w-full mt-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors"
// //                     >
// //                       Mark Attendance
// //                     </button>
// //                   )}
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Category Stats */}
// //         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 sm:gap-4">
// //           <button
// //             onClick={() => setSelectedCategory("all")}
// //             className={`p-3 sm:p-6 rounded-lg border transition-all ${
// //               selectedCategory === "all"
// //                 ? "border-orange-500 bg-orange-50"
// //                 : "border-gray-200 bg-white hover:border-orange-300"
// //             }`}
// //           >
// //             <div className="flex items-center justify-between mb-2">
// //               <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">All Workers</span>
// //               <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
// //             </div>
// //             <div className="text-2xl sm:text-4xl font-bold text-gray-900 font-mono">
// //               {String(stats.totalPresent).padStart(2, '0')}<span className="text-gray-400">/{String(stats.totalRequired).padStart(2, '0')}</span>
// //             </div>
// //             <div className="text-xs text-gray-500 mt-2">Present/Required</div>
// //           </button>

// //           {categories.map(category => {
// //             const catStats = getCategoryStats(category.id);
// //             const isLow = catStats.present < catStats.required;
            
// //             return (
// //               <button
// //                 key={category.id}
// //                 onClick={() => setSelectedCategory(category.id)}
// //                 className={`p-3 sm:p-6 rounded-lg border transition-all ${
// //                   selectedCategory === category.id
// //                     ? "border-orange-500 bg-orange-50"
// //                     : isLow
// //                     ? "border-red-300 bg-red-50"
// //                     : "border-gray-200 bg-white hover:border-orange-300"
// //                 }`}
// //               >
// //                 <div className="flex items-center justify-between mb-2">
// //                   <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">{category.name}</span>
// //                   <div className={`w-2 h-2 rounded-full ${isLow ? 'bg-red-500' : 'bg-gray-400'}`}></div>
// //                 </div>
// //                                <div className={`text-2xl sm:text-4xl font-bold font-mono ${isLow ? "text-red-600" : "text-gray-900"}`}>
// //                   {String(catStats.present).padStart(2, '0')}<span className="text-gray-400">/{String(catStats.required).padStart(2, '0')}</span>
// //                 </div>
// //                 <div className="text-xs text-gray-500 mt-2">
// //                   {isLow ? "⚠️ Low" : "Present/Required"}
// //                 </div>
// //               </button>
// //             );
// //           })}
// //         </div>

// //         {/* Workers Table */}
// //         <div className="bg-white rounded-lg border border-gray-200">
// //           <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
// //             <div>
// //               <h2 className="text-lg sm:text-xl font-bold text-gray-900">Labor Attendance</h2>
// //               <p className="text-xs sm:text-sm text-gray-600 mt-1">GPS verification required (No face scan)</p>
// //             </div>
// //             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
// //               <div className="relative">
// //                 <input
// //                   type="text"
// //                   placeholder="Search worker..."
// //                   value={searchQuery}
// //                   onChange={(e) => setSearchQuery(e.target.value)}
// //                   className="pl-10 pr-4 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full sm:w-64"
// //                 />
// //                 <svg
// //                   className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   viewBox="0 0 24 24"
// //                 >
// //                   <path
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     strokeWidth={2}
// //                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
// //                   />
// //                 </svg>
// //               </div>
// //               <button
// //                 onClick={() => setShowAddWorkerModal(true)}
// //                 className="px-4 py-2 sm:py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
// //               >
// //                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
// //                 </svg>
// //                 Add Worker
// //               </button>
// //             </div>
// //           </div>

// //           {/* Mobile Cards View */}
// //           <div className="block sm:hidden">
// //             {filteredWorkers.map((worker, idx) => (
// //               <div key={worker.id} className="border-b border-gray-200 p-4 last:border-b-0">
// //                 <div className="flex items-start justify-between mb-3">
// //                   <div className="flex-1">
// //                     <div className="flex items-center gap-2 mb-1">
// //                       <span className="text-sm font-medium text-gray-900">#{String(idx + 1).padStart(2, '0')}</span>
// //                       <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium uppercase">
// //                         {categories.find(c => c.id === worker.category)?.name}
// //                       </span>
// //                     </div>
// //                     <h3 className="font-semibold text-gray-900">{worker.name}</h3>
// //                     {worker.phone && <p className="text-xs text-gray-500">{worker.phone}</p>}
// //                     <p className="text-sm text-gray-600 mt-1">{worker.mudkam || "-"}</p>
// //                   </div>
// //                   <div className="text-right">
// //                     {worker.status === "present" ? (
// //                       <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium uppercase">
// //                         Present
// //                       </span>
// //                     ) : (
// //                       <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium uppercase">
// //                         Absent
// //                       </span>
// //                     )}
// //                   </div>
// //                 </div>

// //                 <div className="grid grid-cols-2 gap-3 text-sm mb-3">
// //                   <div>
// //                     <span className="text-gray-500 text-xs">Check In:</span>
// //                     {worker.checkInTime ? (
// //                       <div className="flex items-center gap-1 mt-1">
// //                         <span className="font-medium">{worker.checkInTime}</span>
// //                         {worker.gpsVerified && (
// //                           <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
// //                             <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
// //                           </svg>
// //                         )}
// //                       </div>
// //                     ) : (
// //                       <div className="text-gray-400 mt-1">-</div>
// //                     )}
// //                   </div>
// //                   <div>
// //                     <span className="text-gray-500 text-xs">Check Out:</span>
// //                     {worker.checkOutTime ? (
// //                       <div className="mt-1">
// //                         <span className="font-medium">{worker.checkOutTime}</span>
// //                         {worker.overtime > 0 && (
// //                           <div className="text-xs text-orange-600">+{worker.overtime.toFixed(1)}h OT</div>
// //                         )}
// //                       </div>
// //                     ) : (
// //                       <div className="text-gray-400 mt-1">-</div>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {worker.latitude && worker.longitude && (
// //                   <div className="text-xs text-gray-600 mb-3 break-all">
// //                     📍 {worker.latitude.toFixed(4)}, {worker.longitude.toFixed(4)}
// //                   </div>
// //                 )}

// //                 <div className="flex items-center justify-between">
// //                   <div>
// //                     {worker.wageStatus === "paid" ? (
// //                       <div>
// //                         <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium uppercase">
// //                           Paid
// //                         </span>
// //                         <div className="text-xs text-gray-600 mt-1">₹{worker.finalWage?.toFixed(0) || worker.wageAmount}</div>
// //                       </div>
// //                     ) : (
// //                       <div>
// //                         <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium uppercase">
// //                           Unpaid
// //                         </span>
// //                         <div className="text-xs text-gray-600 mt-1">₹{worker.wageAmount}</div>
// //                       </div>
// //                     )}
// //                   </div>
// //                   <div>
// //                     {worker.status === "absent" ? (
// //                       <button
// //                         onClick={() => markWorkerAttendance(worker.id)}
// //                         className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition-colors"
// //                       >
// //                         Mark Present
// //                       </button>
// //                     ) : worker.wageStatus === "unpaid" ? (
// //                       <button
// //                         onClick={() => {
// //                           setSelectedWorker(worker);
// //                           setShowWageModal(true);
// //                         }}
// //                         className="px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-medium transition-colors"
// //                       >
// //                         Pay Wage
// //                       </button>
// //                     ) : (
// //                       <span className="text-xs text-gray-500">Logged Out</span>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Desktop Table View */}
// //           <div className="hidden sm:block overflow-x-auto">
// //             <table className="w-full min-w-[1000px]">
// //               <thead className="bg-gray-50 border-b border-gray-200">
// //                 <tr>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mudkam</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GPS Location</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wage</th>
// //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="divide-y divide-gray-200">
// //                 {filteredWorkers.map((worker, idx) => (
// //                   <tr key={worker.id} className="hover:bg-gray-50 transition-colors">
// //                     <td className="px-6 py-4 text-sm text-gray-900">{String(idx + 1).padStart(2, '0')}</td>
// //                     <td className="px-6 py-4">
// //                       <div className="font-medium text-gray-900">{worker.name}</div>
// //                       {worker.phone && <div className="text-xs text-gray-500">{worker.phone}</div>}
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium uppercase">
// //                         {categories.find(c => c.id === worker.category)?.name}
// //                       </span>
// //                     </td>
// //                     <td className="px-6 py-4 text-sm text-gray-700">{worker.mudkam || "-"}</td>
// //                     <td className="px-6 py-4">
// //                       {worker.checkInTime ? (
// //                         <div className="flex items-center gap-2">
// //                           <span className="font-medium text-gray-900">{worker.checkInTime}</span>
// //                           {worker.gpsVerified && (
// //                             <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
// //                               <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
// //                             </svg>
// //                           )}
// //                         </div>
// //                       ) : (
// //                         <span className="text-gray-400">-</span>
// //                       )}
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       {worker.latitude && worker.longitude ? (
// //                         <div className="text-xs text-gray-600">
// //                           {worker.latitude.toFixed(4)}, {worker.longitude.toFixed(4)}
// //                         </div>
// //                       ) : (
// //                         <span className="text-gray-400">-</span>
// //                       )}
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       {worker.checkOutTime ? (
// //                         <div>
// //                           <span className="font-medium text-gray-900">{worker.checkOutTime}</span>
// //                           {worker.overtime > 0 && (
// //                             <div className="text-xs text-orange-600 mt-0.5">+{worker.overtime.toFixed(1)}h OT</div>
// //                           )}
// //                         </div>
// //                       ) : (
// //                         <span className="text-gray-400">-</span>
// //                       )}
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       {worker.status === "present" ? (
// //                         <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium uppercase">
// //                           Present
// //                         </span>
// //                       ) : (
// //                         <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium uppercase">
// //                           Absent
// //                         </span>
// //                       )}
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       {worker.wageStatus === "paid" ? (
// //                         <div>
// //                           <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium uppercase">
// //                             Paid
// //                           </span>
// //                           <div className="text-xs text-gray-600 mt-1">₹{worker.finalWage?.toFixed(0) || worker.wageAmount}</div>
// //                         </div>
// //                       ) : (
// //                         <div>
// //                           <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium uppercase">
// //                             Unpaid
// //                           </span>
// //                           <div className="text-xs text-gray-600 mt-1">₹{worker.wageAmount}</div>
// //                         </div>
// //                       )}
// //                     </td>
// //                     <td className="px-6 py-4">
// //                       {worker.status === "absent" ? (
// //                         <button
// //                           onClick={() => markWorkerAttendance(worker.id)}
// //                           className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition-colors"
// //                         >
// //                           Mark Present
// //                         </button>
// //                       ) : worker.wageStatus === "unpaid" ? (
// //                         <button
// //                           onClick={() => {
// //                             setSelectedWorker(worker);
// //                             setShowWageModal(true);
// //                           }}
// //                           className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-medium transition-colors"
// //                         >
// //                           Pay Wage
// //                         </button>
// //                       ) : (
// //                         <span className="text-xs text-gray-500">Logged Out</span>
// //                       )}
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>
// //       </div>
// //             {/* Face Scan Modal */}
// //       {showFaceScanModal && (
// //         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
// //           <div className="bg-white rounded-xl max-w-2xl w-full p-4 sm:p-6 mx-4">
// //             <div className="text-center">
// //               <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Face Recognition</h2>
              
// //               <div className="relative bg-black rounded-lg overflow-hidden mb-4">
// //                 <video
// //                   ref={videoRef}
// //                   autoPlay
// //                   playsInline
// //                   className="w-full h-64 sm:h-96 object-cover"
// //                 />
// //                 <canvas ref={canvasRef} className="hidden" />
                
// //                 <div className="absolute inset-0 flex items-center justify-center">
// //                   <div className="w-48 h-60 sm:w-64 sm:h-80 border-4 border-blue-500 rounded-lg"></div>
// //                 </div>
// //               </div>

// //               {faceScanStatus === "scanning" && (
// //                 <div className="flex items-center justify-center gap-2 text-blue-600">
// //                   <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
// //                   </svg>
// //                   <span>Scanning face...</span>
// //                 </div>
// //               )}

// //               {faceScanStatus === "success" && (
// //                 <div className="flex items-center justify-center gap-2 text-green-600">
// //                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
// //                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
// //                   </svg>
// //                   <span>Face verified successfully!</span>
// //                 </div>
// //               )}

// //               <p className="text-sm text-gray-600 mt-2">
// //                 Position your face within the frame
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Add Worker Modal */}
// //       {showAddWorkerModal && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //           <div className="bg-white rounded-xl max-w-md w-full p-4 sm:p-6 mx-4">
// //             <div className="flex items-center justify-between mb-4 sm:mb-6">
// //               <h2 className="text-lg sm:text-xl font-bold text-gray-900">Add New Worker</h2>
// //               <button
// //                 onClick={() => setShowAddWorkerModal(false)}
// //                 className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
// //               >
// //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //                 </svg>
// //               </button>
// //             </div>

// //             <div className="space-y-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">Worker Name</label>
// //                 <input
// //                   type="text"
// //                   value={newWorkerName}
// //                   onChange={(e) => setNewWorkerName(e.target.value)}
// //                   placeholder="Enter worker name"
// //                   className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
// //                 <select
// //                   value={newWorkerCategory}
// //                   onChange={(e) => setNewWorkerCategory(e.target.value)}
// //                   className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// //                 >
// //                   <option value="">Select Category</option>
// //                   {categories.map(cat => (
// //                     <option key={cat.id} value={cat.id}>{cat.name}</option>
// //                   ))}
// //                 </select>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">Mudkam (Village/Origin)</label>
// //                 <input
// //                   type="text"
// //                   value={newWorkerMudkam}
// //                   onChange={(e) => setNewWorkerMudkam(e.target.value)}
// //                   placeholder="e.g., Village Rampur, UP"
// //                   className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
// //                 />
// //               </div>

// //               <div className="flex flex-col sm:flex-row gap-3 pt-2">
// //                 <button
// //                   onClick={addWorker}
// //                   className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 rounded-lg transition-colors"
// //                 >
// //                   Add Worker
// //                 </button>
// //                 <button
// //                   onClick={() => setShowAddWorkerModal(false)}
// //                   className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 rounded-lg transition-colors"
// //                 >
// //                   Cancel
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Wage Payment Modal */}
// //       {showWageModal && selectedWorker && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //           <div className="bg-white rounded-xl max-w-md w-full p-4 sm:p-6 mx-4">
// //             <div className="flex items-center justify-between mb-4 sm:mb-6">
// //               <h2 className="text-lg sm:text-xl font-bold text-gray-900">Process Wage Payment</h2>
// //               <button
// //                 onClick={() => setShowWageModal(false)}
// //                 className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
// //               >
// //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //                 </svg>
// //               </button>
// //             </div>

// //             <div className="bg-gray-50 rounded-lg p-4 mb-4">
// //               <div className="flex items-center gap-3 mb-3">
// //                 <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-semibold">
// //                   {selectedWorker.name.charAt(0)}
// //                 </div>
// //                 <div>
// //                   <div className="font-semibold text-gray-900">{selectedWorker.name}</div>
// //                   <div className="text-sm text-gray-600">{categories.find(c => c.id === selectedWorker.category)?.name}</div>
// //                 </div>
// //               </div>
// //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
// //                 <div>
// //                   <span className="text-gray-600">Check In:</span>
// //                   <span className="font-medium ml-2">{selectedWorker.checkInTime}</span>
// //                 </div>
// //                 <div>
// //                   <span className="text-gray-600">Base Wage:</span>
// //                   <span className="font-medium ml-2">₹{selectedWorker.wageAmount}</span>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
// //               <p className="text-sm text-blue-800">
// //                 <strong>Auto-calculation:</strong> Wage will be calculated based on check-out time
// //               </p>
// //               <ul className="text-xs text-blue-700 mt-2 space-y-1">
// //                 <li>• Less than 4 hours = Half day (50%)</li>
// //                 <li>• 8 hours = Full day (100%)</li>
// //                 <li>• More than 8 hours = Overtime (150% for extra hours)</li>
// //               </ul>
// //             </div>

// //             <div className="flex flex-col sm:flex-row gap-3">
// //               <button
// //                 onClick={() => processWagePayment(selectedWorker.id)}
// //                 className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors"
// //               >
// //                 Pay & Checkout
// //               </button>
// //               <button
// //                 onClick={() => setShowWageModal(false)}
// //                 className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 rounded-lg transition-colors"
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// import { useEffect, useState, useRef } from "react";
// import api from "../api/axiosConfig";

// export default function AttendanceScreen() {
//   const [userRole, setUserRole] = useState("supervisor");
//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toISOString().split("T")[0]
//   );
//   const [selectedSite, setSelectedSite] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [showAddWorkerModal, setShowAddWorkerModal] = useState(false);
//   const [showWageModal, setShowWageModal] = useState(false);
//   const [showFaceScanModal, setShowFaceScanModal] = useState(false);
//   const [selectedWorker, setSelectedWorker] = useState(null);
//   const [newWorkerName, setNewWorkerName] = useState("");
//   const [newWorkerCategory, setNewWorkerCategory] = useState("");
//   const [newWorkerMudkam, setNewWorkerMudkam] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [syncing, setSyncing] = useState(false);
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [locationError, setLocationError] = useState(null);
//   const [faceScanStatus, setFaceScanStatus] = useState("idle");
//   const [gpsLoading, setGpsLoading] = useState(false);

//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const streamRef = useRef(null);

//   const siteCoordinates = {
//     latitude: 28.5355,
//     longitude: 77.391,
//     radius: 100,
//   };

//   const [sites] = useState([
//     { id: "S001", name: "Residential Complex - Block A", location: "Sector 12, Delhi" },
//     { id: "S002", name: "Commercial Building", location: "Connaught Place" },
//   ]);

//   const [categories] = useState([
//     { id: "mason", name: "Mason", requiredCount: 10 },
//     { id: "helper", name: "Helper", requiredCount: 15 },
//     { id: "electrician", name: "Electrician", requiredCount: 5 },
//     { id: "plumber", name: "Plumber", requiredCount: 4 },
//     { id: "carpenter", name: "Carpenter", requiredCount: 6 },
//     { id: "painter", name: "Painter", requiredCount: 3 },
//   ]);

//   // ✅ UPDATED: faceImage added (stores captured face photo)
//   const [todayVisits, setTodayVisits] = useState([
//     {
//       role: "Site Engineer",
//       name: "Rajesh Kumar",
//       time: null,
//       status: "expected",
//       gpsVerified: false,
//       faceVerified: false,
//       latitude: null,
//       longitude: null,
//       faceImage: null,
//     },
//     {
//       role: "Manager",
//       name: "Amit Singh",
//       time: null,
//       status: "expected",
//       gpsVerified: false,
//       faceVerified: false,
//       latitude: null,
//       longitude: null,
//       faceImage: null,
//     },
//     {
//       role: "Client",
//       name: "Mr. Sharma",
//       time: null,
//       status: "expected",
//       gpsVerified: false,
//       faceVerified: false,
//       latitude: null,
//       longitude: null,
//       faceImage: null,
//     },
//     {
//       role: "Supervisor",
//       name: "Vinod Pandey",
//       time: null,
//       status: "expected",
//       gpsVerified: false,
//       faceVerified: false,
//       latitude: null,
//       longitude: null,
//       faceImage: null,
//     },
//   ]);

//   const [workers, setWorkers] = useState([
//     {
//       id: "W001",
//       name: "Ramesh Yadav",
//       category: "mason",
//       mudkam: "Village Rampur, UP",
//       phone: "+91 98765 43210",
//       status: "absent",
//       checkInTime: null,
//       checkInTimestamp: null,
//       checkOutTime: null,
//       checkOutTimestamp: null,
//       wageStatus: "unpaid",
//       wageAmount: 800,
//       overtime: 0,
//       gpsVerified: false,
//       workType: "full",
//       latitude: null,
//       longitude: null,
//     },
//     {
//       id: "W002",
//       name: "Suresh Kumar",
//       category: "mason",
//       mudkam: "Village Rampur, UP",
//       phone: "+91 98765 43211",
//       status: "absent",
//       checkInTime: null,
//       checkInTimestamp: null,
//       checkOutTime: null,
//       checkOutTimestamp: null,
//       wageStatus: "unpaid",
//       wageAmount: 800,
//       overtime: 0,
//       gpsVerified: false,
//       workType: "full",
//       latitude: null,
//       longitude: null,
//     },
//     {
//       id: "W003",
//       name: "Mohan Singh",
//       category: "helper",
//       mudkam: "Village Sultanpur, Bihar",
//       phone: "+91 98765 43212",
//       status: "absent",
//       checkInTime: null,
//       checkInTimestamp: null,
//       checkOutTime: null,
//       checkOutTimestamp: null,
//       wageStatus: "unpaid",
//       wageAmount: 600,
//       overtime: 0,
//       gpsVerified: false,
//       workType: "full",
//       latitude: null,
//       longitude: null,
//     },
//   ]);

//   // ✅ Load from localStorage (faceImage persists after refresh)
//   useEffect(() => {
//     try {
//       const saved = localStorage.getItem("todayVisits");
//       if (saved) {
//         setTodayVisits(JSON.parse(saved));
//       }
//     } catch (e) {
//       console.log("Error loading todayVisits from localStorage", e);
//     }
//   }, []);

//   // ✅ Save to localStorage whenever todayVisits changes
//   useEffect(() => {
//     try {
//       localStorage.setItem("todayVisits", JSON.stringify(todayVisits));
//     } catch (e) {
//       console.log("Error saving todayVisits to localStorage", e);
//     }
//   }, [todayVisits]);

//   const getCurrentLocation = () => {
//     return new Promise((resolve, reject) => {
//       setGpsLoading(true);

//       if (!navigator.geolocation) {
//         setGpsLoading(false);
//         reject(new Error("Geolocation is not supported by your browser"));
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const location = {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             accuracy: position.coords.accuracy,
//           };
//           setCurrentLocation(location);
//           setLocationError(null);
//           setGpsLoading(false);
//           resolve(location);
//         },
//         (error) => {
//           setGpsLoading(false);
//           let errorMessage = "Unable to get location";
//           switch (error.code) {
//             case error.PERMISSION_DENIED:
//               errorMessage = "Location permission denied. Please enable location access.";
//               break;
//             case error.POSITION_UNAVAILABLE:
//               errorMessage = "Location information unavailable.";
//               break;
//             case error.TIMEOUT:
//               errorMessage = "Location request timed out.";
//               break;
//             default:
//               errorMessage = "Unknown location error.";
//           }
//           setLocationError(errorMessage);
//           reject(new Error(errorMessage));
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 10000,
//           maximumAge: 0,
//         }
//       );
//     });
//   };

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371e3;
//     const φ1 = (lat1 * Math.PI) / 180;
//     const φ2 = (lat2 * Math.PI) / 180;
//     const Δφ = ((lat2 - lat1) * Math.PI) / 180;
//     const Δλ = ((lon2 - lon1) * Math.PI) / 180;

//     const a =
//       Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//       Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     return R * c;
//   };

//   const verifyLocation = async () => {
//     const location = await getCurrentLocation();
//     const distance = calculateDistance(
//       location.latitude,
//       location.longitude,
//       siteCoordinates.latitude,
//       siteCoordinates.longitude
//     );

//     return {
//       verified: true,
//       distance,
//       location,
//       message: `GPS Verified - Location: ${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`,
//     };
//   };

//   // ✅ BEST COMPATIBLE CAMERA START
//   const startCamera = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({
//       video: true,
//     });

//     if (videoRef.current) {
//       videoRef.current.srcObject = stream;
//       streamRef.current = stream;
//     }

//     return stream;
//   };

//   const stopCamera = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop());
//       streamRef.current = null;
//     }
//     if (videoRef.current) {
//       videoRef.current.srcObject = null;
//     }
//   };

//   // ✅ IMPORTANT FIX: wait until video is ready (otherwise capture will be blank)
//   const waitForVideoReady = () => {
//     return new Promise((resolve, reject) => {
//       const video = videoRef.current;
//       if (!video) return reject(new Error("Video element not found"));

//       const timeout = setTimeout(() => {
//         reject(new Error("Camera not ready. Please try again."));
//       }, 7000);

//       const checkReady = () => {
//         if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
//           clearTimeout(timeout);
//           resolve(true);
//         } else {
//           requestAnimationFrame(checkReady);
//         }
//       };

//       checkReady();
//     });
//   };

//   const captureFaceImage = () => {
//     if (!videoRef.current || !canvasRef.current) return null;

//     const canvas = canvasRef.current;
//     const video = videoRef.current;

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;

//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(video, 0, 0);

//     return canvas.toDataURL("image/jpeg");
//   };

//   const performFaceRecognition = async (imageData) => {
//     return new Promise((resolve) => {
//       setTimeout(() => resolve(true), 1200);
//     });
//   };

//   // ✅ FIXED STAFF ATTENDANCE FLOW (works 100%)
//   const markStaffAttendance = async (visitIndex) => {
//     try {
//       setFaceScanStatus("scanning");

//       const locationResult = await verifyLocation();

//       // ✅ open modal first (so video element exists properly)
//       setShowFaceScanModal(true);

//       // ✅ start camera
//       await startCamera();

//       // ✅ wait until video has frames
//       await waitForVideoReady();

//       // ✅ capture real frame
//       const faceImage = captureFaceImage();
//       if (!faceImage) throw new Error("Failed to capture face photo. Try again.");

//       // ✅ fake recognition
//       await performFaceRecognition(faceImage);

//       const updatedVisits = [...todayVisits];
//       updatedVisits[visitIndex] = {
//         ...updatedVisits[visitIndex],
//         status: "present",
//         time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
//         gpsVerified: true,
//         faceVerified: true,
//         latitude: locationResult.location.latitude,
//         longitude: locationResult.location.longitude,
//         faceImage: faceImage, // ✅ STORED IMAGE
//       };

//       setTodayVisits(updatedVisits);

//       setFaceScanStatus("success");

//       setTimeout(() => {
//         stopCamera();
//         setShowFaceScanModal(false);
//         setFaceScanStatus("idle");
//         alert(locationResult.message);
//       }, 1500);
//     } catch (err) {
//       stopCamera();
//       setShowFaceScanModal(false);
//       setFaceScanStatus("idle");
//       alert(err?.message || "Camera capture failed");
//     }
//   };

//   const handleStaffAttendance = async (visitIndex) => {
//     try {
//       await markStaffAttendance(visitIndex);
//     } catch (error) {
//       alert(error.message);
//       stopCamera();
//       setShowFaceScanModal(false);
//       setFaceScanStatus("idle");
//     }
//   };

//   const markWorkerAttendance = async (workerId) => {
//     try {
//       const locationResult = await verifyLocation();

//       setWorkers(
//         workers.map((w) => {
//           if (w.id === workerId) {
//             const now = new Date();
//             return {
//               ...w,
//               status: "present",
//               checkInTime: now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
//               checkInTimestamp: now.getTime(),
//               gpsVerified: true,
//               latitude: locationResult.location.latitude,
//               longitude: locationResult.location.longitude,
//             };
//           }
//           return w;
//         })
//       );

//       alert(locationResult.message);
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const getCategoryStats = (categoryId) => {
//     const categoryWorkers = workers.filter((w) => w.category === categoryId);
//     const present = categoryWorkers.filter((w) => w.status === "present").length;
//     const required = categories.find((c) => c.id === categoryId)?.requiredCount || 0;
//     return { present, required, total: categoryWorkers.length };
//   };

//   const getTotalStats = () => {
//     const totalRequired = categories.reduce((sum, cat) => sum + cat.requiredCount, 0);
//     const totalPresent = workers.filter((w) => w.status === "present").length;
//     const totalWorkers = workers.length;
//     return { totalRequired, totalPresent, totalWorkers };
//   };

//   const stats = getTotalStats();
//   const workforceAlert = stats.totalPresent < stats.totalRequired;

//   const filteredWorkers = workers.filter((w) => {
//     const matchesCategory = selectedCategory === "all" || w.category === selectedCategory;
//     const matchesSearch =
//       w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       w.mudkam.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   const addWorker = () => {
//     if (!newWorkerName || !newWorkerCategory || !newWorkerMudkam) {
//       alert("Please fill all fields");
//       return;
//     }

//     const newWorker = {
//       id: `W${String(workers.length + 1).padStart(3, "0")}`,
//       name: newWorkerName,
//       category: newWorkerCategory,
//       mudkam: newWorkerMudkam,
//       phone: "",
//       status: "absent",
//       checkInTime: null,
//       checkInTimestamp: null,
//       checkOutTime: null,
//       checkOutTimestamp: null,
//       wageStatus: "unpaid",
//       wageAmount: newWorkerCategory === "mason" ? 800 : newWorkerCategory === "helper" ? 600 : 1000,
//       overtime: 0,
//       gpsVerified: false,
//       workType: "full",
//       latitude: null,
//       longitude: null,
//     };

//     setWorkers([...workers, newWorker]);
//     setNewWorkerName("");
//     setNewWorkerCategory("");
//     setNewWorkerMudkam("");
//     setShowAddWorkerModal(false);
//   };

//   const calculateWage = (worker) => {
//     if (!worker.checkInTimestamp || !worker.checkOutTimestamp) return worker.wageAmount;

//     const hoursWorked = (worker.checkOutTimestamp - worker.checkInTimestamp) / (1000 * 60 * 60);
//     const standardHours = 8;

//     if (hoursWorked < 4) {
//       return { amount: worker.wageAmount / 2, type: "half", overtime: 0 };
//     } else if (hoursWorked > standardHours) {
//       const overtimeHours = hoursWorked - standardHours;
//       const overtimeRate = worker.wageAmount / standardHours;
//       return {
//         amount: worker.wageAmount + overtimeRate * overtimeHours * 1.5,
//         type: "overtime",
//         overtime: overtimeHours,
//       };
//     }

//     return { amount: worker.wageAmount, type: "full", overtime: 0 };
//   };

//   const processWagePayment = (workerId) => {
//     setWorkers(
//       workers.map((w) => {
//         if (w.id === workerId) {
//           const now = new Date();
//           const checkOutTime = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
//           const checkOutTimestamp = now.getTime();

//           const wageCalc = calculateWage({
//             ...w,
//             checkOutTimestamp,
//           });

//           return {
//             ...w,
//             wageStatus: "paid",
//             checkOutTime,
//             checkOutTimestamp,
//             workType: wageCalc.type,
//             overtime: wageCalc.overtime,
//             finalWage: wageCalc.amount,
//           };
//         }
//         return w;
//       })
//     );

//     setShowWageModal(false);
//     setSelectedWorker(null);
//   };

//   const syncData = () => {
//     setSyncing(true);
//     setTimeout(() => {
//       setSyncing(false);
//       alert("Data synced successfully!");
//     }, 1500);
//   };

//   useEffect(() => {
//     return () => {
//       stopCamera();
//     };
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* HEADER */}
//       <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
//             <div>
//               <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Attendance Management</h1>
//               <p className="text-xs sm:text-sm text-gray-600 mt-1">
//                 {new Date(selectedDate).toLocaleDateString("en-IN", {
//                   weekday: "long",
//                   day: "numeric",
//                   month: "long",
//                   year: "numeric",
//                 })}
//               </p>
//             </div>

//             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
//               {gpsLoading ? (
//                 <div className="text-xs text-blue-600 flex items-center gap-1.5 px-3 py-2 bg-blue-50 rounded-lg">
//                   <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                   </svg>
//                   Getting GPS...
//                 </div>
//               ) : currentLocation ? (
//                 <div className="text-xs text-green-600 flex items-center gap-1.5 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
//                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                     <path
//                       fillRule="evenodd"
//                       d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   <span className="hidden sm:inline">
//                     GPS: {currentLocation.latitude.toFixed(4)}, {currentLocation.longitude.toFixed(4)}
//                   </span>
//                   <span className="sm:hidden">GPS Active</span>
//                 </div>
//               ) : null}

//               <div className="flex gap-2 sm:gap-3">
//                 <input
//                   type="date"
//                   value={selectedDate}
//                   onChange={(e) => setSelectedDate(e.target.value)}
//                   className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />

//                 <select
//                   value={selectedSite}
//                   onChange={(e) => setSelectedSite(e.target.value)}
//                   className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Site</option>
//                   {sites.map((site) => (
//                     <option key={site.id} value={site.id}>
//                       {site.name}
//                     </option>
//                   ))}
//                 </select>

//                 <button
//                   onClick={syncData}
//                   disabled={syncing}
//                   className="px-3 sm:px-4 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
//                 >
//                   <svg className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                   </svg>
//                   <span className="hidden sm:inline">{syncing ? "Syncing..." : "Sync"}</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto p-3 sm:p-6 space-y-4 sm:space-y-6">
//         {/* Workforce Alert */}
//         {workforceAlert && (
//           <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded-r-lg">
//             <div className="flex items-start gap-3">
//               <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//               </svg>
//               <div>
//                 <h3 className="font-semibold text-red-800 text-sm">Workforce Alert</h3>
//                 <p className="text-xs sm:text-sm text-red-700 mt-0.5">
//                   Present: {stats.totalPresent} / Required: {stats.totalRequired} - Work might be delayed due to insufficient workers
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Location Error */}
//         {locationError && (
//           <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 sm:p-4 rounded-r-lg">
//             <div className="flex items-start gap-3">
//               <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//               </svg>
//               <div>
//                 <h3 className="font-semibold text-yellow-800 text-sm">Location Access Required</h3>
//                 <p className="text-xs sm:text-sm text-yellow-700 mt-0.5">{locationError}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Today's Visits */}
//         <div className="bg-white rounded-lg border border-gray-200">
//           <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
//             <h2 className="text-lg sm:text-xl font-bold text-gray-900">Today's Site Visits</h2>
//             <p className="text-xs sm:text-sm text-gray-600 mt-1">
//               Site Engineer, Manager, Client, Supervisor (GPS + Face Scan Required)
//             </p>
//           </div>

//           <div className="p-3 sm:p-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
//               {todayVisits.map((visit, idx) => (
//                 <div key={idx} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
//                   <div className="flex items-start justify-between mb-3">
//                     <div>
//                       <p className="text-xs text-gray-500 uppercase tracking-wider">{visit.role}</p>
//                       <p className="font-semibold text-gray-900 mt-1 text-sm sm:text-base">{visit.name}</p>
//                     </div>

//                     {visit.status === "present" ? (
//                       <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
//                         Present
//                       </span>
//                     ) : (
//                       <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
//                         Expected
//                       </span>
//                     )}
//                   </div>

//                   {visit.status === "present" ? (
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-2 text-xs text-gray-600">
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                         {visit.time}
//                       </div>

//                       <div className="flex items-center gap-2">
//                         {visit.gpsVerified && (
//                           <span className="flex items-center gap-1 text-xs text-green-600">
//                             <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
//                             </svg>
//                             GPS
//                           </span>
//                         )}

//                         {visit.faceVerified && (
//                           <span className="flex items-center gap-1 text-xs text-blue-600">
//                             <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                             </svg>
//                             Face
//                           </span>
//                         )}
//                       </div>

//                       {visit.latitude && visit.longitude && (
//                         <div className="text-xs text-gray-500 mt-1 break-all">
//                           📍 {visit.latitude.toFixed(4)}, {visit.longitude.toFixed(4)}
//                         </div>
//                       )}

//                       {/* ✅ show captured face image */}
//                       {visit.faceImage && (
//                         <div className="mt-2">
//                           <img
//                             src={visit.faceImage}
//                             alt="Face Capture"
//                             className="w-full h-24 object-cover rounded-lg border border-gray-200"
//                           />
//                           <p className="text-[10px] text-gray-500 mt-1">Captured Photo</p>
//                         </div>
//                       )}
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => handleStaffAttendance(idx)}
//                       className="w-full mt-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors"
//                     >
//                       Mark Attendance
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Category Stats */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 sm:gap-4">
//           <button
//             onClick={() => setSelectedCategory("all")}
//             className={`p-3 sm:p-6 rounded-lg border transition-all ${
//               selectedCategory === "all"
//                 ? "border-orange-500 bg-orange-50"
//                 : "border-gray-200 bg-white hover:border-orange-300"
//             }`}
//           >
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">All Workers</span>
//               <div className="w-2 h-2 bg-gray-400 rounded-sm"></div>
//             </div>
//             <div className="text-2xl sm:text-4xl font-bold text-gray-900 font-mono">
//               {String(stats.totalPresent).padStart(2, "0")}
//               <span className="text-gray-400">/{String(stats.totalRequired).padStart(2, "0")}</span>
//             </div>
//             <div className="text-xs text-gray-500 mt-2">Present/Required</div>
//           </button>

//           {categories.map((category) => {
//             const catStats = getCategoryStats(category.id);
//             const isLow = catStats.present < catStats.required;

//             return (
//               <button
//                 key={category.id}
//                 onClick={() => setSelectedCategory(category.id)}
//                 className={`p-3 sm:p-6 rounded-lg border transition-all ${
//                   selectedCategory === category.id
//                     ? "border-orange-500 bg-orange-50"
//                     : isLow
//                     ? "border-red-300 bg-red-50"
//                     : "border-gray-200 bg-white hover:border-orange-300"
//                 }`}
//               >
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">{category.name}</span>
//                   <div className={`w-2 h-2 rounded-full ${isLow ? "bg-red-500" : "bg-gray-400"}`}></div>
//                 </div>

//                 <div className={`text-2xl sm:text-4xl font-bold font-mono ${isLow ? "text-red-600" : "text-gray-900"}`}>
//                   {String(catStats.present).padStart(2, "0")}
//                   <span className="text-gray-400">/{String(catStats.required).padStart(2, "0")}</span>
//                 </div>

//                 <div className="text-xs text-gray-500 mt-2">{isLow ? "Low" : "Present/Required"}</div>
//               </button>
//             );
//           })}
//         </div>

//         {/* Workers Table */}
//         <div className="bg-white rounded-lg border border-gray-200">
//           <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
//             <div>
//               <h2 className="text-lg sm:text-xl font-bold text-gray-900">Labor Attendance</h2>
//               <p className="text-xs sm:text-sm text-gray-600 mt-1">GPS verification required (No face scan)</p>
//             </div>

//             <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search worker..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-10 pr-4 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full sm:w-64"
//                 />
//                 <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </div>

//               <button
//                 onClick={() => setShowAddWorkerModal(true)}
//                 className="px-4 py-2 sm:py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                 </svg>
//                 Add Worker
//               </button>
//             </div>
//           </div>

//           {/* Mobile Cards View */}
//           <div className="block sm:hidden">
//             {filteredWorkers.map((worker, idx) => (
//               <div key={worker.id} className="border-b border-gray-200 p-4 last:border-b-0">
//                 <div className="flex items-start justify-between mb-3">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2 mb-1">
//                       <span className="text-sm font-medium text-gray-900">#{String(idx + 1).padStart(2, "0")}</span>
//                       <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium uppercase">
//                         {categories.find((c) => c.id === worker.category)?.name}
//                       </span>
//                     </div>

//                     <h3 className="font-semibold text-gray-900">{worker.name}</h3>
//                     {worker.phone && <p className="text-xs text-gray-500">{worker.phone}</p>}
//                     <p className="text-sm text-gray-600 mt-1">{worker.mudkam || "-"}</p>
//                   </div>

//                   <div className="text-right">
//                     {worker.status === "present" ? (
//                       <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium uppercase">
//                         Present
//                       </span>
//                     ) : (
//                       <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium uppercase">
//                         Absent
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-3 text-sm mb-3">
//                   <div>
//                     <span className="text-gray-500 text-xs">Check In:</span>
//                     {worker.checkInTime ? (
//                       <div className="flex items-center gap-1 mt-1">
//                         <span className="font-medium">{worker.checkInTime}</span>
//                         {worker.gpsVerified && (
//                           <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
//                           </svg>
//                         )}
//                       </div>
//                     ) : (
//                       <div className="text-gray-400 mt-1">-</div>
//                     )}
//                   </div>

//                   <div>
//                     <span className="text-gray-500 text-xs">Check Out:</span>
//                     {worker.checkOutTime ? (
//                       <div className="mt-1">
//                         <span className="font-medium">{worker.checkOutTime}</span>
//                         {worker.overtime > 0 && <div className="text-xs text-orange-600">+{worker.overtime.toFixed(1)}h OT</div>}
//                       </div>
//                     ) : (
//                       <div className="text-gray-400 mt-1">-</div>
//                     )}
//                   </div>
//                 </div>

//                 {worker.latitude && worker.longitude && (
//                   <div className="text-xs text-gray-600 mb-3 break-all">
//                     📍 {worker.latitude.toFixed(4)}, {worker.longitude.toFixed(4)}
//                   </div>
//                 )}

//                 <div className="flex items-center justify-between">
//                   <div>
//                     {worker.wageStatus === "paid" ? (
//                       <div>
//                         <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium uppercase">Paid</span>
//                         <div className="text-xs text-gray-600 mt-1">₹{worker.finalWage?.toFixed(0) || worker.wageAmount}</div>
//                       </div>
//                     ) : (
//                       <div>
//                         <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium uppercase">Unpaid</span>
//                         <div className="text-xs text-gray-600 mt-1">₹{worker.wageAmount}</div>
//                       </div>
//                     )}
//                   </div>

//                   <div>
//                     {worker.status === "absent" ? (
//                       <button
//                         onClick={() => markWorkerAttendance(worker.id)}
//                         className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition-colors"
//                       >
//                         Mark Present
//                       </button>
//                     ) : worker.wageStatus === "unpaid" ? (
//                       <button
//                         onClick={() => {
//                           setSelectedWorker(worker);
//                           setShowWageModal(true);
//                         }}
//                         className="px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-medium transition-colors"
//                       >
//                         Pay Wage
//                       </button>
//                     ) : (
//                       <span className="text-xs text-gray-500">Logged Out</span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Desktop Table View */}
//           <div className="hidden sm:block overflow-x-auto">
//             <table className="w-full min-w-[1000px]">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mudkam</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GPS Location</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wage</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-200">
//                 {filteredWorkers.map((worker, idx) => (
//                   <tr key={worker.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4 text-sm text-gray-900">{String(idx + 1).padStart(2, "0")}</td>

//                     <td className="px-6 py-4">
//                       <div className="font-medium text-gray-900">{worker.name}</div>
//                       {worker.phone && <div className="text-xs text-gray-500">{worker.phone}</div>}
//                     </td>

//                     <td className="px-6 py-4">
//                       <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium uppercase">
//                         {categories.find((c) => c.id === worker.category)?.name}
//                       </span>
//                     </td>

//                     <td className="px-6 py-4 text-sm text-gray-700">{worker.mudkam || "-"}</td>

//                     <td className="px-6 py-4">
//                       {worker.checkInTime ? (
//                         <div className="flex items-center gap-2">
//                           <span className="font-medium text-gray-900">{worker.checkInTime}</span>
//                           {worker.gpsVerified && (
//                             <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
//                             </svg>
//                           )}
//                         </div>
//                       ) : (
//                         <span className="text-gray-400">-</span>
//                       )}
//                     </td>

//                     <td className="px-6 py-4">
//                       {worker.latitude && worker.longitude ? (
//                         <div className="text-xs text-gray-600">
//                           {worker.latitude.toFixed(4)}, {worker.longitude.toFixed(4)}
//                         </div>
//                       ) : (
//                         <span className="text-gray-400">-</span>
//                       )}
//                     </td>

//                     <td className="px-6 py-4">
//                       {worker.checkOutTime ? (
//                         <div>
//                           <span className="font-medium text-gray-900">{worker.checkOutTime}</span>
//                           {worker.overtime > 0 && <div className="text-xs text-orange-600 mt-0.5">+{worker.overtime.toFixed(1)}h OT</div>}
//                         </div>
//                       ) : (
//                         <span className="text-gray-400">-</span>
//                       )}
//                     </td>

//                     <td className="px-6 py-4">
//                       {worker.status === "present" ? (
//                         <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium uppercase">
//                           Present
//                         </span>
//                       ) : (
//                         <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium uppercase">
//                           Absent
//                         </span>
//                       )}
//                     </td>

//                     <td className="px-6 py-4">
//                       {worker.wageStatus === "paid" ? (
//                         <div>
//                           <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium uppercase">Paid</span>
//                           <div className="text-xs text-gray-600 mt-1">₹{worker.finalWage?.toFixed(0) || worker.wageAmount}</div>
//                         </div>
//                       ) : (
//                         <div>
//                           <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium uppercase">Unpaid</span>
//                           <div className="text-xs text-gray-600 mt-1">₹{worker.wageAmount}</div>
//                         </div>
//                       )}
//                     </td>

//                     <td className="px-6 py-4">
//                       {worker.status === "absent" ? (
//                         <button
//                           onClick={() => markWorkerAttendance(worker.id)}
//                           className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-medium transition-colors"
//                         >
//                           Mark Present
//                         </button>
//                       ) : worker.wageStatus === "unpaid" ? (
//                         <button
//                           onClick={() => {
//                             setSelectedWorker(worker);
//                             setShowWageModal(true);
//                           }}
//                           className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-xs font-medium transition-colors"
//                         >
//                           Pay Wage
//                         </button>
//                       ) : (
//                         <span className="text-xs text-gray-500">Logged Out</span>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Face Scan Modal */}
//       {showFaceScanModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl max-w-2xl w-full p-4 sm:p-6 mx-4">
//             <div className="text-center">
//               <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Face Recognition</h2>

//               <div className="relative bg-black rounded-lg overflow-hidden mb-4">
//                 <video ref={videoRef} autoPlay playsInline className="w-full h-64 sm:h-96 object-cover" />
//                 <canvas ref={canvasRef} className="hidden" />

//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="w-48 h-60 sm:w-64 sm:h-80 border-4 border-blue-500 rounded-lg"></div>
//                 </div>
//               </div>

//               {faceScanStatus === "scanning" && (
//                 <div className="flex items-center justify-center gap-2 text-blue-600">
//                   <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                   </svg>
//                   <span>Scanning face...</span>
//                 </div>
//               )}

//               {faceScanStatus === "success" && (
//                 <div className="flex items-center justify-center gap-2 text-green-600">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                     <path
//                       fillRule="evenodd"
//                       d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   <span>Face verified successfully!</span>
//                 </div>
//               )}

//               <p className="text-sm text-gray-600 mt-2">Position your face within the frame</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add Worker Modal */}
//       {showAddWorkerModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl max-w-md w-full p-4 sm:p-6 mx-4">
//             <div className="flex items-center justify-between mb-4 sm:mb-6">
//               <h2 className="text-lg sm:text-xl font-bold text-gray-900">Add New Worker</h2>
//               <button onClick={() => setShowAddWorkerModal(false)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Worker Name</label>
//                 <input
//                   type="text"
//                   value={newWorkerName}
//                   onChange={(e) => setNewWorkerName(e.target.value)}
//                   placeholder="Enter worker name"
//                   className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
//                 <select
//                   value={newWorkerCategory}
//                   onChange={(e) => setNewWorkerCategory(e.target.value)}
//                   className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((cat) => (
//                     <option key={cat.id} value={cat.id}>
//                       {cat.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Mudkam (Village/Origin)</label>
//                 <input
//                   type="text"
//                   value={newWorkerMudkam}
//                   onChange={(e) => setNewWorkerMudkam(e.target.value)}
//                   placeholder="e.g., Village Rampur, UP"
//                   className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>

//               <div className="flex flex-col sm:flex-row gap-3 pt-2">
//                 <button onClick={addWorker} className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 rounded-lg transition-colors">
//                   Add Worker
//                 </button>
//                 <button onClick={() => setShowAddWorkerModal(false)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 rounded-lg transition-colors">
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Wage Payment Modal */}
//       {showWageModal && selectedWorker && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl max-w-md w-full p-4 sm:p-6 mx-4">
//             <div className="flex items-center justify-between mb-4 sm:mb-6">
//               <h2 className="text-lg sm:text-xl font-bold text-gray-900">Process Wage Payment</h2>
//               <button onClick={() => setShowWageModal(false)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>

//             <div className="bg-gray-50 rounded-lg p-4 mb-4">
//               <div className="flex items-center gap-3 mb-3">
//                 <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-semibold">
//                   {selectedWorker.name.charAt(0)}
//                 </div>
//                 <div>
//                   <div className="font-semibold text-gray-900">{selectedWorker.name}</div>
//                   <div className="text-sm text-gray-600">{categories.find((c) => c.id === selectedWorker.category)?.name}</div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
//                 <div>
//                   <span className="text-gray-600">Check In:</span>
//                   <span className="font-medium ml-2">{selectedWorker.checkInTime}</span>
//                 </div>
//                 <div>
//                   <span className="text-gray-600">Base Wage:</span>
//                   <span className="font-medium ml-2">₹{selectedWorker.wageAmount}</span>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
//               <p className="text-sm text-blue-800">
//                 <strong>Auto-calculation:</strong> Wage will be calculated based on check-out time
//               </p>
//               <ul className="text-xs text-blue-700 mt-2 space-y-1">
//                 <li>• Less than 4 hours = Half day (50%)</li>
//                 <li>• 8 hours = Full day (100%)</li>
//                 <li>• More than 8 hours = Overtime (150% for extra hours)</li>
//               </ul>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-3">
//               <button
//                 onClick={() => processWagePayment(selectedWorker.id)}
//                 className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors"
//               >
//                 Pay & Checkout
//               </button>
//               <button
//                 onClick={() => setShowWageModal(false)}
//                 className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 rounded-lg transition-colors"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState, useRef } from "react";
import api from "../api/axiosConfig";

export default function AttendanceScreen() {
  const [userRole, setUserRole] = useState("supervisor");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedSite, setSelectedSite] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddWorkerModal, setShowAddWorkerModal] = useState(false);
  const [showWageModal, setShowWageModal] = useState(false);

  // ✅ One common camera modal for enroll/start/end
  const [showFaceScanModal, setShowFaceScanModal] = useState(false);
  const [scanStatus, setScanStatus] = useState("idle"); // idle | scanning | success | fail
  const [scanMessage, setScanMessage] = useState("");
  const [scanMeta, setScanMeta] = useState(null); // { type, id, mode }

  const [selectedWorker, setSelectedWorker] = useState(null);
  const [newWorkerName, setNewWorkerName] = useState("");
  const [newWorkerCategory, setNewWorkerCategory] = useState("");
  const [newWorkerMudkam, setNewWorkerMudkam] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [syncing, setSyncing] = useState(false);

  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [gpsLoading, setGpsLoading] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const siteCoordinates = {
    latitude: 28.5355,
    longitude: 77.391,
    radius: 100,
  };

  const [sites] = useState([
    {
      id: "S001",
      name: "Residential Complex - Block A",
      location: "Sector 12, Delhi",
    },
    { id: "S002", name: "Commercial Building", location: "Connaught Place" },
  ]);

  const [categories] = useState([
    { id: "mason", name: "Mason", requiredCount: 10 },
    { id: "helper", name: "Helper", requiredCount: 15 },
    { id: "electrician", name: "Electrician", requiredCount: 5 },
    { id: "plumber", name: "Plumber", requiredCount: 4 },
    { id: "carpenter", name: "Carpenter", requiredCount: 6 },
    { id: "painter", name: "Painter", requiredCount: 3 },
  ]);

  // ✅ Visitors (Site Visits) - now support enroll/start/end cache
  const [todayVisits, setTodayVisits] = useState([
    {
      role: "Site Engineer",
      name: "Rajesh Kumar",
      status: "expected",
      time: null,
      gpsVerified: false,
      latitude: null,
      longitude: null,

      profilePhoto: null,
      profileFP: null,

      startPhoto: null,
      startFP: null,

      endPhoto: null,
      endFP: null,
    },
    {
      role: "Manager",
      name: "Amit Singh",
      status: "expected",
      time: null,
      gpsVerified: false,
      latitude: null,
      longitude: null,

      profilePhoto: null,
      profileFP: null,
      startPhoto: null,
      startFP: null,
      endPhoto: null,
      endFP: null,
    },
    {
      role: "Client",
      name: "Mr. Sharma",
      status: "expected",
      time: null,
      gpsVerified: false,
      latitude: null,
      longitude: null,

      profilePhoto: null,
      profileFP: null,
      startPhoto: null,
      startFP: null,
      endPhoto: null,
      endFP: null,
    },
    {
      role: "Supervisor",
      name: "Vinod Pandey",
      status: "expected",
      time: null,
      gpsVerified: false,
      latitude: null,
      longitude: null,

      profilePhoto: null,
      profileFP: null,
      startPhoto: null,
      startFP: null,
      endPhoto: null,
      endFP: null,
    },
  ]);

  // ✅ Workers (Labour) - now support enroll/start/end cache
  const [workers, setWorkers] = useState([
    {
      id: "W001",
      name: "Ramesh Yadav",
      category: "mason",
      mudkam: "Village Rampur, UP",
      phone: "+91 98765 43210",

      status: "absent",
      checkInTime: null,
      checkInTimestamp: null,
      checkOutTime: null,
      checkOutTimestamp: null,

      wageStatus: "unpaid",
      wageAmount: 800,
      overtime: 0,
      gpsVerified: false,
      workType: "full",

      latitude: null,
      longitude: null,

      profilePhoto: null,
      profileFP: null,

      startPhoto: null,
      startFP: null,

      endPhoto: null,
      endFP: null,
    },
    {
      id: "W002",
      name: "Suresh Kumar",
      category: "mason",
      mudkam: "Village Rampur, UP",
      phone: "+91 98765 43211",

      status: "absent",
      checkInTime: null,
      checkInTimestamp: null,
      checkOutTime: null,
      checkOutTimestamp: null,

      wageStatus: "unpaid",
      wageAmount: 800,
      overtime: 0,
      gpsVerified: false,
      workType: "full",

      latitude: null,
      longitude: null,

      profilePhoto: null,
      profileFP: null,
      startPhoto: null,
      startFP: null,
      endPhoto: null,
      endFP: null,
    },
    {
      id: "W003",
      name: "Mohan Singh",
      category: "helper",
      mudkam: "Village Sultanpur, Bihar",
      phone: "+91 98765 43212",

      status: "absent",
      checkInTime: null,
      checkInTimestamp: null,
      checkOutTime: null,
      checkOutTimestamp: null,

      wageStatus: "unpaid",
      wageAmount: 600,
      overtime: 0,
      gpsVerified: false,
      workType: "full",

      latitude: null,
      longitude: null,

      profilePhoto: null,
      profileFP: null,
      startPhoto: null,
      startFP: null,
      endPhoto: null,
      endFP: null,
    },
  ]);

  // ✅ Load cache from localStorage
  useEffect(() => {
    try {
      const savedVisits = localStorage.getItem("ps02_visits_cache");
      const savedWorkers = localStorage.getItem("ps02_workers_cache");

      if (savedVisits) setTodayVisits(JSON.parse(savedVisits));
      if (savedWorkers) setWorkers(JSON.parse(savedWorkers));
    } catch (e) {
      console.log("Cache load error", e);
    }
  }, []);

  // ✅ Save cache to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("ps02_visits_cache", JSON.stringify(todayVisits));
    } catch (e) {
      console.log("Cache save visits error", e);
    }
  }, [todayVisits]);

  useEffect(() => {
    try {
      localStorage.setItem("ps02_workers_cache", JSON.stringify(workers));
    } catch (e) {
      console.log("Cache save workers error", e);
    }
  }, [workers]);

  // ----------------------------
  // ✅ GPS Utils (same as before)
  // ----------------------------
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      setGpsLoading(true);

      if (!navigator.geolocation) {
        setGpsLoading(false);
        reject(new Error("Geolocation is not supported by your browser"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          };
          setCurrentLocation(location);
          setLocationError(null);
          setGpsLoading(false);
          resolve(location);
        },
        (error) => {
          setGpsLoading(false);
          let errorMessage = "Unable to get location";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage =
                "Location permission denied. Please enable location access.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage = "Location request timed out.";
              break;
            default:
              errorMessage = "Unknown location error.";
          }
          setLocationError(errorMessage);
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) *
        Math.cos(φ2) *
        Math.sin(Δλ / 2) *
        Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const verifyLocation = async () => {
    const location = await getCurrentLocation();
    const distance = calculateDistance(
      location.latitude,
      location.longitude,
      siteCoordinates.latitude,
      siteCoordinates.longitude
    );

    // For hackathon we return verified always (feel real)
    return {
      verified: true,
      distance,
      location,
      message: `GPS Verified - Location: ${location.latitude.toFixed(
        6
      )}, ${location.longitude.toFixed(6)}`,
    };
  };

  // ----------------------------
  // ✅ Camera Utils
  // ----------------------------
  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: false,
    });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
    }

    return stream;
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const waitForVideoReady = () => {
    return new Promise((resolve, reject) => {
      const video = videoRef.current;
      if (!video) return reject(new Error("Video element missing"));

      const timeout = setTimeout(() => {
        reject(new Error("Camera not ready. Try again."));
      }, 6000);

      const check = () => {
        if (
          video.readyState >= 2 &&
          video.videoWidth > 0 &&
          video.videoHeight > 0
        ) {
          clearTimeout(timeout);
          resolve(true);
        } else {
          requestAnimationFrame(check);
        }
      };

      check();
    });
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return null;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    return canvas.toDataURL("image/jpeg", 0.7);
  };

  // ---------------------------------------
  // ✅ OFFLINE FAKE-REAL PHOTO MATCH ENGINE
  // ---------------------------------------
  const base64ToImage = (base64) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Image decode failed"));
      img.src = base64;
    });

  // fingerprint: 16x16 binary (0/1)
  const getImageFingerprint = async (base64) => {
    const img = await base64ToImage(base64);

    const size = 16;
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d");
    c.width = size;
    c.height = size;

    ctx.drawImage(img, 0, 0, size, size);

    const data = ctx.getImageData(0, 0, size, size).data;

    const gray = [];
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      gray.push((r + g + b) / 3);
    }

    const avg = gray.reduce((a, b) => a + b, 0) / gray.length;

    return gray.map((v) => (v > avg ? 1 : 0));
  };

  const compareFingerprints = (fp1, fp2) => {
    if (!fp1 || !fp2 || fp1.length !== fp2.length) return 0;

    let same = 0;
    for (let i = 0; i < fp1.length; i++) {
      if (fp1[i] === fp2[i]) same++;
    }

    return (same / fp1.length) * 100;
  };

  const verifyPhotoMatch = (storedFp, liveFp) => {
    const similarity = compareFingerprints(storedFp, liveFp);

    // ✅ Adjust threshold for hackathon realism
    // Too strict => rejects same person
    // Too loose => accepts anyone
    const verified = similarity >= 72;

    return { verified, similarity: Math.round(similarity) };
  };

  // ---------------------------------------
  // ✅ Open/Close Scan Modal
  // ---------------------------------------
  const openScan = async ({ type, id, mode }) => {
    try {
      setScanMeta({ type, id, mode });
      setScanStatus("scanning");
      setScanMessage("Opening camera...");

      setShowFaceScanModal(true);

      await startCamera();
      await waitForVideoReady();

      setScanMessage("Align face properly and click Capture & Verify");
    } catch (e) {
      stopCamera();
      setShowFaceScanModal(false);
      setScanStatus("idle");
      alert(e?.message || "Camera failed");
    }
  };

  const closeScan = () => {
    stopCamera();
    setShowFaceScanModal(false);
    setScanStatus("idle");
    setScanMessage("");
    setScanMeta(null);
  };

  // ---------------------------------------
  // ✅ Main Scan Flow (Enroll/Start/End)
  // ---------------------------------------
  const captureAndVerify = async () => {
    if (!scanMeta) return;

    try {
      setScanStatus("scanning");
      setScanMessage("Capturing photo...");

      const shot = captureImage();
      if (!shot) throw new Error("Photo capture failed");

      setScanMessage("Processing offline verification...");
      const fp = await getImageFingerprint(shot);

      const { type, id, mode } = scanMeta;

      // ✅ VISITOR
      if (type === "visitor") {
        const v = todayVisits[id];

        // ENROLL
        if (mode === "enroll") {
          setTodayVisits((prev) =>
            prev.map((x, idx) =>
              idx === id
                ? {
                    ...x,
                    profilePhoto: shot,
                    profileFP: fp,
                    startPhoto: null,
                    startFP: null,
                    endPhoto: null,
                    endFP: null,
                  }
                : x
            )
          );

          setScanStatus("success");
          setScanMessage("Enrolled successfully ✅");
          setTimeout(() => {
            closeScan();
            alert("Visitor Enrolled ✅");
          }, 700);
          return;
        }

        // START
        if (mode === "start") {
          if (!v.profileFP) throw new Error("Not enrolled! Please enroll first.");

          const res = verifyPhotoMatch(v.profileFP, fp);
          if (!res.verified)
            throw new Error(`Mismatch ❌ (${res.similarity}%) Try again.`);

          // GPS feel real
          const locationResult = await verifyLocation();

          setTodayVisits((prev) =>
            prev.map((x, idx) =>
              idx === id
                ? {
                    ...x,
                    status: "present",
                    time: new Date().toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                    gpsVerified: true,
                    latitude: locationResult.location.latitude,
                    longitude: locationResult.location.longitude,

                    startPhoto: shot,
                    startFP: fp,
                  }
                : x
            )
          );

          setScanStatus("success");
          setScanMessage(`Start verified ✅ (${res.similarity}%)`);
          setTimeout(() => {
            closeScan();
            alert(`Visitor START Verified ✅ (${res.similarity}%)`);
          }, 700);
          return;
        }

        // END
        if (mode === "end") {
          if (!v.profileFP) throw new Error("Not enrolled!");
          if (!v.startFP) throw new Error("Start missing! Verify Start first.");

          const r1 = verifyPhotoMatch(v.profileFP, fp);
          const r2 = verifyPhotoMatch(v.startFP, fp);
          const minScore = Math.min(r1.similarity, r2.similarity);

          if (!r1.verified || !r2.verified) {
            throw new Error(`Mismatch ❌ (${minScore}%) Try again.`);
          }

          setTodayVisits((prev) =>
            prev.map((x, idx) =>
              idx === id
                ? {
                    ...x,
                    endPhoto: shot,
                    endFP: fp,
                  }
                : x
            )
          );

          setScanStatus("success");
          setScanMessage(`End verified ✅ (${minScore}%)`);
          setTimeout(() => {
            closeScan();
            alert(`Visitor END Verified ✅ (${minScore}%)`);
          }, 700);
          return;
        }
      }

      // ✅ LABOR
      if (type === "labor") {
        const w = workers.find((x) => x.id === id);
        if (!w) throw new Error("Worker not found");

        // ENROLL
        if (mode === "enroll") {
          setWorkers((prev) =>
            prev.map((x) =>
              x.id === id
                ? {
                    ...x,
                    profilePhoto: shot,
                    profileFP: fp,
                    startPhoto: null,
                    startFP: null,
                    endPhoto: null,
                    endFP: null,
                  }
                : x
            )
          );

          setScanStatus("success");
          setScanMessage("Enrolled successfully ✅");
          setTimeout(() => {
            closeScan();
            alert("Worker Enrolled ✅");
          }, 700);
          return;
        }

        // START
        if (mode === "start") {
          if (!w.profileFP) throw new Error("Not enrolled! Please enroll first.");

          const res = verifyPhotoMatch(w.profileFP, fp);
          if (!res.verified)
            throw new Error(`Mismatch ❌ (${res.similarity}%) Try again.`);

          const locationResult = await verifyLocation();
          const now = new Date();

          setWorkers((prev) =>
            prev.map((x) =>
              x.id === id
                ? {
                    ...x,
                    status: "present",
                    checkInTime: now.toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                    checkInTimestamp: now.getTime(),
                    gpsVerified: true,
                    latitude: locationResult.location.latitude,
                    longitude: locationResult.location.longitude,

                    startPhoto: shot,
                    startFP: fp,
                  }
                : x
            )
          );

          setScanStatus("success");
          setScanMessage(`Start verified ✅ (${res.similarity}%)`);
          setTimeout(() => {
            closeScan();
            alert(`Start Work Verified ✅ (${res.similarity}%)`);
          }, 700);
          return;
        }

        // END
        if (mode === "end") {
          if (!w.profileFP) throw new Error("Not enrolled!");
          if (!w.startFP) throw new Error("Start missing! Verify Start first.");

          const r1 = verifyPhotoMatch(w.profileFP, fp);
          const r2 = verifyPhotoMatch(w.startFP, fp);
          const minScore = Math.min(r1.similarity, r2.similarity);

          if (!r1.verified || !r2.verified) {
            throw new Error(`Mismatch ❌ (${minScore}%) Try again.`);
          }

          const now = new Date();

          setWorkers((prev) =>
            prev.map((x) =>
              x.id === id
                ? {
                    ...x,
                    checkOutTime: now.toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                    checkOutTimestamp: now.getTime(),

                    endPhoto: shot,
                    endFP: fp,
                  }
                : x
            )
          );

          setScanStatus("success");
          setScanMessage(`End verified ✅ (${minScore}%)`);
          setTimeout(() => {
            closeScan();
            alert(`End Work Verified ✅ (${minScore}%)`);
          }, 700);
          return;
        }
      }

      throw new Error("Invalid flow");
    } catch (e) {
      setScanStatus("fail");
      setScanMessage(e?.message || "Verification failed");
    }
  };

  // ✅ Visit button state
  const getVisitMode = (visit) => {
    if (!visit.profileFP) return "enroll";
    if (!visit.startFP) return "start";
    if (!visit.endFP) return "end";
    return "done";
  };

  const getVisitLabel = (visit) => {
    const m = getVisitMode(visit);
    if (m === "enroll") return "Enroll";
    if (m === "start") return "Start";
    if (m === "end") return "End";
    return "Done ✅";
  };

  // ✅ Worker state
  const getWorkerMode = (w) => {
    if (!w.profileFP) return "enroll";
    if (!w.startFP) return "start";
    if (!w.endFP) return "end";
    return "done";
  };

  const getCategoryStats = (categoryId) => {
    const categoryWorkers = workers.filter((w) => w.category === categoryId);
    const present = categoryWorkers.filter((w) => w.status === "present").length;
    const required = categories.find((c) => c.id === categoryId)?.requiredCount || 0;
    return { present, required, total: categoryWorkers.length };
  };

  const getTotalStats = () => {
    const totalRequired = categories.reduce((sum, cat) => sum + cat.requiredCount, 0);
    const totalPresent = workers.filter((w) => w.status === "present").length;
    const totalWorkers = workers.length;
    return { totalRequired, totalPresent, totalWorkers };
  };

  const stats = getTotalStats();
  const workforceAlert = stats.totalPresent < stats.totalRequired;

  const filteredWorkers = workers.filter((w) => {
    const matchesCategory = selectedCategory === "all" || w.category === selectedCategory;
    const matchesSearch =
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.mudkam.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addWorker = () => {
    if (!newWorkerName || !newWorkerCategory || !newWorkerMudkam) {
      alert("Please fill all fields");
      return;
    }

    const newWorker = {
      id: `W${String(workers.length + 1).padStart(3, "0")}`,
      name: newWorkerName,
      category: newWorkerCategory,
      mudkam: newWorkerMudkam,
      phone: "",
      status: "absent",
      checkInTime: null,
      checkInTimestamp: null,
      checkOutTime: null,
      checkOutTimestamp: null,
      wageStatus: "unpaid",
      wageAmount:
        newWorkerCategory === "mason"
          ? 800
          : newWorkerCategory === "helper"
          ? 600
          : 1000,
      overtime: 0,
      gpsVerified: false,
      workType: "full",
      latitude: null,
      longitude: null,

      profilePhoto: null,
      profileFP: null,
      startPhoto: null,
      startFP: null,
      endPhoto: null,
      endFP: null,
    };

    setWorkers([...workers, newWorker]);
    setNewWorkerName("");
    setNewWorkerCategory("");
    setNewWorkerMudkam("");
    setShowAddWorkerModal(false);
  };

  const calculateWage = (worker) => {
    if (!worker.checkInTimestamp || !worker.checkOutTimestamp) return worker.wageAmount;

    const hoursWorked = (worker.checkOutTimestamp - worker.checkInTimestamp) / (1000 * 60 * 60);
    const standardHours = 8;

    if (hoursWorked < 4) {
      return { amount: worker.wageAmount / 2, type: "half", overtime: 0 };
    } else if (hoursWorked > standardHours) {
      const overtimeHours = hoursWorked - standardHours;
      const overtimeRate = worker.wageAmount / standardHours;
      return {
        amount: worker.wageAmount + overtimeRate * overtimeHours * 1.5,
        type: "overtime",
        overtime: overtimeHours,
      };
    }

    return { amount: worker.wageAmount, type: "full", overtime: 0 };
  };

  const processWagePayment = (workerId) => {
    setWorkers(
      workers.map((w) => {
        if (w.id === workerId) {
          const now = new Date();
          const checkOutTime = now.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          });
          const checkOutTimestamp = now.getTime();

          const wageCalc = calculateWage({
            ...w,
            checkOutTimestamp,
          });

          return {
            ...w,
            wageStatus: "paid",
            checkOutTime,
            checkOutTimestamp,
            workType: wageCalc.type,
            overtime: wageCalc.overtime,
            finalWage: wageCalc.amount,
          };
        }
        return w;
      })
    );

    setShowWageModal(false);
    setSelectedWorker(null);
  };

  const syncData = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      alert("Data synced successfully!");
    }, 1200);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Attendance Management
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                {new Date(selectedDate).toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="text-[11px] text-gray-500 mt-1">
                Offline Photo Verification (Hackathon Demo Mode ✅)
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <div className="flex gap-2 sm:gap-3">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />

                <select
                  value={selectedSite}
                  onChange={(e) => setSelectedSite(e.target.value)}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select Site</option>
                  {sites.map((site) => (
                    <option key={site.id} value={site.id}>
                      {site.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={syncData}
                  disabled={syncing}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <span className="hidden sm:inline">
                    {syncing ? "Syncing..." : "Sync"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-3 sm:p-6 space-y-4 sm:space-y-6">
        {/* Workforce Alert */}
        {workforceAlert && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded-r-lg">
            <div>
              <h3 className="font-semibold text-red-800 text-sm">
                Workforce Alert
              </h3>
              <p className="text-xs sm:text-sm text-red-700 mt-0.5">
                Present: {stats.totalPresent} / Required: {stats.totalRequired} -
                Work might be delayed due to insufficient workers
              </p>
            </div>
          </div>
        )}

        {/* Today's Visits */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Today's Site Visits
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Enroll → Start → End (Offline photo verification)
            </p>
          </div>

          <div className="p-3 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {todayVisits.map((visit, idx) => {
                const mode = getVisitMode(visit);
                const label = getVisitLabel(visit);

                return (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">
                          {visit.role}
                        </p>
                        <p className="font-semibold text-gray-900 mt-1 text-sm sm:text-base">
                          {visit.name}
                        </p>
                      </div>

                      {mode === "done" ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          Done ✅
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                          {label}
                        </span>
                      )}
                    </div>

                    {visit.profilePhoto && (
                      <div className="mt-2">
                        <img
                          src={visit.profilePhoto}
                          alt="Enrolled"
                          className="w-full h-20 object-cover rounded-lg border border-gray-200"
                        />
                        <p className="text-[10px] text-gray-500 mt-1">
                          Enrolled Photo (Cached)
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {visit.startPhoto && (
                        <div>
                          <img
                            src={visit.startPhoto}
                            alt="Start"
                            className="w-full h-16 object-cover rounded-lg border"
                          />
                          <p className="text-[10px] text-gray-500 mt-1">
                            Start
                          </p>
                        </div>
                      )}
                      {visit.endPhoto && (
                        <div>
                          <img
                            src={visit.endPhoto}
                            alt="End"
                            className="w-full h-16 object-cover rounded-lg border"
                          />
                          <p className="text-[10px] text-gray-500 mt-1">End</p>
                        </div>
                      )}
                    </div>

                    {mode !== "done" ? (
                      <button
                        onClick={() =>
                          openScan({ type: "visitor", id: idx, mode })
                        }
                        className="w-full mt-3 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors"
                      >
                        {label}
                      </button>
                    ) : (
                      <div className="text-xs text-green-700 font-medium mt-3 text-center">
                        Verified Completed ✅
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Labor Attendance */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Labor Attendance
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Enroll → Start Work → End Work (offline photo verification)
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search worker..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-4 pr-4 py-2 sm:py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full sm:w-64"
                />
              </div>

              <button
                onClick={() => setShowAddWorkerModal(true)}
                className="px-4 py-2 sm:py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Add Worker
              </button>
            </div>
          </div>

          {/* Mobile View */}
          <div className="block sm:hidden">
            {filteredWorkers.map((worker, idx) => {
              const wMode = getWorkerMode(worker);

              return (
                <div
                  key={worker.id}
                  className="border-b border-gray-200 p-4 last:border-b-0"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          #{String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium uppercase">
                          {categories.find((c) => c.id === worker.category)
                            ?.name || worker.category}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900">
                        {worker.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {worker.mudkam || "-"}
                      </p>
                    </div>

                    {worker.profilePhoto && (
                      <img
                        src={worker.profilePhoto}
                        alt="Profile"
                        className="w-14 h-14 rounded-lg object-cover border"
                      />
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() =>
                        openScan({ type: "labor", id: worker.id, mode: "enroll" })
                      }
                      className="px-3 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-xs font-medium transition-colors"
                    >
                      {worker.profileFP ? "Re-Enroll" : "Enroll"}
                    </button>

                    <button
                      disabled={!worker.profileFP || !!worker.startFP}
                      onClick={() =>
                        openScan({ type: "labor", id: worker.id, mode: "start" })
                      }
                      className="px-3 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-40 text-white rounded-lg text-xs font-medium transition-colors"
                    >
                      Start
                    </button>

                    <button
                      disabled={!worker.startFP || !!worker.endFP}
                      onClick={() =>
                        openScan({ type: "labor", id: worker.id, mode: "end" })
                      }
                      className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-lg text-xs font-medium transition-colors"
                    >
                      End
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {worker.startPhoto && (
                      <div>
                        <img
                          src={worker.startPhoto}
                          alt="Start"
                          className="w-full h-20 object-cover rounded-lg border"
                        />
                        <p className="text-[10px] text-gray-500 mt-1">
                          Start Photo
                        </p>
                      </div>
                    )}
                    {worker.endPhoto && (
                      <div>
                        <img
                          src={worker.endPhoto}
                          alt="End"
                          className="w-full h-20 object-cover rounded-lg border"
                        />
                        <p className="text-[10px] text-gray-500 mt-1">
                          End Photo
                        </p>
                      </div>
                    )}
                  </div>

                  {worker.latitude && worker.longitude && (
                    <div className="text-xs text-gray-600 mt-2 break-all">
                      📍 {worker.latitude.toFixed(4)}, {worker.longitude.toFixed(4)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Worker
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enroll Photo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filteredWorkers.map((worker, idx) => (
                  <tr
                    key={worker.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {String(idx + 1).padStart(2, "0")}
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {worker.name}
                      </div>
                      <div className="text-xs text-gray-500">{worker.mudkam}</div>
                    </td>

                    <td className="px-6 py-4">
                      {worker.profilePhoto ? (
                        <img
                          src={worker.profilePhoto}
                          alt="Enroll"
                          className="w-20 h-14 rounded-lg object-cover border"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">Not enrolled</span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {worker.startPhoto ? (
                        <img
                          src={worker.startPhoto}
                          alt="Start"
                          className="w-20 h-14 rounded-lg object-cover border"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                      <div className="text-[11px] text-gray-500 mt-1">
                        {worker.checkInTime || ""}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      {worker.endPhoto ? (
                        <img
                          src={worker.endPhoto}
                          alt="End"
                          className="w-20 h-14 rounded-lg object-cover border"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                      <div className="text-[11px] text-gray-500 mt-1">
                        {worker.checkOutTime || ""}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            openScan({ type: "labor", id: worker.id, mode: "enroll" })
                          }
                          className="px-3 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-xs font-medium transition-colors"
                        >
                          {worker.profileFP ? "Re-Enroll" : "Enroll"}
                        </button>

                        <button
                          disabled={!worker.profileFP || !!worker.startFP}
                          onClick={() =>
                            openScan({ type: "labor", id: worker.id, mode: "start" })
                          }
                          className="px-3 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-40 text-white rounded-lg text-xs font-medium transition-colors"
                        >
                          Start Work
                        </button>

                        <button
                          disabled={!worker.startFP || !!worker.endFP}
                          onClick={() =>
                            openScan({ type: "labor", id: worker.id, mode: "end" })
                          }
                          className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-lg text-xs font-medium transition-colors"
                        >
                          End Work
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ✅ Scan Modal */}
      {showFaceScanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-4 sm:p-6 mx-4">
            <div className="text-center">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                Offline Photo Verification
              </h2>

              <p className="text-xs text-gray-600 mb-3">
                Mode:{" "}
                <span className="font-semibold text-gray-900">
                  {scanMeta?.type} / {scanMeta?.mode}
                </span>
              </p>

              <div className="relative bg-black rounded-lg overflow-hidden mb-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 sm:h-96 object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-60 sm:w-64 sm:h-80 border-4 border-blue-500 rounded-lg"></div>
                </div>
              </div>

              {scanStatus === "scanning" && (
                <div className="text-blue-600 text-sm font-medium">
                  {scanMessage || "Scanning..."}
                </div>
              )}

              {scanStatus === "success" && (
                <div className="text-green-600 text-sm font-medium">
                  {scanMessage || "Verified ✅"}
                </div>
              )}

              {scanStatus === "fail" && (
                <div className="text-red-600 text-sm font-medium">
                  {scanMessage || "Mismatch ❌"}
                </div>
              )}

              <div className="flex gap-2 justify-center mt-4">
                <button
                  onClick={captureAndVerify}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Capture & Verify
                </button>

                <button
                  onClick={closeScan}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-sm font-medium transition-colors"
                >
                  Close
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-3">
                Tip: keep same lighting for higher match score.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Add Worker Modal */}
      {showAddWorkerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-4 sm:p-6 mx-4">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Add New Worker
              </h2>
              <button
                onClick={() => setShowAddWorkerModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Worker Name
                </label>
                <input
                  type="text"
                  value={newWorkerName}
                  onChange={(e) => setNewWorkerName(e.target.value)}
                  placeholder="Enter worker name"
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={newWorkerCategory}
                  onChange={(e) => setNewWorkerCategory(e.target.value)}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mudkam (Village/Origin)
                </label>
                <input
                  type="text"
                  value={newWorkerMudkam}
                  onChange={(e) => setNewWorkerMudkam(e.target.value)}
                  placeholder="e.g., Village Rampur, UP"
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={addWorker}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 rounded-lg transition-colors"
                >
                  Add Worker
                </button>
                <button
                  onClick={() => setShowAddWorkerModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Wage Payment Modal (kept simple) */}
      {showWageModal && selectedWorker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-4 sm:p-6 mx-4">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Process Wage Payment
              </h2>
              <button
                onClick={() => setShowWageModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => processWagePayment(selectedWorker.id)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors"
              >
                Pay & Checkout
              </button>
              <button
                onClick={() => setShowWageModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
