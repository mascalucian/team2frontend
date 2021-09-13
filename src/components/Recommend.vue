<template>
<div class="body">
    <div class="bigcontainer">
        <div class="title">
            <div>
                How would you rate the course:  
            </div>
            <div id="title">
                Title 
                <!-- aici trebuie modificat sa ia titlul pe care dai click -->
            </div>
        </div>
        <div class="stars">
            <form id="feedback-form" @submit.prevent=submit() class="formflex">
                <div class="inputbox">
                    <label for="fullname">Full name: </label>
                    <input type="text" name="fullname" v-model="recomandation.authorname"/>
                </div>
                <div>
                    <input class="star star-5" id="star-5" type="radio" name="star" value=5 v-model="picked"/>
                    <label class="star star-5" for="star-5"></label>
                    <input class="star star-4" id="star-4" type="radio" name="star" value=4 v-model="picked"/>
                    <label class="star star-4" for="star-4"></label>
                    <input class="star star-3" id="star-3" type="radio" name="star" value=3 v-model="picked"/>
                    <label class="star star-3" for="star-3"></label>
                    <input class="star star-2" id="star-2" type="radio" name="star" value=2 v-model="picked"/>
                    <label class="star star-2" for="star-2"></label>
                    <input class="star star-1" id="star-1" type="radio" name="star" value=1 v-model="picked"/>
                    <label class="star star-1" for="star-1"></label>
                </div>
                <div class="inputbox">
                    <label for="feedback">Details: </label>
                    <input type="text" name="feedback" v-model="recomandation.feedback"/>
                </div>

                <div class="stars">
                    <button class="submitbtn" >Send feedback</button>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {      
        return{
            picked:1,
            recomandation:{
                authorname:'',
                feedback:'',
                rating:5,
                courseId:255, //aici trebuie modificat sa importe cursul pe care dai click din results
            }
        }
        
    },
    methods: {
        submit() {
            this.recomandation.rating=this.picked;
            console.log(this.recomandation);
            // this.rating trebuie trimis catre backend
        },
    },

    
}
</script>

<style scoped>
input[type=text] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}
.formflex {
    display:flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.body {
    display: flex;
    justify-content: center;
    padding-top: 70px;
    width: 100vw;
    color:white;
}
.bigcontainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width:70%;
    height: 700px;
    min-width: 400px;
    background-color: #5624d0;
    border-radius: 20px;

}
.title {
    display:flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
}
.submitbtn{
    padding: 20px;
    background-color: #e59819; 
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    
}
.inputbox {
    min-width: 300px;
    width:40vw;
    margin-top: 10px;
    margin-bottom: 10px;
}

div.stars {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

input.star { display: none; }

label.star {
  float: right;
  padding: 5px;
  font-size: 36px;
  color: white;
  transition: all .2s;
}

input.star:checked ~ label.star:before {
  content: '\f005';
  color: #e59819;
  transition: all .25s;
}

input.star-5:checked ~ label.star:before {
  color: #e59819;
  text-shadow: 0 0 20px #952;
}

input.star-1:checked ~ label.star:before { color: #e59819; }

label.star:hover { transform: rotate(-15deg) scale(1.3); }

label.star:before {
  content: '\f006';
  font-family: FontAwesome;
}

</style>