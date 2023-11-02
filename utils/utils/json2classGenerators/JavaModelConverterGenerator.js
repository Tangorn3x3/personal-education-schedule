import BaseGenerator from "@/utils/utils/json2classGenerators/BaseGenerator";
import _ from "lodash";
import JavaToModelGenerator from "@/utils/utils/json2classGenerators/JavaToModelGenerator";
import JavaFromModelGenerator from "@/utils/utils/json2classGenerators/JavaFromModelGenerator";

class JavaModelConverterGenerator extends BaseGenerator{
  constructor (props) {
    super(props)
    this.initialize(props)
  }

  initialize(props) {
    this.fileExtension = 'java'
    super.initialize(props)
    this.toModelGenerator = new JavaToModelGenerator(Object.assign(props, {userGetter: true}))
    this.fromModelGenerator = new JavaFromModelGenerator(props)
  }

  generate() {
    let text = ''
    let tpl = this.getMainTemplate()

    let extendsName = ''
    if (this.isExtends) extendsName = `extends ${this.extendsName} `

    text = tpl({
      className: this.className,
      fromModelAttributes: this.fromModelGenerator.generateAttributeList(this.jsonObject),
      toModelAttributes: this.toModelGenerator.generateAttributeList(this.jsonObject),
      extendsName: extendsName
    })

    return text

  }

  getMainTemplate () {
    return _.template(
        `public class <%- className %>ModelConverter extends ModelConverter<<%- className %>Model, <%- className %>> {
    public <%- className %>ModelConverter() {
        super(<%- className %>ModelConverter::convertToEntity, <%- className %>ModelConverter::convertToModel);
    }
    
    private static <%- className %>Model convertToModel(<%- className %> entity) {
      if (entity == null) return null;
      
      return <%- className %>Model.builder()
             <%- toModelAttributes %>
            .build();
    }
    
    private static <%- className %> convertToEntity(<%- className %>Model model) {
      // throw new UnsupportedOperationException("Conversion from <%- className %> to <%- className %>Model not supported");
      <%- className %> entity = new <%- className %>();
      
      <%- fromModelAttributes %>
      return entity;
    }
}
`)
  }

  getFileName() {
    return `${this.className}ModelConverter.${this.fileExtension}`
  }

}

export default JavaModelConverterGenerator
