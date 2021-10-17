import { ListAccessArgs } from "./types";
import { permissionsList } from "./schemas/fields";

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

export const rules = {
  // Can Manage Products
  canManageProducts({ session }: ListAccessArgs) {
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // Owned User can manage products
    return { user: { id: session?.itemId } };
  },
};
