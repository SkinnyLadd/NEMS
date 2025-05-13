import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Layout } from "@/layout"
import Dashboard from "@/pages/Dashboard"
import Calendar from "@/pages/calender"
import Ticketing from "@/pages/ticketing"
import Login from "@/pages/Login"
import Signup from "@/pages/Signup"
import CreateEvent from "@/pages/CreateEvent"
import ManageEvents from "@/pages/ManageEvents"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Root path redirects to login */}
                <Route path="/" element={<Navigate to="/login" />} />

                {/* Protected Routes - no authentication check for testing */}
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/ticketing" element={<Ticketing />} />
                    <Route path="/events/create" element={<CreateEvent />} />
                    <Route path="/events/manage" element={<ManageEvents />} />
                </Route>

                {/* Redirect any unknown routes to login */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
