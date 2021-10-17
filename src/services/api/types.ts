type Success<T> = {
  _success: true;
  _message: string | null;
  _meta?: any;
} & T;

type Error = {
  _success: false;
  error: string;
  _errorMessage?: string;
};

export type Response<T> = Success<T> | Error;

export type GetMailsVars = {
  'google-access-token': string;
  'google-refresh-token': string;
};

export type GetMailsResult = {
  date: string;
  from: string;
  subject: string;
  unread: boolean;
}[];

export type GetCalendarsVars = {
  'google-refresh-token': string;
};

export type GetCalendarsResult = {
  summary: string;
  start: {
    dateTime?: string;
    timeZone?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    timeZone?: string;
    date?: string;
  };
}[];
