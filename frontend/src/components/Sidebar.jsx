import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-4 text-2xl fixed top-0 left-0 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* White Fullscreen Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`bg-gray-100 w-64 h-screen p-4 fixed top-0 left-0 z-50 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <h2 className="text-2xl font-bold mb-6">
          <Link to="/" onClick={() => setIsOpen(false)}>Dashboard</Link>
        </h2>

        <ul className="space-y-2">
          <li className="hover:bg-gray-200 p-2 rounded hover:font-bold">
            <Link to="/products" onClick={() => setIsOpen(false)}>Products</Link>
          </li>
          <li className="hover:bg-gray-200 p-2 rounded hover:font-bold">
            <Link to="/categories" onClick={() => setIsOpen(false)}>Categories</Link>
          </li>
          <li className="hover:bg-gray-200 p-2 rounded hover:font-bold">
            <Link to="/suppliers" onClick={() => setIsOpen(false)}>Suppliers</Link>
          </li>
          <li className="hover:bg-gray-200 p-2 rounded hover:font-bold">
            <Link to="/transactions" onClick={() => setIsOpen(false)}>Transactions</Link>
          </li>
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
