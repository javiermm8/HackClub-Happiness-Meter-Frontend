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
  fetch("https://pep-unethical-copy.ngrok-free.dev/status", {
    headers: { "ngrok-skip-browser-warning": "true" },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Fetch error:", error));

  const handleAuth = ({ slackID, apiKey }) => {
    console.log(slackID, apiKey);
    fetch(
      "https://pep-unethical-copy.ngrok-free.dev/profile?slackID=" + slackID,
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
          Authorization: apiKey,
        },
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Fetch error:", error));
  };

  return (
    <>
      <Header />
      <div className="main">
        <Intro />
        <Auth onSubmit={handleAuth} />
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
