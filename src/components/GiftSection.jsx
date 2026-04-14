
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";

const AMOUNTS = [51, 101, 251, 501, 1001, 2001];

export default function VishuKaineettam() {
  const [amount, setAmount] = useState(101);
  const [showQR, setShowQR] = useState(false);
  const qrRef = useRef(null);
  const qrInstanceRef = useRef(null);

  const upiId = "9061117489@upi";

  const getUpiUrl = (amt) =>
    `upi://pay?pa=${upiId}&pn=Vishu%20Kaineettam&am=${amt}&cu=INR&tn=Vishu%20Kaineettam%20Blessings`;

  // Detect platform
  const isAndroid = () => /Android/i.test(navigator.userAgent);
  const isIOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isMobile = () => isAndroid() || isIOS();

  // Generate QR when modal opens or amount changes
  useEffect(() => {
    if (!showQR) return;

    const loadQR = () => {
      if (!window.QRCode) {
        setTimeout(loadQR, 100);
        return;
      }
      if (qrRef.current) {
        qrRef.current.innerHTML = "";
        qrInstanceRef.current = new window.QRCode(qrRef.current, {
          text: getUpiUrl(amount),
          width: 220,
          height: 220,
          colorDark: "#2a1805",
          colorLight: "#fffbf0",
          correctLevel: window.QRCode.CorrectLevel.H,
        });
      }
    };

    loadQR();
  }, [showQR, amount]);

  const handleKaineettam = () => {
    if (!isMobile()) {
      // On desktop/web — show QR code modal
      setShowQR(true);
      return;
    }

    const upiUrl = getUpiUrl(amount);

    if (isIOS()) {
      /**
       * iOS does NOT support upi:// scheme natively.
       * The correct approach for iOS is to use GPay's universal link
       * or open a UPI intent via a properly constructed URL.
       *
       * Most reliable: use GPay's iOS universal link format.
       * Fallback: open upi:// anyway — user must have a UPI app installed.
       *
       * We use an <a> click trick with setTimeout to avoid
       * iOS Safari blocking window.location changes on async calls.
       */
      const gpayIOSUrl = `gpay://upi/pay?pa=${upiId}&pn=Vishu%20Kaineettam&am=${amount}&cu=INR&tn=Vishu%20Kaineettam%20Blessings`;

      // Try GPay first, fall back to generic upi://
      const link = document.createElement("a");
      link.href = gpayIOSUrl;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // If GPay didn't open (app not installed), try generic upi:// after short delay
      setTimeout(() => {
        const fallback = document.createElement("a");
        fallback.href = upiUrl;
        fallback.style.display = "none";
        document.body.appendChild(fallback);
        fallback.click();
        document.body.removeChild(fallback);
      }, 1500);
    } else {
      // Android — original working approach
      const link = document.createElement("a");
      link.href = upiUrl;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      {/* QRCode.js library */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js" async />

      <section className="relative min-h-screen bg-[#120802] flex flex-col items-center justify-center overflow-hidden py-20 font-serif">
        {/* KERALA MURAL BACKGROUND ELEMENTS */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: "radial-gradient(#3d2610 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-md px-8 text-center">
          {/* RITUAL HEADER */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <span className="text-yellow-600/60 tracking-[0.4em] uppercase text-[10px] mb-2 block">
              ഐശ്വര്യം • സമൃദ്ധി
            </span>
            <h2
              className="text-4xl font-bold text-[#f3cf7a] tracking-tight mb-1"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
            >
              വിഷുക്കൈനീട്ടം
            </h2>
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto mt-4" />
          </motion.div>

          {/* GOLDEN COIN DISPLAY */}
          <div className="relative h-72 flex items-center justify-center mb-10">
            <div className="absolute w-64 h-64 bg-yellow-600/10 rounded-full blur-3xl animate-pulse" />

            <AnimatePresence mode="wait">
              <motion.div
                key={amount}
                initial={{ rotateY: -90, opacity: 0, scale: 0.8 }}
                animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                exit={{ rotateY: 90, opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="relative w-40 h-40 flex items-center justify-center"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#ffd700] via-[#b8860b] to-[#8b4513] shadow-[0_10px_40px_rgba(0,0,0,0.6),inset_0_2px_10px_rgba(255,255,255,0.5)] border-[3px] border-[#ffd700]/30" />
                <div className="relative text-center">
                  <p className="text-[#3d2610] text-[12px] font-bold opacity-60 leading-none mb-1">
                    കൈനീട്ടം
                  </p>
                  <div className="flex items-start justify-center text-[#3d2610]">
                    <span className="text-xl font-bold mr-1">₹</span>
                    <span className="text-5xl font-black tracking-tighter">
                      {amount}
                    </span>
                  </div>
                  <p className="text-[#3d2610] text-[12px] font-bold opacity-60 leading-none mb-1">
                    നൽകുക
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-4 bg-[#ffd700] rounded-full opacity-40"
                animate={{
                  y: [0, 200],
                  x: [0, i % 2 === 0 ? 40 : -40],
                  rotate: [0, 360],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "linear",
                }}
                style={{ top: "20%", left: `${20 + i * 10}%` }}
              />
            ))}
          </div>

          {/* AMOUNT SELECTION */}
          <p className="text-yellow-600/40 text-[10px] uppercase tracking-widest mb-6 font-sans">
            ഒരു തുക തിരഞ്ഞെടുക്കുക
          </p>
          <div className="grid grid-cols-3 gap-4 mb-12 px-4">
            {AMOUNTS.map((amt) => (
              <motion.button
                key={amt}
                whileTap={{ scale: 0.9 }}
                onClick={() => setAmount(amt)}
                className={`h-14 rounded-lg flex flex-col items-center justify-center transition-all border relative overflow-hidden ${
                  amount === amt
                    ? "bg-[#2a1a0a] border-yellow-500/60 shadow-[0_0_20px_rgba(184,134,11,0.2)]"
                    : "bg-black/20 border-white/5 text-yellow-600/50"
                }`}
              >
                <span
                  className={`text-lg font-bold ${amount === amt ? "text-[#f3cf7a]" : ""}`}
                >
                  ₹{amt}
                </span>
                {amount === amt && (
                  <motion.div
                    layoutId="tray-indicator"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-500"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* PAY BUTTON */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleKaineettam}
            className="w-full relative py-5 px-8 rounded-xl bg-gradient-to-b from-[#e5bc5e] to-[#b38b34] shadow-[0_10px_30px_rgba(0,0,0,0.4)] group flex items-center justify-center gap-4 overflow-hidden"
          >
            <motion.div
              animate={{ x: [-100, 400] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="absolute top-0 h-full w-20 bg-white/20 skew-x-12"
            />
            <img
              width="32"
              height="32"
              src="https://img.icons8.com/color/48/google-pay.png"
              alt="google-pay"
              className="drop-shadow-sm"
            />
            <span className="text-[#2a1805] font-black uppercase tracking-widest text-sm">
              സമർപ്പിക്കുക (Pay via GPay)
            </span>
            <Sparkles size={16} className="text-[#2a1805] animate-pulse" />
          </motion.button>

          <div className="mt-10 flex items-center justify-center gap-2 text-yellow-800/40 text-[9px] uppercase tracking-tighter font-sans">
            <span>Digital Kaineettam 2026</span>
            <div className="w-1 h-1 bg-yellow-900 rounded-full" />
            <span>Trusted UPI Transfer</span>
          </div>
        </div>
      </section>

      {/* QR CODE MODAL (Web only) */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-6"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 120 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#fffbf0] rounded-2xl p-8 flex flex-col items-center shadow-2xl max-w-xs w-full"
            >
              {/* Close button */}
              <button
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 text-[#8b4513] opacity-60 hover:opacity-100 transition-opacity"
              >
                <X size={20} />
              </button>

              {/* Modal header */}
              <p className="text-[#8b4513] text-[10px] uppercase tracking-widest mb-1 font-sans">
                ഐശ്വര്യം • സമൃദ്ധി
              </p>
              <h3 className="text-[#2a1805] text-xl font-bold mb-1">
                വിഷുക്കൈനീട്ടം
              </h3>
              <p className="text-[#8b4513] text-sm mb-5 font-sans">
                Scan to pay{" "}
                <span className="font-bold text-[#2a1805]">₹{amount}</span> via
                any UPI app
              </p>

              {/* QR Code */}
              <div
                className="rounded-xl overflow-hidden border-4 border-[#f3cf7a] shadow-inner"
                ref={qrRef}
              />

              {/* UPI ID */}
              <div className="mt-5 flex flex-col items-center gap-1">
                <p className="text-[10px] text-[#8b4513]/60 uppercase tracking-widest font-sans">
                  UPI ID
                </p>
                <p className="text-[#2a1805] font-mono text-sm font-bold select-all">
                  {upiId}
                </p>
              </div>

              {/* Divider */}
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent my-4" />

              {/* App icons row */}
              <p className="text-[10px] text-[#8b4513]/50 uppercase tracking-widest font-sans mb-3">
                Open with any UPI app
              </p>
              <div className="flex gap-4 items-center">
                <img
                  src="https://img.icons8.com/color/48/google-pay.png"
                  alt="GPay"
                  width={36}
                  height={36}
                />
                <img
                  src="https://img.icons8.com/color/48/paytm.png"
                  alt="Paytm"
                  width={36}
                  height={36}
                />
                <img
                  src="https://img.icons8.com/color/48/bhim.png"
                  alt="BHIM"
                  width={36}
                  height={36}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Send, Sparkles } from "lucide-react";

// const AMOUNTS = [51, 101, 251, 501, 1001, 2001];

// export default function VishuKaineettam() {
//   const [amount, setAmount] = useState(101);


//   const handleKaineettam = () => {
//     const upiId = "9061117489@upi";
//     const upiUrl = `upi://pay?pa=${upiId}&pn=Vishu%20Kaineettam&am=${amount}&cu=INR&tn=Vishu%20Kaineettam%20Blessings`;

//     // Check if it's mobile
//     if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
//       // Create a temporary hidden anchor element
//       const link = document.createElement("a");
//       link.href = upiUrl;
//       link.style.display = "none";
//       document.body.appendChild(link);
      
//       // Trigger the click
//       link.click();
      
//       // Cleanup
//       document.body.removeChild(link);
//     } else {
//       alert("ദയവായി മൊബൈലിൽ ഇത് ഉപയോഗിക്കുക ! (Please use a mobile device).");
//     }
//   };

//   // const handleKaineettam = () => {
//   //   const upiId = "9061117489@upi";
//   //   const upiUrl = `upi://pay?pa=${upiId}&pn=Vishu%20Kaineettam&am=${amount}&cu=INR&tn=Vishu%20Kaineettam%20Blessings`;

//   //   if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
//   //     window.location.href = upiUrl;
//   //   } else {
//   //     alert("ദയവായി മൊബൈലിൽ ഇത് ഉപയോഗിക്കുക (Please use a mobile device).");
//   //   }
//   // };

//   return (
//     <section className="relative min-h-screen bg-[#120802] flex flex-col items-center justify-center overflow-hidden py-20 font-serif">
//       {/* 1. KERALA MURAL BACKGROUND ELEMENTS */}
//       <div className="absolute inset-0 opacity-20 pointer-events-none">
//         {/* Subtle pattern reminiscent of temple carvings */}
//         <div
//           className="absolute top-0 left-0 w-full h-full"
//           style={{
//             backgroundImage: "radial-gradient(#3d2610 1px, transparent 1px)",
//             backgroundSize: "30px 30px",
//           }}
//         />
//       </div>

//       <div className="relative z-10 w-full max-w-md px-8 text-center">
//         {/* 2. THE RITUAL HEADER */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-10"
//         >
//           <span className="text-yellow-600/60 tracking-[0.4em] uppercase text-[10px] mb-2 block">
//             ഐശ്വര്യം • സമൃദ്ധി
//           </span>
//           <h2
//             className="text-4xl font-bold text-[#f3cf7a] tracking-tight mb-1"
//             style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
//           >
//             വിഷുക്കൈനീട്ടം
//           </h2>
//           <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-yellow-600 to-transparent mx-auto mt-4" />
//         </motion.div>

//         {/* 3. THE GOLDEN COIN DISPLAY (URUli EFFECT) */}
//         <div className="relative h-72 flex items-center justify-center mb-10">
//           {/* Glowing Aura */}
//           <div className="absolute w-64 h-64 bg-yellow-600/10 rounded-full blur-3xl animate-pulse" />

//           <AnimatePresence mode="wait">
//             <motion.div
//               key={amount}
//               initial={{ rotateY: -90, opacity: 0, scale: 0.8 }}
//               animate={{ rotateY: 0, opacity: 1, scale: 1 }}
//               exit={{ rotateY: 90, opacity: 0, scale: 0.8 }}
//               transition={{ type: "spring", stiffness: 100 }}
//               className="relative w-40 h-40 flex items-center justify-center"
//             >
//               {/* The "Kasumala" Gold Coin */}
//               <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#ffd700] via-[#b8860b] to-[#8b4513] shadow-[0_10px_40px_rgba(0,0,0,0.6),inset_0_2px_10px_rgba(255,255,255,0.5)] border-[3px] border-[#ffd700]/30" />

//               {/* Inner Engraving */}
//               <div className="relative text-center">
//                 <p className="text-[#3d2610] text-[12px] font-bold opacity-60 leading-none mb-1">
//                   കൈനീട്ടം
//                 </p>
//                 <div className="flex items-start justify-center text-[#3d2610]">
//                   <span className="text-xl font-bold mr-1">₹</span>
//                   <span className="text-5xl font-black tracking-tighter">
//                     {amount}
//                   </span>
//                 </div>
//                 <p className="text-[#3d2610] text-[12px] font-bold opacity-60 leading-none mb-1">
//                   നൽകുക 
//                 </p>
//               </div>
//             </motion.div>
//           </AnimatePresence>

//           {/* Decorative Kanikkonna Petals Falling around the coin */}
//           {[...Array(8)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-3 h-4 bg-[#ffd700] rounded-full opacity-40"
//               animate={{
//                 y: [0, 200],
//                 x: [0, i % 2 === 0 ? 40 : -40],
//                 rotate: [0, 360],
//                 opacity: [0, 0.6, 0],
//               }}
//               transition={{
//                 duration: 4,
//                 repeat: Infinity,
//                 delay: i * 0.5,
//                 ease: "linear",
//               }}
//               style={{ top: "20%", left: `${20 + i * 10}%` }}
//             />
//           ))}
//         </div>

//         {/* 4. THE COIN TRAY (SELECTION) */}
//         <p className="text-yellow-600/40 text-[10px] uppercase tracking-widest mb-6 font-sans">
//           ഒരു തുക തിരഞ്ഞെടുക്കുക
//         </p>
//         <div className="grid grid-cols-3 gap-4 mb-12 px-4">
//           {AMOUNTS.map((amt) => (
//             <motion.button
//               key={amt}
//               whileTap={{ scale: 0.9 }}
//               onClick={() => setAmount(amt)}
//               className={`h-14 rounded-lg flex flex-col items-center justify-center transition-all border relative overflow-hidden ${
//                 amount === amt
//                   ? "bg-[#2a1a0a] border-yellow-500/60 shadow-[0_0_20px_rgba(184,134,11,0.2)]"
//                   : "bg-black/20 border-white/5 text-yellow-600/50"
//               }`}
//             >
//               <span
//                 className={`text-lg font-bold ${amount === amt ? "text-[#f3cf7a]" : ""}`}
//               >
//                 ₹{amt}
//               </span>
//               {amount === amt && (
//                 <motion.div
//                   layoutId="tray-indicator"
//                   className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-500"
//                 />
//               )}
//             </motion.button>
//           ))}
//         </div>

//         {/* 5. THE DAKSHINA BUTTON */}
//         <motion.button
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//           onClick={handleKaineettam}
//           className="w-full relative py-5 px-8 rounded-xl bg-gradient-to-b from-[#e5bc5e] to-[#b38b34] shadow-[0_10px_30px_rgba(0,0,0,0.4)] group flex items-center justify-center gap-4 overflow-hidden"
//         >
//           {/* Subtle Shine Animation */}
//           <motion.div
//             animate={{ x: [-100, 400] }}
//             transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
//             className="absolute top-0 h-full w-20 bg-white/20 skew-x-12"
//           />

//           <img
//             width="32"
//             height="32"
//             src="https://img.icons8.com/color/48/google-pay.png"
//             alt="google-pay"
//             className="drop-shadow-sm"
//           />
//           <span className="text-[#2a1805] font-black uppercase tracking-widest text-sm">
//             സമർപ്പിക്കുക (Pay via GPay)
//           </span>
//           <Sparkles size={16} className="text-[#2a1805] animate-pulse" />
//         </motion.button>

//         {/* Footer Note */}
//         <div className="mt-10 flex items-center justify-center gap-2 text-yellow-800/40 text-[9px] uppercase tracking-tighter font-sans">
//           <span>Digital Kaineettam 2026</span>
//           <div className="w-1 h-1 bg-yellow-900 rounded-full" />
//           <span>Trusted UPI Transfer</span>
//         </div>
//       </div>
//     </section>
//   );
// }
