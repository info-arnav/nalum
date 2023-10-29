export default async function sendOTP(req, res) {
  let body = JSON.parse(req.body);
  await fetch(`${process.env.SERVER}otp-send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((e) => e.json())
    .then((e) => res.json(e));
}
