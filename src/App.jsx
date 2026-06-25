import { useState, useEffect } from "react";

import "./App.css";

import Header from "./components/Header";
import Intro from "./components/Intro";
import Auth from "./components/Auth";
import Profile from "./components/Profile";
import SignIn from "./components/SignIn";
import Friend from "./components/Friend";
import Entry from "./components/Entry";
import Footer from "./components/Footer";
import Stats from "./components/Stats";

function App() {
  ///STATES
  // useStates for STATUS
  const [statusOK, setStatusOK] = useState(false);
  // useStates for STATS
  const [statsOK, setStatsOK] = useState(false);
  const [statsMessage, setStatsMessage] = useState("");
  // useStates for AUTH
  const [authed, setAuthed] = useState("un-authed");
  const [slackID, setSlackID] = useState("");
  const [apiKey, setApiKey] = useState("");
  // useStates for PROFILE info
  const [userName, setUserName] = useState("");
  const [userSlackID, setUserSlackID] = useState("");
  const [userLatestHappinessLevel, setUserLatestHappinessLevel] = useState("");
  const [userLatestNote, setLatestNote] = useState("");
  const [userLatestEntryTimestamp, setUserLatestEntryTimestamp] = useState("");
  const [userAverageHappiness, setUserAverageHappiness] = useState("");
  const [userNumberOfEntries, setNumberOfEntries] = useState("");
  // useStates for ENTRY
  const [entrySuccess, setEntrySuccess] = useState("no-entry");
  // useStates for FRIEND
  const [friendOK, setFriendOK] = useState(true);
  const [friendExists, setFriendExists] = useState(false);
  const [friendMessage, setFriendMessage] = useState("");

  ///FETCH FUNCTIONS
  // GET /status
  useEffect(() => {
    async function checkStatus() {
      try {
        const response = await fetch("https://happinessmeter.javim.dev/status");
        //If rate limited
        if (response.status === 429) {
          setStatusOK(false);
          throw new Error("Network response was not ok: " + response.status);
        }
        if (!response.ok) {
          setStatusOK(false);
        } else {
          setStatusOK(true);
        }
      } catch (error) {
        setStatusOK(false);
        console.error("GET status error:", error);
      }
    }
    //Check status when loading the page
    checkStatus();
    //Check status every 30sec
    const interval = setInterval(checkStatus, 30_000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  // GET /stats
  useEffect(() => {
    async function getStats() {
      try {
        const response = await fetch("https://happinessmeter.javim.dev/stats");
        //If rate limited
        if (response.status === 429) {
          setStatsOK(false);
          return;
        }
        if (!response.ok) {
          setStatsOK(false);
          throw new Error("Network response was not ok: " + response.status);
        } else {
          setStatsOK(true);
          const data = await response.json();
          setStatsMessage(data.message);
        }
      } catch (error) {
        setStatsOK(false);
        console.error("GET stats error:", error);
      }
    }
    //Check status when loading the page
    getStats();
    //Check status every 30sec
    const interval = setInterval(getStats, 30_000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  // GET /profile(called when user auths)
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
      if (response.status === 404) {
        setApiKey(apiKey);
        setSlackID(slackID);
        setAuthed("authed");

        setUserSlackID("");
        setUserName("");
        setUserLatestHappinessLevel("");
        setUserLatestEntryTimestamp("");
        setUserAverageHappiness("");
        setNumberOfEntries("");
        setLatestNote("");
        return;
      }

      if (!response.ok) {
        setAuthed("something-wrong-authed");
        throw new Error("Network response was not ok: " + response.status);
      }

      setApiKey(apiKey);
      setSlackID(slackID);
      setAuthed("authed");
      const data = await response.json();
      setUserSlackID(data.SlackID);
      setUserName(data.Name);
      setUserLatestHappinessLevel(data.LatestHappinessLevel);
      setUserLatestEntryTimestamp(data.LatestEntryTimestamp);
      setUserAverageHappiness(data.AverageHappiness);
      setNumberOfEntries(data.NumberOfEntries);
      setLatestNote(data.LatestNote);
    } catch (error) {
      setAuthed("something-wrong-authed");
      console.error("GET profile error:", error);
    }
  }
  // POST /newEntry
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
        setEntrySuccess("bad-entry");
        setFriendOK(false);
        throw new Error("Network response was not ok: " + response.status);
      }

      setEntrySuccess("good-entry");
      getHappinessFriend(Number(happinessLevel));
      await loadProfile({ slackID, apiKey });
    } catch (error) {
      setEntrySuccess("bad-entry");
      setFriendOK(false);
      console.error("POST new entry error:", error);
    }
  };
  // GET /happinessFriend
  async function getHappinessFriend(happinessLevel) {
    try {
      const response = await fetch(
        "https://happinessmeter.javim.dev/happinessFriend?happinessLevel=" +
          encodeURIComponent(happinessLevel),
      );

      if (response.status === 404) {
        setFriendOK(true);
        setFriendExists(false);
        return;
      }

      const data = await response.json();
      setFriendOK(true);
      setFriendExists(true);
      setFriendMessage(data?.message ?? "");

      if (!response.ok) {
        setFriendOK(false);
        throw new Error("Network response was not ok: " + response.status);
      }
    } catch (error) {
      setFriendOK(false);
      console.error("GET happinessFriend error:", error);
    }
  }

  return (
    <>
      <Header statusOK={statusOK} />
      <div className="main">
        <Intro />
        <SignIn />
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
        <Friend
          friendOK={friendOK}
          entrySuccess={entrySuccess}
          friendExists={friendExists}
          friendMessage={friendMessage}
        />
        <Entry
          authed={authed}
          entrySuccess={entrySuccess}
          onSubmit={handleNewEntry}
        />

        <Stats statsOK={statsOK} statsMessage={statsMessage} />
      </div>
      <Footer />
    </>
  );
}

export default App;
