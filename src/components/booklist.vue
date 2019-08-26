<template>
  <v-container>
    <v-card flat>
      <v-card-title>
        <v-col cols="2">
          <v-select label="每页元素" v-model="itemsPerPage_" :items="rangList" hide-details>
          </v-select>
        </v-col>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="搜索"
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        locale="zh-Hans"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        @page-count="pageCount = $event"
        :headers="headers"
        :items="booklist"
        :search="search"
        v-model="selected"
        item-key="title"
        show-select hide-default-footer>
        <template v-slot:item.title="{ item }">
          <router-link :to="getUrl(item.id)">{{ item.title }}</router-link>
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
          <v-container>
            <v-row>
              <v-col cols="3" align-self="center" class="caption">{{ getRange() }}</v-col>
              <v-col cols="6"><v-pagination v-model="page" :length="pageCount"></v-pagination></v-col>
            </v-row>
          </v-container>
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
import { KindMap } from '../common/config'
import { hasOwn } from '../util'

export default {
  name: 'bookList',
  data: () => ({
    rangList: [ 5, 10, 15, 20, '全部' ],
    page: 1, pageCount: 0, itemsPerPage: 10, itemsPerPage_: 10,
    search: '',
    selected: [],
    headers: [
      {
        text: '书名',
        value: 'title',
        sortable: false,
      },
      { text: '作者', value: 'author', sortable: false, },
      { 
        text: '分类', 
        value: 'category', 
        sortable: false, 
        width: '9%'
      },
      {
        text: '展示价',
        value: 'listPrice',
        width: '8%', align: 'center',
        sortable: false,
      },
      {
        text: '售价',
        value: 'ourPrice',
        width: '8%', align: 'center',
        sortable: false,
      },
      { 
        text: '展示?', 
        value: 'active', 
        align: 'center',
        sortable: false,
        width: '10%'
      },
      { 
        text: '操作', 
        value: 'action', 
        align: 'center',
        sortable: false,
        width: '13%'
      },
    ],
    booklist: []
  }),
  watch: {
    itemsPerPage_(newv, oldv) {
      this.page = 1;
      if (newv === '全部') {
        this.itemsPerPage = this.booklist.length + 1;
      } else {
        this.itemsPerPage = newv;
      }
    }
  },
  methods: {
    getRange() {
      let l = (this.page - 1) * this.itemsPerPage + 1;
      let r = this.page * this.itemsPerPage;
      return `共 ${this.booklist.length} 个元素中第 ${l} 个到第 ${Math.min(r, this.booklist.length)} 个`;
    },
    getUrl(id) {
      return `/book/bookInfo?id=${id}`;
    },
    cnKind(val) {
      if (!val) return '';
      if (hasOwn(KindMap, val)) return KindMap[val];
      return '';
    }
  },
  created() {
    getBookList(1, 10000000)
      .then(function(data) {
        if (hasOwn(data, 'status')) {
          return ;
        }
        for (let item of data) {
          item.category = this.cnKind(item.category);
        }
        this.booklist = data;
      }.bind(this));
  }
}
</script>

<style>

</style>