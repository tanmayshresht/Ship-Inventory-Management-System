/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import ShipForm from "../components/ShipForm";
import { toast } from "react-toastify";

function Dashboard() {
  const [ships, setShips] = useState([]);
  const [editingShip, setEditingShip] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
const [sortBy, setSortBy] = useState("name");

const navigate = useNavigate();
  const shipsPerPage = 5;

  const availableShips = ships.filter(
    (ship) => ship.status === "Available"
  ).length;

  const maintenanceShips = ships.filter(
    (ship) => ship.status === "Maintenance"
  ).length;

  const filteredShips = ships.filter(
    (ship) =>
      ship.shipName.toLowerCase().includes(search.toLowerCase()) ||
      ship.imoNumber.toLowerCase().includes(search.toLowerCase())
  );
  const indexOfLastShip = currentPage * shipsPerPage;

const indexOfFirstShip = indexOfLastShip - shipsPerPage;

const sortedShips=[...filteredShips];

if(sortBy==="name"){

sortedShips.sort((a,b)=>

a.shipName.localeCompare(b.shipName)

);

}

if(sortBy==="capacity"){

sortedShips.sort((a,b)=>

a.capacity-b.capacity

);

}

if(sortBy==="status"){

sortedShips.sort((a,b)=>

a.status.localeCompare(b.status)

);

}

const currentShips = sortedShips.slice(
  indexOfFirstShip,
  indexOfLastShip
);

const totalPages = Math.ceil(
  filteredShips.length / shipsPerPage
);
  const fetchShips = async () => {
  try {
    setLoading(true);

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

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchShips();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
  title: "Delete Ship?",
  text: "You won't be able to recover this ship!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#d33",
  cancelButtonColor: "#3085d6",
  confirmButtonText: "Yes, Delete",
});

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://ship-inventory-management-system.onrender.com/api/ships/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShips((prevShips) =>
        prevShips.filter((ship) => ship._id !== id)
      );

      toast.success("Ship deleted successfully");
    } catch (error) {
      toast.error(
  error.response?.data?.message || "Delete Failed"
);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-900 text-white p-5 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">
          🚢 Ship Inventory Dashboard
        </h1>
    <div className="flex gap-3">
      <button
       onClick={fetchShips}
       className="bg-green-600 px-4 py-2 rounded-lg mr-3"
>
      Refresh
      </button>

        <button 
        onClick={()=>{
        localStorage.removeItem("token");
        navigate("/");
        }}
        className="bg-red-500 px-4 py-2 rounded-lg"
         >
          Logout
        </button>
        </div>
      </nav>

      <div className="p-8">

        <ShipForm
          editingShip={editingShip}
          setEditingShip={setEditingShip}
          fetchShips={fetchShips}
        />

        <h2 className="text-3xl font-bold mb-8">
          Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-500">Total Ships</h3>
            <p className="text-4xl font-bold text-blue-700 mt-3">
              {ships.length}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-500">Available</h3>
            <p className="text-4xl font-bold text-green-600 mt-3">
              {availableShips}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-gray-500">Maintenance</h3>
            <p className="text-4xl font-bold text-red-500 mt-3">
              {maintenanceShips}
            </p>
          </div>

        </div>

        <div className="mt-10 bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold mb-4">
            Ships List
          </h2>
        <div className="flex flex-col md:flex-row gap-4 mb-5">
          <input
            type="text"
            placeholder="Search by Ship Name or IMO Number..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            setCurrentPage(1);
          }}
            className="w-full border border-gray-300 rounded-lg p-3 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select

           value={sortBy}

           onChange={(e)=>setSortBy(e.target.value)}

           className="border p-2 rounded mb-4"

>

           <option value="name">Sort by Name</option>

           <option value="capacity">Sort by Capacity</option>

           <option value="status">Sort by Status</option>

           </select>
           </div>
           {loading ? (

  <div className="text-center py-5 text-blue-700 font-bold">
    Loading Ships...
  </div>

) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">

            <thead>
              <tr className="bg-blue-700 text-white">
                <th className="p-3">Ship Name</th>
                <th className="p-3">IMO Number</th>
                <th className="p-3">Type</th>
                <th className="p-3">Capacity</th>
                <th className="p-3">Status</th>
                <th className="p-3">Location</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentShips.length > 0 ? (
                currentShips.map((ship) => (
                  <tr
                    key={ship._id}
                    className="border-b hover:bg-gray-100 text-center"
                  >
                    <td className="p-3">{ship.shipName}</td>
                    <td className="p-3">{ship.imoNumber}</td>
                    <td className="p-3">{ship.shipType}</td>
                    <td className="p-3">{ship.capacity}</td>
                    <td className="p-3">

                   <span
                   className={`px-3 py-1 rounded-full text-white ${
                   ship.status==="Available"
                   ?
                   "bg-green-500"
                   :
                   "bg-red-500"
                   }`}
                  >

                  {ship.status}

                  </span>

                  </td>

                    <td className="p-3">{ship.location}</td>

                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => setEditingShip(ship)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(ship._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="p-6 text-center text-gray-500"
                  >
                    No ships found.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
          </div>
)}
<div className="flex justify-center items-center gap-4 mt-6">
  <button
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1}
    className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
  >
    Previous
  </button>

  <span className="font-semibold">
    Page {currentPage} of {totalPages}
  </span>

  <button
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={currentPage === totalPages}
    className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
  >
    Next
  </button>
  </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard; 