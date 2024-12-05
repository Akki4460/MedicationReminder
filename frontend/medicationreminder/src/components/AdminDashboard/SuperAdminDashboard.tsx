import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import { getAcknowledgmentLogs } from '../../services/adminService';
import LogTable from './LogTable';
import FilterForm from './FilterForm';
import LogoutButton from '../LogOut/LogOut';

const SuperAdminDashboard: React.FC = () => {
    const [logs, setLogs] = useState<any[]>([]);
    const [filters, setFilters] = useState({ patient_id: '', start_date: '', end_date: '' });

    const fetchLogs = async () => {
        try {
            const result = await getAcknowledgmentLogs(filters);
            setLogs(result.data);
        } catch (error) {
            console.error('Failed to fetch acknowledgment logs', error);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, [filters]); // Re-fetch logs whenever filters change

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonGrid>
                        <IonRow className="ion-align-items-center ion-justify-content-between">
                            <IonCol size="9">
                                <IonTitle>Super Admin Dashboard</IonTitle>
                            </IonCol>
                            <IonCol size="3" className="ion-text-right">
                                <LogoutButton />
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonToolbar>
            </IonHeader>
            <IonContent className="dashboard-content">
                <IonGrid>
                    <IonRow className="ion-justify-content-center">
                        <IonCol size="12" sizeMd="10" sizeLg="8">
                            {/* <FilterForm filters={filters} setFilters={setFilters} onApplyFilters={fetchLogs} /> */}
                            {/* <IonButton expand="full" onClick={fetchLogs}>Fetch Logs</IonButton> */}
                            <LogTable />
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default SuperAdminDashboard;
