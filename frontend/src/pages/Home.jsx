import React from 'react'
import { useNavigate } from 'react-router-dom';

import vegetables from "../assets/vegetables.jpg"


const Home = () => {
  let navigate = useNavigate();
   return (
    <div
      className="w-full h-[90%] relative bg-cover rounded-2xl bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8VmVnZXRhYmxlcyUyMGFuZCUyMGZydWl0c3xlbnwwfHwwfHx8MA%3D%3D)` ,
        fontFamily : "Lexend"
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/10"></div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-white text-center space-y-6 animate-fade-in">
        <h1 className="text-4xl font-extrabold leading-tight md:text-4xl drop-shadow-lg">
          Fresh From The Farm <br />
          <span className="text-green-400">To Your Doorstep</span>
        </h1>

        <p className="text-xl max-w-xl md:text-lg opacity-90">
          Shop 100% organic fruits, vegetables, grains and more—straight from local farmers.
        </p>

        <button
          onClick={() => navigate("/products")}
          className="flex items-center gap-2 mt-4 px-8 py-3 bg-green-600 hover:bg-green-500 text-white text-lg font-semibold rounded-full shadow-lg transition-all duration-300"
        >
          Shop Fresh 
        </button>
      </div>

      {/* Decorative curved bottom */}
      <div className=" w-full h-40 bg-white rounded-t-[3rem] shadow-md"></div>
    </div>
  );
}

export default Home