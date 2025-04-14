// import "./App.css";
// import { FerryTerminal } from "./components/FerryTerminal.tsx";
import FerryTerminal from "./components/FerryTerminal";

function App() {
  return (
    <>
      <div className="peter-gao">
        <p className="text-center m-5 text-2xl font-bold">Hello there, this is Peter Gao :)</p>
        <p className="text-center m-5 text-2xl font-bold">Findex Dev test React</p>
        <p className="text-center m-5 text-lg">Instruction: Please put your name here, and remove the background color, to assist us with reviewing the project.</p>
      </div>
      <div className="solution">
        <FerryTerminal />
      </div>
    </>
  );
}

export default App;
