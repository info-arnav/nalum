import Empty from "../empty";
import LoggedIn from "../loggedIn";

export const metadata = {
  title: "All Users",
  description:
    "Explore and oversee the comprehensive list of registered users on our admin page at Nalum. Gain complete visibility and control over user accounts in one centralized platform. Effectively manage user data and permissions with ease. Nalum - Empowering admins with streamlined user management for enhanced platform control.",
  openGraph: {
    title: "All Users",
    description:
      "Explore and oversee the comprehensive list of registered users on our admin page at Nalum. Gain complete visibility and control over user accounts in one centralized platform. Effectively manage user data and permissions with ease. Nalum - Empowering admins with streamlined user management for enhanced platform control.",
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
    title: "All Users",
    description:
      "Explore and oversee the comprehensive list of registered users on our admin page at Nalum. Gain complete visibility and control over user accounts in one centralized platform. Effectively manage user data and permissions with ease. Nalum - Empowering admins with streamlined user management for enhanced platform control.",
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
