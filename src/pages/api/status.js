export default async function status(req, res) {
  await fetch(`${process.env.SERVER}status`, {
    method: "GET",
  })
    .then((e) => e.json())
    .then((e) => res.json(e));
}
