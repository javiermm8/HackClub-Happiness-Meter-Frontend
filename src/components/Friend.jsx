export default function Friend({ entrySuccess, friendExists, friendMessage }) {
  return (
    <div className="friend">
      <h2>Your Happiness Friend is:</h2>
      {!entrySuccess && (
        <p>Please submit an entry to see your happiness friend.</p>
      )}
      {entrySuccess && !friendExists && (
        <p>No other user has submitted an entry with that happiness level :(</p>
      )}
      {entrySuccess && friendExists && <p>{friendMessage}</p>}
    </div>
  );
}
