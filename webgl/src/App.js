import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import * as THREE from "three";
import {Color} from "three";
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
const vertexshader='out vec2 TexCoord;' +
    'void main() {\n' +
    '\n' +
    'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n' +
    'TexCoord=uv;\n' +
    '    }';
const fragmentshader='uniform vec3 color;uniform sampler2D tex;in vec2 TexCoord;\n' +
    '\n' +
    'void main() {\n' +
    '\tgl_FragColor = gl_FragCoord.z*texture(tex,TexCoord)+(1-gl_FragCoord.z)*vec4(0.0,0.0,1.0,1.0);\n' +
    '}';
class App extends Component{

    constructor() {
        super();
        this.handlekeypress=this.handlekeypress.bind(this);
        this.state={x:0.0,z:5.0};
        this.createechart=this.createechart.bind(this);
    }
    handlekeypress(e)
    {

        console.log(e.keyCode);
        switch (e.keyCode) {
            case 87:
            {
                console.log("update");
                this.setState({z:this.state.z-0.1});
                break;
            }
            case 83:
            {
                this.setState({z:this.state.z+0.1});
                break;
            }
            case 65:
            {
                this.setState({x:this.state.x-0.1});
                break;
            }
            case 68:
            {
                this.setState({x:this.state.x+0.1});
                break;
            }

        }
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(nextState.z);
        this.camera.position.z=nextState.z;
        this.camera.position.x=nextState.x;
        return true;
    }
    createechart()
    {
        var myChart = echarts.init(document.getElementById('mychart'));
        // 绘制图表
        myChart.setOption({
            title: { text: '海洋信息' },
            tooltip: {},
            xAxis: {
                name:"水深",
                data: ["10","20","30","40","50"]
            },
            yAxis: {},
            series: [
                {
                    name: '温度',
                    type: 'line',
                    data: [5, 20, 36, 10, 10, 20]
                },
                {
                    name: '盐度',
                    type: 'line',
                    data: [5, 10, 15, 20, 25, 30]
                }]
        });
    }
    componentDidMount() {
        //console.log(this.state.z);
        this.createechart();

        document.addEventListener("keydown", this.handlekeypress);
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10);

        this.camera=camera;
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor(0x0000ff);
        var div=document.getElementById("threejs");
        div.appendChild((renderer.domElement));
        document.body.appendChild( renderer.domElement );
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var loader = new THREE.TextureLoader();
        var texture = loader.load("back.jpg");
        /*var material = new THREE.MeshBasicMaterial({
            color: 0x4d6dad,
            map: texture
        });*/
        var material= new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color( 0xffffff ) },
                tex:{value:texture}
            },
            vertexShader: vertexshader,
            fragmentShader: fragmentshader,
        });
        console.log(vertexshader);
        //var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var cube = new THREE.Mesh( geometry, material );
        cube.position.y=0.5;
        scene.add( cube );
        var cube1=new THREE.Mesh(geometry,material);
        cube1.position.z=-1;
        cube1.position.y=1;
        cube1.scale.y=2;
        scene.add(cube1);
        var cube2=new THREE.Mesh(geometry,material);
        cube2.position.z=-1;
        cube2.position.x=1;
        cube2.position.y=0.5;
        cube2.scale.y=1;
        scene.add(cube2);

        var cube3=new THREE.Mesh(geometry,material);
        cube3.position.x=1;
        cube3.position.y=1;
        cube3.scale.y=2;
        scene.add(cube3);
        var cube4=new THREE.Mesh(geometry,material);
        cube4.scale.z=100;
        cube4.scale.x=100;
        scene.add(cube4);

        camera.position.z = this.state.z;
        camera.position.x=0.0;
        camera.position.y=4.0;
        camera.rotation.x=-3.14/12;
        //camera.rotation.x=0.2;
        var animate = function () {
            requestAnimationFrame( animate );
            //cube.rotation.x += 0.01;
            //cube.rotation.y += 0.01;
            renderer.render( scene, camera );
        };
        animate();
    }
    render() {
    return (
        <div>

        <div id={"threejs"} ></div>
        <div style={ {height: 400 }} id={"mychart"}></div>

        </div>
    );
  }
}


export default App;





