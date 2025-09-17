import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="bg-gray-100 w-64 h-screen p-4 fixed left-0 top-0">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <ul className="space-y-2">
        <li className="hover:bg-gray-200 p-2 rounded hover:font-bold">
        <Link to="/products">Products</Link>
        </li>
        <li className="hover:bg-gray-200 p-2 rounded hover:font-bold">
        <Link to="/categories">Categories</Link>
        </li>
        <li className="hover:bg-gray-200 p-2 rounded hover:font-bold">
        <Link to="/suppliers">Suppliers</Link>
        </li>
        <li className="hover:bg-gray-200 p-2 rounded hover:font-bold">
        <Link to="/transactions">Transactions</Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
