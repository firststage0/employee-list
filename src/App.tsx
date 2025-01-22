import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "@/pages/Home/Home";
import EmployeeDetail from "@/pages/EmployeeDetail/EmployeeDetail";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Home />} />
                <Route path="/employee/:id" element={<EmployeeDetail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
