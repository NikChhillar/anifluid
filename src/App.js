import Popular from "./components/Popular";
import { useGlobalContext } from "./context/global";


function App() {

  const g = useGlobalContext()
  console.log(g);
  return (
    <div className="App">
      <Popular />
    </div>
  );
}

export default App;
