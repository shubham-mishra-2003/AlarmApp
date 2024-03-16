import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Clockcontainer = () => {
  const [time, setTime] = useState(getCurrentTime());
  const [hourOptions] = useState(generateHourOptions());
  const [minuteOptions] = useState(generateMinuteOptions());
  const [ampmOptions] = useState(["AM", "PM"]);
  const [alarmTime, setAlarmTime] = useState(localStorage.getItem("alarmTime"));
  const [isAlarmSet, setIsAlarmSet] = useState(false);

  let ringtone = new Audio("./ringtone.mp3");

  function getCurrentTime() {
    const date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    return `${h} : ${m} : ${s} ${ampm}`;
  }

  function generateHourOptions() {
    const options = [];
    for (let i = 1; i < 13; i++) {
      options.push(i < 10 ? "0" + i : i);
    }
    return options;
  }

  function generateMinuteOptions() {
    const options = [];
    for (let i = 0; i < 60; i++) {
      options.push(i < 10 ? "0" + i : i);
    }
    return options;
  }

  function setAlarm() {
    const hour = document.getElementById("hourSelect").value;
    const minute = document.getElementById("minuteSelect").value;
    const ampm = document.getElementById("ampmSelect").value;
    const time = `${hour}:${minute} ${ampm}`;

    if (hour === "hour" || minute === "minute" || ampm === "AM/PM") {
      toast.error("Time not selected");
    } else {
      setAlarmTime(time);
      localStorage.setItem("alarmTime", time);
      setIsAlarmSet(true);
      toast.success(`Alarm is set for ${time}`);
    }
  }

  function delAlarm() {
    if (alarmTime) {
      localStorage.removeItem("alarmTime");
      setIsAlarmSet(false);
      setAlarmTime("");
      alert("Alarm will get deleted !");
      toast.success("Alarm time deleted successfully");
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
  const interval = setInterval(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentSecond = currentTime.getSeconds();
    const currentAmPm = currentHour >= 12 ? "PM" : "AM";

    // Convert alarm time string to Date object
    const alarmTimeString = alarmTime.split(":");
    const alarmHour = parseInt(alarmTimeString[0]);
    const alarmMinute = parseInt(alarmTimeString[1].split(" ")[0]);
    const alarmAmPm = alarmTimeString[1].split(" ")[1];

    console.log("Current Time:", currentTime.toLocaleTimeString());
    console.log("Alarm Time:", alarmTime);

    if (
      currentHour === alarmHour &&
      currentMinute === alarmMinute &&
      currentAmPm === alarmAmPm &&
      currentSecond === 0 // Trigger alarm only when seconds are 0
    ) {
      console.log("Alarm ringing...");
      try {
        if (ringtone.paused) {
          ringtone.play().then(() => {
            console.log("Ringtone started playing.");
          }).catch(error => {
            console.error("Error playing ringtone:", error);
          });
        } else {
          console.warn("Ringtone is already playing.");
        }
      } catch (error) {
        console.error("Error playing ringtone:", error);
      }
    }
  }, 1000);

  return () => clearInterval(interval);
}, [alarmTime]);

  

  return (
    <div className="flex fixed md:static md:w-[65vw] w-full justify-center items-center p-9 flex-col bg-gray-900 rounded-lg bg-clip-padding backdrop-filter mt-20 backdrop-blur-sm bg-opacity-30 border border-gray-100 mb-2">
      <img src="./clock.png" alt="clock" width="250px" />
      <h1 className="text-white mt-8 mb-8 text-3xl md:text-5xl" id="livetime">
        {time}
      </h1>
      <div className="flex justify-around w-full">
        <div className="rounded-lg border-slate-900 w-full flex-1 mr-5">
          <select
            id="hourSelect"
            className={`outline-none border-none h-[33px] w-full text-md cursor-pointer ${isAlarmSet
              ? "pointer-events-none opacity-45"
              : null}`}
          >
            <option value="hour" defaultChecked hidden>
              Hour
            </option>
            {hourOptions.map(option =>
              <option key={option} value={option}>
                {option}
              </option>
            )}
          </select>
        </div>
        <div className="rounded-lg border-slate-900 w-full flex-1 mr-5">
          <select
            id="minuteSelect"
            className={`outline-none border-none h-[33px] w-full text-md cursor-pointer ${isAlarmSet
              ? "pointer-events-none opacity-45"
              : null}`}
          >
            <option value="minute" defaultChecked hidden>
              Minute
            </option>
            {minuteOptions.map(option =>
              <option key={option} value={option}>
                {option}
              </option>
            )}
          </select>
        </div>
        <div className="rounded-lg border-slate-900 w-full flex-1">
          <select
            id="ampmSelect"
            className={`outline-none border-none h-[33px] w-full text-md cursor-pointer ${isAlarmSet
              ? "pointer-events-none opacity-45"
              : null}`}
          >
            <option value="AM/PM" defaultChecked hidden>
              AM/PM
            </option>
            {ampmOptions.map(option =>
              <option key={option} value={option}>
                {option}
              </option>
            )}
          </select>
        </div>
      </div>
      <div className="m-5 mt-6 md:text-3xl text-[17px] text-white text-center">
        {isAlarmSet ? `Alarm is set for ${alarmTime}` : null}
      </div>
      <button
        onClick={isAlarmSet ? delAlarm : setAlarm}
        className="w-full outline-none border-none mt-5 text-xl p-4 pl-0 pr-0 rounded-md bg-[#4a98f7] text-white"
      >
        {isAlarmSet ? "Delete alarm" : "Set alarm"}
      </button>
    </div>
  );
};

export default Clockcontainer;
