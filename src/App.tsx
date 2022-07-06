import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlockList from "./pages/BlockList";
import BlockContent from "./pages/BlockContent";
import TxList from "./pages/TxList";
import TxContent from "./pages/TxContent";
import AddressDetail from "./pages/AddressDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blocks/:page" element={<BlockList />} />
        <Route path="/block/:number" element={<BlockContent />} />
        <Route path="/txs/:page" element={<TxList />} />
        <Route path="/tx/:hash" element={<TxContent />} />
        <Route path="/address/:adress" element={<AddressDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
