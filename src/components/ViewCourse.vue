<template>
      <div id="wrapper">
      
        <div class="headerflex">
            <div class="leftside">
            <div class="titlediv">
                <a href="/" class="companyname">
                Principal Leryon Services SRL
                </a>
            </div>
            <div class="btndiv">
                <a
                href="https://principalgroup.udemy.com/organization/home/category/top-picks/"
                class="btn"
                >
                Explore
                </a>
            </div>
            </div>
            <div class="rightside">
            <div class="btndiv">
                <a
                href="https://principalgroup.udemy.com/organization/home/category/top-picks/"
                class="btn"
                >
                Teach
                </a>
            </div>
            <div class="btndiv">
                <a
                href="https://principalgroup.udemy.com/organization/home/category/top-picks/"
                class="btn"
                >
                My learning
                </a>
            </div>
            </div>
        
        </div>
        <div class="course">
            <div class="course-box">
                <h1> &nbsp;&nbsp; Aici bagam componenta de Result</h1>
            </div>
            <div class="course-reviews">
                <Review />
                <Review />
                <Review />
                <!-- <div class="review">
                    Review 1
                </div>
                  <div class="review">
                    Review 1
                </div>
                  <div class="review">
                    Review 1
                </div> -->
            </div>
            <div class="course-recommendations">
                Aici puneam mai multe block-uri cu recomandari daca nu aflam ca trebuie facut altcumva *lacrime*
            </div>
        </div>
    </div>

</template>

<script>
//import Result from "../ui/Result.vue"
import Review from "../ui/Review.vue"

export default {
    components:{
     Review
    }
}
</script>

<style scoped lang="scss">
#wrapper {
  width: 100%;
  flex-grow: 1;
  position: relative;
}
#results-wrapper {
  padding: 4.8rem 2.4rem;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.headerflex {
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 80px;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #d1d7dc;
  box-shadow: 0px 1px 5px #888888;
  a {
    font-size: 1.15em !important;
  }
}

#error-message {
  text-align: center;
  color: black;
  font-size: 2rem;
}

.searchflex {
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.leftside {
  display: flex;
  align-items: center;
  left: 0;
}
.rightside {
  display: flex;
  align-items: center;
  right: 0;
}
.titlediv {
  width: 180px;
  padding: 10px;
}
.companyname {
  text-decoration: none;
  color: black;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02rem;
  font-size: 16px;
}
.btndiv {
  padding-left: 12px;
}
.btn {
  text-decoration: none;
  color: black;
  font-size: 14px;
}
.btn:hover {
  color: rgb(150, 7, 150);
}

.course{
    display: flex;
    flex-direction: column;
    align-items: center;
    &-box{
        width: 80%;
        height: 17rem;
        margin: 2em;
        background-color: black;
        color: white;
        border-radius: 25px;
    }
    &-reviews{
        width: 80%;
    }
    &-recommendations{
        width: auto;
        height: auto;
        padding:1em;
        background-color: green;
        color: white;
    }
}
</style>