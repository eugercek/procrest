import { useState, useEffect } from "react";
import TopBar from "./TopBar";
import Live from "./Live";
import Snapshot from "./Snapshot";

function App() {
  const [isLive, setIsLive] = useState(true);

  const style = {
    margin: "10px",
  };

  return (
    <div>
      <TopBar live={() => setIsLive(true)} snapshot={() => setIsLive(false)} />
      <div style={style}>{isLive ? <Live /> : <Snapshot />}</div>
    </div>
  );
}

export default App;
