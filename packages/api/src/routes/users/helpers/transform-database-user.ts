import { type UnsafeUser } from '@repo/db';

import { type PartialBy } from '../../../types/common';

export function transformDatabaseUser({
  hashedPassword: _hashedPassword,
  ...user
}: PartialBy<UnsafeUser, 'hashedPassword'>) {
  return user;
}
