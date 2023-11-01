"use client";

import { useEffect, useState } from "react";
import Loading from "../home/loading";

export default function Result({ type, link, data }) {
  const [loading, setLoading] = useState(true);
  const [messageData, setMessageData] = useState([]);
  const find = async () => {
    let tempData = await fetch(`/api/messages`, {
      method: "POST",
      body: JSON.stringify({
        auth_email: data.data.email,
      }),
      cache: "no-cache",
    }).then((e) => e.json());
    setMessageData(tempData.data);
    setLoading(false);
  };
  useEffect(() => {
    find();
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
          Messages
        </p>
        {messageData ? (
          messageData.map((e) => {
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
                      <div style={{ fontSize: 13 }}>
                        {e.message || "No Message"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <>No Messages</>
        )}
      </center>
    </>
  );
}
