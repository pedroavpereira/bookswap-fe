import { Route, Routes } from "react-router-dom";
import "./App.css";
import * as Pages from "./pages";

function App() {
  return (
    <Routes>
      <Route index element={<Pages.HomePage />} />
      <Route path="/login" element={<Pages.Login />} />
      <Route path="/signup" element={<Pages.Register />} />
      <Route path="/search" element={<Pages.Search />} />
      <Route path="/chat" element={<Pages.Chat />} />
      <Route path="/swap">
        <Route index element={<Pages.Swap />} />
        <Route index element={<Pages.SwapHistory />} />
      </Route>
      <Route path="/offering" element={<Pages.Offering />} />
      <Route path="/collection">
        <Route index element={<Pages.Collection />} />
        <Route index element={<Pages.CollectionAdd />} />
      </Route>
    </Routes>
  );
}

export default App;
