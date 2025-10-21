import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export default function DashboardLayout() {
  const isMobile = useIsMobile();

  return !isMobile ? (
    <div dir="rtl" className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-8">
      <div className="text-2xl font-bold mb-4 text-primary">
        يرجى استخدام جهاز كمبيوتر لتجربة أفضل في لوحة التحكم
      </div>
      <div className="text-gray-500 text-lg">
        لوحة التحكم غير مدعومة على الشاشات الصغيرة أو الهواتف.
      </div>
    </div>
  );
}
