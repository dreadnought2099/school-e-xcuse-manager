
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
      <DialogContent className="max-w-3xl">
        <div className="relative w-full h-full">
          <img 
            src={imageUrl} 
            alt="Attachment preview"
            className="w-full h-auto object-contain rounded-lg"
            style={{ maxHeight: '80vh' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              toast.error("Failed to load image");
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePreviewDialog;
