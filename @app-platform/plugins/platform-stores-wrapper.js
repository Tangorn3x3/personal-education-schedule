import supportStore from "../store/platformSupportStore";
import permissionsStore from "../store/permissionsStore";
export default ({ app, store }) => {
    store.registerModule('support', supportStore)
    store.registerModule('permissions', permissionsStore)

    store.subscribe(({ type, payload }, state) => {
        if (type.startsWith('auth')) {
            console.log('Изменение состояния auth:', type, payload);
            store.dispatch('permissions/fetchAllPermissions')
        }
    });
}