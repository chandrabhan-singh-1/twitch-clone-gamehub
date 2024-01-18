import { Logo } from "./_components/logo";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col min-h-full items-center justify-center space-y-6 py-4">
      <Logo />
      {children}
    </div>
  );
}
