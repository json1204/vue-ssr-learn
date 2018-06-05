import Vue from 'vue'
// var str0 = ddd// 在vue中的模板中使用会报错
new Vue({
  el: '#root',
  // template: `
  // <div>
  //   {{isActive ? 'active' : 'not active' }}
  //   {{ arr.join('-') }}
  //   {{ Date.now() }}
  //   {{ html }}
  //   <p v-html='html' :id="bb"  @click='meClick'></p>
  // </div>
  // `,
  template: `
  <div :class = "{ active: !isActive}">
    {{bb}}
    <p :class="[isActive?'active':'']">{{...arr}}</p>
    <p :class="[isActive?'active':'']">{{getJoinedArr(arr)}}</p>
    <p :class="[{ active:isActive },{bb},{classNames}]">{{html}}</p>
    <p :class="[isActive?'active':'']"
        :style="[styles,mestyles]"
    >{{...arr}}</p>
  </div>
  `,
  data: {
    isActive: true,
    arr: [1, 2, 3, 4, 5],
    html: '<span>222</span>',
    bb: 'my',
    styles: {
      color: 'red',
      appearance: 'none',
      // margin: '0',
      marginBefore: 'none'
    },
    mestyles: {
      fontSize: '40px'
    }
    // classNames:
  },
  computed: {
    classNames () {
      // return dd
    }
    // arr (arr) {
    //   return arr.join(' ')
    // }
  },
  methods: {
    // meClick() {
    //   alert('click')// eslint-disable-line
    // }
    getJoinedArr (arr) {
      return arr.join(' ')
    }
  }
})
