import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Ships from "./pages/Ships";
import AddShip from "./pages/AddShip";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ships" element={<Ships />} />
        <Route path="/add-ship" element={<AddShip />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;