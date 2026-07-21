import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ShipForm({
  editingShip,
  setEditingShip,
  fetchShips,
}) {
  const [formData, setFormData] = useState({
    shipName: "",
    imoNumber: "",
    shipType: "",
    capacity: "",
    status: "Available",
    location: "",
  });

   useEffect(() => {
  if (!editingShip) return;

   Promise.resolve().then(() => {
    setFormData({
      shipName: editingShip.shipName || "",
      imoNumber: editingShip.imoNumber || "",
      shipType: editingShip.shipType || "",
      capacity: editingShip.capacity || "",
      status: editingShip.status || "Available",
      location: editingShip.location || "",
    });
  });
}, [editingShip]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      shipName: "",
      imoNumber: "",
      shipType: "",
      capacity: "",
      status: "Available",
      location: "",
    });

    setEditingShip(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (editingShip) {
        await axios.put(
          `https://ship-inventory-management-system.onrender.com/api/ships/${editingShip._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Ship Updated Successfully");
      } else {
        await axios.post(
          "https://ship-inventory-management-system.onrender.com/api/ships",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Ship Added Successfully");
      }

      resetForm();

      fetchShips();

    } catch (error) {
      toast.error(error.response?.data?.message || "Operation Failed");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

      <h2 className="text-2xl font-bold mb-6">
        {editingShip ? "Update Ship" : "Add New Ship"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >

        <input
          type="text"
          name="shipName"
          placeholder="Ship Name"
          value={formData.shipName}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="imoNumber"
          placeholder="IMO Number"
          value={formData.imoNumber}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="shipType"
          placeholder="Ship Type"
          value={formData.shipType}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        >
          <option value="Available">Available</option>
          <option value="Maintenance">Maintenance</option>
        </select>

        <button
          type="submit"
          className="col-span-2 bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-900"
        >
          {editingShip ? "Update Ship" : "Add Ship"}
        </button>

        {editingShip && (
          <button
            type="button"
            onClick={resetForm}
            className="col-span-2 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-700"
          >
            Cancel
          </button>
        )}

      </form>

    </div>
  );
}

export default ShipForm;