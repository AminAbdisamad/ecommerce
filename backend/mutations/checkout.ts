import { KeystoneContext } from '@keystone-next/types';
import { Session } from '../types';

export const checkout = async (
  root: any,
  { token }: { token: string },
  context: KeystoneContext
): Promise<any> => {
  // Get check signedin user
};
export const getUserByEmail = async (
  root: any,
  { email }: { email: string },
  context: KeystoneContext
): Promise<any> => {
  const user = context.lists.User.findOne({
    where: {
      email,
    },
    resolveFields: 'id,name,email',
  });
  console.log(user);
  if (!user) {
    return `Sorry a user with the email of ${user.email} doesnt exist`;
  }
  return user;
};

// https://www.gittigidiyor.com/cart-login?returnUrl=%2Fsepetim%2Fsubmit-after-login%3FdiscountId%3D0%26cartItemIds%255B0%255D%3D490113302
