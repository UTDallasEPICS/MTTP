import {nanoid} from "nanoid"

const state = {}; 
const genState = () => { const s = nanoid(); state[s] = 1;  return s}
const runtime = useRuntimeConfig()

export const loginRedirectUrl = () => `${runtime.AUTH0_ISSUER_BASE_URL}/authorize?response_type=id_token&response_mode=form_post&client_id=${runtime.AUTH0_CLIENT_ID}&scope=openid%20email&redirect_uri=${encodeURIComponent(runtime.AUTH0_BASE_URL!+"/api/callback")}&nonce=${genState()}`
export const logoutRedirectUrl = (id_token: string) => `${runtime.AUTH0_ISSUER_BASE_URL}/oidc/logout?id_token_hint=${id_token}&post_logout_redirect_uri=${encodeURIComponent(runtime.AUTH0_BASE_URL!+"/api/logout-complete")}&nonce=${genState()}`

export const verifyNonce = (nonce: string) => {
    if (state[nonce]) {
      delete state[nonce]
      return true
    }
    return false
  }