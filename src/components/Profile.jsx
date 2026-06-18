export default function Profile({
  authLoaded,
  userName,
  userSlackID,
  userLatestHappinessLevel,
  userLatestNote,
  userLatestEntryTimestamp,
  userAverageHappiness,
  userNumberOfEntries,
}) {
  //let showProfile;

  let name;
  let SlackID;
  let LatestHappinessLevel;
  let LatestNote;
  let LatestEntryTimestamp;
  let AverageHappiness;
  let NumberOfEntries;

  name = userName;
  SlackID = "(" + userSlackID + ")";
  LatestHappinessLevel = "Latest happiness level: " + userLatestHappinessLevel;
  LatestNote = "Latest note: " + userLatestNote;
  LatestEntryTimestamp = "Latest entry timestamp: " + userLatestEntryTimestamp;
  AverageHappiness = "Average happiness: " + userAverageHappiness;
  NumberOfEntries = "Number of entries: " + userNumberOfEntries;

  return (
    <div className="profile">
      <h2>Your Profile</h2>
      {!authLoaded && (
        <p>Please log in and create an entry to view your profile.</p>
      )}
      {authLoaded && (
        <>
          <h4>{name}</h4>
          <p>{SlackID}</p>
          <h5>{LatestHappinessLevel}</h5>
          <p>{LatestNote}</p>
          <p>{LatestEntryTimestamp}</p>
          <p>{AverageHappiness}</p>
          <p>{NumberOfEntries}</p>
        </>
      )}
    </div>
  );
}
