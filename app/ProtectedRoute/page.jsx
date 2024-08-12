"use client";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const token = localStorage.getItem("token");

  if (!token) {
    if (typeof window !== "undefined") {
      router.push("/login");
    }
    return null;
  }

  return children;
};

export default ProtectedRoute;
