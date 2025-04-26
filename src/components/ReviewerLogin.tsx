
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from '@/components/ui/select';

interface ReviewerLoginProps {
  onSuccess?: () => void;
}

const ReviewerLogin = ({ onSuccess }: ReviewerLoginProps) => {
  const { reviewers, loginAsReviewer } = useApp();
  const [selectedReviewer, setSelectedReviewer] = useState("");
  
  const handleLogin = () => {
    if (selectedReviewer) {
      loginAsReviewer(selectedReviewer);
      if (onSuccess) onSuccess();
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
        
        <Button 
          className="w-full" 
          onClick={handleLogin} 
          disabled={!selectedReviewer}
        >
          Login as Reviewer
        </Button>
        
        <div className="text-sm text-gray-500 mt-4">
          <p className="mb-2">Demo Reviewer IDs:</p>
          <ul className="list-disc pl-5">
            {reviewers.map(reviewer => (
              <li key={reviewer.id}>{reviewer.id}: {reviewer.name} ({reviewer.role})</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReviewerLogin;
