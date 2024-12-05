import React, { useState } from 'react';
import { IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption, IonToast } from '@ionic/react';
import { registerUser } from '../../../services/authService';
import './RegisterForm.css';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('user');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Validation function
  const validateForm = (): boolean => {
    if (!name.trim()) {
      setValidationError('Name is required.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError('Invalid email address.');
      return false;
    }

    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters long.');
      return false;
    }

    if (!role) {
      setValidationError('Role is required.');
      return false;
    }

    setValidationError(null);
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      await registerUser({ name, email, password, role });
      setSuccess(true);
      setName('');
      setEmail('');
      setPassword('');
      setRole('user');
      setError(null);
    } catch (err: any) {
      setError(err || 'Registration failed.');
    }
  };

  return (
    <div className="register-form">
      <IonItem>
        <IonLabel position="floating">Name</IonLabel>
        <IonInput value={name} onIonChange={(e) => setName(e.detail.value!)} required />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Email</IonLabel>
        <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} required />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Password</IonLabel>
        <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} required />
      </IonItem>
      <IonItem>
        <IonLabel>Role</IonLabel>
        <IonSelect value={role} onIonChange={(e) => setRole(e.detail.value!)}>
          <IonSelectOption value="user">User</IonSelectOption>
          <IonSelectOption value="admin">Admin</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonButton expand="block" onClick={handleRegister} disabled={!name || !email || !password || !role}>
        Register
      </IonButton>

      {/* Validation Error Toast */}
      {validationError && (
        <IonToast
          isOpen={!!validationError}
          message={validationError}
          duration={2000}
          color="warning"
          onDidDismiss={() => setValidationError(null)}
        />
      )}

      {/* Server Error Toast */}
      {error && (
        <IonToast
          isOpen={!!error}
          message={error}
          duration={2000}
          color="danger"
          onDidDismiss={() => setError(null)}
        />
      )}

      {/* Success Toast */}
      {success && (
        <IonToast
          isOpen={success}
          message="Registration successful!"
          duration={2000}
          color="success"
          onDidDismiss={() => setSuccess(false)}
        />
      )}
    </div>
  );
};

export default RegisterForm;
