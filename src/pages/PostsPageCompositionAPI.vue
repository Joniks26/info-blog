<template>
  <div >
    <h1>Посты</h1>
    <my-input
        v-model="searchQuery"
        v-focus
        placeholder="Поиск"
    />
    <div class="app__btns">
      <my-button>Создать пост</my-button>
      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form
      />
    </my-dialog>

    <post-list
        :posts="sortedAndSearchedPost"
        v-if="!isPostsLoading"
    />
    <div v-else>Загрузка...</div>
  </div>
</template>

<script>
import PostForm from "@/comnponents/PostForm";
import PostList from "@/comnponents/PostList";
import MyDialog from "@/comnponents/UI/MyDialog";
import MyButton from "@/comnponents/UI/MyButton";
import MyInput from "@/comnponents/UI/MyInput";
import {usePosts} from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";

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
      sortOptions: [
        {value: 'title', name:'по названию'},
        {value: 'body', name:'по описанию'},
      ]
    }
  },
  setup(props) {
    const {posts, totalPages, isPostsLoading } = usePosts(10)
    const {sortedPosts, selectedSort } = useSortedPosts(posts)
    const {searchQuery, sortedAndSearchedPost } = useSortedAndSearchedPosts(sortedPosts)


    return {
      posts,
      totalPages,
      isPostsLoading,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPost
    }
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