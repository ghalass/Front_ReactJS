import "./App.css";
// import * as bootstrap from "bootstrap/dist/js/bootstrap.bundle";

import { BrowserRouter as Router, Routes, Route } from "react-router";

import Home from "./pages/Home";
import Typeparcs from "./pages/Typeparcs";
import Sites from "./pages/sites/Sites";
import Details from "./pages/Details";
import Profile from "./pages/Profile";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <Header />

        <Sidebar />

        <Routes>
          <Route exact path="/" Component={Home} />

          <Route path="configs">
            <Route path="/configs/sites" Component={Sites} />
            <Route exact path="/configs/typeparcs" Component={Typeparcs} />
          </Route>

          <Route exact path="/details/:name" Component={Details} />
          <Route exact path="/details/profile" Component={Profile} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
