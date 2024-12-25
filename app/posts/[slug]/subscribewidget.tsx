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

  // Function to navigate to the subscribe section
  const navigateToSubscribe = () => {
    const subscribeElement = document.getElementById("subscribe");
    if (subscribeElement) {
      subscribeElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Function to dismiss the widget
  const dismissWidget = () => {
    setShowWidget(false);
  };

  return (
    <>
      {showWidget && (
        <div
          className="fixed top-16 right-4 bg-white shadow-lg rounded-lg p-4 dark:bg-zinc-800 dark:text-white"
          style={{ zIndex: 1000 }}
        >
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold">Learn More</h4>
            <button
              onClick={dismissWidget}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>
          <p className="text-sm my-4">Don’t miss it, subscribe to futuristic ideas.</p>
          <button
            onClick={navigateToSubscribe}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Subscribe
          </button>
        </div>
      )}
    </>
  );
};

export default SubscribeWidget;
