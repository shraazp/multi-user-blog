import CreatePost from '../../src/views/CreatePost.vue';
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
    beforeEach(() => {
        state = {
            blogHTML: "Write your blog title here...",
            blogTitle: "nodejs",
            blogPhotoName: "nodejs",
            blogAuthor: "",
            blogEmail: "",
            blogPhotoFileURL: null,
            blogPhotoPreview: null,
            profileId: 13,
            profileUsername: 'shravya',
            profileEmail: 'shravyamaradithaya@gmail.com'
        }
        mutations = {
            setBlogState: jest.fn()
        }
        store = new Vuex.Store({state, mutations})
    })
    test('checks if publish blog works', async () => {
        const mockMethod = jest.fn();
        const $router = {
            push: jest.fn()
        }
        const wrapper = shallowMount(CreatePost, {
            store,
            localVue,
            data() {
                return {imageId: 15}
            },
            methods: {
                updateBlog: mockMethod
            },
            mocks: {
                $router
            }

        });

        const response = {
            data: {
                "id": 36,
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
        axios.post.mockImplementationOnce(() => Promise.resolve(response));
        await wrapper.find('.publish').trigger('click')
        expect(axios.post).toHaveBeenCalledTimes(1)
    });
})
