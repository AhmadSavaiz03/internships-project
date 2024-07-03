import { Link } from "react-router-dom";

export const Explore = () => {
  return (
    <div className="p-6 mb-4 bg-darl header">
      <div className="container-fliud py-5 text-white d-flex justify-content-center align-items-center">
        <h1 className="display-5 fw-bold">Find your internship</h1>
        <p className="col-md-8 fs-4">Where would you like to go next</p>
        <Link
          type="button"
          className="btn main-color btn-lg text-white"
          to={"/search"}
        >
          Explore recent internships
        </Link>
      </div>
    </div>
  );
};
