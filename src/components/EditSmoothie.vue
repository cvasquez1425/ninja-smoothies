<template>
  <!--class container from materialize CSS that brings everything into a central column. -->
  <div v-if="smoothie" class="edit-smoothie container">
    <!-- $route Access the Route Object on this component here -->
    <!-- <h2>Edit a smoothie {{ this.$route.params.smoothie_slug }}</h2> -->
    <h2>Edit {{ smoothie.title }} Smoothie</h2>
    <form @submit.prevent="EditSmoothie">
      <div class="field title">
        <label for="title">Smothie Title:</label>
        <input type="text" name="title" v-model="smoothie.title" />
      </div>
      <div v-for="(ing, index) in smoothie.ingredients" :key="index" class="field">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="smoothie.ingredients[index]" />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an Ingredient:</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another" />
        <!-- prevent the default behavior of the tab key to go to the next field. -->
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Update Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "EditSmoothie",
  data() {
    return {
      smoothie: null,
      another: null,
      feedback: null
    };
  },
  methods: {
    EditSmoothie() {
      //console.log(this.smoothie.title, this.smoothie.ingredients);
      if (this.smoothie.title) {
        //console.log(this.title, this.ingredients);
        this.feedback = null;
        // creae a slug
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: "-", //first option is replacement which is anytime there's a space this function slugify will replace with a hyphen.
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true // Regex to remove those characters globally
        });
        //console.log(this.slug); this is an asyncronous task, it takes some time to complete, it will return to us a promise.
        db.collection("smoothies")
          .doc(this.smoothie.id)
          .update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.slug
          })
          .then(() => {
            //redirect to the home page
            this.$router.push({ name: "Index" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "You must enter a smoothie title";
      }
    },
    addIng() {
      if (this.another) {
        this.smoothie.ingredients.push(this.another);
        console.log(this.ingredients);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value to add an ingredient";
      }
    },
    deleteIng(ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(
        ingredient => {
          return ingredient != ing; //true remain in the array, false delete it from the array.
        }
      );
    }
  },
  created() {
    //Give me the documents where the slug are equal to this parm.
    let ref = db
      .collection("smoothies")
      .where("slug", "==", this.$route.params.smoothie_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        //console.log(doc.data());
        this.smoothie = doc.data();
        this.smoothie.id = doc.id;
      });
    });
  }
};
</script>

<style scoped>
.edit-smoothie {
  margin-top: 60px; /* 60px pushing down a little from the Navbar */
  padding: 20px; /* 20px all the way around (i.e, top, bottom, right and left */
  max-width: 500px;
}
.edit-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-smoothie .field {
  margin: 20px auto;
  position: relative;
}
.edit-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
