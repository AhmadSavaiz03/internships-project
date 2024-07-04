import { useEffect, useState } from "react";
import JobModel from "../../models/JobModel";
import { SpinnerLoading } from "../utils/SpinnerLoading";

export const JobInformationPage = () => {
  const [job, setJob] = useState<JobModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const jobId = window.location.pathname.split("/")[2]; //grabs the jobId

  useEffect(() => {
    const fetchJob = async () => {
      // fetching
      const url: string = `http://localhost:8080/api/jobs/${jobId}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong while fetching from API");
      }

      // json to data
      const responseJson = await response.json();
      const loadedJob: JobModel = {
        id: responseJson.id,
        title: responseJson.title,
        description: responseJson.description,
        company: responseJson.company,
        location: responseJson.location,
        keywords: responseJson.keywords,
        date_posted: responseJson.date_posted,
        created_at: responseJson.created_at,
        updated_at: responseJson.updated_at,
      };

      setJob(loadedJob);
      setIsLoading(false);
    };

    fetchJob().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2"></div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h2>{job?.title}</h2>
              <h5 className="text-primary">{job?.company}</h5>
              <p className="lead">{job?.description}</p>
              <h5>Posted at: {job?.date_posted.toString()}</h5>
            </div>
          </div>
        </div>
        <hr />
      </div>
      <div className="container d-lg-none mt-5">
        <div className="mt-4">
          <div className="ml-2">
            <h2>{job?.title}</h2>
            <h5 className="text-primary">{job?.company}</h5>
            <p className="lead">{job?.description}</p>
            <h5>Posted at: {job?.date_posted.toString()}</h5>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};
