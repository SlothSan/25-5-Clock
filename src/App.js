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
import {useRef} from "react";

function App() {

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        return {
            total, seconds, minutes
        }
    }

    const startTimer = (e) => {
        let {total, seconds, minutes} = getTimeRemaining(e)
        if (total >= 0) {
            setTimeLeft((minutes > 9 ? minutes : '0' + minutes) + ':' +
                (seconds > 9 ? seconds : '0' + seconds))
        }
    }

    const clearTimer = (e) => {
        setTimeLeft(sessionLength)

        if(Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e)

        }, 1000)
        Ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date()

        deadline.setSeconds(deadline.getSeconds() + sessionLength * 60)
        return deadline
    }

  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [timerText, setTimerText] = useState('Session')
  const [sessionRunning, setSessionRunning] = useState(true);
  const [timeLeft, setTimeLeft] = useState("25:00")
  const Ref = useRef(null)

    useEffect(() => {
        clearTimer(getDeadTime())
    }, [])

    const onClickReset = () => {
        clearTimer(getDeadTime())
    }

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
                   timeLeft={timeLeft} setTimeLeft={setTimeLeft}/>
            <Container className={"controls-container"}>
                <StartStop id={"start_stop"}/>
                <Reset id={"reset"} onClick={onClickReset}/>
            </Container>
        </Container>
    </div>
  );
}

export default App;
