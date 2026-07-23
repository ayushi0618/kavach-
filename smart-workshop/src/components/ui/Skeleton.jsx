import { cn } from '../../utils/cn';

export default function Skeleton({ className, variant = 'rectangular' }) {
  const baseClasses = "animate-pulse bg-gray-200";
  const variants = {
    rectangular: "rounded-md",
    circular: "rounded-full",
    text: "rounded h-4 w-3/4"
  };

  return <div className={cn(baseClasses, variants[variant], className)} />;
}
