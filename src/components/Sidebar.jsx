// src/components/Sidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const links = [
  {
    to: "/admin/hero",
    label: "الرئيسية",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-layout-dashboard h-5 w-5 ml-3"
      >
        <rect width="7" height="9" x="3" y="3" rx="1"></rect>
        <rect width="7" height="5" x="14" y="3" rx="1"></rect>
        <rect width="7" height="9" x="14" y="12" rx="1"></rect>
        <rect width="7" height="5" x="3" y="16" rx="1"></rect>
      </svg>
    ),
  },
  {
    to: "/admin/about",
    label: "من انا",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-layout-dashboard h-5 w-5 ml-3"
      >
        <rect width="7" height="9" x="3" y="3" rx="1"></rect>
        <rect width="7" height="5" x="14" y="3" rx="1"></rect>
        <rect width="7" height="9" x="14" y="12" rx="1"></rect>
        <rect width="7" height="5" x="3" y="16" rx="1"></rect>
      </svg>
    ),
  },
  {
    to: "/admin/articlesection",
    label: "صفحة المقالات",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-layout-dashboard h-5 w-5 ml-3"
      >
        <rect width="7" height="9" x="3" y="3" rx="1"></rect>
        <rect width="7" height="5" x="14" y="3" rx="1"></rect>
        <rect width="7" height="9" x="14" y="12" rx="1"></rect>
        <rect width="7" height="5" x="3" y="16" rx="1"></rect>
      </svg>
    ),
  },
  {
    to: "/admin/article",
    label: "المقالات",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-layout-dashboard h-5 w-5 ml-3"
      >
        <rect width="7" height="9" x="3" y="3" rx="1"></rect>
        <rect width="7" height="5" x="14" y="3" rx="1"></rect>
        <rect width="7" height="9" x="14" y="12" rx="1"></rect>
        <rect width="7" height="5" x="3" y="16" rx="1"></rect>
      </svg>
    ),
  },
  {
    to: "/admin/contact",
    label: "تواصل معي",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-layout-dashboard h-5 w-5 ml-3"
      >
        <rect width="7" height="9" x="3" y="3" rx="1"></rect>
        <rect width="7" height="5" x="14" y="3" rx="1"></rect>
        <rect width="7" height="9" x="14" y="12" rx="1"></rect>
        <rect width="7" height="5" x="3" y="16" rx="1"></rect>
      </svg>
    ),
  },
  {
    to: "/admin/seo",
    label: "محركات البحث",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-layout-dashboard h-5 w-5 ml-3"
      >
        <rect width="7" height="9" x="3" y="3" rx="1"></rect>
        <rect width="7" height="5" x="14" y="3" rx="1"></rect>
        <rect width="7" height="9" x="14" y="12" rx="1"></rect>
        <rect width="7" height="5" x="3" y="16" rx="1"></rect>
      </svg>
    ),
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    document.cookie = "token=; path=/; max-age=0";
    navigate("/login");
  };

  return (
    <aside
      className={`md:block bg-white text-black md:h-screen md:sticky md:top-0 w-64 shadow-xl`}
    >
      <div className="p-5 md:p-6">
        <h2 className="text-xl text-primary font-semibold mb-6">
          لوحة الإدارة
        </h2>

        <nav className="flex flex-col overflow-y-auto gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive ? "bg-primary text-white" : "hover:bg-gray-100"
                }`
              }
            >
              <span className="text-lg">{link.icon}</span>
              <span className="text-sm">{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="border-t border-gray-200 pt-4 text-sm">
        <div className="p-4 space-y-3">
          <Button
            onClick={logout}
            variant={"outline"}
            className="w-full px-3 text-center py-2 rounded-md"
          >
            تغير الرقم السري
          </Button>
          <Button
            onClick={logout}
            variant={"destructive"}
            className="w-full px-3 text-center py-2 rounded-md"
          >
            تسجيل الخروج
          </Button>
        </div>
      </div>
    </aside>
  );
}
