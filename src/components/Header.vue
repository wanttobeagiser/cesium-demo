<template>
    <div class="header">
        <el-header>
            <div class="title"> Cesium 功能示例（vue3）</div>
            <div class="button">
                <!-- 地图切换 -->
                <el-dropdown placement="bottom">
                    <el-button> 地图切换 <el-icon class="el-icon--right"><arrow-down /></el-icon></el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <!-- <el-dropdown-item @click="clearLayers">默认地图</el-dropdown-item> -->
                            <el-dropdown-item @click="changeLayer('gdLayer')">高德矢量注记图</el-dropdown-item>
                            <el-dropdown-item @click="changeLayer('mapboxLayer')">Mapbox-街道</el-dropdown-item>
                            <el-dropdown-item @click="changeLayer('mapboxLayer2')">Mapbox-卫星街道</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <!-- 绘制 -->
                <el-dropdown placement="bottom">
                    <el-button>绘制<el-icon class="el-icon--right"><arrow-down /></el-icon></el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="setDrawCommand('point')">点</el-dropdown-item>
                            <el-dropdown-item @click="setDrawCommand('polyline')">线</el-dropdown-item>
                            <el-dropdown-item @click="setDrawCommand('polygon')">多边形</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <!-- 加载各类数据 -->
                <el-dropdown placement="bottom">
                    <el-button> 加载各类数据 <el-icon class="el-icon--right"><arrow-down /></el-icon></el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="addData('baimo')">加载 geojson白膜数据</el-dropdown-item>
                            <!-- <el-dropdown-item @click="addData(baimo)">加载 倾斜摄影模型</el-dropdown-item> -->
                            <el-dropdown-item @click="addData('_3Dtiles')">加载 3Dtiles数据</el-dropdown-item>
                            <el-dropdown-item @click="addData('kml')">加载 kml数据</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-dropdown placement="bottom">
                    <el-button> bottom <el-icon class="el-icon--right"><arrow-down /></el-icon></el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>The Action 1st</el-dropdown-item>
                            <el-dropdown-item>The Action 2st</el-dropdown-item>
                            <el-dropdown-item>The Action 3st</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-dropdown placement="bottom">
                    <el-button> bottom <el-icon class="el-icon--right"><arrow-down /></el-icon></el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>The Action 1st</el-dropdown-item>
                            <el-dropdown-item>The Action 2st</el-dropdown-item>
                            <el-dropdown-item>The Action 3st</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-dropdown placement="bottom">
                    <el-button> bottom <el-icon class="el-icon--right"><arrow-down /></el-icon></el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>The Action 1st</el-dropdown-item>
                            <el-dropdown-item>The Action 2st</el-dropdown-item>
                            <el-dropdown-item>The Action 3st</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-dropdown placement="bottom">
                    <el-button> bottom <el-icon class="el-icon--right"><arrow-down /></el-icon></el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>The Action 1st</el-dropdown-item>
                            <el-dropdown-item>The Action 2st</el-dropdown-item>
                            <el-dropdown-item>The Action 3st</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-dropdown placement="bottom">
                    <el-button> bottom <el-icon class="el-icon--right"><arrow-down /></el-icon></el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>The Action 1st</el-dropdown-item>
                            <el-dropdown-item>The Action 2st</el-dropdown-item>
                            <el-dropdown-item>The Action 3st</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </el-header>
    </div>
</template>

<script setup>
import { ArrowDown } from '@element-plus/icons-vue'
import { useStore } from 'vuex';
const store = useStore();

// 清除图层，恢复默认
function clearLayers() {
    store.dispatch('clearAllLayers');
}

function changeLayer(layerKey) {
    store.dispatch('changeLayer', layerKey)
}

// 触发 Vuex 中的绘制命令
// const setDrawCommand = (command) => {
//     store.dispatch("setDrawCommand", command);
// };

function addData(data) {
    store.dispatch('addData', data)
}
</script>

<style lang="less" scoped>
.header {

    flex: 0 0 8%;
    /* 固定高度为 20% */

    .el-header {
        height: 100%;
        display: flex;
        /* 默认，水平从左到右 */
        flex-direction: row;
        /* 两端对齐，项目之间间距相等 */
        justify-content: space-between;
        align-items: center;
        background-color: #193c5f;
        color: aliceblue;

        .title {
            width: 14%;
            background-color: aqua;
        }

        .button {
            display: flex;
            justify-content: space-around;
            width: 70%;
            // background-color: aqua;
        }
    }

}
</style>