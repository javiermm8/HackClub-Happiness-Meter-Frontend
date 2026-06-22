import { useState } from "react";

export default function Entry({ authLoaded, onSubmit }) {
  const [happinessLevel, setHappinessLevel] = useState(0);
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      authLoaded,
      happinessLevel,
      note,
    });
  };

  return (
    <div className="entry">
      <h2>New Entry</h2>
      {!authLoaded && (
        <>
          <p>Please log in to log your happiness level.</p>
        </>
      )}
      {authLoaded && (
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

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}
