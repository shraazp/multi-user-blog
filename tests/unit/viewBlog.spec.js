import ViewBlog from '../../src/views/ViewBlog.vue';
import {mount, createLocalVue} from '@vue/test-utils';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);
describe("view blog", () => {
    let wrapper;
    beforeEach(() => {
        const $route = {
            params: {
                blogID: 35
            }
        }
        wrapper = mount(ViewBlog, {
            data() {
                return {currentBlog: null}
            },
            mocks: {
                $route,
                $store: {
                    state: {
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
                }
            }
        });
    })
    test('renders view blog', async () => {
        const text = wrapper.find('h2');
        expect(text.text()).toContain('dffssa')
    });
})
