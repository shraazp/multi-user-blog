<template>
  <div class="modal">
    <div class="modal-content">
      <h3>Are you sure?</h3>
      <p>You will not be able to recover this blog!</p>
      <div class="buttons">
        <button @click="closeModal">Cancel</button>
        <button @click="deletePost">Yes,delete it!</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["blogId"],
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
    deletePost() {
      this.$store.dispatch("deletePost", this.blogId);
      this.$emit("close-modal");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
    width: 300px;
    padding: 40px 30px;
    background-color: #fff;
    p {
      text-align: left;
      font-size: 12px;
      padding:2px;
    }
    
    .buttons {
      display: flex;
      justify-content: space-between;
      :nth-child(1){
        background-color: gray;
        border-radius: 5px;
      }
      :nth-last-child(1){
        background-color: red;
        border-radius: 5px;
      }
    }
  }
}
</style>