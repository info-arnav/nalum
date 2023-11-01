"use client";

import { useEffect, useState } from "react";
import Error from "../error";
import Loading from "./loading";
import Button from "./button";
import DocImage from "./docImage";

export default function Requests({ status }) {
  const [show, setShow] = useState(false);
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const process = async (type, position, second_email) => {
    let temproryData = data;
    temproryData.splice(position, 1);
    await fetch(`/api/requests-action`, {
      method: "POST",
      body: JSON.stringify({
        email: status.data.email,
        second_email: second_email,
        verified: type == "approve" ? "true" : "false",
        error:
          type == "approve"
            ? ""
            : "Your profile was rejected. Please update data for re-verification.",
      }),
      cache: "no-cache",
    }).then((e) => e.json());
    setData(temproryData);
    setRefresh(!refresh);
    return 1;
  };
  const fetchRequests = async () => {
    const res = await fetch(`/api/requests`, {
      method: "POST",
      body: JSON.stringify({
        email: status.data.email,
      }),
      cache: "no-cache",
    }).then((e) => e.json());
    if (res.error) {
      setError(true);
      setLoading(false);
    } else {
      setError(false);
      setData(res.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, [refresh]);
  return (
    <div className="admin">
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Error></Error>
      ) : (
        <div className="table-overflow">
          <table>
            {show && (
              <div className="modal">
                <div
                  className="modal-content"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img src={img} height="auto" width="100%"></img>
                  <button
                    onClick={() => {
                      document
                        .querySelector("body")
                        .classList.remove("no-scroll");
                      setShow(false);
                    }}
                    id="edit-close"
                    className="form-close"
                  >
                    X
                  </button>
                </div>
              </div>
            )}
            {!data && "No Requests"}
            {data &&
              data.map((e) => {
                return (
                  <tr>
                    <th>
                      <center>
                        <DocImage
                          authEmail={status.data.email}
                          inviteEmail={e.email}
                          setShow={setShow}
                          setImg={setImg}
                        ></DocImage>
                      </center>
                    </th>
                    <th>
                      <center>
                        <p style={{ fontWeight: "lighter" }}>{e.email}</p>
                      </center>
                    </th>
                    <th>
                      <center>
                        <p style={{ fontWeight: "lighter" }}>
                          {e.batch ? e.batch : "Batch Not provided"}
                        </p>
                      </center>
                    </th>
                    <th>
                      <center>
                        <p style={{ fontWeight: "lighter" }}>
                          {e.phone ? e.phone : "Phone Not provided"}
                        </p>
                      </center>
                    </th>
                    <th>
                      <center>
                        <p style={{ fontWeight: "lighter" }}>
                          {e.course ? e.course : " Course Not provided"}
                        </p>
                      </center>
                    </th>
                    <th>
                      <center>
                        <p style={{ fontWeight: "lighter" }}>
                          {e.department
                            ? e.department
                            : " Department Not provided"}
                        </p>
                      </center>
                    </th>
                    <th>
                      <center>
                        <p style={{ fontWeight: "lighter" }}>
                          {e.roll ? e.roll : " Roll No Not provided"}
                        </p>
                      </center>
                    </th>
                    <th>
                      <center>
                        <p style={{ fontWeight: "lighter" }}>
                          {e.work_status
                            ? e.work_status
                            : " Work Status Not provided"}
                        </p>
                      </center>
                    </th>
                    <th>
                      <Button process={process} e={e} data={data}></Button>
                    </th>
                  </tr>
                );
              })}
            {data.length == 0 && (
              <p style={{ padding: 10 }}>
                <center>No pending requests</center>
              </p>
            )}
          </table>
        </div>
      )}
    </div>
  );
}
