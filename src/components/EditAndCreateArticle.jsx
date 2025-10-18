import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import RichTextEditor from "./RichTextEditor";

export default function EditAndCreateArticle({
  title,
  sectionTitle = "محتوى المقال",
  sectionDes = "أدخل عنوان ومحتوى المقال",
  initialData = {},
}) {
  const [data, setData] = useState({
    titleAr: initialData.titleAr || "",
    titleEn: initialData.titleEn || "",
    descriptionAr: initialData.descriptionAr || "",
    descriptionEn: initialData.descriptionEn || "",
    contantAr: initialData.contantAr || "",
    contantEn: initialData.contantEn || "",
    mainImg: initialData.mainImg || "",
    contantImg: initialData.contantImg || "",
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

  // ✅ رفع صورة
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setData((prev) => ({ ...prev, image: imageURL }));
    }
  };

  return (
    <>
      <div className="flex justify-between mb-10 items-center">
        <div>
          <h1 className="text-2xl text-primary font-bold mb-1">{title}</h1>
        </div>
        <Link to={"/admin/article/create"}>
          <Button size="cv" className="py-2 text-md flex gap-1">
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
              className="lucide lucide-save h-4 w-4 ml-2"
            >
              <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
              <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"></path>
              <path d="M7 3v4a1 1 0 0 0 1 1h7"></path>
            </svg>
            حفظ ونشر
          </Button>
        </Link>
      </div>
      <div className="rounded-lg border p-5 flex flex-col gap-5 bg-white mt-10 shadow-sm">
        <div>
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
          <p>{sectionDes}</p>
        </div>
        <div className=" mt-5">
          {/* الحقول النصية */}
          <div className="flex flex-col gap-4">
            {[
              { id: "titleAr", label: "العنوان (عربي)", dir: "rtl" },
              { id: "titleEn", label: "العنوان (إنجليزي)", dir: "ltr" },
              {
                id: "descriptionAr",
                label: "الوصف (عربي)",
                type: "textarea",
                dir: "rtl",
              },
              {
                id: "descriptionEn",
                label: "الوصف (إنجليزي)",
                type: "textarea",
                dir: "ltr",
              },
            ].map(({ id, label, type, dir }) => (
              <div className="flex flex-col gap-2" key={id}>
                <label
                  htmlFor={id}
                  className="text-sm font-medium leading-none"
                >
                  {label}
                </label>
                {type === "textarea" ? (
                  <textarea
                    id={id}
                    value={data[id]}
                    onChange={handleChange}
                    className="flex w-full min-h-[80px] rounded-md border px-2 py-2 text-primary"
                    dir={dir}
                  />
                ) : (
                  <input
                    id={id}
                    value={data[id]}
                    onChange={handleChange}
                    className="flex w-full rounded-md border px-2 py-2 text-primary"
                    dir={dir}
                  />
                )}
              </div>
            ))}
            <div className="flex  items-center gap-2">
              <input
                type="checkbox"
                className="accent-desert-600 h-4 w-4"
                name=""
                id="isPinned"
              />
              <label htmlFor="isPinned">مقال مميز</label>
            </div>
            <div>
              <label>المحتوى (عربي)</label>
              <RichTextEditor
                align={"right"}
                initialContent={data.contantAr}
                dir={"rtl"}
              />
            </div>
            <div>
              <label>المحتوى (إنجليزي)</label>
              <RichTextEditor
                align={"left"}
                initialContent={data.contantEn}
                dir={"ltr"}
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 mt-7">
            <h3 className="font-medium leading-none">صور القسم الرئيسي</h3>
            <div className="border rounded-md p-3 w-full">
              <div className="relative">
                <img
                loading="lazy"
                  alt="Hero image"
                  className="w-full h-44 object-cover rounded-md border"
                  src={data.mainImg}
                />
                <label className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 cursor-pointer h-9 rounded-md px-3 flex items-center gap-2 text-sm font-medium">
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
                    className="lucide lucide-upload h-4 w-4"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" x2="12" y1="3" y2="15"></line>
                  </svg>
                  تغيير
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
            <h3 className="font-medium leading-none mt-5">صوره المحتوى</h3>
            <div className="border rounded-md p-3 w-full">
              <div className="relative">
                <img
                loading="lazy"
                  alt="Hero image"
                  className="w-full h-44 object-cover rounded-md border"
                  src={data.contantImg}
                />
                <label className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 cursor-pointer h-9 rounded-md px-3 flex items-center gap-2 text-sm font-medium">
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
                    className="lucide lucide-upload h-4 w-4"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" x2="12" y1="3" y2="15"></line>
                  </svg>
                  تغيير
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
