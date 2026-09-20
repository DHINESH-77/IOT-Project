import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import TelemetryHeader from '../components/TelemetryHeader';
import DigitalTwin from '../components/DigitalTwin';
import SchemeManager from '../components/SchemeManager';
import AnalyticsChart from '../components/AnalyticsChart';

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <TelemetryHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[640px]">
        {/* Left Column (Digital Twin + Analytics) */}
        <div className="lg:col-span-1 flex flex-col gap-6 h-full">
          <div className="h-[280px]">
            <DigitalTwin />
          </div>
          <div className="flex-1 min-h-[300px]">
            <AnalyticsChart />
          </div>
        </div>

        {/* Right Column (Scheme Manager) */}
        <div className="lg:col-span-2 h-[600px] lg:h-full">
          <SchemeManager />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
