import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Plus, Globe, Calendar, Clock, MapPin } from 'lucide-react'

const Localization: React.FC = () => {
  const [locales] = useState([
    {
      id: 1,
      language: 'English (UK)',
      code: 'en-GB',
      status: 'active',
      coverage: '100%',
      dateFormat: 'DD/MM/YYYY',
      currency: 'GBP'
    },
    {
      id: 2,
      language: 'English (US)',
      code: 'en-US',
      status: 'active',
      coverage: '95%',
      dateFormat: 'MM/DD/YYYY',
      currency: 'USD'
    },
    {
      id: 3,
      language: 'French',
      code: 'fr-FR',
      status: 'draft',
      coverage: '60%',
      dateFormat: 'DD/MM/YYYY',
      currency: 'EUR'
    }
  ])

  const [holidays] = useState([
    {
      id: 1,
      name: 'New Year\'s Day',
      date: '2025-01-01',
      region: 'UK',
      type: 'public'
    },
    {
      id: 2,
      name: 'Christmas Day',
      date: '2025-12-25',
      region: 'UK',
      type: 'public'
    },
    {
      id: 3,
      name: 'Independence Day',
      date: '2025-07-04',
      region: 'US',
      type: 'public'
    }
  ])

  const [workingHours] = useState([
    {
      id: 1,
      office: 'London Office',
      timezone: 'Europe/London',
      workingDays: 'Mon-Fri',
      hours: '09:00-17:00',
      breaks: '12:00-13:00'
    },
    {
      id: 2,
      office: 'New York Office',
      timezone: 'America/New_York',
      workingDays: 'Mon-Fri',
      hours: '09:00-17:00',
      breaks: '12:00-13:00'
    }
  ])

  return (
    <div className="w-full max-w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Localization, Calendars & Working Time</h1>
          <p className="text-gray-600 mt-2">Manage languages, date formats, holidays, and working hours</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Locale
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Languages</CardTitle>
            <Globe className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-600">Supported locales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Holidays</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-gray-600">This year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Zones</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-600">Active zones</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offices</CardTitle>
            <MapPin className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-600">Configured</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Language & Localization</CardTitle>
            <CardDescription>Manage supported languages and regional formats</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Language</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Coverage</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {locales.map((locale) => (
                  <TableRow key={locale.id}>
                    <TableCell className="font-medium">{locale.language}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{locale.code}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={locale.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                        {locale.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{locale.coverage}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Translate</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Working Hours</CardTitle>
            <CardDescription>Configure office hours and time zones</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Office</TableHead>
                  <TableHead>Timezone</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workingHours.map((office) => (
                  <TableRow key={office.id}>
                    <TableCell className="font-medium">{office.office}</TableCell>
                    <TableCell className="text-xs">{office.timezone}</TableCell>
                    <TableCell className="text-xs">{office.hours}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Holiday Calendar</CardTitle>
          <CardDescription>Manage public holidays and regional observances</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Holiday</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holidays.map((holiday) => (
                <TableRow key={holiday.id}>
                  <TableCell className="font-medium">{holiday.name}</TableCell>
                  <TableCell>{holiday.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{holiday.region}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-blue-100 text-blue-800">{holiday.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Remove</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Localization
