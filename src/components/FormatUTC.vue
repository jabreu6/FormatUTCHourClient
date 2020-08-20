<template>
  <div class="">
    <div class="sufee-login d-flex align-content-center flex-wrap">
      <div class="container" style="background-color: ">
        <div class="login-content" style="background-color: ">
          <div class="login-form">
            <h4 class="mb-3 text-center">Conversión Formato UTC</h4>
            <form>
              <div class="form-row" style="margin-left:">
                <div class="form-group col-md-3">
                  <label for="inputState">Hora</label>
                  <select id="inputState" class="form-control" v-model="valueHour">
                    <option v-for="item in hours" :key="item" :value="item">
                      {{ item }}
                    </option>
                  </select>
                </div>
                <div class="form-group col-md-3">
                  <label for="inputState">Minutos</label>
                  <select id="inputState" class="form-control" v-model="valueMinute">
                    <option v-for="item in minutesSeconds" :key="item" :value="item">
                        {{ item }}
                    </option>
                  </select>
                </div>
                <div class="form-group col-md-3">
                  <label for="inputState">Segundos</label>
                  <select id="inputState" class="form-control" v-model="valueSecond">
                    <option v-for="item in minutesSeconds" :key="item" :value="item">
                        {{ item }}
                    </option>
                  </select>
                </div>
                <div class="form-group col-md-3">
                  <label for="inputState">Zona Horaria</label>
                  <select id="inputState" class="form-control" v-model="valueZone">
                    <option v-for="item in timeZones" :key="item" :value="item">
                        {{ item }}
                    </option>
                  </select>
                </div>
              </div>
              <button @click="getData()" type="button" class="btn btn-outline-success">Convertir</button>
            </form>
            <h4 v-if="showResult" class="mt-2 mb-3 text-left">Time: {{result.time}}</h4>
            <h4 v-if="showResult" class="mb-3 text-left">Timezone: {{result.timezone}}</h4>
          </div>
        </div>
      </div>
    </div> 
    
    <div class="vld-parent"><!-- PANTALLA DE ESPERA -->
        <loading :active.sync="isLoading" :can-cancel="false"  :is-full-page="fullPage"></loading> 
    </div><!-- FIN PANTALLA DE ESPERA -->
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import {rt} from '../../routes';
export default {
  name: "Login",
  components:{
    Loading
  },
  data(){
    return{
      hours: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
      minutesSeconds: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59],
      timeZones: ['-12:00','-11:00','-10:30','-10:00','-09:30','-09:00','-08:30','-08:00','-07:00','-06:00','-05:00','-04:30','-04:00','-03:30','-03:00','-02:30','-02:00','-01:00','00:00','+00:30','+01:00','+01:30','+02:00','+02:30','+03:00','+03:30','+04:00','+04:30','+05:00','+05:30','+06:00','+06:30','+07:00','+07:30','+08:00','+08:30','+09:00','+09:30','+10:00','+10:30','+11:00','+11:30','+12:00','+13:00','+14:00'],
      valueHour: 0,
      valueMinute: 0,
      valueSecond: 0,
      valueZone: 0,
      result: {
        time: '',
        timezone: ''
      },
      showResult: false,
      isLoading: false,
      fullPage: true,
    }
  },
  methods:{
    getData: async function(){
      let route = rt.getFormatHour,
          meth = "POST",
          body = {
            dato1: this.valueHour +':'+ this.valueMinute +':'+ this.valueSecond,
            dato2: this.valueZone
          }
      this.isLoading = true
      let res = await this.fetch(route, body, meth);
      this.isLoading = false
      if (res.statusCode === 200) {
          console.log(res.response)
          this.result.time = res.response.time
          this.result.timezone = res.response.timezone
          this.showResult = true
      }
      else{
        alert("Ocurrió un error en el servidor: "+res.statusCode)
      }
    },
    // FUNCION GENERICA DE LLAMADA DE SERVICIO BACKEND
    fetch : function(route, body, meth){
      let conf = {
        headers: {
            "Content-Type": "application/json",
        },
        method: meth,
        body: JSON.stringify(body)
      }
      if(meth === "GET"){
        delete conf["body"]
      }
      return (new Promise((resolve) => {
        fetch(route, conf).then(function (response) {
        if (response.status !== 200) {
          resolve({
            error: "error",
            statusCode: response.status
          });
          return;
        }
        response.json().then(function (data) {
          resolve(data);
        });
        })
        .catch(function (err) {
          console.log("Fetch Error :-S", err);
        });
      }))
    }, // FIN FUNCION GENERICA DE LLAMADA DE SERVICIO BACKEND
  }
};
</script>