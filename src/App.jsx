import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/index"; // Ensure correct path
import Footer from "./components/Footer/index"; // Ensure correct path
import * as Pages from "./pages"; // Ensure all components are correctly exported from this index.js file
import CollectionsProvider from "./contexts/CollectionsContext"; // Ensure correct path
import SwapsProvider from "./contexts/SwapsContext"; // Ensure correct path
import { BookSwapProvider } from "./contexts/BookSwapContext"; // Ensure correct path

function App() {
  return (
    <>
      <BookSwapProvider>
        <SwapsProvider>
          <CollectionsProvider>
            <Header />
            <Routes>
              <Route index element={<Pages.HomePage />} />
              <Route path="/login" element={<Pages.Login />} />
              <Route path="/signup" element={<Pages.Register />} />
              <Route path="/search" element={<Pages.Search />} />
              <Route path="/chat" element={<Pages.Chat />} />
              <Route
                path="/offering/:collection_id"
                element={<Pages.OfferingPage />}
              />
              <Route path="/wishlist" element={<Pages.WishList />} />
              <Route path="/swaps" element={<Pages.Swap />} />
              <Route path="/collection">
                <Route index element={<Pages.Collection />} />
                <Route path="add" element={<Pages.CollectionAdd />} />
              </Route>
            </Routes>
            <Footer />
          </CollectionsProvider>
        </SwapsProvider>
      </BookSwapProvider>
    </>
  );
}

export default App;
