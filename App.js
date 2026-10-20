import React, { useState } from 'react';
import './App.css';
import SmartTaskCounter from './SmartTaskCounter.js';
import LiveSearchandTimer from './LiveSearchandTimer.js';
import AccessibleFormToolkit from './AccessibleFormToolkit.js';
import ApplicationPreferencesApp from './ApplicationPreferences.js';
import ProductExplorer from './ProductExplorerPerformanceRepair.js';
import IssueTracker from './IssueTrackerStateEngine.js';

export default function App() {
  const [activeTab, setActiveTab] = useState(1);

  const exams = [
    { id: 1, label: 'Exam 1: Task Counter', component: <SmartTaskCounter /> },
    { id: 2, label: 'Exam 2: Search & Timer', component: <LiveSearchandTimer /> },
    { id: 3, label: 'Exam 3: Accessible Form', component: <AccessibleFormToolkit /> },
    { id: 4, label: 'Exam 4: App Preferences', component: <ApplicationPreferencesApp /> },
    { id: 5, label: 'Exam 5: Product Explorer', component: <ProductExplorer /> },
    { id: 6, label: 'Exam 6: Issue Tracker', component: <IssueTracker /> },
  ];

  return (
    <div className="suite-container">
      <header className="suite-header">
        <span className="suite-badge">Midterm Practical</span>
        <h1 className="suite-title">React Hooks Practical Exam Suite</h1>
        <p className="suite-subtitle">Interactive showcase for all 6 practical exam problems</p>
      </header>

      {/* Styled tab bar */}
      <nav className="tabs-wrapper">
        {exams.map(e => (
          <button
            key={e.id}
            onClick={() => setActiveTab(e.id)}
            className={`tab-btn ${activeTab === e.id ? 'active' : ''}`}
          >
            {e.label}
          </button>
        ))}
      </nav>

      <main className="exam-stage" key={activeTab}>
        {exams.find(e => e.id === activeTab)?.component}
      </main>
    </div>
  );
}
