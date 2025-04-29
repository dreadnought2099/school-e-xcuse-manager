
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import StudentPasswordDialog from '@/components/StudentPasswordDialog';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewerPasswordDialog from '@/components/ReviewerPasswordDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, UserCog, User, Shield } from 'lucide-react';

const UserManagementPage = () => {
  const { currentReviewer, isAdmin, students, reviewers } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentReviewer || !isAdmin) {
      navigate('/');
    }
  }, [currentReviewer, isAdmin, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-school-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <div className="p-2 bg-school-100 rounded-lg mr-3">
              <UserCog className="h-5 w-5 text-school-700" />
            </div>
            <h1 className="text-3xl font-bold text-school-800">User Management</h1>
          </div>
          <p className="text-gray-600">
            Manage user information and security settings
          </p>
        </div>

        <Tabs defaultValue="students" className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList className="bg-white shadow-sm border border-gray-100">
              <TabsTrigger value="students" className="data-[state=active]:bg-school-50 data-[state=active]:text-school-800">
                <Users className="h-4 w-4 mr-2" />
                Students
              </TabsTrigger>
              <TabsTrigger value="staff" className="data-[state=active]:bg-school-50 data-[state=active]:text-school-800">
                <Shield className="h-4 w-4 mr-2" />
                Staff
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="students" className="animate-fade-in">
            <Card className="border-none shadow-lg bg-white rounded-xl overflow-hidden">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-white to-school-50">
                <div className="flex items-center mb-2">
                  <div className="bg-school-100 p-2 rounded-lg mr-3">
                    <Users className="h-5 w-5 text-school-700" />
                  </div>
                  <CardTitle>Student Management</CardTitle>
                </div>
                <CardDescription>
                  Manage student passwords and account information
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {students.map((student) => (
                    <Card key={student.id} className="bg-white border border-gray-100 shadow-md card-hover">
                      <CardHeader className="pb-3">
                        <div className="flex items-center">
                          <div className="bg-school-100 p-2 rounded-full mr-3">
                            <User className="h-5 w-5 text-school-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{student.name}</CardTitle>
                            <CardDescription className="text-xs">ID: {student.id}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <StudentPasswordDialog student={student} />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staff" className="animate-fade-in">
            <Card className="border-none shadow-lg bg-white rounded-xl overflow-hidden">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-white to-school-50">
                <div className="flex items-center mb-2">
                  <div className="bg-school-100 p-2 rounded-lg mr-3">
                    <Shield className="h-5 w-5 text-school-700" />
                  </div>
                  <CardTitle>Staff Management</CardTitle>
                </div>
                <CardDescription>
                  Manage staff passwords and access levels
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {reviewers.map((reviewer) => (
                    <Card key={reviewer.id} className="bg-white border border-gray-100 shadow-md card-hover">
                      <CardHeader className="pb-3">
                        <div className="flex items-center">
                          <div className="bg-school-100 p-2 rounded-full mr-3">
                            <User className="h-5 w-5 text-school-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{reviewer.name}</CardTitle>
                            <CardDescription className="text-xs">
                              Role: {reviewer.role.charAt(0).toUpperCase() + reviewer.role.slice(1)}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ReviewerPasswordDialog reviewer={reviewer} />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserManagementPage;
