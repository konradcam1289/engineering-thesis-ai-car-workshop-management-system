import React from "react";
import { Route, Routes } from "react-router-dom";
import UserReservationsPage from "./components/UserReservationsPage";

import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";

import Home from "./components/Home";
import ServicesList from "./components/ServicesList";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import OAuth2RedirectHandler from "./components/auth/OAuth2RedirectHandler";
import About from "./components/public/About";

import ClientPanel from "./components/client/ClientPanel";
import UserReservations from "./components/client/UserReservation";
import NewReservation from "./components/client/NewReservation";
import SelectService from "./components/client/SelectService";
import Payment from "./components/payment/Payment";
import ClientProfile from "./components/client/ClientProfile";
import DiagnoseIssue from "./components/client/DiagnoseIssue";


import WorkerPanel from "./components/worker/WorkerPanel";
import WorkerStatusUpdate from "./components/worker/WrokerStatusUpdate";
import WorkerManageAppointments from "./components/worker/WorkerManageAppointments";
import ManageOrders from "./components/worker/ManageOrders";
import WorkerOrders from "./components/worker/WorkerOrders";
import EditOrder from "./components/worker/EditOrder";

import AdminPanel from "./components/admin/AdminPanel";
import ManageUsers from "./components/admin/ManageUsers";
import ManageServices from "./components/admin/ManageService";
import ManageAppointments from "./components/admin/ManageAppointments";
import Contact from "./components/public/Contact";
import InactiveUsers from "./components/admin/InactiveUsers";
import EditUser from "./components/admin/EditUser";
import AddUser from "./components/admin/AddUser";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <Navbar />
      <main className="flex-grow pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/oauth2/success" element={<OAuth2RedirectHandler />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/client/home" element={<ClientPanel />} />
          <Route path="/client/reservations" element={<UserReservations />} />
          <Route path="/client/new-reservation" element={<NewReservation />} />
          <Route path="/client/select-service" element={<SelectService />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/client/profile" element={<ClientProfile />} />
          <Route path="/client/diagnose" element={<DiagnoseIssue />} />



          <Route path="/worker/home" element={<WorkerPanel />} />
          <Route path="/worker/status-update" element={<WorkerStatusUpdate />} />
          <Route path="/worker/manage-appointments" element={<WorkerManageAppointments />} />
          <Route path="/worker/manage-orders" element={<ManageOrders />} />
          <Route path="/worker/orders" element={<WorkerOrders />} />
          <Route path="/worker/orders/edit/:id" element={<EditOrder />} />
          

          <Route path="/admin/home" element={<AdminPanel />} />
          <Route path="/admin/users" element={<ManageUsers />} /> {/* 👈 alias */}
          <Route path="/admin/manage-users" element={<ManageUsers />} /> {/* 👈 główna */}
          <Route path="/admin/services" element={<ManageServices />} />
          <Route path="/admin/appointments" element={<ManageAppointments />} />
          <Route path="/admin/users/:userId/reservations" element={<UserReservationsPage />} />
          <Route path="/admin/users/inactive" element={<InactiveUsers />} />
          <Route path="/admin/users/:id/edit" element={<EditUser />} />
          <Route path="/admin/add-user" element={<AddUser />} />
        </Routes>
      </main>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </div>
  );
};

export default App;
