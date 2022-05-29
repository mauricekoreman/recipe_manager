import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Homepage from "./pages/homepage/homepage.component";
import LoginPage from "./pages/auth/loginPage/loginPage.component";
import RegisterPage from "./pages/auth/registerPage/registerPage.component";
import NotFoundPage from "./pages/notFoundPage/notFoundPage.component";

import "./sass/_base.scss";
import PrivateRoute from "./routes/privateRoute.component";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route index element={<Homepage />} />
          </Route>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;










