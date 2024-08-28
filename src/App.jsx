import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as Pages from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pages.HomePage />} />
        <Route path="/chat" element={<Pages.Chat />} />
        <Route path="/collection" element={<Pages.Collection />} />
        <Route path="/collection/add" element={<Pages.CollectionAdd />} />
        <Route path="/login" element={<Pages.Login />} />
        <Route path="/offering" element={<Pages.Offering />} />
        <Route path="/profile" element={<Pages.Profile />} />
        <Route path="/register" element={<Pages.Register />} />
        <Route path="/search" element={<Pages.Search />} />
        <Route path="/swap" element={<Pages.Swap />} />
        <Route path="/swaphistory" element={<Pages.SwapHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
