"use server";

import { revalidatePath } from "next/cache";

import { BASE_URL, DEFAULT_REVALIDATE_SECONDS } from "@/constants";

export interface CustomError {
  error: {
    message: string;
    requires_selection?: boolean;
    errors: {
      field: string;
      message: string;
    }[];
    throttled?: boolean;
    wait_time_seconds?: number;
  };
  status: number;
  isError: boolean;
}

interface IServerSideFetchParams {
  end_Point: string;
  method: "POST" | "GET" | "PATCH" | "PUT" | "DELETE";
  extraMethod?: object;
  isAddAuthHeaders?: boolean;
  size?: string;
  data?: object;
  isFormData?: boolean;
  revalidate_path?: string;
  isSkip?: boolean;
  /** `force-cache` instead of the default ISR window. */
  isCached?: boolean;
  /** ISR window in seconds for GET requests (default DEFAULT_REVALIDATE_SECONDS). */
  revalidate?: number;
}

interface IStatusResponses {
  [key: number]: {
    data: null;
    status: number;
    message: string;
    error: CustomError | null;
  };
}

// ######### Status Responses ########
const statusResponses: IStatusResponses = {
  204: { data: null, status: 204, message: "", error: null },
  403: {
    data: null,
    status: 403,
    message: "Forbidden",
    error: {
      error: { message: "Forbidden", errors: [] },
      status: 403,
      isError: true,
    },
  },
  500: {
    data: null,
    status: 500,
    message: "Internal Server Error",
    error: {
      error: { message: "Internal Server Error", errors: [] },
      status: 500,
      isError: true,
    },
  },
  502: {
    data: null,
    status: 502,
    message: "Bad get a way !!",
    error: {
      error: { message: "Bad get a way !!", errors: [] },
      status: 502,
      isError: true,
    },
  },
  404: {
    data: null,
    status: 404,
    message: "Not Found",
    error: {
      error: { message: "Not Found", errors: [] },
      status: 404,
      isError: true,
    },
  },
};

/*
 * Headers for the fetch request. The Molodost API is called without an
 * Accept-Language header on purpose (the site takes whatever language the
 * CMS serves and falls back to its static copy for the other locale).
 */
function createHeaders(isFormData: boolean | undefined): HeadersInit {
  const headers: HeadersInit = { Accept: "application/json" };
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }
  return headers;
}

// --------------------------------
export async function serverSideFetch<T>({
  end_Point,
  extraMethod,
  data,
  method,
  isFormData,
  revalidate_path,
  isSkip,
  isCached,
  revalidate = DEFAULT_REVALIDATE_SECONDS,
}: IServerSideFetchParams): Promise<{
  data: T | null;
  message?: string;
  status?: number;
  error?: CustomError | null;
}> {
  // If isSkip is true, return early with a default response
  if (isSkip) {
    return {
      data: null,
      message: "Request skipped",
      status: 200,
      error: null,
    };
  }

  try {
    // Validate BASE_URL
    if (!BASE_URL) {
      return {
        data: null,
        status: 500,
        message: "BASE_URL is not configured",
        error: {
          error: { message: "BASE_URL is not configured", errors: [] },
          status: 500,
          isError: true,
        },
      };
    }

    const headers: HeadersInit = createHeaders(isFormData);
    const fullUrl = BASE_URL + end_Point;

    const response = await fetch(fullUrl, {
      method: method,
      headers: headers,
      body: data
        ? isFormData
          ? (data as FormData)
          : JSON.stringify(data || {})
        : null,
      ...(method === "GET"
        ? isCached
          ? { cache: "force-cache" as const }
          : { next: { revalidate } }
        : { cache: "no-store" as const }),
      ...extraMethod,
    });

    if (response.ok && revalidate_path) {
      revalidatePath(revalidate_path);
    }

    // Return other status responses
    const known = statusResponses[response.status];
    if (known) return known;

    // A non-JSON body (e.g. an HTML error page from the host) is a failure,
    // never a payload.
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("json")) {
      return {
        data: null,
        status: response.status,
        message: `Unexpected response (${contentType || "no content-type"})`,
        error: {
          error: { message: "Unexpected non-JSON response", errors: [] },
          status: response.status,
          isError: true,
        },
      };
    }

    const res = await response.json();
    if (response.ok) {
      return { data: res, status: response.status, message: "", error: null };
    }
    return {
      data: null,
      status: response.status,
      message: response.statusText,
      error: res,
    };
  } catch (error) {
    // Provide detailed error information
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    const isNetworkError = errorMessage.includes("fetch failed") || errorMessage.includes("ECONNREFUSED");

    return {
      data: null,
      status: 500,
      message: isNetworkError
        ? `Network error: Unable to reach ${BASE_URL}. Please check if the server is running and accessible.`
        : errorMessage,
      error: {
        error: {
          message: errorMessage,
          errors: [{ field: "network", message: isNetworkError ? "Server unreachable" : errorMessage }],
        },
        status: 500,
        isError: true,
      },
    };
  }
}
