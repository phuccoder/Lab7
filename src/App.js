import "./App.css";

import NavigationBar from "./component/Navigation";
import { Routes } from "react-router-dom";
import Home from "./component/Home";
import Detail from "./component/Detail";
import Dashboard from "./component/DashBoard";
import Footer from "./component/Footer";
import Login from "./component/Login";
import Contact from "./component/Contact";
import Add from "./component/AddActor";
import Update from "./component/UpdateActor";
import { Route } from "react-router-dom";

function App() {
  return (
    <div>
      <NavigationBar />

      <Routes>
        <Route path="/" element={<Login />}></Route>

        <Route path="/home" element={<Home />}></Route>

        <Route path="/home/detail/:id" element={<Detail />}></Route>

        <Route path="/dashboard" element={<Dashboard />}></Route>

        <Route path="/contact" element={<Contact />}></Route>

        <Route path="/add" element={<Add />}></Route>

        <Route path="/update/:id" element={<Update />}></Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
