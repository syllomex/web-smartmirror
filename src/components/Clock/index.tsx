import { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import styles from '@/styles/clock.module.css';
import { capitalize } from '@/utils';
import useAxios from '@/hooks/useAxios';

type Props = {
  direction?: 'row' | 'column';
  user?: any;
};

const options: { weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6; locale: Locale } = {
  weekStartsOn: 0,
  locale: ptBR,
};

function getDateTime() {
  const now = new Date();

  const time = format(now, 'p', options);

  const date = capitalize(format(now, 'EEEE - P', options));

  return {
    time,
    date,
  };
}

export default function Clock({ user, direction = 'column' }: Props) {
  const { data, loading, refetch, error } = useAxios<
    { temperature: number; icon: string; description: string },
    { googleId: string }
  >({
    method: 'get',
    path: 'weather',
    skip: !user?.googleId,
    params: { googleId: user?.googleId },
  });

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
      <div
        className={
          direction === 'column' ? styles.contentContainer : styles.rowContainer
        }
      >
        <div
          className={
            direction === 'column'
              ? styles.dateTimeContainer
              : styles.dateTimeContainerRow
          }
        >
          <span className={styles.time}>{dateTime.time}</span>
          <span className={styles.date}>{dateTime.date}</span>
        </div>

        <div className={styles.tempContainer}>
          <img src={data?.icon} alt="Ícone de clima" />

          {data?.temperature !== undefined && (
            <span className={styles.temp}>
              {Math.round(data?.temperature)}ºC
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
