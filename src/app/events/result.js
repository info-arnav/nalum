"use client";

import { useEffect, useState } from "react";
import Loading from "../home/loading";
import Compressor from "compressorjs";

export default function Result({ data, universal_link }) {
  const [loading, setLoading] = useState(true);
  const [subLoading, setSubLoading] = useState(false);
  const [array, setArray] = useState([]);
  const [imageError, setImageError] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [linkText, setLinkText] = useState("");
  const [notify, setNotify] = useState(false);
  const base64Converter = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    try {
      reader.onload = function () {
        setImageError("");
        setImage(reader.result);
      };
      reader.onerror = function (error) {
        setImageError("Some error occured uploading the image.");
      };
    } catch {
      setImageError("Some error occured uploading the image.");
    }
  };
  const imageHandler = (e) => {
    const image = e.target.files[0];
    try {
      new Compressor(image, {
        quality: 0.2,

        success: (compressedResult) => {
          base64Converter(compressedResult);
        },
      });
    } catch {
      setImageError("Some error occured uploading the image.");
    }
  };
  const addEvent = async () => {
    setSubLoading(true);
    await fetch(`/api/add-event`, {
      method: "POST",
      body: JSON.stringify({
        email: data.data.email,
        image: image,
        title: title,
        description: description,
        link: link,
        linkText: linkText,
        notify: notify,
      }),
      cache: "no-cache",
    }).then((e) => e.json());
    await getEvents();
    setImage("");
    setTitle("");
    setDescription("");
    setLink("");
    setLinkText("");
    setNotify(false);
    setSubLoading(false);
  };
  const getEvents = async () => {
    let tempData = await fetch(`/api/get-events`, {
      method: "POST",
      body: JSON.stringify({
        email: data.data.email,
      }),
      cache: "no-cache",
    }).then((e) => e.json());
    setArray(tempData.data);
    setLoading(false);
  };
  const deleteEvent = async (id) => {
    setSubLoading(true);
    await fetch(`/api/delete-event`, {
      method: "POST",
      body: JSON.stringify({
        email: data.data.email,
        id: id,
      }),
      cache: "no-cache",
    }).then((e) => e.json());
    getEvents();
    setSubLoading(false);
  };
  useEffect(() => {
    getEvents();
  }, []);
  return loading ? (
    <Loading></Loading>
  ) : (
    <>
      <center
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 80px)",
          margin: 10,
        }}
      >
        <h1 style={{ fontWeight: "bold", marginBottom: 50 }}>Events</h1>
        {array.length == 0 ? (
          <h1>No events</h1>
        ) : (
          array.map((e) => (
            <div
              style={{
                textAlign: "left",
                border: "solid black",
                borderRadius: 20,
                width: "calc(100% - 20px)",
                maxWidth: 500,
                margin: 20,
                padding: 20,
              }}
            >
              <img
                src={`${universal_link}api/image/${e._id}`}
                style={{
                  width: "100%",
                  maxWidth: 500,
                  borderRadius: 20,
                  marginBottom: 20,
                }}
              ></img>
              <b>{e.title}</b>
              <p>{e.details}</p>
              {e.link && <a href={e.link}>{e.linkText}</a>}
              <button
                className="hoveryat"
                onClick={() => deleteEvent(e._id)}
                style={{
                  width: "calc(100% - 20px)",
                  margin: 10,
                  marginTop: 0,
                  backgroundColor: "rgb(223, 230, 249)",
                  padding: "10px",
                  borderRadius: 18,
                }}
                disabled={subLoading}
              >
                {subLoading ? "Please Wait...." : "Delete"}
              </button>
            </div>
          ))
        )}
        <hr
          style={{
            maxWidth: 900,
            marginTop: 100,
            marginBottom: 100,
          }}
        ></hr>
        <h1 style={{ fontWeight: "bold" }}>Add Event</h1>
        <input
          style={{
            backgroundColor: "#F5F4F7",
            color: "#00183F",
            padding: 15,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 16,
            margin: 20,
            width: "calc(100% - 20px)",
            textAlign: "left",
            maxWidth: 900,
          }}
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <input
          style={{
            backgroundColor: "#F5F4F7",
            color: "#00183F",
            padding: 15,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 16,
            margin: 20,
            width: "calc(100% - 20px)",
            textAlign: "left",
            maxWidth: 900,
          }}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <input
          style={{
            backgroundColor: "#F5F4F7",
            color: "#00183F",
            padding: 15,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 16,
            margin: 20,
            width: "calc(100% - 20px)",
            textAlign: "left",
            maxWidth: 900,
          }}
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        ></input>
        <input
          style={{
            backgroundColor: "#F5F4F7",
            color: "#00183F",
            padding: 15,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 16,
            margin: 20,
            width: "calc(100% - 20px)",
            textAlign: "left",
            maxWidth: 900,
          }}
          placeholder="Link Title"
          value={linkText}
          onChange={(e) => setLinkText(e.target.value)}
        ></input>
        <input
          style={{
            backgroundColor: "#F5F4F7",
            color: "#00183F",
            padding: 15,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 16,
            margin: 20,
            width: "calc(100% - 20px)",
            textAlign: "left",
            maxWidth: 900,
          }}
          type="file"
          onChange={imageHandler}
          placeholder="Image"
        ></input>
        {imageError ? (
          imageError
        ) : image ? (
          <img
            src={image}
            style={{
              width: "calc(100% - 20px)",
              maxWidth: 900,
            }}
          ></img>
        ) : (
          ""
        )}
        <div style={{ display: "flex" }}>
          <input
            type="checkbox"
            style={{ marginRight: 20 }}
            value={notify}
            onChange={(e) => setNotify(!notify)}
          ></input>{" "}
          Check this to notify the network
        </div>
        <button
          className="hoveryat"
          onClick={addEvent}
          style={{
            width: "calc(100% - 20px)",
            margin: 10,
            marginTop: 0,
            backgroundColor: "rgb(223, 230, 249)",
            padding: "10px",
            borderRadius: 18,
          }}
          disabled={subLoading}
        >
          {subLoading ? "Please Wait...." : "Add Event"}
        </button>
      </center>
    </>
  );
}
