import { useEffect, useState } from "react";
import "./App.css";

function App() {
const localStorageTimer = ()=>{
  const save = localStorage.getItem('timer')
  return JSON.parse(save) || 25*60
}

const localStorageIsBreack = () => {
  const save = localStorage.getItem("isBreak");
  return JSON.parse(save) ||  false
};

const localStorageActive = () => {
  const save = localStorage.getItem("active");
  return JSON.parse(save) || false;
};

  const [timer, setTimer] = useState(localStorageTimer);
  const [isBreak, setIsBreak] = useState(localStorageIsBreack);
  const [active, setActive] = useState(localStorageActive);
  const [date, setDate] = useState('');

  const timeFormatting = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    const minFormating = min.toString().padStart(2, "0");
    const secFormating = sec.toString().padStart(2, "0");
    return `${minFormating}:${secFormating}`;
  };

  useEffect(() => {
    let intervall = null;

    if (active && timer > 0) {
      intervall = setInterval(() => {
        setTimer((prev) => prev - 1);
        setIsBreak(false);
      }, 1000);
    } else if (timer === 0) {
      if (isBreak) {
        setTimer(25 * 60);
        setIsBreak(false);
      } else {
        setTimer(5 * 60);
        setIsBreak(true);
      }
    } else {
      setActive(false);
    }
    return () => {
      clearInterval(intervall);
    };
  }, [timer, isBreak, active]);

useEffect(() => {
  const updateTime = () => setDate(new Date().toLocaleTimeString());
  updateTime();
  const timeNow = setInterval(updateTime, 1000);
  return () => clearInterval(timeNow);
}, []);

useEffect(() => {
  localStorage.setItem("timer", JSON.stringify(timer));
  localStorage.setItem("isBrack", JSON.stringify(isBreak));
  localStorage.setItem("active", JSON.stringify(active));
}, [timer, isBreak, active]);

  return (
    <>
      <p>{timeFormatting(timer)}</p>
      <button
        onClick={() => {
          setActive((prev) => !prev);
        }}
      >
        {active ? "пауза" : "плэй"}
      </button>
      <p>Сегодняшнее время: {date}</p>
    </>
  );
}

export default App;
