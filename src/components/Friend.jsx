export default function Friend({
  friendOK,
  entrySuccess,
  friendExists,
  friendMessage,
}) {
  return (
    <div className="friend">
      <h2>Your Happiness Friend is:</h2>

      {console.log(friendOK, entrySuccess, friendExists)}

      {!friendOK && <p>Unable to find your happiness friend :(</p>}

      {entrySuccess === "no-entry" && (
        <p>Please submit an entry to see your happiness friend.</p>
      )}

      {entrySuccess === "good-entry" && !friendExists && (
        <p>No other user has submitted an entry with that happiness level :(</p>
      )}

      {entrySuccess === "good-entry" && friendExists && <p>{friendMessage}</p>}
    </div>
  );
}
