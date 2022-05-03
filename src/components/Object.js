import { Canvas, useFrame } from "@react-three/fiber";
import { useState, useEffect, useRef, useCallback } from "react";

const Object = () => {
  const [addSpeed, setAddSpeed] = useState(1);

  return (
    <div style={{ width: "800px", height: "600px" }}>
      <div>
        <button onClick={() => setAddSpeed(addSpeed + 1)}>+</button>
        {addSpeed}
      </div>
      We're in 3D component
      <Canvas>
        <Box speed={addSpeed} />
        <ambientLight intensity={0.1} />
        <directionalLight />
      </Canvas>
    </div>
  );
};

export default Object;

const Box = ({speed}) => {
  const myMesh = useRef();

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.y = a * speed;
  });

  return (
    <mesh ref={myMesh}>
      <boxBufferGeometry />
      <meshPhongMaterial color="royalblue" />
    </mesh>
  );
};
