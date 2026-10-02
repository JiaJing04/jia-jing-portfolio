"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Html, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/* =========================================================
   SCENE RULES

   - The desk top is y = 0.
   - Every object sits on it.
   - +z faces the camera.
   - +x faces right.
   - Canvas is transparent.
   ========================================================= */

type V3 = [number, number, number];

const C = {
  desk: "#e4e0d5",
  mat: "#d6cfd6",
  lid: "#eae8e3",
  base: "#efeee9",
  key: "#fbfaf7",
  pad: "#dcdad3",
  screen: "#333c47",

  cup: "#a9c4d9",
  saucer: "#f2f0e9",
  tea: "#8a7360",

  strap: "#c3b5e3",
  clip: "#c9cbd0",

  badge: "#f5f3ec",
  badgeBand: "#ecb9ae",
  badgeSlot: "#cfcac0",

  panel: "#d7e0e6",
  trim: "#d9d4c8",
  wood: "#b7a68f",

  lampBase: "#d6d2c8",
  lampPole: "#aca595",
  lampShade: "#f5f1e6",
};

/* =========================================================
   CAPYBARA COLORS
   ========================================================= */

const CAPI = {
  fur: "#a77b59",
  head: "#b88a67",
  muzzle: "#c69b76",
  belly: "#dfc2a1",
  feet: "#89634d",
  innerEar: "#d2a88f",
  eye: "#211b18",
  nose: "#3a2b25",
  cheek: "#e5a49a",
};

/* =========================================================
   SMALL HELPER
   ========================================================= */

function Blob({
  r,
  position,
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
  color,
  roughness = 0.95,
  cast = false,
}: {
  r: number;
  position: V3;
  scale?: V3;
  rotation?: V3;
  color: string;
  roughness?: number;
  cast?: boolean;
}) {
  return (
    <mesh
      position={position}
      scale={scale}
      rotation={rotation}
      castShadow={cast}
    >
      <sphereGeometry args={[r, 32, 24]} />
      <meshStandardMaterial
        color={color}
        roughness={roughness}
      />
    </mesh>
  );
}

/* =========================================================
   LAPTOP
   ========================================================= */

const CODE_LINES = [
  { indent: 0, width: 0.8, color: "#c9b8ea" },
  { indent: 1, width: 1.2, color: "#eab6a8" },
  { indent: 1, width: 0.9, color: "#a9cf9f" },
  { indent: 2, width: 1.1, color: "#e8e4da" },
  { indent: 2, width: 0.65, color: "#a7cde3" },
  { indent: 1, width: 0.5, color: "#eab6a8" },
  { indent: 0, width: 0.3, color: "#c9b8ea" },
];

function Keys() {
  const ref = useRef<THREE.InstancedMesh>(null);

  useLayoutEffect(() => {
    const mesh = ref.current;

    if (!mesh) return;

    const dummy = new THREE.Object3D();

    let i = 0;

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 12; col++) {
        dummy.position.set(
          (col - 5.5) * 0.165,
          0.115,
          -0.5 + row * 0.15
        );

        dummy.updateMatrix();
        mesh.setMatrixAt(i++, dummy.matrix);
      }
    }

    mesh.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, 48]}
      castShadow
    >
      <boxGeometry args={[0.135, 0.03, 0.115]} />
      <meshStandardMaterial
        color={C.key}
        roughness={0.7}
      />
    </instancedMesh>
  );
}

function Laptop() {
  return (
    <group>
      {/* laptop base */}

      <RoundedBox
        args={[2.2, 0.1, 1.45]}
        radius={0.04}
        smoothness={4}
        position={[0, 0.05, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={C.base}
          roughness={0.55}
        />
      </RoundedBox>

      <Keys />

      {/* space bar */}

      <mesh position={[0, 0.115, 0.1]}>
        <boxGeometry args={[0.95, 0.03, 0.115]} />
        <meshStandardMaterial
          color={C.key}
          roughness={0.7}
        />
      </mesh>

      {/* trackpad */}

      <RoundedBox
        args={[0.8, 0.012, 0.44]}
        radius={0.005}
        smoothness={2}
        position={[0, 0.106, 0.46]}
      >
        <meshStandardMaterial
          color={C.pad}
          roughness={0.5}
        />
      </RoundedBox>

      {/* laptop lid */}

      <group
        position={[0, 0.1, -0.7]}
        rotation={[-0.28, 0, 0]}
      >
        <RoundedBox
          args={[2.2, 1.4, 0.07]}
          radius={0.03}
          smoothness={4}
          position={[0, 0.7, 0]}
          castShadow
        >
          <meshStandardMaterial
            color={C.lid}
            roughness={0.5}
          />
        </RoundedBox>

        {/* screen */}

        <mesh position={[0, 0.7, 0.04]}>
          <boxGeometry args={[2.0, 1.2, 0.01]} />
          <meshBasicMaterial color={C.screen} />
        </mesh>

        {/* code lines */}

        {CODE_LINES.map((line, i) => (
          <mesh
            key={i}
            position={[
              -0.82 +
                line.indent * 0.2 +
                line.width / 2,
              1.14 - i * 0.145,
              0.05,
            ]}
          >
            <boxGeometry
              args={[line.width, 0.06, 0.006]}
            />
            <meshBasicMaterial color={line.color} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* =========================================================
   TEA CUP
   ========================================================= */

function TeaCup() {
  const [hovered, setHovered] = useState(false);

  return (
    <group
      position={[-2.25, 0, 0.5]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* saucer */}

      <mesh
        position={[0, 0.025, 0]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry
          args={[0.46, 0.4, 0.05, 40]}
        />
        <meshStandardMaterial
          color={C.saucer}
          roughness={0.6}
        />
      </mesh>

      <group position={[0, 0.05, 0]}>
        {/* cup */}

        <mesh
          position={[0, 0.24, 0]}
          castShadow
        >
          <cylinderGeometry
            args={[0.27, 0.23, 0.48, 40, 1, true]}
          />
          <meshStandardMaterial
            color={C.cup}
            roughness={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* rim */}

        <mesh
          position={[0, 0.48, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry
            args={[0.27, 0.016, 12, 40]}
          />
          <meshStandardMaterial
            color={C.cup}
            roughness={0.5}
          />
        </mesh>

        {/* tea */}

        <mesh
          position={[0, 0.41, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <circleGeometry args={[0.25, 40]} />
          <meshStandardMaterial
            color={C.tea}
            roughness={0.3}
          />
        </mesh>

        {/* handle */}

        <mesh
          position={[0.255, 0.24, 0]}
          rotation={[0, 0, -Math.PI / 2]}
          castShadow
        >
          <torusGeometry
            args={[0.12, 0.03, 12, 24, Math.PI]}
          />
          <meshStandardMaterial
            color={C.cup}
            roughness={0.5}
          />
        </mesh>
      </group>

      {hovered && (
        <Html
          position={[0, 0.85, 0]}
          center
          zIndexRange={[30, 0]}
          pointerEvents="none"
        >
          <div role="tooltip" className="pointer-events-none select-none whitespace-nowrap rounded-full bg-ink px-3.5 py-1.5 text-[12px] text-paper shadow-lg">
            Fun fact: I love Milo
          </div>
        </Html>
      )}
    </group>
  );
}

/* =========================================================
   WALL
   ========================================================= */

function Wall() {
  return (
    <group>
      <RoundedBox
        args={[6.4, 2.0, 0.14]}
        radius={0.06}
        smoothness={4}
        position={[0, 0.98, -2.03]}
        receiveShadow
      >
        <meshStandardMaterial
          color={C.panel}
          roughness={0.92}
        />
      </RoundedBox>

      <RoundedBox
        args={[6.4, 0.16, 0.04]}
        radius={0.015}
        smoothness={3}
        position={[0, 0.08, -1.94]}
        receiveShadow
      >
        <meshStandardMaterial
          color={C.trim}
          roughness={0.9}
        />
      </RoundedBox>
    </group>
  );
}

/* =========================================================
   LANYARD
   ========================================================= */

function Disc({
  r,
  position,
  color,
  scaleX = 1,
}: {
  r: number;
  position: V3;
  color: string;
  scaleX?: number;
}) {
  return (
    <mesh
      position={position}
      rotation={[Math.PI / 2, 0, 0]}
      scale={[scaleX, 1, 1]}
    >
      <cylinderGeometry
        args={[r, r, 0.004, 28]}
      />
      <meshStandardMaterial
        color={color}
        roughness={0.8}
      />
    </mesh>
  );
}

function Lanyard() {
  const swing = useRef<THREE.Group>(null);

  const strapShape = useMemo(() => {
    const shape = new THREE.Shape();

    shape.absellipse(
      0,
      0,
      0.2,
      0.45,
      0,
      Math.PI * 2,
      false,
      0
    );

    const hole = new THREE.Path();

    hole.absellipse(
      0,
      0,
      0.14,
      0.39,
      0,
      Math.PI * 2,
      true,
      0
    );

    shape.holes.push(hole);

    return shape;
  }, []);

  useFrame(({ clock }) => {
    if (swing.current) {
      swing.current.rotation.z =
        Math.sin(clock.elapsedTime * 1.1) *
        0.035;
    }
  });

  return (
    <group position={[2.5, 0, -1.96]}>
      <group position={[0, 1.7, 0]}>
        {/* peg */}

        <mesh
          position={[0, 0, 0.09]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
        >
          <cylinderGeometry
            args={[0.045, 0.045, 0.18, 20]}
          />
          <meshStandardMaterial
            color={C.wood}
            roughness={0.8}
          />
        </mesh>

        <mesh
          position={[0, 0, 0.18]}
          castShadow
        >
          <sphereGeometry args={[0.07, 24, 16]} />
          <meshStandardMaterial
            color={C.wood}
            roughness={0.8}
          />
        </mesh>

        <group ref={swing}>
          {/* invisible hit area */}

          <mesh position={[0, -0.74, 0.06]}>
            <boxGeometry args={[0.5, 1.7, 0.1]} />
            <meshBasicMaterial
              transparent
              opacity={0}
              depthWrite={false}
            />
          </mesh>

          {/* strap */}

          <mesh
            position={[0, -0.345, 0.05]}
            castShadow
          >
            <extrudeGeometry
              args={[
                strapShape,
                {
                  depth: 0.012,
                  bevelEnabled: false,
                  curveSegments: 48,
                },
              ]}
            />

            <meshStandardMaterial
              color={C.strap}
              roughness={0.85}
            />
          </mesh>

          {/* clip */}

          <RoundedBox
            args={[0.12, 0.15, 0.03]}
            radius={0.01}
            smoothness={3}
            position={[0, -0.8, 0.06]}
            castShadow
          >
            <meshStandardMaterial
              color={C.clip}
              roughness={0.35}
              metalness={0.4}
            />
          </RoundedBox>

          {/* badge */}

          <group position={[0, -1.22, 0.06]}>
            <RoundedBox
              args={[0.5, 0.72, 0.025]}
              radius={0.011}
              smoothness={3}
              castShadow
            >
              <meshStandardMaterial
                color={C.badge}
                roughness={0.6}
              />
            </RoundedBox>

            <mesh
              position={[0, 0.28, 0.0145]}
            >
              <boxGeometry args={[0.5, 0.16, 0.004]} />
              <meshStandardMaterial
                color={C.badgeBand}
                roughness={0.7}
              />
            </mesh>

            <mesh
              position={[0, 0.3, 0.017]}
            >
              <boxGeometry
                args={[0.11, 0.024, 0.004]}
              />
              <meshStandardMaterial
                color={C.badgeSlot}
                roughness={0.7}
              />
            </mesh>

            {/* mini capybara portrait */}

            {/* <Disc
              r={0.045}
              position={[-0.075, 0.13, 0.0145]}
              color={CAPI.fur}
            />

            <Disc
              r={0.045}
              position={[0.075, 0.13, 0.0145]}
              color={CAPI.fur}
            />

            <Disc
              r={0.105}
              position={[0, 0.05, 0.0165]}
              color={CAPI.head}
            />

            <Disc
              r={0.045}
              position={[0, 0.015, 0.0195]}
              color={CAPI.belly}
              scaleX={1.25}
            />

            <Disc
              r={0.009}
              position={[-0.032, 0.07, 0.020]}
              color={CAPI.eye}
            />

            <Disc
              r={0.009}
              position={[0.032, 0.07, 0.020]}
              color={CAPI.eye}
            />

            <Disc
              r={0.018}
              position={[0, 0.025, 0.021]}
              color={CAPI.nose}
              scaleX={1.25}
            /> */}

            {/* =================================================
    CAPYBARA NAME TAG PORTRAIT
    ================================================= */}

{/* ears */}
<Disc
  r={0.038}
  position={[-0.075, 0.135, 0.0145]}
  color={CAPI.fur}
/>

<Disc
  r={0.038}
  position={[0.075, 0.135, 0.0145]}
  color={CAPI.fur}
/>

{/* inner ears */}
<Disc
  r={0.022}
  position={[-0.075, 0.135, 0.019]}
  color={CAPI.innerEar}
/>

<Disc
  r={0.022}
  position={[0.075, 0.135, 0.019]}
  color={CAPI.innerEar}
/>

{/* capybara head */}
<Disc
  r={0.095}
  position={[0, 0.07, 0.0165]}
  color={CAPI.head}
  scaleX={1.05}
/>

{/* long muzzle */}
<Disc
  r={0.055}
  position={[0, 0.025, 0.020]}
  color={CAPI.muzzle}
  scaleX={1.35}
/>

{/* tiny eyes */}
<Disc
  r={0.007}
  position={[-0.035, 0.085, 0.023]}
  color={CAPI.eye}
/>

<Disc
  r={0.007}
  position={[0.035, 0.085, 0.023]}
  color={CAPI.eye}
/>

{/* BIG capybara nose */}
<Disc
  r={0.019}
  position={[0, 0.018, 0.026]}
  color={CAPI.nose}
  scaleX={1.35}
/>

{/* tiny orange on head */}
<Disc
  r={0.025}
  position={[0.035, 0.145, 0.024]}
  color="#ed9a35"
  scaleX={1.05}
/>

{/* orange leaf */}
<Disc
  r={0.012}
  position={[0.058, 0.164, 0.026]}
  color="#78945f"
  scaleX={1.5}
/>

            {/* name lines */}

            <mesh
              position={[0, -0.17, 0.0145]}
            >
              <boxGeometry
                args={[0.3, 0.036, 0.004]}
              />
              <meshStandardMaterial
                color={C.screen}
                roughness={0.8}
              />
            </mesh>

            <mesh
              position={[0, -0.25, 0.0145]}
            >
              <boxGeometry
                args={[0.19, 0.028, 0.004]}
              />
              <meshStandardMaterial
                color="#c9b8ea"
                roughness={0.8}
              />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

/* =========================================================
   PHOTO STRIPS
   ========================================================= */

function PhotoStrip({
  position,
  rotation = 0,
  frameColor = "#fbfaf6",
  photoColors,
}: {
  position: V3;
  rotation?: number;
  frameColor?: string;
  photoColors: string[];
}) {
  const photoH = 0.3;
  const gap = 0.03;
  const stripW = 0.4;

  const stripH =
    photoColors.length * photoH +
    (photoColors.length + 1) * gap;

  return (
    <group
      position={position}
      rotation={[0, 0, rotation]}
    >
      {/* tape */}

      <mesh
        position={[
          0,
          stripH / 2 + 0.015,
          0.014,
        ]}
        rotation={[0, 0, 0.1]}
      >
        <boxGeometry args={[0.15, 0.045, 0.004]} />
        <meshStandardMaterial
          color="#f0e2d4"
          roughness={0.9}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* frame */}

      <RoundedBox
        args={[stripW, stripH, 0.012]}
        radius={0.01}
        smoothness={2}
        castShadow
      >
        <meshStandardMaterial
          color={frameColor}
          roughness={0.8}
        />
      </RoundedBox>

      {/* photos */}

      {photoColors.map((color, i) => {
        const y =
          stripH / 2 -
          gap -
          photoH / 2 -
          i * (photoH + gap);

        return (
          <mesh
            key={i}
            position={[0, y, 0.008]}
          >
            <planeGeometry
              args={[stripW - gap * 2, photoH]}
            />
            <meshStandardMaterial
              color={color}
              roughness={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
}


function PhotoStrips() {
  const [hovered, setHovered] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showCard = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setHovered(true);
  };

  const hideCard = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setHovered(false), 400);
  };

  useEffect(() => () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
  }, []);

  return (
    <group
      onPointerOver={(e) => {
        e.stopPropagation();
        showCard();
      }}
      onPointerOut={hideCard}
    >
      <PhotoStrip
        position={[1.0, 1.2, -1.94]}
        rotation={-0.05}
        photoColors={[
          "#ecb9ae",
          "#c3b5e3",
          "#a9c4d9",
          "#f0d9c9",
        ]}
      />

      <PhotoStrip
        position={[1.44, 1.25, -1.94]}
        rotation={0.07}
        photoColors={[
          "#d6cfd6",
          "#ecb9ae",
          "#c3b5e3",
          "#a9c4d9",
        ]}
      />

      {hovered && (
        <Html
          position={[1.22, 2.2, -1.89]}
          center
          zIndexRange={[30, 0]}
          pointerEvents="auto"
        >
          <div
            onPointerEnter={showCard}
            onPointerLeave={hideCard}
            onFocus={showCard}
            onBlur={hideCard}
            className="w-64 max-w-[80vw] rounded-2xl bg-ink px-3.5 py-2.5 text-center text-[12px] leading-relaxed text-paper shadow-lg"
          >
            I can never resist a photobooth! I built Pocket Memories to bring
            a little of that magic with me wherever I go.
            <a
              href="https://pocket-memories-one.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block font-medium underline underline-offset-4 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Try Pocket Memories ↗
            </a>
          </div>
        </Html>
      )}
    </group>
  );
}

/* =========================================================
   BOOKS
   ========================================================= */

const BOOKS: {
  size: V3;
  y: number;
  rot: number;
  color: string;
}[] = [
  {
    size: [1.2, 0.16, 0.84],
    y: 0.08,
    rot: 0.05,
    color: "#a9c1a1",
  },
  {
    size: [1.05, 0.15, 0.76],
    y: 0.235,
    rot: -0.12,
    color: "#f0c7b0",
  },
  {
    size: [0.92, 0.14, 0.68],
    y: 0.38,
    rot: 0.1,
    color: "#b5c9dc",
  },
];

function Books() {
  return (
    <group
      position={[1.65, 0, -0.9]}
      rotation={[0, -0.2, 0]}
    >
      {BOOKS.map((b, i) => (
        <group
          key={i}
          position={[0, b.y, 0]}
          rotation={[0, b.rot, 0]}
        >
          <RoundedBox
            args={b.size}
            radius={0.03}
            smoothness={3}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              color={b.color}
              roughness={0.85}
            />
          </RoundedBox>

          {/* page edges */}

          <mesh>
            <boxGeometry
              args={[
                b.size[0] - 0.06,
                b.size[1] - 0.05,
                b.size[2] + 0.014,
              ]}
            />

            <meshStandardMaterial
              color="#f7f1e6"
              roughness={1}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* =========================================================
   ORANGE
   ========================================================= */

function Orange() {
  return (
    <group
      position={[0.02, 0.43, 0]}
      rotation={[0, 0, -0.12]}
    >
      {/* fruit */}

      <mesh castShadow>
        <sphereGeometry
          args={[0.16, 32, 24]}
        />

        <meshStandardMaterial
          color="#ed9a35"
          roughness={0.9}
        />
      </mesh>

      {/* subtle flattened shape */}

      <mesh scale={[1, 0.9, 1]}>
        <sphereGeometry
          args={[0.145, 32, 24]}
        />

        <meshStandardMaterial
          color="#f0a044"
          roughness={0.95}
        />
      </mesh>

      {/* stem */}

      <mesh
        position={[0, 0.145, 0]}
        rotation={[0, 0, 0.15]}
        castShadow
      >
        <cylinderGeometry
          args={[0.018, 0.022, 0.07, 12]}
        />

        <meshStandardMaterial
          color="#72543b"
          roughness={1}
        />
      </mesh>

      {/* leaf */}

      <mesh
        position={[0.075, 0.165, 0]}
        rotation={[0, 0, -0.45]}
        scale={[1.2, 0.55, 0.2]}
        castShadow
      >
        <sphereGeometry
          args={[0.075, 20, 12]}
        />

        <meshStandardMaterial
          color="#78945f"
          roughness={1}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   CAPYBARA
   ========================================================= */

function Capybara() {
  const body = useRef<THREE.Mesh>(null);
  const head = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    /* gentle head movement */

    if (head.current) {
      head.current.rotation.z =
        Math.sin(t * 0.8) * 0.025;

      head.current.rotation.x =
        Math.sin(t * 0.55) * 0.012;
    }

    /* subtle breathing */

    if (body.current) {
      const breathing =
        1 + Math.sin(t * 1.5) * 0.012;

      body.current.scale.y =
        0.97 * breathing;
    }
  });

  return (
    <group
      position={[1.5, 0, 0.75]}
      rotation={[0, 0.18, 0]}
      scale={0.9}
    >
      {/* =================================================
          BODY
          ================================================= */}

      <mesh
        ref={body}
        position={[0, 0.42, 0]}
        scale={[1.18, 0.9, 0.92]}
        castShadow
      >
        <sphereGeometry
          args={[0.46, 40, 32]}
        />

        <meshStandardMaterial
          color={CAPI.fur}
          roughness={1}
        />
      </mesh>

      {/* belly */}

      <Blob
        r={0.30}
        position={[0, 0.39, 0.34]}
        scale={[1.05, 0.9, 0.45]}
        color={CAPI.belly}
        roughness={1}
      />

      {/* =================================================
          FEET
          ================================================= */}

      {[-1, 1].map((s) => (
        <Blob
          key={s}
          r={0.15}
          position={[
            s * 0.25,
            0.10,
            0.34,
          ]}
          scale={[1.15, 0.62, 1.25]}
          color={CAPI.feet}
          roughness={1}
          cast
        />
      ))}

      {/* =================================================
          SHORT ARMS
          ================================================= */}

      {[-1, 1].map((s) => (
        <mesh
          key={s}
          position={[
            s * 0.40,
            0.48,
            0.19,
          ]}
          rotation={[
            -0.12,
            0,
            -s * 0.25,
          ]}
          castShadow
        >
          <capsuleGeometry
            args={[0.075, 0.24, 8, 16]}
          />

          <meshStandardMaterial
            color={CAPI.fur}
            roughness={1}
          />
        </mesh>
      ))}

      {/* =================================================
          HEAD
          ================================================= */}

      <group
        ref={head}
        position={[0, 1.02, 0.01]}
      >
        {/* main capybara head */}

        <mesh
          scale={[0.92, 0.88, 1.0]}
          castShadow
        >
          <sphereGeometry
            args={[0.48, 48, 36]}
          />

          <meshStandardMaterial
            color={CAPI.head}
            roughness={1}
          />
        </mesh>

        {/* =================================================
            EARS
            ================================================= */}

        {[-1, 1].map((s) => (
          <group key={s}>
            {/* outer ear */}

            <Blob
              r={0.105}
              position={[
                s * 0.31,
                0.27,
                -0.025,
              ]}
              scale={[1, 1, 0.62]}
              color={CAPI.fur}
              roughness={1}
              cast
            />

            {/* inner ear */}

            <Blob
              r={0.060}
              position={[
                s * 0.31,
                0.27,
                0.045,
              ]}
              scale={[0.9, 0.9, 0.45]}
              color={CAPI.innerEar}
              roughness={1}
            />
          </group>
        ))}

        {/* =================================================
            CAPYBARA MUZZLE
            ================================================= */}

        <Blob
          r={0.19}
          position={[0, -0.055, 0.38]}
          scale={[1.25, 0.78, 1.05]}
          color={CAPI.muzzle}
          roughness={1}
        />

        {/* long upper snout */}

        <Blob
          r={0.135}
          position={[0, -0.055, 0.48]}
          scale={[1.15, 0.72, 1.0]}
          color={CAPI.muzzle}
          roughness={1}
        />

        {/* =================================================
            EYES
            ================================================= */}

        {[-1, 1].map((s) => (
          <group key={s}>
            <Blob
              r={0.028}
              position={[
                s * 0.18,
                0.055,
                0.445,
              ]}
              color={CAPI.eye}
              roughness={0.2}
            />

            {/* tiny highlight */}

            <Blob
              r={0.007}
              position={[
                s * 0.18 + 0.009,
                0.065,
                0.469,
              ]}
              color="#ffffff"
              roughness={0.2}
            />
          </group>
        ))}

        {/* =================================================
            BIG CAPYBARA NOSE
            ================================================= */}

        <Blob
          r={0.075}
          position={[0, -0.045, 0.56]}
          scale={[1.35, 0.72, 0.72]}
          color={CAPI.nose}
          roughness={0.45}
        />

        {/* nose highlight */}

        <Blob
          r={0.012}
          position={[
            -0.018,
            -0.025,
            0.615,
          ]}
          color="#806e61"
          roughness={0.3}
        />

        {/* =================================================
            SMALL MOUTH
            ================================================= */}

        <mesh
          position={[0, -0.12, 0.55]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <torusGeometry
            args={[0.045, 0.009, 8, 16, Math.PI]}
          />

          <meshStandardMaterial
            color="#5b4035"
            roughness={0.8}
          />
        </mesh>

        {/* =================================================
            ORANGE ON HEAD
            ================================================= */}

        <Orange />
      </group>
    </group>
  );
}

/* =========================================================
   DESK LAMP
   ========================================================= */

function DeskLamp() {
  return (
    <group position={[-2.6, 0, -1.15]}>
      {/* base */}

      <mesh
        position={[0, 0.03, 0]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry
          args={[0.24, 0.26, 0.06, 40]}
        />

        <meshStandardMaterial
          color={C.lampBase}
          roughness={0.6}
        />
      </mesh>

      {/* pole */}

      <mesh
        position={[0, 0.53, 0]}
        castShadow
      >
        <cylinderGeometry
          args={[0.028, 0.028, 0.94, 16]}
        />

        <meshStandardMaterial
          color={C.lampPole}
          roughness={0.6}
        />
      </mesh>

      {/* shade */}

      <group
        position={[0, 1.0, 0]}
        rotation={[0, 0, 0.5]}
      >
        <mesh>
          <sphereGeometry
            args={[0.055, 20, 16]}
          />

          <meshStandardMaterial
            color={C.lampPole}
            roughness={0.6}
          />
        </mesh>

        <mesh
          position={[0, -0.16, 0]}
          castShadow
        >
          <cylinderGeometry
            args={[
              0.1,
              0.3,
              0.32,
              40,
              1,
              true,
            ]}
          />

          <meshStandardMaterial
            color={C.lampShade}
            roughness={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* bulb */}

        <mesh
          position={[0, -0.22, 0]}
        >
          <sphereGeometry
            args={[0.09, 20, 16]}
          />

          <meshBasicMaterial
            color="#fff3cf"
          />
        </mesh>
      </group>
    </group>
  );
}

/* =========================================================
   HOVERABLE
   ========================================================= */

function Hoverable({
  href,
  label,
  labelPosition,
  pivot = [0, 0, 0],
  hoverScale = 1.04,
  children,
}: {
  href: string;
  label: string;
  labelPosition: V3;
  pivot?: V3;
  hoverScale?: number;
  children: ReactNode;
}) {
  const router = useRouter();

  const [hovered, setHovered] =
    useState(false);

  const scaler =
    useRef<THREE.Group>(null);

  useEffect(() => {
    document.body.style.cursor =
      hovered ? "pointer" : "auto";

    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  useFrame((_, delta) => {
    const g = scaler.current;

    if (!g) return;

    const next = THREE.MathUtils.damp(
      g.scale.x,
      hovered ? hoverScale : 1,
      8,
      delta
    );

    g.scale.setScalar(next);
  });

  return (
    <>
      <group
        ref={scaler}
        position={pivot}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          router.prefetch(href);
        }}
        onPointerOut={() =>
          setHovered(false)
        }
        onClick={(e) => {
          e.stopPropagation();
          router.push(href);
        }}
      >
        <group
          position={[
            -pivot[0],
            -pivot[1],
            -pivot[2],
          ]}
        >
          {children}
        </group>
      </group>

      {hovered && (
        <Html
          position={labelPosition}
          center
          zIndexRange={[30, 0]}
          pointerEvents="none"
        >
          <div className="pointer-events-none select-none whitespace-nowrap rounded-full bg-ink px-3.5 py-1.5 text-[12px] text-paper shadow-lg">
            {label}
          </div>
        </Html>
      )}
    </>
  );
}

/* =========================================================
   STAGE
   ========================================================= */

function Stage({
  children,
}: {
  children: ReactNode;
}) {
  const ref =
    useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const g = ref.current;

    if (!g) return;

    const t = state.clock.elapsedTime;

    const targetY =
      Math.sin(t * 0.4) * 0.1 +
      state.pointer.x * 0.28;

    const targetX =
      -state.pointer.y * 0.05;

    g.rotation.y =
      THREE.MathUtils.damp(
        g.rotation.y,
        targetY,
        3,
        delta
      );

    g.rotation.x =
      THREE.MathUtils.damp(
        g.rotation.x,
        targetX,
        3,
        delta
      );
  });

  return (
    <group ref={ref}>
      {children}
    </group>
  );
}

/* =========================================================
   CAMERA
   ========================================================= */

const TARGET = new THREE.Vector3(
  0,
  0.78,
  0
);

function FitCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    const cam =
      camera as THREE.PerspectiveCamera;

    cam.lookAt(TARGET);

    const dist =
      cam.position.distanceTo(TARGET);

    const viewH =
      2 *
      dist *
      Math.tan(
        THREE.MathUtils.degToRad(
          cam.fov / 2
        )
      );

    const viewW =
      viewH *
      (size.width / size.height);

    cam.zoom = Math.max(
      0.5,
      Math.min(
        viewW / 8.2,
        viewH / 4.9
      )
    );

    cam.updateProjectionMatrix();
  }, [
    camera,
    size.width,
    size.height,
  ]);

  return null;
}

/* =========================================================
   WORLD
   ========================================================= */

function World() {
  return (
    <>
      <FitCamera />

      {/* =================================================
          LIGHTING
          ================================================= */}

      <hemisphereLight
        args={[
          "#ffffff",
          "#d3d1c7",
          1.4,
        ]}
      />

      <directionalLight
        position={[4, 7, 5]}
        intensity={2.0}
        color="#fdf8f4"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-bias={-0.0004}
        shadow-normalBias={0.03}
      />

      <directionalLight
        position={[-5, 3, -2]}
        intensity={0.5}
        color="#dfe8ff"
      />

      {/* =================================================
          STAGE
          ================================================= */}

      <Stage>
        {/* =================================================
            DESK
            ================================================= */}

        <RoundedBox
          args={[6.6, 0.4, 4.2]}
          radius={0.16}
          smoothness={6}
          position={[0, -0.2, 0]}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial
            color={C.desk}
            roughness={0.9}
          />
        </RoundedBox>

        {/* =================================================
            WORKSTATION
            ================================================= */}

        <group
          position={[-0.45, 0, -0.3]}
          rotation={[0, 0.16, 0]}
        >
          <RoundedBox
            args={[2.8, 0.02, 1.9]}
            radius={0.008}
            smoothness={2}
            position={[0, 0.01, 0.1]}
            receiveShadow
          >
            <meshStandardMaterial
              color={C.mat}
              roughness={0.95}
            />
          </RoundedBox>

          <group position={[0, 0.02, 0]}>
            <Hoverable
              href="/projects"
              label="Click to see my projects"
              labelPosition={[
                0,
                1.85,
                -0.9,
              ]}
            >
              <Laptop />
            </Hoverable>
          </group>
        </group>

        {/* =================================================
            WALL
            ================================================= */}

        <Wall />

        {/* =================================================
            PHOTO STRIPS
            ================================================= */}

        <PhotoStrips />

        {/* =================================================
            DESK OBJECTS
            ================================================= */}

        <TeaCup />

        <DeskLamp />

        <Books />

        {/* =================================================
            EXPERIENCE
            ================================================= */}

        <Hoverable
          href="/experience"
          label="Click to see my experience"
          pivot={[2.5, 1.7, -1.96]}
          labelPosition={[2.5, 2.3, -1.9]}
          hoverScale={1.05}
        >
          <Lanyard />
        </Hoverable>

        {/* =================================================
            ABOUT / CAPYBARA
            ================================================= */}

        <Hoverable
          href="/about"
          label="Click to learn about me"
          pivot={[1.5, 0, 0.75]}
          labelPosition={[1.5, 1.72, 0.75]}
          hoverScale={1.04}
        >
          <Capybara />
        </Hoverable>

        {/* =================================================
            CONTACT SHADOWS
            ================================================= */}

        <ContactShadows
          position={[0, 0.004, 0]}
          scale={[6.6, 4.2]}
          opacity={0.28}
          blur={2.2}
          far={1.6}
          resolution={512}
          color="#7a6a55"
        />

        <ContactShadows
          position={[0, -0.42, 0]}
          scale={[8, 6]}
          opacity={0.16}
          blur={3.2}
          far={0.5}
          resolution={256}
          color="#6b5d4b"
        />
      </Stage>
    </>
  );
}

/* =========================================================
   COMPONENT
   ========================================================= */

export default function DeveloperWorld() {
  return (
    <div className="w-full h-[430px] sm:h-[500px]">
      <Canvas
        shadows
        flat
        dpr={[1, 2]}
        camera={{
          position: [3.4, 4.0, 8.6],
          fov: 38,
        }}
        gl={{
          alpha: true,
          antialias: true,
        }}
        style={{
          touchAction: "pan-y",
        }}
      >
        {/* transparent canvas */}
        <World />
      </Canvas>
    </div>
  );
}
