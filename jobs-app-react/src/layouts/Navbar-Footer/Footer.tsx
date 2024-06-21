export const Footer = () => {
  return (
    <div className="main-color">
      <div className="container d-flex flex-wrap justify-content-betwen align-items-center py-5 main-color">
        <p className="cold-md-4 mb-0 text-white">@ Internships App, Inc</p>
        <ul className="nav navbar-dark col-md-4 justify-content-end">
          <li className="nav-item">
            <a className="nav-link px-2 text-white" href="#">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link px-2 text-white">
              Search Internships
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
