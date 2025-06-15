import { useTheme } from "@reactive-resume/hooks";

interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo = ({ size = 32, className }: LogoProps) => {
  const { isDarkMode } = useTheme();

  return <div className={className} style={{ width: size, height: size }} />;
};
