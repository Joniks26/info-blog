<template>
  <div>
    <h1>Посты</h1>
    <my-input
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        v-focus
        placeholder="Поиск"
    />
    <div class="app__btns">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
          :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form
          @create="createPost"
      />
    </my-dialog>

    <post-list
        :posts="sortedAndSearchedPost"
        @remove="removePost"
        v-if="!isPostsLoading"
    />
    <div v-else>Загрузка...</div>
    <div v-intersection="loadMorePosts" class="observer">  </div>
        <div class="page__wrapper">
          <div
              class="page"
              :class="{'current-page': page === pageNumber}"
              v-for="pageNumber in totalPages"
              :key="pageNumber"
              @click="changePage(pageNumber)"
          >
            {{pageNumber}}
          </div>
        </div>
  </div>
</template>

<script>
import PostForm from "@/comnponents/PostForm";
import PostList from "@/comnponents/PostList";
import MyDialog from "@/comnponents/UI/MyDialog";
import MyButton from "@/comnponents/UI/MyButton";
import MyInput from "@/comnponents/UI/MyInput";
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  components: {
    MyInput,
    MyButton,
    MyDialog,
    PostList,
    PostForm
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',


    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts'
    }),

    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true;
    },

  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions

    }),
    ...mapGetters({
      sortedPost: 'post/sortedPost',
      sortedAndSearchedPost: 'post/sortedAndSearchedPost'
    })
  },

  watch: {
    // page() {
    //   this.fetchPosts()
    // }
  }
}

</script>

<style>

.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
.page__wrapper {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
.page {
  border: 1px solid teal;
  padding: 10px;
}
.current-page {
  border: 2px solid teal;
  color: teal;
}

.observer {

}

</style>