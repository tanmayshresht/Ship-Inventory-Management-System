import { useEffect, useState } from "react";
import axios from "axios";

function Ports() {
  const [ports, setPorts] = useState([]);

  const fetchPorts = async () => {
    console.log("Fetching Ports...");
    try {

const res = await axios.get(
  'http://localhost:5000/api/ports',
);
     
      console.log(res.data);

      setPorts(res.data.ports);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPorts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        Port Management
      </h1>

      <table className="w-full bg-white shadow rounded-lg">

        <thead className="bg-blue-700 text-white">

          <tr>
            <th className="p-3">Port Name</th>
            <th className="p-3">Country</th>
            <th className="p-3">Code</th>
            <th className="p-3">Status</th>
          </tr>

        </thead>

        <tbody>

          {ports.map((port) => (

            <tr
              key={port._id}
              className="border-b text-center"
            >
              <td className="p-3">{port.portName}</td>
              <td>{port.country}</td>
              <td>{port.code}</td>
              <td>{port.status}</td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Ports;