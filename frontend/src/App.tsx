// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/signin";
// import Signin from "./pages/Signin";
// import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      {/* <Route path="/signin" element={<Signin />} />
      <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default App;