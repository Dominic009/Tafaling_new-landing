import { useAuth } from "@/context/AuthContext/AuthProvider";
import { useRouter } from "next/navigation";
import React, { ComponentType } from "react";

const PrivateRoute = <T extends {}>(Component: ComponentType<T>) => {
  return function PrivateRoute(props: T) {
    const router = useRouter();
    const { user } = useAuth();

    const isAuthenticated = user ? true : false;

    if (!isAuthenticated) {
      router.push("/login");
      return null;
    } else {
      return <Component {...props} />;
    }
  };
};

export default PrivateRoute;
