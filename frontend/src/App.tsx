import './App.css'
import { useEffect, useState } from "react";

function App() {

  interface apiObj {
    send: string;
  }

  const [data, setData] = useState<apiObj>({ send: "" });
  const [error, setError] = useState<any>("")


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/");
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, [])
  return (
    <div className="App">
      {data ? data.send : "No api call unfortunately "}
    </div>
  )
}

export default App
