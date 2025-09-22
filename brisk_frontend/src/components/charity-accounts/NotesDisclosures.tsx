import React, { useState, useEffect } from 'react';
import { FileText, Edit, Save, Eye } from 'lucide-react';

interface NotesDisclosuresProps {
  selectedEntity: string;
  selectedYear: string;
  selectedMode: string;
  selectedFramework: string;
}

const NotesDisclosures: React.FC<NotesDisclosuresProps> = ({
  selectedEntity,
  selectedYear,
  selectedMode,
  selectedFramework
}) => {
  const [activeTab, setActiveTab] = useState('policies');
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<any>({});
  const [editingNote, setEditingNote] = useState<string | null>(null);

  const tabs = [
    { id: 'policies', label: 'Accounting Policies', icon: FileText },
    { id: 'funds', label: 'Fund Notes', icon: FileText },
    { id: 'grants', label: 'Grants & Donations', icon: FileText },
    { id: 'assets', label: 'Tangible Assets', icon: FileText },
    { id: 'staff', label: 'Staff Costs', icon: FileText },
    { id: 'commitments', label: 'Commitments', icon: FileText }
  ];

  useEffect(() => {
    fetchNotesData();
  }, [selectedEntity, selectedYear, selectedMode, selectedFramework]);

  const fetchNotesData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/charity-accounts/notes-disclosures?entity=${selectedEntity}&year=${selectedYear}&mode=${selectedMode}&framework=${selectedFramework}`);
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveNote = async (noteId: string, content: string) => {
    try {
      await fetch(`http://localhost:8000/charity-accounts/notes-disclosures/${noteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, entity: selectedEntity, year: selectedYear })
      });
      setEditingNote(null);
      fetchNotesData();
    } catch (error) {
      console.error('Error saving note:', error);
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
        <h1 className="text-2xl font-bold text-gray-900">Notes & Disclosures</h1>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            <Eye className="w-4 h-4" />
            <span>Preview Accounts</span>
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
        {activeTab === 'policies' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Accounting Policies</h3>
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Basis of Preparation</h4>
                  <button
                    onClick={() => setEditingNote(editingNote === 'basis' ? null : 'basis')}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {editingNote === 'basis' ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  </button>
                </div>
                {editingNote === 'basis' ? (
                  <textarea
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg"
                    defaultValue={notes.policies?.basis || 'The financial statements have been prepared in accordance with...'}
                    onBlur={(e) => saveNote('basis', e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-gray-600">
                    {notes.policies?.basis || 'The financial statements have been prepared in accordance with Accounting and Reporting by Charities: Statement of Recommended Practice applicable to charities preparing their accounts in accordance with the Financial Reporting Standard applicable in the UK and Republic of Ireland (FRS 102).'}
                  </p>
                )}
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Income Recognition</h4>
                  <button
                    onClick={() => setEditingNote(editingNote === 'income' ? null : 'income')}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {editingNote === 'income' ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  </button>
                </div>
                {editingNote === 'income' ? (
                  <textarea
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg"
                    defaultValue={notes.policies?.income || 'Income is recognised when...'}
                    onBlur={(e) => saveNote('income', e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-gray-600">
                    {notes.policies?.income || 'Income is recognised when the charity has entitlement to the funds, any performance conditions attached have been met, it is probable that the income will be received and the amount can be measured reliably.'}
                  </p>
                )}
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">Fund Accounting</h4>
                  <button
                    onClick={() => setEditingNote(editingNote === 'funds' ? null : 'funds')}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {editingNote === 'funds' ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  </button>
                </div>
                {editingNote === 'funds' ? (
                  <textarea
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg"
                    defaultValue={notes.policies?.funds || 'Unrestricted funds...'}
                    onBlur={(e) => saveNote('funds', e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-gray-600">
                    {notes.policies?.funds || 'Unrestricted funds are available for use at the discretion of the trustees. Restricted funds are subject to specific conditions imposed by donors. Endowment funds represent capital which must be maintained and invested to generate income.'}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'funds' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Fund Analysis</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fund</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opening Balance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Income</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expenditure</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transfers</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Closing Balance</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(notes.fundAnalysis || []).map((fund: any, index: number) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{fund.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{fund.opening?.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{fund.income?.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{fund.expenditure?.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{fund.transfers?.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">£{fund.closing?.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'grants' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Grants & Donations Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Major Grants</h4>
                <div className="space-y-3">
                  {(notes.majorGrants || []).map((grant: any, index: number) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{grant.donor}</p>
                          <p className="text-xs text-gray-600">{grant.purpose}</p>
                        </div>
                        <span className="text-sm font-medium">£{grant.amount?.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Deferred Income</h4>
                <div className="space-y-3">
                  {(notes.deferredIncome || []).map((item: any, index: number) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{item.description}</p>
                          <p className="text-xs text-gray-600">Release: {item.releaseDate}</p>
                        </div>
                        <span className="text-sm font-medium">£{item.amount?.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'assets' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Tangible Fixed Assets</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost b/f</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Additions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disposals</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost c/f</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NBV</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(notes.fixedAssets || []).map((asset: any, index: number) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{asset.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{asset.costBf?.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{asset.additions?.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{asset.disposals?.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{asset.costCf?.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">£{asset.nbv?.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'staff' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Staff Costs Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Staff Costs</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Wages and salaries:</span>
                    <span className="text-sm font-medium">£{notes.staffCosts?.wages?.toLocaleString() || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Social security costs:</span>
                    <span className="text-sm font-medium">£{notes.staffCosts?.socialSecurity?.toLocaleString() || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Pension costs:</span>
                    <span className="text-sm font-medium">£{notes.staffCosts?.pensions?.toLocaleString() || 0}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span className="text-sm">Total:</span>
                    <span className="text-sm">£{notes.staffCosts?.total?.toLocaleString() || 0}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Average Headcount</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Teaching staff:</span>
                    <span className="text-sm font-medium">{notes.headcount?.teaching || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Support staff:</span>
                    <span className="text-sm font-medium">{notes.headcount?.support || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Management:</span>
                    <span className="text-sm font-medium">{notes.headcount?.management || 0}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span className="text-sm">Total:</span>
                    <span className="text-sm">{notes.headcount?.total || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'commitments' && (
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Commitments & Contingencies</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Operating Lease Commitments</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Land & Buildings</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Other</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {(notes.leaseCommitments || []).map((commitment: any, index: number) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{commitment.period}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{commitment.landBuildings?.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">£{commitment.other?.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">£{commitment.total?.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Capital Commitments</h4>
                <p className="text-sm text-gray-600">
                  {notes.capitalCommitments || 'The charity had no material capital commitments at the year end.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesDisclosures;
