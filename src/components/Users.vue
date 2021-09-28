<template>
  <main class="vld-parent">
    <header>
      <div class="title">
        <h1>Users Management</h1>
        <div>
          <button @click="startAddUser($event)">Add User</button>
          <button @click="loadData">Refresh</button>
        </div>
      </div>
    </header>
    <section>
      <table class="vld-parent" ref="loaderParent">
        <tr>
          <th>Id</th>
          <th>Email</th>
          <th>Roles</th>
        </tr>
        <tr
          v-for="user in users"
          :key="user.id"
          @click="selectUser(user, $event)"
          :class="{ selected: selectedUser == user }"
        >
          <td>{{ user.id }}</td>
          <td>{{ user?.email }}</td>
          <td class="roles">
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
    <div
      class="dropdown-menu"
      :style="[
        windowWidth > dropdownX + width
          ? { left: dropdownX + 'px' }
          : { right: windowWidth - dropdownX + 'px' },
        windowHeight > dropdownY + height
          ? { top: dropdownY + 'px' }
          : { bottom: windowHeight - dropdownY + 'px' },
        dropdownX ? { opacity: '100%' } : { opacity: '0' },
      ]"
      id="dropdown"
    >
      <div class="dropdown-message" v-if="dropdownMessage">
        <p>{{ dropdownMessage }}</p>
      </div>
      <form
        @submit.prevent.stop="editMode ? submitEdit() : submitAdd()"
        class="vld-parent"
        ref="loaderForm"
      >
        <h3>{{ editMode ? "User: " + selectedUser?.email : "Create a new user:" }}</h3>
        <div v-if="!editMode">
          <label> Email: </label>
          <input
            email
            minlength="6"
            type="text"
            v-model="newUser.email"
            autocomplete="off"
          />
          <label> Password: </label>
          <input
            minlength="6"
            type="password"
            v-model="newUser.password"
            autocomplete="off"
          />
        </div>
        <div class="fields" v-if="editMode && selectedUser">
          <label style="display: block">Roles:</label>
          <input type="checkbox" value="User" v-model="selectedUser.roles" />
          <label for="jack">User 😩</label>
          <input type="checkbox" value="Expert" v-model="selectedUser.roles" />
          <label for="john">Expert ⭐</label>
          <input type="checkbox" value="Admin" v-model="selectedUser.roles" />
          <label for="mike">Admin 🔧</label>
        </div>
        <div class="fields" v-if="!editMode">
          <label style="display: block">Roles:</label>
          <input type="checkbox" value="User" v-model="newUser.roles" />
          <label for="jack">User 😩</label>
          <input type="checkbox" value="Expert" v-model="newUser.roles" />
          <label for="john">Expert ⭐</label>
          <input type="checkbox" value="Admin" v-model="newUser.roles" />
          <label for="mike">Admin 🔧</label>
        </div>
        <div class="button-row">
          <div
            :style="[
              !confirm
                ? { opacity: '100%', pointerEvents: 'auto' }
                : { opacity: '0', pointerEvents: 'none' },
              ,
              { transition: '0.2s opacity ease-in-out' },
            ]"
          >
            <input
              type="submit"
              :value="editMode ? 'Save Changes' : 'Add User'"
              :disabled="selectedUser?.roles.lenght == 0"
            />
            <button
              type="button"
              class="warn-button"
              @click.prevent.stop="confirm = true"
              v-if="editMode"
            >
              Delete
            </button>
            <button
              type="button"
              class="warn-button"
              @click.prevent.stop="cancelSelection"
            >
              Cancel
            </button>
          </div>
          <div
            class="confirm-buttons"
            :style="[
              confirm
                ? { opacity: '100%', pointerEvents: 'auto' }
                : { opacity: '0', pointerEvents: 'none' },
              ,
              { transition: '0.2s opacity ease-in-out' },
            ]"
          >
            <h4>Are you sure?</h4>
            <button type="button" @click.prevent.stop="deleteUser(selectedUser.id)">
              Yes
            </button>
            <button
              type="button"
              class="warn-button"
              @click.prevent.stop="confirm = false"
            >
              No
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      newUser: {
        email: "",
        password: "",
        roles: ["User"],
      },
      selectedUser: null,
      users: [],
      loader: undefined,
      dropdownX: null,
      dropdownY: null,
      dropdownMessage: "",
      confirm: false,
      editMode: true,
      height: 0,
      width: 0,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    };
  },
  watch: {
    selectedUser: function (newVal, oldVal) {
      const dropdown = document.getElementById("dropdown");
      this.$nextTick(() => {
        this.height = dropdown.clientHeight;
        this.width = dropdown.clientWidth;
      });
    },
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
      if (this.dropdownX > this.windowWidth) {
        this.dropdownX = this.windowWidth - 1;
      }
      if (this.dropdownY > this.windowHeight) {
        this.dropdownY = this.windowHeight - 1;
      }
    },
    loadData() {
      this.cancelSelection();
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
    startAddUser(event) {
      this.editMode = false;
      this.dropdownX = event.pageX;
      this.dropdownY = event.pageY;
    },
    selectUser(user, event) {
      this.editMode = true;
      if (this.dropdownMessage) return;
      if (user?.id != this.selectedUser?.id) {
        this.confirm = false;
        this.dropdownX = event.pageX;
        this.dropdownY = event.pageY;
      }
      this.selectedUser = JSON.parse(JSON.stringify(user));
    },
    submitAdd() {
      this.loader = this.$loading.show({
        container: this.$refs.loaderForm,
        isFullPage: false,
        backgroundColor: "none",
        style: "bars",
      });
      this.$http
        .post("/users/", {
          email: this.newUser.email,
          password: this.newUser.password,
          roles: this.newUser.roles,
        })
        .then(() => {
          this.dropdownMessage = "User added successfully!";
          setTimeout(() => {
            this.newUser = {
              email: "",
              password: "",
              roles: ["User"],
            };
            this.dropdownMessage = "";
            this.cancelSelection();
          }, 2000);
        })
        .catch((error) => {
          this.dropdownMessage = error.data.message || "An error occured.";

          setTimeout(() => {
            this.dropdownMessage = "";
          }, 2000);
        })
        .finally(() => {
          this.loader.hide();
          this.loader = undefined;
        });
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
          this.dropdownMessage = "Roles edited successfully!";
          setTimeout(() => {
            this.dropdownMessage = "";
            this.cancelSelection();
          }, 2000);
          console.log("Success!");
        })
        .catch((error) => {
          switch (error.response.status) {
            case 400:
              this.dropdownMessage = "Invalid roles.";
              break;
            case 404:
              this.dropdownMessage = "Oops! User was deleted.";
              break;
            default:
              break;
          }

          setTimeout(() => {
            this.dropdownMessage = "";
          }, 2000);
        })
        .finally(() => {
          this.loader.hide();
          this.loader = undefined;
        });
    },
    deleteUser(id) {
      this.loader = this.$loading.show({
        container: this.$refs.loaderForm,
        isFullPage: false,
        backgroundColor: "none",
        style: "bars",
      });
      this.$http
        .delete("/users/" + id)
        .then(() => {
          this.dropdownMessage = "User deleted successfully!";
          setTimeout(() => {
            this.dropdownMessage = "";
            this.cancelSelection();
          }, 2000);
        })
        .catch((error) => {
          switch (error.response.status) {
            case 404:
              this.dropdownMessage = "Oops! User was already deleted.";
              break;
            default:
              break;
          }

          setTimeout(() => {
            this.dropdownMessage = "";
          }, 2000);
        })
        .finally(() => {
          this.loader.hide();
          this.loader = undefined;
        });
    },
    cancelSelection() {
      this.dropdownX = null;
      this.dropdownY = null;
      setTimeout(() => {
        this.editMode = true;
        this.selectedUser = null;
      }, 200);
    },
  },
  async mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
    await this.loadData();
  },
  unmounted() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>

<style lang="scss" scoped>
.dropdown-menu {
  max-width: 75vw;
  position: fixed;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.26);
  padding: 0.5rem;
  transition: 0.2s opacity ease-in-out, 0.1s top ease-in-out, 0.1s left ease-in-out;
  z-index: 100;
  form {
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    input[type="text"],
    input[type="password"] {
      display: block;
      width: 100%;
      border-radius: 5px;
      margin: 1rem 0;
      font-size: large;
      padding: 0.3rem;
    }
    button,
    input[type="submit"] {
      width: auto;
      display: inline-block;
    }
  }
  .dropdown-message {
    border-radius: 30px;
    height: 100%;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: block;
    margin: 0;
    overflow: clip;
    background-color: rgba(255, 255, 255, 0.9);
    font-size: larger;
    font-weight: bolder;
    font-family: $f-u-bm;
    z-index: 101;
    display: flex;
    align-items: center;
    p {
      margin: auto;
    }
  }
}
.button-row {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 1rem 0;
  > .confirm-buttons {
    h4 {
      margin: 0;
      font-weight: bolder;
      font-family: $f-u-bm;
    }
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    text-align: center;
  }
}
.selected {
  background-color: rgb(232, 208, 255);
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
}
h1 {
  margin: 0;
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
.warn-button {
  background-color: brown;
}
table {
  width: 100%;
  text-align: center;
  &:not(:first-child) {
    cursor: auto;
  }
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
  cursor: pointer;
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

.roles {
  display: flex;
}
</style>
