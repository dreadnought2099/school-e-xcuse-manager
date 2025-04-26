
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
import { SearchIcon } from 'lucide-react';
import LetterCard from '@/components/LetterCard';

const StatusPage = () => {
  const { letters } = useApp();
  const [studentId, setStudentId] = useState('');
  const [searchedId, setSearchedId] = useState('');
  
  const filteredLetters = searchedId
    ? letters.filter(letter => letter.studentId === searchedId)
    : [];
    
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchedId(studentId);
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Check Status</CardTitle>
            <CardDescription>
              Enter your student ID to check the status of your excuse letters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
              <Input
                placeholder="Enter your student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                <SearchIcon className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>
            
            {searchedId && (
              <div className="space-y-4">
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
