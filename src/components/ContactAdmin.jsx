import React, { useState } from "react";
import { Button } from "./ui/button";

export default function ContactAdmin({
  title = "تحرير قسم تواصل معي",
  description = "إدارة محتوى تواصل معي في الصفحة الرئيسية",
  sectionTitle = "تواصل معي",
  initialData = {},
}) {
  const [data, setData] = useState({
    titleAr: initialData.titleAr || "تواصل معي.",
    titleEn: initialData.titleEn || "Contact Me.",
    phoneNum: initialData.phoneNum || "+966 545407722",
    email: initialData.email || "Ashraf@iData.center",
    locatioAr: initialData.locatioAr || "الرياض، المملكة العربية السعودية",
    locatioEn: initialData.locatioEn || "Riyadh KSA",
    copyRightAr: initialData.copyRightAr || "© 2025 جميع الحقوق محفوظة ل idata.center .",
    copyRightEn: initialData.copyRightEn || "© 2025 idata.center All rights reserved.",
  });

  // ✅ تحديث أي حقل
  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  // ✅ عند الحفظ
  const handleSave = () => {
    if (onSave) onSave(data);
    else console.log("البيانات:", data);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl text-primary font-bold mb-1">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
        <Button
          size="cv"
          className="py-1 text-lg flex gap-1"
          onClick={handleSave}
        >
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
        </Button>
      </div>
      <div className="rounded-lg border p-5 flex flex-col gap-5 bg-white mt-10 shadow-sm">
        <div className="flex gap-2 text-xl font-semibold leading-none items-center">
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
            className="lucide lucide-image h-5 w-5"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
            <circle cx="9" cy="9" r="2"></circle>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
          </svg>
          <span className="text-primary">{sectionTitle}</span>
        </div>

        <div className="mt-5">
          {/* الحقول النصية */}
          <div className="flex flex-col gap-4">
            {[
              { id: "titleAr", label: "العنوان (عربي)", dir: "rtl" },
              { id: "titleEn", label: "العنوان (إنجليزي)", dir: "ltr" },
              {
                id: "phoneNum",
                label: "رقم الهاتف",
                dir: "ltr",
              },
              {
                id: "email",
                label: "البريد الإلكتروني للتواصل",
                dir: "ltr",
              },
              {
                id: "locatioAr",
                label: "العنوان (عربي)",
                dir: "rtl",
              },
              {
                id: "locatioEn",
                label: "العنوان (إنجليزي)",
                dir: "ltr",
              },
              {
                id: "copyRightAr",
                label: "حقوق الطبع (عربي)",
                dir: "rtl",
              },
              {
                id: "copyRightEn",
                label: "حقوق الطبع (إنجليزي)",
                dir: "ltr",
              },
            ].map(({ id, label, dir }) => (
              <div key={id} className="flex flex-col gap-2">
                <label htmlFor={id} className="text-sm font-medium">
                  {label}
                </label>
                {
                  <input
                    id={id}
                    value={data[id]}
                    onChange={handleChange}
                    className="w-full rounded-md border px-2 py-2 text-primary"
                    dir={dir}
                  />
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
