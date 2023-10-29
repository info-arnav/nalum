export default async function register(req, res) {
  let body = JSON.parse(req.body);
  await fetch(`${process.env.SERVER}register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((e) => e.json())
    .then((e) => {
      res.setHeader("Set-Cookie", e.login_key);
      res.json(e);
    });
}
