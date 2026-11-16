import { cookies } from "next/headers";
import { cache } from "react";
import { DATA_MODE_COOKIE, parseDataMode, type DataMode } from "./dataMode";

/** The data mode of this request. Reads cookies, so call it inside Suspense or after `connection()`. */
export const getDataMode = cache(async (): Promise<DataMode> => parseDataMode((await cookies()).get(DATA_MODE_COOKIE)?.value));
