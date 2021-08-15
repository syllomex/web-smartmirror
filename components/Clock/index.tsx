import { useEffect, useState } from "react";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import styles from "@/styles/clock.module.css";
import { capitalize } from "@/utils";

type Props = {
  temperature?: number;
};

const options: { weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6; locale: Locale } = {
  weekStartsOn: 0,
  locale: ptBR,
};

function getDateTime() {
  const now = new Date();

  const time = format(now, "p", options);

  const date = capitalize(format(now, "EEEE - P", options));

  return {
    time,
    date,
  };
}

export default function Clock({ temperature }: Props) {
  const [dateTime, setDateTime] = useState<{ time: string; date: string }>(
    getDateTime()
  );

  useEffect(() => {
    setInterval(() => {
      setDateTime(getDateTime());
    }, 1000);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <span className={styles.time}>{dateTime.time}</span>
        <span className={styles.date}>{dateTime.date}</span>
        {temperature !== undefined && (
          <span className={styles.temp}>{Math.round(temperature)}ºC</span>
        )}
      </div>
    </div>
  );
}
