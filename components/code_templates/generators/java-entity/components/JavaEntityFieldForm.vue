<template>
  <v-row>
    <col3>
      <v-text-field v-model="config.name" label="Имя" outlined dense filled hide-details
                    @input="changeFieldName"/>
    </col3>
    <col3>
      <v-autocomplete v-model="config.type" :items="fieldTypes" label="Тип" outlined dense filled hide-details/>
    </col3>
    <col2>
      <v-switch v-model="config.isEnum" label="Enum" color="success" inset dense class="mt-1" @change="changeIsEnum" tabindex="-1"/>
    </col2>
    <col2>
      <v-switch v-model="config.isRelation" label="Отношение" color="success" inset dense class="mt-1" tabindex="-1"/>
    </col2>
    <col2>
      <v-btn @click="showMore = !showMore" icon flat large tabindex="-1"><v-icon>{{moreIcon}}</v-icon></v-btn>
      <v-btn @click="" icon flat tabindex="-1"><v-icon>remove_red_eye</v-icon></v-btn>
      <v-btn @click="" icon flat color="success" large><v-icon>playlist_add</v-icon></v-btn>
    </col2>

    <col-full v-show="isShowMore">
      <v-row v-show="showRelation">
        <col2>
          <v-select v-model="config.relationType" :items="relationTypes" label="Тип отношения"
                    outlined dense filled/>
        </col2>
        <col2>
          <v-select v-model="config.cascadeType" :items="cascadeTypes" label="Тип каскада"
                    outlined dense filled/>
        </col2>
        <col2>
          <v-select v-model="config.relFetchType" :items="fetchTypes" label="Тип выборки"
                    outlined dense filled/>
        </col2>

        <col2 v-show="showJunction"> <v-text-field v-model="config.relJoinColumn" label="Join Column" outlined dense filled/> </col2>
        <col2 v-show="showJunction"> <v-text-field v-model="config.relJunctionTable" label="Junction Table" outlined dense filled/> </col2>
        <col2 v-show="showJunction"> <v-text-field v-model="config.relJunctionField" label="Junction Field" outlined dense filled/> </col2>
        <col2 v-show="showJunction"> <v-text-field v-model="config.relJunctionFieldRelation" label="Field in Relation" outlined dense filled/> </col2>

      </v-row>

      <v-row>
        <col3> <v-text-field v-model="config.description" label="Описание" outlined dense filled/> </col3>
        <col2> <v-text-field v-model="config.dbName" label="Колонка БД" outlined dense filled/> </col2>
        <col2> <v-text-field v-model="config.dbLength" label="Длина в БД" outlined dense filled/> </col2>
        <col2> <v-text-field v-model="config.dbColumnDefinition" label="Col Definition" outlined dense filled/> </col2>
        <col2> <v-switch v-model="config.showInModel" label="В модели" color="success" inset dense class="mt-1"/> </col2>

      </v-row>

      <v-row v-show="!showRelation">
        <col2> <v-select v-model="config.enumType" :items="enumTypes" label="Тип Enum" color="success" outlined dense filled/> </col2>
        <col2> <v-switch v-model="config.isNullable" label="Nullable" color="success" inset dense class="mt-1"/> </col2>
        <col2> <v-switch v-model="config.isUnique" label="Unique" color="success" inset dense class="mt-1"/> </col2>
        <col2> <v-switch v-model="config.isIndex" label="Indexed" color="success" inset dense class="mt-1"/> </col2>
        <col2> <v-switch v-model="config.transient" label="Transient" color="success" inset dense class="mt-1"/> </col2>
      </v-row>
    </col-full>

  </v-row>

</template>

<script>
  //import { mapGetters, mapActions } from 'vuex'
  import ColFull from "@/components/common/columns/ColFull";
  import Col3 from "@/components/common/columns/Col3";
  import JavaEntityField from "@/models/generators/java-entity/JavaEntityField";
  import Col2 from "@/components/common/columns/Col2";
  import {
    EntityRelationTypes,
    JavaEntityCascadeTypes,
    JavaEntityEnumTypes, JavaEntityFetchTypes,
    JavaEntityFieldTypes
  } from "@/scratches/entityTypes";

  export default {
    name: "JavaEntityFieldForm",
    components: {Col2, Col3, ColFull},
    props: {
      /** @type {JavaEntityField} */
      config: {type: Object}
    },
    data() {
      return {
        showMore: false
      }
    },
    computed: {
      moreIcon() {return this.showMore ? 'keyboard_arrow_up' : 'keyboard_arrow_down'},
      showEnum() {return this.config.isEnum},
      showRelation() {return this.config.isRelation},
      isShowMore() {return this.showMore || this.showRelation},
      showJunction() { return this.config.relationType ===  EntityRelationTypes.ManyToMany.type },

      enumTypes() {
        const types = []
        _.forIn(JavaEntityEnumTypes, type => { types.push(type) })
        return types
      },
      fieldTypes() {
        const types = []
        _.forIn(JavaEntityFieldTypes, (type, key) => { types.push(key) })
        return types
      },
      relationTypes() {
        const types = []
        _.forIn(EntityRelationTypes, (type, key) => { types.push({text: type.desc, value: key}) })
        return types
      },
      cascadeTypes() {
        const types = []
        _.forIn(JavaEntityCascadeTypes, (type, key) => { types.push({text: type.desc, value: key}) })
        return types
      },
      fetchTypes() {
        const types = []
        _.forIn(JavaEntityFetchTypes, (type) => { types.push({text: type, value: type}) })
        return types
      }
    },
    mounted() {
      console.debug('JavaEntityFieldForm mounted.')
    },
    created() {
    },
    methods: {
      changeIsEnum(val) {  if(val) { this.config.enumType = JavaEntityEnumTypes.STRING } },
      changeFieldName(val) {
        this.config.dbName = _.toUpper(_.snakeCase(val))
      }
    },

  }
</script>

<style scoped>

</style>
