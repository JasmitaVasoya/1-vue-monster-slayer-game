<template>
  <h2>Monster Slayer</h2>

  <h1>{{ player }}</h1>
  <div class="allPlayers">
    <div class="singlePlayer">
      <p>Player 1:</p>
      <div class="animated-progress">
        <span :style="{ backgroundColor: activeColor1, width: divWidth1 + '%' }"
          >{{ divWidth1 }}%</span
        >
      </div>
    </div>

    <div class="singlePlayer">
      <p>Player 2:</p>
      <div class="animated-progress">
        <span :style="{ backgroundColor: activeColor2, width: divWidth2 + '%' }"
          >{{ divWidth2 }}%</span
        >
      </div>
    </div>

    <div class="singlePlayer">
      <p>Monster Player :</p>
      <div class="animated-progress">
        <span :style="{ backgroundColor: activeColor3, width: divWidth3 + '%' }"
          >{{ divWidth3 }}%</span
        >
      </div>
    </div>
  </div>
  <button @click="attack">Attack</button>
  <button @click="specialAttack" :disabled="isSpecialAttackDisable">
    Special attack
  </button>
  <button @click="heal" :disabled="isHealDisable">heal</button>
  <button @click="surrender" :disabled="isSurrenderDisable">surrender</button>

  <ul>
    <li
      :style="{ color: item.color }"
      :key="i"
      v-for="(item, i) in todoEntries"
    >
      {{ item.text }}
    </li>
  </ul>
</template>

<script setup>
import { ref, watch, computed } from "vue";

const activeColor1 = ref("green");
const activeColor2 = ref("green");
const activeColor3 = ref("green");
const divWidth1 = ref(100);
const divWidth2 = ref(100);
const divWidth3 = ref(100);
const count = ref(1);
const isSurrenderDisable = ref(true);
const isHealDisable = ref(true);
const attack1 = ref(0);
const attack2 = ref(0);
const specialAttack1 = ref(0);
const specialAttack2 = ref(0);
const isSpecialAttackDisable = ref(true);
const todoEntries = ref([]);
const textColor = ref("");

const surrender = () => {
  todoEntries.value.unshift({
    text: `${count.value}  surrender himself!!`,
    color: "black",
  });

  divWidth1.value = 100;
  divWidth2.value = 100;
  divWidth3.value = 100;
  count.value = 1;
  isSurrenderDisable.value = true;
  isHealDisable.value = true;
  attack1.value = 0;
  attack2.value = 0;
  specialAttack1.value = 0;
  specialAttack2.value = 0;
  isSpecialAttackDisable.value = true;
  setTimeout(() => {
    todoEntries.value = [];
  }, 2000);
};

watch(
  () => divWidth1.value,
  (v) => {
    if (v >= 30) {
      activeColor1.value = "green";
    } else {
      activeColor1.value = "red";
      if (v < 1) {
        surrender();
      }
    }
  }
);

watch(
  () => divWidth2.value,
  (v) => {
    if (v >= 30) activeColor2.value = "green";
    else {
      activeColor2.value = "red";
      if (v < 1) {
        surrender();
      }
    }
  }
);

watch(
  () => divWidth3.value,
  (v) => {
    if (v >= 30) {
      activeColor3.value = "green";
    } else {
      activeColor3.value = "red";
      if (v < 1) {
        surrender();
      }
    }
  }
);

const specialAttack = () => {
  textColor.value = "blue";
  if (count.value === 1) {
    divWidth2.value =
      divWidth2.value -
      generateRandomIntegerInRange(0, 20, "special attack", "p2");
    divWidth3.value =
      divWidth3.value -
      generateRandomIntegerInRange(0, 20, "special attack", "p3");
    specialAttack1.value = 0;
  } else if (count.value === 2) {
    divWidth1.value =
      divWidth1.value -
      generateRandomIntegerInRange(0, 20, "special attack", "p1");
    divWidth3.value =
      divWidth3.value -
      generateRandomIntegerInRange(0, 20, "special attack", "p3");
    specialAttack2.value = 0;
  }
  isSpecialAttackDisable.value = true;
  count.value++;
};

const generateRandomIntegerInRange = (min, max, action, player) => {
  const percentage = Math.floor(Math.random() * (max - min + 1)) + min;
  todoEntries.value.unshift({
    text: `${count.value}  ${action}  ${player}  ,  ${percentage} %`,
    color: textColor.value,
  });
  return percentage;
};

const player = computed(() => {
  let text = "";
  if (count.value === 1) text = "player 1";
  else if (count.value === 2) text = "player 2";
  else if (count.value === 3) text = "player 3";
  return text;
});

const heal = () => {
  textColor.value = "green";
  if (count.value === 1) {
    divWidth1.value =
      divWidth1.value + generateRandomIntegerInRange(0, 15, "heal", "himself");
    attack1.value = 0;
  } else if (count.value === 2) {
    divWidth2.value =
      divWidth2.value + generateRandomIntegerInRange(0, 15, "heal", "himself");
    attack2.value = 0;
  }
  isHealDisable.value = true;
  count.value++;
};

const attack = () => {
  textColor.value = "red";
  isSurrenderDisable.value = false;
  if (count.value === 1) {
    attack1.value++;
    specialAttack1.value++;
    divWidth2.value =
      divWidth2.value - generateRandomIntegerInRange(0, 10, "attack", "p2");
    divWidth3.value =
      divWidth3.value - generateRandomIntegerInRange(0, 10, "attack", "p3");
  } else if (count.value === 2) {
    attack2.value++;
    specialAttack2.value++;
    divWidth1.value =
      divWidth1.value - generateRandomIntegerInRange(0, 10, "attack", "p1");
    divWidth3.value =
      divWidth3.value - generateRandomIntegerInRange(0, 10, "attack", "p3");
  }
  count.value++;
};

watch(
  () => count.value,
  (v) => {
    if (v === 1) {
      if (divWidth1.value < 30 && attack1.value > 7)
        isHealDisable.value = false;
      if (specialAttack1.value > 7) isSpecialAttackDisable.value = false;
    }
    if (v === 2) {
      if (divWidth2.value < 30 && attack2.value > 7)
        isHealDisable.value = false;
      if (specialAttack2.value > 7) isSpecialAttackDisable.value = false;
    }

    if (v === 3) {
      divWidth1.value =
        divWidth1.value - generateRandomIntegerInRange(0, 15, "attack", "p1");
      divWidth2.value =
        divWidth2.value - generateRandomIntegerInRange(0, 15, "attack", "p2");
      if (divWidth3.value < 30) {
        activeColor3.value = "red";
      }
      count.value = 1;
    }
  }
);
</script>

<!-- Add "scoped" attribute to limit CSS to this  only -->
<style scoped>
p {
  padding: 10px;
}
h1 {
  color: rgb(10 30 185);
}
.allPlayers {
  padding-right: 10%;
}
.singlePlayer {
  display: flex;
}

#app ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

#app li {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem auto;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}

#app h2 {
  font-size: 2rem;
  border-bottom: 4px solid #ccc;
  color: #58004d;
  margin: 0 0 1rem 0;
  text-align: center;
}

#app button {
  font: inherit;
  cursor: pointer;
  border: 1px solid #ff0077;
  background-color: #ff0077;
  color: white;
  padding: 0.05rem 1rem;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.26);
  margin-right: 30px;
  height: 30px;
}
#app button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: all !important;
}

#app button:hover,
#app button:active {
  background-color: #ec3169;
  border-color: #ec3169;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}

.animated-progress {
  width: 300px;
  height: 30px;
  border-radius: 5px;
  margin: 20px 10px;
  border: 1px solid rgb(189, 113, 113);
  overflow: hidden;
  position: relative;
}

.animated-progress span {
  height: 100%;
  display: block;
  width: 0;
  color: rgb(255, 251, 251);
  line-height: 30px;
  position: absolute;
  text-align: end;
  padding-right: 5px;
}
</style>
