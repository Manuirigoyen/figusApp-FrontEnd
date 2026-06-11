import type { Dispatch, SetStateAction } from 'react';

import type { UserConfig } from '../types/UserConfig';

export type UseProfilePictureProps = {
  user: UserConfig;
  setUser: Dispatch<SetStateAction<UserConfig>>;
};