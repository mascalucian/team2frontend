<template>
  <div class="recommendation">
    <div class="avatar skeleton"></div>
    <div class="text">
      <div class="skeleton-text"></div>
      <div class="skeleton-text"></div>
      <div class="skeleton-text"></div>
      <div class="skeleton-text"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.recommendation {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: flex-start;
  width: 90%;
  height: 150px;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.avatar {
  width: 50px !important;
  height: 50px !important;
  aspect-ratio: 1 / 1 !important;
  border-radius: 50%;
}

.text {
  height: 100%;
  flex-grow: 1;
}

.skeleton {
  opacity: 0.7;
  animation: skeleton-loading 0.3s linear infinite alternate;
}

.skeleton-text {
  opacity: 0.7;
  height: 1rem;
  width: 100%;
  animation: skeleton-loading 1s linear infinite alternate;
  margin: 0.2rem;
}

@keyframes skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 70%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
}
</style>
