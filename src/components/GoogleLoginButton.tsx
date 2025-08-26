import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useGoogleAuth } from '../hooks/useGoogleAuth';

interface GoogleLoginButtonProps {
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
  shape?: 'rectangular' | 'pill' | 'circle' | 'square';
  theme?: 'outline' | 'filled_blue' | 'filled_black';
  size?: 'large' | 'medium' | 'small';
  width?: string;
}

export default function GoogleLoginButton({ 
  text = 'signin_with',
  shape = 'rectangular',
  theme = 'outline',
  size = 'large',
  width = '100%'
}: GoogleLoginButtonProps) {
  const googleAuth = useGoogleAuth();

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    console.log('Google Login Success:', credentialResponse);
    
    if (credentialResponse.credential) {
      googleAuth.mutate(credentialResponse.credential);
    } else {
      console.error('No credential received from Google');
    }
  };

  const handleError = () => {
    console.error('Google Login Failed');
  };

  return (
    <div className="w-full">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        text={text}
        shape={shape}
        theme={theme}
        size={size}
        width={width}
        useOneTap={false}
        auto_select={false}
      />
    </div>
  );
}