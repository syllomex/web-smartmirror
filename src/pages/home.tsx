import Clock from '../components/Clock';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import nookies from 'nookies';
import Mails from '@/components/Mails';

const Home: NextPage<{ user?: any }> = ({ user }) => {
  return (
    <div>
      <Head>
        <title>Smart Mirror</title>
      </Head>

      <div className="container">
        <Clock temperature={20} direction="column" />
        <Mails user={user} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  const user = cookies['smart-mirror.user'];

  if (!user)
    return {
      redirect: { destination: '/', permanent: false },
    };

  return { props: { user: JSON.parse(user) } };
};

export default Home;
