import "./App.css";

import Header from "./components/Header";
import Intro from "./components/Intro";
import Auth from "./components/Auth";
import Profile from "./components/Profile";
import SignIn from "./components/SignIn";
import Friend from "./components/Friend";
import Entry from "./components/Entry";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <div className="main">
        <Intro />
        <Auth />
        <Profile />
        <SignIn />
        <Friend />
        <Entry />
      </div>
      <Footer />
    </>
  );
}

export default App;
