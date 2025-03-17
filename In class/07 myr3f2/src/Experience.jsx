import { useFrame } from "@react-three/fiber"
import {
    Float, Text, Html, PivotControls,
    TransformControls, OrbitControls,
    ContactShadows, PresentationControls,
    Environment, useGLTF
} from '@react-three/drei'
import { useRef } from 'react'
import CustomObject from "./CustomObject.jsx"
import { button, useControls } from 'leva'
import { Perf } from 'r3f-perf'

export default function Experience() {
    // const cubeRef = useRef()
    // const groupRef = useRef()
    // useFrame((state, delta) => {
    //     cubeRef.current.rotation.y += delta
    //     groupRef.current.rotation.y += delta
    // })

    const computer = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')
    const { perfVisible } = useControls({
        perfVisible: true
    })

    const cube = useRef()
    const sphere = useRef()

    // const {position, color, visible} = useControls('Sphere Settings', {
    //     position: {value: { x: -2, y: 0, z: 0 }, step: 0.01},
    //     color: 'hsl(100deg, 100%, 50%)',
    //     visible: true,
    //     myInterval: { min: 0, max: 10, value: [4, 5] },
    //     clickMe: button(() => { console.log('ok') }),
    //     choice: { options: ['a', 'b', 'c'] }
    // })
    // const {scale} = useControls('Cube Settings', {
    //     scale: {
    //         value: 1.5,
    //         step: 0.01,
    //         min: 0,
    //         max: 5
    //     }
    // })

    return <>
        {perfVisible ? <Perf position='top-left' /> : null}

        <OrbitControls makeDefault />
        <directionalLight
            position={[1, 2, 3]}
            intensity={4.5} />
        <ambientLight intensity={1.5} />

        {/* text */}
        <Float
            speed={5}
            floatIntensity={10}
        >
            <Text
                font="./PollerOne-Regular.woff"
                fontSize={1}
                color="salmon"
                position-y={2}
                maxWidth={2}
                textAlign='center'
            >
                Web Programming
            </Text>
        </Float>

        {/* sphere*/}
        <PivotControls
            anchor={[0, 0, 0]}
            depthTest={false}
            lineWidth={4}
            axisColors={['red', 'green', 'blue']}
            scale={100}
            fixed={true}
        >
            <mesh ref={sphere} position-x={- 2}>
                {/* <mesh ref={sphere} position={[position.x, position.y, position.z]} visible={visible} > */}
                <sphereGeometry />
                <meshStandardMaterial color="orange" />

                {/* given text for sphere */}
                <Html
                    position={[1, 1, 0]}
                    wrapperClass="label"
                    center
                    distanceFactor={6}
                    occlude={[sphere, cube]}
                >That's a sphere eiei</Html>
            </mesh>
        </PivotControls>

        {/* cube control */}
        <mesh ref={cube} position-x={2} scale={1.5}>
            {/* <mesh ref={cube} position-x={2} scale={scale}> */}
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>
        <TransformControls object={cube} mode="translate" />

        {/* plane */}
        <mesh position-y={- 1} rotation-x={- Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        {/* computer] */}
        <Environment preset="city" />
        <PresentationControls
            global rotation={[0.13, 0.1, 0]} polar={[- 0.4, 0.2]} azimuth={[- 1, 0.75]}
            config={{ mass: 2, tension: 400 }} snap={{ mass: 4, tension: 400 }}
        >
            <Float rotationIntensity={0.4} >
                <primitive object={computer.scene} position-y={- 1.2} />
            </Float>
        </PresentationControls>
        <ContactShadows position-y={- 1.4} opacity={0.4} scale={5} blur={2.4} />

        {/* website in computer */}
        <primitive
            object={computer.scene}
            position-y={- 1.2}
            rotation-x={0.13}
        >
            <Html
                transform
                wrapperClass="htmlScreen"
                distanceFactor={1.17}
                position={[0, 1.56, - 1.4]}
                rotation-x={- 0.256}
            >
                <iframe src="https://fibo.kmutt.ac.th" />
            </Html>
        </primitive>
        <Text
            font="./PollerOne-Regular.woff"
            fontSize={1}
            color="lightgreen"
            position={[2, 0.75, 0.75]}
            rotation-y={- 1.25}
            maxWidth={2}
            textAlign='center'
        >
            FIBO KMUTT
        </Text>
    </>
}

