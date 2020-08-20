<template>
  <div class="home">
      <FormatUTC/>
  </div>
</template>

<script>
import FormatUTC from '@/components/FormatUTC.vue'
export default {
  name: 'Home',
  components: {
    FormatUTC,
  },
  data(){
    return{
    }
  },
  methods:{
  }
}
</script>
