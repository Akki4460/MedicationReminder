import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/react';
import MedicineAcknowledgmentButton from './MedicineAcknowledgmentButton';

const MedicineCard = ({ medicines }: { medicines: any[] }) => {
  return (
    <div className="card-container">
      {medicines.map((medicine) => (
        <IonCard key={medicine.id}>
          <IonCardHeader>
            <IonCardTitle>{medicine.name}</IonCardTitle>
            <IonCardSubtitle>{medicine.dosage}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Schedule: {medicine.schedule_time}</p>
            <p>Repeat Interval: {medicine.repeat_interval}</p>
            <MedicineAcknowledgmentButton medicineId={medicine.id} />

          </IonCardContent>
        </IonCard>
      ))}
    </div>
  );
};

export default MedicineCard;
