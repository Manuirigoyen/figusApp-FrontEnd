import type { Dispatch, SetStateAction } from 'react';
import type { UserConfig } from '../../interfaces/UserConfig';

export type ConfigProps = {
  user: UserConfig;
  setUser: Dispatch<SetStateAction<UserConfig>>;
};