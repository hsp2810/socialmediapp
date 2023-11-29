import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated: boolean = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to={"/"} />
      ) : (
        <>
          <section className='flex flex-1 justify-center items-center'>
            <Outlet />

            <img
              src='/images/side-img.svg'
              alt='Side Image not found'
              className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat'
            />
          </section>
        </>
      )}
    </>
  );
};

export default AuthLayout;
