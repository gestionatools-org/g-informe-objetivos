import "server-only"

import { cookies } from "next/headers"
import {
  APP_SESSION_COOKIE,
  verifyLocalSessionCookie,
} from "@/lib/hub-sso/session"

export const getCurrentUser = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get(APP_SESSION_COOKIE)?.value

  return verifyLocalSessionCookie(token)
}
