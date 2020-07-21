import React, { useEffect, useState } from "react";
import { a, useTransition } from "react-spring";
import { useLoader } from "react-three-fiber";
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Space({ url }) {
  const model = useLoader(GLTFLoader, url, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco-gltf/");
    loader.setDRACOLoader(dracoLoader);
  });
  return (
    <group
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -7, 0]}
      scale={[7, 7, 7]}
    >
      {model.map(({ geometry, material }) => {
        // There are two buffergeometries in this gltf
        // Save some GPU by rendering the rocks a little less vivd than the rocket
        const rocks = geometry.index.count < 80000;
        const Material = rocks ? "meshLambertMaterial" : "meshStandardMaterial";
        return (
          <mesh
            key={geometry.uuid}
            rotation={[Math.PI / 13.5, -Math.PI / 5.8, Math.PI / 5.6]}
            geometry={geometry}
            castShadow={!rocks}
            receiveShadow={!rocks}
          >
            <Material attach="material" map={material.map} roughness={1} />
          </mesh>
        );
      })}
    </group>
  );
}

function Loading() {
  const [finished, set] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    THREE.DefaultLoadingManager.onLoad = () => set(true);
    THREE.DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) =>
      setWidth((itemsLoaded / itemsTotal) * 200);
  }, []);

  const props = useTransition(finished, null, {
    from: { opacity: 1, width: 0 },
    leave: { opacity: 0 },
    update: { width },
  });

  return props.map(
    ({ item: finished, key, props: { opacity, width } }) =>
      !finished && (
        <a.div className="loading" key={key} style={{ opacity }}>
          <div className="loading-bar-container">
            <a.div className="loading-bar" style={{ width }} />
          </div>
        </a.div>
      )
  );
}

export default Space;
