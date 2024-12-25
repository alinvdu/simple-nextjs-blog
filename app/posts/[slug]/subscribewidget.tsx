"use client";

import React, { useState, useEffect } from "react";

const SubscribeWidget = () => {
  const [showWidget, setShowWidget] = useState(false);
  const [permanentlyDismissed, setPermanentlyDismissed] = useState(false);

  // Effect to handle showing the widget after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY; // Current scroll position
      if (scrollPosition > 1500 && !permanentlyDismissed) { // Show widget if not dismissed
        setShowWidget(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [permanentlyDismissed]);

  // Function to navigate to the subscribe section and hide the widget
  const navigateToSubscribe = () => {
    const subscribeElement = document.getElementById("subscribe");
    if (subscribeElement) {
      subscribeElement.scrollIntoView({ behavior: "smooth" });
    }
    hideWidget();
  };

  // Function to permanently hide the widget
  const hideWidget = () => {
    setPermanentlyDismissed(true); // Prevent widget from reappearing
    setShowWidget(false); // Hide the widget
  };

  return (
    <>
      {showWidget && (
        <div
          className="fixed top-24 right-4 w-[300px] bg-black shadow-lg rounded-lg p-4 flex flex-col space-y-2 dark:bg-zinc-800"
          style={{ zIndex: 1000 }}
        >
          {/* Close Button */}
          <button
            onClick={hideWidget}
            className="absolute top-2 right-2 text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              fontSize: "16px"
            }}
          >
            ✕
          </button>

          {/* Widget Content */}
          <p className="text-white text-sm" style={{marginTop: "4px"}}>
            Don’t miss it, subscribe to futuristic ideas.
          </p>
          <div className="flex justify-center">
            <button
              onClick={navigateToSubscribe}
              className="px-3 py-1 text-sm w-[100px] text-black bg-white border border-gray-300 rounded hover:bg-gray-100"
            >
              I'd love to!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SubscribeWidget;
