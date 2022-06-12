import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col items-center pt-10">
      <div className="w-full px-6 xs:mx-auto min-w-[327px] max-w-lg">
        <Outlet />
      </div>
    </div>
  );
}
