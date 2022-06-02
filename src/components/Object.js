import { Canvas, useFrame } from "@react-three/fiber";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  useBox,
  Physics,
  usePlane,
  useContactMaterial,
} from "@react-three/cannon";

const Object = () => {
  const [addSpeed, setAddSpeed] = useState(1);
 console.log(useContactMaterial)
  return (
    <div style={{ width: "800px", height: "600px" }}>
      <div>
        <button onClick={() => setAddSpeed(addSpeed + 1)}>+</button>
        {addSpeed}
      </div>
      We're in 3D component
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight />
        <Physics
          defaultContactMaterial={{
            friction: 1,
            restitution: 0,
            contactEquationStiffness: 1e7,
            contactEquationRelaxation: 1,
            frictionEquationStiffness: 1e7,
            frictionEquationRelaxation: 2,
           
          }}
        >
          
          <Box speed={addSpeed} />
          <Plane />
        </Physics>
      </Canvas>
    </div>
  );
};

export default Object;

const Box = ({ speed }) => {
  const [boxRef] = useBox(() => ({ mass: 10, position: [0, 4, 0] }));

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    // boxRef.current.rotation.y = a * speed;
  });

  return (
    <mesh ref={boxRef}>
      <boxBufferGeometry position={[0, 4, 0]} />
      <meshPhongMaterial color="royalblue" />
    </mesh>
  );
};

const Plane = () => {
  const [planeRef] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    type: "Static",
  }));
  return (
    <mesh ref={planeRef} position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry args={[10, 10]} />
      <meshPhongMaterial color="royalblue" />
    </mesh>
  );
};
