
// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import { useEffect } from "react";

// // /* =======================
// //    COMMON LAYOUT
// // ======================= */
// // import Navbar from "./components/Navbar";
// // import Footer from "./components/Footer";
// // import ProtectedRoute from "./components/ProtectedRoute";

// // /* =======================
// //    PUBLIC PAGES
// // ======================= */
// // import Landing from "./pages/Landing";
// // import Login from "./pages/Login";
// // import Register from "./pages/Register";

// // /* =======================
// //    DASHBOARDS (ROLE BASED)
// // ======================= */
// // import ManagerDashboard from "./pages/ManagerDashboard";
// // import SiteEngineerDashboard from "./pages/SiteEngineerDashboard";
// // import SupervisorDashboard from "./pages/SupervisorDashboard";

// // /* =======================
// //    PROJECT MODULE
// // ======================= */
// // // import CreateProject from "./pages/Createproject";
// // import ProjectDashboard from "./pages/ProjectDashboard";
// // import ProjectsMap from "./pages/ProjectsMap";
// // import ProjectsView from "./pages/ProjectView";

// // /* =======================
// //    TASK & DAILY WORK
// // ======================= */
// // import CreateTask from "./pages/CreateTask";
// // import SupervisorToday from "./pages/SupervisorToday";
// // import SupervisorTaskSubmission from "./pages/SupervisorTaskSubmission";
// // import DailyItinerary from "./components/DailyItinerary";

// // /* =======================
// //    ATTENDANCE & DPR
// // ======================= */
// // import AttendanceDashboard from "./components/AttendanceDashboard";
// // import AttendanceScreen from "./components/AttendanceScreen";
// // import DPRScreen from "./components/DPR";

// // /* =======================
// //    EXTRA / UI MODULES
// // ======================= */
// // import Overview from "./components/Overview";
// // import ProjectCotextPage from "./pages/ProjectContextPage";
// // import SupervisorLayoutPage from "./pages/SupervisorLayoutPage";
// // import ManagerapprovalPage from "./pages/ManagerapprovalPage";
// // import SupervisorItineraryPage from "./pages/SupervisorItineraryPage";
// // import IT from "./pages/IT";
// // import CreateProject from "./components/CreateProject";
// // import ManagerItineraryPage from "./components/ManagerItineraryPage";
// // import MaterialManagementSystem from "./pages/Invoice";

// // import ManagerProjectLayoutPage from "./pages/ManagerLayoutpage";

// // import SafetyReporter from "./pages/Saftey";
// // import ManagerDailyItineraryPage from "./pages/ManagerDailyItenaryPage";


// // function App() {
// //   useEffect(() => {
// //     window.gtranslateSettings = {
// //       default_language: "en",
// //       languages: ["en", "hi", "mr", "gu", "ta", "te", "bn", "kn", "ml", "or", "pa", "as"],
// //       wrapper_selector: ".gtranslate_wrapper",
// //       flag_size: 28,
// //       horizontal_position: "right",
// //       vertical_position: "bottom",
// //       native_language_names: true,
// //     };

// //     const script = document.createElement("script");
// //     script.src = "https://cdn.gtranslate.net/widgets/latest/float.js";
// //     script.defer = true;
// //     document.body.appendChild(script);

// //     return () => document.body.removeChild(script);
// //   }, []);

// //   return (
// //     <BrowserRouter>
// //       <div className="flex flex-col min-h-screen">
// //         <div className="gtranslate_wrapper"></div>

// //         <Navbar />

// //         <main className="flex-grow">
// //           <Routes>

// //             {/* ========= PUBLIC ROUTES ========= */}
// //             <Route path="/" element={<Landing />} />
// //             <Route path="/login" element={<Login />} />
// //             <Route path="/register" element={<Register />} />
// //             <Route path="/frame" element={<Overview />} />
// //              <Route path="/invoice" element={<MaterialManagementSystem />} />
// //              <Route path="/saftey" element={<SafetyReporter />} />
  
// //             {/* ========= PROJECT ROUTES ========= */}
// //             <Route path="/create" element={<CreateProject />} />
// //             <Route path="/project/:id" element={<DPRScreen />} />
// //             <Route path="/quick-view" element={<ProjectsMap />} />
     

// //             {/* ========= TASK / DAILY ========= */}
// //             {/* <Route path="/task" element={<CreateTask />} /> */}
// //             <Route path="/task" element={<ProjectCotextPage
// //             />} />
// //             <Route path="/it" element={<SupervisorToday />} />
// //             <Route path="/approv" element={<ManagerapprovalPage />} />
// //             {/* <Route path="/dpr" element={<SupervisorTaskSubmission />} /> */}
// //             <Route path="/iIternary" element={<DailyItinerary />} />
// // <Route path="/iternary-new" element={<ManagerDailyItineraryPage />} />
// //             {/* ========= ATTENDANCE ========= */}
// //             <Route path="/attendance" element={<AttendanceScreen />} />
// //             <Route path="/iop" element={<SupervisorItineraryPage />} />
// //             <Route path="/add" element={<AttendanceDashboard />} />
// //             <Route path="/ddpr" element={<DPRScreen />} />
// //             <Route path="/test5" element={<ManagerItineraryPage />} />
// //              <Route path="/mit" element={<IT />} />
// //  <Route path="/step4" element={<SupervisorLayoutPage />} />
// //  <Route path="/view" element={< ManagerProjectLayoutPage/>} />
// //             {/* ========= ROLE BASED DASHBOARDS ========= */}
// //             <Route
// //               path="/manager-dashboard/*"
// //               element={
// //                 <ProtectedRoute role="MANAGER">
// //                   <ManagerDashboard />
// //                 </ProtectedRoute>
// //               }
// //             />

// //             <Route
// //               path="/site-engineer-dashboard/*"
// //               element={
// //                 <ProtectedRoute role="SITE_ENGINEER">
// //                   <SiteEngineerDashboard />
// //                 </ProtectedRoute>
// //               }
// //             />

// //             <Route
// //               path="/supervisor-dashboard/*"
// //               element={
// //                 <ProtectedRoute role="SUPERVISOR">
// //                   <SupervisorDashboard />
// //                 </ProtectedRoute>
// //               }
// //             />

// //           </Routes>
// //         </main>

// //         <Footer />
// //       </div>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useEffect } from "react";

// /* =======================
//    COMMON LAYOUT
// ======================= */
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import ProtectedRoute from "./components/ProtectedRoute";

// /* =======================
//    NEW COMPONENTS
// ======================= */



// /* =======================
//    PUBLIC PAGES
// ======================= */
// import Landing from "./pages/Landing";
// import Login from "./pages/Login";
// import Register from "./pages/Register";

// /* =======================
//    DASHBOARDS (ROLE BASED)
// ======================= */
// import ManagerDashboard from "./pages/ManagerDashboard";
// import SiteEngineerDashboard from "./pages/SiteEngineerDashboard";
// import SupervisorDashboard from "./pages/SupervisorDashboard";

// /* =======================
//    PROJECT MODULE
// ======================= */
// import ProjectDashboard from "./pages/ProjectDashboard";
// import ProjectsMap from "./pages/ProjectsMap";
// import ProjectsView from "./pages/ProjectView";

// /* =======================
//    TASK & DAILY WORK
// ======================= */
// import CreateTask from "./pages/CreateTask";
// import SupervisorToday from "./pages/SupervisorToday";
// import SupervisorTaskSubmission from "./pages/SupervisorTaskSubmission";
// import DailyItinerary from "./components/DailyItinerary";

// /* =======================
//    ATTENDANCE & DPR
// ======================= */
// import AttendanceDashboard from "./components/AttendanceDashboard";
// import AttendanceScreen from "./components/AttendanceScreen";
// import DPRScreen from "./components/DPR";

// /* =======================
//    EXTRA / UI MODULES
// ======================= */
// import Overview from "./components/Overview";
// import ProjectCotextPage from "./pages/ProjectContextPage";
// import SupervisorLayoutPage from "./pages/SupervisorLayoutPage";
// import ManagerapprovalPage from "./pages/ManagerapprovalPage";
// import SupervisorItineraryPage from "./pages/SupervisorItineraryPage";
// import IT from "./pages/IT";
// import CreateProject from "./components/CreateProject";
// import ManagerItineraryPage from "./components/ManagerItineraryPage";
// import MaterialManagementSystem from "./pages/Invoice";
// import ManagerProjectLayoutPage from "./pages/ManagerLayoutpage";
// import SafetyReporter from "./pages/Saftey";
// import ManagerDailyItineraryPage from "./pages/ManagerDailyItenaryPage";
// import NirmaanAssistant from "./NirmaanAssistant";
// import IntelligentChatbot from "./IntelligentChatbot";
// import OwnerClientView from "./components/OwnerClientView";

// function App() {
//   useEffect(() => {
//     window.gtranslateSettings = {
//       default_language: "en",
//       languages: ["en", "hi", "mr", "gu", "ta", "te", "bn", "kn", "ml", "or", "pa", "as"],
//       wrapper_selector: ".gtranslate_wrapper",
//       flag_size: 28,
//       horizontal_position: "right",
//       vertical_position: "bottom",
//       native_language_names: true,
//     };

//     const script = document.createElement("script");
//     script.src = "https://cdn.gtranslate.net/widgets/latest/float.js";
//     script.defer = true;
//     document.body.appendChild(script);

//     return () => document.body.removeChild(script);
//   }, []);

//   return (
//     <BrowserRouter>
//       <div className="flex flex-col min-h-screen">
//         <div className="gtranslate_wrapper"></div>

//         {/* Voice Command System - Always Active */}
//         <NirmaanAssistant />

//         {/* Intelligent Chatbot */}
        
// <IntelligentChatbot />
//         <Navbar />

//         <main className="flex-grow">
//           <Routes>
//             {/* ========= PUBLIC ROUTES ========= */}
//             <Route path="/" element={<Landing />} />
//             <Route path="/clientView" element={<OwnerClientView />} />
//              <Route path="/chatbot" element={<IntelligentChatbot />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/frame" element={<Overview />} />
//             <Route path="/invoice" element={<MaterialManagementSystem />} />
//             <Route path="/saftey" element={<SafetyReporter />} />
  
//             {/* ========= PROJECT ROUTES ========= */}
//             <Route path="/create" element={<CreateProject />} />
//             <Route path="/project/:id" element={<DPRScreen />} />
//             <Route path="/quick-view" element={<ProjectsMap />} />
     
//             {/* ========= TASK / DAILY ========= */}
//             <Route path="/task" element={<ProjectCotextPage />} />
//             <Route path="/it" element={<SupervisorToday />} />
//             <Route path="/approv" element={<ManagerapprovalPage />} />
//             <Route path="/iIternary" element={<DailyItinerary />} />
//             <Route path="/iternary-new" element={<ManagerDailyItineraryPage />} />
            
//             {/* ========= ATTENDANCE ========= */}
//             <Route path="/attendance" element={<AttendanceScreen />} />
//             <Route path="/iop" element={<SupervisorItineraryPage />} />
//             <Route path="/add" element={<AttendanceDashboard />} />
//             <Route path="/ddpr" element={<DPRScreen />} />
//             <Route path="/test5" element={<ManagerItineraryPage />} />
//             <Route path="/mit" element={<IT />} />
//             <Route path="/step4" element={<SupervisorLayoutPage />} />
//             <Route path="/view" element={<ManagerProjectLayoutPage />} />
            
//             {/* ========= ROLE BASED DASHBOARDS ========= */}
//             <Route
//               path="/manager-dashboard/*"
//               element={
//                 <ProtectedRoute role="MANAGER">
//                   <ManagerDashboard />
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/site-engineer-dashboard/*"
//               element={
//                 <ProtectedRoute role="SITE_ENGINEER">
//                   <SiteEngineerDashboard />
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/supervisor-dashboard/*"
//               element={
//                 <ProtectedRoute role="SUPERVISOR">
//                   <SupervisorDashboard />
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </main>

//         <Footer />
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

/* =======================
   LAYOUT
======================= */
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

/* =======================
   GLOBAL SYSTEMS
======================= */
import NirmaanAssistant from "./NirmaanAssistant";
import IntelligentChatbot from "./IntelligentChatbot";

/* =======================
   PUBLIC PAGES
======================= */
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OwnerClientView from "./components/OwnerClientView";

/* =======================
   DASHBOARDS (ROLE BASED)
======================= */
import ManagerDashboard from "./pages/ManagerDashboard";
import SiteEngineerDashboard from "./pages/SiteEngineerDashboard";
import SupervisorDashboard from "./pages/SupervisorDashboard";

/* =======================
   PROJECT MODULE
======================= */
import ProjectsMap from "./pages/ProjectsMap";
import CreateProject from "./components/CreateProject";
import ManagerProjectLayoutPage from "./pages/ManagerLayoutpage";

/* =======================
   TASK & DAILY WORK
======================= */
import ProjectCotextPage from "./pages/ProjectContextPage";
import SupervisorToday from "./pages/SupervisorToday";
import SupervisorLayoutPage from "./pages/SupervisorLayoutPage";
import ManagerapprovalPage from "./pages/ManagerapprovalPage";
import SupervisorItineraryPage from "./pages/SupervisorItineraryPage";
import ManagerDailyItineraryPage from "./pages/ManagerDailyItenaryPage";
import ManagerItineraryPage from "./components/ManagerItineraryPage";
import DailyItinerary from "./components/DailyItinerary";
import IT from "./pages/IT";

/* =======================
   ATTENDANCE & DPR
======================= */
import AttendanceScreen from "./components/AttendanceScreen";
import AttendanceDashboard from "./components/AttendanceDashboard";
import DPRScreen from "./components/DPR";

/* =======================
   EXTRA / UTILITIES
======================= */
import Overview from "./components/Overview";
import MaterialManagementSystem from "./pages/Invoice";
import SafetyReporter from "./pages/Saftey";
import ToolLibrary from "./components/ToolLibrary";

function App() {
  /* =======================
     TRANSLATION WIDGET
  ======================= */
  useEffect(() => {
    window.gtranslateSettings = {
      default_language: "en",
      languages: [
        "en", "hi", "mr", "gu", "ta", "te",
        "bn", "kn", "ml", "or", "pa", "as"
      ],
      wrapper_selector: ".gtranslate_wrapper",
      flag_size: 28,
      horizontal_position: "right",
      vertical_position: "bottom",
      native_language_names: true,
    };

    const script = document.createElement("script");
    script.src = "https://cdn.gtranslate.net/widgets/latest/float.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {/* Translation UI */}
        <div className="gtranslate_wrapper" />

        {/* Global Assistants (Always On) */}
        {/* <NirmaanAssistant /> */}
        <IntelligentChatbot />

        {/* App Layout */}
        <Navbar />

        <main className="flex-grow">
          <Routes>

            {/* ========= PUBLIC ========= */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/frame" element={<Overview />} />
            <Route path="/clientView" element={<OwnerClientView />} />
            <Route path="/chatbot" element={<IntelligentChatbot />} />
             <Route path="/To" element={<ToolLibrary />} />

            {/* ========= PROJECT ========= */}
            <Route path="/create" element={<CreateProject />} />
            <Route path="/quick-view" element={<ProjectsMap />} />
            <Route path="/view" element={<ManagerProjectLayoutPage />} />
            <Route path="/project/:id" element={<DPRScreen />} />

            {/* ========= TASK / DAILY ========= */}
            <Route path="/task" element={<ProjectCotextPage />} />
            <Route path="/it" element={<SupervisorToday />} />
            <Route path="/approv" element={<ManagerapprovalPage />} />
            <Route path="/step4" element={<SupervisorLayoutPage />} />
            <Route path="/iop" element={<SupervisorItineraryPage />} />
            <Route path="/iternary-new" element={<ManagerDailyItineraryPage />} />
            <Route path="/iIternary" element={<DailyItinerary />} />
            <Route path="/test5" element={<ManagerItineraryPage />} />
            <Route path="/mit" element={<IT />} />

            {/* ========= ATTENDANCE & DPR ========= */}
            <Route path="/attendance" element={<AttendanceScreen />} />
            <Route path="/add" element={<AttendanceDashboard />} />
            <Route path="/ddpr" element={<DPRScreen />} />

            {/* ========= FINANCE / SAFETY ========= */}
            <Route path="/invoice" element={<MaterialManagementSystem />} />
            <Route path="/saftey" element={<SafetyReporter />} />

            {/* ========= ROLE BASED DASHBOARDS ========= */}
            <Route
              path="/manager-dashboard/*"
              element={
                <ProtectedRoute role="MANAGER">
                  <ManagerDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/site-engineer-dashboard/*"
              element={
                <ProtectedRoute role="SITE_ENGINEER">
                  <SiteEngineerDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/supervisor-dashboard/*"
              element={
                <ProtectedRoute role="SUPERVISOR">
                  <SupervisorDashboard />
                </ProtectedRoute>
              }
            />

          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
