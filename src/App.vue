<template>
  <div class="app">
    <post-form
        @create="createPost"
    />
    <post-list
        :posts="posts"
    />
  </div>
</template>

<script>
import PostForm from "@/comnponents/PostForm";
import PostList from "@/comnponents/PostList";

export default {
  components: {
    PostList, PostForm
  },
  data() {
    return {
      posts: [
        {id: 1, title: 'JS 1', body: 'Post info 1'},
        {id: 2, title: 'JS 2', body: 'Post info 2'},
        {id: 3, title: 'JS 3', body: 'Post info 3'},
      ],
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
    }
  },
}

</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

</style>