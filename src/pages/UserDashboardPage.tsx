import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

// Custom Components
import LuxurySiteHeader from '@/components/layout/LuxurySiteHeader';
import LuxurySiteFooter from '@/components/layout/LuxurySiteFooter';
import CinematicPageTransitionHandler from '@/components/CinematicPageTransitionHandler';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

// Lucide Icons
import { User, Ruler, ClipboardList, Heart, Settings } from 'lucide-react';

const UserDashboardPage = () => {
  console.log('UserDashboardPage loaded');
  const location = useLocation();

  // Placeholder state for profile form
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
  });

  // Placeholder state for measurement form
  const [measurements, setMeasurements] = useState({
    profileName: 'My Default Profile',
    neck: '38',
    chest: '100',
    waist: '85',
    sleeve: '62',
    shirtLength: '75',
  });

  // Placeholder data for orders
  const orders = [
    { id: 'ORD12345', date: '2024-07-15', status: 'Shipped', total: '$250.00', items: ['Custom Silk Shirt'] },
    { id: 'ORD12300', date: '2024-06-20', status: 'Delivered', total: '$180.00', items: ['Linen Trousers'] },
    { id: 'ORD12250', date: '2024-05-10', status: 'Processing', total: '$320.00', items: ['Wool Jacket', 'Cotton Scarf'] },
  ];

  // Placeholder data for saved designs
  const savedDesigns = [
    { id: 'DSGN001', name: 'Evening Gala Shirt', garmentType: 'Shirt', lastModified: '2024-07-20' },
    { id: 'DSGN002', name: 'Summer Casual Blazer', garmentType: 'Blazer', lastModified: '2024-07-18' },
  ];

  // Placeholder state for communication preferences
  const [preferences, setPreferences] = useState({
    newsletter: true,
    orderUpdatesEmail: true,
    orderUpdatesSms: false,
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleMeasurementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeasurements({ ...measurements, [e.target.name]: e.target.value });
  };

  const handlePreferenceChange = (key: keyof typeof preferences, value: boolean) => {
    setPreferences({ ...preferences, [key]: value });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-neutral-50 to-stone-100 dark:from-neutral-900 dark:to-stone-800 text-neutral-800 dark:text-neutral-200">
      <LuxurySiteHeader />
      <CinematicPageTransitionHandler pageKey={location.pathname}>
        <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
          <header className="mb-8 md:mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              My Dashboard
            </h1>
            <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">
              Manage your profile, orders, and designs.
            </p>
          </header>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-6 bg-neutral-200 dark:bg-neutral-800 p-1 rounded-lg">
              <TabsTrigger value="profile" className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-primary dark:data-[state=active]:bg-neutral-700">
                <User className="h-5 w-5" /> Profile
              </TabsTrigger>
              <TabsTrigger value="measurements" className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-primary dark:data-[state=active]:bg-neutral-700">
                <Ruler className="h-5 w-5" /> Measurements
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-primary dark:data-[state=active]:bg-neutral-700">
                <ClipboardList className="h-5 w-5" /> Orders
              </TabsTrigger>
              <TabsTrigger value="designs" className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-primary dark:data-[state=active]:bg-neutral-700">
                <Heart className="h-5 w-5" /> Saved Designs
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center justify-center gap-2 py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-primary dark:data-[state=active]:bg-neutral-700">
                <Settings className="h-5 w-5" /> Preferences
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="shadow-lg border-neutral-200 dark:border-neutral-700 bg-background dark:bg-neutral-800/50">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">Profile Information</CardTitle>
                  <CardDescription className="text-neutral-600 dark:text-neutral-400">View and update your personal details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-neutral-700 dark:text-neutral-300">Full Name</Label>
                    <Input id="name" name="name" value={profile.name} onChange={handleProfileChange} className="bg-neutral-50 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 focus:border-primary dark:focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-neutral-700 dark:text-neutral-300">Email Address</Label>
                    <Input id="email" name="email" type="email" value={profile.email} onChange={handleProfileChange} className="bg-neutral-50 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 focus:border-primary dark:focus:border-primary"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password"className="text-neutral-700 dark:text-neutral-300">Change Password</Label>
                    <Input id="password" type="password" placeholder="New Password" className="bg-neutral-50 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 focus:border-primary dark:focus:border-primary" />
                  </div>
                  <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground dark:bg-primary dark:hover:bg-primary/90 dark:text-primary-foreground">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Measurements Tab */}
            <TabsContent value="measurements">
              <Card className="shadow-lg border-neutral-200 dark:border-neutral-700 bg-background dark:bg-neutral-800/50">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">Measurement Profiles</CardTitle>
                  <CardDescription className="text-neutral-600 dark:text-neutral-400">Manage your saved measurements for a perfect fit.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="profileName" className="text-neutral-700 dark:text-neutral-300">Profile Name</Label>
                    <Input id="profileName" name="profileName" value={measurements.profileName} onChange={handleMeasurementChange} className="bg-neutral-50 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 focus:border-primary dark:focus:border-primary"/>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="neck" className="text-neutral-700 dark:text-neutral-300">Neck (cm)</Label>
                      <Input id="neck" name="neck" type="number" value={measurements.neck} onChange={handleMeasurementChange} className="bg-neutral-50 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 focus:border-primary dark:focus:border-primary"/>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="chest" className="text-neutral-700 dark:text-neutral-300">Chest (cm)</Label>
                      <Input id="chest" name="chest" type="number" value={measurements.chest} onChange={handleMeasurementChange} className="bg-neutral-50 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 focus:border-primary dark:focus:border-primary"/>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="waist" className="text-neutral-700 dark:text-neutral-300">Waist (cm)</Label>
                      <Input id="waist" name="waist" type="number" value={measurements.waist} onChange={handleMeasurementChange} className="bg-neutral-50 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 focus:border-primary dark:focus:border-primary"/>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sleeve" className="text-neutral-700 dark:text-neutral-300">Sleeve Length (cm)</Label>
                      <Input id="sleeve" name="sleeve" type="number" value={measurements.sleeve} onChange={handleMeasurementChange} className="bg-neutral-50 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 focus:border-primary dark:focus:border-primary"/>
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor="shirtLength" className="text-neutral-700 dark:text-neutral-300">Shirt Length (cm)</Label>
                      <Input id="shirtLength" name="shirtLength" type="number" value={measurements.shirtLength} onChange={handleMeasurementChange} className="bg-neutral-50 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 focus:border-primary dark:focus:border-primary"/>
                    </div>
                  </div>
                  <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground dark:bg-primary dark:hover:bg-primary/90 dark:text-primary-foreground">Save Measurement Profile</Button>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 italic">In a full application, a table listing multiple saved measurement profiles with edit/delete options would appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card className="shadow-lg border-neutral-200 dark:border-neutral-700 bg-background dark:bg-neutral-800/50">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">Order History</CardTitle>
                  <CardDescription className="text-neutral-600 dark:text-neutral-400">Review your past and current orders.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption className="text-neutral-500 dark:text-neutral-400">A list of your recent orders.</TableCaption>
                    <TableHeader>
                      <TableRow className="hover:bg-neutral-100 dark:hover:bg-neutral-700/50 border-b border-neutral-200 dark:border-neutral-700">
                        <TableHead className="w-[100px] text-neutral-700 dark:text-neutral-300">Order ID</TableHead>
                        <TableHead className="text-neutral-700 dark:text-neutral-300">Date</TableHead>
                        <TableHead className="text-neutral-700 dark:text-neutral-300">Status</TableHead>
                        <TableHead className="text-neutral-700 dark:text-neutral-300">Items</TableHead>
                        <TableHead className="text-right text-neutral-700 dark:text-neutral-300">Total</TableHead>
                        <TableHead className="text-right text-neutral-700 dark:text-neutral-300">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id} className="hover:bg-neutral-100 dark:hover:bg-neutral-700/50 border-b border-neutral-200 dark:border-neutral-700 last:border-b-0">
                          <TableCell className="font-medium text-neutral-800 dark:text-neutral-200">{order.id}</TableCell>
                          <TableCell className="text-neutral-600 dark:text-neutral-400">{order.date}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                order.status === 'Shipped' ? 'default' :
                                order.status === 'Delivered' ? 'secondary' :
                                'outline'
                              }
                              className={
                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100 border-blue-300 dark:border-blue-500' :
                                order.status === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100 border-green-300 dark:border-green-500' :
                                'text-yellow-700 bg-yellow-50 border-yellow-400 dark:text-yellow-300 dark:bg-yellow-700/30 dark:border-yellow-500'
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-neutral-600 dark:text-neutral-400">{order.items.join(', ')}</TableCell>
                          <TableCell className="text-right text-neutral-800 dark:text-neutral-200">{order.total}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="link" size="sm" className="text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80 px-0">
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {orders.length === 0 && <p className="text-center py-4 text-neutral-500 dark:text-neutral-400">You have no orders yet.</p>}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Saved Designs Tab */}
            <TabsContent value="designs">
              <Card className="shadow-lg border-neutral-200 dark:border-neutral-700 bg-background dark:bg-neutral-800/50">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">Saved Designs</CardTitle>
                  <CardDescription className="text-neutral-600 dark:text-neutral-400">Access and manage your custom designs.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption className="text-neutral-500 dark:text-neutral-400">Your collection of saved garment designs.</TableCaption>
                    <TableHeader>
                      <TableRow className="hover:bg-neutral-100 dark:hover:bg-neutral-700/50 border-b border-neutral-200 dark:border-neutral-700">
                        <TableHead className="text-neutral-700 dark:text-neutral-300">Design Name</TableHead>
                        <TableHead className="text-neutral-700 dark:text-neutral-300">Garment Type</TableHead>
                        <TableHead className="text-neutral-700 dark:text-neutral-300">Last Modified</TableHead>
                        <TableHead className="text-right text-neutral-700 dark:text-neutral-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {savedDesigns.map((design) => (
                        <TableRow key={design.id} className="hover:bg-neutral-100 dark:hover:bg-neutral-700/50 border-b border-neutral-200 dark:border-neutral-700 last:border-b-0">
                          <TableCell className="font-medium text-neutral-800 dark:text-neutral-200">{design.name}</TableCell>
                          <TableCell className="text-neutral-600 dark:text-neutral-400">{design.garmentType}</TableCell>
                          <TableCell className="text-neutral-600 dark:text-neutral-400">{design.lastModified}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10 dark:border-primary dark:text-primary dark:hover:bg-primary/20">
                              View/Edit
                            </Button>
                            <Button variant="destructive" size="sm">Delete</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                   {savedDesigns.length === 0 && <p className="text-center py-4 text-neutral-500 dark:text-neutral-400">You have no saved designs.</p>}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <Card className="shadow-lg border-neutral-200 dark:border-neutral-700 bg-background dark:bg-neutral-800/50">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">Communication Preferences</CardTitle>
                  <CardDescription className="text-neutral-600 dark:text-neutral-400">Manage how we communicate with you.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700/30">
                    <div>
                      <Label htmlFor="newsletter" className="font-medium text-neutral-800 dark:text-neutral-200">Subscribe to Newsletter</Label>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">Receive updates on new collections and offers.</p>
                    </div>
                    <Switch
                      id="newsletter"
                      checked={preferences.newsletter}
                      onCheckedChange={(checked) => handlePreferenceChange('newsletter', checked)}
                      className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-neutral-300 dark:data-[state=unchecked]:bg-neutral-600"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700/30">
                     <div>
                        <Label htmlFor="orderUpdatesEmail" className="font-medium text-neutral-800 dark:text-neutral-200">Order Updates via Email</Label>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">Get notified about your order status through email.</p>
                     </div>
                    <Switch
                      id="orderUpdatesEmail"
                      checked={preferences.orderUpdatesEmail}
                      onCheckedChange={(checked) => handlePreferenceChange('orderUpdatesEmail', checked)}
                      className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-neutral-300 dark:data-[state=unchecked]:bg-neutral-600"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700/30">
                    <div>
                        <Label htmlFor="orderUpdatesSms" className="font-medium text-neutral-800 dark:text-neutral-200">Order Updates via SMS</Label>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">Receive SMS notifications for important order updates.</p>
                    </div>
                    <Switch
                      id="orderUpdatesSms"
                      checked={preferences.orderUpdatesSms}
                      onCheckedChange={(checked) => handlePreferenceChange('orderUpdatesSms', checked)}
                      className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-neutral-300 dark:data-[state=unchecked]:bg-neutral-600"
                    />
                  </div>
                  <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground dark:bg-primary dark:hover:bg-primary/90 dark:text-primary-foreground">Save Preferences</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </CinematicPageTransitionHandler>
      <LuxurySiteFooter />
    </div>
  );
};

export default UserDashboardPage;