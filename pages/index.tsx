import CitySelector, { Coordinates } from "@/components/CitySelector";
import Clock from "@/components/Clock";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSession, signIn, signOut } from "next-auth/client";
import Nextauth from "./api/auth/[...nextauth]";

const getWeather = async (lat?: number, lon?: number) => {
  const defaultLat = -23.4969;
  const defaultLon = -47.4451;

  return (
    await fetch(
      `/api/getWeather?lat=${lat || defaultLat}&lon=${lon || defaultLon}`
    )
  ).json();
};

const Home: NextPage = () => {
  const [session, loading] = useSession();

  const [coords, setCoords] = useState<Coordinates | null>();

  const { data, isLoading } = useQuery(
    "weather",
    () => getWeather(coords?.lat, coords?.lon),
    {
      initialData: null,
      refetchInterval: 300000,
    }
  );

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <Head>
        <title>Smart Mirror</title>
      </Head>

      <div className="container">
        <Clock temperature={data?.main.temp} direction="row" />

        {!session && <button onClick={() => signIn()}>Entrar</button>}
        {session && <button onClick={() => signOut()}>Sair</button>}

        <span>{session?.user?.email}</span>
      </div>
    </div>
  );
};

export default Home;
