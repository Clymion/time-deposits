import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { GoalFormData } from '@/lib/goals';

interface GoalFormProps {
  onSubmit: (data: GoalFormData) => void;
  isSubmitting: boolean;
}

export const GoalForm: React.FC<GoalFormProps> = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = React.useState<GoalFormData>({
    name: '',
    description: '',
    targetAmount: 0,
    initialAmount: 0,
    monthlyAmount: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input id="name" value={formData.name} onChange={handleChange} className="col-span-3" required />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          Description
        </Label>
        <Textarea id="description" value={formData.description} onChange={handleChange} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="targetAmount" className="text-right">
          Target Amount
        </Label>
        <Input id="targetAmount" type="number" value={formData.targetAmount} onChange={handleChange} className="col-span-3" required />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="initialAmount" className="text-right">
          Initial Amount
        </Label>
        <Input id="initialAmount" type="number" value={formData.initialAmount} onChange={handleChange} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="monthlyAmount" className="text-right">
          Monthly Amount
        </Label>
        <Input id="monthlyAmount" type="number" value={formData.monthlyAmount} onChange={handleChange} className="col-span-3" required />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Goal'}
        </Button>
      </div>
    </form>
  );
};
