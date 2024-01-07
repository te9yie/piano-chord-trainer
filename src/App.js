import "./App.css";
import Keyboard from "./Keyboard";

function App() {
  const chord_str = "Am";

  return (
    <div className="App">
      <header className="App-header">
        <div id="chord">{chord_str}</div>
        <Keyboard chord={chord_str} />
      </header>
    </div>
  );
}

export default App;
