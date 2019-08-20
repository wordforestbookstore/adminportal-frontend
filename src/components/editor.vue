<template>
  <v-form ref="form" v-model="valid">
    <v-text-field v-model="book.name"
      label="* 书名" required></v-text-field>
    <v-text-field v-model="book.writer"
      label="* 作者" required></v-text-field>

    <v-text-field v-model="book.isbn"
      label="ISBN"></v-text-field>

    <v-text-field v-model="book.publisher"
      label="出版社"></v-text-field>

    <v-menu
      v-model="dateMenu"
      :close-on-content-click="false"
      transition="scale-transition" offset-y
      full-width max-width="290px" min-width="290px">
      <template v-slot:activator="{ on }">
        <v-text-field v-on="on"
          v-model="book.date" label="出版日期"
        ></v-text-field>
      </template>
      <v-date-picker color="red lighten-1" locale="zh-cn"
        v-model="book.date" @input="dateMenu = false"></v-date-picker>
    </v-menu>

    <v-select v-model="book.lang" label="语言" single-line
      :items="langList" item-text="text" item-value="value"
    ></v-select>

    <v-select v-model="book.kind" label="* 分类" single-line
      :items="kindList" item-text="text" item-value="value"
    ></v-select>

    <v-select v-model="book.format" label="规格" single-line
      :items="formatList" item-text="text" item-value="value"
    ></v-select>

    <v-slider label="总页数"
      v-model="book.pages"
      class="align-center py-2"
      max="2000" min="1"
      hide-details>
      <template v-slot:label>
        <span class="pr-4">总页数</span>
      </template>
      <template v-slot:append>
        <v-text-field
          v-model="book.pages"
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
      v-model="book.weight"
      class="align-center py-2"
      max="2000" min="1"
      hide-details>
      <template v-slot:append>
        <v-text-field
          v-model="book.weight"
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
      v-model="book.listprice"
      class="align-center py-2"
      max="1000" min="0"
      hide-details>
      <template v-slot:append>
        <v-text-field
          v-model="book.listprice"
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
      v-model="book.ourprice"
      class="align-center py-2"
      max="1000" min="0"
      hide-details>
      <template v-slot:label>
        <span class="pr-4 mr-4">售价</span>
      </template>
      <template v-slot:append>
        <v-text-field
          v-model="book.ourprice"
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
      v-model="book.stock"
      class="align-center pt-2"
      max="1000" min="0"
      hide-details>
      <template v-slot:label>
        <span class="pr-4">库存量</span>
      </template>
      <template v-slot:append>
        <v-text-field
          v-model="book.stock"
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
      <v-radio label="展示" key="true" value="true"></v-radio>
      <v-radio label="隐藏" key="false" value="false"></v-radio>
    </v-radio-group>

    <v-textarea ref="bookarea" v-model="book.description" label="书籍简介"
      no-resize rows="10">
    </v-textarea>
    <v-btn text class="mb-5" @click="editDescription">使用编辑器打开书籍简介</v-btn>

    <v-file-input
      v-model="book.image"
      accept="image/png, image/jpeg, image/bmp"
      label="封面" 
      placeholder="上传书籍封面"
      prepend-icon="mdi-paperclip">
      <template v-slot:selection="{ text }">
        <v-chip small label color="primary">{{ text }}</v-chip>
      </template>
    </v-file-input>

    <v-btn color="primary" large @click="submitForm">上传</v-btn>
    <v-btn color="error ml-5" large to="/book">取消</v-btn>
  </v-form>
</template>

<script>
import { LangList, KindList, FormatList } from '../common/config'
import Stackedit from 'stackedit-js'

export default {
  name: 'bookInfoEditor',
  data: () => ({
    valid: true,
    rules: {
      
    },
    dateMenu: false,
    langList: LangList, kindList: KindList, formatList: FormatList,
    book: {
      name: '', writer: '',
      publisher: '', date: '',
      lang: 'cn', kind: '',
      isbn: '', format: 'paperback',
      pages: 100,
      weight: 100, listprice: 1,
      ourprice: 1, stock: 0,
      active: 'true', 
      description: '',
      image: null
    }
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
    submitForm() {

      this.$router.push('/book/bookList');

    }
  },
}
</script>

<style>

</style>