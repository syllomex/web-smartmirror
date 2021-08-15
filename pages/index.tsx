import CitySelector, { Coordinates } from "@/components/CitySelector";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useQuery } from "react-query";

const getWeather = async (lat?: number, lon?: number) => {
  const defaultLat = -23.4969;
  const defaultLon = -47.4451;

  return (
    await fetch(`/api/getWeather?lat=${lat || defaultLat}&lon=${lon || defaultLon}`)
  ).json();
};

const Home: NextPage = () => {
  const [coords, setCoords] = useState<Coordinates | null>();

  const { data, isLoading } = useQuery(
    "weather",
    () => getWeather(coords?.lat, coords?.lon),
    {
      initialData: null,
      refetchInterval: 60000,
      enabled: !!coords,
    }
  );

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <Head>
        <title>Smart Mirror</title>
      </Head>

      <h1>Smart Mirror</h1>

      <CitySelector onSelect={setCoords} />

      {JSON.stringify(coords)}

      {JSON.stringify(data)}
    </div>
  );
};

export default Home;
