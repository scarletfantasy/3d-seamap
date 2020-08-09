import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import * as THREE from "three";
const vertexshader='' +
    'void main() {\n' +
    '\n' +
    'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n' +
    '\n' +
    '    }';
const fragmentshader='uniform vec3 color;\n' +
    '\n' +
    'void main() {\n' +
    '\tgl_FragColor = vec4( 0.0,1.0,0.0, 1.0 );\n' +
    '}';
class App extends Component{

    constructor() {
        super();
        this.handlekeypress=this.handlekeypress.bind(this);
        this.state={x:0.0,z:5.0};

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

    componentDidMount() {
        //console.log(this.state.z);
        document.addEventListener("keydown", this.handlekeypress);
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10);
        this.camera=camera;
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        var div=document.getElementById("threejs");
        div.appendChild((renderer.domElement));
        document.body.appendChild( renderer.domElement );
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material= new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color( 0xffffff ) },
            },
            vertexShader: vertexshader,
            fragmentShader: fragmentshader,
        });
        console.log(vertexshader);
        //var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var cube = new THREE.Mesh( geometry, material );
        var cube1=new THREE.Mesh(geometry,material);
        cube1.position.z=-1;
        cube1.scale.y=2;
        scene.add(cube1);
        scene.add( cube );
        camera.position.z = this.state.z;
        camera.position.x=0.0;
        camera.position.y=2.0;
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
        <div onKeyDown={this.handlekeypress} tabIndex={"0"}>
        <div>helloworld</div>

        <div id={"threejs"} ></div>
        </div>
    );
  }
}


export default App;





