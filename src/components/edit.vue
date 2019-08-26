<template>
  <v-container>
    <v-row class="title mb-2">编辑书籍信息</v-row>
    <v-row><v-divider></v-divider></v-row>
    <book-info-editor></book-info-editor>
  </v-container>
</template>

<script>
import BookInfoEditor from './editor'

export default {
  name: '',
  components: {
    BookInfoEditor
  },
  data: () => ({

  }),
}
</script>

<style>

</style>