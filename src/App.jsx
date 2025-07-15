import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Introduction from "./pages/Introduction";
import Functions from "./pages/Functions";
import Reviews from "./pages/Reviews";
import Support from "./pages/Support";
import Afterburner from "./pages/Afterburner";
import AttendancePage from "./pages/attendance";
import RecruitmentPage from "./pages/recruitment";
import ProjectLogPage from "./pages/project-log";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/functions" element={<Functions />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/support" element={<Support />} />
        <Route path="/afterburner" element={<Afterburner />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/recruitment" element={<RecruitmentPage />} />
        <Route path="/project-log" element={<ProjectLogPage />} />
      </Routes>
    </Router>
  );
}

export default App;
