
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "@/layout.tsx"
import Dashboard from "@/pages/Dashboard"
import Calendar from "@/pages/calender.tsx"
import Ticketing from "@/pages/ticketing.tsx"
//import Users from "@/pages/Users"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/ticketing" element={<Ticketing />} />
                    // add for users here if we make a page in fututre

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
