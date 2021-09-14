import { Response } from '@/services/api/types';

export type ConnectByCodeResponse = Response<{
  user: {
    id: number;
    name: string;
  };
}>;
