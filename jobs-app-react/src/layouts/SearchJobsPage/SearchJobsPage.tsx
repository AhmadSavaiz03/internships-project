import { useState, useEffect } from "react";
import JobModel from "../../models/JobModel";
import { SpinnerLoading } from "../utils/SpinnerLoading";
import { SearchJob } from "./components/SearchJob";
import { Pagination } from "../utils/Pagination";

export const SearchJobsPage = () => {
  const [jobs, setJobs] = useState<JobModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);
  const [totalAmountOfJobs, setTotalAmountOfJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchJobs = async () => {
      // fetching
      const baseUrl: string = "http://localhost:8080/api/jobs";
      const url: string = `${baseUrl}?page=${
        currentPage - 1
      }&size=${jobsPerPage}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong while fetching from API");
      }

      // json to data
      const responseJson = await response.json();
      const responseData = responseJson._embedded.jobs;
      setTotalAmountOfJobs(responseJson.page.totalElement);
      setTotalPages(responseJson.page.totalPages);

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
    window.scrollTo(0, 0);
  }, [currentPage]); // important concept

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

  const indexOfLastJob: number = currentPage + jobsPerPage;
  const indexOfFirstJob: number = indexOfLastJob - jobsPerPage;
  let lastItem =
    jobsPerPage + currentPage <= totalAmountOfJobs
      ? jobsPerPage * currentPage
      : totalAmountOfJobs;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-labelledby="Search"
                />
                <button className="btn btn-outline-success">Search</button>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a className="dropdown-item" href="">
                      ALL
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="">
                      Front End
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="">
                      Back End
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="">
                      Dev Ops
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <h5>Number of results: ({totalAmountOfJobs})</h5>
          </div>
          <p>
            {" "}
            {indexOfFirstJob + 1} to {lastItem} of {totalAmountOfJobs} items:
          </p>
          {jobs.map((job) => (
            <SearchJob job={job} key={job.id} />
          ))}
          {/* only paginate of greater than 1 */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
            />
          )}
        </div>
      </div>
    </div>
  );
};
