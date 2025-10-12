import { useDirection } from "@/hooks/useDirection";
import Nav from "@/components/Nav";
import { Route, Routes } from "react-router-dom";
import Home from '@/pages/Home';

function App() {
  useDirection();

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
