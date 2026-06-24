export default function Header({ statusOK }) {
  return (
    <header>
      <h1>HackClub Happiness Meter</h1>
      {!statusOK && <p>🔴 API Not Operational :(</p>}
      {statusOK && <p>🟢 API Operational :)</p>}
    </header>
  );
}
