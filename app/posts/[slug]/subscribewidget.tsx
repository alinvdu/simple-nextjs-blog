"use client";

import React, { useState, useEffect } from "react";

const SubscribeWidget = () => {
  const [showWidget, setShowWidget] = useState(false);

  // Effect to handle showing the widget after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY; // Current scroll position
      if (scrollPosition > 300) { // Show widget after 300px scroll
        setShowWidget(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to navigate to the subscribe section and hide the widget
  const navigateToSubscribe = () => {
    const subscribeElement = document.getElementById("subscribe");
    if (subscribeElement) {
      subscribeElement.scrollIntoView({ behavior: "smooth" });
    }
    setShowWidget(false); // Hide the widget after pressing Learn More
  };

  // Function to dismiss the widget
  const dismissWidget = () => {
    setShowWidget(false); // Permanently hide the widget
  };

  return (
    <>
      {showWidget && (
        <div
          className="fixed top-16 right-4 bg-white shadow-lg rounded-lg p-3 dark:bg-zinc-800 dark:text-white flex flex-col items-start space-y-2"
          style={{ zIndex: 1000 }}
        >
          <p className="text-sm">Don’t miss it, subscribe to futuristic ideas.</p>
          <div className="flex space-x-2">
            <button
              onClick={navigateToSubscribe}
              className="px-3 py-1 text-sm text-black bg-white border border-gray-300 rounded hover:bg-gray-100"
            >
              Learn More
            </button>
            <button
              onClick={dismissWidget}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SubscribeWidget;

