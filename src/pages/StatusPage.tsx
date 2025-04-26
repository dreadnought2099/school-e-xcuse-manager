
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon, Lock } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import LetterCard from '@/components/LetterCard';

const StatusPage = () => {
  const { letters, students } = useApp();
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [searchedId, setSearchedId] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
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
    
    // For demo purposes, we'll use a simple password check
    // In a real app, this should use proper authentication
    if (password !== student.id) { // Using student ID as password for demo
      toast.error("Incorrect password");
      return;
    }
    
    setSearchedId(studentId);
    setIsAuthenticated(true);
    toast.success("Access granted");
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Check Status</CardTitle>
            <CardDescription>
              Enter your student ID and password to check the status of your excuse letters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label htmlFor="studentId" className="block text-sm font-medium mb-1">
                  Student ID
                </label>
                <Input
                  id="studentId"
                  placeholder="Enter your student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <Button type="submit" className="w-full">
                <SearchIcon className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>
            
            {searchedId && isAuthenticated && (
              <div className="space-y-4 mt-6">
                <h3 className="font-medium">
                  Results for Student ID: {searchedId}
                </h3>
                
                {filteredLetters.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No excuse letters found for this student ID
                    </p>
                  </div>
                ) : (
                  filteredLetters.map(letter => (
                    <LetterCard key={letter.id} letter={letter} />
                  ))
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatusPage;
