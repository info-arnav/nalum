import Empty from "../empty";
import LoggedIn from "../loggedIn";

export const metadata = {
  title: "Mailing",
  description:
    "Want to notify the whole alumni network ? You can do that here.",
  openGraph: {
    title: "Mailing",
    description:
      "Want to notify the whole alumni network ? You can do that here.",
    url: `${process.env.LINK}mailing`,
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
    title: "Mailing",
    description:
      "Want to notify the whole alumni network ? You can do that here.",
    images: [
      `${process.env.LINK}logo-background.png`,
      `${process.env.LINK}logo.png`,
    ],
  },
};

export default function MailingLayout({ children }) {
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
