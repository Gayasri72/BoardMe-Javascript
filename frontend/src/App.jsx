import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Spaces } from "./pages/Spaces";
import { Services } from "./pages/Services";
import EventList from "./pages/Events";
import { Packages } from "./pages/Packages";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PrivateRoute from './components/PrivateRoute';

import ContactUs from "./pages/ContactUs/ContactUs";


import Dashboard from './pages/Dashboard'
import About from "./pages/About";
import EventCreate from "./pages/EventCreate";
import EventHome from "./pages/EventHome";
import EventRequestList from "./pages/EventRequest";

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/aboutus" element={<About/>} />
        <Route path="/spaces" element={<Spaces />} />
        <Route path="/services" element={<Services />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/event-home" element={<EventHome />} />
        <Route path="/create-event" element={<EventCreate />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/manage" element={<EventRequestList />} />

        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
          
        </Route>

      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
export default App;