import './App.css';
import { Navbar } from './layouts/Navbar-Footer/Navbar';
import { Footer } from './layouts/Navbar-Footer/Footer';
import { HomePage } from './layouts/HomePage/HomePage';
import { SearchJobsPage } from './layouts/SearchJobsPage/SearchJobsPage';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { JobInformationPage } from './layouts/JobInformationPage/JobInformationPage';
import { oktaConfig } from './lib/oktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { LoginCallback, Security } from '@okta/okta-react';
import LoginWidget from './auth/LoginWidget';

const oktaAuth = new OktaAuth(oktaConfig);
function App() {
  const customAuthHandler = () => {
    history.push('/login');
  };

  const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security
        oktaAuth={oktaAuth}
        restoreOriginalUri={restoreOriginalUri}
        onAuthRequired={customAuthHandler}>
        <Navbar />

        <div className='flex-grow-1'>
          <Switch>
            <Route path='/' exact>
              <Redirect to='/home' />
            </Route>

            <Route path='/home'>
              <HomePage />
            </Route>

            <Route path='/search'>
              <SearchJobsPage />
            </Route>

            <Route path='/info/:jobId'>
              <JobInformationPage />
            </Route>
          </Switch>
        </div>

        <Route
          path={'/login'}
          render={() => <LoginWidget config={oktaConfig} />}
        />
        <Route path={'/logn/callback'} component={LoginCallback} />

        <Footer />
      </Security>
    </div>
  );
}

export default App;
