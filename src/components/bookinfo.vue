<template>
  <v-container class="myInfo">
    <v-row>
      <v-breadcrumbs large :items="items" divider="/"></v-breadcrumbs>
    </v-row>
    <v-card :loading="loading">
      <v-card-title>{{ info.title }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="9">
            <v-row>
              <v-col><div class="table-key font-weight-bold">作者</div> {{ info.author }}</v-col>
              <v-col><div class="font-weight-bold">规格</div> {{ info.format | formatF }}</v-col>
            </v-row>
            <v-row>
              <v-col><div class="table-key font-weight-bold">出版社</div> {{ info.publisher }}</v-col>
              <v-col><div class="font-weight-bold">ISBN</div> {{ info.isbn }}</v-col>
            </v-row>
            <v-row>
              <v-col><div class="font-weight-bold">出版日期</div> {{ info.publicationDate }}</v-col>
              <v-col><div class="font-weight-bold">邮寄重量</div> {{ info.shippingWeight }} 克</v-col>
            </v-row>
            <v-row>
              <v-col><div class="font-weight-bold">语言</div> {{ info.language | lang }}</v-col>
              <v-col><div class="font-weight-bold">展示价格</div> {{ info.listPrice }} 元</v-col>
            </v-row>
            <v-row>
              <v-col><div class="font-weight-bold">分类</div> {{ info.category | kind }}</v-col>
              <v-col><div class="font-weight-bold">售价</div> {{ info.ourPrice }} 元</v-col>
            </v-row>
            <v-row>
              <v-col><div class="font-weight-bold">总页数</div> {{ info.numberOfPages }} 页</v-col>
              <v-col><div class="font-weight-bold">库存量</div> {{ info.inStockNumber }} 本</v-col>
            </v-row>
          </v-col>
          <v-col cols="3">

          </v-col>
        </v-row>
        <v-row>
          <v-col class="font-weight-bold">书籍简介</v-col>
        </v-row>
        <v-row>
          <v-col>
            <vue-markdown class="markdown-body font-weight-regular black--text" :source="info.description"></vue-markdown>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import { getBookInfo } from '../common/bookservice'
import { KindMap } from '../common/config'
import { hasOwn } from '../util'

export default {
  name: 'BookInfo',
  data: () => ({
    info: {}, loading: false
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
      this.loading = true;
      let data = await getBookInfo(id);
      if (hasOwn(data, 'status') && data.status === 'error') {
        return ;
      }
      this.info = data;
      this.loading = false;
    }
  },
  filters: {
    kind(val) {
      if (hasOwn(KindMap, val)) return KindMap[val];
      return '';
    },
    lang(val) {
      if (val === 'en' || val === 'english') return '英语';
      if (val === 'cn' || val === 'chinese') return '中文';
      return '';
    },
    formatF(val) {
      if (val === 'paperback') return '软装';
      if (val === 'hardback') return '精装';
      return '';
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.init(to.query.id);
    next();
  },
  created() {
    this.init(this.$route.query.id);
  },
  components: {
    VueMarkdown
  }
}
</script>

<style>
@import '~github-markdown-css';

#myInfo .table-key {
  display: inline-block;
  width: 5em;
}
</style>