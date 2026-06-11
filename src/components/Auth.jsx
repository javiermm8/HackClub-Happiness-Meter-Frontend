import { useState } from "react";

export default function Auth({ onSubmit }) {
  const [slackID, setSlackID] = useState("");
  const [apiKey, setApiKey] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      slackID,
      apiKey,
    });
  };

  return (
    <div className="auth">
      <h2>Auth</h2>
      <p>Your apiKey here</p>
      <form onSubmit={handleSubmit}>
        <input value={slackID} onChange={(e) => setSlackID(e.target.value)} />
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <p>(Don't share it and blablabla)</p>
    </div>
  );
}
