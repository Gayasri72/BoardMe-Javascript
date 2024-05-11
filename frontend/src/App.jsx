import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Spaces } from "./pages/Spaces";

import { Events } from "./pages/Events";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";

import ContactUs from "./pages/ContactUs/ContactUs";

import Dashboard from "./pages/Dashboard";

import Search from "./pages/Search";

import About from "./pages/About";
import Packages from "./pages/Packages";
import Createadvertisement from "./pages/CreateAdvertisement";
import Services from "./pages/Service";

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/spaces" element={<Spaces />} />
        <Route path="/services" element={<Services />} />
        
        <Route path="/events" element={<Events />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/search" element={<Search />} />
        <Route path="/ContactUs" element={<ContactUs />} /> */}
        <Route element={<PrivateRoute />}>
          <Route path="/advertisments" element={<Createadvertisement />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
export default App;
