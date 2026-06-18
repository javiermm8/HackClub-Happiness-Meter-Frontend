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
  const [authLoaded, setAuthLoaded] = useState(false);
  const [userName, setUserName] = useState("");
  const [userSlackID, setUserSlackID] = useState("");
  const [userLatestHappinessLevel, setUserLatestHappinessLevel] = useState("");
  const [userLatestNote, setLatestNote] = useState("");
  const [userLatestEntryTimestamp, setUserLatestEntryTimestamp] = useState("");
  const [userAverageHappiness, setUserAverageHappiness] = useState("");
  const [userNumberOfEntries, setNumberOfEntries] = useState("");

  const [slackID, setSlackID] = useState("");
  const [apiKey, setApiKey] = useState("");

  const [entrySuccess, setEntrySuccess] = useState(false);

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

  function handleAuth({ slackID, apiKey }) {
    fetch("https://happinessmeter.javim.dev/profile?slackID=" + slackID, {
      headers: {
        Authorization: apiKey,
      },
    })
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
          setApiKey(apiKey);
          setSlackID(slackID);
          setUserSlackID(data.SlackID);
          setUserName(data.Name);
          setUserLatestHappinessLevel(data.LatestHappinessLevel);
          setUserLatestEntryTimestamp(data.LatestEntryTimestamp);
          setUserAverageHappiness(data.AverageHappiness);
          setNumberOfEntries(data.NumberOfEntries);
          setLatestNote(data.LatestNote);
          setAuthLoaded(true);
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  }

  const handleNewEntry = ({ happinessLevel, note }) => {
    const data = {
      APIKey: apiKey,
      HappinessLevel: Number(happinessLevel),
      SlackID: slackID,
      Note: note,
    };

    fetch("https://happinessmeter.javim.dev/newEntry", {
      method: "POST",
      body: JSON.stringify(data),
    })
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
          setEntrySuccess(true);
          handleAuth({ slackID, apiKey });
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
          authLoaded={authLoaded}
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
        <Entry authLoaded={authLoaded} onSubmit={handleNewEntry} />
      </div>
      <Footer />
    </>
  );
}

export default App;
