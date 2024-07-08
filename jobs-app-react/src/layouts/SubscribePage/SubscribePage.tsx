import React, { useEffect, useState } from 'react';

interface SubscriptionRequest {
  userEmail: string;
  roles: string[];
  regions: string[];
}

const SubscribePage: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [roles, setRoles] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [allRoles, setAllRoles] = useState<string[]>([]);
  const [allRegions, setAllRegions] = useState<string[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/subscribe/roles')
      .then((response) => response.json())
      .then((data) => setAllRoles(data))
      .catch((error) => console.error('Error fetching roles:', error));

    fetch('http://localhost:8080/api/subscribe/regions')
      .then((response) => response.json())
      .then((data) => setAllRegions(data))
      .catch((error) => console.error('Error fetching regions:', error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const subscriptionRequest: SubscriptionRequest = {
      userEmail,
      roles,
      regions,
    };

    const token = 'your-jwt-token'; // Replace with actual token retrieval logic

    try {
      const response = await fetch(
        'http://localhost:8080/api/subscribe/submit',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(subscriptionRequest),
        }
      );

      if (!response.ok) {
        throw new Error('Something went wrong while subscribing');
      }

      const result = await response.json();
      console.log('Subscription successful:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(selectedOptions);
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRegions(selectedOptions);
  };

  return (
    <div className='container mt-5'>
      <h1>Subscribe to Job Alerts</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            className='form-control'
            id='email'
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='roles'>Select Roles</label>
          <select
            multiple
            className='form-control'
            id='roles'
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
          <label htmlFor='regions'>Select Regions</label>
          <select
            multiple
            className='form-control'
            id='regions'
            value={regions}
            onChange={handleRegionChange}>
            {allRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <button type='submit' className='btn btn-primary'>
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default SubscribePage;
