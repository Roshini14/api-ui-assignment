import Body from "./components/Body";
import { ReactComponent as Home } from "./assets/ic_home.svg";
import { ReactComponent as NavIcon } from "./assets/ic_nav.svg";
import { ReactComponent as ListIcon } from "./assets/ic_list.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <nav className="App-nav">
        <NavIcon />
        <Home style={{ paddingTop: "75px" }} />
        <ListIcon style={{ paddingTop: "25px" }}/>
      </nav>
      <header className="App-header">
        <div className="App-header-item">Program Details</div>
        <div className="App-header-item-active">Application Form</div>
        <div className="App-header-item">WorkFlow</div>
        <div className="App-header-item">Preview</div>
      </header>
      <div className="App-body">
        <Body />
      </div>
    </div>
  );
}

export default App;
