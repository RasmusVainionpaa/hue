<template>
  <div
    class="light"
    :style="{ 'background-color': color }"

    >
    <div class="light__name">
      <div :style="{'color': accessibleColor }">{{ light.name }}</div>
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
import {contrast} from '../color'

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
    colorInRgb: {
      get() {
        const MINIMUM_BRIGHTNESS = 5
        const bri = this.light.state.bri > MINIMUM_BRIGHTNESS ?
          this.light.state.bri : MINIMUM_BRIGHTNESS;

        return colorConverter.xyBriToRgb(
          this.light.state.xy[0],
          this.light.state.xy[1],
          bri,
        );
      }
    },
    color: {
      get() {
        return `rgb(
          ${this.colorInRgb.r},
          ${this.colorInRgb.g},
          ${this.colorInRgb.b})`
      },
    },
    accessibleColor() {
      const CONTRAST_LIMIT = 3
      const rgbToHex = ({r, g, b}) => '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')

      return contrast(
        rgbToHex(this.colorInRgb),
        '#ffffff'
      ) >= CONTRAST_LIMIT ? "#ffffff" : "#000000"
    }
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
