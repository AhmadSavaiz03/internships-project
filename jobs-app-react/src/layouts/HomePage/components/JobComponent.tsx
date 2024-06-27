import React from "react";
import JobModel from "../../../models/JobModel";

// There is a simpler way of calling the prop
export const JobComponent: React.FC<{ job: JobModel }> = (props) => {
  const postedDate = new Date(props.job.date_posted); //had to change type due to errors

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h3>{props.job.title}</h3>
          <h5 className="text-muted">{props.job.company}</h5>
        </div>
        <div className="card-body">
          <p className="card-text">{props.job.description}</p>
          <ul className="list-inline">
            {/* check this condition later */}
            {props.job.keywords &&
              props.job.keywords.map((keyword, index) => (
                <li
                  key={index}
                  className="list-inline-item badge badge-secondary mr-2"
                >
                  {keyword}
                </li>
              ))}
          </ul>
        </div>
        <div className="card-footer text-muted">
          <small>Location: {props.job.location}</small>
          <br />
          <small>Posted at: {postedDate.toDateString()}</small>
        </div>
      </div>
    </div>
  );
};

export default JobComponent;

{
  /* <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
  <div className="text-center">
    <img src="" alt="not available" />
    <h6 className="mt-2">Internship</h6>
    <p>FindYourInternship</p>
    <a className="btn main-color text-white" href="#">
      Check
    </a>
  </div>
</div>; */
}

// <div className="text-center">
//   <img src="" alt="" />
//   <h6 className="mt-2">
//     <b>Book</b>
//   </h6>
//   <p>FindYourInternship</p>
//   <a className="btn main-color text-white" href="#">
//     Check
//   </a>
// </div>;
