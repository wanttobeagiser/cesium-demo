import { createStore } from 'vuex';
import * as Cesium from 'cesium';
const store = createStore({
    state() {
        return {
            layers: {
                //高度矢量注记地图
                gdLayer: new Cesium.UrlTemplateImageryProvider({
                    url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
                    minimumLevel: 3,
                    maximumLevel: 18,
                    subdomains: ['a', 'b', 'c']
                }),

                mapboxLayer: new Cesium.MapboxStyleImageryProvider({
                    username: 'wanttobeagiser',
                    styleId: 'cm2oy458q006j01r69cpra6go',
                    accessToken: 'pk.eyJ1Ijoid2FudHRvYmVhZ2lzZXIiLCJhIjoiY20yb2lnb25iMGc3czJrcHphdGJxY2JpZyJ9.ZZIzTAofIBzkifdZdw3_Bg',
                }),

                mapboxLayer2: new Cesium.MapboxStyleImageryProvider({
                    username: 'wanttobeagiser',
                    styleId: 'cm2oydhab003i01pw2jknbm42',
                    accessToken: 'pk.eyJ1Ijoid2FudHRvYmVhZ2lzZXIiLCJhIjoiY20yb2lnb25iMGc3czJrcHphdGJxY2JpZyJ9.ZZIzTAofIBzkifdZdw3_Bg',
                }),
            },
            drawCommand: null,
            viewer: null,
            currentLayer: '',
            Data: {
                baimo: '/data/chaoyangbaimo1.json',
                _3Dtiles: '/data/dayanta/tileset.json',
                kml: '',
            },
            currentData: '',
        }
    },
    mutations: {
        setViewer(state, viewer) {
            state.viewer = viewer;
        },
        setCurrentLayer(state, layerKey) {
            state.currentLayer = layerKey; // 更新当前图层
        },
        setDrawCommand(state, command) {
            state.drawCommand = command;
        },
        setData(state, data) {
            state.currentData = data
        }
    },
    actions: {
        setViewer(state, viewer) {
            state.viewer = viewer;
        },
        changeLayer({ commit }, layerKey) {
            commit('setCurrentLayer', layerKey); // 提交更改
        },
        setDrawCommand({ commit }, command) {
            commit("setDrawCommand", command);
        },
        addData({ commit }, data) {
            commit('setData', data)
        }

    },
    getters: {
        // drawCommand: (state) => state.drawCommand
    }
});

export default store;
