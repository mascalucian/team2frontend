<template>
  <span
    class="role"
    :class="'role-' + role.toLowerCase()"
    :style="{ height: size + 'px', minHeight: size + 'px' }"
  >
    <p :style="{ fontSize: size / 2.6 + 'px', lineHeight: size + 'px' }">
      {{ role + (role == "Admin" ? " 🔧" : role == "Expert" ? " ⭐" : " 😩") }}
    </p>
  </span>
</template>

<script>
export default {
  props: {
    role: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: false,
      default: 40,
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  text-align: center;
  margin: 0;
  white-space: nowrap;
}
.role {
  display: inline-block;
  color: white;
  padding: 0 1rem;
  border-radius: 40px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.26);
  margin: 0.2rem 0.5rem;
}

.role-admin {
  background-color: rgb(26, 160, 160);
}
.role-expert {
  background-color: #5624d0;
}
.role-user {
  background-color: rgb(235, 235, 235);
  color: black;
}
</style>
