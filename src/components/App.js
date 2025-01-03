import { Register } from "./Register";
import { Login } from "./Login";
import { Admin } from "./Admin/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          {/* <Register /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          {/* <Login /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;


