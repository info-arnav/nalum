import LoggedIn from "../loggedIn";
import Result from "./result";

export default function Users({ type, link, data }) {
  const status = LoggedIn();
  return (
    <Result
      type={status.data.type}
      universal_link={process.env.LINK}
      data={status}
    ></Result>
  );
}
