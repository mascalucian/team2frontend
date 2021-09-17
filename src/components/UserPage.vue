<template>
    <div class="banner background-tint">
    </div>
    <div class="alignment">
        <div class="main-container">
            <div class="user-data">
                <img src="../assets/logo.png" class="avatar">
            </div>
            <div class="user-recommends">

            </div>
            <div></div>
        </div>           
    </div>    

</template>

<script lang="ts">
// import axios from "axios";
export default {
  data() {
    return {
    };
  },
  methods: {
  },
  created() {
  },
};
</script>

<style scoped>
.avatar{
    width: 200px;
    height: 200px;
    background-color:black;
    border-radius: 50%;
    margin-top: -100px;
}
.user-data{
    width: 40%;
    background: rgb(112,54,103);
background: linear-gradient(34deg, rgba(112,54,103,1) 0%, rgba(185,63,111,1) 100%);
    display:flex;
    flex-direction: column;
    align-items: center;
    box-shadow: -10px 0px 10px 1px black;

}
.user-recommends{
    width: 60%;
    background-color: white;
    box-shadow: -2px 0px 10px 1px black;
}
.main-container{
    display:flex;
    width: 100%;
    height: 100%;
}
.alignment{
    width: 100vw;
    background-color: pink;
    min-height: 60%;
}
.background-tint {
  background-color: rgba(200,100,0,.5); 
  background-blend-mode: multiply;
}
.banner {
    width: 100vw;
    background-image: url("https://thumbs.dreamstime.com/b/vector-education-pattern-educattion-seamless-background-vector-education-pattern-educattion-seamless-background-vector-113988685.jpg");
    min-height: 40%;
    max-height: 40%;
}


</style>
