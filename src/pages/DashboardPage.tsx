import { useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FilterBar from '@/components/FilterBar';
import LetterCard from '@/components/LetterCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StudentPasswordDialog from '@/components/StudentPasswordDialog';

const DashboardPage = () => {
  const { 
    currentReviewer, 
    filteredLetters,
    filterByStatus,
    setFilterByStatus,
    students,
  } = useApp();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!currentReviewer) {
      navigate('/');
    }
  }, [currentReviewer, navigate]);
  
  if (!currentReviewer) {
    return null; // Will redirect
  }
  
  const pendingCount = filteredLetters.filter(l => l.status === 'pending').length;
  const approvedCount = filteredLetters.filter(l => l.status === 'approved').length;
  const deniedCount = filteredLetters.filter(l => l.status === 'denied').length;
  
  const handleTabChange = (value: string) => {
    if (value === 'all') {
      setFilterByStatus(null);
    } else {
      setFilterByStatus(value as any);
    }
  };
  
  const activeTab = filterByStatus || 'all';
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Reviewer Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Review and manage student excuse letters
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-lg flex justify-between items-center">
              <span>Pending</span>
              <span className="bg-status-pending text-white px-2 py-0.5 rounded-full text-sm">
                {pendingCount}
              </span>
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-lg flex justify-between items-center">
              <span>Approved</span>
              <span className="bg-status-approved text-white px-2 py-0.5 rounded-full text-sm">
                {approvedCount}
              </span>
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-lg flex justify-between items-center">
              <span>Denied</span>
              <span className="bg-status-denied text-white px-2 py-0.5 rounded-full text-sm">
                {deniedCount}
              </span>
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
      
      {currentReviewer?.role === 'admin' && (
        <Card className="mb-6">
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
      )}
      
      <FilterBar />
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Excuse Letters</CardTitle>
          <CardDescription>
            Review and process student excuse letter submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="denied">Denied</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              {filteredLetters.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No excuse letters found matching your filters
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredLetters.map((letter) => (
                    <LetterCard key={letter.id} letter={letter} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
