import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ProtectedRoutes from "./components/ProtectedRoutes.jsx"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import HomePage from "./pages/Homepage"
import ProductDetail from "./pages/ProductDetail"
import CartPage from "./pages/CartPage.jsx"
//import { CartProvider } from "./context/CartContext.jsx"
import AdminLogin from "./pages/AdminLogin.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx"
import { AuthProvider } from "./context/AuthContext.jsx"

function App() {

  return (
      <Router>
        <div className="flex flex-col min-h-screen">
          <AuthProvider>
            <NavBar />
            <main className="flex-grow">
              <Routes>
                <Route 
                  path="/"
                  element = {<HomePage />} 
                />
                <Route
                  path="/products/:productId"
                  element={<ProductDetail />} 
                />
                <Route 
                  path="/cart"
                  element = {<CartPage />}
                />
                <Route
                  path="/hidden-login"
                  element = {<AdminLogin />} 
                />
                <Route 
                  path="/admin"
                  element = {
                    <ProtectedRoutes allowedRoles={["Admin", "Owner"]}>
                      <AdminDashboard />
                    </ProtectedRoutes>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </AuthProvider>
        </div>
      </Router>
  )
}

export default App
