<template>
  <div>展示SpirteList</div>
</template>

<script setup>
// ----------导入需求包/组件----------------------------
import {computed, onMounted, ref} from "vue";

// ----------props & emit-------------------------
const props = defineProps({ spirteName: String });
const emit = defineEmits(['update']);

// ----------data相关（reactive，ref..）-----------
const count = ref(0);

// ----------计算属性------------------------------
const doubled = computed(() => count.value * 2);

// ----------生命周期钩子---------------------------
onMounted(() => { console.log('Component is mounted!'); });

// ----------其他组合式函数-------------------------
// 比如useRouter, useStore..

// ----------方法，相关的方法尽量放在上下文------------


</script>
