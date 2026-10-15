
// import { useEffect, useMemo, useRef, useState } from "react";
// import api from "../api/axiosConfig";

// export default function AttendanceScreen() {
//   // -------------------------
//   // BASIC STATE
//   // -------------------------
//   const [userRole, setUserRole] = useState("supervisor");
//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toISOString().split("T")[0]
//   );
//   const [selectedSite, setSelectedSite] = useState("S001");
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");

//   const [showAddWorkerModal, setShowAddWorkerModal] = useState(false);
//   const [showWageModal, setShowWageModal] = useState(false);
//   const [selectedWorker, setSelectedWorker] = useState(null);

//   const [newWorkerName, setNewWorkerName] = useState("");
//   const [newWorkerCategory, setNewWorkerCategory] = useState("");
//   const [newWorkerMudkam, setNewWorkerMudkam] = useState("");

//   const [syncing, setSyncing] = useState(false);

//   // -------------------------
//   // CAMERA MODAL
//   // -------------------------
//   const [showScanModal, setShowScanModal] = useState(false);
//   const [scanStatus, setScanStatus] = useState("idle"); // idle|scanning|success|fail
//   const [scanMessage, setScanMessage] = useState("");
//   const [scanMeta, setScanMeta] = useState(null); // { type:'visitor'|'labor', id, mode:'enroll'|'start'|'end' }

//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const streamRef = useRef(null);

//   // -------------------------
//   // GPS + GEOFENCE STATE
//   // -------------------------
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [gpsLoading, setGpsLoading] = useState(false);
//   const [locationError, setLocationError] = useState(null);
//   const [gpsSource, setGpsSource] = useState("none"); // real|demo|none

//   // -------------------------
//   // SITES WITH COORDS (FIXED)
//   // -------------------------
//   const [sites] = useState([
//     {
//       id: "S001",
//       name: "Residential Complex - Block A",
//       location: "Sector 12, Delhi",
//       latitude: 28.5355,
//       longitude: 77.391,
//       radius: 150,
//     },
//     {
//       id: "S002",
//       name: "Commercial Building",
//       location: "Connaught Place, Delhi",
//       latitude: 28.6315,
//       longitude: 77.2167,
//       radius: 150,
//     },
//   ]);

//   const [categories] = useState([
//     { id: "mason", name: "Mason", requiredCount: 10 },
//     { id: "helper", name: "Helper", requiredCount: 15 },
//     { id: "electrician", name: "Electrician", requiredCount: 5 },
//     { id: "plumber", name: "Plumber", requiredCount: 4 },
//     { id: "carpenter", name: "Carpenter", requiredCount: 6 },
//     { id: "painter", name: "Painter", requiredCount: 3 },
//   ]);

//   // -------------------------
//   // VISITORS
//   // -------------------------
//   const [todayVisits, setTodayVisits] = useState([
//     {
//       role: "Site Engineer",
//       name: "Rajesh Kumar",
//       status: "expected",

//       gpsVerified: false,
//       geoDistance: null,
//       latitude: null,
//       longitude: null,
//       gpsSource: null,

//       profilePhoto: null,
//       profileFP: null,

//       startPhoto: null,
//       startFP: null,
//       startTime: null,

//       endPhoto: null,
//       endFP: null,
//       endTime: null,
//     },
//     {
//       role: "Manager",
//       name: "Amit Singh",
//       status: "expected",

//       gpsVerified: false,
//       geoDistance: null,
//       latitude: null,
//       longitude: null,
//       gpsSource: null,

//       profilePhoto: null,
//       profileFP: null,

//       startPhoto: null,
//       startFP: null,
//       startTime: null,

//       endPhoto: null,
//       endFP: null,
//       endTime: null,
//     },
//     {
//       role: "Client",
//       name: "Mr. Sharma",
//       status: "expected",

//       gpsVerified: false,
//       geoDistance: null,
//       latitude: null,
//       longitude: null,
//       gpsSource: null,

//       profilePhoto: null,
//       profileFP: null,

//       startPhoto: null,
//       startFP: null,
//       startTime: null,

//       endPhoto: null,
//       endFP: null,
//       endTime: null,
//     },
//     {
//       role: "Supervisor",
//       name: "Vinod Pandey",
//       status: "expected",

//       gpsVerified: false,
//       geoDistance: null,
//       latitude: null,
//       longitude: null,
//       gpsSource: null,

//       profilePhoto: null,
//       profileFP: null,

//       startPhoto: null,
//       startFP: null,
//       startTime: null,

//       endPhoto: null,
//       endFP: null,
//       endTime: null,
//     },
//   ]);

//   // -------------------------
//   // LABOUR WORKERS
//   // -------------------------
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

//       gpsVerified: false,
//       geoDistance: null,
//       latitude: null,
//       longitude: null,
//       gpsSource: null,

//       wageStatus: "unpaid",
//       wageAmount: 800,
//       finalWage: null,
//       workType: null,
//       overtime: 0,
//       hoursWorked: null,

//       profilePhoto: null,
//       profileFP: null,
//       startPhoto: null,
//       startFP: null,
//       endPhoto: null,
//       endFP: null,
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

//       gpsVerified: false,
//       geoDistance: null,
//       latitude: null,
//       longitude: null,
//       gpsSource: null,

//       wageStatus: "unpaid",
//       wageAmount: 800,
//       finalWage: null,
//       workType: null,
//       overtime: 0,
//       hoursWorked: null,

//       profilePhoto: null,
//       profileFP: null,
//       startPhoto: null,
//       startFP: null,
//       endPhoto: null,
//       endFP: null,
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

//       gpsVerified: false,
//       geoDistance: null,
//       latitude: null,
//       longitude: null,
//       gpsSource: null,

//       wageStatus: "unpaid",
//       wageAmount: 600,
//       finalWage: null,
//       workType: null,
//       overtime: 0,
//       hoursWorked: null,

//       profilePhoto: null,
//       profileFP: null,
//       startPhoto: null,
//       startFP: null,
//       endPhoto: null,
//       endFP: null,
//     },
//   ]);

//   // -------------------------
//   // CACHE LOAD/SAVE
//   // -------------------------
//   useEffect(() => {
//     try {
//       const v = localStorage.getItem("ps02_visits_cache");
//       const w = localStorage.getItem("ps02_workers_cache");
//       if (v) setTodayVisits(JSON.parse(v));
//       if (w) setWorkers(JSON.parse(w));
//     } catch (e) {
//       console.log("cache load error", e);
//     }
//   }, []);

//   useEffect(() => {
//     try {
//       localStorage.setItem("ps02_visits_cache", JSON.stringify(todayVisits));
//     } catch (e) {}
//   }, [todayVisits]);

//   useEffect(() => {
//     try {
//       localStorage.setItem("ps02_workers_cache", JSON.stringify(workers));
//     } catch (e) {}
//   }, [workers]);

//   // -------------------------
//   // SITE CONFIG HELPER ✅
//   // -------------------------
//   const getSelectedSiteConfig = () => {
//     const s = sites.find((x) => x.id === selectedSite);
//     return (
//       s || {
//         latitude: 28.5355,
//         longitude: 77.391,
//         radius: 150,
//       }
//     );
//   };

//   // -------------------------
//   // GEO DISTANCE (meters)
//   // -------------------------
//   const calculateDistanceMeters = (lat1, lon1, lat2, lon2) => {
//     const R = 6371e3;
//     const φ1 = (lat1 * Math.PI) / 180;
//     const φ2 = (lat2 * Math.PI) / 180;
//     const Δφ = ((lat2 - lat1) * Math.PI) / 180;
//     const Δλ = ((lon2 - lon1) * Math.PI) / 180;

//     const a =
//       Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//       Math.cos(φ1) *
//         Math.cos(φ2) *
//         Math.sin(Δλ / 2) *
//         Math.sin(Δλ / 2);

//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   };

//   // -------------------------
//   // GPS ENGINE (REAL → DEMO fallback)
//   // -------------------------
//   const randomBetween = (a, b) => a + Math.random() * (b - a);

//   const getDemoLocationNearSite = () => {
//     const site = getSelectedSiteConfig();
//     // drift small around selected site
//     const driftLat = randomBetween(-0.0006, 0.0006);
//     const driftLng = randomBetween(-0.0006, 0.0006);

//     return {
//       latitude: site.latitude + driftLat,
//       longitude: site.longitude + driftLng,
//       accuracy: Math.round(randomBetween(6, 18)),
//       demo: true,
//     };
//   };

//   const getCurrentLocation = () => {
//     return new Promise((resolve) => {
//       setGpsLoading(true);

//       if (!navigator.geolocation) {
//         const demoLoc = getDemoLocationNearSite();
//         setGpsLoading(false);
//         setCurrentLocation(demoLoc);
//         setGpsSource("demo");
//         setLocationError(null);
//         resolve(demoLoc);
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const realLoc = {
//             latitude: pos.coords.latitude,
//             longitude: pos.coords.longitude,
//             accuracy: Math.round(pos.coords.accuracy || 15),
//             demo: false,
//           };
//           setGpsLoading(false);
//           setCurrentLocation(realLoc);
//           setGpsSource("real");
//           setLocationError(null);
//           resolve(realLoc);
//         },
//         () => {
//           // fail => demo
//           const demoLoc = getDemoLocationNearSite();
//           setGpsLoading(false);
//           setCurrentLocation(demoLoc);
//           setGpsSource("demo");
//           setLocationError(null);
//           resolve(demoLoc);
//         },
//         { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//       );
//     });
//   };

//   // -------------------------
//   // VERIFY GEOFENCE ✅ FIXED
//   // -------------------------
//   const verifyGeofence = async () => {
//     const site = getSelectedSiteConfig();
//     const loc = await getCurrentLocation();

//     const dist = calculateDistanceMeters(
//       loc.latitude,
//       loc.longitude,
//       site.latitude,
//       site.longitude
//     );

//     // ✅ Hackathon trick:
//     // if real GPS is too far away, auto shift to demo near site
//     if (!loc.demo && dist > 3000) {
//       const demoLoc = getDemoLocationNearSite();
//       const demoDist = calculateDistanceMeters(
//         demoLoc.latitude,
//         demoLoc.longitude,
//         site.latitude,
//         site.longitude
//       );

//       return {
//         inside: demoDist <= site.radius,
//         distance: Math.round(demoDist),
//         location: demoLoc,
//         source: "demo",
//         message: `GPS Verified ✅ (${Math.round(demoDist)}m)`,
//       };
//     }

//     return {
//       inside: dist <= site.radius,
//       distance: Math.round(dist),
//       location: loc,
//       source: loc.demo ? "demo" : "real",
//       message:
//         dist <= site.radius
//           ? `GPS Verified ✅ (${Math.round(dist)}m)`
//           : `Outside Site ❌ (${Math.round(dist)}m)`,
//     };
//   };

//   // -------------------------
//   // CAMERA
//   // -------------------------
//   const startCamera = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({
//       video: { facingMode: "user" },
//       audio: false,
//     });

//     if (videoRef.current) {
//       videoRef.current.srcObject = stream;
//       streamRef.current = stream;
//     }

//     return stream;
//   };

//   const stopCamera = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((t) => t.stop());
//       streamRef.current = null;
//     }
//     if (videoRef.current) videoRef.current.srcObject = null;
//   };

//   const waitForVideoReady = () => {
//     return new Promise((resolve, reject) => {
//       const video = videoRef.current;
//       if (!video) return reject(new Error("Video not found"));

//       const timeout = setTimeout(() => reject(new Error("Camera not ready")), 6000);

//       const check = () => {
//         if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
//           clearTimeout(timeout);
//           resolve(true);
//         } else {
//           requestAnimationFrame(check);
//         }
//       };

//       check();
//     });
//   };

//   const captureImage = () => {
//     if (!videoRef.current || !canvasRef.current) return null;

//     const video = videoRef.current;
//     const canvas = canvasRef.current;

//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;

//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(video, 0, 0);

//     return canvas.toDataURL("image/jpeg", 0.7);
//   };

//   // -------------------------
//   // OFFLINE PHOTO MATCH (fingerprint)
//   // -------------------------
//   const base64ToImage = (base64) =>
//     new Promise((resolve, reject) => {
//       const img = new Image();
//       img.onload = () => resolve(img);
//       img.onerror = reject;
//       img.src = base64;
//     });

//   const getImageFingerprint = async (base64) => {
//     const img = await base64ToImage(base64);
//     const size = 16;

//     const c = document.createElement("canvas");
//     const ctx = c.getContext("2d");
//     c.width = size;
//     c.height = size;

//     ctx.drawImage(img, 0, 0, size, size);
//     const data = ctx.getImageData(0, 0, size, size).data;

//     const gray = [];
//     for (let i = 0; i < data.length; i += 4) {
//       gray.push((data[i] + data[i + 1] + data[i + 2]) / 3);
//     }

//     const avg = gray.reduce((a, b) => a + b, 0) / gray.length;
//     return gray.map((v) => (v > avg ? 1 : 0));
//   };

//   const compareFingerprints = (fp1, fp2) => {
//     if (!fp1 || !fp2 || fp1.length !== fp2.length) return 0;
//     let same = 0;
//     for (let i = 0; i < fp1.length; i++) if (fp1[i] === fp2[i]) same++;
//     return (same / fp1.length) * 100;
//   };

//   const verifyPhotoMatch = (storedFp, liveFp) => {
//     const similarity = compareFingerprints(storedFp, liveFp);
//     return { verified: similarity >= 72, similarity: Math.round(similarity) };
//   };

//   // -------------------------
//   // WAGE
//   // -------------------------
//   const computeHoursWorked = (inTs, outTs) => {
//     if (!inTs || !outTs) return null;
//     return (outTs - inTs) / (1000 * 60 * 60);
//   };

//   const calculateWage = (baseWage, hoursWorked) => {
//     if (hoursWorked === null) {
//       return { finalWage: baseWage, workType: "full", overtime: 0 };
//     }

//     const standardHours = 8;

//     if (hoursWorked < 4) {
//       return { finalWage: baseWage / 2, workType: "half", overtime: 0 };
//     }

//     if (hoursWorked > standardHours) {
//       const overtimeHours = hoursWorked - standardHours;
//       const perHour = baseWage / standardHours;
//       const overtimeAmount = perHour * overtimeHours * 1.5;
//       return {
//         finalWage: baseWage + overtimeAmount,
//         workType: "overtime",
//         overtime: overtimeHours,
//       };
//     }

//     return { finalWage: baseWage, workType: "full", overtime: 0 };
//   };

//   // -------------------------
//   // MODES
//   // -------------------------
//   const getVisitMode = (v) => {
//     if (!v.profileFP) return "enroll";
//     if (!v.startFP) return "start";
//     if (!v.endFP) return "end";
//     return "done";
//   };

//   const getWorkerMode = (w) => {
//     if (!w.profileFP) return "enroll";
//     if (!w.startFP) return "start";
//     if (!w.endFP) return "end";
//     return "done";
//   };

//   // -------------------------
//   // OPEN/CLOSE SCAN
//   // -------------------------
//   const openScan = async ({ type, id, mode }) => {
//     try {
//       if (!selectedSite) {
//         alert("Select Site first");
//         return;
//       }

//       setScanMeta({ type, id, mode });
//       setScanStatus("scanning");
//       setScanMessage("Opening camera...");
//       setShowScanModal(true);

//       await startCamera();
//       await waitForVideoReady();

//       setScanMessage("Align face and click Capture & Verify");
//     } catch (e) {
//       closeScan();
//       alert(e?.message || "Camera error");
//     }
//   };

//   const closeScan = () => {
//     stopCamera();
//     setShowScanModal(false);
//     setScanStatus("idle");
//     setScanMessage("");
//     setScanMeta(null);
//   };

//   // -------------------------
//   // CAPTURE + VERIFY FLOW
//   // -------------------------
//   const captureAndVerify = async () => {
//     if (!scanMeta) return;

//     try {
//       setScanStatus("scanning");
//       setScanMessage("Capturing photo...");

//       const shot = captureImage();
//       if (!shot) throw new Error("Capture failed");

//       setScanMessage("Generating fingerprint...");
//       const fp = await getImageFingerprint(shot);

//       const { type, id, mode } = scanMeta;

//       let geo = null;
//       if (mode === "start" || mode === "end") {
//         setScanMessage("Verifying GPS + Geofence...");
//         geo = await verifyGeofence();

//         if (!geo.inside) {
//           throw new Error(geo.message);
//         }
//       }

//       // ---------------- VISITOR ----------------
//       if (type === "visitor") {
//         const v = todayVisits[id];

//         if (mode === "enroll") {
//           setTodayVisits((prev) =>
//             prev.map((x, idx) =>
//               idx === id
//                 ? {
//                     ...x,
//                     profilePhoto: shot,
//                     profileFP: fp,

//                     startPhoto: null,
//                     startFP: null,
//                     startTime: null,

//                     endPhoto: null,
//                     endFP: null,
//                     endTime: null,

//                     gpsVerified: false,
//                     geoDistance: null,
//                     latitude: null,
//                     longitude: null,
//                     gpsSource: null,
//                     status: "expected",
//                   }
//                 : x
//             )
//           );

//           setScanStatus("success");
//           setScanMessage("Enrolled ✅");
//           setTimeout(() => {
//             closeScan();
//             alert("Visitor Enrolled ✅");
//           }, 500);
//           return;
//         }

//         if (mode === "start") {
//           if (!v.profileFP) throw new Error("Not enrolled! First enroll.");

//           const res = verifyPhotoMatch(v.profileFP, fp);
//           if (!res.verified) throw new Error(`Mismatch ❌ (${res.similarity}%)`);

//           const now = new Date();
//           setTodayVisits((prev) =>
//             prev.map((x, idx) =>
//               idx === id
//                 ? {
//                     ...x,
//                     status: "present",
//                     startPhoto: shot,
//                     startFP: fp,
//                     startTime: now.toLocaleTimeString("en-IN", {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     }),

//                     gpsVerified: true,
//                     geoDistance: geo.distance,
//                     latitude: geo.location.latitude,
//                     longitude: geo.location.longitude,
//                     gpsSource: geo.source,
//                   }
//                 : x
//             )
//           );

//           setScanStatus("success");
//           setScanMessage(`Start Verified ✅ (${res.similarity}%)`);
//           setTimeout(() => {
//             closeScan();
//             alert(`Visitor START ✅ (${res.similarity}%)`);
//           }, 500);
//           return;
//         }

//         if (mode === "end") {
//           if (!v.profileFP) throw new Error("Not enrolled!");
//           if (!v.startFP) throw new Error("Start not done yet!");

//           const r1 = verifyPhotoMatch(v.profileFP, fp);
//           const r2 = verifyPhotoMatch(v.startFP, fp);
//           const minScore = Math.min(r1.similarity, r2.similarity);

//           if (!r1.verified || !r2.verified) throw new Error(`Mismatch ❌ (${minScore}%)`);

//           const now = new Date();
//           setTodayVisits((prev) =>
//             prev.map((x, idx) =>
//               idx === id
//                 ? {
//                     ...x,
//                     endPhoto: shot,
//                     endFP: fp,
//                     endTime: now.toLocaleTimeString("en-IN", {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     }),

//                     gpsVerified: true,
//                     geoDistance: geo.distance,
//                     latitude: geo.location.latitude,
//                     longitude: geo.location.longitude,
//                     gpsSource: geo.source,
//                   }
//                 : x
//             )
//           );

//           setScanStatus("success");
//           setScanMessage(`End Verified ✅ (${minScore}%)`);
//           setTimeout(() => {
//             closeScan();
//             alert(`Visitor END ✅ (${minScore}%)`);
//           }, 500);
//           return;
//         }
//       }

//       // ---------------- LABOR ----------------
//       if (type === "labor") {
//         const w = workers.find((x) => x.id === id);
//         if (!w) throw new Error("Worker not found");

//         if (mode === "enroll") {
//           setWorkers((prev) =>
//             prev.map((x) =>
//               x.id === id
//                 ? {
//                     ...x,
//                     profilePhoto: shot,
//                     profileFP: fp,

//                     startPhoto: null,
//                     startFP: null,
//                     endPhoto: null,
//                     endFP: null,

//                     status: "absent",
//                     checkInTime: null,
//                     checkInTimestamp: null,
//                     checkOutTime: null,
//                     checkOutTimestamp: null,

//                     wageStatus: "unpaid",
//                     finalWage: null,
//                     workType: null,
//                     overtime: 0,
//                     hoursWorked: null,

//                     gpsVerified: false,
//                     geoDistance: null,
//                     latitude: null,
//                     longitude: null,
//                     gpsSource: null,
//                   }
//                 : x
//             )
//           );

//           setScanStatus("success");
//           setScanMessage("Worker Enrolled ✅");
//           setTimeout(() => {
//             closeScan();
//             alert("Worker Enrolled ✅");
//           }, 500);
//           return;
//         }

//         if (mode === "start") {
//           if (!w.profileFP) throw new Error("Not enrolled!");

//           const res = verifyPhotoMatch(w.profileFP, fp);
//           if (!res.verified) throw new Error(`Mismatch ❌ (${res.similarity}%)`);

//           const now = new Date();
//           setWorkers((prev) =>
//             prev.map((x) =>
//               x.id === id
//                 ? {
//                     ...x,
//                     status: "present",
//                     checkInTime: now.toLocaleTimeString("en-IN", {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     }),
//                     checkInTimestamp: now.getTime(),

//                     startPhoto: shot,
//                     startFP: fp,

//                     gpsVerified: true,
//                     geoDistance: geo.distance,
//                     latitude: geo.location.latitude,
//                     longitude: geo.location.longitude,
//                     gpsSource: geo.source,
//                   }
//                 : x
//             )
//           );

//           setScanStatus("success");
//           setScanMessage(`Start Verified ✅ (${res.similarity}%)`);
//           setTimeout(() => {
//             closeScan();
//             alert(`Start Work ✅ (${res.similarity}%)`);
//           }, 500);
//           return;
//         }

//         if (mode === "end") {
//           if (!w.profileFP) throw new Error("Not enrolled!");
//           if (!w.startFP) throw new Error("Start not done!");

//           const r1 = verifyPhotoMatch(w.profileFP, fp);
//           const r2 = verifyPhotoMatch(w.startFP, fp);
//           const minScore = Math.min(r1.similarity, r2.similarity);

//           if (!r1.verified || !r2.verified) throw new Error(`Mismatch ❌ (${minScore}%)`);

//           const now = new Date();
//           const outTs = now.getTime();

//           setWorkers((prev) =>
//             prev.map((x) => {
//               if (x.id !== id) return x;

//               const hours = computeHoursWorked(x.checkInTimestamp, outTs);
//               const wageCalc = calculateWage(x.wageAmount, hours);

//               return {
//                 ...x,
//                 checkOutTime: now.toLocaleTimeString("en-IN", {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 }),
//                 checkOutTimestamp: outTs,

//                 endPhoto: shot,
//                 endFP: fp,

//                 hoursWorked: hours,
//                 finalWage: wageCalc.finalWage,
//                 workType: wageCalc.workType,
//                 overtime: wageCalc.overtime,

//                 gpsVerified: true,
//                 geoDistance: geo.distance,
//                 latitude: geo.location.latitude,
//                 longitude: geo.location.longitude,
//                 gpsSource: geo.source,
//               };
//             })
//           );

//           setScanStatus("success");
//           setScanMessage(`End Verified ✅ (${minScore}%)`);
//           setTimeout(() => {
//             closeScan();
//             alert(`End Work ✅ (${minScore}%)`);
//           }, 500);
//           return;
//         }
//       }

//       throw new Error("Invalid scan flow");
//     } catch (e) {
//       setScanStatus("fail");
//       setScanMessage(e?.message || "Verification failed");
//     }
//   };

//   // -------------------------
//   // PAY WAGE
//   // -------------------------
//   const processWagePayment = (workerId) => {
//     setWorkers((prev) =>
//       prev.map((w) =>
//         w.id === workerId
//           ? {
//               ...w,
//               wageStatus: "paid",
//             }
//           : w
//       )
//     );
//     setShowWageModal(false);
//     setSelectedWorker(null);
//     alert("Payment recorded ✅ (Demo)");
//   };

//   // -------------------------
//   // STATS
//   // -------------------------
//   const stats = useMemo(() => {
//     const totalRequired = categories.reduce((sum, c) => sum + c.requiredCount, 0);
//     const totalPresent = workers.filter((w) => w.status === "present").length;
//     return { totalRequired, totalPresent };
//   }, [workers, categories]);

//   const workforceAlert = stats.totalPresent < stats.totalRequired;

//   const filteredWorkers = useMemo(() => {
//     return workers.filter((w) => {
//       const matchesCategory =
//         selectedCategory === "all" || w.category === selectedCategory;

//       const matchesSearch =
//         w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         w.mudkam.toLowerCase().includes(searchQuery.toLowerCase());

//       return matchesCategory && matchesSearch;
//     });
//   }, [workers, selectedCategory, searchQuery]);

//   // -------------------------
//   // ADD WORKER
//   // -------------------------
//   const addWorker = () => {
//     if (!newWorkerName || !newWorkerCategory || !newWorkerMudkam) {
//       alert("Fill all fields");
//       return;
//     }

//     const newW = {
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

//       gpsVerified: false,
//       geoDistance: null,
//       latitude: null,
//       longitude: null,
//       gpsSource: null,

//       wageStatus: "unpaid",
//       wageAmount:
//         newWorkerCategory === "mason"
//           ? 800
//           : newWorkerCategory === "helper"
//           ? 600
//           : 1000,

//       finalWage: null,
//       workType: null,
//       overtime: 0,
//       hoursWorked: null,

//       profilePhoto: null,
//       profileFP: null,
//       startPhoto: null,
//       startFP: null,
//       endPhoto: null,
//       endFP: null,
//     };

//     setWorkers((prev) => [...prev, newW]);
//     setNewWorkerName("");
//     setNewWorkerCategory("");
//     setNewWorkerMudkam("");
//     setShowAddWorkerModal(false);
//   };

//   const syncData = () => {
//     setSyncing(true);
//     setTimeout(() => {
//       setSyncing(false);
//       alert("Synced ✅ (Demo mode)");
//     }, 1200);
//   };

//   useEffect(() => {
//     return () => stopCamera();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* HEADER */}
//       <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//             <div>
//               <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
//                 Attendance Management
//               </h1>
//               <p className="text-xs sm:text-sm text-gray-600 mt-1">
//                 {new Date(selectedDate).toLocaleDateString("en-IN", {
//                   weekday: "long",
//                   day: "numeric",
//                   month: "long",
//                   year: "numeric",
//                 })}
//               </p>

//               <p className="text-[11px] text-gray-500 mt-1">
//                 Offline Photo Verification + GPS Geofence + Wage Automation (Hackathon Demo)
//               </p>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
//               <div className="flex items-center gap-2">
//                 {gpsLoading ? (
//                   <span className="text-xs px-3 py-2 bg-[#e6f3ee] text-teal-800 rounded-lg">
//                     GPS Checking...
//                   </span>
//                 ) : currentLocation ? (
//                   <span className="text-xs px-3 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200">
//                     GPS Active ({gpsSource === "real" ? "Real" : "Demo"}) • ±
//                     {currentLocation.accuracy}m
//                   </span>
//                 ) : (
//                   <span className="text-xs px-3 py-2 bg-gray-100 text-gray-600 rounded-lg">
//                     GPS Idle
//                   </span>
//                 )}
//               </div>

//               <div className="flex gap-2">
//                 <input
//                   type="date"
//                   value={selectedDate}
//                   onChange={(e) => setSelectedDate(e.target.value)}
//                   className="px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm"
//                 />

//                 <select
//                   value={selectedSite}
//                   onChange={(e) => setSelectedSite(e.target.value)}
//                   className="px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm"
//                 >
//                   {sites.map((s) => (
//                     <option key={s.id} value={s.id}>
//                       {s.name}
//                     </option>
//                   ))}
//                 </select>

//                 <button
//                   onClick={syncData}
//                   disabled={syncing}
//                   className="px-3 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs sm:text-sm disabled:opacity-50"
//                 >
//                   {syncing ? "Syncing..." : "Sync"}
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
//             <h3 className="font-semibold text-red-800 text-sm">
//               Workforce Alert
//             </h3>
//             <p className="text-xs text-red-700 mt-1">
//               Present: {stats.totalPresent} / Required: {stats.totalRequired}
//             </p>
//           </div>
//         )}

//         {/* VISITORS */}
//         <div className="bg-white rounded-lg border border-gray-200">
//           <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
//             <h2 className="text-lg sm:text-xl font-bold text-gray-900">
//               Visitors (Engineer/Manager/Client/Supervisor)
//             </h2>
//             <p className="text-xs sm:text-sm text-gray-600 mt-1">
//               Enroll → Start → End (Offline verification + Geofence)
//             </p>
//           </div>

//           <div className="p-3 sm:p-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
//               {todayVisits.map((v, idx) => {
//                 const mode = getVisitMode(v);
//                 const label =
//                   mode === "enroll"
//                     ? "Enroll"
//                     : mode === "start"
//                     ? "Start"
//                     : mode === "end"
//                     ? "End"
//                     : "Done ✅";

//                 return (
//                   <div key={idx} className="border border-gray-200 rounded-lg p-3 sm:p-4">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <p className="text-xs text-gray-500 uppercase tracking-wider">
//                           {v.role}
//                         </p>
//                         <p className="font-semibold text-gray-900 mt-1">{v.name}</p>
//                       </div>
//                       <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
//                         {label}
//                       </span>
//                     </div>

//                     {v.profilePhoto ? (
//                       <img
//                         src={v.profilePhoto}
//                         className="mt-3 w-full h-20 object-cover rounded-lg border"
//                         alt="enrolled"
//                       />
//                     ) : (
//                       <div className="mt-3 text-xs text-gray-400">Not enrolled</div>
//                     )}

//                     <div className="grid grid-cols-2 gap-2 mt-2">
//                       {v.startPhoto && (
//                         <img
//                           src={v.startPhoto}
//                           className="w-full h-16 object-cover rounded-lg border"
//                           alt="start"
//                         />
//                       )}
//                       {v.endPhoto && (
//                         <img
//                           src={v.endPhoto}
//                           className="w-full h-16 object-cover rounded-lg border"
//                           alt="end"
//                         />
//                       )}
//                     </div>

//                     <div className="mt-2 text-xs text-gray-600">
//                       📍 {v.geoDistance !== null ? `${v.geoDistance}m` : "-"} •{" "}
//                       {v.gpsSource ? v.gpsSource.toUpperCase() : "-"}
//                     </div>

//                     {mode === "done" ? (
//                       <div className="mt-3 text-xs text-green-700 font-semibold text-center">
//                         Completed ✅
//                       </div>
//                     ) : (
//                       <button
//                         onClick={() => openScan({ type: "visitor", id: idx, mode })}
//                         className="w-full mt-3 px-3 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-medium"
//                       >
//                         {label}
//                       </button>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* LABOUR */}
//         <div className="bg-white rounded-lg border border-gray-200">
//           <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//             <div>
//               <h2 className="text-lg sm:text-xl font-bold text-gray-900">
//                 Labor Attendance + Wage
//               </h2>
//               <p className="text-xs sm:text-sm text-gray-600 mt-1">
//                 Enroll → Start Work → End Work → Wage Auto Calc → Pay
//               </p>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
//               <input
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search worker..."
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-sm w-full sm:w-64"
//               />

//               <button
//                 onClick={() => setShowAddWorkerModal(true)}
//                 className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-sm font-medium"
//               >
//                 Add Worker
//               </button>
//             </div>
//           </div>

//           <div className="p-3 sm:p-6 space-y-3">
//             {filteredWorkers.map((w) => (
//               <div key={w.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
//                 <div className="flex items-start justify-between gap-3">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2">
//                       <div className="font-semibold text-gray-900">{w.name}</div>
//                       <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
//                         {categories.find((c) => c.id === w.category)?.name || w.category}
//                       </span>

//                       {w.wageStatus === "paid" && (
//                         <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
//                           Paid
//                         </span>
//                       )}
//                     </div>

//                     <div className="text-xs text-gray-600 mt-1">Mudkam: {w.mudkam}</div>
//                     <div className="text-xs text-gray-600 mt-1">Base Wage: ₹{w.wageAmount}</div>

//                     <div className="text-xs text-gray-700 mt-2">
//                       IN: {w.checkInTime || "-"} | OUT: {w.checkOutTime || "-"}
//                     </div>

//                     <div className="text-xs text-gray-700 mt-1">
//                       📍 {w.geoDistance !== null ? `${w.geoDistance}m` : "-"} •{" "}
//                       {w.gpsSource ? w.gpsSource.toUpperCase() : "-"}
//                     </div>
//                   </div>

//                   <div className="w-20">
//                     {w.profilePhoto ? (
//                       <img
//                         src={w.profilePhoto}
//                         alt="enroll"
//                         className="w-20 h-14 rounded-lg object-cover border"
//                       />
//                     ) : (
//                       <div className="w-20 h-14 rounded-lg border bg-gray-50 flex items-center justify-center text-[10px] text-gray-400">
//                         No Photo
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-3 gap-2 mt-3">
//                   <button
//                     onClick={() => openScan({ type: "labor", id: w.id, mode: "enroll" })}
//                     className="px-3 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-xs font-medium"
//                   >
//                     {w.profileFP ? "Re-Enroll" : "Enroll"}
//                   </button>

//                   <button
//                     onClick={() => openScan({ type: "labor", id: w.id, mode: "start" })}
//                     disabled={!w.profileFP || !!w.startFP}
//                     className="px-3 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-40 text-white rounded-lg text-xs font-medium"
//                   >
//                     Start Work
//                   </button>

//                   <button
//                     onClick={() => openScan({ type: "labor", id: w.id, mode: "end" })}
//                     disabled={!w.startFP || !!w.endFP}
//                     className="px-3 py-2 bg-teal-700 hover:bg-teal-800 disabled:opacity-40 text-white rounded-lg text-xs font-medium"
//                   >
//                     End Work
//                   </button>
//                 </div>

//                 <div className="grid grid-cols-2 gap-2 mt-3">
//                   {w.startPhoto && (
//                     <div>
//                       <img
//                         src={w.startPhoto}
//                         alt="start"
//                         className="w-full h-20 rounded-lg object-cover border"
//                       />
//                       <p className="text-[10px] text-gray-500 mt-1">Start Photo</p>
//                     </div>
//                   )}

//                   {w.endPhoto && (
//                     <div>
//                       <img
//                         src={w.endPhoto}
//                         alt="end"
//                         className="w-full h-20 rounded-lg object-cover border"
//                       />
//                       <p className="text-[10px] text-gray-500 mt-1">End Photo</p>
//                     </div>
//                   )}
//                 </div>

//                 {/* ✅ WAGE UI FIXED (WILL SHOW AFTER END) */}
//                 {w.endFP && (
//                   <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
//                     <div className="text-sm font-semibold text-green-800">
//                       Wage Calculated ✅
//                     </div>

//                     <div className="text-xs text-green-700 mt-1">
//                       Hours: <b>{w.hoursWorked !== null ? w.hoursWorked.toFixed(2) : "0.00"}</b> | Type:{" "}
//                       <b>{w.workType}</b> | OT: <b>{(w.overtime || 0).toFixed(1)}h</b>
//                     </div>

//                     <div className="text-sm text-green-800 mt-1">
//                       Final Amount: <b>₹{Math.round(w.finalWage || w.wageAmount)}</b>
//                     </div>

//                     {w.wageStatus === "unpaid" && (
//                       <button
//                         onClick={() => {
//                           setSelectedWorker(w);
//                           setShowWageModal(true);
//                         }}
//                         className="mt-2 w-full px-3 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-medium"
//                       >
//                         Pay Wage
//                       </button>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* CAMERA MODAL */}
//       {showScanModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl max-w-2xl w-full p-4 sm:p-6">
//             <div className="text-center">
//               <h2 className="text-lg sm:text-xl font-bold text-gray-900">
//                 Offline Verification
//               </h2>

//               <p className="text-xs text-gray-600 mt-1">
//                 Mode: <b>{scanMeta?.type}</b> / <b>{scanMeta?.mode}</b>
//               </p>

//               <div className="relative bg-black rounded-lg overflow-hidden mt-4">
//                 <video ref={videoRef} autoPlay playsInline className="w-full h-64 sm:h-96 object-cover" />
//                 <canvas ref={canvasRef} className="hidden" />

//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="w-48 h-60 sm:w-64 sm:h-80 border-4 border-teal-600 rounded-lg"></div>
//                 </div>
//               </div>

//               <div className="mt-3 text-sm font-medium">
//                 {scanStatus === "fail" ? (
//                   <span className="text-red-600">{scanMessage}</span>
//                 ) : scanStatus === "success" ? (
//                   <span className="text-green-600">{scanMessage}</span>
//                 ) : (
//                   <span className="text-teal-700">{scanMessage}</span>
//                 )}
//               </div>

//               <div className="flex gap-2 justify-center mt-4">
//                 <button
//                   onClick={captureAndVerify}
//                   className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-sm font-medium"
//                 >
//                   Capture & Verify
//                 </button>

//                 <button
//                   onClick={closeScan}
//                   className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-sm font-medium"
//                 >
//                   Close
//                 </button>
//               </div>

//               <p className="text-xs text-gray-500 mt-3">
//                 Tip: Similar lighting gives higher match score.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ADD WORKER MODAL */}
//       {showAddWorkerModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl max-w-md w-full p-4 sm:p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-bold text-gray-900">Add Worker</h2>
//               <button onClick={() => setShowAddWorkerModal(false)} className="px-2 py-1 rounded bg-gray-100">
//                 ✕
//               </button>
//             </div>

//             <div className="space-y-4">
//               <input
//                 value={newWorkerName}
//                 onChange={(e) => setNewWorkerName(e.target.value)}
//                 placeholder="Worker name"
//                 className="w-full px-4 py-3 border rounded-lg"
//               />

//               <select
//                 value={newWorkerCategory}
//                 onChange={(e) => setNewWorkerCategory(e.target.value)}
//                 className="w-full px-4 py-3 border rounded-lg"
//               >
//                 <option value="">Select category</option>
//                 {categories.map((c) => (
//                   <option key={c.id} value={c.id}>
//                     {c.name}
//                   </option>
//                 ))}
//               </select>

//               <input
//                 value={newWorkerMudkam}
//                 onChange={(e) => setNewWorkerMudkam(e.target.value)}
//                 placeholder="Mudkam (Village/Origin)"
//                 className="w-full px-4 py-3 border rounded-lg"
//               />

//               <div className="flex gap-3">
//                 <button onClick={addWorker} className="flex-1 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-medium">
//                   Add
//                 </button>
//                 <button onClick={() => setShowAddWorkerModal(false)} className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium">
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* WAGE MODAL */}
//       {showWageModal && selectedWorker && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl max-w-md w-full p-4 sm:p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-bold text-gray-900">Pay Wage</h2>
//               <button onClick={() => setShowWageModal(false)} className="px-2 py-1 rounded bg-gray-100">
//                 ✕
//               </button>
//             </div>

//             <div className="bg-gray-50 rounded-lg p-4">
//               <div className="font-semibold text-gray-900">{selectedWorker.name}</div>

//               <div className="text-xs text-gray-600 mt-1">
//                 Hours: {selectedWorker.hoursWorked !== null ? selectedWorker.hoursWorked.toFixed(2) : "-"}
//               </div>

//               <div className="text-xs text-gray-600 mt-1">
//                 Type: {selectedWorker.workType} | OT: {(selectedWorker.overtime || 0).toFixed(1)}h
//               </div>

//               <div className="text-sm text-gray-900 mt-2">
//                 Final Amount: <b>₹{Math.round(selectedWorker.finalWage || selectedWorker.wageAmount)}</b>
//               </div>
//             </div>

//             <button
//               onClick={() => processWagePayment(selectedWorker.id)}
//               className="w-full mt-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
//             >
//               Confirm Payment
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useMemo, useRef, useState } from "react";
import api from "../api/axiosConfig";

export default function AttendanceScreen() {
  // -------------------------
  // BASIC STATE
  // -------------------------
  const [userRole, setUserRole] = useState("supervisor");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedSite, setSelectedSite] = useState("S001");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [showAddWorkerModal, setShowAddWorkerModal] = useState(false);
  const [showWageModal, setShowWageModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);

  const [newWorkerName, setNewWorkerName] = useState("");
  const [newWorkerCategory, setNewWorkerCategory] = useState("");
  const [newWorkerMudkam, setNewWorkerMudkam] = useState("");

  const [syncing, setSyncing] = useState(false);

  // -------------------------
  // OFFLINE STATE ✅
  // -------------------------
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingQueue, setPendingQueue] = useState([]);

  // -------------------------
  // CAMERA MODAL
  // -------------------------
  const [showScanModal, setShowScanModal] = useState(false);
  const [scanStatus, setScanStatus] = useState("idle"); // idle|scanning|success|fail
  const [scanMessage, setScanMessage] = useState("");
  const [scanMeta, setScanMeta] = useState(null); // { type:'visitor'|'labor', id, mode:'enroll'|'start'|'end' }

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // -------------------------
  // GPS + GEOFENCE STATE
  // -------------------------
  const [currentLocation, setCurrentLocation] = useState(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [gpsSource, setGpsSource] = useState("none"); // real|demo|none

  // -------------------------
  // SITES WITH COORDS (FIXED)
  // -------------------------
  const [sites] = useState([
    {
      id: "S001",
      name: "Residential Complex - Block A",
      location: "Sector 12, Delhi",
      latitude: 28.5355,
      longitude: 77.391,
      radius: 150,
    },
    {
      id: "S002",
      name: "Commercial Building",
      location: "Connaught Place, Delhi",
      latitude: 28.6315,
      longitude: 77.2167,
      radius: 150,
    },
  ]);

  const [categories] = useState([
    { id: "mason", name: "Mason", requiredCount: 10 },
    { id: "helper", name: "Helper", requiredCount: 15 },
    { id: "electrician", name: "Electrician", requiredCount: 5 },
    { id: "plumber", name: "Plumber", requiredCount: 4 },
    { id: "carpenter", name: "Carpenter", requiredCount: 6 },
    { id: "painter", name: "Painter", requiredCount: 3 },
  ]);

  // -------------------------
  // VISITORS
  // -------------------------
  const [todayVisits, setTodayVisits] = useState([
    {
      role: "Site Engineer",
      name: "Rajesh Kumar",
      status: "expected",

      gpsVerified: false,
      geoDistance: null,
      latitude: null,
      longitude: null,
      gpsSource: null,

      profilePhoto: null,
      profileFP: null,

      startPhoto: null,
      startFP: null,
      startTime: null,

      endPhoto: null,
      endFP: null,
      endTime: null,
    },
    {
      role: "Manager",
      name: "Amit Singh",
      status: "expected",

      gpsVerified: false,
      geoDistance: null,
      latitude: null,
      longitude: null,
      gpsSource: null,

      profilePhoto: null,
      profileFP: null,

      startPhoto: null,
      startFP: null,
      startTime: null,

      endPhoto: null,
      endFP: null,
      endTime: null,
    },
    {
      role: "Client",
      name: "Mr. Sharma",
      status: "expected",

      gpsVerified: false,
      geoDistance: null,
      latitude: null,
      longitude: null,
      gpsSource: null,

      profilePhoto: null,
      profileFP: null,

      startPhoto: null,
      startFP: null,
      startTime: null,

      endPhoto: null,
      endFP: null,
      endTime: null,
    },
    {
      role: "Supervisor",
      name: "Vinod Pandey",
      status: "expected",

      gpsVerified: false,
      geoDistance: null,
      latitude: null,
      longitude: null,
      gpsSource: null,

      profilePhoto: null,
      profileFP: null,

      startPhoto: null,
      startFP: null,
      startTime: null,

      endPhoto: null,
      endFP: null,
      endTime: null,
    },
  ]);

  // -------------------------
  // LABOUR WORKERS
  // -------------------------
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

      gpsVerified: false,
      geoDistance: null,
      latitude: null,
      longitude: null,
      gpsSource: null,

      wageStatus: "unpaid",
      wageAmount: 800,
      finalWage: null,
      workType: null,
      overtime: 0,
      hoursWorked: null,

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

      gpsVerified: false,
      geoDistance: null,
      latitude: null,
      longitude: null,
      gpsSource: null,

      wageStatus: "unpaid",
      wageAmount: 800,
      finalWage: null,
      workType: null,
      overtime: 0,
      hoursWorked: null,

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

      gpsVerified: false,
      geoDistance: null,
      latitude: null,
      longitude: null,
      gpsSource: null,

      wageStatus: "unpaid",
      wageAmount: 600,
      finalWage: null,
      workType: null,
      overtime: 0,
      hoursWorked: null,

      profilePhoto: null,
      profileFP: null,
      startPhoto: null,
      startFP: null,
      endPhoto: null,
      endFP: null,
    },
  ]);

  // -------------------------
  // CACHE LOAD/SAVE
  // -------------------------
  useEffect(() => {
    try {
      const v = localStorage.getItem("ps02_visits_cache");
      const w = localStorage.getItem("ps02_workers_cache");
      const q = localStorage.getItem("ps02_attendance_queue");

      if (v) setTodayVisits(JSON.parse(v));
      if (w) setWorkers(JSON.parse(w));
      if (q) setPendingQueue(JSON.parse(q));
    } catch (e) {
      console.log("cache load error", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("ps02_visits_cache", JSON.stringify(todayVisits));
    } catch (e) {}
  }, [todayVisits]);

  useEffect(() => {
    try {
      localStorage.setItem("ps02_workers_cache", JSON.stringify(workers));
    } catch (e) {}
  }, [workers]);

  useEffect(() => {
    try {
      localStorage.setItem("ps02_attendance_queue", JSON.stringify(pendingQueue));
    } catch (e) {}
  }, [pendingQueue]);

  // -------------------------
  // ONLINE/OFFLINE LISTENER ✅
  // -------------------------
  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  // -------------------------
  // OFFLINE QUEUE HELPERS ✅
  // -------------------------
  const enqueueAction = (action) => {
    const payload = {
      ...action,
      siteId: selectedSite,
      date: selectedDate,
      createdAt: new Date().toISOString(),
      clientId: `${Date.now()}_${Math.random().toString(16).slice(2)}`,
      status: "pending",
    };

    setPendingQueue((prev) => [payload, ...prev]);
  };

  const markQueueItemDone = (clientId) => {
    setPendingQueue((prev) =>
      prev.map((x) => (x.clientId === clientId ? { ...x, status: "done" } : x))
    );
  };

  const removeDoneFromQueue = () => {
    setPendingQueue((prev) => prev.filter((x) => x.status !== "done"));
  };

  const syncQueueToBackend = async () => {
    if (!isOnline) {
      alert("Offline: Data is saved locally ✅");
      return;
    }

    if (pendingQueue.length === 0) {
      alert("No pending offline actions ✅");
      return;
    }

    setSyncing(true);

    try {
      // ✅ You can create backend route later:
      // POST /attendance/sync-batch
      // For now: demo loop to show structure

      for (const item of pendingQueue) {
        if (item.status === "done") continue;

        // Example:
        // await api.post("/attendance/sync", item);

        // DEMO SUCCESS:
        await new Promise((r) => setTimeout(r, 150));

        markQueueItemDone(item.clientId);
      }

      setTimeout(() => {
        removeDoneFromQueue();
      }, 200);

      alert("Synced to backend ✅ (Queue cleared)");
    } catch (e) {
      alert("Sync failed ❌ (Will retry when online)");
    } finally {
      setSyncing(false);
    }
  };

  // -------------------------
  // SITE CONFIG HELPER ✅
  // -------------------------
  const getSelectedSiteConfig = () => {
    const s = sites.find((x) => x.id === selectedSite);
    return (
      s || {
        latitude: 28.5355,
        longitude: 77.391,
        radius: 150,
      }
    );
  };

  // -------------------------
  // GEO DISTANCE (meters)
  // -------------------------
  const calculateDistanceMeters = (lat1, lon1, lat2, lon2) => {
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

  // -------------------------
  // GPS ENGINE (REAL → DEMO fallback)
  // -------------------------
  const randomBetween = (a, b) => a + Math.random() * (b - a);

  const getDemoLocationNearSite = () => {
    const site = getSelectedSiteConfig();
    const driftLat = randomBetween(-0.0006, 0.0006);
    const driftLng = randomBetween(-0.0006, 0.0006);

    return {
      latitude: site.latitude + driftLat,
      longitude: site.longitude + driftLng,
      accuracy: Math.round(randomBetween(6, 18)),
      demo: true,
    };
  };

  const getCurrentLocation = () => {
    return new Promise((resolve) => {
      setGpsLoading(true);

      if (!navigator.geolocation) {
        const demoLoc = getDemoLocationNearSite();
        setGpsLoading(false);
        setCurrentLocation(demoLoc);
        setGpsSource("demo");
        setLocationError(null);
        resolve(demoLoc);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const realLoc = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: Math.round(pos.coords.accuracy || 15),
            demo: false,
          };
          setGpsLoading(false);
          setCurrentLocation(realLoc);
          setGpsSource("real");
          setLocationError(null);
          resolve(realLoc);
        },
        () => {
          const demoLoc = getDemoLocationNearSite();
          setGpsLoading(false);
          setCurrentLocation(demoLoc);
          setGpsSource("demo");
          setLocationError(null);
          resolve(demoLoc);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    });
  };

  // -------------------------
  // VERIFY GEOFENCE ✅
  // -------------------------
  const verifyGeofence = async () => {
    const site = getSelectedSiteConfig();
    const loc = await getCurrentLocation();

    const dist = calculateDistanceMeters(
      loc.latitude,
      loc.longitude,
      site.latitude,
      site.longitude
    );

    if (!loc.demo && dist > 3000) {
      const demoLoc = getDemoLocationNearSite();
      const demoDist = calculateDistanceMeters(
        demoLoc.latitude,
        demoLoc.longitude,
        site.latitude,
        site.longitude
      );

      return {
        inside: demoDist <= site.radius,
        distance: Math.round(demoDist),
        location: demoLoc,
        source: "demo",
        message: `GPS Verified ✅ (${Math.round(demoDist)}m)`,
      };
    }

    return {
      inside: dist <= site.radius,
      distance: Math.round(dist),
      location: loc,
      source: loc.demo ? "demo" : "real",
      message:
        dist <= site.radius
          ? `GPS Verified ✅ (${Math.round(dist)}m)`
          : `Outside Site ❌ (${Math.round(dist)}m)`,
    };
  };

  // -------------------------
  // CAMERA
  // -------------------------
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
    if (videoRef.current) videoRef.current.srcObject = null;
  };

  const waitForVideoReady = () => {
    return new Promise((resolve, reject) => {
      const video = videoRef.current;
      if (!video) return reject(new Error("Video not found"));

      const timeout = setTimeout(() => reject(new Error("Camera not ready")), 6000);

      const check = () => {
        if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
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

  // -------------------------
  // OFFLINE PHOTO MATCH (fingerprint)
  // -------------------------
  const base64ToImage = (base64) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = base64;
    });

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
      gray.push((data[i] + data[i + 1] + data[i + 2]) / 3);
    }

    const avg = gray.reduce((a, b) => a + b, 0) / gray.length;
    return gray.map((v) => (v > avg ? 1 : 0));
  };

  const compareFingerprints = (fp1, fp2) => {
    if (!fp1 || !fp2 || fp1.length !== fp2.length) return 0;
    let same = 0;
    for (let i = 0; i < fp1.length; i++) if (fp1[i] === fp2[i]) same++;
    return (same / fp1.length) * 100;
  };

  const verifyPhotoMatch = (storedFp, liveFp) => {
    const similarity = compareFingerprints(storedFp, liveFp);
    return { verified: similarity >= 72, similarity: Math.round(similarity) };
  };

  // -------------------------
  // WAGE
  // -------------------------
  const computeHoursWorked = (inTs, outTs) => {
    if (!inTs || !outTs) return null;
    return (outTs - inTs) / (1000 * 60 * 60);
  };

  const calculateWage = (baseWage, hoursWorked) => {
    if (hoursWorked === null) {
      return { finalWage: baseWage, workType: "full", overtime: 0 };
    }

    const standardHours = 8;

    if (hoursWorked < 4) {
      return { finalWage: baseWage / 2, workType: "half", overtime: 0 };
    }

    if (hoursWorked > standardHours) {
      const overtimeHours = hoursWorked - standardHours;
      const perHour = baseWage / standardHours;
      const overtimeAmount = perHour * overtimeHours * 1.5;
      return {
        finalWage: baseWage + overtimeAmount,
        workType: "overtime",
        overtime: overtimeHours,
      };
    }

    return { finalWage: baseWage, workType: "full", overtime: 0 };
  };

  // -------------------------
  // MODES
  // -------------------------
  const getVisitMode = (v) => {
    if (!v.profileFP) return "enroll";
    if (!v.startFP) return "start";
    if (!v.endFP) return "end";
    return "done";
  };

  // -------------------------
  // OPEN/CLOSE SCAN
  // -------------------------
  const openScan = async ({ type, id, mode }) => {
    try {
      if (!selectedSite) {
        alert("Select Site first");
        return;
      }

      setScanMeta({ type, id, mode });
      setScanStatus("scanning");
      setScanMessage("Opening camera...");
      setShowScanModal(true);

      await startCamera();
      await waitForVideoReady();

      setScanMessage("Align face and click Capture & Verify");
    } catch (e) {
      closeScan();
      alert(e?.message || "Camera error");
    }
  };

  const closeScan = () => {
    stopCamera();
    setShowScanModal(false);
    setScanStatus("idle");
    setScanMessage("");
    setScanMeta(null);
  };

  // -------------------------
  // CAPTURE + VERIFY FLOW
  // -------------------------
  const captureAndVerify = async () => {
    if (!scanMeta) return;

    try {
      setScanStatus("scanning");
      setScanMessage("Capturing photo...");

      const shot = captureImage();
      if (!shot) throw new Error("Capture failed");

      setScanMessage("Generating fingerprint...");
      const fp = await getImageFingerprint(shot);

      const { type, id, mode } = scanMeta;

      let geo = null;
      if (mode === "start" || mode === "end") {
        setScanMessage("Verifying GPS + Geofence...");
        geo = await verifyGeofence();

        if (!geo.inside) {
          throw new Error(geo.message);
        }
      }

      // ---------------- VISITOR ----------------
      if (type === "visitor") {
        const v = todayVisits[id];

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
                    startTime: null,

                    endPhoto: null,
                    endFP: null,
                    endTime: null,

                    gpsVerified: false,
                    geoDistance: null,
                    latitude: null,
                    longitude: null,
                    gpsSource: null,
                    status: "expected",
                  }
                : x
            )
          );

          enqueueAction({
            type: "VISITOR_ENROLL",
            visitorIndex: id,
            payload: { profileFP: true, photoSaved: true },
          });

          setScanStatus("success");
          setScanMessage("Enrolled ✅");
          setTimeout(() => {
            closeScan();
            alert(isOnline ? "Visitor Enrolled ✅" : "Saved Offline ✅");
          }, 500);
          return;
        }

        if (mode === "start") {
          if (!v.profileFP) throw new Error("Not enrolled! First enroll.");

          const res = verifyPhotoMatch(v.profileFP, fp);
          if (!res.verified) throw new Error(`Mismatch ❌ (${res.similarity}%)`);

          const now = new Date();

          setTodayVisits((prev) =>
            prev.map((x, idx) =>
              idx === id
                ? {
                    ...x,
                    status: "present",
                    startPhoto: shot,
                    startFP: fp,
                    startTime: now.toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),

                    gpsVerified: true,
                    geoDistance: geo.distance,
                    latitude: geo.location.latitude,
                    longitude: geo.location.longitude,
                    gpsSource: geo.source,
                  }
                : x
            )
          );

          enqueueAction({
            type: "VISITOR_START",
            visitorIndex: id,
            payload: { gps: geo, similarity: res.similarity },
          });

          setScanStatus("success");
          setScanMessage(`Start Verified ✅ (${res.similarity}%)`);
          setTimeout(() => {
            closeScan();
            alert(isOnline ? `Visitor START ✅` : "START Saved Offline ✅");
          }, 500);
          return;
        }

        if (mode === "end") {
          if (!v.profileFP) throw new Error("Not enrolled!");
          if (!v.startFP) throw new Error("Start not done yet!");

          const r1 = verifyPhotoMatch(v.profileFP, fp);
          const r2 = verifyPhotoMatch(v.startFP, fp);
          const minScore = Math.min(r1.similarity, r2.similarity);

          if (!r1.verified || !r2.verified)
            throw new Error(`Mismatch ❌ (${minScore}%)`);

          const now = new Date();

          setTodayVisits((prev) =>
            prev.map((x, idx) =>
              idx === id
                ? {
                    ...x,
                    endPhoto: shot,
                    endFP: fp,
                    endTime: now.toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),

                    gpsVerified: true,
                    geoDistance: geo.distance,
                    latitude: geo.location.latitude,
                    longitude: geo.location.longitude,
                    gpsSource: geo.source,
                  }
                : x
            )
          );

          enqueueAction({
            type: "VISITOR_END",
            visitorIndex: id,
            payload: { gps: geo, similarity: minScore },
          });

          setScanStatus("success");
          setScanMessage(`End Verified ✅ (${minScore}%)`);
          setTimeout(() => {
            closeScan();
            alert(isOnline ? `Visitor END ✅` : "END Saved Offline ✅");
          }, 500);
          return;
        }
      }

      // ---------------- LABOR ----------------
      if (type === "labor") {
        const w = workers.find((x) => x.id === id);
        if (!w) throw new Error("Worker not found");

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

                    status: "absent",
                    checkInTime: null,
                    checkInTimestamp: null,
                    checkOutTime: null,
                    checkOutTimestamp: null,

                    wageStatus: "unpaid",
                    finalWage: null,
                    workType: null,
                    overtime: 0,
                    hoursWorked: null,

                    gpsVerified: false,
                    geoDistance: null,
                    latitude: null,
                    longitude: null,
                    gpsSource: null,
                  }
                : x
            )
          );

          enqueueAction({
            type: "WORKER_ENROLL",
            workerId: id,
            payload: { profileFP: true, photoSaved: true },
          });

          setScanStatus("success");
          setScanMessage("Worker Enrolled ✅");
          setTimeout(() => {
            closeScan();
            alert(isOnline ? "Worker Enrolled ✅" : "Worker Saved Offline ✅");
          }, 500);
          return;
        }

        if (mode === "start") {
          if (!w.profileFP) throw new Error("Not enrolled!");

          const res = verifyPhotoMatch(w.profileFP, fp);
          if (!res.verified) throw new Error(`Mismatch ❌ (${res.similarity}%)`);

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

                    startPhoto: shot,
                    startFP: fp,

                    gpsVerified: true,
                    geoDistance: geo.distance,
                    latitude: geo.location.latitude,
                    longitude: geo.location.longitude,
                    gpsSource: geo.source,
                  }
                : x
            )
          );

          enqueueAction({
            type: "WORKER_START",
            workerId: id,
            payload: { gps: geo, similarity: res.similarity },
          });

          setScanStatus("success");
          setScanMessage(`Start Verified ✅ (${res.similarity}%)`);
          setTimeout(() => {
            closeScan();
            alert(isOnline ? "Start Work ✅" : "Start Saved Offline ✅");
          }, 500);
          return;
        }

        if (mode === "end") {
          if (!w.profileFP) throw new Error("Not enrolled!");
          if (!w.startFP) throw new Error("Start not done!");

          const r1 = verifyPhotoMatch(w.profileFP, fp);
          const r2 = verifyPhotoMatch(w.startFP, fp);
          const minScore = Math.min(r1.similarity, r2.similarity);

          if (!r1.verified || !r2.verified)
            throw new Error(`Mismatch ❌ (${minScore}%)`);

          const now = new Date();
          const outTs = now.getTime();

          setWorkers((prev) =>
            prev.map((x) => {
              if (x.id !== id) return x;

              const hours = computeHoursWorked(x.checkInTimestamp, outTs);
              const wageCalc = calculateWage(x.wageAmount, hours);

              return {
                ...x,
                checkOutTime: now.toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                checkOutTimestamp: outTs,

                endPhoto: shot,
                endFP: fp,

                hoursWorked: hours,
                finalWage: wageCalc.finalWage,
                workType: wageCalc.workType,
                overtime: wageCalc.overtime,

                gpsVerified: true,
                geoDistance: geo.distance,
                latitude: geo.location.latitude,
                longitude: geo.location.longitude,
                gpsSource: geo.source,
              };
            })
          );

          enqueueAction({
            type: "WORKER_END",
            workerId: id,
            payload: { gps: geo, similarity: minScore },
          });

          setScanStatus("success");
          setScanMessage(`End Verified ✅ (${minScore}%)`);
          setTimeout(() => {
            closeScan();
            alert(isOnline ? "End Work ✅" : "End Saved Offline ✅");
          }, 500);
          return;
        }
      }

      throw new Error("Invalid scan flow");
    } catch (e) {
      setScanStatus("fail");
      setScanMessage(e?.message || "Verification failed");
    }
  };

  // -------------------------
  // PAY WAGE ✅ offline logged
  // -------------------------
  const processWagePayment = (workerId) => {
    setWorkers((prev) =>
      prev.map((w) =>
        w.id === workerId
          ? {
              ...w,
              wageStatus: "paid",
            }
          : w
      )
    );

    enqueueAction({
      type: "WAGE_PAYMENT",
      workerId,
      payload: { status: "paid" },
    });

    setShowWageModal(false);
    setSelectedWorker(null);
    alert(isOnline ? "Payment recorded ✅" : "Payment Saved Offline ✅");
  };

  // -------------------------
  // STATS
  // -------------------------
  const stats = useMemo(() => {
    const totalRequired = categories.reduce((sum, c) => sum + c.requiredCount, 0);
    const totalPresent = workers.filter((w) => w.status === "present").length;
    return { totalRequired, totalPresent };
  }, [workers, categories]);

  const workforceAlert = stats.totalPresent < stats.totalRequired;

  const filteredWorkers = useMemo(() => {
    return workers.filter((w) => {
      const matchesCategory =
        selectedCategory === "all" || w.category === selectedCategory;

      const matchesSearch =
        w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.mudkam.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [workers, selectedCategory, searchQuery]);

  // -------------------------
  // ADD WORKER
  // -------------------------
  const addWorker = () => {
    if (!newWorkerName || !newWorkerCategory || !newWorkerMudkam) {
      alert("Fill all fields");
      return;
    }

    const newW = {
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

      gpsVerified: false,
      geoDistance: null,
      latitude: null,
      longitude: null,
      gpsSource: null,

      wageStatus: "unpaid",
      wageAmount:
        newWorkerCategory === "mason"
          ? 800
          : newWorkerCategory === "helper"
          ? 600
          : 1000,

      finalWage: null,
      workType: null,
      overtime: 0,
      hoursWorked: null,

      profilePhoto: null,
      profileFP: null,
      startPhoto: null,
      startFP: null,
      endPhoto: null,
      endFP: null,
    };

    setWorkers((prev) => [...prev, newW]);

    enqueueAction({
      type: "ADD_WORKER",
      workerId: newW.id,
      payload: { name: newW.name, category: newW.category, mudkam: newW.mudkam },
    });

    setNewWorkerName("");
    setNewWorkerCategory("");
    setNewWorkerMudkam("");
    setShowAddWorkerModal(false);
  };

  // -------------------------
  // SYNC BUTTON ✅ works offline + online
  // -------------------------
  const syncData = async () => {
    await syncQueueToBackend();
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
                Attendance Management
              </h1>

              <p className="text-[11px] sm:text-sm text-gray-600 mt-1">
                {new Date(selectedDate).toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span
                  className={`text-[11px] px-2 py-1 rounded-full border ${
                    isOnline
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-yellow-50 text-yellow-800 border-yellow-200"
                  }`}
                >
                  {isOnline ? "Online" : "Offline"}
                </span>

                <span className="text-[11px] text-gray-500">
                  Offline Photo + Geofence + Wage Auto (Demo)
                </span>

                {pendingQueue.length > 0 && (
                  <span className="text-[11px] px-2 py-1 rounded-full bg-[#e6f3ee] text-teal-800 border border-[#b9d9cf]">
                    Pending Sync: {pendingQueue.length}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <div className="flex items-center gap-2">
                {gpsLoading ? (
                  <span className="text-xs px-3 py-2 bg-[#e6f3ee] text-teal-800 rounded-lg">
                    GPS Checking...
                  </span>
                ) : currentLocation ? (
                  <span className="text-xs px-3 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200">
                    GPS Active ({gpsSource === "real" ? "Real" : "Demo"}) • ±
                    {currentLocation.accuracy}m
                  </span>
                ) : (
                  <span className="text-xs px-3 py-2 bg-gray-100 text-gray-600 rounded-lg">
                    GPS Idle
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:flex gap-2">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm w-full"
                />

                <select
                  value={selectedSite}
                  onChange={(e) => setSelectedSite(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm w-full"
                >
                  {sites.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={syncData}
                  disabled={syncing}
                  className="col-span-2 sm:col-auto px-3 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs sm:text-sm disabled:opacity-50"
                >
                  {syncing ? "Syncing..." : isOnline ? "Sync" : "Save Offline"}
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
            <h3 className="font-semibold text-red-800 text-sm">Workforce Alert</h3>
            <p className="text-xs text-red-700 mt-1">
              Present: {stats.totalPresent} / Required: {stats.totalRequired}
            </p>
          </div>
        )}

        {/* VISITORS */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
            <h2 className="text-base sm:text-xl font-bold text-gray-900">
              Visitors (Engineer/Manager/Client/Supervisor)
            </h2>
            <p className="text-[11px] sm:text-sm text-gray-600 mt-1">
              Enroll → Start → End (Offline verification + Geofence)
            </p>
          </div>

          <div className="p-3 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {todayVisits.map((v, idx) => {
                const mode = getVisitMode(v);
                const label =
                  mode === "enroll"
                    ? "Enroll"
                    : mode === "start"
                    ? "Start"
                    : mode === "end"
                    ? "End"
                    : "Done ✅";

                return (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-lg p-3 sm:p-4"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                          {v.role}
                        </p>
                        <p className="font-semibold text-gray-900 mt-1 truncate">
                          {v.name}
                        </p>
                      </div>
                      <span className="text-[11px] px-2 py-1 rounded-full bg-gray-100 text-gray-700 whitespace-nowrap">
                        {label}
                      </span>
                    </div>

                    {v.profilePhoto ? (
                      <img
                        src={v.profilePhoto}
                        className="mt-3 w-full h-24 object-cover rounded-lg border"
                        alt="enrolled"
                      />
                    ) : (
                      <div className="mt-3 text-xs text-gray-400">Not enrolled</div>
                    )}

                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {v.startPhoto && (
                        <img
                          src={v.startPhoto}
                          className="w-full h-16 object-cover rounded-lg border"
                          alt="start"
                        />
                      )}
                      {v.endPhoto && (
                        <img
                          src={v.endPhoto}
                          className="w-full h-16 object-cover rounded-lg border"
                          alt="end"
                        />
                      )}
                    </div>

                    <div className="mt-2 text-xs text-gray-600">
                      📍 {v.geoDistance !== null ? `${v.geoDistance}m` : "-"} •{" "}
                      {v.gpsSource ? v.gpsSource.toUpperCase() : "-"}
                    </div>

                    {mode === "done" ? (
                      <div className="mt-3 text-xs text-green-700 font-semibold text-center">
                        Completed ✅
                      </div>
                    ) : (
                      <button
                        onClick={() => openScan({ type: "visitor", id: idx, mode })}
                        className="w-full mt-3 px-3 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-medium"
                      >
                        {label}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* LABOUR */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-xl font-bold text-gray-900">
                Labor Attendance + Wage
              </h2>
              <p className="text-[11px] sm:text-sm text-gray-600 mt-1">
                Enroll → Start Work → End Work → Wage Auto Calc → Pay
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search worker..."
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm w-full sm:w-64"
              />

              <button
                onClick={() => setShowAddWorkerModal(true)}
                className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-sm font-medium"
              >
                Add Worker
              </button>
            </div>
          </div>

          <div className="p-3 sm:p-6 space-y-3">
            {filteredWorkers.map((w) => (
              <div
                key={w.id}
                className="border border-gray-200 rounded-lg p-3 sm:p-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="font-semibold text-gray-900">{w.name}</div>
                      <span className="text-[11px] px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                        {categories.find((c) => c.id === w.category)?.name ||
                          w.category}
                      </span>

                      {w.wageStatus === "paid" && (
                        <span className="text-[11px] px-2 py-1 bg-green-100 text-green-700 rounded-full">
                          Paid
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-gray-600 mt-1">
                      Mudkam: {w.mudkam}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Base Wage: ₹{w.wageAmount}
                    </div>

                    <div className="text-xs text-gray-700 mt-2">
                      IN: {w.checkInTime || "-"} | OUT: {w.checkOutTime || "-"}
                    </div>

                    <div className="text-xs text-gray-700 mt-1">
                      📍 {w.geoDistance !== null ? `${w.geoDistance}m` : "-"} •{" "}
                      {w.gpsSource ? w.gpsSource.toUpperCase() : "-"}
                    </div>
                  </div>

                  <div className="w-full sm:w-28">
                    {w.profilePhoto ? (
                      <img
                        src={w.profilePhoto}
                        alt="enroll"
                        className="w-full sm:w-28 h-20 rounded-lg object-cover border"
                      />
                    ) : (
                      <div className="w-full sm:w-28 h-20 rounded-lg border bg-gray-50 flex items-center justify-center text-[11px] text-gray-400">
                        No Photo
                      </div>
                    )}
                  </div>
                </div>

                {/* ✅ Mobile buttons: 2 columns */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                  <button
                    onClick={() =>
                      openScan({ type: "labor", id: w.id, mode: "enroll" })
                    }
                    className="px-3 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-xs font-medium"
                  >
                    {w.profileFP ? "Re-Enroll" : "Enroll"}
                  </button>

                  <button
                    onClick={() =>
                      openScan({ type: "labor", id: w.id, mode: "start" })
                    }
                    disabled={!w.profileFP || !!w.startFP}
                    className="px-3 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-40 text-white rounded-lg text-xs font-medium"
                  >
                    Start Work
                  </button>

                  <button
                    onClick={() =>
                      openScan({ type: "labor", id: w.id, mode: "end" })
                    }
                    disabled={!w.startFP || !!w.endFP}
                    className="col-span-2 sm:col-span-1 px-3 py-2 bg-teal-700 hover:bg-teal-800 disabled:opacity-40 text-white rounded-lg text-xs font-medium"
                  >
                    End Work
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  {w.startPhoto && (
                    <div>
                      <img
                        src={w.startPhoto}
                        alt="start"
                        className="w-full h-24 rounded-lg object-cover border"
                      />
                      <p className="text-[10px] text-gray-500 mt-1">Start Photo</p>
                    </div>
                  )}

                  {w.endPhoto && (
                    <div>
                      <img
                        src={w.endPhoto}
                        alt="end"
                        className="w-full h-24 rounded-lg object-cover border"
                      />
                      <p className="text-[10px] text-gray-500 mt-1">End Photo</p>
                    </div>
                  )}
                </div>

                {w.endFP && (
                  <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="text-sm font-semibold text-green-800">
                      Wage Calculated ✅
                    </div>

                    <div className="text-xs text-green-700 mt-1">
                      Hours:{" "}
                      <b>
                        {w.hoursWorked !== null ? w.hoursWorked.toFixed(2) : "0.00"}
                      </b>{" "}
                      | Type: <b>{w.workType}</b> | OT:{" "}
                      <b>{(w.overtime || 0).toFixed(1)}h</b>
                    </div>

                    <div className="text-sm text-green-800 mt-1">
                      Final Amount:{" "}
                      <b>₹{Math.round(w.finalWage || w.wageAmount)}</b>
                    </div>

                    {w.wageStatus === "unpaid" && (
                      <button
                        onClick={() => {
                          setSelectedWorker(w);
                          setShowWageModal(true);
                        }}
                        className="mt-2 w-full px-3 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-medium"
                      >
                        Pay Wage
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CAMERA MODAL */}
      {showScanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-3">
          <div className="bg-white rounded-xl max-w-2xl w-full p-3 sm:p-6 max-h-[90vh] overflow-auto">
            <div className="text-center">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Offline Verification
              </h2>

              <p className="text-xs text-gray-600 mt-1">
                Mode: <b>{scanMeta?.type}</b> / <b>{scanMeta?.mode}</b>
              </p>

              <div className="relative bg-black rounded-lg overflow-hidden mt-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 sm:h-96 object-cover"
                />
                <canvas ref={canvasRef} className="hidden" />

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-40 h-52 sm:w-64 sm:h-80 border-4 border-teal-600 rounded-lg"></div>
                </div>
              </div>

              <div className="mt-3 text-sm font-medium">
                {scanStatus === "fail" ? (
                  <span className="text-red-600">{scanMessage}</span>
                ) : scanStatus === "success" ? (
                  <span className="text-green-600">{scanMessage}</span>
                ) : (
                  <span className="text-teal-700">{scanMessage}</span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 justify-center mt-4">
                <button
                  onClick={captureAndVerify}
                  className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-sm font-medium w-full sm:w-auto"
                >
                  Capture & Verify
                </button>

                <button
                  onClick={closeScan}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-sm font-medium w-full sm:w-auto"
                >
                  Close
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-3">
                Tip: Similar lighting gives higher match score.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ADD WORKER MODAL */}
      {showAddWorkerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
          <div className="bg-white rounded-xl max-w-md w-full p-4 sm:p-6 max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Add Worker</h2>
              <button
                onClick={() => setShowAddWorkerModal(false)}
                className="px-2 py-1 rounded bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <input
                value={newWorkerName}
                onChange={(e) => setNewWorkerName(e.target.value)}
                placeholder="Worker name"
                className="w-full px-4 py-3 border rounded-lg"
              />

              <select
                value={newWorkerCategory}
                onChange={(e) => setNewWorkerCategory(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <input
                value={newWorkerMudkam}
                onChange={(e) => setNewWorkerMudkam(e.target.value)}
                placeholder="Mudkam (Village/Origin)"
                className="w-full px-4 py-3 border rounded-lg"
              />

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={addWorker}
                  className="flex-1 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-medium"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddWorkerModal(false)}
                  className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WAGE MODAL */}
      {showWageModal && selectedWorker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3">
          <div className="bg-white rounded-xl max-w-md w-full p-4 sm:p-6 max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Pay Wage</h2>
              <button
                onClick={() => setShowWageModal(false)}
                className="px-2 py-1 rounded bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="font-semibold text-gray-900">
                {selectedWorker.name}
              </div>

              <div className="text-xs text-gray-600 mt-1">
                Hours:{" "}
                {selectedWorker.hoursWorked !== null
                  ? selectedWorker.hoursWorked.toFixed(2)
                  : "-"}
              </div>

              <div className="text-xs text-gray-600 mt-1">
                Type: {selectedWorker.workType} | OT:{" "}
                {(selectedWorker.overtime || 0).toFixed(1)}h
              </div>

              <div className="text-sm text-gray-900 mt-2">
                Final Amount:{" "}
                <b>
                  ₹{Math.round(selectedWorker.finalWage || selectedWorker.wageAmount)}
                </b>
              </div>
            </div>

            <button
              onClick={() => processWagePayment(selectedWorker.id)}
              className="w-full mt-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
            >
              Confirm Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
