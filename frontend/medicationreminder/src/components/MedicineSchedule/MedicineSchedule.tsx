// import React, { useState, useEffect } from 'react';
// import { IonItem, IonLabel, IonInput, IonButton, IonToast, IonDatetime, IonSelect, IonSelectOption } from '@ionic/react';
// import { setMedicineSchedule, updateMedicineSchedule } from '../../services/scheduleService'; // Services for API calls
// import './MedicineSchedule.css';

// interface MedicineFormProps {
//   isEditMode: boolean;
//   medicineId?: number;  // Only needed if editing
//   existingData?: { name: string, dosage: string, schedule_time: string, repeat_interval: string };  // For editing
// }

// const MedicineSchedule: React.FC<MedicineFormProps> = ({ isEditMode, medicineId, existingData }) => {
//   const [name, setName] = useState<string>(existingData?.name || '');
//   const [dosage, setDosage] = useState<string>(existingData?.dosage || '');
//   const [scheduleTime, setScheduleTime] = useState<string>(existingData?.schedule_time || '');
//   const [repeatInterval, setRepeatInterval] = useState<string>(existingData?.repeat_interval || 'daily');
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<boolean>(false);

//   const handleSubmit = async () => {
//     try {
//       if (isEditMode) {
//         // Update medicine schedule
//         await updateMedicineSchedule(medicineId!, { name, dosage, scheduleTime, repeatInterval });
//       } else {
//         // Create new medicine schedule
//         await setMedicineSchedule({ name, dosage, scheduleTime, repeatInterval });
//       }

//       setSuccess(true);
//       setName('');
//       setDosage('');
//       setScheduleTime('');
//       setRepeatInterval('daily');
//       setError(null);
//     } catch (err: any) {
//       setError(err.message || 'An error occurred while saving the medicine schedule.');
//     }
//   };

//   return (
//     <div className="medicine-schedule-form">
//       <IonItem>
//         <IonLabel position="floating">Medicine Name</IonLabel>
//         <IonInput value={name} onIonChange={(e) => setName(e.detail.value!)} required />
//       </IonItem>

//       <IonItem>
//         <IonLabel position="floating">Dosage</IonLabel>
//         <IonInput type="number" value={dosage} onIonChange={(e) => setDosage(e.detail.value!)} required />
//       </IonItem>

//       <IonItem>
//         <IonLabel position="floating">Schedule Time</IonLabel>
//         <IonDatetime 
//           value={scheduleTime} 
//           onIonChange={(e) => setScheduleTime(e.detail.value!)} 
//           displayFormat="YYYY-MM-DDTHH:mm" 
//           required
//         />
//       </IonItem>

//       <IonItem>
//         <IonLabel>Repeat Interval</IonLabel>
//         <IonSelect value={repeatInterval} onIonChange={(e) => setRepeatInterval(e.detail.value!)}>
//           <IonSelectOption value="daily">Daily</IonSelectOption>
//           <IonSelectOption value="weekly">Weekly</IonSelectOption>
//           <IonSelectOption value="monthly">Monthly</IonSelectOption>
//         </IonSelect>
//       </IonItem>

//       <IonButton expand="block" onClick={handleSubmit} disabled={!name || !dosage || !scheduleTime}>
//         {isEditMode ? 'Update Medicine Schedule' : 'Create Medicine Schedule'}
//       </IonButton>

//       {error && <IonToast isOpen={!!error} message={error} duration={2000} color="danger" onDidDismiss={() => setError(null)} />}
//       {success && <IonToast isOpen={success} message="Medicine schedule saved successfully!" duration={2000} color="success" onDidDismiss={() => setSuccess(false)} />}
//     </div>
//   );
// };

// export default MedicineSchedule;
