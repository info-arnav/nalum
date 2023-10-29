export default async function image(req, res) {
  const { id } = req.query;
  await fetch(`${process.env.SERVER}images/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((e) => e.json())
    .then((e) => {
      let img = Buffer.from(e.image.split(",")[1], "base64");
      res.writeHead(200, {
        "Content-Type": "image",
        "Content-Length": img.length,
      });
      res.end(img);
    });
}
