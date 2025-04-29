
import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon, ArrowLeft, Lock, User } from 'lucide-react';
import { toast } from 'sonner';
import LetterCard from '@/components/LetterCard';

const StatusPage = () => {
  const { letters, students, currentReviewer, updateStudent } = useApp();
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [searchedId, setSearchedId] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  // Redirect reviewers to dashboard
  useEffect(() => {
    if (currentReviewer) {
      navigate('/dashboard');
    }
  }, [currentReviewer, navigate]);
  
  const filteredLetters = searchedId && isAuthenticated
    ? letters.filter(letter => letter.studentId === searchedId)
    : [];
    
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Find the student
    const student = students.find(s => s.id === studentId);
    
    if (!student) {
      toast.error("Student ID not found");
      return;
    }
    
    // For demo purposes, we'll use the student ID as password by default
    // If a password has been set for the student, use that instead
    const correctPassword = student.password || student.id;
    
    if (password !== correctPassword) {
      toast.error("Incorrect password");
      return;
    }
    
    setSearchedId(studentId);
    setIsAuthenticated(true);
    toast.success("Access granted");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-8 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 transition-all"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="max-w-md mx-auto">
          <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg pb-8 pt-10">
              <CardTitle className="text-3xl font-light">Check Status</CardTitle>
              <CardDescription className="text-indigo-100 mt-2 font-light">
                Enter your student ID and password to view your excuse letters
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pt-8 pb-6 -mt-4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <form onSubmit={handleSearch} className="space-y-5">
                  <div className="relative">
                    <label htmlFor="studentId" className="block text-sm font-medium mb-2 text-gray-700">
                      Student ID
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="studentId"
                        placeholder="Enter your student ID"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="pl-10 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2.5 rounded-lg transition-all"
                  >
                    <SearchIcon className="h-4 w-4 mr-2" />
                    View My Letters
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
          
          {searchedId && isAuthenticated && (
            <div className="mt-8 space-y-6 animate-fade-in">
              <h3 className="font-medium text-xl text-indigo-800 flex items-center">
                <span className="bg-indigo-100 p-2 rounded-full mr-3">
                  <User className="h-5 w-5 text-indigo-600" />
                </span>
                Results for Student ID: {searchedId}
              </h3>
              
              {filteredLetters.length === 0 ? (
                <Card className="border-none shadow-md bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <div className="bg-gray-50 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4">
                      <SearchIcon className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 text-lg">
                      No excuse letters found for this student ID
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredLetters.map(letter => (
                    <LetterCard key={letter.id} letter={letter} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusPage;
