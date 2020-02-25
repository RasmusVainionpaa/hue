<template>
  <div id="app">

    <div class="onboarding" v-if="username == ''">
      <h1>Let's get started</h1>
      <p>Press the big-ass button on the Hue box.</p>
    </div>

    <div v-else class="lightGroup">
      <Light
        v-for="(light, key) in lights"
        :light="light"
        @light-toggle="lightToggle"
        @light-color="lightColor"
        @light-brightness="lightBrightness"
        :key="key"></Light>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Light from "./components/Light";
import jsHue from "jshue";

export default {
  name: "App",
  data() {
    return {
      lights: {},
      username: '',
      hue: null,
      bridges: []
    };
  },
  components: {
    Light
  },
  mounted() {
    this.connect();
    // this.updateLights();
  },

  methods: {
    connect() {
      axios
        .get("https://discovery.meethue.com/")
        .then(response => (this.bridges = response.data))
        .then(() => {
          var hue = jsHue();
          var bridge = hue.bridge(this.bridges[0].internalipaddress);

          if (localStorage.getItem("hueUser")) {
            this.username = localStorage.getItem("hueUser");
            this.hue = bridge.user(this.username);
            this.getLights();

          } else {
            var handle = setInterval(() => {
              bridge.createUser("bestHueAppEverMade#browser").then(data => {
                if (data[0].error) {
                  console.log(data[0].error.description);
                }

                this.username = data[0].success.username;
                clearInterval(handle);
                // instantiate user object with username
                this.hue = bridge.user(this.username);
                localStorage.setItem("hueUser", this.username);
                this.getLights();
              });
            }, 500);
          }
        });
    },

    getLights() {
      this.hue.getLights()
              .then((lights) => {
                this.lights = lights
              })
    },
    updateLights() {
      setInterval(() => {
        this.getLights()
      }, 1000)
    },
    lightToggle(data) {
      this.hue.setLightState(data.light, { on: data.value }).then(data => {
        console.log(data)
      });

    },
    lightColor(data) {
      this.hue.setLightState(data.light, { on: data.value }).then(data => {
        console.log(data)
      });
    },
    lightBrightness(data) {
      console.log(data)
      this.hue.setLightState(data.light, { bri: parseInt(data.bri) }).then(data => {
        console.log(data)
      });
    }
  }
};
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin: 0;
  background: #1b1b1d;
  color: white;
}

#app {
  padding-top: 30px;
}

.onboarding,
.lightGroup {
  width: 600px;
  margin-left: auto;
  margin-right: auto;
}
</style>
