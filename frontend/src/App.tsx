import "./App.css";
//import "./styles/tailwind.css";
import { useEffect, useState } from "react";
//import Registration from "./components/SignUpPage";
//import SignUpContainer from "./src/components/SignUpContainer"
//import MuiThemeProvider from "@mui/material/styles/MuiThemeProvider";
import { ThemeProvider, createTheme } from "@mui/system";
//import SignUpContainer from "./components/SignUpContainer";
import RegistrationForm from "./components/SignUp";

function App() {
  interface apiObj {
    send: string;
  }

  const [data, setData] = useState<apiObj>({ send: "" });
  const [error, setError] = useState<any>("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/");
        const json = await response.json();
        setData({ send: "hello!" });
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <div>{data ? data.send : "No api call unfortunately "}</div>
      {/* RegistrationForm component can be added as a subroute with this acting as the landing home page with login and signup buttons */}
      {/* Add buttons that navigate to Login and Signup respectively
          can also add nav bar and about page towards the end*/}
      {/* <RegistrationForm /> */}/
    </div>
  );
}

export default App;
