<template>
<div class="body">
    <div class="bigcontainer">
        <div class="title">
            <div>
                How would you rate the course:  
            </div>
            <div>
                Title
            </div>
        </div>
        <div class="stars">
            <form id="feedback-form" @submit.prevent=submit()>
                <div>
                    <label for="fullname">Full name: </label>
                    <input type="text" name="fullname" v-model="rating.fullname"/>
                </div>
                <div>
                    <input class="star star-5" id="star-5" type="radio" name="star"/>
                    <label class="star star-5" for="star-5"></label>
                    <input class="star star-4" id="star-4" type="radio" name="star"/>
                    <label class="star star-4" for="star-4"></label>
                    <input class="star star-3" id="star-3" type="radio" name="star"/>
                    <label class="star star-3" for="star-3"></label>
                    <input class="star star-2" id="star-2" type="radio" name="star"/>
                    <label class="star star-2" for="star-2"></label>
                    <input class="star star-1" id="star-1" type="radio" name="star"/>
                    <label class="star star-1" for="star-1"></label>
                </div>
                <div class="stars">
                    <button >Send feedback</button>
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
            
            rating:{
                fullname:'',
                feedback:'',
                stars:5,
            }
        }
        
    },
    methods: {
        submit() {
            
             console.log(this.rating.fullname);
        },
    },

    
}
</script>

<style scoped>
.body {
    display: flex;
    justify-content: center;
    padding-top: 70px;
    width: 100vw;
}
.bigcontainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width:70%;
    height: 700px;
    min-width: 400px;
    background-color: rgba(236, 143, 20, 0.164);
    border-radius: 20px;

}
.title {
    display:flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
}

div.stars {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}

input.star { display: none; }

label.star {
  float: right;
  padding: 5px;
  font-size: 36px;
  color: #444;
  transition: all .2s;
}

input.star:checked ~ label.star:before {
  content: '\f005';
  color: #e59819;
  transition: all .25s;
}

input.star-5:checked ~ label.star:before {
  color: #FE7;
  text-shadow: 0 0 20px #952;
}

input.star-1:checked ~ label.star:before { color: #F62; }

label.star:hover { transform: rotate(-15deg) scale(1.3); }

label.star:before {
  content: '\f006';
  font-family: FontAwesome;
}

</style>