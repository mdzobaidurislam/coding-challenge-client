import Task from "./components/Task/Task";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import EditTask from "./components/Task/EditTask";
import Login from "./components/Form/Login";
import Register from "./components/Form/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequireAdmin from "./components/RequireAuth/RequireAdmin";
import Layout from "./components/Layout/Layout";
import AllTask from "./components/Task/AllTask";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAdmin>
              <Layout />
            </RequireAdmin>
          }
        >
          <Route path="/" element={<AllTask />} />
          <Route path="/task" element={<Task />} />
          <Route path="/task/:id" element={<EditTask />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer limit={1} />
    </>
  );
}

export default App;
