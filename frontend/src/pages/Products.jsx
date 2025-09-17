import { useState, useEffect } from "react";
import axios from 'axios';
import Sidebar from "../components/Sidebar";

function Products() {
    const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3003/') 
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
        <div className="flex">
        <Sidebar />

      <main className="ml-64 p-6 w-full">
        <div className="flex justify-between mb-3">
          <h1 className="text-3xl font-bold mb-6 m-y-0">Products</h1>
          <button className="bg-green-500 px-3 rounded-2xl text-white font-medium">Add product</button>
        </div>
  
        <div className="bg-white rounded-2xl shadow-xl p-4">
          {products.length === 0 ? (
            <p>No products found</p>
          ) : (
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{product.id}</td>
                    <td className="px-4 py-2">{product.pName}</td>
                    <td className="px-4 py-2">{product.pDesc}</td>
                    <td className="px-4 py-2">{product.pQuantity}</td>
                    <td className="px-4 py-2">₱{product.pPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  )
}

export default Products