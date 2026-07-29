import { NextResponse } from "next/server"
import { APP_SESSION_COOKIE } from "@/lib/hub-sso/session"

const clearSession = (request: Request) => {
  const url = new URL(request.url)
  const hubBaseUrl = process.env.HUB_BASE_URL
  const hubAppId = process.env.HUB_APP_ID
  const redirectUrl =
    hubBaseUrl && hubAppId
      ? `${hubBaseUrl}/sso?app=${encodeURIComponent(hubAppId)}`
      : new URL("/", url)

  const response = NextResponse.redirect(redirectUrl)
  response.cookies.delete(APP_SESSION_COOKIE)
  return response
}

export function GET(request: Request) {
  return clearSession(request)
}

export function POST(request: Request) {
  return clearSession(request)
}
