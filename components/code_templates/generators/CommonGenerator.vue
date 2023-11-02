<script>
  import Vue from 'vue'
  export default {
    name: "CommonGenerator",
    props: {
      config: {type: Object}
    },
    data() {
      return {
        localConfig: {}
      }
    },
    watch: {
      config: {
        deep: true,
        handler(val) {
          this.localConfig = _.cloneDeep(val)
        }
      }
    },
    computed: {
      //...mapGetters('NameStore', ['item'])
    },
    mounted() {
      console.debug('CommonGenerator mounted.')
    },
    created() {
    },
    methods: {
      onClassFormChanged(fields) {
        if (!fields) return
        _.forIn(fields, (value, key) => {
          Vue.set(this.localConfig, key, value)
        })
      }
    },

  }
</script>
