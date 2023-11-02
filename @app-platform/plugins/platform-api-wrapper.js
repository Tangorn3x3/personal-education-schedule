import nuxtConfig from '@/nuxt.config'
import * as platformApiClient from "../services/platformApiClient";
import * as platformAuthService from "../auth/platformAuthService";

export default ({ app, store }) => {
  platformApiClient.initialize(nuxtConfig.platformApiUrl, app)
  platformAuthService.initialize(app)
}