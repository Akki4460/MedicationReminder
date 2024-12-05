import React from 'react';
import { useHistory } from 'react-router-dom';
import { IonButton } from '@ionic/react';

const LogoutButton: React.FC = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Clear user authentication data from localStorage
    localStorage.removeItem('token'); // Remove the token
    localStorage.removeItem('id'); // Optional: Remove any user data if stored
    localStorage.removeItem('role'); // Optional: Remove any user data if stored

    // Redirect the user to the login page
    history.push('/login');

    // Optional: Show a logout confirmation
    alert('You have been successfully logged out.');
  };

  return (
    <IonButton color="danger" onClick={handleLogout}>
      Log Out
    </IonButton>
  );
};

export default LogoutButton;
