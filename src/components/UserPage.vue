<template>
    <div class="banner background-tint">
    </div>
    <div class="alignment">
        <div class="main-container">
            <div class="user-data">
                <img src="../assets/logo.png" class="avatar">
                <h1>Lucian Masca</h1>
            </div>
            <div class="user-recommends">
                <h1 class="recommended">Recommended courses:</h1>
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
    display: flex;
    align-items: center;
    flex-direction: column;
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
  background-color: rgba(200, 0, 27, 0.5); 
  background-blend-mode: multiply;
}
.banner {
    width: 100vw;
    background-image: url("https://thumbs.dreamstime.com/b/vector-education-pattern-educattion-seamless-background-vector-education-pattern-educattion-seamless-background-vector-113988685.jpg");
    min-height: 40%;
    max-height: 40%;
}
h1 { 
    color: #ffffff; font-size: 48px; font-family: 'Signika', sans-serif; padding-bottom: 10px; text-align: center; 
}
.recommended {
    color:black;
}
@media screen and (max-width:946px) {
    .user-data {
        width: 100%;
        min-height: 40%;
    }
    .user-recommends {
        width: 100%;
        justify-content: center;
        min-height: 60%;
                
    }
    .main-container {
        flex-direction: column;
    }
    .banner {
        min-height: 20%;
        max-height: 20%;
    }
    .alignment {
        min-height: 80%;
    }
}

</style>
