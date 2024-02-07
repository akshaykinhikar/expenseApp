import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddGroup from "./components/AddGroup";
import AddExpenseComponent from "./components/AddExpenseComponent";
import NavbarComponent from "./components/NavbarComponent";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavbarComponent />}>
          <Route index element={<AddExpenseComponent />} />
          <Route path="group" element={<AddGroup />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
    

    // <div>
    //   <NavbarComponent />
    //   {/* <AddExpenseComponent></AddExpenseComponent> */}
    //   {/* <AddGroup></AddGroup> */}

    // </div>
  );
}

export default App;
