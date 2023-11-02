import Vue from 'vue'
Vue.mixin({
    computed: {
        isFullyPublic() {
            return true
        },
    },
    methods: {
        can (permission) {
            return this.$store.getters['permissionsStore/can'](permission)
        },
    }
})
