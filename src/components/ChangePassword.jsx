import React, { useState } from "react";

export default function ChangePassword({
  apiPath = `${import.meta.env.VITE_API_URL}/change-password`,
  getAuthHeader = () => null,
}) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const validate = () => {
    setError(null);
    if (!oldPassword || !newPassword) {
      setError("الرجاء ملء الحقلين.");
      return false;
    }
    if (newPassword.length < 8) {
      setError("كلمة السر الجديدة لازم تكون 8 أحرف على الأقل.");
      return false;
    }
    if (oldPassword === newPassword) {
      setError("كلمة السر الجديدة يجب أن تكون مختلفة عن القديمة.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!validate()) return;

    setLoading(true);
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const auth = getAuthHeader && getAuthHeader();
      if (auth) headers["Authorization"] = auth;

      const res = await fetch(apiPath, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
   
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        // try to show message from server
        const serverMsg = data && (data.message || data.error);
        throw new Error(serverMsg || "فشل تحديث كلمة المرور.");
      }

      setMessage("تم تحديث كلمة المرور بنجاح.");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err.message || "حصل خطأ غير متوقع.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">تغيير كلمة المرور</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="old" className="block text-sm font-medium mb-1">
            كلمة المرور القديمة
          </label>
          <div className="relative">
            <input
            dir="ltr"
              id="old"
              type={showOld ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-1"
              placeholder="اكتب كلمة المرور القديمة"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowOld((s) => !s)}
              className="absolute inset-y-0 right-2 top-2 text-sm px-2"
              aria-label={showOld ? "اخفاء" : "اظهار"}
            >
              {showOld ? "إخفاء" : "عرض"}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="new" className="block text-sm font-medium mb-1">
            كلمة المرور الجديدة
          </label>
          <div className="relative">
            <input
            dir="ltr"
              id="new"
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-1"
              placeholder="اكتب كلمة المرور الجديدة"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowNew((s) => !s)}
              className="absolute inset-y-0 right-2 top-2 text-sm px-2"
              aria-label={showNew ? "اخفاء" : "اظهار"}
            >
              {showNew ? "إخفاء" : "عرض"}
            </button>
          </div>
          <p className="text-xs mt-1 text-gray-500">لا تقل عن 8 أحرف.</p>
        </div>

        {(error || message) && (
          <div
            className={`rounded-md px-3 py-2 text-sm ${
              error ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
            }`}
            role="status"
          >
            {error || message}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-lg font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
            } bg-gradient-to-r from-blue-500 to-indigo-600 text-white`}
          >
            {loading ? "جاري الحفظ..." : "حفظ"}
          </button>
        </div>
      </form>
    </div>
  );
}
