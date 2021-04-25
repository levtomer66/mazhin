<template>
  <div id="app">
    <div class="books" v-for="book in books" :key="book.id">
      <input v-model.lazy="book.id" type="text" placeholder="Book ID" />
      <input v-model.lazy="book.year" type="text" placeholder="Year" />
      <input v-model.lazy="book.titleno" type="text" placeholder="Title no." />
    </div>
    <button @click="addBook" >+</button>
    <button class="submit" @click="checkBooks" >Submit</button>
  </div>
</template>
<style scoped>
input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.submit {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit:hover {
  background-color: #45a049;
}

div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}
</style>
<script>


export default {
  components: { },
  data() {
    return {
      books: [
        {
          id: '',
          year: '',
          titleno: ''
        }

      ],
    }
  },
  methods: {
    addBook() {
      this.books.push({id: '', year: '', titleno: ''})
    },
    checkBooks() {
      console.log(this.books);
    }
    
  },
  async fetch() {

  },
  fetchOnServer: false
};
</script>

<style>
</style>
