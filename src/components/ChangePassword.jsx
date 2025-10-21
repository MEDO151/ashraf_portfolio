import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChangePasswordCard() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("كلمة المرور الجديدة غير متطابقة");
      return;
    }

    try {
      setLoading(true);

      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const res = await fetch(`/api/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ تم تغيير كلمة المرور بنجاح");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        navigate("/login");
      } else {
        alert(
          `❌ فشل تغيير كلمة المرور: ${data.message || "حدث خطأ غير معروف"}`
        );
      }
    } catch (err) {
      alert("يجب ان يكون الرقم السري اقل شيء 8 حروف و ارقام ");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 👁️ أيقونة العين
  const EyeIcon = ({ visible }) =>
    visible ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.269-2.943-9.543-7a9.956 9.956 0 012.4-3.455M3 3l18 18"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9.88 9.88A3 3 0 0014.12 14.12"
        />
      </svg>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-xl shadow-md p-8"
      >
        <h2 className="text-center text-2xl font-semibold mb-6">
          تغيير كلمة المرور
        </h2>

        {/* كلمة المرور القديمة */}
        <div className="relative mb-4">
          <input
            type={showOld ? "text" : "password"}
            placeholder="كلمة المرور القديمة"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            className="w-full border border-gray-200 rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowOld(!showOld)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
            aria-label="إظهار أو إخفاء كلمة المرور القديمة"
          >
            <EyeIcon visible={showOld} />
          </button>
        </div>

        {/* كلمة المرور الجديدة */}
        <div className="relative mb-4">
          <input
            type={showNew ? "text" : "password"}
            placeholder="كلمة المرور الجديدة"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full border border-gray-200 rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
            aria-label="إظهار أو إخفاء كلمة المرور الجديدة"
          >
            <EyeIcon visible={showNew} />
          </button>
        </div>

        {/* تأكيد كلمة المرور الجديدة */}
        <div className="relative mb-6">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="تأكيد كلمة المرور الجديدة"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full border border-gray-200 rounded-md px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
            aria-label="إظهار أو إخفاء تأكيد كلمة المرور"
          >
            <EyeIcon visible={showConfirm} />
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-gray-800 text-white rounded-md py-3 font-medium text-lg transition ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-95"
          }`}
        >
          {loading ? "جارٍ الحفظ..." : "تغيير كلمة المرور"}
        </button>
      </form>
    </div>
  );
}
