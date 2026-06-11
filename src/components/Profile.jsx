export default function Profile({
  userName,
  userSlackID,
  userLatestHappinessLevel,
  userLatestNote,
  userLatestEntryTimestamp,
  userAverageHappiness,
  userNumberOfEntries,
}) {
  let name;
  let SlackID;
  let LatestHappinessLevel;
  let LatestNote;
  let LatestEntryTimestamp;
  let AverageHappiness;
  let NumberOfEntries;

  if (userName == "") {
    name = "";
    SlackID = "";
    LatestHappinessLevel = "";
    LatestNote = "";
    LatestEntryTimestamp = "";
    AverageHappiness = "";
    NumberOfEntries = "";
  } else {
    name = "Slack username:" + userName;
    SlackID = "Slack ID:" + userSlackID;
    LatestHappinessLevel = "LatestHappinessLevel:" + userLatestHappinessLevel;
    LatestNote = "Latest note:" + userLatestNote;
    LatestEntryTimestamp = "Latest entry timestamp:" + userLatestEntryTimestamp;
    AverageHappiness = "Average happiness:" + userAverageHappiness;
    NumberOfEntries = "Number of entries:" + userNumberOfEntries;
  }

  return (
    <div className="profile">
      <h2>Your Profile</h2>
      <img />
      <h4>{name}</h4>
      <p>{SlackID}</p>
      <h5>{LatestHappinessLevel}</h5>
      <p>
        {LatestNote}, {LatestEntryTimestamp}, {AverageHappiness},
        {NumberOfEntries},
      </p>
    </div>
  );
}
