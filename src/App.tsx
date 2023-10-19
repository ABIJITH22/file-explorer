import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";

import "bootstrap/dist/css/bootstrap.css";


import FileList from "./components/FileList";

//Layout
import AppLayout from "./Layout/AppLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<div></div>} />
      <Route path="List" element={<FileList/>} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
