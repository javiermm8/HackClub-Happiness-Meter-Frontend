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
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Slack ID"
          value={slackID}
          onChange={(e) => setSlackID(e.target.value)}
        />
        <input
          placeholder="Api Key"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <p style={{ fontStyle: "italic" }}>
        Ptss..., don't have an Api Key? Read: How do I get an API Key?
      </p>
    </div>
  );
}
