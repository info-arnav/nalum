"use client";

import Cookies from "universal-cookie";

export default async function Logout(data) {
  let cookies = new Cookies();
  function generateFingerprint() {
    const language =
      navigator.language ||
      navigator.userLanguage ||
      navigator.browserLanguage ||
      navigator.systemLanguage;
    const platform = navigator.platform;
    const timezone = new Date().getTimezoneOffset();
    const cookiesEnabled = navigator.cookieEnabled;
    const fingerprint = `${language}_${platform}_${timezone}_${cookiesEnabled}`;
    return fingerprint;
  }
  await fetch("/api/logout", {
    method: "POST",
    body: JSON.stringify({ uuid: generateFingerprint(), data: data }),
  })
    .then((e) =>
      cookies.remove("session_id", {
        path: "/",
      })
    )
    .then(() => location.reload());
}
