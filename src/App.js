import './App.css';
import Container from "./Components/Container/Container";
import Label from "./Components/Label/Label";
import {useState} from "react";
import Decrement from "./Components/Decrement/Decrement";
import Length from "./Components/Length/Length";
import Increment from "./Components/Increment/Increment";

function App() {

  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [timerText, setTimerText] = useState('Session')



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
        </Container>
    </div>
  );
}

export default App;
