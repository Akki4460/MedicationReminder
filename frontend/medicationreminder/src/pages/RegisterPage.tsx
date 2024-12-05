import React from 'react';
import { IonPage, IonButton, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import RegisterForm from '../components/auth/RegisterForm/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <RegisterForm />
        <IonButton expand="block" fill="clear" routerLink="/login">
          Already have an account? Login
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
