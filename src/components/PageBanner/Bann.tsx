import React from "react";

function Bann({ data }) {
  return (
    <div
      className="relative w-full h-[300px] rounded-xl overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://i.ibb.co.com/67Jd8M14/wmremove-transformed.png')",
        }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/60 via-orange-500/60 to-orange-400/30"></div>

      {/* Title with Animation */}
      <div className="absolute inset-0 flex justify-center items-center text-center">
        <h1 className="text-white text-4xl font-bold drop-shadow-lg animate-fadeInUp">
          {data}
        </h1>
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Bann;
