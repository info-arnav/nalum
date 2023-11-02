import Empty from "../empty";
import LoggedIn from "../loggedIn";

export const metadata = {
  title: "Messages",
  description:
    "View all the queries that people have in using the platform via the admin console of Nalum. You can view all the messages sent to the admin on the portal here.",
  openGraph: {
    title: "Messages",
    description:
      "View all the queries that people have in using the platform via the admin console of Nalum. You can view all the messages sent to the admin on the portal here.",
    url: `${process.env.LINK}users`,
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
    title: "Messages",
    description:
      "View all the queries that people have in using the platform via the admin console of Nalum. You can view all the messages sent to the admin on the portal here.",
    images: [
      `${process.env.LINK}logo-background.png`,
      `${process.env.LINK}logo.png`,
    ],
  },
};

export default function MessagesLayout({ children }) {
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
