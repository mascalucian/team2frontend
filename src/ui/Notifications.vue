<template>
  <transition-group name="notif-list" tag="div" class="notif-stack">
    <div
      class="notif-stack-notif"
      v-for="notification in notifications"
      :key="notification.id"
    >
      {{ notification.message }}
    </div>
  </transition-group>
</template>

<script>
import { inject } from "vue";
import { useSignalR } from "@quangdao/vue-signalr";
export default {
  data() {
    return {
      notifications: [],
      id: 1,
      notificationTimeout: 5000,
    };
  },
  mounted() {
    const signalr = useSignalR();
    signalr.on("SkillCreated", (data) => {});
    //testing
    for (let index = 0; index < 6; index++) {
      setTimeout(() => {
        this.addNotification("Test notification #" + index, "Info");
      }, 2000 * (index + 1));
    }
  },
  methods: {
    addNotification(message, type) {
      let newNotif = {
        id: this.id,
        message: message,
        type: type,
      };
      this.notifications.push(newNotif);
      this.id++;
      setTimeout(() => {
        this.removeNotification(newNotif);
      }, this.notificationTimeout);
    },
    removeNotification(notification) {
      const index = this.notifications.findIndex((_) => _.id == notification.id);
      this.notifications.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.notif-stack {
  position: absolute;
  right: 5vh;
  bottom: 5vh;
  display: flex;
  flex-direction: column;
}

.notif-stack-notif {
  display: inline-block;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0px 1px 5px #888888;
  margin-top: 1rem;
  transition: all 0.4s ease;
}

.notif-list-enter-from,
.notif-list-leave-to {
  opacity: 0;
  transform: translateY(2rem);
}
.notif-list-leave-active {
  position: absolute;
}
</style>
