import './App.css';
import Container from "./Components/Container/Container";
import Label from "./Components/Label/Label";

function App() {
  return (
    <div className="App">
      <h1 className={"clock-title"}>25 + 5 Clock</h1>
        <Container className={"settings-container"}>
          <Container className={"break-settings-container"}>
            <Label id={"break-label"} text={"Break"}/>
          </Container>
          <Container className={"session-settings-container"}>
            <Label id={"session-label"} text={"Session"}/>
          </Container>
        </Container>
    </div>
  );
}

export default App;
