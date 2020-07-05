import React, { Component, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Controls from "./Controls";
import bumperURL from "./images/marsbump1k.jpg";
import marsURL from "./images/marsmap1k.jpg";
import "./Model.css";
import StartPage from "./Startpage";

console.log(bumperURL);
const SpaceShip = () => {
  const [model, setModel] = useState();

  useEffect(() => {
    new GLTFLoader().load("/scene.gltf", setModel);
  });

  return model ? <primitive object={model.scene} /> : null;
};

class Model extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    const data = new Array(1000).fill(0).map((d, id) => ({ id }));
    this.setState({ data });
  }

  render() {
    const { data } = this.state;
    //<SpaceShip />
    //
    //console.log(data);
    return (
      //  Sonali startpage.jsx controls the design element of the page.

      <>
        <StartPage />
        <Canvas camera={{ position: [0, 0, 20] }}>
          <ambientLight intensity={1.0} />
          <pointLight intensity={0.9} position={[-10, -25, -10]} />
          <spotLight
            castShadow
            intensity={0.25}
            angle={Math.PI / 8}
            position={[25, 25, 15]}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <Controls />
          <Mars position={[1.2, 0, 0]} />
        </Canvas>
      </>
    );
  }
}

function Mars(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  //const clothTexture = useLoader(TextureLoader(), marsURL);
  //console.log(clothTexture);
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
<<<<<<< HEAD
  const imgmars = useMemo(() => new THREE.TextureLoader().load(marsURL), [
    marsURL,
  ]);
  const bumpmap = useMemo(() => new THREE.TextureLoader().load(bumperURL), [
=======
  const imgmars = useMemo(() => new TextureLoader().load(marsURL), [marsURL]);
  const bumpmap1 = useMemo(() => new TextureLoader().load(bumperURL), [
>>>>>>> master
    bumperURL,
  ]);
  console.log(marsURL);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.y += 0.006));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <sphereGeometry attach="geometry" args={[6, 26, 26]} />
      <meshStandardMaterial
        attach="material"
        //color={hovered ? "hotpink" : "orange"}
        map={imgmars}
        bumpmap={bumpmap1}
        bumpscale={0.1}
      />
    </mesh>
  );
}

export default Model;
