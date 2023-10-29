export default async function verifyOtp(req, res) {
  let body = JSON.parse(req.body);
  await fetch(`${process.env.SERVER}otp-verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((e) => e.json())
    .then((e) => res.json(e));
}
