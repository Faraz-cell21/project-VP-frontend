import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import HomePage from "./pages/Homepage"
import ProductDetail from "./pages/ProductDetail"
import CartPage from "./pages/CartPage.jsx"

function App() {

  return (
      <Router>
        <div className="flex flex-col min-h-screen">
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
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
  )
}

export default App
