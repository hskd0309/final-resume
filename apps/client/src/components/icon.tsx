import { useTheme } from "@reactive-resume/hooks";
import { cn } from "@reactive-resume/utils";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const Logo = ({ size = 32, className, ...props }: LogoProps) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      style={{
        width: size,
        height: size,
      }}
      className={cn("object-contain", className)}
      {...props}
    />
  );
};
