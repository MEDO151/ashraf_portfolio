import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import RichTextEditor from "./RichTextEditor";

export default function EditOneArticleAdmin() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();
  const [data, setData] = useState({
    titleAr: "",
    titleEn: "",
    descriptionAr: "",
    descriptionEn: "",
    contentAr: "",
    contentEn: "",
    mainImg: "",
    contentImg: "",
    isPinned: false,
  });

  // ✅ استخراج التوكن من الكوكيز
  const getToken = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    return token || null;
  };

  // ✅ جلب بيانات المقال
  const getArticle = async () => {
    setLoading(true);
    setError("");
    try {
      const token = getToken();
      if (!token) throw new Error("Missing token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/articles/${slug}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("فشل في جلب البيانات");
      const result = await res.json();
      setArticle(result);
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء تحميل البيانات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getArticle();
  }, []);

  // ✅ ملء البيانات في الحالة بعد الجلب
  useEffect(() => {
    if (article) {
      setData({
        titleAr: article.header?.title?.ar || "",
        titleEn: article.header?.title?.en || "",
        descriptionAr: article.header?.desc?.ar || "",
        descriptionEn: article.header?.desc?.en || "",
        contentAr: article.content?.ar || "",
        contentEn: article.content?.en || "",
        mainImg: article.header?.imgUrl || "",
        contentImg: article.contentImgUrl || "",
        isPinned: article.isPinned || false,
      });
    }
  }, [article]);

  // ✅ تغيير النصوص
  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  // ✅ تحميل الصور
  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setData((prev) => ({ ...prev, [key]: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  // ✅ حفظ التعديلات
  const handleSave = async () => {
    try {
      const token = getToken();
      if (!token) return alert("⚠️ يرجى تسجيل الدخول أولاً");

      setIsSaving(true);

      const isMainBase64 =
        typeof data.mainImg === "string" && data.mainImg.startsWith("data:");
      const isContentBase64 =
        typeof data.contentImg === "string" &&
        data.contentImg.startsWith("data:");

      const body = {
        headerTitle: {
          ar: data.titleAr || "",
          en: data.titleEn || "",
        },
        headerDesc: {
          ar: data.descriptionAr || "",
          en: data.descriptionEn || "",
        },
        headerImage: isMainBase64 ? data.mainImg : null,
        content: {
          ar: data.contentAr || "",
          en: data.contentEn || "",
        },
        contentImage: isContentBase64 ? data.contentImg : null,
        isPinned: data.isPinned,
      };

      console.log("🚀 البيانات المرسلة:", body);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/articles/${slug}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      const result = await res.json();

      if (!res.ok)
        throw new Error(
          result?.error || result?.message || "فشل في تحديث المقال"
        );

      setArticle(result);
      alert("✅ تم حفظ التغييرات بنجاح!");
      navigate("/admin/article");
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء حفظ البيانات: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // ✅ واجهة التحميل أو الخطأ
  if (loading)
    return (
      <p className="flex justify-center items-center min-h-screen text-xl font-semibold">
        جارٍ تحميل البيانات...
      </p>
    );

  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl text-primary font-bold mb-1">تحرير المقال</h1>
          <p className="text-gray-600">إدارة وتحرير بيانات المقال الحالي</p>
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
        {/* 📝 العناوين والوصف */}
        <div className="grid grid-cols-2 gap-6">
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

        {/* ⭐ مقال مميز */}
        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            id="isPinned"
            className="accent-desert-600 h-4 w-4"
            checked={data.isPinned}
            onChange={() =>
              setData((prev) => ({ ...prev, isPinned: !prev.isPinned }))
            }
          />
          <label htmlFor="isPinned" className="text-sm font-medium">
            مقال مميز
          </label>
        </div>

        {/* ✍ المحتوى */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <label className="font-medium mb-1">المحتوى (عربي)</label>
            <RichTextEditor
              value={data.contentAr}
              dir="rtl"
              onChange={(val) =>
                setData((prev) => ({ ...prev, contentAr: val }))
              }
            />
          </div>

          <div>
            <label className="font-medium mb-1">المحتوى (إنجليزي)</label>
            <RichTextEditor
              value={data.contentEn}
              dir="ltr"
              onChange={(val) =>
                setData((prev) => ({ ...prev, contentEn: val }))
              }
            />
          </div>
        </div>

        {/* 🖼️ الصور */}
        <div className="flex flex-col md:flex-row gap-6 mt-8">
          {/* الصورة الرئيسية */}
          <div className="flex-1">
            <h3 className="font-medium leading-none mb-2">
              صورة القسم الرئيسي
            </h3>
            <div className="border rounded-md p-3 w-full relative">
              <img
                loading="lazy"
                alt="Main image"
                className="w-full h-44 object-cover rounded-md border"
                src={data.mainImg || null}
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

          {/* صورة المحتوى */}
          <div className="flex-1">
            <h3 className="font-medium leading-none mb-2">صورة المحتوى</h3>
            <div className="border rounded-md p-3 w-full relative">
              <img
                loading="lazy"
                alt="Content image"
                className="w-full h-44 object-cover rounded-md border"
                src={data.contentImg || null}
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
