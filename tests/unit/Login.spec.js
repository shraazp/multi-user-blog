import {mount} from '@vue/test-utils';
import Login from "../../src/views/Login.vue";
import "whatwg-fetch";

test('sets the email and password value', async () => {
    const wrapper = mount(Login)
    const input1 = wrapper.find('#email')
    await input1.setValue('shravyamaradithya@gmail.com')
    const input2 = wrapper.find('#password')
    await input2.setValue('Hrishikesh3*')
    expect(input1.element.value).toBe('shravyamaradithya@gmail.com')
    expect(input2.element.value).toBe('Hrishikesh3*')
})

test('test the submit button', async () => {
    const wrapper = mount(Login)
    const mockFn = jest.fn();
    window.fetch = mockFn;
    const input1 = wrapper.find('#email')
    await input1.setValue('shravyamaradithaya@gmail.com')
    const input2 = wrapper.find('#password')
    await input2.setValue('Shravya3*')
    await wrapper.find('button').trigger('click')
    const firstCall = mockFn.mock.calls[0];
    const body = JSON.parse(firstCall[1].body);
    expect(body).toEqual({identifier: "shravyamaradithaya@gmail.com", password: "Shravya3*"})
})
