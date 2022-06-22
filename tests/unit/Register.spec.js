import {shallowMount, createLocalVue} from '@vue/test-utils';
import Vuex from 'vuex';
import Register from "../../src/views/Register.vue";

import axios from 'axios';
const localVue = createLocalVue()

localVue.use(Vuex);
jest.mock('axios')
describe('Register.vue', () => {
    let actions
    let store
    beforeEach(() => {

        actions = {
            getCurrentUser: jest.fn()
        }
        store = new Vuex.Store({actions})
    })
    test('sets the input values', async () => {
        const wrapper = shallowMount(Register)
        const input1 = wrapper.find('#firstName')
        await input1.setValue('shravya')
        const input2 = wrapper.find('#lastName')
        await input2.setValue('p')
        const input3 = wrapper.find('#userName')
        await input3.setValue('shraaz')
        const input4 = wrapper.find('#email')
        await input4.setValue('shravyamaradithaya@gmail.com')
        const input5 = wrapper.find('#password')
        await input5.setValue('Hrishikesh3*')
        expect(input1.element.value).toBe('shravya')
        expect(input2.element.value).toBe('p')
        expect(input3.element.value).toBe('shraaz')
        expect(input4.element.value).toBe('shravyamaradithaya@gmail.com')
        expect(input5.element.value).toBe('Hrishikesh3*')
    })

    test('sets the input values', async () => {
        const $router = {
            push: jest.fn()
        }
        const wrapper = shallowMount(Register, {
            store,
            localVue,
            mocks: {
                $router
            },
            data() {
                return {
                    firstName: "tom",
                    lastName: "holland",
                    username: "tomy",
                    email: "tom.holland@gmail.com",
                    password: "tomholland",
                    error: null,
                    errorMsg: "",
                    showPassword: false
                };
            }
        })


        const response = {
            data: {
                "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTY1NTg3NzE5NSwiZXhwIjoxNjU4NDY5MTk1fQ.agvTcCKC4fB8_44jXQHcOIGZL5VQPnCoaYJpBUEM-sg",
                "user": {
                    "id": 12,
                    "username": "tomy",
                    "email": "tom.holland@gmail.com",
                    "provider": "local",
                    "confirmed": true,
                    "blocked": false,
                    "createdAt": "2022-06-22T05:53:15.077Z",
                    "updatedAt": "2022-06-22T05:53:15.077Z",
                    "firstName": "tom",
                    "lastName": "holland"
                }
            }
        };
        axios.post.mockImplementationOnce(() => Promise.resolve(response));
        await wrapper.find('button').trigger('click')
        expect(axios.post).toHaveBeenCalledTimes(1)
    })
})
