import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import publicRoutes from "./routes/publicRoutes";
import userRoutes from "./routes/userRoutes";
import { socket } from "./socket";
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Component = route.component;
          return (
            <Route key={index} path={route.path} element={<Component />} />
          );
        })}
        <Route element={<ProtectedRoutes />}>
          {userRoutes.map((route, index) => {
            const Component = route.component;
            return (
              <Route
                exact
                key={index}
                path={route.path}
                element={<Component />}
              />
            );
          })}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
