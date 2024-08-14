import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="flex w-full h-full flex-col md:flex-row">
        <div className="w-full md:w-[50vw] h-[60vh] md:h-screen flex items-center justify-center">
          <img
            src="src/assets/image.jpg"
            className="w-full h-full object-cover"
            alt="brand-img"
          />
        </div>
        <div className="md:!w-[50vw]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
