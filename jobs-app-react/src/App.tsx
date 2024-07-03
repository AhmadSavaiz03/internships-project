import "./App.css";
import { Navbar } from "./layouts/Navbar-Footer/Navbar";
import { Footer } from "./layouts/Navbar-Footer/Footer";
import { HomePage } from "./layouts/HomePage/HomePage";
import { SearchJobsPage } from "./layouts/SearchJobsPage/SearchJobsPage";
import { Redirect, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="d-flex flex-column min-vh-1000">
      <Navbar />

      <div className="flex-grow-1">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>

          <Route path="/home">
            <HomePage />
          </Route>

          <Route path="/search">
            <SearchJobsPage />
          </Route>
        </Switch>
      </div>

      <Footer />
    </div>
  );
}

export default App;
