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
import Horse from "./components/Horse/Horse";

function AppContent() {
  const token = localStorage.getItem("jawadToken");

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={token ? <Stable /> : <Login />} />
        <Route path="/stable" element={token ? <Stable /> : <Login />} />
        <Route path="/photo" element={token ? <PhotoGrapher /> : <Login />} />
        <Route path="/add-horse" element={token ? <Horse /> : <Login />} />
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
