<template>
  <v-container>
    <v-card flat>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="搜索"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        locale="zh-Hans"
        :headers="headers"
        :items="booklist"
        :search="search"
        v-model="selected"
        item-key="title"
        show-select hide-default-footer>
        <template v-slot:item.title="{ item }">
          <router-link :to="getUrl(item.title)">{{ item.title }}</router-link>
        </template>

        <template v-slot:item.active="{ item }">
          <v-icon v-if="item.active === 'true'">done</v-icon>
          <v-icon v-else>clear</v-icon>
        </template>

        <template v-slot:item.action="{ item }">
          <v-icon class="mr-2" @click="(item) => {}">edit</v-icon>
          <v-icon @click="(item) => {}">delete</v-icon>
        </template>

        <template v-slot:footer>
          
        </template>

        <template v-slot:no-results>
          <span>没有搜索到匹配的结果</span>
        </template>

      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { getBookList } from '../common/bookservice'

export default {
  name: 'bookList',
  data: () => ({
    search: '',
    selected: [],
    headers: [
      {
        text: '书名',
        value: 'title',
        sortable: false,
        // width: '150px'
      },
      { text: '作者', value: 'author', sortable: false, },
      { text: '分类', value: 'category', sortable: false, },
      {
        text: '展示价格',
        value: 'p1',
        width: '100px'
      },
      {
        text: '售价',
        value: 'p2',
        width: '100px'
      },
      { 
        text: '是否展示', 
        value: 'active', 
        align: 'center',
        sortable: false,
      },
      { 
        text: '操作', 
        value: 'action', 
        align: 'center',
        sortable: false
      },
    ],
    booklist: []
  }),
  methods: {
    getUrl(title) {
      return `/book/bookInfo?id=${title}`;
    }
  },
  mounted() {
    this.booklist = getBookList();
  }
}
</script>

<style>

</style>