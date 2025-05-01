
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/sonner';
import { useState } from 'react';

interface ImagePreviewDialogProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImagePreviewDialog = ({ imageUrl, isOpen, onClose }: ImagePreviewDialogProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-6">
        <div className="relative w-full h-full flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}
          <img 
            src={imageUrl} 
            alt="Attachment preview"
            className="w-full h-auto object-contain rounded-lg"
            style={{ maxHeight: '70vh' }}
            onError={(e) => {
              setIsLoading(false);
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = '/placeholder.svg';
              toast.error("Failed to load image");
            }}
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePreviewDialog;
