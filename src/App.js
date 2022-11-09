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
    const [timerText, setTimerText] = useState('Session')
    const [isTimerRunning, setIsTimerRunning] = useState(false)
    const [workTime, setWorkTime] = useState(true)
    const [intClock, setIntClock] = useState(sessionLength * 60);
    const ref = useRef(null)
    const alarmRef = useRef(null)
    const handleStartStop = () => {
        setIsTimerRunning(!isTimerRunning)
    }

    const handleReset = () => {
        clearInterval(ref.current)
        alarmRef.current.stop()
        alarmRef.current.currentTime = 0
        setIsTimerRunning(false)
        setBreakLength(5)
        setSessionLength(25)
        setIntClock(sessionLength * 60)
    }


    const calcDisplayTime = () => {
        let newMin = String(Math.floor(intClock / 60))
        let newSec = String(intClock % 60)

        if (newMin.length === 1) newMin = '0' + newMin
        if (newSec.length === 1) newSec = '0' + newSec

        return newMin + ':' + newSec
    }

    const handleWorkChange = () => {
        if (workTime) {
            setTimerText("Session")
            setIntClock(sessionLength * 60)
        } else if (!workTime) {
            setTimerText("Break")
            setIntClock(breakLength * 60)
        }
    }

    useEffect(() => {
        let timesRun = 0
        if (isTimerRunning) {
            ref.current = setInterval(() => {
                setIntClock((prevIntClock) => prevIntClock - 1)
                timesRun++
                if (timesRun === intClock) {
                    alarmRef.current.play()
                    clearInterval(ref.current)
                    setIsTimerRunning(true)
                    setWorkTime(!workTime)
                    handleWorkChange()
                }
            }, 1000)
        } else if (!isTimerRunning) {
            clearInterval(ref.current)
        }
        return () => clearInterval(ref.current)
    }, [isTimerRunning, workTime])

    useEffect(() => {
        if (workTime && !isTimerRunning) {
            setIntClock(sessionLength * 60)
        } else if (!workTime && !isTimerRunning) {
            setIntClock(breakLength * 60)
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
                                   setSessionLength={setSessionLength}/>
                        <Length id={"break-length"} length={breakLength}/>
                        <Increment id={"break-increment"}
                                   breakLength={breakLength}
                                   setBreakLength={setBreakLength}
                                   sessionLength={sessionLength}
                                   setSessionLength={setSessionLength}/>
                    </Container>
                </Container>
                <Container className={"session-settings-container"}>
                    <Label id={"session-label"} text={"Session"}/>
                    <Container className={"increment-decrement-container"}>
                        <Decrement id={"session-decrement"}
                                   breakLength={breakLength}
                                   setBreakLength={setBreakLength}
                                   sessionLength={sessionLength}
                                   setSessionLength={setSessionLength}/>
                        <Length id={"session-length"} length={sessionLength}/>
                        <Increment id={"session-increment"}
                                   breakLength={breakLength}
                                   setBreakLength={setBreakLength}
                                   sessionLength={sessionLength}
                                   setSessionLength={setSessionLength}/>
                    </Container>
                </Container>
            </Container>
            <Container className={"timer-container"}>
                <Label id={"timer-label"} text={timerText}/>
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
