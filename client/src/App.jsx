import React from 'react';
import logo from './assets';
import './App.css'; // Assuming you have a CSS file for styles

function App() {
  



  return (
    <div className="min-h-screen bg-[#18122B] text-white font-sans">
      {/* Top Navigation */}
      <nav className="flex justify-between items-center px-6 py-3 border-b border-[#232144]">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-16 h-16" />
          <span className="text-xl font-bold tracking-wide">MapMyMess</span>
        </div>
        <ul className="flex gap-8 text-sm font-medium">
          <li className="hover:text-cyan-400 cursor-pointer">Home</li>
          <li className="hover:text-cyan-400 cursor-pointer">About</li>
          <li className="hover:text-cyan-400 cursor-pointer">Contact</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 max-w-6xl mx-auto">
        {/* Left: Headline & Buttons */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
            Transform <span className="text-cyan-400">Messy Notes</span><br />
            Into <span className="text-cyan-400">MindMaps</span>
          </h1>
          <p className="text-lg text-gray-300 mb-4 max-w-md">
            MindMap from Mess uses AI & NLP to turn your raw, unstructured notes into clear, interactive mind maps. Organize ideas, visualize connections, and export your insights.
          </p>
          <div className="flex gap-4">
            <button className="bg-cyan-400 text-[#18122B] font-semibold px-6 py-2 rounded-full shadow hover:bg-cyan-500 transition">Try Now</button>
            <button className="bg-[#232144] text-white font-semibold px-6 py-2 rounded-full border border-cyan-400 hover:bg-cyan-400 hover:text-[#18122B] transition flex items-center gap-2">
              Download Info <span className="text-lg">↓</span>
            </button>
          </div>
        </div>

        {/* Right: Illustration */}
        <div className="flex-1 flex justify-center items-center mt-12 md:mt-0">
          {/* Placeholder SVG illustration, replace with your own if desired */}
          <svg width="260" height="200" viewBox="0 0 260 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="130" cy="100" rx="120" ry="80" fill="#232144" />
            <circle cx="90" cy="90" r="30" fill="#22d3ee" />
            <rect x="120" y="120" width="60" height="30" rx="8" fill="#fff" />
            <rect x="140" y="70" width="40" height="10" rx="5" fill="#fff" />
            <text x="130" y="150" textAnchor="middle" fill="#fff" fontSize="18">MindMap</text>
          </svg>
        </div>
      </section>
    </div>
  );

    
}



export default App;
