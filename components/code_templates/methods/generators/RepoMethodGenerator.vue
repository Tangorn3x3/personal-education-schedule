<template>
  <div>
    <div class="headline subtitle-1">{{ typeTitle }}</div>
    <v-row>
      <v-col cols="12">
        <v-row>
          <col4>
            <v-text-field v-model="tplData.methodName" label="Название метода" outlined dense filled/>
          </col4>
          <col4>
            <v-text-field v-model="tplData.returnType" label="Возвращаемый тип" outlined dense filled/>
          </col4>
          <col4>
            <v-btn @click="preGenerate()" color="primary" block>
              <v-icon>play_arrow</v-icon>
            </v-btn>
          </col4>

        </v-row>

        <v-row>
          <col-full>
            <v-radio-group v-model="generatorType" row class="mt-1">
              <v-radio v-for="(type, indx) in generatorTypes" :key="indx" :label="type" :value="type"></v-radio>
            </v-radio-group>
          </col-full>
        </v-row>
      </v-col>

      <col-full>
        <editor :code="generatedText" language="java" auto-style-line-numbers line-numbers readonly/>
      </col-full>
    </v-row>
  </div>
</template>

<script>
  //import { mapGetters, mapActions } from 'vuex'
  import Col4 from "@/components/common/columns/Col4";
  import ColFull from "@/components/common/columns/ColFull";
  import Col2 from "@/components/common/columns/Col2";
  import Col8 from "@/components/common/columns/Col8";
  import Editor from "@/components/editor/Editor";
  import {GenMethodTypes} from "@/models/generators/GenMethods";
  import CommonMethodGenerator from "@/components/code_templates/methods/CommonMethodGenerator";

  const RepoGeneratorTypes = Object.freeze({
    Native: "Native",
    NativeList: "NativeList",
    Criteria: 'Criteria',
    CriteriaList: 'CriteriaList',
  });

  export default {
    name: "RepoMethodGenerator",
    extends: CommonMethodGenerator,
    components: {Editor, Col8, Col2, ColFull, Col4},
    props: {

    },
    data() {
      return {
        tplData: {
          methodName: '',
          returnType: '',
          isList: false,
        },

        generatorType: RepoGeneratorTypes.Native,
        currentGeneratorType: GenMethodTypes.REPO_METHOD,
        generatorTypes: RepoGeneratorTypes,
      }
    },
    computed: {},
    mounted() {
      console.debug('RepoMethodGenerator mounted.')
    },
    created() {
    },
    methods: {
      preGenerate() {
        this.tplData.methodName = _.camelCase(this.tplData.methodName)
        this.tplData.returnType = _.upperFirst(_.camelCase(this.tplData.returnType))
        this.generate()
      }
    },

  }

  const criteriaTemplate = ``
  const nativeTemplate = ``
</script>

<style scoped>

</style>
