"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Dashboard = () => {
  const [imgValid, setImgValid] = useState(false); // State to track image URL validity
  useEffect(() => {
    // Validate the image URL when it changes
    if (imgValid) {
      return;
    }
    setImgValid(false);
  }, [imgValid]);
  //OLD WAY TO FETCH DATA

  // const [data, setData] = useState([]);
  // const [err, setErr] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const getData = async () => {
  //     setIsLoading(true);
  //     const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
  //       cache: "no-store",
  //     });

  //     if (!res.ok) {
  //       setErr(true);
  //     }

  //     const data = await res.json()

  //     setData(data);
  //     setIsLoading(false);
  //   };
  //   getData()
  // }, []);

  const session = useSession();

  const router = useRouter();

  //NEW WAY TO FETCH DATA
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(`/api/posts?username=${session?.data?.user.name}`, fetcher);

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[1].value;
    const img = e.target[2].value;
    const content = e.target[3].value;
    // Validate img to start with "https://images.pexels.com"
    if (!img.startsWith("https://images.pexels.com")) {
      return;
    }
    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          username: session.data.user.name,
        }),
      });
      mutate();
      e.target.reset();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (err) {
      console.log(err);
    }
  };
  // Function to handle image URL input change
  const handleImgChange = (e) => {
    const imgURL = e.target.value;
    // Validate if the image URL starts with "https://images.pexels.com"
    setImgValid(imgURL.startsWith("https://images.pexels.com"));
  };
  if (session.status === "authenticated") {
    return (
      <div className="grid lg:grid-cols-2 grid-cols-1  ">
        <div className=" flex flex-col items-center justify-center col-span-1   ">
          {isLoading
            ? "loading..."
            : data?.map((post) => (
                <div className="flex justify-between items-center my-[50px] space-x-3" key={post._id}>
                  <div className="relative w-[100px] lg:w-[200px] h-[100px] ">
                    <Image src={post.img} alt="" fill={true} />
                  </div>
                  <div className="items-center flex space-x-2">
                    <h2 className={styles.postTitle}>{post.title}</h2>
                    <span className={styles.delete} onClick={() => handleDelete(post._id)}>
                      X
                    </span>
                  </div>
                </div>
              ))}
        </div>
        <form className="flex flex-col gap-5 col-span-1" onSubmit={handleSubmit}>
          <h1 className="lg:text-[26px] text-[21px]  text-violet-700 font-semibold">Add New Post</h1>
          <input type="text" placeholder="Enter Title..." className={`${styles.input} placeholder:text-[16px] `} />
          <input type="text" placeholder="Enter Description..." className={`${styles.input} placeholder:text-[16px] `} />
          <input type="text" onChange={handleImgChange} placeholder="Enter Image address link of pexel.com..." className={`${styles.input} placeholder:text-[16px] `} />
          <textarea placeholder="Enter Note..." className={`${styles.input} placeholder:text-[16px] `} cols="30" rows="10" />
          <button disabled={!imgValid} className={`${styles.button} disabled:cursor-not-allowed `}>
            Send
          </button>
        </form>
      </div>
    );
  }
};

export default Dashboard;
