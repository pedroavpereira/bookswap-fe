import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layouts";
import * as Pages from "./pages"; // Ensure all components are correctly exported from this index.js file
import CollectionsProvider from "./contexts/CollectionsContext"; // Ensure correct path
import SwapsProvider from "./contexts/SwapsContext"; // Ensure correct path
import { BookSwapProvider } from "./contexts/BookSwapContext"; // Ensure correct path
import UserProvider from "./contexts/UserContext";
import ChatProvider from "./contexts/ChatsContext";
import Chat from "./components/Chat";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BookSwapProvider>
        <UserProvider>
          <ChatProvider>
            <SwapsProvider>
              <CollectionsProvider>
                <Routes>
                  <Route element={<Layout />}>
                    <Route index element={<Pages.HomePage />} />
                    <Route path="/login" element={<Pages.Login />} />
                    <Route path="/signup" element={<Pages.Register />} />
                    <Route path="/search" element={<Pages.Search />} />
                    <Route path="/profile" element={<Pages.Profile />} />
                    <Route path="/wishlist" element={<Pages.WishList />} />
                    <Route
                      path="/offering/:collection_id"
                      element={<Pages.OfferingPage />}
                    />
                    <Route path="/swap">
                      <Route index element={<Pages.Swap />} />
                      <Route
                        path="accept/:swap_id"
                        element={<Pages.SwapAccept />}
                      />
                    </Route>

                    <Route path="/collection" element={<Pages.Collection />} />
                  </Route>
                </Routes>

                <Chat />
                {/* <ChatWindow /> */}
              </CollectionsProvider>
            </SwapsProvider>
          </ChatProvider>
        </UserProvider>
        <Toaster position="bottom-right" />
      </BookSwapProvider>
    </>
  );
}

export default App;
