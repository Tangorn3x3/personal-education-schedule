import * as AxiosErrorParser from "@/utils/axiosErrorParser";
import i18nService from '@/utils/service/i18nService'
import miniToastr from 'mini-toastr'

let dialog
export function initialize (dialogInstance) {
  dialog = dialogInstance
}

const toastTypes = {
  success: 'success',
  error: 'error',
  info: 'info',
  warn: 'warn'
}

const options = {
  timeout: 3000,
  longTimeout: 10000
}

// This step requires only for mini-toastr, just an initialization
miniToastr.init({
  types: toastTypes,
  style: {
    '.mini-toastr': {
      'font-family': 'Roboto Condensed',
      position: 'fixed',
      'z-index': 99999,
      right: '12px',
      top: '12px'
    },
    '.mini-toastr__notification': {
      cursor: 'pointer',
      padding: '12px 18px',
      margin: '0 0 6px 0',
      'background-color': '#000',
      opacity: 1,
      color: '#fff',
      'border-radius': '3px',
      'box-shadow': '#3c3b3b 0 0 6px',
      width: '300px',
      '&.-error': {
        'background-color': '#ff5252'
      },
      '&.-warn': {
        'background-color': '#fb8c00'
      },
      '&.-success': {
        'background-color': '#82B752'
      },
      '&.-info': {
        'background-color': '#2196f3'
      },
      '&:hover': {
        opacity: 1,
        'box-shadow': '#000 0 0 12px'
      }
    },
    '.mini-toastr-notification__title': {
      'font-weight': '500',
      opacity: 0.8,
      'margin-bottom': '15px'
    },
    '.mini-toastr-notification__message': {
      display: 'inline-block',
      'vertical-align': 'middle',
      width: '240px',
      padding: '0px 0px'
    }
  }
})

// Can change like in this lib https://se-panfilov.github.io/vue-notifications/docs/html/advanced-setup.html
function toast ({ title, message, type, timeout, cb }) {
  return miniToastr[type](message, title, timeout, cb)
}

const nativeNotificationImage = 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBDMTc0Nzk0RDZFRDExRUE5NkFGRDEzMTU4OTFEM0UyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBDMTc0Nzk1RDZFRDExRUE5NkFGRDEzMTU4OTFEM0UyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEMxNzQ3OTJENkVEMTFFQTk2QUZEMTMxNTg5MUQzRTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEMxNzQ3OTNENkVEMTFFQTk2QUZEMTMxNTg5MUQzRTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYG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'

/**
 * Показывает сообщения об ошибках.
 *  Внутри компонентов можно использовать как this.$notifications.showAxiosError(error, 'Title')
 *
 * @type {{showAxiosError: (function(*=, *=): *)}}
 */
const notificationService = {
  showAxiosError: (error, title = '') => {
    const realTitle = title || 'Ошибка'
    const messageWithDetails = AxiosErrorParser.getMessageWithDetails(error)

    const localeMessage = i18nService.$t(`serverErrors.${messageWithDetails.message}`)
    let mess = localeMessage

    if (!localeMessage) mess = messageWithDetails.details

    console.error('AxiosError', mess, error)

    if (!mess) mess = 'Ошибка выполенения'
    dialog.error({
      text: mess,
      title: realTitle
    })

  },
  showError: (message, title = '') => {
    dialog.error({
      text: message,
      title: title
    })
  },
  showMessage: (message, title = '') => {
    dialog.confirm({
      text: message,
      title: title,
      actions: {
        'true': 'ОК'
      }
    })
  },

  showSuccessAlert: (message, title = '') => {
    const realTitle = title || 'Успешно'
    toast({ title: realTitle, message, type: toastTypes.success, timeout: options.timeout, cb: null })
  },
  showInfoAlert: (message, title = '') => {
    const realTitle = title || 'Информация'
    toast({ title: realTitle, message, type: toastTypes.info, timeout: options.timeout, cb: null })
  },
  showWarnAlert: (message, title = '') => {
    const realTitle = title || 'Внимание'
    toast({ title: realTitle, message, type: toastTypes.warn, timeout: options.timeout, cb: null })
  },
  showErrorAlert: (message, title = '') => {
    const realTitle = title || 'Ошибка'
    toast({ title: realTitle, message, type: toastTypes.error, timeout: options.timeout, cb: null })
  },

  showNativeNotification: (message, title = '', image = null) => {
      const options = {
        body: message,
        image: image || nativeNotificationImage
      }


      // Let's check if the browser supports notifications
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      }
      else if (Notification.permission === "granted") {
        const notification = new Notification(title, options);
      }

      // Otherwise, we need to ask the user for permission
      else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
            const notification = new Notification(title, options);
          }
        });
      }

  },

  setRemindersStatus: (status = false) => {
    localStorage.setItem('reminders-active', status ? 'true' : 'false')
  },
  isRemindersActive: () => {
    let status = localStorage.getItem('reminders-active')
    return status === 'true'
  },
  isRemindersStatusSetted: () => {
    let status = localStorage.getItem('reminders-active')
    return !!status
  }
}

export default notificationService
