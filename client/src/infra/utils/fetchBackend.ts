import { isResponseType } from '../../serverTypes/apiTypes';

type PostHeaders = {
  'Content-Type': string;
};

type Credentials = 'omit' | 'same-origin' | 'include';

type FetchOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: string;
  headers?: PostHeaders;
  credentials: Credentials;
};

const backendUrl = process.env.REACT_APP_DEV_API_URL;

const fetchWithNetworkErrorHandring = async (input: RequestInfo, init: RequestInit) => {
  try {
    return await fetch(input, init);
  } catch (e) {
    throw new Error('NetworkError');
  }
};

export const fetchBackend = async (endpoint: string, options: FetchOptions) => {
  const response = await fetchWithNetworkErrorHandring(`${backendUrl}/${endpoint}`, options);
  if (!response.ok) {
    throw new Error('Response is not ok');
  }
  const data = await response.json();
  if (!isResponseType(data)) {
    throw new Error('Response type is not correct');
  }
  return data;
};
