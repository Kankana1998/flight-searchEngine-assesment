import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { CheckCircle2, Plane } from 'lucide-react';

interface BookingConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  flightId: string;
  price: string;
}

export const BookingConfirmationDialog = ({
  isOpen,
  onClose,
  email,
  flightId,
  price,
}: BookingConfirmationDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">Booking Confirmed!</DialogTitle>
          <DialogDescription className="text-center pt-2">
            Your flight has been successfully booked
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="bg-primary/5 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium">{email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Plane className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">Flight ID:</span>
              <span className="font-medium">{flightId}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Price:</span>
              <span className="font-bold text-primary text-lg">{price}</span>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-800 text-center">
              ✓ Your booking has been saved and confirmation details have been sent to your email.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} className="w-full">
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
