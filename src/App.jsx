import { useState } from "react";

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
  const [userName, setUserName] = useState("");
  const [userSlackID, setUserSlackID] = useState("");
  const [userLatestHappinessLevel, setUserLatestHappinessLevel] = useState("");
  const [userLatestNote, setLatestNote] = useState("");
  const [userLatestEntryTimestamp, setUserLatestEntryTimestamp] = useState("");
  const [userAverageHappiness, setUserAverageHappiness] = useState("");
  const [userNumberOfEntries, setNumberOfEntries] = useState("");

  // fetch("https://pep-unethical-copy.ngrok-free.dev/status", {
  //   headers: { "ngrok-skip-browser-warning": "true" },
  // })
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     return response.json();
  //   })
  //   .then((data) => console.log(data))
  //   .catch((error) => console.error("Fetch error:", error));

  const handleAuth = ({ slackID, apiKey }) => {
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
        const data = response.json();
        if (response.status != 404 && !response.ok) {
          throw new Error("Network response was not ok");
        }
        return data;
      })
      .then(function (data) {
        if (data.message == "No profile found. Have you created any entries?") {
          console.log(data.message);
          return;
        } else {
          setUserSlackID(data.SlackID);
          setUserName(data.Name);
          setUserLatestHappinessLevel(data.LatestHappinessLevel);
          setUserLatestEntryTimestamp(data.LatestEntryTimestamp);
          setUserAverageHappiness(data.AverageHappiness);
          setNumberOfEntries(data.NumberOfEntries);
          setLatestNote(data.LatestNote);
          console.log(
            userName,
            userSlackID,
            userLatestHappinessLevel,
            userLatestNote,
            userLatestEntryTimestamp,
            userAverageHappiness,
            userNumberOfEntries,
          );
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  };

  return (
    <>
      <Header />
      <div className="main">
        <Intro />
        <Auth onSubmit={handleAuth} />
        <Profile
          userName={userName}
          userSlackID={userSlackID}
          userLatestHappinessLevel={userLatestHappinessLevel}
          userLatestNote={userLatestNote}
          userLatestEntryTimestamp={userLatestEntryTimestamp}
          userAverageHappiness={userAverageHappiness}
          userNumberOfEntries={userNumberOfEntries}
        />
        <SignIn />
        <Friend />
        <Entry />
      </div>
      <Footer />
    </>
  );
}

export default App;
