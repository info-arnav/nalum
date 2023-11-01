"use client";

import { useEffect, useState } from "react";

export default function DocImage({ authEmail, inviteEmail, setShow, setImg }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");
  const loadImage = async () => {
    let tempData = await fetch(`/api/requests-docs`, {
      method: "POST",
      body: JSON.stringify({
        email: authEmail,
        find_email: inviteEmail,
      }),
      cache: "no-cache",
    }).then((e) => e.json());
    setData(tempData.data);
    setLoading(false);
  };
  useEffect(() => {
    loadImage();
  }, []);
  if (loading) {
    return <div>Loading.....</div>;
  } else if (data) {
    return (
      <img
        height={50}
        style={{
          maxHeight: 50,
          height: 50,
          maxWidth: 70,
          margin: 10,
        }}
        src={data}
        onClick={(temp) => {
          setImg(data);
          document.querySelector("body").classList.add("no-scroll");
          setShow(true);
        }}
        alt="Verification document uploaded by User"
      ></img>
    );
  } else {
    return <div>No image uploaded</div>;
  }
}
