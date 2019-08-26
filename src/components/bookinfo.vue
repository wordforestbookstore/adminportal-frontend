<template>
  <v-container>
    <v-row>
      <v-breadcrumbs large :items="items" divider="/"></v-breadcrumbs>
    </v-row>
    <v-row>
      <v-col cols="3">
        <div style="height:100%;max-height:200px;width:100%;background-color:red;"></div>
        <!-- <v-img src=""></v-img> -->
      </v-col>
      <v-col cols="9">
        <h1 class="display-1">{{ info.title }}</h1>
        <v-row>
          <v-col>作者: {{info.author}}</v-col>
          <v-col>分类: {{info.category}}</v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>

    </v-row>
  </v-container>
</template>

<script>
import { getBookInfo } from '../common/bookservice'
import { hasOwn } from '../util'

export default {
  name: 'BookInfo',
  data: () => ({
    info: {}
  }),
  computed: {
    items() {
      return [
        {
          text: '返回',
          disabled: false,
          exact: true,
          to: '/book/bookList'
        },
        {
          text: '编辑',
          disabled: false,
          to: `updateBook?id=${this.$route.query.id}`,
        }
      ];
    },
  },
  methods: {
    async init(id) {
      let data = await getBookInfo(id);
      if (hasOwn(data, 'status') && data.status === 'error') {
        return ;
      }
      this.info = data;
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.init(to.query.id);
    next();
  },
  created() {
    this.init(this.$route.query.id);
  }
}
</script>

<style>

</style>