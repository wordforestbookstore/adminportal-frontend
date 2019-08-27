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
        :loading="loading" loading-text="加载中..."
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
          <v-icon v-if="item.active === true">done</v-icon>
          <v-icon v-else>clear</v-icon>
        </template>

        <template v-slot:item.action="{ item }">
          <v-btn icon class="mr-2" @click="goEdit(item.id)">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn icon @click.stop="goDelete(item)">
            <v-icon>delete</v-icon>
          </v-btn>
        </template>

        <template v-slot:footer>
          <v-container>
            <v-row>
              <v-col cols="3" align-self="center" class="caption">{{ getRange() }}</v-col>
              <v-col cols="6"><v-pagination v-model="page" :length="pageCount"></v-pagination></v-col>
              <v-col cols="3" class="text-end">
                <v-btn color="error" @click="selectDelete">删除选中项</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </template>

        <template v-slot:no-results>
          <span>没有搜索到匹配的结果</span>
        </template>

        <template v-slot:no-data>
          <span>数据库中没有书籍信息</span>
        </template>

      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" width="300">
      <v-card>
        <v-card-title class="title" primary-title>确认删除？</v-card-title>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="error" text @click="confirmDelete">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { getBookList, deleteBook } from '../common/bookservice'
import { KindMap } from '../common/config'
import { hasOwn } from '../util'
import { Promise } from 'q';

export default {
  name: 'bookList',
  data: () => ({
    loading: false,
    dialog: false, deleteids: [],
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
        width: '7%'
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
    itemsPerPage_(newv) {
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
      if (this.booklist.length == 0) l = 0;
      return `共 ${this.booklist.length} 个元素中第 ${l} 个到第 ${Math.min(r, this.booklist.length)} 个`;
    },
    getUrl(id) {
      return `/book/bookInfo?id=${id}`;
    },
    goEdit(id) {
      this.$router.push(`/book/updateBook?id=${id}`)
    },
    goDelete(item) {
      this.deleteids = [item];
      this.dialog = true;
    },
    selectDelete() {
      this.deleteids = this.selected;
      this.dialog = true;
    },
    confirmDelete() {
      this.dialog = false;
      let arr = []
      for (let item of this.deleteids) {
        arr.push(deleteBook(item.id));
      }
      Promise.all(arr).then(function() {
        for (let item of this.deleteids) {
          const index = this.booklist.indexOf(item)
          this.booklist.splice(index, 1);
        }
        this.deleteids = [];
      }.bind(this));
    },
    cnKind(val) {
      if (!val) return '';
      if (hasOwn(KindMap, val)) return KindMap[val];
      return '';
    }
  },
  created() {
    this.loading = true;
    getBookList(1, 10000000)
      .then(function(data) {
        if (hasOwn(data, 'status') && data.status === 'error') {
          return ;
        }
        for (let item of data) {
          item.category = this.cnKind(item.category);
        }
        this.booklist = data;
        this.loading = false;
      }.bind(this));
  }
}
</script>

<style>

</style>