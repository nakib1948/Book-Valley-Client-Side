import React, { useState, useEffect } from "react";
import book from "../../../assets/All-Books/offer.png";
import offerbg from "../../../assets/All-Books/offer-bg.jpg";

const OfferSection = () => {
  const [days, setDays] = useState(99);
  const [hours, setHours] = useState(10);
  const [minutes, setMinutes] = useState(24);
  const [seconds, setSeconds] = useState(27);
  useEffect(() => {
    // Update the countdown values every second
    const countdownInterval = setInterval(() => {
      // Decrease seconds, minutes, hours, and days as needed
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes > 0) {
          setSeconds(59);
          setMinutes(minutes - 1);
        } else {
          if (hours > 0) {
            setSeconds(59);
            setMinutes(59);
            setHours(hours - 1);
          } else {
            if (days > 0) {
              setSeconds(59);
              setMinutes(59);
              setHours(23);
              setDays(days - 1);
            } else {
              // Countdown has reached 0, you can handle this case as needed
              clearInterval(countdownInterval);
            }
          }
        }
      }
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(countdownInterval);
  }, [days, hours, minutes, seconds]);
  return (
    <div
      className="hero bg-fixed min-h-screen"
      style={{ backgroundImage: `url(${offerbg})` }}
    >
      <div className="hero-content flex-col lg:flex-row">
        <img src={book} />
        <div>
          <h1 className="text-3xl text-gray-600 my-4">Special Offers</h1>
          <h1 className="text-4xl font-semibold text-red-400">
            All books are 20% off now this week! <br /> Don&rsquo;t miss such a
            deal!
          </h1>
          <div className="grid grid-flow-col gap-5 text-center text-gray-600 my-6 auto-cols-max">
            <div className="flex flex-col">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": days }}>{days}</span>
              </span>
              days
            </div>
            <div className="flex flex-col">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": hours }}>{hours}</span>
              </span>
              hours
            </div>
            <div className="flex flex-col">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": minutes }}>{minutes}</span>
              </span>
              min
            </div>
            <div className="flex flex-col">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": seconds }}>{seconds}</span>
              </span>
              sec
            </div>
          </div>
          <button className="btn btn-outline rounded-full font-semibold">Explore More</button>
        </div>
      </div>
    </div>
  );
};

export default OfferSection;
