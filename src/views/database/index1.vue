<template>
  <div style="width: 70%;margin-left: 30px;margin-top: 30px;">
    <!-- <vue-json-editor v-model="resultInfo"
                     :data="resultInfo"
                     :showBtns="true"
                     :mode="'text'"
                     @json-change="onJsonChange"
                     @json-save="onJsonSave"
                     @has-error="onError" />
    <br> -->
    <json-viewer :value="jsonData"></json-viewer>
    <el-button type="primary"
               @click="checkJson">确定</el-button>
  </div>
</template>
 
<script lang="ts">
// 导入模块
import vueJsonEditor from "vue-json-editor";

export default {
  // 注册组件
  // components: { vueJsonEditor },
  data() {
    return {
      hasJsonFlag: true, // json是否验证通过
      // json数据
      resultInfo: {
        employees: [
          {
            firstName: "Bill",
            lastName: "Gates",
          },
          {
            firstName: "George",
            lastName: "Bush",
          },
          {
            firstName: "Thomas",
            lastName: "Carter",
          },
        ],
      },

      jsonData: {
        total: 25,
        limit: 10,
        skip: 0,
        links: {
          previous: undefined,
          next: function () {
            //
          },
        },
        data: [
          {
            id: "5968fcad629fa84ab65a5247",
            firstname: "Ada",
            lastname: "Lovelace",
            awards: null,
            known: ["mathematics", "computing"],
            position: {
              lat: 44.563836,
              lng: 6.495139,
            },
            description: `Augusta Ada King, Countess of Lovelace (née Byron; 10 December 1815 – 27 November 1852) was an English mathematician and writer,
            chiefly known for her work on Charles Babbage's proposed mechanical general-purpose computer,
            the Analytical Engine. She was the first to recognise that the machine had applications beyond pure calculation,
            and published the first algorithm intended to be carried out by such a machine.
            As a result, she is sometimes regarded as the first to recognise the full potential of a "computing machine" and the first computer programmer.`,
            bornAt: "1815-12-10T00:00:00.000Z",
            diedAt: "1852-11-27T00:00:00.000Z",
          },
          {
            id: "5968fcad629fa84ab65a5246",
            firstname: "Grace",
            lastname: "Hopper",
            awards: [
              "Defense Distinguished Service Medal",
              "Legion of Merit",
              "Meritorious Service Medal",
              "American Campaign Medal",
              "World War II Victory Medal",
              "National Defense Service Medal",
              "Armed Forces Reserve Medal",
              "Naval Reserve Medal",
              "Presidential Medal of Freedom",
            ],
            known: null,
            position: {
              lat: 43.614624,
              lng: 3.879995,
            },
            description: `Grace Brewster Murray Hopper (née Murray; December 9, 1906 – January 1, 1992)
            was an American computer scientist and United States Navy rear admiral.
            One of the first programmers of the Harvard Mark I computer,
            she was a pioneer of computer programming who invented one of the first compiler related tools.
            She popularized the idea of machine-independent programming languages, which led to the development of COBOL,
            an early high-level programming language still in use today.`,
            bornAt: "1815-12-10T00:00:00.000Z",
            diedAt: "1852-11-27T00:00:00.000Z",
          },
        ],
      },
    };
  },
  // mounted: function () {},
  methods: {
    onJsonChange(value) {
      // console.log('更改value:', value);
      // 实时保存
      this.onJsonSave(value);
    },
    onJsonSave(value) {
      // console.log('保存value:', value);
      // this.resultInfo = value;
      this.hasJsonFlag = true;
      console.log("result:", this.resultInfo);
      console.log(value);
    },
    onError(value) {
      // console.log("json错误了value:", value);
      this.hasJsonFlag = false;
    },
    // 检查json
    checkJson() {
      if (this.hasJsonFlag == false) {
        // console.log("json验证失败")
        // this.$message.error("json验证失败")
        alert("json验证失败");
        return false;
      } else {
        // console.log("json验证成功")
        // this.$message.success("json验证成功")
        alert("json验证成功");
        return true;
      }
    },
  },
};
</script>
 
<style>
</style>