import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { getAll } from "./service/service";

interface Proc {
  pid: number;
  command: string;
  argument: string;
  start: Date;
  duration: string;
  userName: string;
  alive: boolean;
}

function App() {
  const [procs, setProcs] = useState(Array<Proc>);

  useEffect(() => {
    getAll()
      .then((ps) => setProcs(ps))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      <h1>{procs.length}</h1>
    </div>
  );
}

export default App;
