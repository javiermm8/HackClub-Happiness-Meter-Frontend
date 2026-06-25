export default function Intro() {
  return (
    <div className="intro">
      <h2>Welcome!</h2>
      <p>
        This web page allows you to use the API I created for logging your
        happiness, right here in your own browser, no need to use curl!
      </p>
      <p>Useful links:</p>
      <ul>
        <li>
          Github page:{" "}
          <a href="https://github.com/javiermm8/HackClubHappinessMeterAPI">
            https://github.com/javiermm8/HackClubHappinessMeterAPI
          </a>
        </li>
        <li>
          Docs page:{" "}
          <a href="https://happinessmeter.javim.dev/docs">
            https://happinessmeter.javim.dev/docs
          </a>
        </li>
      </ul>
      <h3>How does it work?</h3>
      <p>
        Just log in, input your current happiness, write a note and press
        "Update Happiness!". Your profile will now display some stats and you'll
        be able to see your happiness friend.
      </p>
      <h3>What is a "Happiness Friend"?</h3>
      <p>
        The Happiness friend feature shows you the latest user who submitted the
        same happiness level as you plus other information about their latest
        entry.
      </p>
      <h2>Important</h2>
      <p>
        All information provided exept your APIKey can be publicly accesed via
        the Happiness Friend feature, so be careful with what you
        share(especially in the Notes field).
      </p>
      <p>
        Also, any misuse of the "Note" feature will result in a ban(I'll just
        randomize your API Key in the database). If you see anybody using this
        feature or any other feature wrong please DM javim on Slack.
      </p>
    </div>
  );
}
