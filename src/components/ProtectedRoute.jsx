// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  // اقرأ التوكن من الكوكيز
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    // لو مفيش توكن، رجّع المستخدم على صفحة اللوجين
    return <Navigate to="Mkafrawi/login" replace />;
  }

  // لو فيه توكن، اعرض المحتوى الداخلي
  return <Outlet />;
}
