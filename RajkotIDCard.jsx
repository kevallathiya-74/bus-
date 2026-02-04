import React, { useState, useEffect } from 'react';

const RajkotIDCard = () => {
  const [countdown, setCountdown] = useState('');
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  const userData = {
    name: "KEVAL SHAILESHBHAI LATHIYA",
    birthDate: "19/08/2006",
    refNo: "8176",
    contactNo: "7405634027",
    validFrom: "07/02/2026",
    validTill: "05/08/2026",
    category: "STUDENT (ABOVE 12 YEAR)"
  };

  useEffect(() => {
    const calculateCountdown = () => {
      const [day, month, year] = userData.validTill.split('/');
      const validTillDate = new Date(year, month - 1, day, 23, 59, 59);
      const now = new Date();

      const timeDiff = validTillDate - now;

      if (timeDiff <= 0) {
        setCountdown('EXPIRED');
        return;
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      const pad = (num) => String(num).padStart(2, '0');
      setCountdown(`${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);

    return () => clearInterval(timer);
  }, [userData.validTill]);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }

    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#E8D5D0] via-[#E5DCD8] to-[#D8D0E0] font-sans relative">
      {/* Install Button */}
      {showInstallButton && (
        <div className="w-full bg-[#E8451E] text-white py-3 px-4 flex items-center justify-between shadow-md">
          <span className="text-sm font-semibold">Install App for Offline Access</span>
          <button
            onClick={handleInstallClick}
            className="bg-white text-[#E8451E] px-4 py-1.5 rounded font-bold text-sm hover:bg-gray-100 transition"
          >
            Install
          </button>
        </div>
      )}

      {/* Close Button */}
      <button className="absolute top-4 left-4 text-gray-800 hover:text-gray-600 z-10">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Main Card Container */}
      <div className="w-full max-w-sm bg-white shadow-xl overflow-hidden mt-12 mx-4" style={{ borderRadius: '16px' }}>

        {/* Header Section */}
        <div className="bg-[#E8451E] text-white py-4 px-4 text-center" style={{ borderRadius: '16px 16px 0 0' }}>
          <h1 className="text-xl font-bold tracking-wide">Rajkot Rajpath Ltd</h1>
        </div>

        {/* Profile and Name Section */}
        <div className="p-5 bg-[#F5F0ED]">
          <div className="flex gap-4 mb-5">
            {/* Photo */}
            <div className="w-24 h-32 border border-gray-400 bg-white flex-shrink-0 flex items-center justify-center overflow-hidden">
              <img
                src="/keval.png"
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div class="text-gray-400 text-xs text-center">Photo</div>';
                }}
              />
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-lg font-bold leading-tight text-gray-900 mb-2">
                {userData.name}
              </h2>
              <p className="text-gray-500 text-xs italic">Birth Date</p>
              <p className="text-gray-900 font-medium text-sm">{userData.birthDate}</p>
            </div>
          </div>

          {/* Reference and Contact Row */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <p className="text-gray-500 text-xs italic mb-0.5">Ref.No.</p>
              <p className="text-gray-900 font-bold text-xl">{userData.refNo}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs italic mb-0.5">Contact No.</p>
              <p className="text-gray-900 font-bold text-lg">{userData.contactNo}</p>
            </div>
          </div>

          {/* Dashed Separator Line with Punch-out Notches */}
          <div className="relative mb-5">
            {/* Left Semi-Circle Notch - Creates punch-out effect */}
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-10 bg-gradient-to-b from-[#E8D5D0] via-[#E5DCD8] to-[#D8D0E0]" 
              style={{ 
                borderRadius: '0 50% 50% 0',
                marginLeft: '-20px',
                zIndex: 10
              }}
            ></div>
            
            {/* Dashed Line */}
            <div className="border-t-2 border-dashed border-gray-400"></div>
            
            {/* Right Semi-Circle Notch - Creates punch-out effect */}
            <div 
              className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-10 bg-gradient-to-b from-[#E8D5D0] via-[#E5DCD8] to-[#D8D0E0]" 
              style={{ 
                borderRadius: '50% 0 0 50%',
                marginRight: '-20px',
                zIndex: 10
              }}
            ></div>
          </div>

          {/* Validity Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-xs italic mb-0.5">Valid From</p>
              <p className="text-gray-900 font-bold text-base">{userData.validFrom}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-xs italic mb-0.5">Valid Till</p>
              <p className="text-gray-900 font-bold text-base">{userData.validTill}</p>
            </div>
          </div>
        </div>

        {/* Category Banner */}
        <div className="bg-[#E8451E] text-white py-2 px-4 text-center">
          <p className="text-sm font-bold tracking-wide uppercase">
            {userData.category}
          </p>
        </div>

        {/* QR Code Section */}
        <div className="flex flex-col items-center py-6 bg-[#FAFAFA]" style={{ borderRadius: '0 0 16px 16px' }}>
          <div className="bg-white p-2">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://rajkotrajpath.com/verify/8176"
              alt="QR Code"
              className="w-36 h-36"
            />
          </div>

          {/* Countdown Timer */}
          <div className="mt-3 text-center">
            <p className="text-gray-700 font-semibold text-xs">
              {countdown}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RajkotIDCard;
