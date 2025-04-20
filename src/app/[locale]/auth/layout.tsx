import LightAndDarkThemeSwitcher from "./LightAndDarkThemeSwitcher";
import LocaleSwitcher from "./LocaleSwitcher";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden md:p-10">
      <div className="absolute right-6 top-6 flex items-center gap-3 md:right-10 md:top-10">
        <LightAndDarkThemeSwitcher />
        <LocaleSwitcher />
      </div>
      <div className="flex min-h-svh w-full items-center justify-center">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
