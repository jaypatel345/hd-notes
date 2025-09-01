import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/signin";
import Dashboard from "./pages/dashboard";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user, signout } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route
        path="/dashboard"
        element={
          user ? (
            <Dashboard user={user} onSignOut={signout} />
          ) : (
            <Navigate to="/signin" />
          )
        }
      />
    </Routes>
  );
}

export default App;
