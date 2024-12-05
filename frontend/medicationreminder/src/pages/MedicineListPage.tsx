import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { getMedicines } from '../services/scheduleService';
import { useHistory } from 'react-router-dom';
import MedicineCard from '../components/MedicineCard';
import MedicineTable from '../components/MedicineTable';
import LogoutButton from '../components/LogOut/LogOut';

const MedicineListPage: React.FC = () => {
  const history = useHistory();
  const [medicines, setMedicines] = useState<any[]>([]);

  const fetchMedicines = async () => {
    try {
      const response = await getMedicines();
      setMedicines(response.data);
    } catch (error) {
      console.error('Error fetching medicines', error);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonGrid>
            <IonRow className="ion-align-items-center ion-justify-content-between">
              <IonCol size="9">
                <IonTitle>Medicine Schedules</IonTitle>
              </IonCol>
              <IonCol size="3" className="ion-text-right">
                <LogoutButton />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              {medicines && medicines.length > 0 ? (
                <div>
                  <MedicineTable medicines={medicines} refreshMedicines={fetchMedicines} />
                  <MedicineCard medicines={medicines} />
                </div>
              ) : (
                <IonItem>
                  <IonLabel>No medicines found</IonLabel>
                </IonItem>
              )}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className="ion-text-center ion-margin-top">
              <IonButton expand="full" onClick={() => history.push('/add-medicine')}>
                Add Medicine
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MedicineListPage;
