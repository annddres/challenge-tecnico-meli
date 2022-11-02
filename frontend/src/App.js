import { BrowserRouter } from 'react-router-dom';
import Header from "./components/Header";
import Pages from "./components/Pages";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Header />
       <Pages />
      </BrowserRouter>
    </div>
  );
}

export default App;
