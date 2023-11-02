<template>
  <single-panel header="Информация о классе">
    <v-row>
      <col4> <v-text-field v-model="localConfig.className" label="Имя" outlined dense filled required hide-details
                           @input="changeClassName" :error="isOracleFieldInvalid(localConfig.tableName) || isOracleFieldInvalid(localConfig.seqName)"/> </col4>
      <col4> <v-text-field v-model="localConfig.desc" label="Описание" outlined dense filled required hide-details/> </col4>
      <col2> <v-switch v-model="localConfig.generateModel" label="Модель" color="success" @change="genModelChange" inset dense class="mt-1"/> </col2>
      <col2>
        <v-btn @click="showMore = !showMore" icon flat large tabindex="-1"><v-icon>{{moreIcon}}</v-icon></v-btn>
      </col2>
    </v-row>

    <v-row v-show="showMore">
      <col4> <v-text-field v-model="localConfig.tableName" label="Таблица"
                           :error="isOracleFieldInvalid(localConfig.tableName)" @input="changeTableName"
                           counter outlined dense filled required/> </col4>
      <col4> <v-text-field v-model="localConfig.seqName" label="Сиквенс"
                           :error="isOracleFieldInvalid(localConfig.seqName)" counter outlined dense filled required/> </col4>
      <col2> <v-switch v-model="localConfig.generateToModelMethod" label="toModel" color="success" inset dense class="mt-1"/> </col2>
      <col2> <v-switch v-model="localConfig.isMappedSuperclass" label="Суперкласс" color="success" inset dense class="mt-1"/> </col2>
    </v-row>
  </single-panel>
</template>

<script>
  //import { mapGetters, mapActions } from 'vuex'
  import CommonClassForm from "@/components/code_templates/generators/CommonClassForm";
  import Col6 from "@/components/common/columns/Col6";
  import Col4 from "@/components/common/columns/Col4";
  import ColFull from "@/components/common/columns/ColFull";
  import JavaEntityClassConfig from "@/models/generators/java-entity/JavaEntityClassConfig";
  import Col8 from "@/components/common/columns/Col8";
  import Col3 from "@/components/common/columns/Col3";
  import Col2 from "@/components/common/columns/Col2";
  import SinglePanel from "@/components/common/panels/SinglePanel";

  export default {
    name: "JavaEntityClassForm",
    components: {SinglePanel, Col2, Col3, Col8, ColFull, Col4, Col6},
    extends: CommonClassForm,
    props: {},
    data() {
      return {
        localConfig: new JavaEntityClassConfig({}),
        showMore: false
      }
    },
    computed: {
      moreIcon() {return this.showMore ? 'keyboard_arrow_up' : 'keyboard_arrow_down'},
    },
    methods: {
      changeClassName(className) {
        this.localConfig.tableName = this.calcTableName(className)
        this.localConfig.seqName = this.calcSeqName(className)
        this.localConfig.className = _.upperFirst(_.camelCase(className))
      },
      changeTableName(tableName) {
        this.localConfig.seqName = _.toUpper(`${tableName}_seq`)
      },
      calcTableName(className) {
        const name = _.snakeCase(className) + 'S'
        return _.toUpper(name)
      },
      calcSeqName(className) {
        const name = this.calcTableName(className)
        return _.toUpper(`${name}_seq`)
      },
      isOracleFieldInvalid(val) {
        return !!val ? val.length > 30 : false
      },
      genModelChange(val) {
        if (val) this.localConfig.generateToModelMethod = true
      }
    },

  }
</script>

<style scoped>

</style>
