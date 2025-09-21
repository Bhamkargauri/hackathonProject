
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        background: "linear-gradient(90deg,#c4e0e5,#4ca1af)",
        height: "80px",
        zIndex: 1,
      }}
    >
      <div className="container">
        <Link
          className="navbar-brand fw-bold fs-3 text-shadow-lg"
          to="/"
          style={{ color: "#4ca1af" }}
        >
          ☔ Monsoon Recipe Hub
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse rounded-3 p-2"
          style={{
            background: "linear-gradient(90deg,#c4e0e5,#4ca1af)",
            height: "80px",
          }}
          id="nav"
        >
          <ul className="navbar-nav ms-auto fs-4 fw-semibold">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link nav-link text-white"
                onClick={() => navigate("/add-recipe")}
              >
                Upload Recipe
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
