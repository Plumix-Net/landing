import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./AppRoutes.tsx";

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
