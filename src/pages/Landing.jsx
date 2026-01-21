
// import React, { useState, useEffect } from 'react';

// const Landing = () => {
//   const [scrollOffset, setScrollOffset] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       // Adjust the 0.3 to make it move faster or slower
//       // Negative value moves it LEFT as scroll goes DOWN
//       setScrollOffset(window.pageYOffset * -0.3);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="bg-[#FFF9F6]">
//       {/* Hero Container */}
//       <div className="min-h-screen flex items-center overflow-hidden px-6 lg:px-20 relative">
//         <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
//           {/* Left Text Content */}
//           <div className="lg:col-span-5 space-y-8 z-20">
//             <h1 className="text-5xl md:text-7xl font-bold text-[#333333] leading-tight">
//               Modern <br />
//               <span className="text-[#E87D3E]">Construction</span> <br />
//               Management
//             </h1>
//             <p className="text-gray-600 text-lg md:text-xl max-w-md">
//               Visualize, manage, and track construction sites in real-time.
//             </p>
//             <div className="flex gap-4">
//               <button className="bg-[#E87D3E] text-white font-semibold py-4 px-10 rounded-xl shadow-lg">
//                 Start Free
//               </button>
//             </div>
//           </div>

//           {/* Right Image Content */}
//           <div className="lg:col-span-7 flex justify-center items-center z-10">
//             <div 
//               style={{ 
//                 // Starts at 0 (original position)
//                 // Moves left (negative X) as you scroll down
//                 transform: `translateX(${scrollOffset}px)`,
//                 transition: 'transform 0.1s ease-out' 
//               }}
//               className="w-full flex justify-center"
//             >
//               <img 
//                 src="/one.png" 
//                 alt="Construction" 
//                 className="w-full h-auto max-w-[750px] drop-shadow-2xl"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Extra Space to enable scrolling */}
      
//     </div>
//   );
// };

// export default Landing;
import React, { useState, useEffect } from 'react';

const Landing = () => {
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Logic untouched as per instructions
      setScrollOffset(window.pageYOffset * -0.3);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white text-slate-900 font-sans antialiased">
      {/* Hero Container */}
      <div className="min-h-screen flex items-center overflow-hidden px-8 lg:px-24 relative">
        <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-5 space-y-10 z-20">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-orange-600"></div>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-orange-600">Enterprise Solution</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-medium text-slate-900 leading-[0.9] tracking-tighter">
                Precision <br />
                <span className="text-slate-300 italic font-light">Asset</span> <br />
                Control
              </h1>
            </div>

            <p className="text-slate-500 text-lg md:text-xl max-w-sm leading-relaxed border-l border-slate-100 pl-6">
              Visualize, manage, and track infrastructure assets with industrial-grade real-time telemetry.
            </p>

            <div className="flex items-center gap-8 pt-4">
              <button className="bg-orange-900 text-white text-[11px] font-bold uppercase tracking-[0.2em] py-5 px-12 hover:bg-orange-600 transition-colors duration-300 shadow-xl shadow-slate-200">
                Initialize System
              </button>
              <button className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors border-b border-slate-100 pb-1">
                Explore Core
              </button>
            </div>
          </div>

          {/* Right Image Content */}
          <div className="lg:col-span-7 flex justify-center items-center z-10">
            <div 
              style={{ 
                // Logic untouched
                transform: `translateX(${scrollOffset}px)`,
                transition: 'transform 0.1s ease-out' 
              }}
              className="w-full flex justify-center relative"
            >
              {/* Decorative background element for professional feel */}
              <div className="absolute -inset-10 border border-slate-50 opacity-50 pointer-events-none -z-10 transform rotate-3"></div>
              
              <img 
                src="/one.png" 
                alt="Construction" 
                className="w-full h-auto max-w-[800px] grayscale hover:grayscale-0 transition-all duration-700 brightness-105"
                style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.08))' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Aesthetic Footer/Scroll Hint */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-slate-400 rotate-90 mb-4">Scroll</span>
        <div className="w-[1px] h-12 bg-slate-200"></div>
      </div>

      {/* Extra Space to enable scrolling (Untouched) */}
     

      <style dangerouslySetInnerHTML={{ __html: `
        * { cursor: default; }
        button { cursor: pointer; }
        ::selection { background: #2563eb; color: white; }
      `}} />
    </div>
  );
};

export default Landing;