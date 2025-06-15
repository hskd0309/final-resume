interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo = ({ size = 32, className }: LogoProps) => {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
      }}
    />
  );
};
