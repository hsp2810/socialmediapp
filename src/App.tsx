import { Route, Routes } from "react-router-dom";

import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import { Home } from "./_main/pages";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_main/RootLayout";

import { Toaster } from "@/components/ui/toaster";

export default function App() {
  return (
    <main>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<SigninForm />} />
          <Route path='/sign-up' element={<SignupForm />} />
        </Route>

        {/* Private Routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>

      {/* Alerts */}
      <Toaster />
    </main>
  );
}
