import { postGetAllAction } from './controller/PostGetAllAction'
import { postSaveAction } from './controller/PostSaveAction'
import { PostGetByNameAction } from './controller/PostGetByNameAction'

export const AppRoutes = [
    {
        path: '/posts',
        method: 'get',
        action: postGetAllAction
    },
    {
        path: '/posts/:name',
        method: 'get',
        action: PostGetByNameAction
    },
    {
        path: '/posts',
        method: 'post',
        action: postSaveAction
    }
]