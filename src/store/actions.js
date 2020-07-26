import {SHOW_ARTICLES, SHOW_TAGS} from './types';

export function showArticles(payload) {
    return {
        type: SHOW_ARTICLES,
        payload,
    };
}

export function showTags(payload) {
    return {
        type: SHOW_TAGS,
        payload,
    };
}