import { useDirection } from "@/hooks/useDirection";
import Nav from "@/components/Nav";
import { Route, Routes } from "react-router-dom";
import Home from '@/pages/Home';
import AllArticles from '@/pages/AllArticles';
import Footer from "@/components/Footer";

function App() {
  useDirection();

  return (
    <>
    <Nav />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/articles' element={<AllArticles />} />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
