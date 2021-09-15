import { KeystoneContext } from '@keystone-next/types';
import { OrderCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

const graphQL = String.raw;

export const checkout = async (
  root: any,
  { token }: { token: string },
  context: KeystoneContext
): Promise<OrderCreateInput> => {
  // Get check signedin user
  const userId = context.session.itemId;
  console.log(userId);
  if (!userId) {
    throw new Error('You need logged in to process this task');
  }
};
