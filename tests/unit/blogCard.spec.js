import BlogCard from '../../src/components/BlogCard.vue';
import {shallowMount, createLocalVue} from '@vue/test-utils';
import Vuex from 'vuex';
import deleteModal from '../../src/components/DeleteModal.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

test('displays blog card', async () => {
    const wrapper = shallowMount(BlogCard, {
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
                    editPost: null
                }
            }
        }
    });
    const text = wrapper.find('h4');
    expect(text.text()).toContain('dffssa')
});

test("to see if delete modal opens on click", async () => {
    const wrapper = shallowMount(BlogCard, {
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
                    editPost: null
                }
            }
        },
        data() {
            return {modalActive: false}
        }
    });
    
    const deleteButton = wrapper.find('#delete');
    await deleteButton.trigger('click');
    const Modal = wrapper.findComponent(deleteModal);
    expect(Modal.exists()).toBe(true);

})

test("to see if edit redirects on click", async () => {
      const $router = {
        push: jest.fn()
      }
    const wrapper = shallowMount(BlogCard, {
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
            $router,
            $store: {
                state: {
                    editPost: null
                }
            },
            
        }
    });
    const editButton = wrapper.find('#edit');
    await editButton.trigger('click');
    expect($router.push).toHaveBeenCalledWith({"name": "EditBlog", "params": {"blogid": 35}});
})

test("to see if view blog opens on click", async () => {
    const $router = {
      push: jest.fn()
    }
  const wrapper = shallowMount(BlogCard, {
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
          $router,
          $store: {
              state: {
                  editPost: null
              }
          },
          
      }
  });
  const viewButton = wrapper.find('.link');
  await viewButton.trigger('click');
  expect($router.push).toHaveBeenCalledWith({"name": "ViewBlog", "params": {"blogID": 35}});
})
