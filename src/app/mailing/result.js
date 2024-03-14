"use client";

import { useEffect, useState } from "react";
import Select from "react-select";

export default function Result({ data, universal_link }) {
  const [subLoading, setSubLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [notify, setNotify] = useState("");
  const handleChange = (selectedOption) => {
    setNotify(selectedOption);
  };
  const options = [
    { value: "", label: "everyone" },
    { value: "admin", label: "admins" },
    { value: "alumni", label: "alumni" },
    { value: "student", label: "students" },
  ];
  const sendEmail = async () => {
    setSubLoading(true);
    await fetch(`/api/send-mail`, {
      method: "POST",
      body: JSON.stringify({
        email: data.data.email,
        subject: subject,
        body: body,
        notify: notify,
      }),
      cache: "no-cache",
    }).then((e) => e.json());
    setSubject("");
    setBody("");
    setNotify("");
    setSubLoading(false);
  };
  return (
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
        <h1 style={{ fontWeight: "bold" }}>Send Mail</h1>
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
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        ></input>
        <textarea
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
            height: 300,
            maxWidth: 900,
          }}
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <Select options={options} onChange={handleChange} />
        <button
          className="hoveryat"
          onClick={sendEmail}
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
          {subLoading ? "Please Wait...." : "Send"}
        </button>
      </center>
    </>
  );
}
