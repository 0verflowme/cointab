
import NavBar from "./components/Navbar"
import { Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Home from "./components/Home"
import Signup from "./components/Signup"
import Dashboard from "./components/Dashboard"
import { Toaster } from "react-hot-toast"
import { Navigate } from "react-router-dom"
function App() {

  const { Authorization } = localStorage;
  const ProtectedRoute = ({ children }) => {
    if (!Authorization || Authorization.length == 16) {
      return <Navigate to="/login" />;
    }
    return children
  };

  return (
    <div className="App">
      <Toaster />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App
