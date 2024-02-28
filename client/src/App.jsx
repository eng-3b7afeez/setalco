import { Routes, Route } from "react-router-dom";
import { Login, Home, Customers, Operations, Layout } from "@/pages";
import { Header, Footer } from "@/components";
const App = () => {
  return (
    <main className="flex flex-col w-full">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="customers" element={<Customers />} />
          <Route path="operations" element={<Operations />} />
        </Route>
      </Routes>
      <Footer />
    </main>
  );
};
export default App;
