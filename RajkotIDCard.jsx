import React, { useState, useEffect } from 'react';

const RajkotIDCard = () => {
  const [countdown, setCountdown] = useState('');

  const userData = {
    name: "KEVAL SHAILESHBHAI LATHIYA",
    birthDate: "19/08/2006",
    refNo: "8176",
    contactNo: "7405634027",
    validFrom: "05/08/2025",
    validTill: "07/02/2026",
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

  return (
    <div className="flex flex-col items-center min-h-screen bg-white font-sans">
      {/* Main Card Container - Full width for mobile */}
      <div className="w-full max-w-md bg-white shadow-sm">
        
        {/* Header Section */}
        <div className="bg-[#E34234] text-white py-3 px-4 text-center">
          <h1 className="text-xl font-bold tracking-tight">Rajkot Rajpath Ltd</h1>
        </div>

        {/* Profile and Name Section */}
        <div className="p-6">
          <div className="flex gap-6 mb-6">
            {/* Photo Placeholder */}
            <div className="w-32 h-40 border border-gray-300 bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
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

            <div className="flex flex-col justify-start">
              <h2 className="text-lg font-black leading-tight text-gray-800 mb-2 uppercase">
                {userData.name}
              </h2>
              <p className="text-gray-500 text-[10px] font-bold uppercase">Birth Date</p>
              <p className="text-gray-900 font-bold">{userData.birthDate}</p>
            </div>
          </div>

          {/* Reference and Contact Row */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <p className="text-gray-500 text-[10px] font-bold uppercase">Ref.No.</p>
              <p className="text-gray-900 font-bold text-lg">{userData.refNo}</p>
            </div>
            <div>
              <p className="text-gray-500 text-[10px] font-bold uppercase">Contact No.</p>
              <p className="text-gray-900 font-bold text-lg">{userData.contactNo}</p>
            </div>
          </div>

          {/* Validity Row */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-500 text-[10px] font-bold uppercase">Valid From</p>
              <p className="text-gray-900 font-bold text-base">{userData.validFrom}</p>
            </div>
            <div>
              <p className="text-gray-500 text-[10px] font-bold uppercase text-right">Valid Till</p>
              <p className="text-gray-900 font-bold text-base text-right">{userData.validTill}</p>
            </div>
          </div>
        </div>

        {/* Category Banner */}
        <div className="bg-[#E34234] text-white py-1.5 px-4 text-center">
          <p className="text-sm font-bold tracking-wide uppercase italic">
            {userData.category}
          </p>
        </div>

        {/* QR Code Section */}
        <div className="flex flex-col items-center py-8 bg-[#F9FAFB]">
          <div className="bg-white p-4 shadow-sm border border-gray-100">
            {/* Replace src with actual QR code link */}
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SampleData" 
              alt="QR Code" 
              className="w-36 h-36"
            />
          </div>
          
          {/* Countdown Timer */}
          <div className="mt-4 text-center">
            <p className="text-gray-900 font-bold text-sm">
              {countdown}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RajkotIDCard;
