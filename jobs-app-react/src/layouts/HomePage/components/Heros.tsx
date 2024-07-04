import { useOktaAuth } from '@okta/okta-react';
import { Link } from 'react-router-dom';

export const Heros = () => {
  const { authState } = useOktaAuth();

  return (
    <div>
      <div className='d-none d-lg-block'>
        <div className='row g-0 mt-5'>
          <div className='col-sm-6 col-md-6'>
            <div className='col-image-left'></div>
          </div>
          <div className='col-4 col-md-4 comtainer d-flex justify-content-center align-items-center'>
            <div className='ml-2'>
              <h1>What are you looking for?</h1>
              <p className='lead'>
                We would love to help you out in your dream internship search.
                By helping you find according to your region and skills. And
                giving you a timeline and keywords to tailor your resume.
              </p>
              {authState?.isAuthenticated ? (
                <Link
                  type='button'
                  className='btn main-color btn-lg text-white'
                  to={'/search'}>
                  Explore Internships
                </Link>
              ) : (
                <Link
                  className='btn main-color btn-lg text-white'
                  to={'/login'}>
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className='row g-0'>
          <div className='col-4 col-md-4 container d-flex justify-content-center align-items-center'>
            <div className='ml-2'>
              <h1>New positions added live.</h1>
              <p className='lead'>
                Try to check in daily as there are always new positions opening
                and closing. We will try our best to keep a track of all
                internships in the region.
              </p>
            </div>
          </div>
          <div className='col-sm-6 col-md-6'>
            <div className='col-image-right'></div>
          </div>
        </div>
      </div>
      {/* {Mobile Heros} */}
      <div className='d-lg-none'>
        <div className='container'>
          <div className='m-2'>
            <div className='col-image-left'></div>
            <div className='ml-2'>
              <h1>New positions added live.</h1>
              <p className='lead'>
                Try to check in daily as there are always new positions opening
                and closing. We will try our best to keep a track of all
                internships in the region.
              </p>
              {authState?.isAuthenticated ? (
                <Link
                  type='button'
                  className='btn main-color btn-lg text-white'
                  to={'/search'}>
                  Explore Internships
                </Link>
              ) : (
                <Link
                  className='btn main-color btn-lg text-white'
                  to={'/login'}>
                  Sign In
                </Link>
              )}
            </div>
          </div>
          <div className='m-2'>
            <div className='col-image-right'></div>
            <div className='mt-2'>
              <h1>New positions added live.</h1>
              <p className='lead'>
                Try to check in daily as there are always new positions opening
                and closing. We will try our best to keep a track of all
                internships in the region.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
