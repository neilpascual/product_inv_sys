import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3003/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const totalProducts = products.length;
  const totalQuantity = products.reduce((sum, p) => sum + p.pQuantity, 0);
  const totalValue = products.reduce(
    (sum, p) => sum + p.pQuantity * p.pPrice,
    0
  );

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />

      <main className="md:ml-64 p-4 md:p-6 w-full">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
          <div className="bg-white shadow rounded-xl p-4 md:p-6 text-center">
            <h2 className="text-lg md:text-xl font-semibold">Total Products</h2>
            <p className="text-2xl md:text-3xl font-bold text-blue-600">{totalProducts}</p>
          </div>
          <div className="bg-white shadow rounded-xl p-4 md:p-6 text-center">
            <h2 className="text-lg md:text-xl font-semibold">Total Quantity</h2>
            <p className="text-2xl md:text-3xl font-bold text-green-600">{totalQuantity}</p>
          </div>
          <div className="bg-white shadow rounded-xl p-4 md:p-6 text-center">
            <h2 className="text-lg md:text-xl font-semibold">Total Value</h2>
            <p className="text-2xl md:text-3xl font-bold text-amber-600">₱{totalValue}</p>
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-xl shadow p-4 md:p-6 overflow-x-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <h2 className="text-xl font-semibold">Recent Products</h2>
            <Link
              to="/products"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              View All
            </Link>
          </div>

          {products.length === 0 ? (
            <p>No products available</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                    <th className="px-4 py-2 text-left">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(-5).map((product) => (
                    <tr key={product.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{product.pName}</td>
                      <td className="px-4 py-2">{product.pQuantity}</td>
                      <td className="px-4 py-2">₱{product.pPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
