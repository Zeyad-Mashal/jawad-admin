import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Stable from "./components/AddStable/Stable";
import Navbar from "./components/Navbar/Navbar";
import PhotoGrapher from "./components/AddPhotoGrapher/PhotoGrapher";

function AppContent() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/stable" element={<Stable />} />
        <Route path="/photo" element={<PhotoGrapher />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
