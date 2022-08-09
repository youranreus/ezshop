/**
 * @author 季悠然
 * @date 2022-08-09
 */
import {Base64} from 'js-base64';

export function getDate(date) {
    const d = new Date(date)
    return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
}

export function getQueryJson(json) {
    return encodeURI(Base64.encode(JSON.stringify(json)))
}