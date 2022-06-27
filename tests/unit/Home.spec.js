import Home from '../../src/views/Home.vue';
// import BlogCard from '../../src/components/BlogCard.vue';
import BlogPost from '../../src/components/BlogPost.vue';
import {shallowMount, createLocalVue} from '@vue/test-utils';
import Vuex from 'vuex';
const localVue = createLocalVue()

localVue.use(Vuex)

describe(' home component', () => {
    let getters
    let store
    let state

    beforeEach(() => {
        state = {
            user: false
        }
        getters = {
            blogPostsFeed: () => {
                jest.fn();
            },
            blogPostsCards: () => {
                jest.fn();
            }
        }

        store = new Vuex.Store({state, getters})
    })

    it('checks for update news', () => {
        const wrapper = shallowMount(Home, {store, localVue})
        const updateInfo = wrapper.find('.updates');
        expect(updateInfo.exists()).toBe(true)
    })

    it('checks for blog posts', () => {
        const wrapper = shallowMount(Home, {
            store,
            localVue
        }, {
            data() {
                return {
                    welcomeScreen: {
                        title: "welcome",
                        blogPost: "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post! ",
                        welcomeScreen: true,
                        photo: "coding"
                    }
                }
            }
        })
        const blog = wrapper.findComponent(BlogPost);
        expect(blog.exists()).toBe(true)
    })


})
