import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import AllTask from "../Pages/AllTask";
import AddTask from "../Pages/AddTask";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <AllTask></AllTask>,
      },
      {
        path: "add-task",
        element: <AddTask></AddTask>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;
