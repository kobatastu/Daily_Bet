import { guardRunTimeError } from '../common/guardRunTimeError';

export const errorCodeMap = {
  internalServerError: 'INTERNAL_SERVER_ERROR',
  badRequest: 'BAD_REQUEST',
  unauthorized: 'UNAUTHORIZED',
} as const;
type ValueOf<T> = T[keyof T];
type ErrorCode = ValueOf<typeof errorCodeMap>;

type SuccessResponse = {
  success: true;
  data: unknown;
};

type ErrorResponse = {
  success: false;
  errorCode: ErrorCode;
};

type Response = SuccessResponse | ErrorResponse;

export const isResponseType = (apiResponse: Response): apiResponse is Response =>
  guardRunTimeError(() => {
    const res = apiResponse as Response;
    if (res.success === true) {
      return res.data !== undefined;
    }
    return Object.values(errorCodeMap).includes(res.errorCode);
  });
