import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import { authOperations, authSelectors } from "./redux/auth";

import { PublickRoute } from "./component/PublickRoutes";
import { PrivateRoute } from "./component/PrivateRoute";

import { Header } from "./component/Header/Header.jsx";
import { AuthPage } from "./pages/AuthPage/AuthPage.jsx";
import ReportPage from "./pages/ReportPage/ReportPage";
//import OnLoader from "./component/OnLoader";
import TransactionPage from "./pages/TransactionPage/TransactionPage";
import { HomePage } from "./pages/HomePage/HomePage";

const App = () => {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const isRefreshing = useSelector(authSelectors.getIsRefreshing);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());

    let secondTimerId = null;
    if (isLoggedIn) {
      dispatch(authOperations.refreshTokens());

      secondTimerId = setInterval(() => {
        dispatch(authOperations.refreshTokens());
      }, 900000);
    }

    return () => {
      clearInterval(secondTimerId);
    };
  }, [dispatch, isLoggedIn]);

  return (
    <div>
      <Header />
      {!isFetchingCurrentUser && (
        <>
          {/*<OnLoader />*/}
          <Routes>
            <Route
              path="/"
              element={
                <PublickRoute restricted redirectTo="/homepage/expense">
                  <AuthPage />
                </PublickRoute>
              }
            />
            {!isRefreshing && (
              <Route
                path="/homepage/*"
                element={
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                }
              />
            )}
            <Route
              path="/report"
              element={
                <PrivateRoute>
                  <ReportPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
