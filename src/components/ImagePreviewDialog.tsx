
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

interface ImagePreviewDialogProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImagePreviewDialog = ({ imageUrl, isOpen, onClose }: ImagePreviewDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0">
        <img 
          src={imageUrl} 
          alt="Attachment preview"
          className="w-full h-auto rounded-lg"
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImagePreviewDialog;
