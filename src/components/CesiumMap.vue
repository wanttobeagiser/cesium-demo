<template>
    <!-- 右侧地图 -->
    <div class="map">
        <el-main>
            <div id="cesiumContainer"> </div>
        </el-main>
    </div>
</template>

<script setup>
import * as Cesium from 'cesium';
import { onMounted, computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useCesium } from '../composables/useCesium'

const store = useStore();

const { viewer, switchLayer, switchData } = useCesium('cesiumContainer');

//通过使用箭头函数() => store.state.currentLayer，你告诉 Vue 在每次响应式数据更新时重新执行这个函数。这意味着每次触发 watch 时，都会重新计算并获取当前的 currentLayer 值，确保你拿到的是最新的状态。
watch(() => store.state.currentLayer, switchLayer);

watch(() => store.state.currentData, switchData);

</script>

<style lang="less" scoped>
.map {
    flex: 1;
    /* 占据剩余的空间 */

    .el-main {
        position: relative;
        /* 确保可以相对于此定位 */
        padding: 0;
        height: 100%;

        /* 确保 el-main 占满 */

    }
}

.distance-legend {
    display: block !important;
}
</style>