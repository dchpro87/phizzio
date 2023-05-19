import { getToken } from 'next-auth/jwt';
//write a function that takes in a string and returns the string trimmed and with first letter of each word capitalized

export function capitalizeName(str) {
  // your code here
  return str
    .trim()
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

//  get userId from jwt token
export const getUserIdFromToken = async (req) => {
  try {
    const token = await getToken({ req });
    const { sub: userId } = token;
    return userId;
  } catch {
    err;
  }
  {
    console.log(err);
    return err.message;
  }
};
