import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GoalForm } from './GoalForm';
import { addGoal, GoalFormData } from '@/lib/goals';
import { useAuth } from '@/contexts/AuthContext';

export const AddGoalDialog = () => {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (data: GoalFormData) => {
    if (!user) {
      // This should not happen if the component is rendered on an authenticated page
      alert("You must be logged in to add a goal.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addGoal(user.uid, data);
      setIsSubmitting(false);
      setOpen(false); // Close the dialog on success
      // Optionally, add a success toast/notification here
    } catch (error) {
      setIsSubmitting(false);
      console.error("Failed to add goal:", error);
      // Optionally, add an error toast/notification here
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Goal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Savings Goal</DialogTitle>
        </DialogHeader>
        <GoalForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </DialogContent>
    </Dialog>
  );
};
