<template>
  <div >
    <h1>Посты</h1>
    <my-input
        v-model="searchQuery"
        v-focus
        placeholder="Поиск"
    />
    <div class="app__btns">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select
          v-model="selectedSort"
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
  </div>
</template>

<script>
import PostForm from "@/comnponents/PostForm";
import PostList from "@/comnponents/PostList";
import MyDialog from "@/comnponents/UI/MyDialog";
import MyButton from "@/comnponents/UI/MyButton";
import axios from "axios";
import MyInput from "@/comnponents/UI/MyInput";

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
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        {value: 'title', name:'по названию'},
        {value: 'body', name:'по описанию'},
      ]
    }
  },
  methods: {
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
    // changePage(pageNumber) {
    //   this.page = pageNumber
    // },
    async fetchPosts () {
      try{
        this.isPostsLoading = true
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data;
      } catch (e) {
        alert('Ошибка')
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadMorePosts () {
      try{
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert('Ошибка')
      }
    }
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPost() {
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    sortedAndSearchedPost() {
      return this.sortedPost.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
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