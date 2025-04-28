
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/context/AppContext';
import StudentPasswordDialog from '@/components/StudentPasswordDialog';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserManagementPage = () => {
  const { currentReviewer, isAdmin, students } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentReviewer || !isAdmin) {
      navigate('/');
    }
  }, [currentReviewer, isAdmin, navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">User Management</h1>
      <p className="text-gray-600 mb-6">
        Manage student information and passwords
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Student Management</CardTitle>
          <CardDescription>Manage student passwords and information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {students.map((student) => (
              <Card key={student.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{student.name}</CardTitle>
                  <CardDescription>ID: {student.id}</CardDescription>
                </CardHeader>
                <CardContent>
                  <StudentPasswordDialog student={student} />
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagementPage;

