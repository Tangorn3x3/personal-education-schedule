import Vue from 'vue'
import {mapActions} from "vuex";
Vue.mixin({
    computed: {
        isFullyPublic() {
            return true
        },
    },
    methods: {
        ...mapActions('utils', { showSnackbar: 'showSnackbar' }),
        can (permission) {
            return this.$store.getters['permissions/can'](permission)
        },
    }
})
