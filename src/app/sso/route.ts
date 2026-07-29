import { NextResponse } from "next/server"
import {
  APP_SESSION_COOKIE,
  createLocalSessionCookie,
} from "@/lib/hub-sso/session"
import { verifyIncomingHubSsoToken } from "@/lib/hub-sso/verify-incoming-token"

export const runtime = "nodejs"

const requiredEnv = () => {
  const appSessionSecret = process.env.APP_SESSION_SECRET

  if (!appSessionSecret) {
    throw new Error("missing_sso_config")
  }

  return {
    appSessionSecret,
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const token = url.searchParams.get("token")

  if (!token) {
    return NextResponse.redirect(new URL("/", url))
  }

  try {
    const { appSessionSecret } = requiredEnv()
    const claims = verifyIncomingHubSsoToken(token)
    const session = {
      sub: claims.sub,
      email: claims.email,
      name: claims.name ?? null,
      global_role: claims.global_role ?? null,
      app_id: claims.app_id,
      exp: claims.exp,
    }
    const cookieValue = await createLocalSessionCookie(session, appSessionSecret)
    const nowSeconds = Math.floor(Date.now() / 1000)
    const maxAge = Math.max(claims.exp - nowSeconds, 0)
    const response = NextResponse.redirect(new URL("/", url))

    response.cookies.set({
      name: APP_SESSION_COOKIE,
      value: cookieValue,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge,
    })

    return response
  } catch {
    const response = NextResponse.redirect(new URL("/", url))
    response.cookies.delete(APP_SESSION_COOKIE)
    return response
  }
}
