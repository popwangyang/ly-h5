<template>
  <div class="orderContractPdf">
    <pdf-preview :pdfName="name" :pdfUrl="url"></pdf-preview>
  </div>
</template>

<script>
import pdfPreview from "@/components/PdfPreview";
export default {
  name: "orderContractPdf",
  components: {
    pdfPreview
  },
  data() {
    return {
      name: "",
      url:
        "https://github.com/mozilla/pdf.js/blob/master/examples/learning/helloworld.pdf"
    };
  },
  methods: {},
  mounted() {
    this.name = this.$route.query.name;
    // this.url = this.$route.query.url;
  },
  created() {}
};
</script>

<style scoped lang='less'>
.orderContractPdf {
  width: 100%;
  height: 100%;
}
</style>
