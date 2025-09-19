import { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
  });

  // Load products from backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3003/");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3003/products", formData);
      setFormData({ name: "", price: "", stock: "" }); // clear form
      fetchProducts(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3003/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Products</h1>

      {/* Add Product Form */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 md:grid-cols-2"
        >
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
          >
            Add Product
          </button>
        </form>
      </div>

      {/* Product Table */}
      <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="text-center">
                <td className="p-2 border">{p.id}</td>
                <td className="p-2 border">{p.pName}</td>
                <td className="p-2 border">{p.pDesc}</td>
                <td className="p-2 border">PHP{p.pPrice}</td>
                <td className="p-2 border">{p.pQuantity}</td>
                <td className="p-2 border">
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
