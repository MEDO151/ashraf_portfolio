import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅ حالة الزر
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch(`/api/login`, {
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

      document.cookie = `token=${data.token}; path=/; max-age=86400; samesite=strict; secure`;

      setSuccessMessage("تم تسجيل الدخول بنجاح ✅");
      setTimeout(() => {
        navigate("/admin");
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
        <h2 className="text-2xl font-bold mb-4 text-center">تسجيل الدخول</h2>

        {errorMessage && (
          <div dir="rtl" className="text-red-600 text-center mb-4 font-medium">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div
            dir="rtl"
            className="text-green-600 text-center mb-4 font-medium"
          >
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

        {/* حاوية حقل كلمة المرور + زر الإظهار */}
        <div className="relative mb-3">
          <input
            dir="ltr"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"} // ← هنا بيتغير النوع
            placeholder="Password"
            className="border w-full p-3 rounded pr-12" // pr-12 عشان مكان الزر
            required
            aria-label="كلمة المرور"
          />

          {/* زر إظهار/إخفاء (type="button" مهم علشان ما يسببش submit) */}
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-pressed={showPassword}
            aria-label={
              showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
            }
            className="absolute top-1/2 right-3 transform -translate-y-1/2 p-1 text-sm"
          >
            {/* أيقونة بسيطة: عين أو عين مقطوعة */}
            {showPassword ? (
              // أيقونة عين مفتوحة (يمكن استبدال بأيقونة من مكتبتك)
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
              // أيقونة عين مقفولة
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
            )}
          </button>
        </div>

        <Button type="submit" size={"cv"} className={"w-full"}>
          تسجيل الدخول
        </Button>
      </form>
    </div>
  );
}
