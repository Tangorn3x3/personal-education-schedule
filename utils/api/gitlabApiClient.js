import apiService from "@/utils/api/apiClient";
import notificationService from "@/utils/service/notificationService";
import _ from "lodash";

const PROXY_HOST = localStorage.getItem('proxy_host')
const ROOT_URI = '/api/gitlab'

/**
 *
 * @param path
 * @return {Promise<GitlabProject>}
 */
export function findProjectByPath(path) {
    const targetUrl = `${PROXY_HOST}${ROOT_URI}/projects?search=${path}`

    return new Promise((resolve, reject) => {
        apiService.get(targetUrl, {
        })
            .then((response) => {
                let result = response.data || [];
                result = _.filter(result, { 'path': path })
                if (result.length > 0)
                    result = result[0]
                console.debug(`Gitlab Proxy response for ${targetUrl}`, result)

                if (!result) reject()
                else resolve(result)
            })
            .catch((error) => {
                notificationService.showAxiosError(error, `Загрузка с Gitlab`)
                reject(error)
            })
    })
}

/**
 *
 * @param projectId
 * @param commitId
 * @return {Promise<GitlabCommit>}
 */
export function getCommitInfo(projectId, commitId) {
    const targetUrl = `${PROXY_HOST}${ROOT_URI}/projects/${projectId}/commit/${commitId}`

    return new Promise((resolve, reject) => {
        apiService.get(targetUrl, {
        })
            .then((response) => {
                let result = response.data;
                console.debug(`Gitlab Proxy response for ${targetUrl}`, result)

                if (!result) reject()
                else resolve(result)
            })
            .catch((error) => {
                notificationService.showAxiosError(error, `Загрузка с Gitlab`)
                reject(error)
            })
    })
}
