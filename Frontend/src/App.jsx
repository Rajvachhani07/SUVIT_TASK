// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProductList from "./pages/ProductList";
import PlaceOrder from "./pages/PlaceOrder";
import OrderHistory from "./pages/OrderHistory";
import VendorDashboard from "./pages/VendorDashboard";
import VendorList from "./pages/VendorList"; // if you still keep it
import RoleSelect from "./pages/RoleSelect";
import VendorSelect from "./pages/VendorSelect";
import VendorProductManager from "./pages/VendorProductManager";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<RoleSelect />} />
          <Route path="/select-vendor" element={<VendorSelect />} />
          <Route path="/vendor/products" element={<VendorProductManager />} />
          <Route path="/start" element={<ProductList />} />
          <Route path="/order/:productId" element={<PlaceOrder />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/vendors" element={<VendorList />} />
          <Route path="/vendor/:vendorId" element={<VendorDashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
