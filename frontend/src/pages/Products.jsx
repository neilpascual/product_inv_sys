import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Products() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:3003/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  };

  // Validation schema
  const ProductSchema = Yup.object().shape({
    pName: Yup.string().required("Product name is required"),
    pDesc: Yup.string().required("Description is required"),
    pQuantity: Yup.number()
      .required("Quantity is required")
      .positive("Must be positive")
      .integer("Must be an integer"),
    pPrice: Yup.number()
      .required("Price is required")
      .positive("Must be greater than 0"),
  });

  // Handle add or update submit
  const handleSubmit = (values, { resetForm }) => {
    if (editingProduct) {
      // update
      axios
        .put(`http://localhost:3003/${editingProduct.id}`, values)
        .then(() => {
          fetchProducts();
          resetForm();
          setShowForm(false);
          setEditingProduct(null);
        })
        .catch((err) => console.error(err));
    } else {
      // add
      axios
        .post("http://localhost:3003/products", values)
        .then(() => {
          fetchProducts();
          resetForm();
          setShowForm(false);
        })
        .catch((err) => console.error(err));
    }
  };

  // Handle edit button
  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  // Handle delete button
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios
        .delete(`http://localhost:3003/${id}`)
        .then(() => fetchProducts())
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <main className="ml-64 p-6 w-full">
        <div className="flex justify-between mb-3">
          <h1 className="text-3xl font-bold mb-6">Products</h1>
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowForm(!showForm);
            }}
            className="bg-green-500 px-3 py-1 rounded-2xl text-white font-medium"
          >
            {showForm ? "Close" : "Add Product"}
          </button>
        </div>

        {/* Add / Edit Product Form */}
        {showForm && (
          <Formik
            initialValues={{
              pName: editingProduct?.pName || "",
              pDesc: editingProduct?.pDesc || "",
              pQuantity: editingProduct?.pQuantity || "",
              pPrice: editingProduct?.pPrice || "",
            }}
            enableReinitialize
            validationSchema={ProductSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="bg-gray-100 p-4 rounded-2xl mb-6 shadow">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Field
                      type="text"
                      name="pName"
                      placeholder="Product Name"
                      className="border p-2 rounded w-full"
                    />
                    <ErrorMessage
                      name="pName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <Field
                      type="text"
                      name="pDesc"
                      placeholder="Description"
                      className="border p-2 rounded w-full"
                    />
                    <ErrorMessage
                      name="pDesc"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <Field
                      type="number"
                      name="pQuantity"
                      placeholder="Quantity"
                      className="border p-2 rounded w-full"
                    />
                    <ErrorMessage
                      name="pQuantity"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <Field
                      type="number"
                      name="pPrice"
                      placeholder="Price"
                      className="border p-2 rounded w-full"
                    />
                    <ErrorMessage
                      name="pPrice"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  {isSubmitting
                    ? "Saving..."
                    : editingProduct
                    ? "Update Product"
                    : "Add Product"}
                </button>
              </Form>
            )}
          </Formik>
        )}

        {/* Product Table */}
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
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2">{product.id}</td>
                    <td className="px-4 py-2">{product.pName}</td>
                    <td className="px-4 py-2">{product.pDesc}</td>
                    <td className="px-4 py-2">{product.pQuantity}</td>
                    <td className="px-4 py-2">₱{product.pPrice}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-yellow-400 px-2 py-1 rounded-2xl text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500 px-2 py-1 rounded-2xl text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}

export default Products;
