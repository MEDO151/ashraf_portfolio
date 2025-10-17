import { useDirection } from "@/hooks/useDirection";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import AllArticles from "@/pages/AllArticles";
import ArticleDetails from "./pages/ArticleDetails";
import MainLayout from "./components/layouts/MainLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";
import HeroAdmin from "./components/HeroAdmin";
import AboutAdmin from "./components/AboutAdmin";
import ArticleAdmin from "./components/ArticleAdmin";
import ContactAdmin from "./components/ContactAdmin";
import SeoAdmin from "./components/SeoAdmin";
import Login from "./pages/Login";
import ArticleSectionAdmin from "./components/ArticleSectionAdmin";
import OneArticleAdmin from "./components/OneArticleAdmin";

function App() {
  useDirection();

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<AllArticles />} />
          <Route path="/articles/:id" element={<ArticleDetails />} />
        </Route>

        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<Navigate to="heroadmin" />} />
          <Route path="heroadmin" element={<HeroAdmin />} />
          <Route path="aboutadmin" element={<AboutAdmin />} />
          <Route path="articleadmin" element={<ArticleAdmin />} />
          <Route path="articlesectionadmin" element={<ArticleSectionAdmin />} />
          <Route path="/admin/articleadmin/:id" element={<OneArticleAdmin />} />
          <Route path="contactadmin" element={<ContactAdmin />} />
          <Route path="seoadmin" element={<SeoAdmin />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
