import { Route, Routes } from "react-router-dom";
import "./App.css";
import * as Pages from "./pages";
import CollectionsProvider from "./contexts/CollectionsContext";

function App() {
  return (
    <CollectionsProvider>
      <Routes>
        <Route index element={<Pages.HomePage />} />
        <Route path="/login" element={<Pages.Login />} />
        <Route path="/signup" element={<Pages.Register />} />
        <Route path="/search" element={<Pages.Search />} />
        <Route path="/chat" element={<Pages.Chat />} />
        <Route path="/offering" element={<Pages.Offering />} />
        <Route path="/swap">
          <Route index element={<Pages.Swap />} />
          <Route path="history" element={<Pages.SwapHistory />} />
        </Route>
        <Route path="/collection">
          <Route index element={<Pages.Collection />} />
          <Route path="add" element={<Pages.CollectionAdd />} />
        </Route>
      </Routes>
    </CollectionsProvider>
  );
}

export default App;
