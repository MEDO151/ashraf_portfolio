import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useSeo } from "./SeoProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SeoAdmin({
  title = "تحرير قسم محركات البحث",
  description = "إدارة محتوى محركات البحث",
  sectionTitle = "محركات البحث",
}) {
  const { seoData, setSeoData } = useSeo();
  const [data, setData] = useState(seoData);
  const [originalImage, setOriginalImage] = useState(seoData.image || "");
  const [loading, setLoading] = useState(!seoData.title);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  // مزامنة الـ state مع SeoProvider
  useEffect(() => {
    setData(seoData);
    setOriginalImage(seoData.image || "");
  }, [seoData]);

  // جلب البيانات لو الـ Provider فاضي
  const getSeoData = async () => {
    setLoading(true);
    setError("");
    try {
      const tokenCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="));
      const token = tokenCookie ? tokenCookie.split("=")[1] : null;

      if (!token) throw new Error("يرجى تسجيل الدخول أولاً");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/seo`);

      if (!res.ok) throw new Error("حدث خطأ أثناء تحميل البيانات");

      const jsonData = await res.json();
      setSeoData({
        title: jsonData.title || "",
        desc: jsonData.desc || "",
        keywords: jsonData.keywords || "",
        image: jsonData.imgUrl || "",
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "حدث خطأ أثناء تحميل البيانات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!seoData.title) {
      getSeoData();
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("حجم الصورة يجب أن يكون أقل من 2 ميجابايت");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("الملف يجب أن يكون صورة فقط");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const getBase64 = async (img) => {
    if (!img || img.startsWith("/image.png")) return "";
    if (img.startsWith("data:image")) return img;
    const response = await fetch(img);
    const blob = await response.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  const handleSave = async () => {
    try {
      const tokenCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="));
      const token = tokenCookie ? tokenCookie.split("=")[1] : null;

      if (!token) {
        toast.warn("⚠️ يرجى تسجيل الدخول أولاً");
        return;
      }

      setIsSaving(true);
      const newImg = await getBase64(data.image);
      const body = {
        title: data.title,
        desc: data.desc,
        keywords: data.keywords,
        imageBase64: newImg,
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/seo`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const result = await res.json();

      if (!res.ok) {
        const msg = result?.error || result?.message || "فشل في تحديث البيانات";
        throw new Error(msg);
      }

      setSeoData({
        title: result.title || "",
        desc: result.desc || "",
        keywords: result.keywords || "",
        image: result.imgUrl || "",
      });

      setOriginalImage(result.imgUrl || "");
      toast.success("✅ تم حفظ التغييرات بنجاح!");
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ أثناء حفظ البيانات: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading)
    return (
      <p className="flex justify-center items-center min-h-screen text-xl font-semibold">
        جاري تحميل البيانات...
      </p>
    );

  if (error)
    return (
      <p className="text-center text-red-600 mt-10 font-medium">{error}</p>
    );

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
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
          {isSaving ? "جاري الحفظ..." : "حفظ"}
        </Button>
      </div>

      <div className="rounded-lg border p-5 flex flex-col gap-5 bg-white mt-10 shadow-sm">
        <div className="flex gap-2 text-xl font-semibold leading-none items-center">
          <span className="text-primary">{sectionTitle}</span>
        </div>

        <div className="grid grid-cols-2 mt-5 gap-5">
          <div className="flex flex-col gap-4">
            {[
              { id: "title", label: "عنوان الصفحة", dir: "ltr" },
              { id: "desc", label: "وصف الصفحة", type: "textarea", dir: "ltr" },
              {
                id: "keywords",
                label: "الكلمات الرئيسية",
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

          <div className="flex flex-col items-start gap-3">
            <h3 className="font-medium leading-none">الصورة الشخصية</h3>
            <div className="border rounded-md p-3 w-full">
              <div className="relative">
                <img
                  loading="lazy"
                  alt="Hero image"
                  className="w-full h-44 object-cover rounded-md border"
                  src={data.image || null}
                />
                <label className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 cursor-pointer h-9 rounded-md px-3 flex items-center gap-2 text-sm font-medium">
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
