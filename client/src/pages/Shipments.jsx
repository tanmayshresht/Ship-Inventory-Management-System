import { useEffect, useState } from "react";
import axios from "axios";

function Shipments() {
  const [shipments, setShipments] = useState([]);

  const [ships, setShips] = useState([]);
const [ports, setPorts] = useState([]);
const [inventory, setInventory] = useState([]);

const [form, setForm] = useState({
  ship: "",
  sourcePort: "",
  destinationPort: "",
  inventoryItem: "",
  quantity: "",
  status: "Pending",
});

const fetchShipments = async () => {
  try {
    const res = await axios.get(
      "https://ship-inventory-management-system.onrender.com/api/shipments",
    );

    setShipments(res.data.shipments);

  } catch (err) {
    console.log(err);
  }
};

const fetchShips = async () => {
  try {

    const token = localStorage.getItem("token");

    const res = await axios.get(
      "https://ship-inventory-management-system.onrender.com/api/ships",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setShips(res.data.ships);

  } catch (err) {
    console.log(err);
  }
};

const fetchPorts = async () => {
  try {

    const res = await axios.get(
      "https://ship-inventory-management-system.onrender.com/api/ports",
    );

    setPorts(res.data.ports);

  } catch (err) {
    console.log(err);
  }
};

const fetchInventory = async () => {
  try {

    const res = await axios.get(
      "https://ship-inventory-management-system.onrender.com/api/inventory",
    );

    setInventory(res.data.inventory);

  } catch (err) {
    console.log(err);
  }
};
  useEffect(() => {
    fetchShipments();
  fetchShips();
  fetchPorts();
  fetchInventory();
}, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        Shipment Management
      </h1>

      <div className="bg-white shadow rounded-lg p-6 mb-6">

  <h2 className="text-2xl font-semibold mb-4">
    Create Shipment
  </h2>

  <div className="grid grid-cols-2 gap-4">

    <select
      value={form.ship}
      onChange={(e) =>
        setForm({ ...form, ship: e.target.value })
      }
      className="border p-3 rounded"
    >
      <option value="">Select Ship</option>

      {ships.map((ship) => (
        <option key={ship._id} value={ship._id}>
          {ship.shipName}
        </option>
      ))}
    </select>

    <select
      value={form.sourcePort}
      onChange={(e) =>
        setForm({ ...form, sourcePort: e.target.value })
      }
      className="border p-3 rounded"
    >
      <option value="">Source Port</option>

      {ports.map((port) => (
        <option key={port._id} value={port._id}>
          {port.portName}
        </option>
      ))}
    </select>

    <select
      value={form.destinationPort}
      onChange={(e) =>
        setForm({ ...form, destinationPort: e.target.value })
      }
      className="border p-3 rounded"
    >
      <option value="">Destination Port</option>

      {ports.map((port) => (
        <option key={port._id} value={port._id}>
          {port.portName}
        </option>
      ))}
    </select>

    <select
      value={form.inventoryItem}
      onChange={(e) =>
        setForm({ ...form, inventoryItem: e.target.value })
      }
      className="border p-3 rounded"
    >
      <option value="">Inventory Item</option>

      {inventory.map((item) => (
        <option key={item._id} value={item._id}>
          {item.itemName}
        </option>
      ))}
    </select>

    <input
      type="number"
      placeholder="Quantity"
      value={form.quantity}
      onChange={(e) =>
        setForm({ ...form, quantity: e.target.value })
      }
      className="border p-3 rounded"
    />

    <select
      value={form.status}
      onChange={(e) =>
        setForm({ ...form, status: e.target.value })
      }
      className="border p-3 rounded"
    >
      <option>Pending</option>
      <option>In Transit</option>
      <option>Delivered</option>
    </select>

  </div>

  <button
    className="mt-5 w-full bg-blue-700 text-white py-3 rounded"
  >
    Create Shipment
  </button>

  </div>

      <table className="w-full bg-white shadow rounded-lg">

        <thead className="bg-blue-700 text-white">

          <tr>
            <th className="p-3">Ship</th>
            <th className="p-3">Source</th>
            <th className="p-3">Destination</th>
            <th className="p-3">Inventory</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Status</th>
          </tr>

        </thead>

        <tbody>

          {shipments.map((shipment) => (

            <tr
              key={shipment._id}
              className="border-b text-center"
            >
              <td>{shipment.ship.shipName}</td>
              <td>{shipment.sourcePort.portName}</td>
              <td>{shipment.destinationPort.portName}</td>
              <td>{shipment.inventoryItem.itemName}</td>
              <td>{shipment.quantity}</td>
              <td>{shipment.status}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Shipments;