
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useApp } from '@/context/AppContext';
import { Reviewer } from '@/types';

interface ReviewerPasswordDialogProps {
  reviewer: Reviewer;
}

const ReviewerPasswordDialog = ({ reviewer }: ReviewerPasswordDialogProps) => {
  const [newPassword, setNewPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { updateReviewer } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) {
      return;
    }
    
    updateReviewer(reviewer.id, { password: newPassword });
    setIsOpen(false);
    setNewPassword('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Staff Password</DialogTitle>
          <DialogDescription>
            Set a new password for {reviewer.name} ({reviewer.role})
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
              New Password
            </label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          
          <Button type="submit" className="w-full">
            Update Password
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewerPasswordDialog;
