import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { FileText, Upload, Download, CheckCircle, AlertTriangle, Tag, Code } from 'lucide-react';

interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  uploaded_date: string;
  status: 'uploaded' | 'processing' | 'tagged' | 'validated' | 'error';
}

interface IXBRLTag {
  id: string;
  element: string;
  value: string;
  context: string;
  unit?: string;
  status: 'tagged' | 'validated' | 'error';
}

const AttachmentsIXBRL: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('attachments');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [ixbrlTags, setIXBRLTags] = useState<IXBRLTag[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setAttachments([
          {
            id: '1',
            name: 'CT600_2023_24.pdf',
            type: 'PDF',
            size: 2048576,
            uploaded_date: '2024-01-15',
            status: 'validated'
          },
          {
            id: '2',
            name: 'Accounts_2023.pdf',
            type: 'PDF',
            size: 1536000,
            uploaded_date: '2024-01-10',
            status: 'tagged'
          },
          {
            id: '3',
            name: 'Capital_Allowances_Schedule.xlsx',
            type: 'Excel',
            size: 512000,
            uploaded_date: '2024-01-12',
            status: 'uploaded'
          }
        ]);

        setIXBRLTags([
          {
            id: '1',
            element: 'TotalTaxableProfit',
            value: '183500',
            context: 'Period_2023',
            unit: 'GBP',
            status: 'validated'
          },
          {
            id: '2',
            element: 'CorporationTaxLiability',
            value: '35000',
            context: 'Period_2023',
            unit: 'GBP',
            status: 'validated'
          },
          {
            id: '3',
            element: 'CapitalAllowances',
            value: '28500',
            context: 'Period_2023',
            unit: 'GBP',
            status: 'tagged'
          }
        ]);
      } catch (error) {
        console.error('Error fetching attachments data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const kpiCards = [
    {
      title: 'Total Attachments',
      value: attachments.length.toString(),
      change: '3 files uploaded',
      trend: 'up' as const,
      icon: FileText
    },
    {
      title: 'iXBRL Tags',
      value: ixbrlTags.length.toString(),
      change: '2 validated',
      trend: 'up' as const,
      icon: Tag
    },
    {
      title: 'File Size',
      value: `${Math.round(attachments.reduce((sum, att) => sum + att.size, 0) / 1024 / 1024 * 10) / 10}MB`,
      change: 'Total uploaded',
      trend: 'up' as const,
      icon: Upload
    },
    {
      title: 'Validation Status',
      value: '85%',
      change: 'Complete',
      trend: 'up' as const,
      icon: CheckCircle
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'uploaded':
        return <Badge className="bg-blue-100 text-blue-800">Uploaded</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>;
      case 'tagged':
        return <Badge className="bg-orange-100 text-orange-800">Tagged</Badge>;
      case 'validated':
        return <Badge className="bg-green-100 text-green-800">Validated</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  <p className={`text-sm ${
                    card.trend === 'up' ? 'text-green-600' : 
                    card.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {card.change}
                  </p>
                </div>
                <card.icon className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="attachments">Attachments</TabsTrigger>
          <TabsTrigger value="ixbrl">iXBRL Tagging</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
          <TabsTrigger value="export">Export & Filing</TabsTrigger>
        </TabsList>

        <TabsContent value="attachments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-500" />
                Document Attachments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download All
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>File Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attachments.map((attachment) => (
                      <TableRow key={attachment.id}>
                        <TableCell className="font-medium">{attachment.name}</TableCell>
                        <TableCell>{attachment.type}</TableCell>
                        <TableCell>{Math.round(attachment.size / 1024)}KB</TableCell>
                        <TableCell>{new Date(attachment.uploaded_date).toLocaleDateString()}</TableCell>
                        <TableCell>{getStatusBadge(attachment.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">
                              <Download className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Tag className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ixbrl" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-orange-500" />
                iXBRL Tagging
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Tagging Progress</h4>
                  <div className="w-full bg-blue-200 rounded-full h-3">
                    <div className="bg-blue-600 h-3 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <p className="text-sm text-blue-700 mt-2">75% of required elements tagged</p>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Element</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Context</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ixbrlTags.map((tag) => (
                      <TableRow key={tag.id}>
                        <TableCell className="font-medium">{tag.element}</TableCell>
                        <TableCell>£{parseInt(tag.value).toLocaleString()}</TableCell>
                        <TableCell>{tag.context}</TableCell>
                        <TableCell>{tag.unit}</TableCell>
                        <TableCell>{getStatusBadge(tag.status)}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex gap-2">
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Tag className="h-4 w-4 mr-2" />
                    Auto-Tag
                  </Button>
                  <Button variant="outline">Import Taxonomy</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-orange-500" />
                Validation Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-800">Passed</span>
                    </div>
                    <p className="text-2xl font-bold text-green-900">15</p>
                    <p className="text-sm text-green-700">Validation rules</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <span className="font-semibold text-yellow-800">Warnings</span>
                    </div>
                    <p className="text-2xl font-bold text-yellow-900">3</p>
                    <p className="text-sm text-yellow-700">Minor issues</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <span className="font-semibold text-red-800">Errors</span>
                    </div>
                    <p className="text-2xl font-bold text-red-900">0</p>
                    <p className="text-sm text-red-700">Critical issues</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Validation Issues</h4>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium">Warning: Missing optional element</span>
                    </div>
                    <p className="text-sm text-yellow-700 mt-1">
                      Element 'AverageNumberEmployees' is recommended but not tagged
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Run Validation
                  </Button>
                  <Button variant="outline">Export Report</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-orange-500" />
                Export & Filing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Export Options</h4>
                    <div className="space-y-2">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600">
                        <Download className="h-4 w-4 mr-2" />
                        Export iXBRL Package
                      </Button>
                      <Button variant="outline" className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        Export PDF Bundle
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Code className="h-4 w-4 mr-2" />
                        Export XML Data
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Filing Status</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Companies House:</span>
                        <Badge className="bg-green-100 text-green-800">Ready</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>HMRC CT600:</span>
                        <Badge className="bg-green-100 text-green-800">Ready</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>iXBRL Validation:</span>
                        <Badge className="bg-green-100 text-green-800">Passed</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-800">Ready for Filing</span>
                  </div>
                  <p className="text-sm text-green-700">
                    All attachments are validated and ready for submission to HMRC and Companies House.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Upload className="h-4 w-4 mr-2" />
                    Submit to HMRC
                  </Button>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    File with Companies House
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AttachmentsIXBRL;
