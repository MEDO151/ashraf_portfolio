import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // ✅ رسالة النجاح
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.token) {
        setErrorMessage("البريد الإلكتروني أو كلمة المرور غير صحيحة");
        return;
      }

      // ✅ لو نجح تسجيل الدخول
      document.cookie = `token=${data.token}; path=/; max-age=86400; samesite=strict; secure`;

      setSuccessMessage("تم تسجيل الدخول بنجاح ✅"); // 👈 أضف الرسالة
      setTimeout(() => {
        navigate("/admin"); // ⏱️ انتقل بعد 2 ثانية
      }, 2000);
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("حدث خطأ أثناء الاتصال بالخادم، حاول مرة أخرى");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-100"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {/* ⚠️ رسالة الخطأ */}
        {errorMessage && (
          <div dir="rtl" className="text-red-600 text-center mb-4 font-medium">
            {errorMessage}
          </div>
        )}

        {/* ✅ رسالة النجاح */}
        {successMessage && (
          <div dir="rtl" className="text-green-600 text-center mb-4 font-medium">
            {successMessage}
          </div>
        )}

        <input
          dir="ltr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="border w-full p-3 mb-3 rounded"
          required
        />
        <input
          dir="ltr"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="border w-full p-3 mb-3 rounded"
          required
        />
        <Button type="submit" size={"cv"} className={"w-full"}>
          Login
        </Button>
      </form>
    </div>
  );
}
