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
    </div>
  );
}
