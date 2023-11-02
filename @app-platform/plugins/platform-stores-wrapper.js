import supportStore from "../store/platformSupportStore";
export default ({ app, store }) => {
    store.registerModule('support', supportStore)

    store.subscribe(({ type, payload }, state) => {
        if (type.startsWith('auth')) {
            console.log('Изменение состояния auth:', type, payload);
            store.dispatch('permissionsStore/fetchAllPermissions')
        }
    });
}