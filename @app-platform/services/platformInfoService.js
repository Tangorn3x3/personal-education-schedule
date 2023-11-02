import {fetchAction, getToken, serverActions} from "@/@app-platform/services/platformApiClient";
import notificationService from "@/utils/service/notificationService";

export async function fetchPlatformInfo() {
    let token = getToken()
    if (!token) return null;

    try {
        return await fetchAction(serverActions.auth_user_info)
    } catch (error) {
        console.error('Error while fetching user info', error)
        notificationService.showError(error.toString(), 'Получение информации о пользователе')
        throw error
    }
}