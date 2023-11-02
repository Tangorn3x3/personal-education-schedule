import * as notificationService from '@/utils/service/notificationService'

export default (ctx, inject) => {
  notificationService.initialize(ctx.$dialog)
  inject('notifications', notificationService.default)
}
