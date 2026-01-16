import { useState } from 'react';
import { useCreditsStore } from '../store/creditsStore';
import { useAuthStore } from '../store/authStore';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Coins, Sparkles, Check } from 'lucide-react';

interface AddCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CREDIT_OPTIONS = [50, 100, 500];

export const AddCreditsModal = ({ isOpen, onClose }: AddCreditsModalProps) => {
  const { user } = useAuthStore();
  const { addCredits, getCredits } = useCreditsStore();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!user) return null;

  const userId = user.uid;
  const currentCredits = getCredits(userId);

  const handleSelectAmount = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const handleAddCredits = async () => {
    if (!user) return;

    const amountToAdd = selectedAmount || (customAmount ? parseFloat(customAmount) : 0);

    if (amountToAdd <= 0 || isNaN(amountToAdd)) {
      return;
    }

    setIsProcessing(true);


    await new Promise((resolve) => setTimeout(resolve, 800));

    addCredits(userId, amountToAdd);
    setShowSuccess(true);


    setTimeout(() => {
      setShowSuccess(false);
      setSelectedAmount(null);
      setCustomAmount('');
      setIsProcessing(false);
      onClose();
    }, 1500);
  };

  const getFinalAmount = () => {
    if (selectedAmount) return selectedAmount;
    if (customAmount) {
      const parsed = parseFloat(customAmount);
      return isNaN(parsed) || parsed <= 0 ? 0 : parsed;
    }
    return 0;
  };

  const finalAmount = getFinalAmount();
  const canProceed = finalAmount > 0 && !isProcessing;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
              <Coins className="w-5 h-5 text-white" />
            </div>
            Add Credits
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            Top up your account to book flights instantly. Your current balance:{' '}
            <span className="font-semibold text-primary-600">
              {currentCredits.toLocaleString()} credits
            </span>
          </DialogDescription>
        </DialogHeader>

        {showSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center space-y-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Credits Added Successfully!
              </h3>
              <p className="text-gray-600">
                {finalAmount.toLocaleString()} credits have been added to your account.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {/* Quick Select Options */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                Quick Select
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {CREDIT_OPTIONS.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleSelectAmount(amount)}
                    disabled={isProcessing}
                    className={`
                      relative p-4 rounded-xl border-2 transition-all duration-200
                      ${selectedAmount === amount
                        ? 'border-primary-500 bg-primary-50 shadow-md scale-105'
                        : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50'
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                  >
                    {selectedAmount === amount && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="flex flex-col items-center gap-1">
                      <Sparkles className="w-5 h-5 text-primary-500 mb-1" />
                      <span className="text-lg font-bold text-gray-900">{amount}</span>
                      <span className="text-xs text-gray-500">credits</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <Label htmlFor="custom-amount" className="text-sm font-semibold text-gray-700 mb-2 block">
                Custom Amount
              </Label>
              <div className="relative">
                <Input
                  id="custom-amount"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  disabled={isProcessing}
                  className="pl-10 pr-4 py-3 text-lg"
                />
                <Coins className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              {customAmount && parseFloat(customAmount) > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  You'll receive {parseFloat(customAmount).toLocaleString()} credits
                </p>
              )}
            </div>

            {/* Summary */}
            {finalAmount > 0 && (
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-4 border border-primary-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Amount to Add</p>
                    <p className="text-2xl font-bold text-primary-700">
                      {finalAmount.toLocaleString()} credits
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">New Balance</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {(currentCredits + finalAmount).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isProcessing}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddCredits}
                disabled={!canProceed}
                isLoading={isProcessing}
                className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800"
              >
                {isProcessing ? 'Processing...' : 'Add Credits'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
