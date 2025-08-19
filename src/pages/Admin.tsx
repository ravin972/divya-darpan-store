import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Loader2, Users, ShoppingBag, UserCheck, Crown } from 'lucide-react';

interface UserProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  created_at: string;
  user_roles: { role: string }[];
}

interface Order {
  id: string;
  order_number: string;
  total: number;
  status: string;
  payment_method: string;
  created_at: string;
  profiles: {
    first_name: string;
    last_name: string;
  };
}

interface Pandit {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  experience_years: number;
  specialization: string;
  languages: string[];
  education?: string;
  certifications?: string;
  bio?: string;
  price_per_hour: number;
  location: string;
  verification_status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export default function Admin() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [pandits, setPandits] = useState<Pandit[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState(false);
  
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }

    if (user) {
      checkAdminStatus();
    }
  }, [user, loading, navigate]);

  const checkAdminStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user?.id)
        .eq('role', 'admin')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setIsAdmin(true);
        fetchData();
      } else {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive"
        });
        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
      navigate('/');
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch users
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (usersError) throw usersError;

      // Fetch user roles separately
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Combine users with their roles
      const usersWithRoles = (usersData || []).map(user => ({
        ...user,
        user_roles: (rolesData || []).filter(role => role.user_id === user.user_id).map(role => ({ role: role.role }))
      }));

      // Fetch orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      // Combine orders with user profiles
      const ordersWithProfiles = (ordersData || []).map(order => ({
        ...order,
        profiles: usersWithRoles.find(user => user.user_id === order.user_id) || { first_name: 'Unknown', last_name: 'User' }
      }));

      // Fetch pandits
      const { data: panditsData, error: panditsError } = await supabase
        .from('pandits')
        .select('*')
        .order('created_at', { ascending: false });

      if (panditsError) throw panditsError;

      setUsers(usersWithRoles);
      setOrders(ordersWithProfiles);
      setPandits((panditsData || []).map(p => ({
        ...p,
        verification_status: p.verification_status as 'pending' | 'approved' | 'rejected'
      })));
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const assignRole = async () => {
    if (!selectedUser || !selectedRole) {
      toast({
        title: "Invalid Selection",
        description: "Please select both user and role.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({
          user_id: selectedUser,
          role: selectedRole as 'admin' | 'moderator' | 'user'
        });

      if (error) throw error;

      toast({
        title: "Role Assigned",
        description: "User role has been updated successfully."
      });

      setSelectedUser('');
      setSelectedRole('');
      fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: "Order Updated",
        description: "Order status has been updated successfully."
      });

      fetchData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const updatePanditStatus = async (panditId: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('pandits')
        .update({ 
          verification_status: status,
          verified_by: user?.id,
          verified_at: new Date().toISOString()
        })
        .eq('id', panditId);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Pandit has been ${status}.`,
      });

      fetchData(); // Refresh data
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-sunset py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Crown className="h-8 w-8 text-divine-gold" />
            <h1 className="text-3xl font-bold text-gradient">Admin Dashboard</h1>
          </div>

          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="orders">Order Management</TabsTrigger>
              <TabsTrigger value="pandits">Pandit Applications</TabsTrigger>
              <TabsTrigger value="roles">Role Assignment</TabsTrigger>
            </TabsList>

            {/* User Management */}
            <TabsContent value="users">
              <Card className="card-divine">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Users ({users.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Roles</TableHead>
                        <TableHead>Joined</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            {user.first_name} {user.last_name}
                          </TableCell>
                          <TableCell>{user.phone || 'N/A'}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              {user.user_roles.map((role, index) => (
                                <Badge 
                                  key={index} 
                                  variant={role.role === 'admin' ? 'destructive' : 'secondary'}
                                >
                                  {role.role}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(user.created_at).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Order Management */}
            <TabsContent value="orders">
              <Card className="card-divine">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Orders ({orders.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order Number</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-mono">
                            {order.order_number}
                          </TableCell>
                          <TableCell>
                            {order.profiles?.first_name} {order.profiles?.last_name}
                          </TableCell>
                          <TableCell>₹{order.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {order.payment_method.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                order.status === 'delivered' ? 'default' :
                                order.status === 'shipped' ? 'secondary' :
                                order.status === 'cancelled' ? 'destructive' : 'outline'
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(order.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Select
                              value={order.status}
                              onValueChange={(value) => updateOrderStatus(order.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Role Assignment */}
            <TabsContent value="roles">
              <Card className="card-divine">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5" />
                    Role Assignment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="user-select">Select User</Label>
                      <Select value={selectedUser} onValueChange={setSelectedUser}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a user" />
                        </SelectTrigger>
                        <SelectContent>
                          {users.map((user) => (
                            <SelectItem key={user.user_id} value={user.user_id}>
                              {user.first_name} {user.last_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role-select">Select Role</Label>
                      <Select value={selectedRole} onValueChange={setSelectedRole}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="moderator">Moderator</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>&nbsp;</Label>
                      <Button onClick={assignRole} className="w-full btn-divine">
                        Assign Role
                      </Button>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Role Descriptions</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li><strong>User:</strong> Basic customer access with ability to place orders</li>
                      <li><strong>Moderator:</strong> Can view orders and manage basic content</li>
                      <li><strong>Admin:</strong> Full access to all admin features and user management</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          {/* Pandit Applications Tab */}
          <TabsContent value="pandits" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pandit Applications</CardTitle>
                <CardDescription>
                  Review and approve pandit registrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse bg-muted h-20 rounded"></div>
                    ))}
                  </div>
                ) : pandits.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No pandit applications found.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pandits.map((pandit) => (
                      <Card key={pandit.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold">{pandit.name}</h3>
                              <Badge 
                                variant={
                                  pandit.verification_status === 'approved' ? 'default' :
                                  pandit.verification_status === 'rejected' ? 'destructive' : 'secondary'
                                }
                              >
                                {pandit.verification_status}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                              <p><strong>Email:</strong> {pandit.email}</p>
                              <p><strong>Phone:</strong> {pandit.phone}</p>
                              <p><strong>Experience:</strong> {pandit.experience_years} years</p>
                              <p><strong>Specialization:</strong> {pandit.specialization}</p>
                              <p><strong>Location:</strong> {pandit.location}</p>
                              <p><strong>Price:</strong> ₹{pandit.price_per_hour}/hour</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm"><strong>Languages:</strong> {pandit.languages.join(', ')}</p>
                              {pandit.education && (
                                <p className="text-sm"><strong>Education:</strong> {pandit.education}</p>
                              )}
                              {pandit.certifications && (
                                <p className="text-sm"><strong>Certifications:</strong> {pandit.certifications}</p>
                              )}
                              {pandit.bio && (
                                <p className="text-sm"><strong>Bio:</strong> {pandit.bio}</p>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Applied: {new Date(pandit.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          
                          {pandit.verification_status === 'pending' && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => updatePanditStatus(pandit.id, 'approved')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updatePanditStatus(pandit.id, 'rejected')}
                              >
                                Reject
                              </Button>
                            </div>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </div>
  );
}