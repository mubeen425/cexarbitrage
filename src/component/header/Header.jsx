import React, { useEffect, useState } from "react";
import { logoutUser } from "../../apis/auth_apis";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [storedTime, setStoredTime] = useState(new Date(localStorage.getItem("timer")));
  const [formattedTime, setFormattedTime] = useState("00:00:00");

  const navigate = useNavigate();

  const currentUser = localStorage.getItem("token");
  const timestamp2 = new Date();
  const { setToken } = useAuth();

  const handleLogout = () => {
    logoutUser(setToken, navigate);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const formatremainingSeconds = Math.floor(seconds % 60);

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(formatremainingSeconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };
let remainingSeconds;
useEffect(() => {
  const intervalId = setInterval(() => {
    const timeDifferenceInMilliseconds = timestamp2 - storedTime;
    const timeDifferenceInSeconds = timeDifferenceInMilliseconds / 1000; // Convert to seconds
     remainingSeconds = 1440 * 60 - timeDifferenceInSeconds; // Convert remaining minutes to seconds

    setTimeRemaining(remainingSeconds);
    setFormattedTime(formatTime(remainingSeconds));

    if (remainingSeconds <= 0) {
      // Set the storedTime to expired time when the free plan expires
      // const expired = new Date().toISOString();
      localStorage.setItem('timer', "expired");
      setStoredTime("expired");
    }
  }, 1000); // Update every 1000 milliseconds (1 second)

  // Clear the interval when the component is unmounted
  return () => clearInterval(intervalId);
}, [timestamp2, storedTime]);
  return (
    <>
    <header>
      <nav className={`bg-gray-800 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800`}>
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">

          <Link to={"/"} className={`flex items-center text-white`}>
            <img
              src={require(`../../images/cex.png`)}
              className="mr-3 h-6 sm:h-9"
              alt="Logo"
            />
            <span className={`self-center text-xl font-semibold whitespace-nowrap dark:text-white`}>CEX ARBITRAGE</span>
          </Link>

          <div className="flex items-center lg:order-2">
            {currentUser && (
             <p className={`text-white hover:bg-gray-700 focus:ring-4 focus:ring-gray-800 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800`}>
             {formattedTime == 'NaN:NaN:NaN' || timeRemaining <=0 ? (
               <span>Your Free Plan has been Expired</span>
             ) : (
               <span>Your Free Plan Expires in: {formattedTime}</span>
             )}
           </p>
            )}
            {!currentUser ? (
              <Link to={"/auth/register"} className={`text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800`}>
                Create Account
              </Link>
            ) : (
              <Link to={'/dashboard/membership'} className={`text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800`}>
                Buy Premium
              </Link>
            )}
            {!currentUser ? (
              <Link to={"/auth/login"} className={`text-white hover:bg-gray-700 focus:ring-4 focus:ring-gray-800 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800`}>
                Log in
              </Link>
            ) : (
              <Link onClick={handleLogout} className={`text-white hover:bg-gray-700 focus:ring-4 focus:ring-gray-800 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800`}>
                Log out
              </Link>
            )}
          </div>

        </div>
      </nav>
    </header>
  </>
  );
}

export default Header;
