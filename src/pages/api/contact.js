export default async function contact(req, res) {
  let body = JSON.parse(req.body);
  await fetch(`${process.env.SERVER}contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((e) => e.json())
    .then((e) => res.json(e));
}
