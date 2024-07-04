import { Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { SpinnerLoading } from '../layouts/utils/SpinnerLoading';
import OktaSignInWidget from './OktaSignInWidget';

// Used JavaScript over TypeScript to follow Okta Documentation
const LoginWidget = ({ config }) => {
  const { oktaAuth, authState } = useOktaAuth();
  const onSuccess = (tokens) => {
    oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err) => {
    console.log('Sign in error', err);
  };

  if (!authState) {
    return <SpinnerLoading />;
  }
  // can use token for user information and the only other info is whether authenticated
  return authState.isAuthenticated ? (
    <Redirect to={{ pathname: '/' }} />
  ) : (
    <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError} />
  );
};
export default LoginWidget;
