import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import * as Pages from "./pages";
import CollectionsProvider from "./contexts/CollectionsContext";
import { BookSwapProvider } from "./contexts/BookSwapContext";

function App() {
  return (
    <BookSwapProvider>
      <CollectionsProvider>
        <>
          <Header />
          <Routes>
            <Route index element={<Pages.HomePage />} />
            <Route path="/login" element={<Pages.Login />} />
            <Route path="/signup" element={<Pages.Register />} />
            <Route path="/search" element={<Pages.Search />} />
            <Route path="/chat" element={<Pages.Chat />} />
            <Route path="/offering/:bookId" element={<Pages.OfferingPage />} />
            <Route path="/swap" element={<Pages.Swap />} />
            <Route path="/swap/history" element={<Pages.SwapHistory />} />
            <Route path="/collection" element={<Pages.Collection />} />
            <Route path="/collection/add" element={<Pages.CollectionAdd />} />
          </Routes>
          <Footer />
        </>
      </CollectionsProvider>
    </BookSwapProvider>
  );
}

export default App;
