/* eslint-disable no-unused-vars */
import EditBlog from '../../src/views/EditBlog.vue';
import {shallowMount, createLocalVue} from '@vue/test-utils';
import Vuex from 'vuex';
import axios from 'axios';

const localVue = createLocalVue()

localVue.use(Vuex);


jest.mock('axios')

describe(' create blog component', () => {
    let store
    let state
    let mutations
    let wrapper
    let uploadBlog
    let actions
    beforeEach(() => {
        const $route = {
           
            params: {
                blogid: 35
            },
            
        }
        const $router={
            push: jest.fn(),
        }
        state = {
            blogHTML: "Write your blog title here...",
            blogTitle: "nodejs",
            blogPhotoName: "nodejs",
            blogAuthor: "",
            blogEmail: "",
            blogPhotoFileURL: "/uploads/nodejs_applications_8d97d5cbfc.png",
            blogPhotoPreview: null,
            profileId: 13,
            profileUsername: 'shravya',
            profileEmail: 'shravyamaradithaya@gmail.com',
            blogPosts: [
                {
                    "blogID": 35,
                    "blogHTML": "<p>Write your blog title here...dfgsadfczcxZ</p>",
                    "blogCoverPhoto": "/uploads/nodejs_applications_8d97d5cbfc.png",
                    "blogTitle": "dffssa",
                    "blogDate": "Thu Jun 16 2022",
                    "blogCoverPhotoName": "nodejs-applications.png",
                    "blogAuthor": "Shraaz",
                    "blogEmail": "shravyamaradithaya@gmail.com",
                    "subject": null
                }, {
                    "blogID": 22,
                    "blogHTML": "<p>In Javascript, every object inherits properties and methods from a prototype. A&nbsp;<em>prototype&nbsp;</em>in simple terms can be viewed as a base object that is associated with all functions and objects by default.</p><p>So, for example, a&nbsp;<code style=\"background-color: rgb(242, 242, 242);\">Date</code>&nbsp;object inherits the&nbsp;<code style=\"background-color: rgb(242, 242, 242);\">Date.prototype</code>, an&nbsp;<code style=\"background-color: rgb(242, 242, 242);\">Array</code>&nbsp;inherits&nbsp;<code style=\"background-color: rgb(242, 242, 242);\">Array.prototype</code>, and a&nbsp;<code style=\"background-color: rgb(242, 242, 242);\">Person</code>&nbsp;object will inherit a&nbsp;<code style=\"background-color: rgb(242, 242, 242);\">Person.prototype</code>.</p><p>Additionally, all of these objects will inherit&nbsp;<code style=\"background-color: rgb(242, 242, 242);\">Object.prototype</code></p><p>This is mostly useful for the internals of Javascript, and it allows us to work with Javascript as we know, but generally speaking it’s nice to understand that all object properties and methods that we are using, are defined on the prototype level. And you can check this out yourself by simply logging out the&nbsp;<em>prototype&nbsp;</em>like so:</p>",
                    "blogCoverPhoto": "/uploads/1_iyy_Sjh_SD_7tdq_G9_J0_Y_Zxfdw_97cf2523d4.png",
                    "blogTitle": "Javascript Engineering: The Science Behind",
                    "blogDate": "Fri May 27 2022",
                    "blogCoverPhotoName": "1_iyySjhSD7tdqG9J0YZxfdw.png",
                    "blogAuthor": "huffepuff",
                    "blogEmail": "shravani@gmail.com",
                    "subject": "javascript"
                },
            ]
        }
        actions = {
            updatePost: jest.fn()
        }
        mutations = {
            setBlogState: jest.fn()
        }
        store = new Vuex.Store({state, mutations,actions})


        wrapper = shallowMount(EditBlog, {
            store,
            localVue,
            data() {
                return {imageId: 15, routeID: 35, currentBlog: null}
            },
            mocks: {
                $route,
                $router
            }
        });
        uploadBlog = jest.spyOn(wrapper.vm, 'updateBlog')

    })
    test('checks if update blog works', async () => {
        const response = {
            data: {
                "id": 35,
                "attributes": {
                    "blogTitle": "zxcxzcZX",
                    "blogHTML": "<p>Write your blog title here...xzczx</p>",
                    "blogCoverPhotoName": "Tailwind-CSS-Tutorial (1).png",
                    "authorName": "Shraaz",
                    "author": "shravyamaradithaya@gmail.com",
                    "date": "Tue Jun 21 2022",
                    "createdAt": "2022-06-21T11:55:02.378Z",
                    "updatedAt": "2022-06-21T11:55:02.378Z",
                    "publishedAt": "2022-06-21T11:55:02.367Z",
                    "subject": null
                }
            }
        };
        axios.put.mockImplementationOnce(() => Promise.resolve(response));
        await wrapper.find('.update').trigger('click')
        expect(axios.put).toHaveBeenCalledTimes(1)
    });
})
