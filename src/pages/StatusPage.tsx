
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
import { ArrowLeft, Lock, User, BookOpen, Eye, EyeOff, Search, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import LetterCard from '@/components/LetterCard';

const StatusPage = () => {
  const { letters, students, currentReviewer, updateStudent } = useApp();
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [searchedId, setSearchedId] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    
    // Simulate network delay for better UX
    setTimeout(() => {
      // Find the student
      const student = students.find(s => s.id === studentId);
      
      if (!student) {
        toast.error("Student ID not found");
        setIsLoading(false);
        return;
      }
      
      // For demo purposes, we'll use the student ID as password by default
      // If a password has been set for the student, use that instead
      const correctPassword = student.password || student.id;
      
      if (password !== correctPassword) {
        toast.error("Incorrect password");
        setIsLoading(false);
        return;
      }
      
      setSearchedId(studentId);
      setIsAuthenticated(true);
      toast.success("Access granted");
      setIsLoading(false);
    }, 600);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-school-100 via-white to-white pb-12">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-2 text-school-700 hover:text-school-800 hover:bg-school-100/50 transition-all"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-school-800">Check Letter Status</h1>
          <p className="text-gray-600 mt-1">
            Verify the status of your submitted excuse letters
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="overflow-hidden border-none shadow-lg bg-white rounded-2xl">
            <CardHeader className="bg-gradient-primary pt-8 pb-12 px-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white/20 rounded-full p-3">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-white text-center">Student Access</CardTitle>
              <CardDescription className="text-white/90 mt-2 text-center">
                Enter your credentials to check letter status
              </CardDescription>
            </CardHeader>
            
            <CardContent className="px-6 pt-0 pb-6 -mt-6 relative z-10">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <form onSubmit={handleSearch} className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="studentId" className="block text-sm font-medium mb-1 text-gray-700 flex items-center">
                      <User className="h-4 w-4 mr-2 text-school-600" />
                      Student ID
                    </label>
                    <div className="relative">
                      <Input
                        id="studentId"
                        placeholder="Enter your student ID"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="bg-gray-50 input-focus border-gray-200 pl-10"
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <User className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-700 flex items-center">
                      <Lock className="h-4 w-4 mr-2 text-school-600" />
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-50 input-focus border-gray-200 pl-10 pr-10"
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Lock className="h-4 w-4" />
                      </div>
                      <button 
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 italic">
                      Default password is your Student ID if not changed
                    </p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full btn-gradient text-white font-medium py-2.5 rounded-lg transition-all"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        View My Letters
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
          
          {searchedId && isAuthenticated && (
            <div className="mt-8 space-y-6 animate-fade-in">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-100">
                <h3 className="font-medium text-xl text-school-800 flex items-center">
                  <div className="bg-school-100 p-2 rounded-full mr-3">
                    <User className="h-5 w-5 text-school-600" />
                  </div>
                  Results for Student ID: {searchedId}
                </h3>
              </div>
              
              {filteredLetters.length === 0 ? (
                <Card className="border-none shadow-md bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden">
                  <CardContent className="p-8 text-center">
                    <div className="bg-gray-50 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-4">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 text-lg">
                      No excuse letters found for this student ID
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/submit')} 
                      className="mt-4"
                    >
                      Submit New Letter
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-100 flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-school-600 mr-2" />
                    <p className="text-gray-700">
                      {filteredLetters.length === 1 ? 'Found 1 letter' : `Found ${filteredLetters.length} letters`}
                    </p>
                  </div>
                  {filteredLetters.map(letter => (
                    <div key={letter.id} className="transform transition-all hover:translate-y-[-2px]">
                      <LetterCard letter={letter} />
                    </div>
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
