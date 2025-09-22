import React, { useState, useEffect } from 'react';
import { FileText, Edit, Save, Users, Target } from 'lucide-react';

interface TrusteesReportProps {
  selectedEntity: string;
  selectedYear: string;
  selectedMode: string;
  selectedFramework: string;
}

const TrusteesReport: React.FC<TrusteesReportProps> = ({
  selectedEntity,
  selectedYear,
  selectedMode,
  selectedFramework
}) => {
  const [activeTab, setActiveTab] = useState('structure');
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState<any>({});
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const tabs = [
    { id: 'structure', label: 'Structure & Management', icon: Users },
    { id: 'achievements', label: 'Achievements & Performance', icon: Target },
    { id: 'financial', label: 'Financial Review', icon: FileText },
    { id: 'governance', label: 'Risk & Controls', icon: FileText }
  ];

  useEffect(() => {
    fetchReportData();
  }, [selectedEntity, selectedYear, selectedMode, selectedFramework]);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/charity-accounts/trustees-report?entity=${selectedEntity}&year=${selectedYear}&mode=${selectedMode}&framework=${selectedFramework}`);
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error('Error fetching trustees report data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSection = async (sectionId: string, content: string) => {
    try {
      await fetch(`http://localhost:8000/charity-accounts/trustees-report/${sectionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, entity: selectedEntity, year: selectedYear })
      });
      setEditingSection(null);
      fetchReportData();
    } catch (error) {
      console.error('Error saving section:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Trustees'/Governors' Report</h1>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
            <FileText className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="bg-white rounded-lg shadow">
        {activeTab === 'structure' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Structure, Governance & Management</h3>
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Governing Document</h4>
                  <button
                    onClick={() => setEditingSection(editingSection === 'governing' ? null : 'governing')}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {editingSection === 'governing' ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  </button>
                </div>
                {editingSection === 'governing' ? (
                  <textarea
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg"
                    defaultValue={reportData.structure?.governing || 'The charity is governed by...'}
                    onBlur={(e) => saveSection('governing', e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-gray-600">
                    {reportData.structure?.governing || 'The charity is governed by its Articles of Association dated [date]. The charity is a company limited by guarantee and is registered with the Charity Commission.'}
                  </p>
                )}
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Recruitment & Appointment</h4>
                  <button
                    onClick={() => setEditingSection(editingSection === 'recruitment' ? null : 'recruitment')}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {editingSection === 'recruitment' ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  </button>
                </div>
                {editingSection === 'recruitment' ? (
                  <textarea
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg"
                    defaultValue={reportData.structure?.recruitment || 'Trustees are recruited...'}
                    onBlur={(e) => saveSection('recruitment', e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-gray-600">
                    {reportData.structure?.recruitment || 'Trustees are recruited through open advertisement and interview process. New trustees receive comprehensive induction training covering their legal obligations and the charity\'s work.'}
                  </p>
                )}
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Organisational Structure</h4>
                  <button
                    onClick={() => setEditingSection(editingSection === 'structure' ? null : 'structure')}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {editingSection === 'structure' ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  </button>
                </div>
                {editingSection === 'structure' ? (
                  <textarea
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg"
                    defaultValue={reportData.structure?.organisation || 'The charity operates...'}
                    onBlur={(e) => saveSection('structure', e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-gray-600">
                    {reportData.structure?.organisation || 'The charity operates through a board of trustees who meet quarterly. Day-to-day management is delegated to the Chief Executive and senior management team.'}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Achievements & Performance</h3>
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Public Benefit</h4>
                  <button
                    onClick={() => setEditingSection(editingSection === 'benefit' ? null : 'benefit')}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {editingSection === 'benefit' ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  </button>
                </div>
                {editingSection === 'benefit' ? (
                  <textarea
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg"
                    defaultValue={reportData.achievements?.benefit || 'The trustees confirm...'}
                    onBlur={(e) => saveSection('benefit', e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-gray-600">
                    {reportData.achievements?.benefit || 'The trustees confirm that they have complied with the duty in section 17 of the Charities Act 2011 to have due regard to public benefit guidance published by the Charity Commission.'}
                  </p>
                )}
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Activities & Achievements</h4>
                  <button
                    onClick={() => setEditingSection(editingSection === 'activities' ? null : 'activities')}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {editingSection === 'activities' ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  </button>
                </div>
                {editingSection === 'activities' ? (
                  <textarea
                    className="w-full h-40 p-3 border border-gray-300 rounded-lg"
                    defaultValue={reportData.achievements?.activities || 'During the year...'}
                    onBlur={(e) => saveSection('activities', e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-gray-600">
                    {reportData.achievements?.activities || 'During the year, the charity continued to deliver its core services and achieved significant milestones in advancing its charitable objectives.'}
                  </p>
                )}
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Key Performance Indicators</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(reportData.achievements?.kpis || []).map((kpi: any, index: number) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">{kpi.value}</div>
                      <div className="text-sm text-gray-600">{kpi.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'financial' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Review & Reserves</h3>
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Financial Performance</h4>
                  <button
                    onClick={() => setEditingSection(editingSection === 'performance' ? null : 'performance')}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {editingSection === 'performance' ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  </button>
                </div>
                {editingSection === 'performance' ? (
                  <textarea
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg"
                    defaultValue={reportData.financial?.performance || 'Total income for the year...'}
                    onBlur={(e) => saveSection('performance', e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-gray-600">
                    {reportData.financial?.performance || 'Total income for the year was £X (2022: £Y), representing an increase/decrease of Z%. This was primarily due to...'}
                  </p>
                )}
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Reserves Policy</h4>
                  <button
                    onClick={() => setEditingSection(editingSection === 'reserves' ? null : 'reserves')}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {editingSection === 'reserves' ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  </button>
                </div>
                {editingSection === 'reserves' ? (
                  <textarea
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg"
                    defaultValue={reportData.financial?.reserves || 'The trustees have established...'}
                    onBlur={(e) => saveSection('reserves', e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-gray-600">
                    {reportData.financial?.reserves || 'The trustees have established a policy whereby unrestricted funds not committed or invested in tangible fixed assets should be maintained at a level equivalent to between three and six months of expenditure.'}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Free Reserves Analysis</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total unrestricted funds:</span>
                      <span className="text-sm font-medium">£{reportData.financial?.freeReserves?.total?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Fixed assets:</span>
                      <span className="text-sm font-medium">£{reportData.financial?.freeReserves?.fixedAssets?.toLocaleString() || 0}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-medium">
                      <span className="text-sm">Free reserves:</span>
                      <span className="text-sm">£{reportData.financial?.freeReserves?.free?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Months of expenditure:</span>
                      <span className="text-sm font-medium">{reportData.financial?.freeReserves?.months || 0}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Going Concern</h4>
                  <p className="text-sm text-gray-600">
                    {reportData.financial?.goingConcern || 'The trustees have assessed the major risks to which the charity is exposed and are satisfied that systems are in place to mitigate exposure to the major risks.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'governance' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Risk Management & Internal Controls</h3>
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Risk Management</h4>
                  <button
                    onClick={() => setEditingSection(editingSection === 'risk' ? null : 'risk')}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {editingSection === 'risk' ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  </button>
                </div>
                {editingSection === 'risk' ? (
                  <textarea
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg"
                    defaultValue={reportData.governance?.risk || 'The trustees have assessed...'}
                    onBlur={(e) => saveSection('risk', e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-gray-600">
                    {reportData.governance?.risk || 'The trustees have assessed the major risks to which the charity is exposed and are satisfied that systems are in place to mitigate exposure to the major risks.'}
                  </p>
                )}
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Internal Controls</h4>
                  <button
                    onClick={() => setEditingSection(editingSection === 'controls' ? null : 'controls')}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {editingSection === 'controls' ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  </button>
                </div>
                {editingSection === 'controls' ? (
                  <textarea
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg"
                    defaultValue={reportData.governance?.controls || 'The charity maintains...'}
                    onBlur={(e) => saveSection('controls', e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-gray-600">
                    {reportData.governance?.controls || 'The charity maintains a comprehensive system of internal controls including financial controls, operational procedures, and regular monitoring and reporting.'}
                  </p>
                )}
              </div>

              {selectedMode === 'academy' && (
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Regularity Statement</h4>
                    <button
                      onClick={() => setEditingSection(editingSection === 'regularity' ? null : 'regularity')}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {editingSection === 'regularity' ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                    </button>
                  </div>
                  {editingSection === 'regularity' ? (
                    <textarea
                      className="w-full h-32 p-3 border border-gray-300 rounded-lg"
                      defaultValue={reportData.governance?.regularity || 'As accounting officer...'}
                      onBlur={(e) => saveSection('regularity', e.target.value)}
                    />
                  ) : (
                    <p className="text-sm text-gray-600">
                      {reportData.governance?.regularity || 'As accounting officer, I confirm that the academy trust has complied with the requirements of the Academy Trust Handbook and that I am not aware of any material irregularities.'}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrusteesReport;
