import "./App.css";
import Clockcontainer from "./components/Clockcontainer";
import Header from "./components/Header";

function App() {
  return (
    <div className="min-h-screen md:flex flex-col items-center justify-center">
      <Header />
      <Clockcontainer />
    </div>
  );
}

export default App;
