import React, { Component, useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import Controls from "./Controls";
import "./Model.css";
import StartPage from "./Startpage";

var THREE = require("three");

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
    //console.log(data);
    return (
      //  Sonali startpage.jsx controls the design element of the page.
      <>
        <StartPage />
        <Canvas camera={{ position: [0, 0, 20] }}>
          <ambientLight />
          <Controls />
          <Box position={[1.2, 0, 0]} />
        </Canvas>
      </>
    );
  }
}

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.y += 0.01));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <sphereGeometry attach="geometry" args={[6, 13, 13]} />
      <meshPhongMaterial
        attach="material"
        color={hovered ? "hotpink" : "orange"}
      />
    </mesh>
  );
}

export default Model;
