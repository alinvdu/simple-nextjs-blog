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
          className="fixed top-24 right-4 w-80 bg-black shadow-lg rounded-lg p-6 flex flex-col space-y-4 dark:bg-zinc-800"
          style={{ zIndex: 1000 }}
        >
          {/* Close Button */}
          <button
            onClick={hideWidget}
            className="absolute top-2 right-2 text-white text-lg rounded-full hover:bg-white hover:text-black flex items-center justify-center transition-all duration-200"
            style={{
              width: "24px",
              height: "24px",
              lineHeight: "24px",
            }}
          >
            ✕
          </button>

          {/* Widget Content */}
          <p className="text-white text-sm">
            Don’t miss it, subscribe to futuristic ideas.
          </p>
          <button
            onClick={hideWidget}
            className="px-4 py-2 text-sm text-black bg-white border border-gray-300 rounded hover:bg-gray-100"
          >
            Learn More
          </button>
        </div>
      )}
    </>
  );
};

export default SubscribeWidget;

