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
  const [authed, setAuthed] = useState("un-authed");
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

  const [statusOK, setStatusOK] = useState(false);

  fetch("https://happinessmeter.javim.dev/status")
    .then((response) => {
      if (!response.ok) {
        setStatusOK(false);
        throw new Error("Network response was not ok");
      } else {
        setStatusOK(true);
      }
    })
    .catch((error) => console.error("GET status error:", error));

  async function loadProfile({ slackID, apiKey }) {
    try {
      const response = await fetch(
        "https://happinessmeter.javim.dev/profile?slackID=" +
          encodeURIComponent(slackID),
        {
          headers: {
            Authorization: apiKey,
          },
        },
      );

      if (response.status === 401) {
        setAuthed("bad-authed");
        return;
      }

      const data = await response.json();

      if (response.status === 404) {
        setApiKey(apiKey);
        setSlackID(slackID);
        setAuthed("authed");
        setUserSlackID(data?.SlackID ?? "");
        setUserName(data?.Name ?? null);
        setUserLatestHappinessLevel(data?.LatestHappinessLevel ?? "");
        setUserLatestEntryTimestamp(data?.LatestEntryTimestamp ?? "");
        setUserAverageHappiness(data?.AverageHappiness ?? "");
        setNumberOfEntries(data?.NumberOfEntries ?? "");
        setLatestNote(data?.LatestNote ?? "");
        return;
      }

      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.status);
      }

      setApiKey(apiKey);
      setSlackID(slackID);
      setAuthed("authed");
      setUserSlackID(data.SlackID);
      setUserName(data.Name);
      setUserLatestHappinessLevel(data.LatestHappinessLevel);
      setUserLatestEntryTimestamp(data.LatestEntryTimestamp);
      setUserAverageHappiness(data.AverageHappiness);
      setNumberOfEntries(data.NumberOfEntries);
      setLatestNote(data.LatestNote);
    } catch (error) {
      console.error("GET profile error:", error);
    }
  }

  const handleNewEntry = async ({ happinessLevel, note }) => {
    const body = {
      APIKey: apiKey,
      HappinessLevel: Number(happinessLevel),
      SlackID: slackID,
      Note: note,
    };

    try {
      const response = await fetch(
        "https://happinessmeter.javim.dev/newEntry",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.status);
      }

      setEntrySuccess(true);
      await loadProfile({ slackID, apiKey });
    } catch (error) {
      console.error("POST new entry error:", error);
      setEntrySuccess(false);
    }
  };

  return (
    <>
      <Header statusOK={statusOK} />
      <div className="main">
        <Intro />
        <Auth authed={authed} onSubmit={loadProfile} />
        <Profile
          authed={authed}
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
        <Entry
          authed={authed}
          entrySuccess={entrySuccess}
          onSubmit={handleNewEntry}
        />
      </div>
      <Footer />
    </>
  );
}

export default App;
