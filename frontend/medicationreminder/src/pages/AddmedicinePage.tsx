import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonContent,
  IonButton,
  IonInput,
  IonLabel,
  IonItem,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons,
  IonToast,
  IonGrid,
  IonCol,IonRow
} from '@ionic/react';
import { setMedicineSchedule } from '../services/scheduleService';

const AddMedicinePage: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [schedule_time, setScheduleTime] = useState('');
  const [repeat_interval, setRepeatInterval] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!name || !dosage || !schedule_time || !repeat_interval) {
        setError('All fields are required.');
        return;
      }

      // Transform `schedule_time` to ISO 8601 format
      const formattedSchedule = new Date(schedule_time).toISOString();
      const schedule = { name, dosage, schedule_time: formattedSchedule, repeat_interval };

      await setMedicineSchedule(schedule);
      setSuccess(true);
      setTimeout(() => history.push('/medicines'), 1500); // Redirect to medicines list page
    } catch (error) {
      console.error('Error adding medicine schedule', error);
      setError('Failed to add medicine schedule. Please try again.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonGrid>
            <IonRow className="ion-align-items-center ion-justify-content-between">
              <IonCol size="9">
                <IonTitle>Add Medicine Schedule</IonTitle>
              </IonCol>
              <IonCol size="3" className="ion-text-right">
                <IonButton onClick={() => history.push('/medicines')}>
                  Back
                </IonButton>
              </IonCol>
            </IonRow>



          </IonGrid>

        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="floating">Name</IonLabel>
            <IonInput
              value={name}
              onIonChange={(e) => setName(e.detail.value!)}
              placeholder="e.g., Omee"
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Dosage</IonLabel>
            <IonInput
              value={dosage}
              onIonChange={(e) => setDosage(e.detail.value!)}
              placeholder="e.g., 400mg"
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Schedule Time</IonLabel>
            <IonInput
              type="datetime-local"
              value={schedule_time}
              onIonChange={(e) => setScheduleTime(e.detail.value!)}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Repeat Interval</IonLabel>
            <IonInput
              value={repeat_interval}
              onIonChange={(e) => setRepeatInterval(e.detail.value!)}
              placeholder="e.g., weekly"
              required
            />
          </IonItem>
          <IonButton expand="full" type="submit">
            Add Medicine Schedule
          </IonButton>

        </form>

        {error && (
          <IonToast
            isOpen={!!error}
            onDidDismiss={() => setError(null)}
            message={error}
            duration={3000}
            color="danger"
          />
        )}
        {success && (
          <IonToast
            isOpen={success}
            onDidDismiss={() => setSuccess(false)}
            message="Medicine schedule added successfully!"
            duration={2000}
            color="success"
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default AddMedicinePage;
