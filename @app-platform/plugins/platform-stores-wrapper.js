import supportStore from "../store/platformSupportStore";
export default ({ app, store }) => {
    store.registerModule('support', supportStore)
}