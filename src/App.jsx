import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import "./App.css";
import { AuthContextProvider } from "./context";

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
