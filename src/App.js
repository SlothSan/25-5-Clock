import './App.css';
import Container from "./Components/Container/Container";

function App() {
  return (
    <div className="App">
      <h1 className={"clock-title"}>25 + 5 Clock</h1>
        <Container className={"settings-container"}>
          <Container className={"break-settings-container"}></Container>
          <Container className={"session-settings-container"}></Container>
        </Container>
    </div>
  );
}

export default App;
