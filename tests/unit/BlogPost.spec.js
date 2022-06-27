import BlogPost from '../../src/components/BlogPost.vue';
import {shallowMount} from '@vue/test-utils';
test('renders blog post component', async () => {
    const wrapper = shallowMount(BlogPost, {
        propsData: {
            post: {
                blogAuthor: "Shraaz",
                blogCoverPhoto: "/uploads/nodejs_applications_8d97d5cbfc.png",
                blogCoverPhotoName: "nodejs-applications.png",
                blogDate: "Thu Jun 16 2022",
                blogEmail: "shravyamaradithaya@gmail.com",
                blogHTML: "<p>Write your blog title here...dfgsadfczcxZ</p>",
                blogID: 35,
                blogTitle: "dffssa",
                subject: null
            }
        },
        mocks: {
            $store: {
                state: {
                    user: true
                }
            }
        }
    });
    const text = wrapper.find('h2');
    expect(text.text()).toContain('dffssa')
});