<template>
  <div class="index container">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content">
        <!-- a class of delete so we can style it at the bottom. -->
        <div class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</div>
        <h2 class="indigo-text">{{ smoothie.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ing, index) in smoothie.ingredients" :key="index">
            <span class="chip">{{ ing }}</span>
          </li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab pink">
        <router-link :to="{ name: 'EditSmoothie', params: {smoothie_slug: smoothie.slug } }">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "Index",
  data() {
    return {
      smoothies: [
        // {
        //   title: "Ninja Brew",
        //   slug: "ninja-brew",
        //   ingredients: ["bananas", "coffee", "milk"],
        //   id: "1"
        // },
        // {
        //   title: "Morning Mood",
        //   slug: "morning-mood",
        //   ingredients: ["mango", "lime", "juice"],
        //   id: "2"
        // }
      ]
    };
  },
  // filter allows to cycle thru the array, and filter it to return true or false. false delete it out of the array. true keep it.
  methods: {
    deleteSmoothie(id) {
      //console.log(id);
      // delete doc from firestore
      db.collection("smoothies")
        .doc(id)
        .delete()
        .then(() => {
          this.smoothies = this.smoothies.filter(smoothie => {
            return smoothie.id != id;
          });
        }); // this is a promise because it takes some time to complete. then a callback funciton.
    }
  },
  created() {
    // fetch data from the firestore
    db.collection("smoothies")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          //console.log(doc.data(), doc.id);
          let smoothie = doc.data();
          smoothie.id = doc.id;
          this.smoothies.push(smoothie);
        });
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.index .ingredients {
  margin: 30px auto;
}
.index .ingredients li {
  display: inline-block;
}
.index .delete {
  position: absolute; /* we can position absolute at the top, 4px from the top, and also from the right 4px*/
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
