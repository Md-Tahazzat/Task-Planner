import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import AllTask from "../Pages/AllTask";
import AddTask from "../Pages/AddTask";

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
    ],
  },
]);

export default router;
