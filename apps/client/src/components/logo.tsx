import { useTheme } from "@reactive-resume/hooks";
import { cn } from "@reactive-resume/utils";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const Logo = ({ size = 32, className, ...props }: LogoProps) => {
  const { isDarkMode } = useTheme();
  
  return (
    <img
      {...props}
      className={cn("object-contain", className)}
      src={`/logo/${isDarkMode ? "light" : "dark"}.svg`}
      alt="Reactive Resume Logo"
      width={size}
      height={size}
    />
  );
};
