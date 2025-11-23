// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProductList from "./pages/ProductList";
import PlaceOrder from "./pages/PlaceOrder";
import OrderHistory from "./pages/OrderHistory";
import VendorDashboard from "./pages/VendorDashboard";
import VendorList from "./pages/VendorList";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ProductList />} />
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
