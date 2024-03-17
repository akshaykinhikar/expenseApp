import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import AddGroup from "./components/AddGroup";
import AddExpenseComponent from "./components/AddExpenseComponent";
import NavbarComponent from "./components/NavbarComponent";
import TodoComponent from "./components/TodoComponent";
import GalleryComponent from "./components/GalleryComponent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavbarComponent />}>
          <Route index element={<AddExpenseComponent />} />
          <Route path="group" element={<AddGroup />} />
          <Route path="todo" element={<TodoComponent />} />
          <Route path="gallery" element={<GalleryComponent />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
