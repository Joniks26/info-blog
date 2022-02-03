<template>
  <form @submit.prevent>
    <h4>Добавить пост</h4>
    <input
        v-model="post.title"
        class="input"
        type="text"
        placeholder="Название">
    <input
        v-model="post.body"
        class="input"
        type="text"
        placeholder="Описание">
    <Button
        style="align-self: flex-end; margin-top: 15px"
        @click="createPost">Добавить
    </Button>
  </form>
</template>

<script>
import Button from "@/comnponents/UI/Button";
export default {
  components: {Button},
  data(){
    return{
      post:{
        title:'',
        body:'',
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now();
      this.$emit('create', this.post)
      this.post = {
        title:'',
        body:'',
      };
    },
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;

}
.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}

</style>