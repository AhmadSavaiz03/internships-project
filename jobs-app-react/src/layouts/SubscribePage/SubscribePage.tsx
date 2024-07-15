import { useOktaAuth } from '@okta/okta-react';
import React, { useEffect, useState } from 'react';
import { SpinnerLoading } from '../utils/SpinnerLoading';
import { Link } from 'react-router-dom';

interface SubscriptionRequest {
  roles: string[];
  regions: string[];
}

export const SubscribePage: React.FC = () => {
  const { authState } = useOktaAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string | null>(null);

  // User input roles and regions
  const [roles, setRoles] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);

  // Fetching all available roles and regions
  const [allRoles, setAllRoles] = useState<string[]>([]);
  const [allRegions, setAllRegions] = useState<string[]>([]);
  const [isLoadingRoles, setIsLoadingRoles] = useState(true);
  const [isLoadingRegions, setIsLoadingRegions] = useState(true);

  useEffect(() => {
    const fetchAllRoles = async () => {
      try {
        const allRolesUrl = 'http://localhost:8080/api/subscribe/roles';
        const responseRoles = await fetch(allRolesUrl);

        if (!responseRoles.ok) {
          throw new Error('Something went wrong fetching all roles!');
        }
        const responseJson = await responseRoles.json();
        setAllRoles(responseJson);
        setIsLoadingRoles(false);
      } catch (error: any) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    };
    fetchAllRoles();
  }, []);

  useEffect(() => {
    const fetchAllRegions = async () => {
      try {
        const allRegionsUrl = 'http://localhost:8080/api/subscribe/regions';
        const responseRegions = await fetch(allRegionsUrl);

        if (!responseRegions.ok) {
          throw new Error('Something went wrong fetching all regions!');
        }
        const responseJson = await responseRegions.json();
        setAllRegions(responseJson);
        setIsLoadingRegions(false);
      } catch (error: any) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    };
    fetchAllRegions();
  }, []);

  //   if (isLoading || isLoadingRoles || isLoadingRegions) {
  //     return <SpinnerLoading />;
  //   }

  if (httpError) {
    return (
      <div className='container m-5'>
        <p>{httpError}</p>
      </div>
    );
  }

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = event.target.options;
    const selected: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setRoles(selected);
  };

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = event.target.options;
    const selected: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setRegions(selected);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!authState?.isAuthenticated) {
      setHttpError('User is not authenticated');
      return;
    }

    const token = authState.accessToken?.accessToken;
    const subscriptionRequest: SubscriptionRequest = {
      roles,
      regions,
    };

    try {
      const url = 'http://localhost:8080/api/subscribe/secure/submit';
      const requestOptions = {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionRequest),
      };
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      alert('Subscription successful!');
    } catch (error: any) {
      setHttpError(error.message);
    }
  };

  return (
    <div className='container mt-5'>
      <h1>Subscribe to Job Alerts</h1>
      {httpError && <p className='text-danger'>{httpError}</p>}
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='roles'>Select Roles:</label>
          <select
            id='roles'
            className='form-control'
            multiple
            value={roles}
            onChange={handleRoleChange}>
            {allRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='regions'>Select Regions:</label>
          <select
            id='regions'
            className='form-control'
            multiple
            value={regions}
            onChange={handleRegionChange}>
            {allRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        {authState?.isAuthenticated ? (
          <button type='submit' className='btn btn-primary mt-3'>
            Subscribe
          </button>
        ) : (
          <Link className='btn main-color btn-lg text-white' to={'/login'}>
            Sign In
          </Link>
        )}
      </form>
    </div>
  );
};

export default SubscribePage;
