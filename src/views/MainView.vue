<template>
    <div class="common-layout">
        <el-container direction="vertical" style="height: 12%;">
            <Header />
            <el-container>
                <CesiumMap />
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import Toolbar from '../components/Toolbar.vue'
import CesiumMap from '../components/CesiumMap.vue'
</script>

<style lang="less" scoped>
.common-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    /* 占满整个视口 */
    overflow: hidden;
    /* 隐藏滚动条 */

}
</style>