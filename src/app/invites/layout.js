import Empty from "../empty";
import LoggedIn from "../loggedIn";

export const metadata = {
  title: "Invites",
  description:
    "Access the administrative heart of Nalum – your control center for managing user access, content moderation, and platform configurations. Utilize tools and features tailored to streamline user management, content monitoring, and system settings, ensuring a smooth and secure community experience within the Nalum portal.",
  openGraph: {
    title: "Invites",
    description:
      "Access the administrative heart of Nalum – your control center for managing user access, content moderation, and platform configurations. Utilize tools and features tailored to streamline user management, content monitoring, and system settings, ensuring a smooth and secure community experience within the Nalum portal.",
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
    title: "Invites",
    description:
      "Access the administrative heart of Nalum – your control center for managing user access, content moderation, and platform configurations. Utilize tools and features tailored to streamline user management, content monitoring, and system settings, ensuring a smooth and secure community experience within the Nalum portal.",
    images: [
      `${process.env.LINK}logo-background.png`,
      `${process.env.LINK}logo.png`,
    ],
  },
};

export default function InvitesLayout({ children }) {
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
