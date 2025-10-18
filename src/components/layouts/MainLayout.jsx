import { Outlet } from "react-router-dom";

import React from "react";
import Nav from "../Nav";
import Footer from "../Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
