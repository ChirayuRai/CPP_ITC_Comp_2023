import './App.css'
import { useEffect, useState } from "react";

function App() {

  const [data, setData] = useState<Object>({});
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
