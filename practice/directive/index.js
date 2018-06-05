import Vue from 'vue'
new Vue({
  el: '#root',
  template: `

  <div>
    {{ text }}
    <div v-text="html" v-show="!active"></div>
    <div v-html='html' v-if='!active'></div>
    <div  v-else-if='text===0'>v-else-if</div>
    <div  v-else>else content</div>
    <div v-html='html'></div>

    <ul>
      <li v-for="(item,index) in arr" :key="item">{{item}}index:{{ index }}</li>
    </ul>

    <ul>
    <li v-for="(val,key,index) in obj">{{val}}key:{{ key }}index:{{ index }}</li>
  </ul>
    <div>
      <input type="checkbox" v-model="active"/>
    </div>
    <div>
    单选框
    <input type="radio" value="one" v-model="picked"/>
    <input type="radio" value="two" v-model="picked"/>
  </div>
  <input type="text"  v-model.number="metext"/>
    <div>
    多选框
    <input type="checkbox" :value="1" v-model="arr"/>
    <input type="checkbox" :value="2" v-model="arr"/>
    <input type="checkbox" :value="3" v-model="arr"/>
  </div>
  </div>

  `,
  data: {
    metext: 0,
    picked: '',
    arr: [1, 3, 4, 5, 6],
    obj: {
      a: '123',
      b: '33',
      c: '444'
    },
    text: 0,
    active: false,
    html: '<spa>this is html </span>'
  }
})
