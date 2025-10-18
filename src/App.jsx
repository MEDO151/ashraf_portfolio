import { useDirection } from "@/hooks/useDirection";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
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
import EditOneArticleAdmin from "./components/EditOneArticleAdmin";
import CreateArticle from "./components/CreateArticle";

function App() {
  useDirection();

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<AllArticles />} />
          <Route path="/articles/:slug" element={<ArticleDetails />} />
        </Route>

        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<Navigate to="hero" />} />
          <Route path="hero" element={<HeroAdmin />} />
          <Route path="about" element={<AboutAdmin />} />
          <Route path="article" element={<ArticleAdmin />} />
          <Route path="articlesection" element={<ArticleSectionAdmin />} />
          <Route path="/admin/article/edit/:id" element={<EditOneArticleAdmin />} />
          <Route path="/admin/article/create" element={<CreateArticle />} />

          <Route path="contact" element={<ContactAdmin />} />
          <Route path="seo" element={<SeoAdmin />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
