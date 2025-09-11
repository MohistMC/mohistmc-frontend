
// src/app/analytics/network/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import NetworkAnalytics from '@/components/analytics/NetworkAnalytics';

// Define data types
interface PacketTypeData {
    bytes: number;
    packets: number;
    bytesPerSecond: number;
    packetsPerSecond: number;
}

interface NetworkData {
    totalBytes: number;
    totalPackets: number;
    bytesPerSecond: number;
    packetsPerSecond: number;
    timestamp: string;
    packetTypes: {
        [key: string]: PacketTypeData;
    };
}

const NetworkAnalyticsPage: React.FC = () => {
    const [networkData, setNetworkData] = useState<NetworkData | null>(null);

    // Restore data from localStorage when loading on client
    useEffect(() => {
        try {
            const savedData = localStorage.getItem('networkAnalyticsData');
            if (savedData) {
                setNetworkData(JSON.parse(savedData));
            }
        } catch (error) {
            console.error('Failed to load data from localStorage:', error);
        }
    }, []);

    return (
        <div className="container mx-auto p-4 max-w-7xl min-h-screen">
            <NetworkAnalytics
                initialData={networkData}
                onDataLoad={(data) => {
                    try {
                        localStorage.setItem('networkAnalyticsData', JSON.stringify(data));
                    } catch (error) {
                        console.error('Failed to save data to localStorage:', error);
                    }
                }}
                onReset={() => {
                    try {
                        localStorage.removeItem('networkAnalyticsData');
                        setNetworkData(null);
                    } catch (error) {
                        console.error('Failed to clear saved data:', error);
                    }
                }}
            />
        </div>
    );
};

export default NetworkAnalyticsPage;