/* eslint-disable no-mixed-operators */
import _ from 'lodash'
import JavaEntityClassConfig from "@/models/generators/java-entity/JavaEntityClassConfig";
import JavaEntityField from "@/models/generators/java-entity/JavaEntityField";

class JavaEntity extends JavaEntityClassConfig {
  constructor (props) {
    super(props)
    this.initialize(props)
  }

  initialize (props) {
    super.initialize(props)
    /** @type {Array<JavaEntityField>} */ this.fields = _.get(props, 'fields') || [new JavaEntityField({})]

  }
}

export default JavaEntity

