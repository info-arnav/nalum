import Links from "./links";

export default function Admin({ path, data, link }) {
  return (
    <Links
      links={[
        ["Home", "/"],
        ["Users", "/users"],
        ["Messages", "/messages"],
        ["Invite", "/invites"],
        ["Interns", "/recruitment"],
        ["Events", "/events"],
        ["Mail", "/mailing"],
      ]}
      logout={true}
      path={path}
      data={{ id: "pending" }}
      link={link}
    ></Links>
  );
}
