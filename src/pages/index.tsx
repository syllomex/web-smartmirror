import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import nookies from 'nookies';

import styles from '@/styles/landing.module.css';
import api from '@/services/api';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';

type Props = {
  code: number;
};

const DURATION_SECONDS = 120;

const getRandomCode = () => {
  return `${Math.random() * 999999 + 100000}`.substr(0, 6);
};

const Landing: NextPage<Props> = ({ code: _code }) => {
  const { push } = useRouter();

  const [code, setCode] = useState<string>(`${_code}`);
  const [data, setData] = useState<any>();

  const [timer, setTimer] = useState(DURATION_SECONDS);

  const createMirror = useCallback(async () => {
    const result = await api.post('mirrors', { code });
    setData(result.data.data);
  }, [code]);

  const getMirror = useCallback(
    async (hash: string) => {
      const result = await api.get('mirrors', { params: { hash } });

      if (result.data?.data?.user) {
        push('/home');

        const ctx = undefined;
        const name = 'smart-mirror.user';
        const value = JSON.stringify(result.data.data.user);

        nookies.set(ctx, name, value, { maxAge: 180 * 24 * 60 * 60 });
      }
    },
    [push]
  );

  useEffect(() => {
    if (!data?.hash) return;

    const interval = setInterval(() => {
      getMirror(data.hash);
    }, 5000);

    return () => clearInterval(interval);
  }, [getMirror, data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((cur) => cur - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setTimer(DURATION_SECONDS);
      setCode(getRandomCode());
    }
  }, [timer, createMirror]);

  useEffect(() => {
    createMirror();
  }, [code, createMirror]);

  return (
    <div>
      <Head>
        <title>Smart Mirror</title>
      </Head>

      <div className={styles.container}>
        <span className={styles.instruction}>
          Digite o código abaixo em seu dispositivo para conectar ao SmartMirror
        </span>

        <span className={styles.code}>{code}</span>

        <span className={styles.timer}>O código será alterado em</span>
        <span className={styles.timer}>
          {Math.floor(timer / 60)}:
          {Math.ceil(timer % 60)
            .toString()
            .padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  const isConnected = cookies['smart-mirror.user'];

  if (isConnected)
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };

  const randomCode = getRandomCode();
  return { props: { cookies, code: randomCode } };
};

export default Landing;
