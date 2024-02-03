import {loginRedirectUrl} from "../api/auth0"
import jwt from "jsonwebtoken"
import fs from "fs"
import { PrismaClient } from "@prisma/client"
const client = new PrismaClient()
export default defineEventHandler(async event => {
  event.context.client = client
  const cvtoken = getCookie(event, "cvtoken") || ""
  // not logged in but trying to
  if (!cvtoken && !(event.node.req.url?.includes('/api/callback') )) {
    await sendRedirect(event, loginRedirectUrl());
  } else {
    // theoretically logged in
    if (cvtoken) {
      try {
        const claims = jwt.verify(
          cvtoken, 
          fs.readFileSync(process.cwd()+"/cert-dev.pem")
        )
        event.context.claims = claims
        event.context.user = await event.context.client.user.findFirst(
          {
            where:{ email: claims.email }
          ,
          })
        if(!event.context.user) {
          console.error(`${claims.email} not found`) 
          setCookie(event,'cvtoken','')
          setCookie(event,'cvuser','')
    
          return await sendRedirect(event, loginRedirectUrl());
        }
        // include pages ids to check if that's the family's page. 
        setCookie(event, "cvuser", JSON.stringify(event.context.user))
      } catch (e) {
        console.error(e) 
        setCookie(event,'cvtoken','')
        setCookie(event,'cvuser','')
    
        return await sendRedirect(event, loginRedirectUrl())
      }
    }
  }
})