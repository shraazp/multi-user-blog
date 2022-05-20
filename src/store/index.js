import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleBlogCards:[
      {
        blogTitle:"Blog card #1",blogCoverPhoto:"stock-1",blogDate:"May 1,2021"
      },
      {
        blogTitle:"Blog card #2",blogCoverPhoto:"stock-2",blogDate:"May 1,2021"
      },
      {
        blogTitle:"Blog card #3",blogCoverPhoto:"stock-3",blogDate:"May 1,2021"
      },
      {
        blogTitle:"Blog card #4",blogCoverPhoto:"stock-4",blogDate:"May 1,2021"
      },
    ],
    editPost:null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
  },
  mutations: {
    toggleEditPost(state,payload){
      state.editPost=payload;
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;
      console.log(state.profileId);
    },
    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") + state.profileLastName.match(/(\b\S)?/g).join("");
    },
  },
  actions: {
    async getCurrentUser({ commit }, user) {
      const dataBase = await db.collection("users").doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit("setProfileInfo", dbResults);
      commit("setProfileInitials");
      const token = await user.getIdTokenResult();
      const admin = await token.claims.admin;
      commit("setProfileAdmin", admin);
    },
  },
  modules: {
  }
})
