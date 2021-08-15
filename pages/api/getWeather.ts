import type { NextApiRequest, NextApiResponse } from "next";

export default async function getWeather(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { lat, lon } = req.query;

  if (!lat || !lon)
    return res.status(400).json({ error: "No lat and long provided." });

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric&lang=pt_BR`;

  const data = await (await fetch(url)).json();

  res.status(200).json(data);
}
