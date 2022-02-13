<template>
  <div class="navbar">
    <div @click="$router.push('/')">Info Blog</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Посты</my-button>
      <my-button style="margin-left: 20px;" @click="$router.push('/social-credits')">社會貸款</my-button>
      <my-button style="margin-left: 20px;" @click="$router.push('/store')">Store</my-button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar__btns{
  margin-left: auto;
}
</style>