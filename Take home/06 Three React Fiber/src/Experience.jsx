import {
    ContactShadows, PresentationControls,
    Environment, useGLTF,
    OrbitControls, Text, Html
} from '@react-three/drei'


export default function Experience() {
    // https://market.pmnd.rs/
    const computer = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf')
    const table = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/table/model.gltf');
    const book = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/open-book/model.gltf');
    const bookcase = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bookcase-wide/model.gltf');
    const pizza = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/pizza/model.gltf');
    const cactus = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/cactus/model.gltf');
    const iPhone = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/iphone-x/model.gltf');
    const cup = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/mug/model.gltf');

    return <>
        <OrbitControls makeDefault />
        <Environment preset="city" />

        {/* ------------ Object ------------ */}
        <PresentationControls
            global rotation={[0.13, 0.1, 0]} polar={[- 0.4, 0.2]} azimuth={[- 1, 0.75]}
            config={{ mass: 2, tension: 400 }} snap={{ mass: 4, tension: 400 }}
        >
            <primitive object={table.scene} position={[0, -1.5, 0]} scale={3.0} />
            <primitive object={computer.scene} position={[0, 3.1, 0.3]} scale={1.0} />
            <primitive object={book.scene} position={[3.5, 3.6, 0.5]} scale={3.0} />
            <primitive object={pizza.scene} position={[-3.0, 3.5, 0.5]} scale={2.5} />
            <primitive object={cactus.scene} position={[-4.5, 3.5, -1.0]} scale={0.5} />
            <primitive object={iPhone.scene} position={[2.5, 3.7, -1.0]} scale={0.3} />
            <primitive object={cup.scene} position={[4.5, 3.4, -1.0]} scale={0.5} />
            <primitive object={bookcase.scene} position={[3.0, 0.0, -4.0]} scale={4.0} />

            {/* ------------ Message ------------ */}
            <Html
                position={[-1, 6.3, -1.5]} 
                wrapperClass="label"
                center
                distanceFactor={6}
                style={{
                    background: 'rgb(223, 217, 50)', 
                    color: 'black',
                    padding: '15px 40px',
                    borderRadius: '20px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    width: '200px',
                    whiteSpace: 'nowrap'
                }}
            >
                Dr. SURIYA : STUDY!!!
            </Html>

            {/* ------------ Website ------------ */}
            <Html
                position={[-0.825, 5.2, -1.2]}
                rotation-x={-0.25}
                transform
                distanceFactor={1.2}
                style={{ width: '450px', height: '280px' }}
            >
                <iframe
                    src="https://app.leb2.org/class/858352/online-course"
                    width="1000"
                    height="650"
                />
            </Html>
            <Html
                position={[3.0125, 4.105, -1.0]}
                rotation-x={0.0}
                transform
                distanceFactor={1.2}
                style={{ width: '450px', height: '280px' }}
            >
                <iframe
                    src="https://translate.google.co.th"
                    width="140"
                    height="300"
                />
            </Html>

            {/* ------------ Text ------------ */}
            <Text
                font="./PollerOne-Regular.woff"
                fontSize={1}
                color='rgb(50, 52, 49)'
                position={[2, 9.75, -5.75]}
                rotation-y={0.0}
                maxWidth={2}
                textAlign='center'
            >
                THITIPORN SUWANNAWONG
            </Text>
        </PresentationControls>

        {/* ------------ Shadow ------------ */}
        <ContactShadows 
            position={[0, -1.55, 0]} 
            opacity={0.85}  
            scale={15} 
            blur={3.5}
            far={5} 
            resolution={1024} 
        />
    </>
}