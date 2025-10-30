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
import ProtectedRoute from "./components/ProtectedRoute";
import { useSeo } from "./components/SeoProvider";
import { Helmet } from "react-helmet";
import ChangePassword from "./components/ChangePassword";

function App() {
  useDirection();
  const { seoData } = useSeo();

  if (!seoData.title) return null;

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.desc} />
        <meta name="keywords" content={seoData.keywords} />
        {seoData.image && <link rel="icon" href={seoData.image} />}
      </Helmet>

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="Mkafrawi/" element={<Home />} />
          <Route path="/articles" element={<AllArticles />} />
          <Route path="/articles/:slug" element={<ArticleDetails />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="Mkafrawi/admin" element={<DashboardLayout />}>
            <Route index element={<Navigate to="hero" />} />
            <Route path="hero" element={<HeroAdmin />} />
            <Route path="about" element={<AboutAdmin />} />
            <Route path="article" element={<ArticleAdmin />} />
            <Route path="articlesection" element={<ArticleSectionAdmin />} />
            <Route
              path="article/edit/:slug"
              element={<EditOneArticleAdmin />}
            />
            <Route path="article/create" element={<CreateArticle />} />
            <Route path="contact" element={<ContactAdmin />} />
            <Route path="seo" element={<SeoAdmin />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Route>

        <Route path="Mkafrawi/login" element={<Login />} />

        <Route
          path="*"
          element={
            <h1 className="h-screen text-3xl flex justify-center items-center">
              404 - Page Not Found
            </h1>
          }
        />
      </Routes>
    </>
  );
}

export default App;
