import { ListAccessArgs } from './types';

export const isSignedIn = ({ session }: ListAccessArgs): boolean => !!session;
