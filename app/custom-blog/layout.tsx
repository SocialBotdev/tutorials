import GoBackButton from "@/components/Back";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <header className="fixed w-full p-6 top-0 z-50">
        <GoBackButton />
      </header>
      <main className="mx-auto pt-[72px]">{children}</main>
    </div>
  );
};

export default Layout;