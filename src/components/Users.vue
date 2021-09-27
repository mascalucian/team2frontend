<template>
  <main class="vld-parent" ref="loaderParent">
    <header>
      <div class="title">
        <h1>Users Management</h1>
        <div>
          <button>Add User</button>
          <button @click="loadData">Refresh</button>
        </div>
      </div>
      <form @submit.prevent.stop="submitEdit" class="vld-parent" ref="loaderForm">
        <h3>{{ !selectedUser ? "Select a user:" : "User: " + selectedUser.email }}</h3>
        <div class="fields" v-if="selectedUser">
          <label style="display: block">Roles:</label>
          <input type="checkbox" value="User" v-model="selectedUser.roles" />
          <label for="jack">User 😩</label>
          <input type="checkbox" value="Expert" v-model="selectedUser.roles" />
          <label for="john">Expert ⭐</label>
          <input type="checkbox" value="Admin" v-model="selectedUser.roles" />
          <label for="mike">Admin 🔧</label>
        </div>
        <div class="button-row">
          <input
            type="submit"
            value="Save Changes"
            v-if="selectedUser"
            :disabled="selectedUser.roles.lenght == 0"
          />
          <button type="button" v-if="selectedUser" @click="selectedUser = null">
            Cancel
          </button>
        </div>
      </form>
    </header>
    <section>
      <table>
        <tr>
          <th>Id</th>
          <th>Email</th>
          <th>Roles</th>
        </tr>
        <tr
          v-for="user in users"
          :key="user.id"
          @click="selectUser(user)"
          :class="{ selected: selectedUser == user }"
        >
          <td>{{ user.id }}</td>
          <td>{{ user.email }}</td>
          <td>
            <p
              v-for="role in user.roles"
              :key="role"
              class="role"
              :class="
                role == 'Admin'
                  ? 'role-admin'
                  : role == 'Expert'
                  ? 'role-expert'
                  : 'role-user'
              "
            >
              {{ role + (role == "Admin" ? " 🔧" : role == "Expert" ? " ⭐" : " 😩") }}
            </p>
          </td>
        </tr>
      </table>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      selectedUser: null,
      users: [],
      loader: undefined,
    };
  },
  methods: {
    loadData() {
      this.loader = this.$loading.show({
        container: this.$refs.loaderParent,
        isFullPage: false,
        backgroundColor: "none",
        color: "black",
      });
      this.$http
        .get("/users")
        .then((response) => {
          this.users = response.data;
        })
        .finally(() => {
          this.loader.hide();
          this.loader = undefined;
        });
    },
    selectUser(user) {
      this.selectedUser = JSON.parse(JSON.stringify(user));
    },
    submitEdit() {
      this.loader = this.$loading.show({
        container: this.$refs.loaderForm,
        isFullPage: false,
        backgroundColor: "none",
        style: "bars",
      });
      const roles = this.selectedUser.roles;
      this.$http
        .post(`/users/${this.selectedUser.id}/roles`, roles)
        .then((results) => {
          console.log("Success!");
          this.selectedUser = null;
        })
        .finally(() => {
          this.loader.hide();
          this.loader = undefined;
        });
    },
  },
  created() {
    this.loadData();
  },
};
</script>

<style lang="scss" scoped>
.button-row {
  margin: 1rem 0;
}
.selected {
  background-color: rgb(232, 208, 255);
}
form {
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  button,
  input[type="submit"] {
    width: auto;
    display: inline-block;
  }
}
header {
  height: 12rem;
  background-color: $c-u-bl;
  color: white;
  font-family: $f-u-bm;
  display: flex;
  justify-content: flex-start;
  .title {
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .title > div {
    vertical-align: bottom;
    width: 100%;
    padding: 1rem;
    height: auto;
  }
  button,
  input[type="submit"] {
    height: 2rem;
    border-radius: 25px;
    font-family: $f-u-bm;
    padding: 0 1rem;
    background-color: $c-u-pur;
    color: white;
    border: 0;
    margin: 0 1rem;
    box-shadow: 0 2px 11px 1px rgb(0 0 0 / 26%);
    cursor: pointer;
    &:hover,
    :active,
    :focus-visible {
      box-shadow: 0 2px 7px 4px rgb(0 0 0 / 26%);
      background-color: yellowgreen;
    }
    &:disabled {
      background-color: transparent !important;
      box-shadow: inherit !important;
      color: gray !important;
      cursor: default;
    }
  }
}
h1 {
  margin: 0;
}
table {
  width: 100%;
  text-align: center;
}

th {
  background-color: $c-u-bl;
  color: white;
  font-family: $f-u-bm;
  padding: 1rem;
}

tr {
  &:hover {
    background-color: rgb(232, 208, 255);
  }
  position: relative;
}

.dropdown-menu {
  column-span: all;
  //   opacity: 0;
  position: absolute;
}
.dropdown-menu .active {
  opacity: 100%;
}

.role {
  display: inline-block;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 40px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.26);
  margin: 0.2rem 0.5rem;
}

.role-admin {
  background-color: steelblue;
}
.role-expert {
  background-color: darkorchid;
}
.role-user {
  background-color: indianred;
}
</style>
