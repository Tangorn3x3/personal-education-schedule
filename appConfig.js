import nuxtConfig, {APP_NAME} from "@/nuxt.config";
import {PlatformCrudTableDesc} from "@/@app-platform/services/platformCrudService";

/** @type {Object.<string, PlatformCrudTableDesc>} */
export const PlatformCrudTables = Object.freeze({
    coursesGroups: new PlatformCrudTableDesc({ code: 'coursesGroups', table: 'dict_course_groups', name: 'Группы курсов', cacheable: true}),
    courses: new PlatformCrudTableDesc({ code: 'courses', table: 'dict_courses', name: 'Курсы', cacheable: true}),
    schedules: new PlatformCrudTableDesc({ code: 'schedules', table: 'data_schedule', name: 'Расписание', cacheable: false }),

    schedulesView: new PlatformCrudTableDesc({ code: 'schedulesView', table: 'view_schedule', name: 'Расписание', cacheable: true }),
    schedulesStatistics: new PlatformCrudTableDesc({ code: 'schedulesStatistics', table: 'view_schedule_course_statistics', name: 'Расписание. Статистика', cacheable: false }),
});

export default {
    appName: APP_NAME,

    platformApiUrl: nuxtConfig.platformApiUrl,
    platformCrud: {
        cacheEnabled: true,
    },

    courses: {
        fallbackImage: 'https://drive.google.com/uc?export=view&id=1YTpdy8zP_nrzhHcN3uLRvlY5Kjzww4jY',
    }
}