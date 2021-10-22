import { useWidget } from '@/contexts/widget';
import useAxios from '@/hooks/useAxios';
import { GetCalendarsResult, GetCalendarsVars } from '@/services/api/types';
import Image from 'next/image';

import styles from '@/styles/agenda.module.css';
import { capitalize } from '@/utils';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import calendar from '../../assets/calendar-clear-outline.png';

const parseAndDisplay = (date?: string) => {
  if (!date) return 'invalid date';
  const parsed = parseISO(date.split('-03:00')[0]);

  if (!parsed) return 'invalid date';

  const dateFormat = format(parsed, 'P', { locale: ptBR });
  const dayOfWeekFormat = format(parsed, 'EEEE', { locale: ptBR });
  const dayOfWeekShortFormat = capitalize(dayOfWeekFormat.split('-')[0]);
  const timeFormat = format(parsed, 'p', { locale: ptBR });

  return `${dateFormat} - ${dayOfWeekShortFormat} - ${timeFormat}`;
};

export default function Agenda({ user }: { user: any }) {
  const { isWidgetEnabled } = useWidget();

  const enabled = isWidgetEnabled('agenda');

  const { data } = useAxios<GetCalendarsResult, GetCalendarsVars>({
    path: '/calendars',
    params: {
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
        {data &&
          data.map((event, index) => (
            <div key={index.toString()} className={styles.eventContainer}>
              <div className={styles.titleContainer}>
                <Image src={calendar} width={40} height={40} alt="Calendário" />

                <span className={styles.title}>{event.summary}</span>
              </div>
              <span className={styles.dateTime}>
                {parseAndDisplay(event.start.dateTime)}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
