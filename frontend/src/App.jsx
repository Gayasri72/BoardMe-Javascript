import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Spaces } from "./pages/Spaces";
import { Services } from "./pages/Services";
import { Events } from "./pages/Events";
import { Packages } from "./pages/Packages";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PrivateRoute from './components/PrivateRoute';
import Profile from "./pages/Profile";
import ContactUs from "./pages/ContactUs/ContactUs";
import ContactList from "./pages/ContactUs/ContactList";


export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path="/spaces" element={<Spaces />} />
        <Route path="/services" element={<Services />} />
        <Route path="/events" element={<Events />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/ContactList" element={<ContactList />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
export default App;