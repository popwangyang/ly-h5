<template>
  <div class="pdf-preview">
    <div
      ref="pageContainer"
      class="pdf-page"
      :class="{'every-page-line': showPageLine}"
      :style="{height: '100%', width: width +'px' }"
      v-for="page in pages"
      :key="page"
    >
      <canvas v-if="renderList.includes(page)"></canvas>
      <van-loading type="spinner" :vertical="true" v-else>加载中...</van-loading>
    </div>
    <van-loading
      type="spinner"
      :vertical="true"
      v-if="loading"
      style="height: 100%;margin-top: 80%;"
    >加载中...</van-loading>
  </div>
</template>

<script>
import { Loading } from "vant";
import pdfJS from "pdfjs-dist";
import PdfJSWorker from "pdfjs-dist/build/pdf.worker.min";
pdfJS.GlobalWorkerOptions.workerSrc = PdfJSWorker;
export default {
  name: 'PdfPreview',
  props: {
    manualRender: {
      type: Boolean,
      default: false
    },
    renderPages: {
      // 前后各预渲染多少页
      type: Number,
      default: 5
    },
    showPageLine: {
      type: Boolean,
      default: true
    }
  },
  components: {
    [Loading.name]: Loading
  },
  data() {
    return {
      loading: true,
      pdfDoc: null,
      box: null,
      width: 0,
      pages: 0,
      currentPage: 0,
      pageHeight: 0,
      renderList: [], // 渲染的页码数组
      timerIndex: 0
    };
  },
  mounted() {
	const metaArr = document.getElementsByTagName('head')[0].getElementsByTagName('meta')
	let lastMeta = metaArr[2]
	lastMeta.setAttribute('content',  'width=device-width,minimum-scale=1.0')
    this.box = document.getElementsByClassName("pdf-preview")[0];
    this.width = this.box.offsetWidth;
    this.url = this.$route.query.url;
    document.title = this.$route.query.name;
    this.getPDFFile();
    if (!this.manualRender) {
      this.box.addEventListener("scroll", this.documentScroll);
    }
  },
  beforeDestroy() {
    this.box.removeEventListener("scroll", this.documentScroll);
    this.timerIndex && clearTimeout(this.timerIndex);
	const metaArr = document.getElementsByTagName('head')[0].getElementsByTagName('meta')
	let lastMeta = metaArr[2]
	lastMeta.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1')
  },
  methods: {
    getPDFFile() {
      /**
       * getDocument():用于异步获取PDf文档，发送多个Ajax请求以块的形式下载文档。
       * 它返回一个Promise，该Promise的成功回调传递一个对象，该对象包含PDF文档的信息，
       * 该回调中的代码将在完成PDf文档获取时执行
       */
      if (!this.url) return;
      pdfJS
        .getDocument(this.url)
        .then(pdf => {
          this.pdfDoc = pdf;
          this.pages = this.pdfDoc.numPages;
          this.$nextTick(() => {
            this.pages && this.scrollToPage(1);
          });
        })
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    scrollToPage(pageNo) {
      /**
       * 滚动时触发
       */
      if (this.currentPage === pageNo) return;
      this.currentPage = pageNo;
      let list = [];
      for (
        let page = pageNo - this.renderPages;
        page <= pageNo + this.renderPages;
        page++
      ) {
        list.push(page);
      }
      for (let idx = list.length; idx >= 0; idx--) {
        if (list[idx] > this.pages || list[idx] < 1) list.splice(idx, 1);
      }
      this.$nextTick(() => {
        this.renderList = list;
        this.renderList.forEach(page => {
          this.renderPage(page);
        });
      });
    },
    renderPage(pageNo) {
      /**
       * getPage():用于获取PDF文档中的各个页面
       * getViewport():针对提供的展示比例，返回PDf文档的页面尺寸
       * render():渲染PDF
       */
      this.pdfDoc.getPage(pageNo).then(page => {
        // console.log(page)
        let containerNode = this.$refs.pageContainer[pageNo - 1];
        if (!containerNode) return;
        let canvas = containerNode.querySelector("canvas");
        if (!canvas || canvas.__rendered) return;
        let ctx = canvas.getContext("2d");
        let dpr = window.devicePixelRatio || 1;
        let bsr =
          ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio ||
          1;
        let ratio = dpr / bsr;
        let viewport = page.getViewport(
          screen.availWidth / page.getViewport(1).width
        );
        canvas.width = viewport.width * ratio;
        canvas.height = viewport.height * ratio;
        canvas.style.width = "100%";
        this.pageHeight = viewport.height;
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        let renderCtx = {
          canvasContext: ctx,
          viewport
        };
        page.render(renderCtx);
        canvas.__rendered = true;
      });
    },
    documentScroll() {
      this.checkRender();
    },
    checkRender() {
      this.timerIndex && clearTimeout(this.timerIndex);
      this.timerIndex = setTimeout(this.renderCurrent, 100);
    },
    renderCurrent() {
      this.$nextTick(() => {
        if (this.pages <= 0) return;
        if (!this.pageHeight) return;
        if (!this.$refs.pageContainer[0]) return;
        let rect = this.$refs.pageContainer[0].getBoundingClientRect();
        if (rect.top >= 0) {
          this.scrollToPage(1);
        } else {
          let page = Math.floor(-rect.top / this.pageHeight) + 1;
          if (page > this.pages) page = this.pages;
          this.scrollToPage(page);
        }
      });
    }
  }
};
</script>

<style scoped>
.pdf-preview {
  background: #1f1e1ec7;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.pdf-page {
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.every-page-line {
  border-bottom: 1px solid #dfdfdf;
}
</style>
