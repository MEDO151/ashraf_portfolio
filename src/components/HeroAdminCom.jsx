import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function HeroAdminCom({
  title = "تحرير الصفحة الرئيسية",
  description = "إدارة محتوى القسم الرئيسي في الصفحة الرئيسية",
  sectionTitle = "القسم الرئيسي",
  apiPath = "/home-page",
  initialData = null,
  inHome = true,
}) {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [data, setData] = useState({
    titleAr: "",
    titleEn: "",
    subtitleAr: "",
    subtitleEn: "",
    image: "",
  });

  // ✅ مزامنة initialData مع state
  useEffect(() => {
    if (initialData) {
      setPageData(initialData);
      setData(initialData);
      setLoading(false);
    }
  }, [initialData]);

  // ✅ جلب البيانات من الـ API إذا ما فيش initialData
  const getPageData = async () => {
    setLoading(true);
    setError("");
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) throw new Error("لم يتم العثور على رمز المصادقة");

      const res = await fetch(`${import.meta.env.VITE_API_URL}${apiPath}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("فشل في تحميل البيانات من الخادم");

      const result = await res.json();
      const headerData = inHome ? result.header : result.header || result;
      setPageData({
        titleAr: headerData.title?.ar || "",
        titleEn: headerData.title?.en || "",
        subtitleAr: headerData.desc?.ar || "",
        subtitleEn: headerData.desc?.en || "",
        image: headerData.imgUrl || "",
      });
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء تحميل البيانات، يرجى المحاولة لاحقًا.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialData) getPageData();
  }, []);

  // ✅ تغيير الحقول
  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  // ✅ رفع الصورة
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // ✅ حفظ البيانات
  const handleSave = async () => {
    if (isSaving) return;

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        alert("⚠️ يرجى تسجيل الدخول أولاً.");
        return;
      }

      setIsSaving(true);

      const isBase64 =
        typeof data.image === "string" && data.image.startsWith("data:");

      const body = inHome
        ? {
            headerTitle: { ar: data.titleAr, en: data.titleEn },
            headerDesc: { ar: data.subtitleAr, en: data.subtitleEn },
            headerImageBase64: isBase64 ? data.image : null,
          }
        : {
            title: { ar: data.titleAr, en: data.titleEn },
            desc: { ar: data.subtitleAr, en: data.subtitleEn },
            imageBase64: isBase64 ? data.image : null,
          };

      const res = await fetch(`${import.meta.env.VITE_API_URL}${apiPath}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const result = await res.json();

      if (!res.ok) {
        const msg = result?.error || result?.message || "تعذر حفظ التغييرات.";
        throw new Error(msg);
      }

      const savedData = inHome ? result.header : result.header || result;
      setPageData({
        titleAr: savedData.title?.ar || "",
        titleEn: savedData.title?.en || "",
        subtitleAr: savedData.desc?.ar || "",
        subtitleEn: savedData.desc?.en || "",
        image: savedData.imgUrl || "",
      });

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

  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <main>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl text-primary font-bold mb-1">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
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

      {/* Content */}
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

        <div className="grid grid-cols-2 gap-6 mt-5">
          {/* الحقول */}
          <div className="flex flex-col gap-4">
            {[
              { id: "titleAr", label: "العنوان (عربي)", dir: "rtl" },
              { id: "titleEn", label: "العنوان (إنجليزي)", dir: "ltr" },
              {
                id: "subtitleAr",
                label: "الوصف (عربي)",
                type: "textarea",
                dir: "rtl",
              },
              {
                id: "subtitleEn",
                label: "الوصف (إنجليزي)",
                type: "textarea",
                dir: "ltr",
              },
            ].map(({ id, label, type, dir }) => (
              <div key={id} className="flex flex-col gap-2">
                <label htmlFor={id} className="text-sm font-medium">
                  {label}
                </label>
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

          {/* الصورة */}
          <div className="flex flex-col items-start gap-3">
            <h3 className="font-medium leading-none">صورة القسم الرئيسي</h3>
            <div className="border rounded-md p-3 w-full">
              <div className="relative">
                <img
                  loading="lazy"
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
