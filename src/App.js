import './App.css';
import ShowItem from "./ShowItem";
import Header from "./Header";
import Footer from "./Footer";
import ChatBox from "./ChatBox"
import ChatInputForm from "./ChatInputForm"

function App() {
  return (
      <div className="App">
        <Header/>
        <ChatBox item_id = "14314312" user_id = {341234123} user_name = {"EMERGENCY TYPHOON"}/>
        <ChatInputForm />
        <Footer/>
      </div>
  );
}

export default App;
