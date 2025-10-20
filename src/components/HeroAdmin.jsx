import React, { useEffect, useState } from "react";
import HeroAdminCom from "./HeroAdminCom";

export default function HeroAdmin() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getHomeData = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/home-page`);

      if (!res.ok) throw new Error("Failed to fetch data");

      const data = await res.json();
      setHomeData(data);
    } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء تحميل البيانات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHomeData();
  }, []);

  if (loading)
    return (
      <p className="flex justify-center items-center min-h-screen text-xl font-semibold">
        جارٍ تحميل البيانات...
      </p>
    );
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!homeData?.header) return null;

  const apiPath = "/home-page";

  return (
    <HeroAdminCom
      key={apiPath} // 🔑 مهم لعزل كل instance
      initialData={
        homeData?.header
          ? {
              titleAr: homeData.header.title.ar,
              titleEn: homeData.header.title.en,
              subtitleAr: homeData.header.desc.ar,
              subtitleEn: homeData.header.desc.en,
              image: homeData.header.imgUrl,
            }
          : null
      }
      apiPath="/home-page"
      inHome={true}
    />
  );
}
