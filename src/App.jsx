import { useTranslation } from "react-i18next";
import { useDirection } from "@/hooks/useDirection";
import Nav from "@/components/Nav";
import { Route, Routes } from "react-router-dom";
import Home from '@/pages/Home';

function App() {
  useDirection();
  const { t } = useTranslation();

  return (
    <>
    <Nav />
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
    </>
  );
}

export default App;
