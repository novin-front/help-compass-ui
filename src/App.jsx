import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/vendor/typicons/typicons.css";
import "./assets/css/styles.css";


import Dashboard from "./screen/Dashboard";
import Register from "./screen/auth/Register";
import Login from "./screen/auth/Login";
import ForgotPassword from "./screen/auth/ForgotPassword";
import ChangePassword from "./screen/auth/ChangePassword";
import NotFound from "./screen/NotFound/indxe";

function App() {
  const state = useSelector((state) => state);
  const { userIsForgotPassword } = useSelector((state) => state.forgotPassword);
  return (
    <div className="container-scroller">
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact  component={Register} />
        <Route path="/forgot-password" exact component={ForgotPassword} />
        {userIsForgotPassword.success && (
          <Route path="/change-password" exact component={ChangePassword} />
        )}
        <Route path="/dashboard/:topicId"  component={Dashboard} />

        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
