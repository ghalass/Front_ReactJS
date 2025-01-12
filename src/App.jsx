import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router";

import Home from "./pages/Home";
import Typeparcs from "./pages/Typeparcs";
import Sites from "./pages/sites/Sites";
import Details from "./pages/Details";
import Profile from "./pages/Profile";

import Login from "./pages/auth/Login";
import MainLayout from "./layouts/MainLayout";

import Footer from "./components/Footer";

function App() {
  return (
    <>
      {/* <Router>
        <Routes>
          <Route exact path="/login" Component={Login} />

          <Route Component={MainLayout}>
            <Route exact path="/" Component={Home} />

            <Route path="configs">
              <Route path="/configs/sites" Component={Sites} />
              <Route exact path="/configs/typeparcs" Component={Typeparcs} />
            </Route>

            <Route exact path="/details/:name" Component={Details} />
            <Route exact path="/details/profile" Component={Profile} />
          </Route>
        </Routes>

        <Footer />
      </Router> */}
    </>
  );
}

export default App;
