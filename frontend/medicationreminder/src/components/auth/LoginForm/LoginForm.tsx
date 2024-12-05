import React, { useState } from 'react';
import { IonItem, IonLabel, IonInput, IonButton, IonToast } from '@ionic/react';
import { loginUser } from '../../../services/authService';
import { setToken, setUserDetails } from '../../../utils/storage';
import './LoginForm.css';
import {jwtDecode} from 'jwt-decode';

// Define the structure of the decoded JWT
interface DecodedToken {
  id: string;
  role: string;
}

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      const response = await loginUser({ email, password });
      const { token } = response; // Token returned from backend

      // Decode the token with the custom type
      const decodedToken = jwtDecode<DecodedToken>(token); // Using the custom type

      console.log(decodedToken);

      const { id, role } = decodedToken;

      // Save token and user details to localStorage or wherever you store it
      setToken(token);
      setUserDetails(id, role);

      setSuccess(true);
      setEmail('');
      setPassword('');
      setError(null);

      // Navigate to a dashboard or protected route based on role
      window.location.href = role === 'admin' ? '/admin/dashboard' : '/medicines';
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <div className="login-form">
      <IonItem>
        <IonLabel position="floating">Email</IonLabel>
        <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} required />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Password</IonLabel>
        <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} required />
      </IonItem>
      <IonButton expand="block" onClick={handleLogin} disabled={!email || !password}>
        Login
      </IonButton>
      {error && <IonToast isOpen={!!error} message={error} duration={2000} color="danger" onDidDismiss={() => setError(null)} />}
      {success && <IonToast isOpen={success} message="Login successful!" duration={2000} color="success" onDidDismiss={() => setSuccess(false)} />}
    </div>
  );
};

export default LoginForm;
