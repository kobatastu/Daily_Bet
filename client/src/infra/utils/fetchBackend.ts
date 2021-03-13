import config from 'config';
import { isResponseType } from '../../serverTypes/apiTypes';

type PostHeaders = {
  'Content-Type': string;
};

type FetchOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: string;
  headers?: PostHeaders;
};

// const backendUrl = config.get<string>('BACKEND_URL');
const backendUrl = 'http://localhost:8080';

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
