<script>
  import Vue from 'vue'
  export default {
    name: "CommonClassForm",
    props: {
      config: {type: Object}
    },
    data() {
      return {
        localConfig: {className: ""}
      }
    },
    watch: {
      config: {
        deep: true,
        handler(val) {
          this.initLocalConfig(val)
        }
      },
      localConfig: {
        deep: true,
        handler(val) {
          this.$emit('change', val)
        }
      }
    },
    mounted() {
      this.initLocalConfig(this.config)
    },
    created() {
    },
    methods: {
      initLocalConfig(mainConfig) {
        if (!mainConfig) return
        _.forIn(this.localConfig, (value, key) => {
          const confVal = _.get(mainConfig, key)
          if (confVal === value) {
            Vue.set(this.localConfig, key, confVal)
          }
        })
      },
      changeField(event, key) {

      },
    },

  }
</script>

<style scoped>

</style>
