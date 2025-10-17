import { useState } from "react";
import { Button } from "./ui/button";

export default function HeroAdminCom({
  title = "تحرير الصفحة الرئيسية",
  description = "إدارة محتوى القسم الرئيسي في الصفحة الرئيسية",
  sectionTitle = "القسم الرئيسي",
  initialData = {},
  onSave,
}) {
  // ✅ الحالة الداخلية (لو مفيش initialData)
  const [data, setData] = useState({
    titleAr: initialData.titleAr || "",
    titleEn: initialData.titleEn || "",
    subtitleAr: initialData.subtitleAr || "",
    subtitleEn: initialData.subtitleEn || "",
    image:
      initialData.image ||
      "https://res.cloudinary.com/djjron2p6/image/upload/v1751298756/eb6mycoxcap3ua76pube.png",
  });

  // ✅ تحديث أي حقل
  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  // ✅ رفع صورة
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setData((prev) => ({ ...prev, image: imageURL }));
    }
  };

  // ✅ عند الحفظ
  const handleSave = () => {
    if (onSave) onSave(data); // callback خارجي
    else console.log("البيانات:", data);
  };

  return (
    <main>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl text-primary font-bold mb-1">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
        <Button size="cv" className="py-1 text-lg flex gap-1" onClick={handleSave}>
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
          <span className=" text-primary">{sectionTitle}</span>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-5">

          <div className="flex flex-col gap-4">
            {[
              { id: "titleAr", label: "العنوان (عربي)", dir: "rtl" },
              { id: "titleEn", label: "العنوان (إنجليزي)", dir: "ltr" },
              { id: "subtitleAr", label: "العنوان الفرعي (عربي)", type: "textarea", dir: "rtl" },
              { id: "subtitleEn", label: "العنوان الفرعي (إنجليزي)", type: "textarea", dir: "ltr" },
            ].map(({ id, label, type, dir }) => (
              <div className="flex flex-col gap-2" key={id}>
                <label htmlFor={id} className="text-sm font-medium leading-none">
                  {label}
                </label>
                {type === "textarea" ? (
                  <textarea
                    id={id}
                    value={data[id]}
                    onChange={handleChange}
                    className="flex w-full min-h-[80px] rounded-md border px-2 py-2 text-primary focus-visible:ring-2"
                    dir={dir}
                  />
                ) : (
                  <input
                    id={id}
                    value={data[id]}
                    onChange={handleChange}
                    className="flex w-full rounded-md border px-2 py-2 text-primary focus-visible:ring-2"
                    dir={dir}
                  />
                )}
              </div>
            ))}
          </div>

          {/* صورة القسم */}
          <div className="flex flex-col items-start gap-3">
            <h3 className="font-medium leading-none">صور القسم الرئيسي</h3>
            <div className="border rounded-md p-3 w-full">
              <div className="relative">
                <img
                  alt="Hero image"
                  className="w-full h-44 object-cover rounded-md border"
                  src={data.image}
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
    </main>
  );
}
