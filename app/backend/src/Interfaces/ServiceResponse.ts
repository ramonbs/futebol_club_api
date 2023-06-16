export type ServiceMessage = { message: string };

type ServiceResponseErrorType =
    | 'invalidData'
    | 'notFound'
    | 'alreadyExists'
    | 'internalError'
    | 'unauthorized'
    | 'forbidden';

export type ServiceResponseError = {
  status: ServiceResponseErrorType;
  data: ServiceMessage;
};

export type ServiceResponseSuccess<T> = {
  status: 'successful';
  data: T;
};

export type ServiceResponse<T> =
    | ServiceResponseError
    | ServiceResponseSuccess<T>;
