import { useAuth } from "@/context/AuthContext/AuthProvider";
import { redirect, useRouter } from "next/navigation";
import React, { ComponentType, useEffect } from "react";

const PrivateRoute = <T extends {}>(Component: ComponentType<T>) => {
  return function PrivateRoute(props: T) {
    const router = useRouter();
    const { user } = useAuth();

    const isAuthenticated = user ? true : false;

    useEffect(() => {
      if (!isAuthenticated) {
        //alert(`Welcome ${user?.name}`);
        return redirect("login");
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return (
        <>
          <h1>Loading</h1>
        </>
      );
    } else {
      return <Component {...props} />;
    }
  };
};

export default PrivateRoute;
