import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      <div className="lg:flex lg:items-center lg:justify-center lg:bg-black lg:w-1/2 lg:px-12 hidden">
        <div className="lg:max-w-md lg:space-y-6 lg:text-center lg:text-primary-foreground ">
          <h1 className="lg:text-4xl lg:font-extrabold lg:tracking-tight lg:text-white ">
          Welcome to Cartzy
          </h1>
        </div>
      </div>
      <div
        className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 bg-repeat-round flex-col gap-16"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
        <div className="max-w-md space-y-6 text-center text-primary-foreground lg:hidden ">
          <h1 className="text-4xl font-bold tracking-tight text-black underline">
            Welcome to Cartzy
          </h1>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
