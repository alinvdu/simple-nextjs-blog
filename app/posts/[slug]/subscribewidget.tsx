"use client";

import React, { useState, useEffect } from "react";

const SubscribeWidget = () => {
  const [showWidget, setShowWidget] = useState(false);
  const [permanentlyDismissed, setPermanentlyDismissed] = useState(false);

  // Effect to handle showing the widget after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY; // Current scroll position
      if (scrollPosition > 300 && !permanentlyDismissed) { // Show widget if not dismissed
        setShowWidget(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [permanentlyDismissed]);

  // Function to hide the widget permanently
  const hideWidget = () => {
    setPermanentlyDismissed(true); // Prevent widget from reappearing
    setShowWidget(false); // Hide the widget
  };

  return (
    <>
      {showWidget && (
        <div
          className="fixed top-24 right-4 bg-black shadow-lg rounded-lg p-4 pr-8 flex flex-col space-y-2 dark:bg-zinc-800 relative"
          style={{ zIndex: 1000 }}
        >
          <button
            onClick={hideWidget}
            className="absolute top-2 right-2 w-6 h-6 bg-white text-black rounded-full hover:bg-black hover:text-white flex items-center justify-center"
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
