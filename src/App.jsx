import { Routes , Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Signup from "./pages/signup";
import NotFound from "./pages/notFound";

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
