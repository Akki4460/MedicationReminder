import React, { useState } from 'react';
import {
  IonInput,
  IonButton,
  IonLabel,
  IonItem,
  IonDatetime,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from '@ionic/react';

interface FilterFormProps {
  filters: {
    patient_id: string;
    start_date: string;
    end_date: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  onApplyFilters: () => void; // Function to apply filters
}

const FilterForm: React.FC<FilterFormProps> = ({ filters, setFilters, onApplyFilters }) => {
  const [error, setError] = useState<string | null>(null);

  const validateDates = () => {
    const { start_date, end_date } = filters;
    if (start_date && end_date && new Date(start_date) > new Date(end_date)) {
      setError('Start date cannot be later than end date');
      return false;
    }
    setError(null);
    return true;
  };

  const handleApplyFilters = () => {
    if (validateDates()) {
      onApplyFilters(); // Trigger filter action
    }
  };

  return (
    <IonGrid className="filter-form-grid">
      <IonRow>
        <IonCol size="12" sizeMd="4">
          <IonItem>
            <IonLabel position="floating">Patient ID</IonLabel>
            <IonInput
              value={filters.patient_id}
              onIonChange={(e) => setFilters({ ...filters, patient_id: e.detail.value! })}
              clearInput
            />
          </IonItem>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol size="12" sizeMd="4">
          <IonItem>
            <IonLabel position="floating">Start Date</IonLabel>
            <IonDatetime
              className="wide-datetime"
              value={filters.start_date}
              onIonChange={(e) => setFilters({ ...filters, start_date: e.detail.value! })}
            />
          </IonItem>
        </IonCol>

        <IonCol size="12" sizeMd="4">
          <IonItem>
            <IonLabel position="floating">End Date</IonLabel>
            <IonDatetime
              className="wide-datetime"
              value={filters.end_date}
              onIonChange={(e) => setFilters({ ...filters, end_date: e.detail.value! })}
            />
          </IonItem>
        </IonCol>
      </IonRow>

      {error && (
        <IonRow>
          <IonCol size="12">
            <IonText color="danger">{error}</IonText>
          </IonCol>
        </IonRow>
      )}

      <IonRow className="ion-justify-content-center">
        <IonCol size="12" sizeMd="4">
          <IonButton expand="full" onClick={handleApplyFilters}>
            Apply Filters
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default FilterForm;
