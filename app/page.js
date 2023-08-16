"use client";

import { Patua_One } from "next/font/google";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const Patua = Patua_One({ subsets: ["latin"], weight: ["400"] });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function getUserData() {
  const { data } = await supabase.from("users").select("username, yo");

  console.log("data: ", data);
  return data;
}

const Home = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getUserData();
      setUserData(data);
    }
    fetchData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { username, yo } = userData[0];

  return (
    <main>
      <div className={Patua.className}>
        <div className="flex text-white h-screen items-center">
          <div className="mx-auto text-5xl">
            Hello, you are <span className=" text-blue-500"> {username}</span>!
            <div>
              <span className=" text-green-500">{yo}</span> yo
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
