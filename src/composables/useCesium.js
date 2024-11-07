import * as Cesium from 'cesium';
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import CesiumNavigation from 'cesium-navigation-es6';

export function useCesium(containerId) {
    const store = useStore();
    const viewer = ref(null);

    // 初始化 Cesium Viewer
    function initCesium() {
        Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmN2VhMzk4Yy00MWVhLTQzYzctYWY4NS1hYjYzZDhmYTg4NDYiLCJpZCI6MjEyMDk3LCJpYXQiOjE3Mjk3NzE2NTV9.Aji5QMAwMeVjhD_qPkC6BDzpHD7Zv0UedWVSOTOcmb0";

        viewer.value = new Cesium.Viewer(containerId, {
            geocoder: false,
            selectionIndicator: false,
            infoBox: false,
            homeButton: false,
            sceneModePicker: false,
            fullscreenButton: false,
            navigationHelpButton: false,
            animation: false,
            timeline: false,
            vrButton: false,
            shouldAnimate: true,
            baseLayerPicker: false,
        });

        //导航插件
        const options = {
            defaultResetView: Cesium.Rectangle.fromDegrees(73.5, 18, 135, 53.5), // 默认重置视角,显示中国区域
            enableCompass: true,             // 启用指南针
            enableZoomControls: true,        // 启用缩放控件
            enableDistanceLegend: true,      // 启用比例尺控件
            enableCompassOuterRing: true     // 启用指南针外圈
        };
        new CesiumNavigation(viewer.value, options);

        // 隐藏 Cesium 版权信息
        viewer.value._cesiumWidget._creditContainer.style.display = 'none';
        // 开启帧率显示
        // viewer.value.scene.debugShowFramesPerSecond = true;
        viewer.value.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(109, 33.0, 30000000), // 设置目标位置
        })
        // 将 Viewer 实例存储到 Vuex 中
        store.commit('setViewer', viewer.value);
    }

    // 图层切换
    function switchLayer() {
        const currentLayerKey = store.state.currentLayer; // 获取当前图层的 key
        const currentLayer = store.state.layers[currentLayerKey];  //通过变量来动态访问属性，则需要使用方括号

        if (viewer.value) {
            viewer.value.imageryLayers.removeAll(); // 清除现有图层
            if (currentLayer) {
                viewer.value.imageryLayers.addImageryProvider(currentLayer); // 添加新图层
            }
        }
    }


    // 点击事件
    // let drawnPoints = [];
    // let isClickHandlerRegistered = false; // 初始化标志
    // function addClickHandler() {
    //     // 检查是否已经注册过事件
    //     if (isClickHandlerRegistered) {
    //         console.log('Click handler already registered.'); // 调试信息
    //         return; // 如果已注册，直接返回
    //     }

    //     const commandPoint = store.state.drawCommand; // 获取画点指令
    //     const clickHandler = new Cesium.ScreenSpaceEventHandler(viewer.value.canvas);

    //     if (commandPoint) {
    //         clickHandler.setInputAction((click) => {
    //             console.log('Click event triggered'); // 记录事件触发


    //             const cartesian = viewer.value.scene.pickPosition(click.position);
    //             if (cartesian) {
    //                 console.log('Point added at:', cartesian); // 确认点被添加
    //                 // 添加点实体
    //                 viewer.value.entities.add({
    //                     position: cartesian,
    //                     point: {
    //                         color: Cesium.Color.RED,
    //                         pixelSize: 10
    //                     }
    //                 });

    //                 console.log('Current entities count:', viewer.value.entities.length);
    //                 viewer.value.camera.flyTo({
    //                     destination: cartesian,
    //                     duration: 2, // 飞行到点的持续时间
    //                 });
    //                 // 获取地理坐标（经纬度）
    //                 let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    //                 let longitude = Cesium.Math.toDegrees(cartographic.longitude);
    //                 let latitude = Cesium.Math.toDegrees(cartographic.latitude);
    //                 let height = Cesium.Math.toDegrees(cartographic.height);
    //                 // 将绘制的点添加到数组中
    //                 drawnPoints.push({ lng: longitude, lat: latitude, height: height });

    //             }
    //         }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    //         isClickHandlerRegistered = true; // 注册后设置标志
    //     }
    //     return clickHandler;
    // }


    // 加载各类数据
    function switchData() {
        const currentDataKey = store.state.currentData; // 获取当前图层的 key
        const currentData = store.state.Data[currentDataKey];  //通过变量来动态访问属性，则需要使用方括号
        console.log('currentDataKey', currentDataKey);
        console.log('currentData', currentData);
        console.log('currentData', typeof (currentData));

        if (viewer.value) {
            //viewer.value.imageryLayers.removeAll(); // 清除现有图层
            if (currentDataKey === 'baimo' && currentData) {
                //viewer.value.imageryLayers.addImageryProvider(currentLayer); // 添加新图层
                const request = new XMLHttpRequest();
                // 设置请求方法与路径
                request.open("get", currentData);
                // 不发送数据到服务器
                request.send(null);
                //XHR对象获取到返回信息后执行
                request.onload = function () {
                    // 解析获取到的数据
                    const data = JSON.parse(request.responseText);

                    data.features.forEach(feature => {
                        //console.log(feature);
                        feature.geometry.coordinates.forEach(coordinate => {
                            // console.log(coordinate.flat()); 
                            // console.log(feature.properties.height)
                            viewer.value.entities.add(
                                {
                                    id: feature.properties.gml_id,
                                    wall: {
                                        positions: Cesium.Cartesian3.fromDegreesArray(coordinate.flat()),
                                        minimumHeights: new Array(coordinate.length).fill(0),
                                        maximumHeights: new Array(coordinate.length).fill(feature.properties.height * 3),
                                        material: Cesium.Color.WHITE,
                                        // material: new Cesium.ImageMaterialProperty({
                                        //     image: './louti.png',
                                        //     repeat: new Cesium.Cartesian2(10, 1)
                                        // }),
                                    },
                                    polygon: {
                                        hierarchy: Cesium.Cartesian3.fromDegreesArray(coordinate.flat()),
                                        width: 2,
                                        material: Cesium.Color.WHITE,
                                        // material: new Cesium.ImageMaterialProperty({
                                        //     image: './wuding.png',
                                        //     repeat: new Cesium.Cartesian2(10, 1)
                                        // }),
                                        height: feature.properties.height * 3,
                                    }
                                }
                            )
                        })
                    });

                }
                // 39.90900200000004
                viewer.value.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(116.464003499999998, 39.90800200000004, 1000.0),
                    duration: 1,
                    orientation: {
                        heading: Cesium.Math.toRadians(-30.0),  // heading: 朝向 -45 度
                        pitch: Cesium.Math.toRadians(-25.0),    // pitch: 向下 30 度
                        roll: 0.0                               // roll: 保持水平
                    },

                });

            }
            else if (currentDataKey === '_3Dtiles' && currentData) {
                //viewer.value.imageryLayers.addImageryProvider(currentLayer); // 添加新图层
                const request = new XMLHttpRequest();
                // 设置请求方法与路径
                request.open("get", currentData);
                // 不发送数据到服务器
                request.send(null);
                //XHR对象获取到返回信息后执行
                request.onload = function () {
                    // 解析获取到的数据
                    const data = JSON.parse(request.responseText);
                    console.log('data', data);
                    const tileset = new Cesium.Cesium3DTileset.fromUrl(
                        "http://localhost:8002/tilesets/Seattle/tileset.json", {
                        skipLevelOfDetail: true,
                        baseScreenSpaceError: 1024,
                        skipScreenSpaceErrorFactor: 16,
                        skipLevels: 1,
                        immediatelyLoadDesiredLevelOfDetail: false,
                        loadSiblings: false,
                        cullWithChildrenBounds: true
                    });


                    // data.features.forEach(feature => {
                    //     //console.log(feature);
                    //     feature.geometry.coordinates.forEach(coordinate => {
                    //         // console.log(coordinate.flat()); 
                    //         // console.log(feature.properties.height)
                    //         viewer.value.entities.add(
                    //             {
                    //                 id: feature.properties.gml_id,
                    //                 wall: {
                    //                     positions: Cesium.Cartesian3.fromDegreesArray(coordinate.flat()),
                    //                     minimumHeights: new Array(coordinate.length).fill(0),
                    //                     maximumHeights: new Array(coordinate.length).fill(feature.properties.height * 3),
                    //                     material: Cesium.Color.WHITE,
                    //                     // material: new Cesium.ImageMaterialProperty({
                    //                     //     image: './louti.png',
                    //                     //     repeat: new Cesium.Cartesian2(10, 1)
                    //                     // }),
                    //                 },
                    //                 polygon: {
                    //                     hierarchy: Cesium.Cartesian3.fromDegreesArray(coordinate.flat()),
                    //                     width: 2,
                    //                     material: Cesium.Color.WHITE,
                    //                     // material: new Cesium.ImageMaterialProperty({
                    //                     //     image: './wuding.png',
                    //                     //     repeat: new Cesium.Cartesian2(10, 1)
                    //                     // }),
                    //                     height: feature.properties.height * 3,
                    //                 }
                    //             }
                    //         )
                    //     })
                    // });

                }

                // viewer.value.camera.flyTo({
                //     destination: Cesium.Cartesian3.fromDegrees(116.464003499999998, 39.90800200000004, 1000.0),
                //     duration: 1,
                //     orientation: {
                //         heading: Cesium.Math.toRadians(-30.0),  // heading: 朝向 -45 度
                //         pitch: Cesium.Math.toRadians(-25.0),    // pitch: 向下 30 度
                //         roll: 0.0                               // roll: 保持水平
                //     },

                // });

            }
        }
    }


    onMounted(() => {
        initCesium();
        const distanceLegend = document.querySelector('.cesium-distance-legend');
        if (distanceLegend) {
            distanceLegend.style.display = 'block';
        }
        //addClickHandler(); // 确保调用点击处理器
    });

    // onUnmounted(() => {
    //     if (viewer.value) {
    //         viewer.value.destroy();
    //     }
    // });

    return { viewer, switchLayer, switchData };
}