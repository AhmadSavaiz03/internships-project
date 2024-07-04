import { Link } from "react-router-dom";
import JobModel from "../../../models/JobModel";

export const SearchJob: React.FC<{ job: JobModel }> = (props) => {
  const { job } = props;
  const dateposted = new Date(job.date_posted);
  return (
    <div className="card mr-3 shadow p-3 mb-3 bg-body rounded">
      <div className="row g-0">
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{job.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{job.company}</h6>
            <p className="card-text">{job.description}</p>
            <ul className="list-inline">
              {job.keywords &&
                job.keywords.map((keyword, index) => (
                  <li
                    key={index}
                    className="list-inline-item badge badge-secondary mr-2"
                  >
                    {keyword}
                  </li>
                ))}
            </ul>
            <p className="card-text">
              <small className="text-muted">Location: {job.location}</small>
            </p>
            <p className="card-text">
              <small className="text-muted">
                Posted at: {dateposted.toDateString()}
              </small>
            </p>
            <div className="col-md-4 d-flex justify-content-center align-items-center">
              <Link
                className="btn btn-,d main-color text-white"
                to={`/info/${props.job.id}`}
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
