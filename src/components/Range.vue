<template>
    <input
      type="range"
      min="0"
      max="254"
      step="1"
      v-model="range"
      @change="change">
</template>

<script>
export default {
  name: 'Range',
  props: ['value'],
  data() {
    return {
      isSlided: false,
      input: 0
    }
  },
  computed: {
    range: {
      get() {
        return this.isSlided ? this.input : this.value
      },
      set(newValue) {
        this.isSlided = true
        this.input = newValue
      }
    }
  },
  methods: {
    change() {
      this.$emit('range', this.range)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type=range] {
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is requirgba(0,0,0,.25); for Firefox. */
  background: transparent; /* Otherwise white in Chrome */
  margin: 0;
  height: 30px;

  display: block;


}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
}

input[type=range]:focus {
  outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 30px;
  width: 30px;
  border-radius: 15px;
  background: #ffffff;
  cursor: pointer;
}

/* All the same stuff for Firefox */
input[type=range]::-moz-range-thumb {
  height: 30px;
  width: 30px;
  border-radius: 15px;
  background: #ffffff;
  cursor: pointer;
}


input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 30px;
  cursor: pointer;
  background: rgba(0,0,0,.25);
  border-radius: 15px;
}

input[type=range]::-moz-range-track {
  width: 100%;
  height: 30px;
  cursor: pointer;
  background: rgba(0,0,0,.25);
  border-radius: 15px;
}

</style>
