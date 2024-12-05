import React from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';
import { logAcknowledgment } from '../services/logService';

// Define the component props interface
interface MedicineAcknowledgmentButtonProps {
  medicineId: string;
}

const MedicineAcknowledgmentButton: React.FC<MedicineAcknowledgmentButtonProps> = ({ medicineId }) => {
  const handleAcknowledge = async (status: 'taken' | 'not_taken') => {
    try {
      const result = await logAcknowledgment(medicineId, status);
      alert(result.message || 'Acknowledgment logged');
    } catch (error) {
      alert('Failed to log acknowledgment');
    }
  };

  return (
    <div>
      <IonButton onClick={() => handleAcknowledge('taken')}>
        <IonIcon icon={checkmarkCircleOutline} />
        Take Medicine
      </IonButton>
      <IonButton onClick={() => handleAcknowledge('not_taken')}>
        <IonIcon icon={closeCircleOutline} />
        Skip Medicine
      </IonButton>
    </div>
  );
};

export default MedicineAcknowledgmentButton;
