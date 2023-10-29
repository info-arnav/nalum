import cookie from "cookie";

export default async function getPostAllData(req, res) {
  let body = JSON.parse(req.body);
  const cookies = cookie.parse(req.headers.cookie || "");
  try {
    body.token = cookies.login_token;
    await fetch(`${process.env.SERVER}get-post-all-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((e) => e.json())
      .then((e) => res.json(e));
  } catch {
    res.json({ error: true, message: "Some error occued" });
  }
}
