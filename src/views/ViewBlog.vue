<template>
  <div class="post-view" v-if="this.currentBlog">
    <div class="container quillWrapper">
      <h2>{{ this.currentBlog[0].blogTitle }}</h2>
      <h4>
        Posted on:
        {{
          new Date(this.currentBlog[0].blogDate).toLocaleString("en-us", {
            dateStyle: "long",
          })
        }}
      </h4>
      <h4>Author: {{ this.currentBlog[0].blogAuthor }}</h4>
      <img
        class="blog-image"
        :src="`https://multi-user-blog-backend.herokuapp.com${this.currentBlog[0].blogCoverPhoto}`"
        alt="blogcover"
      />
      <div
        class="post-content ql-editor"
        v-html="this.currentBlog[0].blogHTML"
      ></div>
    </div>
  </div>
</template>


<script>
export default {
  name: "ViewBlog",
  data() {
    return {
      currentBlog: null,
    };
  },
  async mounted() {
    this.currentBlog = this.$store.state.blogPosts.filter((post) => {
      return post.blogID === this.$route.params.blogID;
    });
    console.log(this.currentBlog)
  },
};
</script>

<style lang="scss">
.post-view {
  margin-top: 80px;
  h2 {
    font-weight: 500;
  }
  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }
  .blog-image {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }
}
</style>