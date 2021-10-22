<template>
  <div class="list-item">
    <!-- 图片-->
    <div class="list-img">
      <slot name="img"></slot>
    </div>

    <div class="list-mes">
      <!-- 标题 -->
      <div class="list-title">
        <slot name="title"></slot>
      </div>

      <div class="list-subtitle">
        <slot name="subtitle"></slot>
      </div>

      <!-- 其他 -->
      <div class="list-other">
        <slot name="other"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListItem",
};
</script>

