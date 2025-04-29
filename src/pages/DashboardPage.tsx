
import { useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FilterBar from '@/components/FilterBar';
import LetterCard from '@/components/LetterCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileCheck, FileX, Timer, BarChart3 } from 'lucide-react';

const DashboardPage = () => {
  const { 
    currentReviewer, 
    filteredLetters,
    filterByStatus,
    setFilterByStatus,
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
    <div className="min-h-screen bg-gradient-to-br from-school-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-school-800">Staff Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Manage and review student excuse letters
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <FilterBar />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-none shadow-md bg-white card-hover">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="mr-3 bg-amber-100 p-2 rounded-lg">
                    <Timer className="h-5 w-5 text-amber-600" />
                  </div>
                  <CardTitle className="text-lg">Pending</CardTitle>
                </div>
                <span className="bg-status-pending text-white px-3 py-1 rounded-full font-medium inline-flex items-center justify-center min-w-[2rem]">
                  {pendingCount}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-sm">
                {pendingCount === 0 ? "No pending letters to review" : 
                 pendingCount === 1 ? "1 letter awaiting review" :
                 `${pendingCount} letters awaiting review`}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md bg-white card-hover">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="mr-3 bg-green-100 p-2 rounded-lg">
                    <FileCheck className="h-5 w-5 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Approved</CardTitle>
                </div>
                <span className="bg-status-approved text-white px-3 py-1 rounded-full font-medium inline-flex items-center justify-center min-w-[2rem]">
                  {approvedCount}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-sm">
                {approvedCount === 0 ? "No approved letters" : 
                 approvedCount === 1 ? "1 letter approved" :
                 `${approvedCount} letters approved`}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-md bg-white card-hover">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="mr-3 bg-red-100 p-2 rounded-lg">
                    <FileX className="h-5 w-5 text-red-600" />
                  </div>
                  <CardTitle className="text-lg">Denied</CardTitle>
                </div>
                <span className="bg-status-denied text-white px-3 py-1 rounded-full font-medium inline-flex items-center justify-center min-w-[2rem]">
                  {deniedCount}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-sm">
                {deniedCount === 0 ? "No denied letters" : 
                 deniedCount === 1 ? "1 letter denied" :
                 `${deniedCount} letters denied`}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6 border-none shadow-lg overflow-hidden bg-white rounded-xl">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-white to-school-50 flex flex-col md:flex-row justify-between md:items-center">
            <div>
              <div className="flex items-center mb-2">
                <div className="bg-school-100 p-2 rounded-lg mr-3">
                  <BarChart3 className="h-5 w-5 text-school-700" />
                </div>
                <CardTitle>Excuse Letters</CardTitle>
              </div>
              <CardDescription>
                Review and process student submissions
              </CardDescription>
            </div>
            
            <Tabs 
              defaultValue={activeTab} 
              value={activeTab} 
              onValueChange={handleTabChange}
              className="mt-4 md:mt-0"
            >
              <TabsList className="bg-school-50">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="denied">Denied</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                {filteredLetters.length === 0 ? (
                  <div className="text-center py-16 bg-gray-50 rounded-lg mt-6">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-8 w-8 text-gray-400" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-lg">
                      No excuse letters found matching your filters
                    </p>
                    <p className="text-gray-400 mt-2">
                      Try changing your filters or check back later
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                    {filteredLetters.map((letter) => (
                      <div key={letter.id} className="animate-fade-in">
                        <LetterCard letter={letter} />
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="pending">
                {filteredLetters.length === 0 ? (
                  <div className="text-center py-16 bg-gray-50 rounded-lg mt-6">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-8 w-8 text-gray-400" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-lg">
                      No pending letters found
                    </p>
                    <p className="text-gray-400 mt-2">
                      Check back later for new submissions
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                    {filteredLetters.map((letter) => (
                      <div key={letter.id} className="animate-fade-in">
                        <LetterCard letter={letter} />
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="approved">
                {filteredLetters.length === 0 ? (
                  <div className="text-center py-16 bg-gray-50 rounded-lg mt-6">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-8 w-8 text-gray-400" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-lg">
                      No approved letters found
                    </p>
                    <p className="text-gray-400 mt-2">
                      Approved letters will appear here
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                    {filteredLetters.map((letter) => (
                      <div key={letter.id} className="animate-fade-in">
                        <LetterCard letter={letter} />
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="denied">
                {filteredLetters.length === 0 ? (
                  <div className="text-center py-16 bg-gray-50 rounded-lg mt-6">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-8 w-8 text-gray-400" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-lg">
                      No denied letters found
                    </p>
                    <p className="text-gray-400 mt-2">
                      Denied letters will appear here
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                    {filteredLetters.map((letter) => (
                      <div key={letter.id} className="animate-fade-in">
                        <LetterCard letter={letter} />
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
