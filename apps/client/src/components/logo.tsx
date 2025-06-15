import { cn } from "@reactive-resume/utils";

interface IconProps {
  size?: number;
  className?: string;
}

export const Icon = ({ size = 24, className }: IconProps) => {
  return (
    <div
      className={cn("object-contain", className)}
      style={{ width: size, height: size }}
    />
  );
};
