import axios, { AxiosResponse } from 'axios';
import * as Types from './types';

// eslint-disable-next-line @typescript-eslint/ban-types
type Data = { [key: string]: string | number | boolean | object };

// const getUsers = async (
//   url: string,
//   header: any,
//   data: any
// ): Promise<Types.User> => {
//   try {
//       const { data } = await rest.get<User[]>(url)
//       return data;
//   } catch (error) {
//       throw new Error(error);
//   }
// };

//   export { getUsers };
