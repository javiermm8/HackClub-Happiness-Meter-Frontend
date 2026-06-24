import { useState } from "react";

export default function Entry({ authed, entrySuccess, onSubmit }) {
  const [happinessLevel, setHappinessLevel] = useState(0);
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      happinessLevel,
      note,
    });
  };

  return (
    <div className="entry">
      <h2>New Entry</h2>
      {authed != "authed" && (
        <>
          <p>Please log in to update your happiness level.</p>
        </>
      )}
      {authed == "authed" && (
        <form onSubmit={handleSubmit}>
          <small>
            In a scale from 1 to 10 how happy are you right now? Value:{" "}
            {happinessLevel}
          </small>
          <input
            type="range"
            min="1"
            max="10"
            value={happinessLevel}
            onChange={(e) => setHappinessLevel(e.target.value)}
          />
          <small>And why?</small>
          <input
            placeholder="Note"
            value={note}
            minLength="10"
            maxLength="300"
            onChange={(e) => setNote(e.target.value)}
          />

          {entrySuccess === "good-entry" && (
            <p style={{ color: "green" }}>
              Happiness level updated! Your profile has been updated.
            </p>
          )}

          {entrySuccess === "bad-entry" && (
            <p style={{ color: "red" }}>
              Something went wrong. Unable to update your happiness. Try again
              later.
            </p>
          )}

          <button type="submit">Update Happiness!</button>
        </form>
      )}
    </div>
  );
}
