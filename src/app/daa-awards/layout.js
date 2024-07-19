export const metadata = {
  title: "DAA Awards",
  description:
    "Welcome to Nalum, the exclusive platform connecting NSUT/DIT students and alumni. Discover networking opportunities, mentorship, job offers, internships, and more while staying engaged with the NSUT/DIT community. Explore our database of past NSUT Distinguished Alumni Awards (DAA) winners and get inspired by their achievements and contributions.",
  openGraph: {
    title: "DAA Awards",
    description:
      "Welcome to Nalum, the exclusive platform connecting NSUT/DIT students and alumni. Discover networking opportunities, mentorship, job offers, internships, and more while staying engaged with the NSUT/DIT community. Explore our database of past NSUT Distinguished Alumni Awards (DAA) winners and get inspired by their achievements and contributions.",
    url: `${process.env.LINK}daa-awards`,
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
    title: "DAA Awards",
    description:
      "Welcome to Nalum, the exclusive platform connecting NSUT/DIT students and alumni. Discover networking opportunities, mentorship, job offers, internships, and more while staying engaged with the NSUT/DIT community. Explore our database of past NSUT Distinguished Alumni Awards (DAA) winners and get inspired by their achievements and contributions.",
    images: [
      `${process.env.LINK}logo-background.png`,
      `${process.env.LINK}logo.png`,
    ],
  },
};

export default function DAALayout({ children }) {
  return <>{children}</>;
}
