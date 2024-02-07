import AddGroup from "./components/AddGroup";
import AddExpenseComponent from "./components/AddExpenseComponent";
import NavbarComponent from "./components/NavbarComponent";

function App() {
  return (
    <div>
      <NavbarComponent />
      {/* <AddExpenseComponent></AddExpenseComponent> */}
      <AddGroup></AddGroup>

    </div>
  );
}

export default App;
