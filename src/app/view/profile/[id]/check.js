"use client";

import UserProfile from "@/app/profile/userProfile";
import OtherUserProfile from "./otherUserProfile";
import { useEffect, useState } from "react";
import Loading from "@/app/home/loading";
import Error from "@/app/error";

export default function Check({ id, link, data }) {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const getDoc = async () => {
      const res = await fetch(`/api/get-user-info`, {
        method: "POST",
        body: JSON.stringify({
          auth_email: data.data.email,
          id: id,
        }),
        cache: "no-cache",
      }).then((e) => e.json());
      if (res.error) {
        setError(true);
        setLoading(false);
      } else {
        setError(false);
        setUserData(res.data);
        setLoading(false);
      }
    };
    getDoc();
  }, []);
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Error></Error>
      ) : userData[0].email == data.data.email ? (
        <UserProfile data={data} link={link}></UserProfile>
      ) : (
        <OtherUserProfile
          id={id}
          link={link}
          userData={userData[0]}
        ></OtherUserProfile>
      )}
    </>
  );
}
