"use client";

import { useEffect, useState } from "react";
import Loading from "../home/loading";

export default function Result({ type, link, data }) {
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [subloading, setSubLoading] = useState(false);
  const [inviting, setInviting] = useState(false);
  const [num, setNum] = useState(10);
  const [userdata, setUserData] = useState([]);
  const find = async () => {
    let tempData = await fetch(`/api/find-invited-people`, {
      method: "POST",
      body: JSON.stringify({
        auth_email: data.data.email,
        num: num,
      }),
      cache: "no-cache",
    }).then((e) => e.json());
    setUserData(tempData.data);
    setLoading(false);
    setSubLoading(false);
  };
  const invite = async () => {
    setSent(false);
    setInviting(true);
    setMessage("");
    let messageData = await fetch(`/api/send-invite`, {
      method: "POST",
      body: JSON.stringify({
        auth_email: data.data.email,
        email: email,
        verifier: data.data.email,
      }),
      cache: "no-cache",
    }).then((e) => e.json());
    setNum(num + 1);
    find();
    setMessage(messageData.message);
    setEmail("");
    setSent(true);
    setInviting(false);
  };
  useEffect(() => {
    find();
  }, [num]);

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
        <p
          style={{
            marginTop: 53,
            fontWeight: "bold",
            fontSize: 18,
            marginBottom: 10,
          }}
        >
          Invited People
        </p>
        {userdata.map((e) => {
          if (e._id != data.data.id) {
            return (
              <div
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderBottom: "solid gray 0.2px",
                  maxWidth: 900,
                  margin: 10,
                  width: "calc(100% - 20px)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                      }}
                    >
                      <div style={{ fontWeight: "bold", fontSize: 13 }}>
                        {e.email || "No Email"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}
        <button
          className="hoveryat"
          onClick={(e) => {
            setSubLoading(true);
            setNum(num + 10);
          }}
          disabled={subloading}
          style={{
            width: "calc(100% - 20px)",
            margin: 10,
            backgroundColor: "rgb(223, 230, 249)",
            padding: "10px",
            borderRadius: 18,
          }}
        >
          {subloading ? "Finding...." : "Load More"}
        </button>
        {type == "admin" && (
          <>
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
              placeholder="Enter E-Mail"
              required={true}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <p style={{ marginBottom: 0, paddingTop: 10 }}>
              Can't find Someone ?
            </p>
            <button
              className="hoveryat"
              onClick={invite}
              disabled={inviting}
              style={{
                width: "calc(100% - 20px)",
                margin: 10,
                marginTop: 0,
                backgroundColor: "rgb(223, 230, 249)",
                padding: "10px",
                borderRadius: 18,
              }}
            >
              {inviting ? "Sending Invite...." : "Invite"}
            </button>
            {sent && message}
          </>
        )}
      </center>
    </>
  );
}
