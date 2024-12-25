"use client";

import React, { useState, useEffect } from "react";

const SubscribeWidget = () => {
  const [showWidget, setShowWidget] = useState(false);
  const [permanentlyDismissed, setPermanentlyDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 300 && !permanentlyDismissed) {
        setShowWidget(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [permanentlyDismissed]);

  // Hide widget permanently
  const hideWidget = () => {
    setPermanentlyDismissed(true);
    setShowWidget(false);
  };

  return (
    <>
      {showWidget && (
        <div
          className="fixed top-24 right-4 bg-black shadow-lg rounded-lg p-4 pr-6 flex flex-col space-y-2 dark:bg-zinc-800 relative"
          style={{ zIndex: 1000 }}
        >
          <button
            onClick={hideWidget}
            className="absolute top-1 right-1 w-5 h-5 bg-white text-black rounded-full hover:bg-black hover:text-white flex items-center justify-center"
          >
            ✕
          </button>
          <p className="text-white text-sm">
            Don’t miss it, subscribe to futuristic ideas.
          </p>
          <button
            onClick={hideWidget}
            className="px-3 py-1 text-sm text-black bg-white border border-gray-300 rounded hover:bg-gray-100"
          >
            Learn More
          </button>
        </div>
      )}
    </>
  );
};

export default SubscribeWidget;
