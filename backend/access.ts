import { ListAccessArgs } from './types';
import { permissionsList } from './schemas/fields';

export const isSignedIn = ({ session }: ListAccessArgs): boolean => !!session;

export const generatePermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    ({ session }: ListAccessArgs) => !!session?.data?.role?.[permission],
  ])
);

export const permissions = {
  ...generatePermissions,
  //   add extra permisions
};

const fn = (message) => message;