import React from 'react';
import { IonPage, IonButton, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import LoginForm from '../components/auth/LoginForm/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <LoginForm />
        <IonButton expand="block" fill="clear" routerLink="/register">
          Don't have an account? Register
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
