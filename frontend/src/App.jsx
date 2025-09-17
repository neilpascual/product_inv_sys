import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './pages/Products';
import Sidebar from './components/Sidebar';
import AddProduct from './pages/AddProduct';

export default function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />

        <main className="ml-6 p-6 w-full">
          <Routes>
            <Route path="/products" element={<Products />} />
            <Route path="/dashboard" element={<AddProduct />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
