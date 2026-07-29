import "server-only"

import { verifyHubSsoTokenV2 } from "@gestionatools-org/hub-sso-core"

const getRequiredEnv = (name: string) => {
  const value = process.env[name]
  if (!value) {
    throw new Error(`missing_env_${name}`)
  }
  return value
}

export const verifyIncomingHubSsoToken = (token: string) => {
  const publicKey = getRequiredEnv("HUB_SSO_PUBLIC_KEY").replace(/\\n/g, "\n")
  const claims = verifyHubSsoTokenV2(token, {
    publicKey,
    issuer: getRequiredEnv("HUB_SSO_ISSUER"),
    audience: new URL(getRequiredEnv("APP_BASE_URL")).host,
  })

  if (claims.app_id !== getRequiredEnv("HUB_APP_ID")) {
    throw new Error("invalid_app_id")
  }

  return claims
}
