<template>
  <transition name="fade">
    <div v-if="show" class="notif-stack-notif">
      {{ notification.message }}
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  props: {
    notification: {
      required: true,
      type: Object,
    },
  },
  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 10);
  },
  unmounted() {
    this.show = false;
  },
};
</script>

<style lang="scss" scoped>
.notif-stack-notif {
  display: inline-block;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0px 1px 5px #888888;
  margin-top: 1rem;
  transition: all 0.4s ease;
  opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.fade-leave-active {
  position: absolute;
}

// .fade-leave-active {
//   opacity: 0;
// }
</style>
