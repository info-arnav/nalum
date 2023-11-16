import Empty from "../empty";
import LoggedIn from "../loggedIn";

export const metadata = {
  title: "Events",
  description:
    "Have some exciting events happening at NSUT. Notify the people for the same here.",
  openGraph: {
    title: "Events",
    description:
      "Have some exciting events happening at NSUT. Notify the people for the same here.",
    url: `${process.env.LINK}events`,
    siteName: "Nalum",
    images: [
      {
        url: `${process.env.LINK}logo-background.png`,
        width: 250,
        height: 250,
        alt: "Nalum - NSUT Alumni Network Logo",
      },
      {
        url: `${process.env.LINK}logo.png`,
        width: 250,
        height: 193,
        alt: "Nalum - NSUT Alumni Network Logo",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    title: "Events",
    description:
      "Have some exciting events happening at NSUT. Notify the people for the same here.",
    images: [
      `${process.env.LINK}logo-background.png`,
      `${process.env.LINK}logo.png`,
    ],
  },
};

export default function UsersLayout({ children }) {
  const status = LoggedIn();
  if (status.loggedIn && status.data.type == "admin") {
    return <>{children}</>;
  } else {
    return (
      <>
        <Empty link="/"></Empty>
      </>
    );
  }
}
