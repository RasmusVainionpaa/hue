<template>
  <div
    class="light"
    :style="{ 'background-color': color }"

    >
    <div class="light__name">
      <div>{{ light.name }}</div>
      <Toggle
        :value="light.state.on"
        @toggled="toggleLight"></Toggle>
    </div>

    <Range
      v-if="light.state.on"
      :value="light.state.bri"
      @range="lightBrightness">
    </Range>

  </div>
</template>

<script>
import Range from "./Range"
import Toggle from "./Toggle"
import colorConverter from 'cie-rgb-color-converter/ColorConverter';

export default {
  name: 'Light',
  props: ["light"],
  data() {
    return {
      brightness: 0,
    }
  },
  components: {
    Range,
    Toggle
  },
  computed: {
    color: {
      get() {
        let rgb = colorConverter.xyBriToRgb(this.light.state.xy[0], this.light.state.xy[1], this.light.state.bri);
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
      },

      set() {

      }
    }
  },
  mounted() {
    // let rgb = ColorConverter.xyBriToRgb(x ,y , brightness);
    // console.log(this.light);
  },
  methods: {
    toggleLight(value) {
      this.$emit('light-toggle', {
        value: value,
        light: this.$vnode.key
      })
    },
    lightBrightness(value) {
      this.$emit('light-brightness', {
        bri: value,
        light: this.$vnode.key
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.light {
  margin-bottom: 30px;

  background: #29292b;
  transition: 1300ms ease background;
  border-radius: 15px;
}

.light__name {
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 10px 20px
}


</style>
