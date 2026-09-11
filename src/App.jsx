import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Medicines from "./pages/Medicines/Medicines";
import AddMedicine from "./pages/AddMedicine/AddMedicine";
import UploadPrescription from "./pages/UploadPrescripition/UploadPrescription";
import PrescriptionReview from "./pages/PrescriptionReview/PrescriptionReview";
import Calendar from "./pages/Calendar/Calendar";
import History from "./pages/History/History";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/add-medicine" element={<AddMedicine />} />
        <Route path="/upload-prescription" element={<UploadPrescription />} />
        <Route path="/prescription-review" element={<PrescriptionReview />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
