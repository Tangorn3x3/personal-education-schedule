import {fetchAction, getToken, serverActions} from "@/@app-platform/services/platformApiClient";
import notificationService from "@/utils/service/notificationService";
import nuxtConfig from "@/nuxt.config";

let app

export function initialize(appInstance) {
    app = appInstance
}

export function isTokenExists() {
    return !!getToken()
}

export async function fetchCurrentUserInfo() {
    let token = getToken()
    if (!token) return null;

    try {
        return await fetchAction(serverActions.auth_user_info)
    } catch (error) {
        console.error('Error while fetching user info', error)
        notificationService.showError(error.toString(), 'Получение информации о пользователе')
        return null
    }
}

export function isInterceptionUserInfoUrl(currentUrl) {
    debugger
    return currentUrl === nuxtConfig.auth.strategies.local.endpoints.user.url
}

export async function replaceAxiosUserInfoRequest(error) {
    let user = await fetchCurrentUserInfo()
    console.warn('Replaced user info', user)
    return {
        data: user,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: error.config,
        request: error.request,
    }
}