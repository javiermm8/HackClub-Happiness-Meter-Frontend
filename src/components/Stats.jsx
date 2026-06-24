export default function Stats({ statsOK, statsMessage }) {
  return (
    <div className="stats">
      <h2>Stats</h2>
      {!statsOK && <p>Unable to get stats.</p>}
      {statsOK && <p>{statsMessage}</p>}
    </div>
  );
}
