import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleAuthButton = () => {
  const handleSuccess = async (credentialResponse) => {
    try {
      // Send the credential to your Strapi backend
      const response = await axios.post(
        'http://localhost:3000/auth/google/callback', 
        {
          credential: credentialResponse.credential
        }
      );
      
      // Handle successful authentication
      console.log('Login successful:', response.data);
      // Store user data/token in your app state or localStorage
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <GoogleOAuthProvider 
      clientId="YOUR_GOOGLE_CLIENT_ID"
      redirectUri={window.location.origin}
    >
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthButton;