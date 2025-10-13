import { useDirection } from "@/hooks/useDirection";
import Nav from "@/components/Nav";
import { Route, Routes } from "react-router-dom";
import Home from '@/pages/Home';
import AllArticles from '@/pages/AllArticles';
import Footer from "@/components/Footer";
import ArticleDetails from "./pages/ArticleDetails";

function App() {
  useDirection();

  return (
    <>
    <Nav />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/articles' element={<AllArticles />} />
      <Route path='/articles/:id' element={<ArticleDetails />} />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
