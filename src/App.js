import './App.css';
import Container from "./Components/Container/Container";
import Label from "./Components/Label/Label";
import {useEffect, useState} from "react";
import Decrement from "./Components/Decrement/Decrement";
import Length from "./Components/Length/Length";
import Increment from "./Components/Increment/Increment";
import Timer from "./Components/Timer/Timer";
import StartStop from "./Components/StartStop/StartStop";
import Reset from "./Components/Reset/Reset";

function App() {

    const [breakLength, setBreakLength] = useState(5)
    const [sessionLength, setSessionLength] = useState(25)
    const [timerText, setTimerText] = useState('Session')
    const [isTimerRunning, setIsTimerRunning] = useState(false)
    const [workTime, setWorkTime] = useState(true)
    const [intClock, setIntClock] = useState(sessionLength * 60);

    const handleStartStop = () => {
        setIsTimerRunning(!isTimerRunning)
    }

    const runTimer = () => {
        return setInterval(() => {
            if (intClock === 0) {
                //TODO Add alarm here!
                if (workTime) {
                    setIntClock(breakLength * 60)
                    setWorkTime(false)
                } else {
                    setIntClock(sessionLength * 60)
                    setWorkTime(true)
                }
            }
            let time = intClock
            setIntClock(time - 1)
        }, 1000)
    }

    const calcDisplayTime = () => {
        let newMin = String(Math.floor(intClock / 60))
        let newSec = String(intClock % 60)

        if (newMin.length === 1) newMin = '0' + newMin
        if (newSec.length === 1) newSec = '0' + newSec

        return newMin + ':' + newSec
    }

    useEffect(() => {
        let interval;
        if (isTimerRunning) {
            interval = setInterval(() => {
                setIntClock((prevIntClock) => prevIntClock - 1)
            }, 1000)
        } else if (!isTimerRunning) {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [isTimerRunning])

    useEffect(() => {
        if (workTime) {
            setIntClock(sessionLength * 60)
        } else {
            setIntClock(breakLength * 60)
        }

    }, [workTime])

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
                    <Reset id={"reset"}/>
                </Container>
            </Container>
        </div>
    );
}

export default App;
