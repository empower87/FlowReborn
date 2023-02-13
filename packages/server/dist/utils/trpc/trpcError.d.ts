export type TRPCErrorCode = 'BAD_REQUEST' | 'PARSE_ERROR' | 'INTERNAL_SERVER_ERROR' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'NOT_FOUND' | 'METHOD_NOT_SUPPORTED' | 'TIMEOUT' | 'CONFLICT' | 'PRECONDITION_FAILED' | 'PAYLOAD_TOO_LARGE' | 'CLIENT_CLOSED_REQUEST';
export declare const TRPCError: (code: TRPCErrorCode, message: string) => never;