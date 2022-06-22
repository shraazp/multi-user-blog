import BlogPreview from '../../src/views/BlogPreview';
import {shallowMount, createLocalVue} from '@vue/test-utils';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

test('displays blog preview properly', async () => {
    const wrapper = shallowMount(BlogPreview, {
       
        mocks: {
            $store: {
                state: {
                    blogTitle: "nodejs",
                    blogHTML:"Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.",
                    blogPhotoFileURL:"blob:http://localhost:8080/e403c61b-8cd1-465d-9899-68922559c121",
                }
            }
        }
    });
    const text = wrapper.find('h2');
    // const html=wrapper.find('.post-content')
    expect(text.text()).toContain('nodejs')
  //  expect(html.text()).toContain("Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.")
});