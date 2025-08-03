import { Errors, ResponseData } from "~/types";

import type { NextApiResponse } from "next";

/**
 * Utility function to handle API response.
 * @param res NextApiResponse
 * @param statusCode HTTP status code
 * @param message Response message
 * @param success Status of the result (true/false)
 * @param data Returned data (if any)
 */

export function handleApiResponse<T>(
  res: NextApiResponse<ResponseData<T>>,
  message: string,
  success: boolean,
  data: T,
  errors: Errors,
  statusCode?: string | number,
  statusText?: string
) {
  return res.json({
    data,
    message,
    success,
    statusCode,
    statusText,
    errors
  });
}
