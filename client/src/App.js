import logo from "./logo.svg";
import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { Home, Chat, Signup, Login, Welcome } from "./pages";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/home" component={Home}></Route>
        <Route path="/chat" component={Chat}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/login" component={Login}></Route>
      </Switch>
    </Router>
  );
}

export default App;
