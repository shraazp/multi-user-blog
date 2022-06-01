import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        blogPosts: [],
        postLoaded: null,
        editPost: null,
        user: null,
        blogHTML: "Write your blog title here...",
        blogTitle: "",
        blogPhotoName: "",
        blogAuthor: "",
        blogEmail: "",
        blogID: "",
        blogPhotoFileURL: null,
        blogPhotoPreview: null,
        profileAdmin: null,
        profileEmail: null,
        profileFirstName: null,
        profileLastName: null,
        profileUsername: null,
        profileId: null,
        profileInitials: null
    },
    getters: {
        blogPostsFeed(state) {
            return state.blogPosts.slice(0, 2);
        },
        blogPostsCards(state) {
            return state.blogPosts.slice(2, 6);
        }
    },
    mutations: {
        newBlogPost(state, payload) {
            state.blogHTML = payload;
        },
        updateBlogTitle(state, payload) {
            state.blogTitle = payload;
        },
        fileNameChange(state, payload) {
            state.blogPhotoName = payload;
        },
        createFileURL(state, payload) {
            state.blogPhotoFileURL = payload;
        },
        openPhotoPreview(state) {
            console.log('namaste')
            state.blogPhotoPreview = !state.blogPhotoPreview;
        },
        toggleEditPost(state, payload) {
            state.editPost = payload;
        },
        setBlogState(state, payload) {
            state.blogTitle = payload.blogTitle;
            state.blogHTML = payload.blogHTML;
            state.blogPhotoFileURL = payload.blogCoverPhoto;
            state.blogPhotoName = payload.blogCoverPhotoName;
        },
        filterBlogPost(state, payload) {
            state.blogPosts = state.blogPosts.filter((post) => post.blogID !== payload);
        },
        updateUser(state, payload) {
            state.user = payload;
        },
        setProfileInfo(state, doc) {
            state.profileId = doc.id;
            state.profileEmail = doc.email;
            state.profileFirstName = doc.firstName;
            state.profileLastName = doc.lastName;
            state.profileUsername = doc.username;
        },
        setProfileInitials(state) {
            state.profileInitials = state.profileFirstName.match(/(\b\S)?/g).join("") + state.profileLastName.match(/(\b\S)?/g).join("");
        },
        changeFirstName(state, payload) {
            state.profileFirstName = payload;
        },
        changeLastName(state, payload) {
            state.profileLastName = payload;
        },
        changeUsername(state, payload) {
            state.profileUsername = payload;
        }

    },
    actions: {
        async getPost({state}) {
            const qs = require('qs');
            const query = qs.stringify({
                populate: '*',
            }, {encodeValuesOnly: true});
            const dbResults = await(await axios.get(`https://multi-user-blog-backend.herokuapp.com/api/blogs?${query}`)).data.data;
            dbResults.forEach((doc) => {
                if (!state.blogPosts.some((post) => post.blogID === doc.id)) {
                    const data = {
                        blogID: doc.id,
                        blogHTML: doc.attributes.blogHTML,
                        blogCoverPhoto: doc.attributes.blogCoverPhoto.data.attributes.url,
                        blogTitle: doc.attributes.blogTitle,
                        blogDate: doc.attributes.date,
                        blogCoverPhotoName: doc.attributes.blogCoverPhotoName,
                        blogAuthor: doc.attributes.authorName,
                        blogEmail: doc.attributes.author
                    };
                    state.blogPosts.push(data);
                }
            });
            state.postLoaded = true;
        },
        async updatePost(
            {
                commit,
                dispatch
            },
            payload
        ) {
            await dispatch("getPost");
            commit("filterBlogPost", payload);
            
        },
        async deletePost({
            commit
        }, payload) {
            const token = window.localStorage.getItem('jwt');
            const {data} = await axios.delete(`https://multi-user-blog-backend.herokuapp.com/api/blogs/${payload}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(data);
            commit("filterBlogPost", payload);
        },
        async getCurrentUser({commit}) {
            const token = window.localStorage.getItem('jwt')
            const {data} = await axios.get(' https://multi-user-blog-backend.herokuapp.com/api/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            commit("setProfileInfo", data);
            commit("setProfileInitials");
            commit("updateUser", data);
        },
        async updateUserSettings(
            {commit, state}
        ) {
            const token = window.localStorage.getItem('jwt')
            let formData = new FormData();
            formData.append('username', state.profileUsername);
            formData.append('email', state.profileEmail);
            formData.append('firstName', state.profileFirstName);
            formData.append('lastName', state.profileLastName);
            try {
                await axios.put(`https://multi-user-blog-backend.herokuapp.com/api/users/${
                    state.profileId
                }`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                commit("setProfileInitials");
            } catch (error) {
                console.log(error);
            }
        }
    },
    modules: {}
})
