import "./App.css";
import { Navbar } from "./layouts/Navbar-Footer/Navbar";
import { Footer } from "./layouts/Navbar-Footer/Footer";
import { HomePage } from "./layouts/HomePage/HomePage";
import { SearchJobsPage } from "./layouts/SearchJobsPage/SearchJobsPage";

function App() {
  return (
    <div>
      <Navbar />
      {/* <HomePage /> */}
      <SearchJobsPage />
      <Footer />
    </div>
  );
}

export default App;
