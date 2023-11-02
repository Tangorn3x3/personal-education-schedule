
import * as propertyService from "@/utils/service/propertyService";

export default (ctx, inject) => {
  propertyService.initialize(ctx.store)
}
