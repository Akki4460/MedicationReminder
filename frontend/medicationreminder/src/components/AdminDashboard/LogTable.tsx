import React, { useEffect, useState } from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonCard,
  IonCardContent,
  IonSpinner,
  IonToast,
  IonSearchbar,
  IonInput,
  IonButton,
} from '@ionic/react';
import { getAcknowledgmentLogs } from '../../services/adminService'; // Import the service function

interface Log {
  id: string;
  user_id: string;
  medicine_id: string;
  status: string;
  timestamp: string;
}

const LogTable: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await getAcknowledgmentLogs({
          page: 1,
          limit: 10, // Change this value as needed
        });
        setLogs(response.data);
        setFilteredLogs(response.data); // Initialize filteredLogs with all data
      } catch (error: any) {
        setError(error.message || 'Failed to fetch logs');
        setToastMessage(error.message || 'No logs found for the given filters');
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  // Filter logs based on the search term and date range
  useEffect(() => {
    let filtered = logs.filter((log) =>
      String(log.user_id).toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter by date range if both dates are set
    if (startDate && endDate) {
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();
      filtered = filtered.filter((log) => {
        const logDate = new Date(log.timestamp).getTime();
        return logDate >= start && logDate <= end;
      });
    }

    setFilteredLogs(filtered);
  }, [searchTerm, logs, startDate, endDate]);

  // Function to clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <IonGrid>
      {loading ? (
        <IonRow className="ion-justify-content-center">
          <IonSpinner />
        </IonRow>
      ) : error ? (
        <IonRow>
          <IonCol>
            <IonText color="danger">{error}</IonText>
          </IonCol>
        </IonRow>
      ) : (
        <>
          <IonRow className="ion-align-items-center ion-justify-content-between">
            <IonCol size='9'>
              <IonSearchbar
                value={searchTerm}
                onIonInput={(e: any) => setSearchTerm(e.target.value)}
                debounce={0} // To update instantly as the user types
                placeholder="Search by Patient ID"
              />
              </IonCol>
              <IonCol>
              
          <IonButton onClick={clearFilters} color="warning">
            Clear Filters
          </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonRow>
                <IonCol size="6">
                  <IonText color="primary">
                    <h3>Start Date</h3>
                  </IonText>
                  <IonInput
                    value={startDate}
                    onIonChange={(e: any) => setStartDate(e.target.value)}
                    type="datetime-local"
                  />
                </IonCol>
                <IonCol size="6">
                  <IonText color="primary">
                    <h3>End Date</h3>
                  </IonText>
                  <IonInput
                    value={endDate}
                    onIonChange={(e: any) => setEndDate(e.target.value)}
                    type="datetime-local"
                  />
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>


          <IonRow>
            <IonCol size="3">
              <IonText color="primary">
                <h3>Patient ID</h3>
              </IonText>
            </IonCol>
            <IonCol size="3">
              <IonText color="primary">
                <h3>Medicine ID</h3>
              </IonText>
            </IonCol>
            <IonCol size="3">
              <IonText color="primary">
                <h3>Status</h3>
              </IonText>
            </IonCol>
            <IonCol size="3">
              <IonText color="primary">
                <h3>Timestamp</h3>
              </IonText>
            </IonCol>
          </IonRow>

          {filteredLogs.map((log) => (
            <IonRow key={log.id}>
              <IonCol size="3">
                <IonCard>
                  <IonCardContent>{log.user_id}</IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="3">
                <IonCard>
                  <IonCardContent>{log.medicine_id}</IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="3">
                <IonCard color={log.status === 'taken' ? 'success' : 'danger'}>
                  <IonCardContent>{log.status}</IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="3">
                <IonCard>
                  <IonCardContent>{new Date(log.timestamp).toLocaleString()}</IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          ))}

          <IonToast
            isOpen={!!toastMessage}
            message={toastMessage || ''}
            duration={3000}
            onDidDismiss={() => setToastMessage(null)}
          />
        </>
      )}
    </IonGrid>
  );
};

export default LogTable;
