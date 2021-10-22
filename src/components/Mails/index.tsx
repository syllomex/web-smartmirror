import { useWidget } from '@/contexts/widget';
import useAxios from '@/hooks/useAxios';
import { GetMailsResult, GetMailsVars } from '@/services/api/types';

import styles from '@/styles/mails.module.css';
import { plural } from '@/utils';
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const parseAndDisplay = (date?: string) => {
  if (!date) return 'invalid date';
  const parsed = parseISO(date);

  // console.log((new Date().valueOf() - parsed.valueOf()) / 1000 / 60 / 60 / 24);
  if (isToday(parsed)) return format(parsed, 'p', { locale: ptBR });
  if (isYesterday(parsed)) return 'ontem';

  const diff = new Date().valueOf() - parsed.valueOf();
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);

  return `${days}d`;
};

export default function Mails({ user }: { user: any }) {
  const { isWidgetEnabled } = useWidget();

  const enabled = isWidgetEnabled('gmail');

  const { data } = useAxios<GetMailsResult, GetMailsVars>({
    path: '/mails',
    params: {
      'google-access-token': user.googleAccessToken,
      'google-refresh-token': user.googleRefreshToken,
    },
    skip: !user || !enabled,
    refetchInterval: 60,
  });

  if (!enabled) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {data === null && (
          <span className={styles.from}>
            Não foi possível carregar os emails.
          </span>
        )}
        {data && (
          <>
            <span className={styles.title}>
              GMAIL: {data.length}{' '}
              {plural(['nova mensagem', 'novas mensagens'], data.length)}
            </span>

            {data.map((mail, index) => (
              <div
                className={`${styles.mailContainer} ${
                  !mail.unread ? styles.unread : ''
                }`}
                key={index.toString()}
              >
                <div className={styles.mailData}>
                  <span className={styles.subject}>{mail.subject}</span>
                  <span className={styles.from}>
                    De: {mail.from.substr(0, mail.from.indexOf('<'))}
                  </span>
                </div>
                <span className={styles.time}>
                  {parseAndDisplay(mail.date)}
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
