
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from '@/components/ui/select';

interface ReviewerLogin {
  onSuccess?: () => void;
}

const ReviewerLogin = ({ onSuccess }: ReviewerLogin) => {
  const { reviewers, loginAsReviewer } = useApp();
  const [selectedReviewer, setSelectedReviewer] = useState("");
  const [password, setPassword] = useState("");
  
  const handleLogin = () => {
    if (!selectedReviewer || !password) {
      return;
    }

    // Mock password validation - in a real app, this would be handled securely
    const mockPasswords = {
      'R001': 'teacher123',
      'R002': 'guidance123',
      'R003': 'admin123'
    };

    if (mockPasswords[selectedReviewer as keyof typeof mockPasswords] === password) {
      loginAsReviewer(selectedReviewer);
      if (onSuccess) onSuccess();
      setPassword("");
    } else {
      toast.error("Invalid password");
    }
  };
  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Reviewer Login</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="reviewer">Select Reviewer</Label>
          <Select value={selectedReviewer} onValueChange={setSelectedReviewer}>
            <SelectTrigger>
              <SelectValue placeholder="Select a reviewer" />
            </SelectTrigger>
            <SelectContent>
              {reviewers.map(reviewer => (
                <SelectItem key={reviewer.id} value={reviewer.id}>
                  {reviewer.name} ({reviewer.role})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        
        <Button 
          className="w-full" 
          onClick={handleLogin} 
          disabled={!selectedReviewer || !password}
        >
          Login as Reviewer
        </Button>
        
        <div className="text-sm text-gray-500 mt-4">
          <p className="mb-2">Demo Reviewer Credentials:</p>
          <ul className="list-disc pl-5">
            <li>Ms. Johnson (teacher) - Password: teacher123</li>
            <li>Mr. Terrific (guidance) - Password: guidance123</li>
            <li>Dr. Strange (admin) - Password: admin123</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReviewerLogin;
