<template>
  <transition-group name="notif-list" tag="div" class="notif-stack">
    <div
      class="notif-stack-notif"
      v-for="notification in notifications"
      :key="notification.id"
      :class="'notif-stack-notif ' + notification.type"
      @click="action(notification)"
    >
      <span class="icon-wrapper">
        <i
          class="fas"
          :class="{
            'fa-info-circle': notification.type === 'info',
            'fa-plus-circle': notification.type === 'added',
            'fa-trash-alt': notification.type === 'deleted',
            'fa-comments': notification.type === 'recommendation',
          }"
        ></i>
      </span>
      {{ notification.message }}
    </div>
  </transition-group>
</template>

<script>
import AuthService from "../services/auth.service.js";
import { inject } from "vue";
import { useSignalR } from "@quangdao/vue-signalr";
export default {
  data() {
    return {
      notifications: [],
      id: 1,
      // notificationTimeout: 5000,
      notificationTimeout: 50000,
      userProfile: null,
      isAdmin: false,
    };
  },
  mounted() {
    const signalr = useSignalR();
    signalr.on("SkillCreated", (data) => {
      if (this.$route.path == "/skills" && this.isAdmin) return;
      else this.addNotification("New skill was added: " + data.name, "added");
    });
    signalr.on("SkillUpdated", (data) => {
      if (this.$route.path == "/skills" && this.isAdmin) return;
      else this.addNotification("A skill was updated: " + data.name, "info");
    });
    signalr.on("SkillDeleted", (data) => {
      if (this.$route.path == "/skills" && this.isAdmin) return;
      else this.addNotification("A skill was deleted: " + data.name, "deleted");
    });
    signalr.on("RecommendationAdded", (data) => {
      console.log(data);
      if (
        data.recomandation.userId != this.userProfile?.sub ||
        this.userProfile === null
      ) {
        this.addNotification(
          data.recomandation.userName +
            " just added a recommendation to skill: " +
            data.skill.name,
          "recommendation"
        );
      }
    });
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
    action(notification) {
      switch (notification.type) {
        case "recommendation":
          break;

        default:
          this.$router.push({ path: "/skills" });
          setTimeout(() => {
            this.removeNotification(notification);
          }, 100);
          break;
      }
    },
  },
  async created() {
    this.userProfile = await AuthService.getProfile();
    this.isAdmin = (await AuthService.getRole())?.includes("Admin");
  },
};
</script>

<style lang="scss" scoped>
$color-info: rgb(209, 189, 255);
$color-added: rgb(76, 0, 255);
$color-deleted: rgb(255, 47, 110);
$color-recommendation: rgb(163, 255, 209);
.notif-stack {
  position: fixed;
  right: 5vw;
  bottom: 5vh;
  display: flex;
  flex-direction: column;
  width: 30vw;
  z-index: 50000;
}

.notif-stack-notif {
  display: inline-block;
  padding: 1rem 1.5rem 1rem 0.5rem;
  background-color: white;
  box-shadow: 0px 1px 5px #888888;
  margin-top: 1rem;
  transition: all 0.4s ease;
  text-align: left;
  color: black;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
}

.notif-list-enter-from,
.notif-list-leave-to {
  opacity: 0;
  transform: translateY(2rem);
}

.icon-wrapper {
  height: 100% !important;
  aspect-ratio: 1;

  i {
    margin: 0 0.5rem;
  }
}

.info {
  border-left: 5px solid $color-info;
  i {
    color: $color-info;
  }
}

.added {
  border-left: 5px solid $color-added;
  i {
    color: $color-added;
  }
}

.deleted {
  border-left: 5px solid $color-deleted;
  i {
    color: $color-deleted;
  }
}

.recommendation {
  border-left: 5px solid $color-recommendation;
  i {
    color: $color-recommendation;
  }
}

@media screen and (max-width: 600px) {
  .notif-stack {
    width: 80vw;
  }
}
</style>
