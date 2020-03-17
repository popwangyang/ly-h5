import store from '@/store/index'
import {
  mapStates
} from 'vuex'


export const cacheMixins = {
  computed: {
    pageScroll() {
      let name = this.$route.name;
      return store.state.app.scrollTops[name];
    }
  },
  methods: {
    recordScrollPosition(e) {
			console.log(e);
      this.$store.commit("SET_SCROLLTOP", {
        name: this.$route.name,
        scrollTop: e.target.scrollTop
      }); //实时存入到vuex中
    }
  },
  activated() {
    this.$refs.scroll.scrollTop = this.pageScroll;
    this.$refs.scroll.addEventListener("scroll", this.recordScrollPosition);
  },
  deactivated() {
    this.$refs.scroll.removeEventListener("scroll", this.recordScrollPosition);
  },
  beforeRouteEnter(to, from, next) {
    let cacheTos = store.state.app.keepAliveList;
    store.commit('SET_SCROLLNAME', to.name)
    if (cacheTos.indexOf(to.name) == -1) {
      cacheTos.push(to.name);
    }
    store.commit('SET_KEEPALIVE', cacheTos)
    next();
  },

  beforeRouteLeave(to, from, next) {
    let cacheTos = store.state.app.keepAliveList;
    if (from.meta.cacheTos && from.meta.cacheTos.indexOf(to.name) == -1) {
      cacheTos.splice(cacheTos.indexOf(from.name), 1);
      this.$store.commit('SET_KEEPALIVE', cacheTos)
    }

    next();
  }
}

import cellImage from '@/components/cellForm/cellImage'
import accoutTag from '@/components/tags/accoutInfoTag'
import bankData from '@/config/bankData'
export const accountMixins = {
  props: {
    data: {
      type: Object
    }
  },
  components: {
    cellImage,
    accoutTag,
  },
  mounted() {
    Object.keys(this.formData).map(item => {
      if (!/license_accessory|photo/.test(item)) {
        this.formData[item] = this.data[item]
      }
    })
    this.formData.business_license_accessory = [this.data.business_license_accessory]
    this.formData.id_photos = [this.data.id_front_photo, this.data.id_reverse_photo]
    this.formData.bank = bankData[this.data.bank]
  }
}
