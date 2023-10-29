export default async function logout(req, res) {
  let body = JSON.parse(req.body);
  await fetch(`${process.env.SERVER}logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((e) => e.json())
    .then((e) => {
      res.setHeader(
        "Set-Cookie",
        `login_token=; HttpOnly; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Secure; SameSite=lax; Path=/`
      );
      res.json({ loggedOut: true });
    });
}
