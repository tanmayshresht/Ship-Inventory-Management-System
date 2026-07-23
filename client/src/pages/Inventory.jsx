import { useEffect, useState } from "react";
import axios from "axios";

function Inventory() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {

const res = await axios.get(
  'http://localhost:5000/api/inventory',
);

        setInventory(res.data.inventory);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        Inventory Management
      </h1>

      <table className="w-full bg-white shadow rounded-lg">

        <thead className="bg-blue-700 text-white">

          <tr>
            <th className="p-3">SKU</th>
            <th className="p-3">Item Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Unit</th>
          </tr>

        </thead>

        <tbody>

          {inventory.map((item) => (

            <tr
              key={item._id}
              className="border-b text-center"
            >
              <td className="p-3">{item.sku}</td>
              <td>{item.itemName}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>{item.unit}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Inventory;