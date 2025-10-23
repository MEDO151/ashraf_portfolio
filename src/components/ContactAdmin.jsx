import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function ContactAdmin() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const getContactData = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/info`);
      if (!res.ok) throw new Error("فشل في تحميل البيانات من الخادم");

      const jsonData = await res.json();

      setData({
        phoneNum: jsonData.phone || "",
        email: jsonData.email || "",
        locatioAr: jsonData.address?.ar || "",
        locatioEn: jsonData.address?.en || "",
        linkedIn: jsonData.linkedInLink || "",
        copyRightAr: jsonData.footer?.ar || "",
        copyRightEn: jsonData.footer?.en || "",
      });
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء تحميل البيانات، يرجى المحاولة لاحقًا.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContactData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    if (isSaving) return;

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      setIsSaving(true);

      const res = await fetch(`/api/info`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phone: data.phoneNum,
          email: data.email,
          linkedInLink: data.linkedIn,
          address: { ar: data.locatioAr, en: data.locatioEn },
          footer: { ar: data.copyRightAr, en: data.copyRightEn },
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        const msg = result?.error || result?.message || "تعذر حفظ التغييرات.";
        throw new Error(msg);
      }

      alert("✅ تم حفظ التغييرات بنجاح!");
    } catch (err) {
      console.error(err);
      alert("❌ حدث خطأ أثناء حفظ البيانات: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading)
    return (
      <p className="flex justify-center items-center min-h-screen text-xl font-semibold">
        جارٍ تحميل البيانات...
      </p>
    );

  if (error)
    return (
      <p className="text-center text-red-600 mt-10 font-medium">{error}</p>
    );

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl text-primary font-bold mb-1">
            تحرير قسم تواصل معي
          </h1>
          <p className="text-gray-600">
            إدارة محتوى تواصل معي في الصفحة الرئيسية
          </p>
        </div>

        {/* ✅ زر الحفظ الجديد */}
        <Button
          size="cv"
          className="py-1 text-lg flex gap-1"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <svg
                className="animate-spin h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              جاري الحفظ...
            </>
          ) : (
            <>
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
                className="lucide lucide-save h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0"
              >
                <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
                <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"></path>
                <path d="M7 3v4a1 1 0 0 0 1 1h7"></path>
              </svg>
              حفظ
            </>
          )}
        </Button>
      </div>

      <div className="rounded-lg border p-5 flex flex-col gap-5 bg-white mt-10 shadow-sm">
        <div className="flex gap-2 text-xl font-semibold leading-none items-center">
          <span className="text-primary">تواصل معي</span>
        </div>

        <div className="mt-5 flex flex-col gap-4">
          {[
            { id: "phoneNum", label: "رقم الهاتف", dir: "ltr" },
            { id: "email", label: "البريد الإلكتروني للتواصل", dir: "ltr" },
            { id: "locatioAr", label: "العنوان (عربي)", dir: "rtl" },
            { id: "locatioEn", label: "العنوان (إنجليزي)", dir: "ltr" },
            { id: "linkedIn", label: "لينك CV", dir: "ltr" },
            { id: "copyRightAr", label: "حقوق الطبع (عربي)", dir: "rtl" },
            { id: "copyRightEn", label: "حقوق الطبع (إنجليزي)", dir: "ltr" },
          ].map(({ id, label, dir }) => (
            <div key={id} className="flex flex-col gap-2">
              <label htmlFor={id} className="text-sm font-medium">
                {label}
              </label>
              <input
                id={id}
                value={data[id]}
                onChange={handleChange}
                className="w-full rounded-md border px-2 py-2 text-primary"
                dir={dir}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
