import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Ships from "./pages/Ships";
import AddShip from "./pages/AddShip";
import Ports from "./pages/Ports";
import Inventory from "./pages/Inventory";
import Shipments from "./pages/Shipments";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ships" element={<Ships />} />
        <Route path="/add-ship" element={<AddShip />} />
        <Route path="/ports" element={<Ports />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/shipments" element={<Shipments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;