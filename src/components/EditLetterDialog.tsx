
import { useState } from 'react';
import { ExcuseLetter } from '@/types';
import { useApp } from '@/context/AppContext';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface EditLetterDialogProps {
  letter: ExcuseLetter;
  isOpen: boolean;
  onClose: () => void;
}

const EditLetterDialog = ({ letter, isOpen, onClose }: EditLetterDialogProps) => {
  const { updateLetter } = useApp();
  const [absenceDate, setAbsenceDate] = useState<Date>(new Date(letter.absenceDate));
  const [reason, setReason] = useState(letter.reason);
  const [attachment, setAttachment] = useState<File | null>(null);
  
  const handleSubmit = async () => {
    try {
      let attachmentUrl = letter.attachmentUrl;
      
      if (attachment) {
        // Create a mock URL for the attachment (in a real app, this would be handled by file storage)
        attachmentUrl = URL.createObjectURL(attachment);
      }
      
      await updateLetter(letter.id, {
        absenceDate,
        reason,
        attachmentUrl
      });
      
      toast.success("Letter updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update letter");
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setAttachment(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Excuse Letter</DialogTitle>
          <DialogDescription>
            Make changes to your excuse letter here.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label>Date of Absence</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(absenceDate, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={absenceDate}
                  onSelect={(date) => date && setAbsenceDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <label>Reason</label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter your reason"
            />
          </div>
          
          <div className="space-y-2">
            <label>Update Medical Certificate (optional)</label>
            <Input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            />
            {letter.attachmentUrl && !attachment && (
              <p className="text-sm text-muted-foreground">
                Current file will be kept if no new file is selected
              </p>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditLetterDialog;
