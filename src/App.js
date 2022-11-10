import './App.css';
import Container from "./Components/Container/Container";
import Label from "./Components/Label/Label";
import {useEffect, useRef, useState} from "react";
import Decrement from "./Components/Decrement/Decrement";
import Length from "./Components/Length/Length";
import Increment from "./Components/Increment/Increment";
import Timer from "./Components/Timer/Timer";
import StartStop from "./Components/StartStop/StartStop";
import Reset from "./Components/Reset/Reset";
import alarmSound from "./Components/media/Air-raid-siren.mp3";

function App() {

    const [breakLength, setBreakLength] = useState(5)
    const [sessionLength, setSessionLength] = useState(25)
    const [isTimerRunning, setIsTimerRunning] = useState(false)
    const [workTime, setWorkTime] = useState(true)
    const [countdownTime, setCountdownTime] = useState(sessionLength * 60);
    const timerRef = useRef(null)
    const alarmRef = useRef(null)

    const handleStartStop = () => {
        clearTimeout(timerRef.current)
        setIsTimerRunning(!isTimerRunning)
    }

    const handleReset = () => {
        clearInterval(timerRef.current)
        alarmRef.current.currentTime = 0
        alarmRef.current.pause()
        setIsTimerRunning(false)
        setBreakLength(5)
        setSessionLength(25)
        setWorkTime(true)
        setCountdownTime(sessionLength * 60)
    }


    const calcDisplayTime = () => {
        let newMin = String(Math.floor(countdownTime / 60))
        let newSec = String(countdownTime % 60)

        if (newMin.length === 1) newMin = '0' + newMin
        if (newSec.length === 1) newSec = '0' + newSec

        return newMin + ':' + newSec
    }

    const handleWorkChange = () => {
        if (countdownTime === 0) {
            alarmRef.current.play()
            setIsTimerRunning(false)
            setWorkTime(!workTime)
            if (workTime) {
                setCountdownTime(sessionLength * 60)
            } else {
                setCountdownTime(breakLength * 60)
            }
            setIsTimerRunning(true)
        }
    }

    useEffect(() => {
        if (isTimerRunning) {
            timerRef.current = setTimeout(() => {
                setCountdownTime(countdownTime - 1)
                clearTimeout(timerRef.current)
                handleWorkChange()
            }, 1000)
        } else if (!isTimerRunning) {
            return () => clearTimeout(timerRef.current)
        }
    }, [isTimerRunning, countdownTime])


    useEffect(() => {
        if (workTime && !isTimerRunning) {
            setCountdownTime(sessionLength * 60)
        } else if (!workTime && !isTimerRunning) {
            setCountdownTime(breakLength * 60)
        }

    }, [workTime, sessionLength, breakLength])


    return (
        <div className="App">
            <h1 className={"clock-title"}>25 + 5 Clock</h1>
            <Container className={"settings-container"}>
                <Container className={"break-settings-container"}>
                    <Label id={"break-label"} text={"Break"}/>
                    <Container className={"increment-decrement-container"}>
                        <Decrement id={"break-decrement"}
                                   breakLength={breakLength}
                                   setBreakLength={setBreakLength}
                                   sessionLength={sessionLength}
                                   setSessionLength={setSessionLength}
                                   isTimerRunning={isTimerRunning}/>
                        <Length id={"break-length"} length={breakLength}/>
                        <Increment id={"break-increment"}
                                   breakLength={breakLength}
                                   setBreakLength={setBreakLength}
                                   sessionLength={sessionLength}
                                   setSessionLength={setSessionLength}
                                   isTimerRunning={isTimerRunning}/>
                    </Container>
                </Container>
                <Container className={"session-settings-container"}>
                    <Label id={"session-label"} text={"Session"}/>
                    <Container className={"increment-decrement-container"}>
                        <Decrement id={"session-decrement"}
                                   breakLength={breakLength}
                                   setBreakLength={setBreakLength}
                                   sessionLength={sessionLength}
                                   setSessionLength={setSessionLength}
                                   isTimerRunning={isTimerRunning}/>
                        <Length id={"session-length"} length={sessionLength}/>
                        <Increment id={"session-increment"}
                                   breakLength={breakLength}
                                   setBreakLength={setBreakLength}
                                   sessionLength={sessionLength}
                                   setSessionLength={setSessionLength}
                                   isTimerRunning={isTimerRunning}/>
                    </Container>
                </Container>
            </Container>
            <Container className={"timer-container"}>
                <Label id={"timer-label"} workTime={workTime}/>
                <Timer id={"time-left"} sessionLength={sessionLength} breakLength={breakLength}
                       timeLeft={calcDisplayTime()}/>
                <Container className={"controls-container"}>
                    <StartStop id={"start_stop"} onClick={handleStartStop}/>
                    <Reset id={"reset"} onClick={handleReset}/>
                </Container>
            </Container>
            <audio id={"beep"} src={alarmSound} preload={"auto"} ref={alarmRef}/>
        </div>
    );
}

export default App;
