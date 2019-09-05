<template>
  <v-form ref="form" v-model="valid">
    <v-text-field v-model="book.title" :rules="rules.title"
      label="* 书名" required></v-text-field>
    <v-text-field v-model="book.author" :rules="rules.author"
      label="* 作者" required></v-text-field>

    <v-text-field v-model="book.isbn" type="number" :rules="rules.isbn"
      label="* ISBN"></v-text-field>

    <v-text-field v-model="book.publisher"
      label="出版社"></v-text-field>

    <v-menu
      v-model="dateMenu"
      :close-on-content-click="false"
      transition="scale-transition" offset-y
      full-width max-width="290px" min-width="290px">
      <template v-slot:activator="{ on }">
        <v-text-field v-on="on" readonly
          v-model="book.publicationDate" label="出版日期"
        ></v-text-field>
      </template>
      <v-date-picker color="red lighten-1" locale="zh-cn"
        v-model="book.publicationDate" @input="dateMenu = false"></v-date-picker>
    </v-menu>

    <v-select v-model="book.language" label="语言" single-line
      :items="langList" item-text="text" item-value="value"
    ></v-select>

    <v-select v-model="book.category" label="* 分类" single-line
      :rules="rules.category"
      :items="kindList" item-text="text" item-value="value"
    ></v-select>

    <v-select v-model="book.format" label="规格" single-line
      :items="formatList" item-text="text" item-value="value"
    ></v-select>

    <v-slider label="总页数"
      v-model="book.numberOfPages"
      class="align-center py-2"
      max="3000" min="1"
      hide-details>
      <template v-slot:label>
        <span class="pr-4">总页数</span>
      </template>
      <template v-slot:append>
        <v-text-field
          v-model="book.numberOfPages"
          class="mt-0 pt-0"
          hide-details
          single-line
          type="number"
          suffix="页"
          style="width: 100px"
        ></v-text-field>
      </template>
    </v-slider>

    <v-slider label="邮寄重量"
      v-model="book.shippingWeight"
      class="align-center py-2"
      max="15000" min="1"
      hide-details>
      <template v-slot:append>
        <v-text-field
          v-model="book.shippingWeight"
          class="mt-0 pt-0"
          hide-details
          single-line
          type="number"
          suffix="克"
          style="width: 100px"
        ></v-text-field>
      </template>
    </v-slider>

    <v-slider label="展示价格"
      v-model="book.listPrice"
      class="align-center py-2"
      max="2000" min="0" step="0.01"
      hide-details>
      <template v-slot:append>
        <v-text-field
          v-model="book.listPrice"
          class="mt-0 pt-0"
          hide-details
          single-line
          type="number"
          suffix="元"
          style="width: 100px"
        ></v-text-field>
      </template>
    </v-slider>

    <v-slider label="售价"
      v-model="book.ourPrice"
      class="align-center py-2"
      max="2000" min="0" step="0.01"
      hide-details>
      <template v-slot:label>
        <span class="pr-4 mr-4">售价</span>
      </template>
      <template v-slot:append>
        <v-text-field
          v-model="book.ourPrice"
          class="mt-0 pt-0"
          hide-details
          single-line
          type="number"
          suffix="元"
          style="width: 100px"
        ></v-text-field>
      </template>
    </v-slider>

    <v-slider label="库存量"
      v-model="book.inStockNumber"
      class="align-center pt-2"
      max="10000" min="0"
      hide-details>
      <template v-slot:label>
        <span class="pr-4">库存量</span>
      </template>
      <template v-slot:append>
        <v-text-field
          v-model="book.inStockNumber"
          class="mt-0 pt-0"
          hide-details
          single-line
          suffix="本"
          type="number"
          style="width: 100px"
        ></v-text-field>
      </template>
    </v-slider>

    <v-radio-group v-model="book.active" row label="书籍状态">
      <v-radio label="展示" key="true" :value="true"></v-radio>
      <v-radio label="隐藏" key="false" :value="false"></v-radio>
    </v-radio-group>

    <v-textarea ref="bookarea" v-model="book.description" label="书籍简介"
      no-resize rows="10">
    </v-textarea>
    <v-btn text class="mb-5" @click="editDescription">使用编辑器打开书籍简介</v-btn>

    <v-file-input
      v-model="image"
      accept="image/png" :rules="rules.image"
      label="封面" 
      placeholder="上传书籍封面">
      <template v-slot:selection="{ text }">
        <v-chip small label color="primary">{{ text }}</v-chip>
      </template>
    </v-file-input>

    <v-btn color="primary" large @click="submitForm">上传</v-btn>
    <v-btn color="error ml-5" large to="/book">取消</v-btn>

    <v-snackbar top v-model="snackbar.isShow" :timeout="5000" color="error">
      {{ snackbar.text }}
      <v-btn color="white" text @click="snackbar.isShow = false">Close</v-btn>
    </v-snackbar>
  </v-form>
</template>

<script>
import { LangList, KindList, FormatList } from '../common/config'
import { addBook, editBook, getBookInfo } from '../common/bookservice'
import { BookRules } from '../common/rules'
import { hasOwn } from '../util'
import Stackedit from 'stackedit-js'

export default {
  name: 'bookInfoEditor',
  data: () => ({
    updateID: null,
    snackbar: {
      isShow: false, text: ''
    },
    valid: true,
    rules: {
      title: BookRules.title,
      author: BookRules.author,
      isbn: BookRules.isbn,
      category: BookRules.category,
      image: BookRules.image
    },
    dateMenu: false,
    langList: LangList, kindList: KindList, formatList: FormatList,
    book: {
      title: '', author: '',
      publisher: '', publicationDate: '',
      language: 'cn', category: '',
      isbn: '', format: 'paperback',
      numberOfPages: 100,
      shippingWeight: 100, listPrice: 1,
      ourPrice: 1, inStockNumber: 0,
      active: true, 
      description: '',
    }, 
    image: null
  }),
  methods: {
    editDescription() {
      const stackedit = new Stackedit();
  
      stackedit.openFile({
        name: '',
        content: {
          text: this.book.description
        }
      });
  
      stackedit.on('fileChange', (file) => {
        this.book.description = file.content.text;
      });
    },
    async submitForm() {
      let res = null;
      if (this.updateID !== null) {
        res = await editBook(this.updateID, this.book, this.image);
      } else {
        res = await addBook(this.book, this.image);
      }
      if (hasOwn(res, 'status') && res.status === 'error') {
        this.snackbar.text = res.message;
        this.snackbar.isShow = true;
      } else {
        this.$router.push('/book/bookList');
      }
    },
    async init(id) {
      this.updateID = id;
      let data = await getBookInfo(id);
      if (hasOwn(data, 'status') && data.status === 'error') {
        return ;
      }
      this.book = data;
    }
  },
  created() {
    if (hasOwn(this.$route.query, 'id')) {
      this.init(this.$route.query.id);
    } else {
      this.updateID = null;
    }
  }
}
</script>

<style>

</style>