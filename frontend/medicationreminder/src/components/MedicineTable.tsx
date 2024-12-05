import React, { useState } from 'react';
import {
  IonButton,
  IonIcon,
  IonRow,
  IonCol,
  IonGrid,
  IonLabel,
  IonModal,
  IonInput,
  IonItem,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonFooter,
} from '@ionic/react';
import { create, trash } from 'ionicons/icons';
import { deleteMedicineSchedule, updateMedicineSchedule } from '../services/scheduleService';

const MedicineTable = ({ medicines, refreshMedicines }: { medicines: any[]; refreshMedicines: () => void }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null);

  const handleDelete = async (id: number) => {
    try {
      await deleteMedicineSchedule(id);
      alert('Medicine schedule deleted');
      refreshMedicines(); // Refresh the medicine list after deletion
    } catch (error) {
      console.error('Error deleting medicine schedule', error);
    }
  };

  const openUpdateModal = (medicine: any) => {
    setSelectedMedicine(medicine);
    setShowUpdateModal(true);
  };

  const handleUpdate = async () => {
    try {
      if (selectedMedicine) {
        await updateMedicineSchedule(selectedMedicine.id, selectedMedicine);
        alert('Medicine schedule updated');
        refreshMedicines(); // Refresh the medicine list after update
        setShowUpdateModal(false);
      }
    } catch (error) {
      console.error('Error updating medicine schedule', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setSelectedMedicine((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonLabel>Name</IonLabel>
          </IonCol>
          <IonCol>
            <IonLabel>Dosage</IonLabel>
          </IonCol>
          <IonCol>
            <IonLabel>Schedule</IonLabel>
          </IonCol>
          <IonCol>
            <IonLabel>Repeat Interval</IonLabel>
          </IonCol>
          <IonCol>
            <IonLabel>Actions</IonLabel>
          </IonCol>
        </IonRow>
        {medicines.map((medicine) => (
          <IonRow key={medicine.id}>
            <IonCol>{medicine.name}</IonCol>
            <IonCol>{medicine.dosage}</IonCol>
            <IonCol>{medicine.schedule_time}</IonCol>
            <IonCol>{medicine.repeat_interval}</IonCol>
            <IonCol>
              <IonButton onClick={() => openUpdateModal(medicine)}>
                <IonIcon icon={create} />
              </IonButton>
              <IonButton color="danger" onClick={() => handleDelete(medicine.id)}>
                <IonIcon icon={trash} />
              </IonButton>
            </IonCol>
          </IonRow>
        ))}
      </IonGrid>

      <IonModal isOpen={showUpdateModal} onDidDismiss={() => setShowUpdateModal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Update Medicine Schedule</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowUpdateModal(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {selectedMedicine && (
            <form>
              <IonItem>
                <IonLabel position="floating">Name</IonLabel>
                <IonInput
                  value={selectedMedicine.name}
                  onIonChange={(e) => handleInputChange('name', e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Dosage</IonLabel>
                <IonInput
                  value={selectedMedicine.dosage}
                  onIonChange={(e) => handleInputChange('dosage', e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Schedule Time</IonLabel>
                <IonInput
                  type="datetime-local"
                  value={selectedMedicine.schedule_time}
                  onIonChange={(e) => handleInputChange('schedule_time', e.detail.value!)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Repeat Interval</IonLabel>
                <IonInput
                  value={selectedMedicine.repeat_interval}
                  onIonChange={(e) => handleInputChange('repeat_interval', e.detail.value!)}
                />
              </IonItem>
            </form>
          )}
        </IonContent>
        <IonFooter>
          <IonToolbar>
            <IonButton expand="full" onClick={handleUpdate}>
              Update Schedule
            </IonButton>
          </IonToolbar>
        </IonFooter>
      </IonModal>
    </>
  );
};

export default MedicineTable;
