import { useState } from "react";
import { Button } from "./ui/button";
import RichTextEditor from "./RichTextEditor";
import { useNavigate } from "react-router-dom";

export default function CreateArticle() {
  const navigate = useNavigate()
  const [isSaving, setIsSaving] = useState(false);
  const [data, setData] = useState({
    titleAr: "",
    titleEn: "",
    descriptionAr: "",
    descriptionEn: "",
    contentAr: "",
    contentEn: "",
    mainImg: "",
    contentImg: "",
    mainImgFile: null,
    contentImgFile: null,
    isPinned: false,
  });

  const getToken = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    return token || null;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setData((prev) => ({
        ...prev,
        [key + "File"]: file,
        [key]: URL.createObjectURL(file),
      }));
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleSave = async () => {
    try {
      const token = getToken();
      if (!token) return alert("⚠️ يرجى تسجيل الدخول أولاً");

      setIsSaving(true);

      const headerImageBase64 = data.mainImgFile ? await toBase64(data.mainImgFile) : "";
      const contentImageBase64 = data.contentImgFile ? await toBase64(data.contentImgFile) : "";

      const payload = {
        title: { ar: data.titleAr, en: data.titleEn },
        desc: { ar: data.descriptionAr, en: data.descriptionEn },
        headerImageBase64,
        content: { ar: data.contentAr, en: data.contentEn },
        contentImageBase64,
        pinned: data.isPinned,
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      const result = text ? JSON.parse(text) : null;

      if (!res.ok) throw new Error(result?.message || "حدث خطأ أثناء إنشاء المقال");

      alert("✅ تم إنشاء المقال بنجاح!");
      navigate('/admin/article')

    } catch (error) {
      console.error("خطأ في إنشاء المقال:", error);
      alert("❌ تعذر إنشاء المقال، حاول مرة أخرى");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold text-primary">إضافة مقال جديد</h1>
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
              حفظ ونشر
            </>
          )}
        </Button>
      </div>

      <div className="rounded-lg border p-5 flex flex-col gap-5 bg-white shadow-sm">
        <div className="grid grid-cols-2 gap-6">
          {[
            { id: "titleAr", label: "العنوان (عربي)", dir: "rtl" },
            { id: "titleEn", label: "العنوان (إنجليزي)", dir: "ltr" },
            { id: "descriptionAr", label: "الوصف (عربي)", type: "textarea", dir: "rtl" },
            { id: "descriptionEn", label: "الوصف (إنجليزي)", type: "textarea", dir: "ltr" },
          ].map(({ id, label, type, dir }) => (
            <div key={id} className="flex flex-col gap-2">
              <label htmlFor={id} className="text-sm font-medium">{label}</label>
              {type === "textarea" ? (
                <textarea
                  id={id}
                  value={data[id]}
                  onChange={handleChange}
                  className="w-full min-h-[80px] rounded-md border px-2 py-2 text-primary"
                  dir={dir}
                />
              ) : (
                <input
                  id={id}
                  value={data[id]}
                  onChange={handleChange}
                  className="w-full rounded-md border px-2 py-2 text-primary"
                  dir={dir}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            id="isPinned"
            className="accent-desert-600 h-4 w-4"
            checked={data.isPinned}
            onChange={() => setData((prev) => ({ ...prev, isPinned: !prev.isPinned }))}
          />
          <label htmlFor="isPinned" className="text-sm font-medium">مقال مميز</label>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <label className="font-medium mb-1">المحتوى (عربي)</label>
            <RichTextEditor
              content={data.contentAr}
              dir="rtl"
              onChange={(val) => setData((prev) => ({ ...prev, contentAr: val }))}
            />
          </div>
          <div>
            <label className="font-medium mb-1">المحتوى (إنجليزي)</label>
            <RichTextEditor
              content={data.contentEn}
              dir="ltr"
              onChange={(val) => setData((prev) => ({ ...prev, contentEn: val }))}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <div className="flex-1">
            <h3 className="font-medium mb-2">صورة القسم الرئيسي</h3>
            <div className="border rounded-md p-3 w-full relative">
              <img
                src={data.mainImg || null}
                alt="Main"
                className="w-full h-44 object-cover rounded-md border"
              />
              <label className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 cursor-pointer h-9 rounded-md px-3 flex items-center gap-2 text-sm font-medium">
                تغيير
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, "mainImg")}
                />
              </label>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="font-medium mb-2">صورة المحتوى</h3>
            <div className="border rounded-md p-3 w-full relative">
              <img
                src={data.contentImg || null}
                alt="Content"
                className="w-full h-44 object-cover rounded-md border"
              />
              <label className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 cursor-pointer h-9 rounded-md px-3 flex items-center gap-2 text-sm font-medium">
                تغيير
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, "contentImg")}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
