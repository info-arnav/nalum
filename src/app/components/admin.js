import Links from "./links";

export default function Admin({ path, data, link }) {
  return (
    <Links
      links={[
        ["Home", "/"],
        ["Users", "/users"],
        ["Messages", "/messages"],
        ["Invites", "/invites"],
        ["Internships", "/recruitment"],
        ["Events", "/events"],
      ]}
      logout={true}
      path={path}
      data={{ id: "pending" }}
      link={link}
    ></Links>
  );
}
