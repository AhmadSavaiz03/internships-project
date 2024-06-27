import JobComponent from "./JobComponent";
import { useEffect, useState } from "react";
import JobModel from "../../../models/JobModel";

export const Carousel = () => {
  // I want non static data fetching
  const [jobs, setJobs] = useState<JobModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      // fetching
      const baseUrl: string = "http://localhost:8080/api/jobs";
      const url: string = `${baseUrl}?page=0`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong while fetching from API");
      }

      // json to data
      const responseJson = await response.json();
      const responseData = responseJson._embedded.jobs;
      const loadedJobs: JobModel[] = [];
      for (const key in responseData) {
        loadedJobs.push({
          id: responseData[key].id,
          title: responseData[key].title,
          description: responseData[key].description,
          company: responseData[key].company,
          location: responseData[key].location,
          keywords: responseData[key].keywords,
          date_posted: responseData[key].date_posted,
          created_at: responseData[key].created_at,
          updated_at: responseData[key].updated_at,
        });
      }
      setJobs(loadedJobs);
      setIsLoading(false);
    };

    fetchJobs().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="container m-5">
        <p>Loading...</p>
      </div>
    );
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div className="container mt-5" style={{ height: 550 }}>
      <div className="homepage-carousel-title">
        <h3>Find your CV building internship.</h3>
      </div>
      <div
        id="carouselExampleControls"
        className="carousel carousel-dark slide mt-5 d-none d-lg-block"
        data-bs-interval="false"
      >
        {/* {Desktop} */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row d-flex justify-content-center align-items-center">
              {jobs.slice(0, 3).map((job) => (
                <JobComponent job={job} key={job.id} />
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {jobs.slice(3, 6).map((job) => (
                <JobComponent job={job} key={job.id} />
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {jobs.slice(6, 9).map((job) => (
                <JobComponent job={job} key={job.id} />
              ))}
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* {Mobile} */}
        <div className="d-lg-none mt-3">
          <div className="row d-flex justify-content-center align-items-center">
            <JobComponent job={jobs[0]} key={jobs[0].id} />
          </div>
        </div>
        <div className="homepage-carousel-title mt-3">
          <a className="btn btn-outline-secondary btn-lg" href="#">
            View More
          </a>
        </div>
      </div>
    </div>
  );
};
