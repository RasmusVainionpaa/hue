<template>
  <div>
    <input  
      type="checkbox" 
      :checked="checked" />
    <label @click="change">Toggle</label>
  </div>
</template>

<script>
export default {
  name: 'Toggle',
  props: ["value"],
  data() {
    return {
      hasPressed: false,
      input: false,
    }
  },
  computed: {
    checked: {
      get() {
        return this.hasPressed ? this.input : this.value
      },
      set(newValue) {
        this.hasPressed = true
        this.input = newValue
      }
    }
  },
  methods: {
    change() {
      this.checked = !this.checked
      this.$emit('toggled', this.checked)
    }
  }
}
</script>

<style scoped>
input[type=checkbox]{
	height: 0;
	width: 0;
	visibility: hidden;
  display: none;
}

label {
	cursor: pointer;
	text-indent: -9999px;
	width: 60px;
	height: 36px;
	background: rgba(0,0,0,.25);
	display: block;
	border-radius: 100px;
	position: relative;
}

label:after {
	content: '';
	position: absolute;
	top: 3px;
	left: 3px;
	width: 30px;
	height: 30px;
	background: #fff;
	border-radius: 90px;
	transition: 0.3s;
}


input:checked + label:after {
	left: calc(100% - 3px);
	transform: translateX(-100%);
}

label:active:after {
	width: 45px;
}

body {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
}
</style>
