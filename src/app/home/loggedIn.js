"use client";

import algoliasearch from "algoliasearch/lite";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "./loading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";

// Import Swiper styles

import "swiper/swiper.min.css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/navigation";

// import "../globals.css";
// import AOS from "aos";
// import "aos/dist/aos.css";

// import required modules
import { EffectCoverflow } from "swiper";

export default function LoggedIn({ type, keys, link, data }) {
  const [array, setArray] = useState([]);
  const searchClient = algoliasearch(keys[0], keys[1]);
  const [show, setShow] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingTwo, setLoadingTwo] = useState(true);
  const [subloading, setSubLoading] = useState(false);
  const [inviting, setInviting] = useState(false);
  const [num, setNum] = useState(10);
  const [userdata, setUserData] = useState([]);
  const [referral, setRefferal] = useState(false);
  const find = async () => {
    let tempData = await fetch(`/api/find-people`, {
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
  const getEvents = async () => {
    let tempData = await fetch(`/api/get-events`, {
      method: "POST",
      body: JSON.stringify({
        email: data.data.email,
      }),
      cache: "no-cache",
    }).then((e) => e.json());
    let temp = [];
    if (tempData.data.length > 1) {
      for (let i = 0; i < 6; i++) {
        temp = temp.concat(tempData.data);
      }
    } else {
      temp = tempData.data;
    }
    setArray(temp);
    setLoadingTwo(false);
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
    setMessage(messageData.message);
    setEmail("");
    setSent(true);
    setInviting(false);
  };
  const getReferral = async () => {
    let codeData = await fetch(`/api/get-refferal`, {
      method: "POST",
      body: JSON.stringify({
        auth_email: data.data.email,
      }),
      cache: "no-cache",
    }).then((e) => e.json());
    setRefferal(codeData.code);
  };
  useEffect(() => {
    find();
  }, [num]);
  useEffect(() => {
    getEvents();
  }, []);
  useEffect(() => getReferral(), []);
  function Hit({ hit }) {
    if (data.data.id != hit.objectID) {
      return (
        <div
          className="search-hover"
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            borderBottom: "solid gray 0.2px",
          }}
        >
          <a href={`${link}/view/profile/${hit.objectID}`}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>
                <img
                  height={40}
                  width={40}
                  style={{
                    minHeight: 40,
                    maxHeight: 40,
                    maxWidth: 40,
                    minWidth: 40,
                    marginRight: 20,
                    borderRadius: "100%",
                  }}
                  src={`${link}/api/image/${hit.objectID}`}
                ></img>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ fontWeight: "bold", fontSize: 13 }}>
                    {hit.name || "No Name"}
                  </div>
                  <div style={{ fontSize: 11, color: "grey" }}>
                    {hit.bio ? hit.bio : "No bio"}
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      );
    }
  }
  return loading || loadingTwo ? (
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
          Upcoming Events
        </p>
        <div className="events-courosel">
          <main className="gallery-section" id="gallery">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 105,
                modifier: 1,
                slideShadows: true,
              }}
              autoplay={{
                disableOnInteraction: false,
              }}
              // pagination={true}
              navigation={true}
              modules={[EffectCoverflow, Autoplay, Navigation]}
              className="mySwiper"
            >
              {array.map((e) => (
                <SwiperSlide
                  style={{
                    overflow: "hidden",
                    borderRadius: 20,
                    outline: "3px solid #00183F",
                    backgroundColor: "white",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      color: "#00183F",
                      backgroundColor: "white",
                      borderRadius: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        backgroundImage: `url("${link}api/image/${e._id}")`,
                        width: "100%",
                        height: "50%",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        flex: 2,
                        backgroundColor: "white",
                        marginBottom: 20,
                      }}
                    ></div>
                    <div style={{ flex: 1, backgroundColor: "white" }}>
                      <center>
                        <p
                          style={{
                            marginBottom: 5,
                            fontWeight: "bold",
                            fontSize: 21,
                            maxWidth: "calc(100vw - 20px)",
                          }}
                        >
                          {e.title}
                        </p>

                        <p
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            maxWidth: "calc(100vw - 20px)",
                          }}
                        >
                          {e.details}
                          {e.link && (
                            <a
                              style={{
                                backgroundColor: "#00183F",
                                color: "white",
                                padding: 10,
                                paddingLeft: 20,
                                paddingRight: 20,
                                borderRadius: 20,
                                fontWeight: "bold",
                                marginTop: 10,
                                maxWidth: "calc(100vw - 20px)",
                              }}
                              href={e.link}
                            >
                              {e.linkText ? e.linkText : "More Details"}
                            </a>
                          )}
                        </p>
                      </center>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </main>
        </div>
        <br></br>
        <button
          style={{
            backgroundColor: "#F5F4F7",
            color: "#939393",
            padding: 15,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 16,
            margin: 20,
            width: "calc(100% - 40px)",
            maxWidth: 600,
            textAlign: "left",
          }}
          onClick={(e) => {
            setShow(true);
            document.querySelector("body").classList.add("no-scroll");
          }}
        >
          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
              style={{ marginRight: 10 }}
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />{" "}
            </svg>
            Search for your batchmates
          </p>
        </button>
        {type == "student" ? (
          <div className="logged-in-button" style={{ marginTop: 20 }}>
            <a
              href="/recruitment"
              className="right-space"
              style={{
                backgroundColor: "#DFE6F9",
                padding: 15,
                fontSize: 14,
                paddingLeft: 25,
                paddingRight: 25,
                borderRadius: 10,
                marginRight: 14,
                marginTop: 16,
              }}
            >
              Find Opportunities
            </a>
          </div>
        ) : (
          <div className="logged-in-button" style={{ marginTop: 20 }}>
            <a
              href="/recruitment"
              className="right-space"
              style={{
                backgroundColor: "#DFE6F9",
                padding: 15,
                fontSize: 14,
                paddingLeft: 25,
                paddingRight: 25,
                borderRadius: 10,
                marginRight: 14,
                marginTop: 16,
              }}
            >
              Manage Recruitments
            </a>
            <a
              href="/candidates"
              style={{
                backgroundColor: "#DFE6F9",
                padding: 15,
                fontSize: 14,
                paddingLeft: 25,
                paddingRight: 25,
                borderRadius: 10,
              }}
            >
              Past Recruitments
            </a>
          </div>
        )}
        <br></br>
        <p
          style={{
            marginTop: 53,
            fontWeight: "bold",
            fontSize: 18,
            marginBottom: 10,
          }}
        >
          People You May Know
        </p>
        <br></br>
        {userdata.length == 1 && "None of your batchmates are here yet"}
        {userdata.map((e) => {
          if (e._id != data.data.id) {
            return (
              <div
                className="search-hover"
                style={{
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderBottom: "solid gray 0.2px",
                  maxWidth: 900,
                  margin: 10,
                  width: "calc(100% - 20px)",
                }}
              >
                <a href={`${link}/view/profile/${e._id}`}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div>
                      <img
                        height={40}
                        width={40}
                        style={{
                          minHeight: 40,
                          minHeight: 40,
                          maxHeight: 40,
                          maxWidth: 40,
                          minWidth: 40,
                          minWidth: 40,
                          marginRight: 20,
                          borderRadius: "100%",
                        }}
                        src={`${link}/api/image/${e._id}`}
                      ></img>
                    </div>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          textAlign: "left",
                        }}
                      >
                        <div style={{ fontWeight: "bold", fontSize: 13 }}>
                          {e.name || "No Name"}
                        </div>
                        <div style={{ fontSize: 11, color: "grey" }}>
                          {e.bio ? e.bio : "No bio"}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
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
        {type == "alumni" && (
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
              Can't find your friends ?
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
            <p style={{ fontWeight: "bold", marginTop: 20 }}>OR</p>
            <p style={{ marginTop: 20 }}>
              Share the code <b>{referral ? referral : "________"}</b> with your
              mates
            </p>
          </>
        )}
      </center>

      <div style={{ marginBottom: 80 }}></div>
      {show && (
        <div className="modal">
          <div
            style={{ marginTop: 10 }}
            className="card overflow-y-auto rounded-lg border-2 border-#00183F relative w-[calc(100%-20px)] mx-auto bg-white py-4 custom-search-height"
          >
            <InstantSearch searchClient={searchClient} indexName="dev_alum">
              <div className="flex flex-row justify-center">
                <SearchBox searchAsYouType={true} placeholder="Search..." />
                <button
                  className="form-close"
                  onClick={(e) => {
                    document
                      .querySelector("body")
                      .classList.remove("no-scroll");
                    setShow(false);
                  }}
                >
                  X
                </button>
              </div>
              {/* <div className="w-[100%] bg-blue-200"> */}
              <Hits hitComponent={Hit} />
              {/* </div> */}
              {/* <SearchPopup/> */}
            </InstantSearch>
          </div>
        </div>
      )}
    </>
  );
}
