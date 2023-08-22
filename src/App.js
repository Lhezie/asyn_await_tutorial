import { useState, useEffect } from "react";

export default function App() {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);
  const [adviceOnclick, setAdviceonclick] = useState("");

  async function getAdviceonclick() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    console.log(data);
    setAdviceonclick(data.slip.advice);
    setCount((c) => c + 1);
  }

  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    console.log(data);
    setAdvice(data.slip.advice);
  }

  useEffect(() => {
    getAdvice();

    // change advice after two seconds
    const interval = setInterval(getAdvice, 2000);

    // clear interval
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>Hi Friends</h1>
      <h2>{adviceOnclick}</h2>
      <hr />
      {!adviceOnclick ? null : (
        <h2>
          You have viewed<strong> {count} advice(s)</strong>
        </h2>
      )}
      <h2>{advice}</h2>

      <button onClick={getAdviceonclick}>Get Advice</button>
    </div>
  );
}
