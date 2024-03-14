import React, { useState, useEffect } from "react";

const LastRefresh = () => {
  const [lastRefreshTime, setLastRefreshTime] = useState(
    localStorage.getItem("lastRefreshTime") || new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const handleRefresh = () => {
      const currentTime = new Date().toLocaleTimeString();
      setLastRefreshTime(currentTime);
      localStorage.setItem("lastRefreshTime", currentTime);
    };

    window.addEventListener("beforeunload", handleRefresh);

    return () => {
      window.removeEventListener("beforeunload", handleRefresh);
    };
  }, []);

  return (
    <div className="w-4/5 text-right ml-32">
      <h1 className="text-red-500 text-sm">
        Last Refresh:{" "}
        <span className="text-red-500 text-sm">{lastRefreshTime}</span>
      </h1>
      {/* Your other components/content */}
    </div>
  );
};

export default LastRefresh;
