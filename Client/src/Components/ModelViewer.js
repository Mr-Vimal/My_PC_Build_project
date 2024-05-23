// // ModelViewer.js
// import React, { Suspense } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, useGLTF } from '@react-three/drei';

// function Model({ url }) {
//     const { scene } = useGLTF(url);
//     return <primitive object={scene} />;
// }

// export default function ModelViewer({ modelUrl }) {
//     return (
//         <Canvas>
//             <ambientLight intensity={0.5} />
//             <directionalLight position={[10, 10, 5]} intensity={1} />
//             <Suspense fallback={null}>
//                 <Model url={modelUrl} />
//             </Suspense>
//             <OrbitControls />
//         </Canvas>
//     );
// }
