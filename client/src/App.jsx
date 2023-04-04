import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import Login from "./components/Login";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
