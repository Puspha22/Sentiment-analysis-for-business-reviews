import "./styles/App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import OTP from "./components/authentication/OTP/OTP";
import PropTypes from "prop-types";

function App({ children }) {
  return (
    <div className="app-container">
      <div className="header-container">
        <Navbar />
      </div>
      <div className="content-container">
        {children}
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
