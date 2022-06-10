import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/homepage/homepage.component";
import LoginPage from "./pages/auth/loginPage/loginPage.component";
import SettingsPage from "./pages/settingspage/settingspage.component";
import NotFoundPage from "./pages/notFoundPage/notFoundPage.component";
import RegisterPage from "./pages/auth/registerPage/registerPage.component";
import CreateRecipePage from "./pages/createRecipePage/createRecipePage.component";

import PrivateRoute from "./routes/privateRoute.component";
import RecipesGridContainer from "./components/recipes-grid-container/recipes-grid-container.component";

import "./sass/_base.scss";
import ReadRecipePage from "./pages/readRecipePage/readRecipePage.component";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<Homepage />}>
              <Route path='/:cookbook' element={<RecipesGridContainer />} />
              <Route index element={<RecipesGridContainer />} />
            </Route>
            <Route path='/:cookbook/recipe/:recipeId' element={<ReadRecipePage />} />
            <Route path='/:cookbook/recipe/:recipeId/edit' element={<CreateRecipePage />} />
            <Route path='/:cookbook/create-recipe' element={<CreateRecipePage />} />
            <Route path='/settings' element={<SettingsPage />} />
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




