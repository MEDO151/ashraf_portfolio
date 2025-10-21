import { createContext, useContext, useEffect, useState } from "react";

const SeoContext = createContext();
export const useSeo = () => useContext(SeoContext);

export function SeoProvider({ children }) {
  const [seoData, setSeoData] = useState({
    title: "",
    desc: "",
    keywords: "",
    image: "", // صورة افتراضية مثلاً
  });

  useEffect(() => {
    const fetchSeo = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/seo`);

        if (!res.ok) throw new Error("حدث خطأ أثناء جلب البيانات");

        const json = await res.json();
        setSeoData({
          title: json.title || null,
          desc: json.desc || null,
          keywords: json.keywords || null,
          image: json.imgUrl || null,
        });
      } catch (err) {
        console.error("🚨 خطأ في جلب بيانات SEO:", err);
      }
    };

    fetchSeo();
  }, []);

  return (
    <SeoContext.Provider value={{ seoData, setSeoData }}>
      {children}
    </SeoContext.Provider>
  );
}
