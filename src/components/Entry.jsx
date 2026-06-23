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
          <input
            type="number"
            min="1"
            max="10"
            value={happinessLevel}
            onChange={(e) => setHappinessLevel(e.target.value)}
          />
          <input
            placeholder="Note"
            value={note}
            minLength="10"
            maxLength="300"
            onChange={(e) => setNote(e.target.value)}
          />

          {entrySuccess && (
            <p>Happiness level updated! Your profile has been updated.</p>
          )}

          <button type="submit">Update Happiness!</button>
        </form>
      )}
    </div>
  );
}
