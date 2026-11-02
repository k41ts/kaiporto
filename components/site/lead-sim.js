// Scene Three.js untuk section "How I lead". Diport dari mockup; dimuat lewat
// dynamic import oleh LeadSim.tsx dan mengembalikan fungsi pembersih.
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

/**
 * @param {HTMLElement} root  wrapper LeadSim (berisi [data-sim], [data-steps], dst.)
 * @param {{ phases: string[][], streams: { name: string, issues: number, people: number }[] }} opts
 * @returns {() => void} pembersih
 */
export function mountLeadSim(root, opts) {
  const ac = new AbortController();
  const on = (el, type, fn) => el.addEventListener(type, fn, { signal: ac.signal });
  let disposed = false;

    const q = (sel) => root.querySelector(sel);
    const sim = q("[data-sim]"), stage = q("[data-stage]"), canvas = q("[data-gl]"), tagsEl = q("[data-tags]");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DUR = 4800;

    const phases = opts.phases;

    /* ----- step machine ----- */
    const buttons = [...root.querySelectorAll("[data-steps] button")];
    const bars = [...root.querySelectorAll("[data-prog] span")];
    const cap = q("[data-cap]");
    let step = 0, playing = !reduce, timer;
    const show = (i) => {
      step = (i + phases.length) % phases.length;
      q("[data-phase]").textContent = String(step + 1).padStart(2, "0") + " · " + phases[step][0];
      buttons.forEach((b, k) => (k === step ? b.setAttribute("aria-current", "step") : b.removeAttribute("aria-current")));
      cap.innerHTML = `<b>${phases[step][0]}</b><span>${phases[step][1]}</span>`;
      cap.classList.remove("swap"); void cap.offsetWidth; cap.classList.add("swap");
      bars.forEach((b, k) => {
        b.classList.remove("run", "done"); void b.offsetWidth;
        if (k < step || (k === step && !playing)) b.classList.add("done");
        else if (k === step) { b.style.setProperty("--dur", DUR + "ms"); b.classList.add("run"); }
      });
    };
    const schedule = () => { clearTimeout(timer); if (playing && !disposed) timer = setTimeout(() => { show(step + 1); schedule(); }, DUR); };
    const setPlaying = (v) => {
      playing = v;
      q("[data-ic-pause]").hidden = !v; q("[data-ic-play]").hidden = v;
      q("[data-play]").setAttribute("aria-label", v ? "Pause" : "Play");
      show(step); schedule();
    };
    buttons.forEach((b) => on(b, "click", () => { playing = false; show(+b.dataset.i); setPlaying(false); }));
    on(q("[data-prev]"), "click", () => { playing = false; show(step - 1); setPlaying(false); });
    on(q("[data-next]"), "click", () => { playing = false; show(step + 1); setPlaying(false); });
    on(q("[data-play]"), "click", () => setPlaying(!playing));
    if (reduce) { step = 5; setPlaying(false); } else setPlaying(true);

    /* ----- renderer ----- */
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
    } catch (e) { sim.classList.add("nogl"); return () => { disposed = true; clearTimeout(timer); ac.abort(); }; }
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.setClearColor(0x09090b, 1);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x09090b, 0.024);
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 200);
    const AMBER = 0xe0a85a, GREEN = 0x5fd39a, WHITE = 0xf2f1ee, ADD = THREE.AdditiveBlending;
    const V = (x, y, z) => new THREE.Vector3(x, y, z);

    let hasEnv = false;
    if (RoomEnvironment) {
      try { scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), .04).texture; hasEnv = true; } catch (e) {}
    }
    scene.add(new THREE.HemisphereLight(0xf2e6d2, 0x0b0b0d, .35));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2); scene.add(keyLight);
    const rimLight = new THREE.PointLight(AMBER, 3.2, 26, 2); scene.add(rimLight);

    const glowTex = (() => {
      const c = document.createElement("canvas"); c.width = c.height = 64;
      const g = c.getContext("2d"), r = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      r.addColorStop(0, "rgba(255,255,255,1)"); r.addColorStop(.25, "rgba(255,255,255,.55)"); r.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = r; g.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    })();
    const basic = (color, opacity = 1, extra = {}) => new THREE.MeshBasicMaterial({ color, transparent: true, opacity, ...extra });
    const lineMat = (color, opacity = 1) => new THREE.LineBasicMaterial({ color, transparent: true, opacity });
    const sprite = (color, size, opacity) => {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color, transparent: true, opacity, blending: ADD, depthWrite: false }));
      s.scale.set(size, size, 1); return s;
    };
    const edges = (geo, color, opacity) => new THREE.LineSegments(new THREE.EdgesGeometry(geo, 25), lineMat(color, opacity));
    const fade = [];
    const track = (obj, fn) => { obj.traverse((o) => { if (o.material) fade.push([o.material, o.material.opacity, fn]); }); return obj; };
    const lerp = (a, b, k) => a + (b - a) * k;
    const clamp01 = (x) => Math.max(0, Math.min(1, x));
    const ease = (x) => x * x * (3 - 2 * x);

    /* ----- world ----- */
    const grid = new THREE.GridHelper(60, 60, 0x4a3a22, 0x1b1b20);
    grid.material.transparent = true; grid.material.opacity = .6; scene.add(grid);
    const floorGlow = new THREE.Mesh(new THREE.CircleGeometry(9, 64), basic(AMBER, .26, { map: glowTex, blending: ADD, depthWrite: false }));
    floorGlow.rotation.x = -Math.PI / 2; floorGlow.position.y = .02; scene.add(floorGlow);
    [[9, .22], [12.5, .1]].forEach(([r, o]) => {
      const ring = new THREE.Mesh(new THREE.RingGeometry(r, r + .04, 160), basic(AMBER, o, { side: THREE.DoubleSide }));
      ring.rotation.x = -Math.PI / 2; ring.position.y = .03; scene.add(ring);
    });
    const dustGeo = new THREE.BufferGeometry(), dust = new Float32Array(900 * 3);
    for (let i = 0; i < dust.length; i += 3) {
      const r = 14 + Math.random() * 26, t = Math.random() * Math.PI * 2;
      dust[i] = Math.cos(t) * r; dust[i + 1] = Math.random() * 24 - 2; dust[i + 2] = Math.sin(t) * r;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dust, 3));
    const dustPts = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: WHITE, size: .07, transparent: true, opacity: .45, depthWrite: false }));
    scene.add(dustPts);

    const cur = { spec: 1, form: 0, stand: 0, cut: 0, merge: 0, prod: 0, pulse: 0 };
    const targets = () => ({
      spec: step === 0 ? 1 : 0, form: step >= 1 ? 1 : 0, stand: step >= 2 ? 1 : 0, cut: step >= 3 ? 1 : 0,
      merge: step >= 4 ? 1 : 0, prod: step >= 5 ? 1 : 0, pulse: step >= 4 ? 1 : 0,
    });

    /* hub: pedestal now, product core later */
    const HUB_Y = 2.1;
    const pedestal = new THREE.Group(); scene.add(pedestal);
    pedestal.add(new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.9, .5, 6), basic(0x131316, 1)));
    pedestal.add(edges(new THREE.CylinderGeometry(1.5, 1.9, .5, 6), AMBER, .8));
    pedestal.position.y = .25;
    track(pedestal, () => .25 + .75 * cur.form);
    const coreG = new THREE.Group(); coreG.position.y = HUB_Y; scene.add(coreG);
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(.62, 0), basic(AMBER)); coreG.add(core);
    const shell = edges(new THREE.IcosahedronGeometry(1.2, 1), AMBER, .5); coreG.add(shell);
    const rings = [0, 1, 2].map((i) => {
      const t = new THREE.Mesh(new THREE.TorusGeometry(1.75 + i * .22, .014, 6, 128), basic(i === 1 ? WHITE : AMBER, .6));
      t.rotation.set(Math.PI / 2 + i * .5, i * .7, 0); coreG.add(t); return t;
    });
    coreG.add(sprite(AMBER, 7, .55));
    track(coreG, () => cur.merge);

    /* ----- two puppeteer hands: point clouds sharing one shape ----- */
    const handPts = [], handDir = [];
    const sampleEllipsoid = (c, r, n) => {
      for (let i = 0; i < n; i++) {
        const d = V(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();
        handPts.push(V(c.x + d.x * r.x, c.y + d.y * r.y, c.z + d.z * r.z));
      }
    };
    const sampleCapsule = (a, b, rad, n) => {
      const ab = b.clone().sub(a), len = ab.length(), axis = ab.clone().normalize();
      const u = Math.abs(axis.y) < .9 ? V(0, 1, 0).cross(axis).normalize() : V(1, 0, 0).cross(axis).normalize();
      const w = axis.clone().cross(u);
      for (let i = 0; i < n; i++) {
        const t = Math.random(), ang = Math.random() * Math.PI * 2;
        handPts.push(a.clone().addScaledVector(axis, t * len).addScaledVector(u, Math.cos(ang) * rad).addScaledVector(w, Math.sin(ang) * rad));
      }
    };
    sampleEllipsoid(V(0, 0, 0), V(1.3, .3, 1.0), 640);
    sampleCapsule(V(-1.0, .08, 0), V(-3.4, .5, 0), .5, 340);
    sampleCapsule(V(1.05, .1, -.85), V(1.05, .1, .9), .11, 110);
    const fingerTips = [[.86, 1], [.3, 1.08], [-.26, 1], [-.8, .8]].map(([z, s], f) => {
      const p = [V(1.15, 0, z), V(1.15 + .95 * s, -.1 - f * .04, z * 1.1), V(1.15 + 1.55 * s, -.55 - f * .06, z * 1.16), V(1.15 + 1.8 * s, -1.05 - f * .08, z * 1.2)];
      for (let k = 0; k < 3; k++) sampleCapsule(p[k], p[k + 1], .15 - k * .025, 170);
      return p[3];
    });
    const thumb = [V(.35, -.12, .95), V(.95, -.45, 1.42), V(1.45, -.85, 1.6)];
    for (let k = 0; k < 2; k++) sampleCapsule(thumb[k], thumb[k + 1], .18, 160);
    handPts.forEach(() => handDir.push(V(Math.random() - .5, Math.random() * .9 + .2, Math.random() - .5).normalize().multiplyScalar(1.5 + Math.random() * 3.5)));
    const handArr = new Float32Array(handPts.length * 3);
    const handGeo = new THREE.BufferGeometry(); handGeo.setAttribute("position", new THREE.BufferAttribute(handArr, 3));
    const handMat = new THREE.PointsMaterial({ color: 0xf6e3c4, size: .055, transparent: true, opacity: .95, blending: ADD, depthWrite: false });
    const tipCenter = fingerTips.slice(0, 3).reduce((a, f) => a.add(f), V(0, 0, 0)).multiplyScalar(1 / 3);
    const hands = [-1, 1].map((side) => {
      const g = new THREE.Group(); scene.add(g);
      g.scale.set(side < 0 ? 1.55 : -1.55, 1.55, 1.55);
      g.add(new THREE.Points(handGeo, handMat));
      const glows = fingerTips.slice(0, 3).map((f) => { const s = sprite(AMBER, .8, .8); s.position.copy(f); g.add(s); return s; });
      return { side, g, glows };
    });

    /* ----- the android: armour plates on a rig ----- */
    const J = {
      head: [V(0, 4.3, 0), V(0, 4.35, 0)], neck: [V(0, 3.9, 0), V(0, 3.95, 0)],
      chest: [V(0, 3.35, 0), V(0, 3.4, 0)], pelvis: [V(0, 2.12, 0), V(0, 2.17, 0)],
      shL: [V(-.66, 3.64, 0), V(-.7, 3.7, 0)], shR: [V(.66, 3.64, 0), V(.7, 3.7, 0)],
      elL: [V(-.84, 2.78, .06), V(-1.58, 3.74, 0)], elR: [V(.84, 2.78, .06), V(1.58, 3.74, 0)],
      haL: [V(-.86, 1.98, .14), V(-2.45, 3.82, 0)], haR: [V(.86, 1.98, .14), V(2.45, 3.82, 0)],
      hiL: [V(-.3, 2.0, 0), V(-.32, 2.05, 0)], hiR: [V(.3, 2.0, 0), V(.32, 2.05, 0)],
      knL: [V(-.38, 1.1, .2), V(-.36, 1.12, .02)], knR: [V(.38, 1.1, .2), V(.36, 1.12, .02)],
      ftL: [V(-.4, .14, 0), V(-.42, .12, 0)], ftR: [V(.4, .14, 0), V(.42, .12, 0)],
    };
    const pose = {}; Object.keys(J).forEach((k) => (pose[k] = J[k][0].clone()));
    const restLen = (a, b) => J[a][0].distanceTo(J[b][0]);

    /* chrome android with human proportions, revealed by a scan plane */
    renderer.localClippingEnabled = true;
    const clipPlane = new THREE.Plane(V(0, -1, 0), -100);
    const chrome = new THREE.MeshStandardMaterial({ color: 0x8e939c, metalness: hasEnv ? 1 : .6, roughness: .2, envMapIntensity: .85, clippingPlanes: [clipPlane] });
    const chromeDark = new THREE.MeshStandardMaterial({ color: 0x1b1d22, metalness: hasEnv ? .95 : .5, roughness: .3, clippingPlanes: [clipPlane] });
    const seamMat = new THREE.MeshStandardMaterial({ color: 0x07070a, metalness: .4, roughness: .7, clippingPlanes: [clipPlane] });
    const eyeMat = basic(0xffe9c2, 0, { blending: ADD, depthWrite: false });
    const holoMat = new THREE.PointsMaterial({ color: 0xffd9a0, size: .05, transparent: true, opacity: 0, blending: ADD, depthWrite: false });
    const holoMat2 = new THREE.PointsMaterial({ color: AMBER, size: .035, transparent: true, opacity: 0, blending: ADD, depthWrite: false });
    const lathe = (prof, sx = 1, sz = 1, seg = 48) => { const g = new THREE.LatheGeometry(prof.map(([y, r]) => new THREE.Vector2(r, y)), seg); g.scale(sx, 1, sz); return g; };
    const ell = (rx, ry, rz) => { const g = new THREE.SphereGeometry(1, 40, 28); g.scale(rx, ry, rz); return g; };
    const seam = (r, sz = 1) => { const g = new THREE.TorusGeometry(r, .011, 6, 56); g.rotateX(Math.PI / 2); g.scale(1, 1, sz); return g; };
    const limb = (L, r0, rMid, r1, bulge = .3) => lathe([[0, r0], [L * .12, (r0 + rMid) / 2 + .008], [L * bulge, rMid], [L * .7, (rMid + r1) / 2], [L, r1]], 1, .9, 40);
    const cyl = (r0, r1, h) => { const g = new THREE.CylinderGeometry(r1, r0, h, 12); g.translate(0, h / 2, 0); return g; };

    const TL = restLen("pelvis", "neck");
    // part = [name, from, to, anchor joint, parts: [geometry, kind, x, y, z, rotX, rotZ]]
    const PARTS = [
      ["torso", "pelvis", "neck", "pelvis", [
        [lathe([[0, .27], [.12, .31], [.32, .285], [.55, .255], [.8, .29], [1.05, .37], [1.3, .425], [1.48, .415], [1.6, .35], [1.7, .22], [TL, .12]], 1, .6, 64), "chrome"],
        [ell(.16, .11, .07), "chrome", -.15, 1.27, .19], [ell(.16, .11, .07), "chrome", .15, 1.27, .19],
        [ell(.21, .035, .11), "dark", 0, 1.66, .04],
        [seam(.258, .6), "seam", 0, .56], [seam(.27, .6), "seam", 0, .74], [seam(.3, .6), "seam", 0, .12],
        [ell(.012, .38, .012), "seam", 0, .95, .205],
      ]],
      ["pelvis", "pelvis", "chest", "pelvis", [[ell(.3, .19, .19), "chrome", 0, -.02]]],
      ["neck", "neck", "head", "neck", [[lathe([[0, .11], [.12, .095], [.28, .1], [.36, .12]], 1, 1.05, 32), "dark"]]],
      ["head", "neck", "head", "head", [
        [lathe([[-.34, 0], [-.33, .06], [-.28, .1], [-.2, .13], [-.1, .17], [0, .195], [.1, .205], [.2, .19], [.28, .15], [.34, .08], [.36, 0]], .9, 1.12, 56), "chrome"],
        [ell(.17, .028, .05), "chrome", 0, .075, .2],
        [ell(.052, .014, .012), "eye", -.075, .035, .214], [ell(.052, .014, .012), "eye", .075, .035, .214],
        [ell(.062, .006, .01), "eye", 0, -.15, .166],
        [ell(.006, .13, .01), "seam", -.135, -.07, .17], [ell(.006, .13, .01), "seam", .135, -.07, .17],
      ]],
    ];
    for (const s of ["L", "R"]) {
      const o = s === "L" ? -1 : 1;
      const UA = restLen("sh" + s, "el" + s), FA = restLen("el" + s, "ha" + s), TH = restLen("hi" + s, "kn" + s), SH = restLen("kn" + s, "ft" + s);
      PARTS.push(
        ["shoulder" + s, "neck", "sh" + s, "sh" + s, [[ell(.175, .16, .17), "chrome"], [seam(.15), "seam", 0, -.06]]],
        ["upper" + s, "sh" + s, "el" + s, "sh" + s, [[limb(UA, .13, .135, .09, .25), "chrome"], [seam(.1, .9), "seam", 0, UA * .82]]],
        ["elbow" + s, "sh" + s, "el" + s, "el" + s, [[ell(.095, .095, .095), "dark"]]],
        ["fore" + s, "el" + s, "ha" + s, "el" + s, [[limb(FA, .095, .108, .065, .3), "chrome"], [seam(.072, .9), "seam", 0, FA * .9]]],
        ["hand" + s, "el" + s, "ha" + s, "ha" + s, [
          [ell(.075, .1, .036), "chrome", 0, .07],
          [cyl(.019, .014, .13), "dark", -.048, .15], [cyl(.019, .014, .145), "dark", -.016, .155], [cyl(.019, .014, .14), "dark", .016, .155], [cyl(.017, .013, .115), "dark", .046, .15],
          [cyl(.02, .015, .1), "dark", -.07 * o, .04, .02, 0, .7 * o],
        ]],
        ["hip" + s, "pelvis", "hi" + s, "hi" + s, [[ell(.15, .15, .15), "chrome"]]],
        ["thigh" + s, "hi" + s, "kn" + s, "hi" + s, [[limb(TH, .18, .175, .11, .25), "chrome"], [seam(.12, .9), "seam", 0, TH * .86]]],
        ["knee" + s, "hi" + s, "kn" + s, "kn" + s, [[ell(.11, .11, .12), "dark"]]],
        ["shin" + s, "kn" + s, "ft" + s, "kn" + s, [[limb(SH, .11, .125, .065, .28), "chrome"], [ell(.03, SH * .3, .02), "seam", 0, SH * .45, .1]]],
        ["foot" + s, "kn" + s, "ft" + s, "ft" + s, [[ell(.075, .05, .17), "chrome", 0, -.03, .08], [ell(.06, .04, .06), "dark", 0, .02, -.02]]],
      );
    }
    const body = new THREE.Group(); scene.add(body);
    const eyeSprites = [];
    const MAT = { chrome, dark: chromeDark, seam: seamMat, eye: eyeMat };
    const pieces = PARTS.map(([name, from, to, anchor, parts]) => {
      const g = new THREE.Group(); body.add(g);
      const holo = [];
      parts.forEach(([geo, kind, x = 0, y = 0, z = 0, rx = 0, rz = 0]) => {
        const mesh = new THREE.Mesh(geo, MAT[kind]); mesh.position.set(x, y, z); mesh.rotation.set(rx, 0, rz); g.add(mesh);
        if (kind === "eye") { const sp = sprite(AMBER, .32, 0); sp.position.set(x, y, z + .03); g.add(sp); eyeSprites.push(sp); }
        if (kind === "chrome" || kind === "dark") {
          mesh.updateMatrix();
          const pos = geo.attributes.position, step = pos.count > 900 ? 3 : pos.count > 400 ? 2 : 1;
          for (let i = 0; i < pos.count; i += step) holo.push(V(pos.getX(i), pos.getY(i), pos.getZ(i)).applyMatrix4(mesh.matrix));
        }
      });
      if (holo.length) {
        const hg = new THREE.BufferGeometry().setFromPoints(holo.map((p) => p.add(V((Math.random() - .5) * .02, (Math.random() - .5) * .02, (Math.random() - .5) * .02))));
        g.add(new THREE.Points(hg, holoMat));
        const shellPts = new THREE.Points(hg, holoMat2); shellPts.scale.setScalar(1.12); g.add(shellPts);
      }
      return { name, from, to, anchor, g };
    });
    // hologram aura: orbiting rings and a scan ring that reveals the chrome
    const auraMat = basic(AMBER, 0, { blending: ADD, depthWrite: false, side: THREE.DoubleSide });
    const aura = [[1.25, 1.1], [1.05, 2.6], [.85, 3.9]].map(([r, y], i) => {
      const t = new THREE.Mesh(new THREE.TorusGeometry(r, .008, 6, 120, Math.PI * 1.4), auraMat);
      t.rotation.x = Math.PI / 2; t.position.y = y; t.userData = { y, spd: (i % 2 ? -1 : 1) * (.5 + i * .2) }; body.add(t); return t;
    });
    const scanMat = basic(0xffe2b0, 0, { blending: ADD, depthWrite: false, side: THREE.DoubleSide });
    const scanRing = new THREE.Mesh(new THREE.RingGeometry(.2, 1.15, 64), scanMat); scanRing.rotation.x = -Math.PI / 2; body.add(scanRing);
    const scanEdge = new THREE.Mesh(new THREE.TorusGeometry(1.15, .012, 6, 96), scanMat); scanEdge.rotation.x = Math.PI / 2; body.add(scanEdge);
    const BODY_H = 4.75;

    const up = V(0, 1, 0), fwd = V(0, 0, 1), tmp = V(0, 0, 0), bx = V(0, 0, 0), by = V(0, 0, 0), bz = V(0, 0, 0), m4 = new THREE.Matrix4();
    const orient = (g, a, b) => {
      by.subVectors(b, a); if (by.lengthSq() < 1e-6) by.set(0, 1, 0); by.normalize();
      bz.copy(fwd).addScaledVector(by, -fwd.dot(by)); if (bz.lengthSq() < 1e-6) bz.set(1, 0, 0); bz.normalize();
      bx.crossVectors(by, bz);
      m4.makeBasis(bx, by, bz); g.quaternion.setFromRotationMatrix(m4);
    };

    /* the 27 spec shards: the first ones become the armour plates */
    const shards = [];
    for (let i = 0; i < 27; i++) {
      const g = new THREE.Group();
      const plate = new THREE.PlaneGeometry(.5, .68);
      g.add(new THREE.Mesh(plate, basic(AMBER, .1, { side: THREE.DoubleSide, blending: ADD, depthWrite: false })));
      g.add(edges(plate, WHITE, .75));
      const a = (i / 27) * Math.PI * 2 + Math.random() * .3, r = 2.8 + Math.random() * 3.6;
      g.userData.home = V(Math.cos(a) * r, 4.4 + Math.random() * 5, Math.sin(a) * r);
      g.userData.spin = (Math.random() - .5) * 1.4;
      g.position.copy(g.userData.home);
      g.traverse((o) => { if (o.material) o.userData.base = o.material.opacity; });
      scene.add(g); shards.push(g);
    }

    /* six strings: left hand to left arm, shoulder, knee; right hand to right arm, head, knee */
    const STRINGS = [[0, 0, "haL"], [0, 1, "shL"], [0, 2, "knL"], [1, 0, "haR"], [1, 1, "head"], [1, 2, "knR"]];
    const strings = STRINGS.map(() => {
      const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints([V(0, 0, 0), V(0, 1, 0)]), lineMat(0xf2e6d2, .6));
      scene.add(l); return l;
    });

    /* workstream towers, sized by Jira issues */
    const ANGLES = [200, 290, 20, 110];
  const streams = opts.streams.map((st, i) => ({ ...st, ang: ANGLES[i % ANGLES.length] }));
    const R = 9;
    const hexLoop = (r) => {
      const p = []; for (let k = 0; k <= 6; k++) { const a = (k / 6) * Math.PI * 2; p.push(V(Math.cos(a) * r, 0, Math.sin(a) * r)); }
      return new THREE.BufferGeometry().setFromPoints(p);
    };
    streams.forEach((s) => {
      const a = (s.ang * Math.PI) / 180;
      const g = new THREE.Group(); g.position.set(Math.cos(a) * R, 0, Math.sin(a) * R); scene.add(g);
      const base = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, .14, 6), basic(0x121215, 1)); base.position.y = .07; g.add(base);
      const baseEdge = edges(new THREE.CylinderGeometry(1.15, 1.15, .14, 6), AMBER, .55); baseEdge.position.y = .07; g.add(baseEdge);
      const n = Math.round(s.issues / 2), H = .35 + n * .25;
      s.loops = [];
      for (let k = 0; k < n; k++) {
        const c = new THREE.Color(WHITE).lerp(new THREE.Color(AMBER), k / n);
        const loop = new THREE.LineLoop(hexLoop(.95), lineMat(c, .75)); loop.position.y = .35 + k * .25; g.add(loop); s.loops.push(loop);
      }
      const column = new THREE.Mesh(new THREE.CylinderGeometry(.62, .62, H, 6, 1, true), basic(AMBER, .07, { blending: ADD, depthWrite: false, side: THREE.DoubleSide }));
      column.position.y = H / 2; g.add(column);
      const capS = sprite(AMBER, 2.6, .5); capS.position.y = H; g.add(capS);
      s.column = column; s.cap = capS; s.H = H;
      s.people_ = Array.from({ length: s.people }, (_, k) => {
        const p = new THREE.Group();
        p.add(new THREE.Mesh(new THREE.SphereGeometry(.12, 14, 14), basic(WHITE)));
        p.add(sprite(AMBER, 1.1, .8));
        p.userData.off = (k / s.people) * Math.PI * 2;
        g.add(p); return p;
      });
      s.top = V(g.position.x, H + .9, g.position.z);
      s.curve = new THREE.QuadraticBezierCurve3(V(0, 3.4, 0), V(g.position.x * .45, 5.6, g.position.z * .45), V(g.position.x, H * .7, g.position.z));
      const tube = new THREE.TubeGeometry(s.curve, 80, .035, 6, false);
      s.tube = new THREE.Mesh(tube, basic(AMBER, .9, { blending: ADD, depthWrite: false }));
      s.tubeCount = tube.index.count; tube.setDrawRange(0, 0);
      scene.add(s.tube);
      s.packets = [0, 1, 2].map(() => { const p = sprite(WHITE, .9, 1); p.visible = false; scene.add(p); return p; });
      s.state = { build: 0, wire: 0, people: 0, flow: 0 };
    });

    const pulse = new THREE.Mesh(new THREE.RingGeometry(1, 1.06, 96), basic(AMBER, 0, { side: THREE.DoubleSide, blending: ADD, depthWrite: false }));
    pulse.rotation.x = -Math.PI / 2; pulse.position.y = .05; scene.add(pulse);

    /* production, hovering above */
    const PROD_Y = 9.6;
    const prod = new THREE.Group(); prod.position.y = PROD_Y; scene.add(prod);
    const halo = new THREE.Mesh(new THREE.TorusGeometry(2.7, .03, 8, 160), basic(GREEN)); halo.rotation.x = Math.PI / 2; prod.add(halo);
    const halo2 = new THREE.Mesh(new THREE.TorusGeometry(3.2, .012, 6, 160), basic(GREEN, .45)); halo2.rotation.x = Math.PI / 2; prod.add(halo2);
    const disc = new THREE.Mesh(new THREE.CircleGeometry(2.3, 6), basic(GREEN, .08, { side: THREE.DoubleSide, blending: ADD, depthWrite: false })); disc.rotation.x = -Math.PI / 2; prod.add(disc);
    const discEdge = edges(new THREE.CircleGeometry(2.3, 6), GREEN, .7); discEdge.rotation.x = -Math.PI / 2; prod.add(discEdge);
    prod.add(sprite(GREEN, 8, .35));
    const beamLen = PROD_Y - HUB_Y;
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(.05, .05, beamLen, 8, 1, true), basic(GREEN, .9, { blending: ADD, depthWrite: false }));
    beam.position.y = -beamLen / 2; prod.add(beam);
    const beamOuter = new THREE.Mesh(new THREE.CylinderGeometry(.32, .32, beamLen, 16, 1, true), basic(GREEN, .08, { blending: ADD, depthWrite: false, side: THREE.DoubleSide }));
    beamOuter.position.y = -beamLen / 2; prod.add(beamOuter);
    track(prod, () => cur.prod);
    const motes = Array.from({ length: 16 }, (_, k) => { const m = sprite(GREEN, .55, .9); m.userData.off = k / 16; prod.add(m); return m; });

    let composer = null, bloom = null;
    {
      try {
        composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));
        bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), .9, .55, .6);
        composer.addPass(bloom);
      } catch (e) { composer = null; }
    }

    /* labels projected from 3D */
    const tag = (cls, title, sub) => {
      const d = document.createElement("div"); d.className = "tag3 " + cls;
      d.innerHTML = title + (sub ? `<small>${sub}</small>` : "");
      tagsEl.appendChild(d); return d;
    };
    const handLabelPos = V(0, 0, 0), bodyLabelPos = V(0, 0, 0);
    const labels = [
      ...streams.map((s) => ({ el: tag("", s.name, `${s.issues} issues · ${s.people} ${s.people > 1 ? "people" : "person"}`), pos: s.top, key: () => s.state.build })),
      { el: tag("hub", "Kai · Tech Lead", "plans · builds · hands off"), pos: handLabelPos, key: () => 1 - cur.cut },
      { el: tag("hub", "FundChain core", "reviewed and merged by Kai"), pos: V(0, HUB_Y + 2.3, 0), key: () => cur.merge },
      { el: tag("prod", "Production", "Vercel · Sepolia"), pos: V(0, PROD_Y + 1.2, 0), key: () => cur.prod },
      { el: tag("", "Spec", "27 docs · 19 conflicts"), pos: V(4.2, 10, 2.6), key: () => cur.spec },
      { el: tag("", "Foundation", "API · web · contract · DB"), pos: bodyLabelPos, key: () => cur.form * (1 - cur.stand) },
    ];

    /* camera orbit; di HP kamera dikunci supaya scroll halaman nggak pernah tertahan */
    const BASE_EL = .44;
    const still = matchMedia("(max-width: 760px), (pointer: coarse)").matches;
    let az = .9, el = BASE_EL, dragging = false, lx = 0, ly = 0, idle = 0;
    if (!still) {
      on(stage, "pointerdown", (e) => { dragging = true; lx = e.clientX; ly = e.clientY; stage.setPointerCapture(e.pointerId); });
      on(stage, "pointermove", (e) => {
        if (!dragging) return;
        az -= (e.clientX - lx) * .006;
        el = Math.min(.85, Math.max(.2, el + (e.clientY - ly) * .004));
        lx = e.clientX; ly = e.clientY; idle = 0; wake();
      });
      const end = () => { dragging = false; };
      on(stage, "pointerup", end); on(stage, "pointercancel", end);
    }

    let W = 1, Hh = 1;
    const resize = () => {
      W = stage.clientWidth; Hh = stage.clientHeight;
      renderer.setSize(W, Hh, false);
      camera.aspect = W / Hh; camera.updateProjectionMatrix();
      if (composer) { composer.setSize(W, Hh); bloom.setSize(W, Hh); }
      wake();
    };
    const ro = new ResizeObserver(resize); ro.observe(stage);

    let visible = true, raf = 0, last = performance.now(), time = 0, bodyYaw = Math.PI / 2 - az + .4;
    const wake = () => { if (!raf && visible && !disposed) { last = performance.now(); raf = requestAnimationFrame(frame); } };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) wake(); }); io.observe(stage);
    on(document, "visibilitychange", () => { if (!document.hidden) wake(); });
    const v = V(0, 0, 0), tipW = V(0, 0, 0), local = V(0, 0, 0), rgt = V(0, 0, 0);

    function frame(now) {
      raf = 0;
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      const speed = reduce ? 0 : 1;
      time += dt * speed; idle += dt;
      const k = reduce ? 1 : 1 - Math.exp(-dt * 2.4);
      const tg = targets();
      for (const key in tg) cur[key] = lerp(cur[key], tg[key], k);

      /* camera: up at the hands early, down on the system later */
      if (!dragging && !reduce && !still && idle > 1.5) az += dt * .05;
      // setelah dilepas, kemiringan kamera pelan-pelan balik ke sudut awal
      if (!dragging && idle > 2.5) el = lerp(el, BASE_EL, 1 - Math.exp(-dt * 1.5));
      const rad = (W < 560 ? 50 : W < 900 ? 38 : 30) + 3 * (1 - cur.stand);
      const lookY = lerp(9.2, 4.8, cur.stand);
      camera.position.set(Math.cos(az) * Math.cos(el) * rad, Math.sin(el) * rad + lookY - 2.5, Math.sin(az) * Math.cos(el) * rad);
      camera.lookAt(0, lookY, 0);
      rgt.set(Math.sin(az), 0, -Math.cos(az));
      keyLight.position.copy(camera.position).add(V(0, 8, 0)).addScaledVector(rgt, 6);
      rimLight.position.set(-Math.cos(az) * 5, 8, -Math.sin(az) * 5);

      /* pose: hanging and swaying, then standing with arms out */
      const sway = (1 - cur.stand) * cur.form + (1 - cur.form) * .4;
      const s1 = Math.sin(time * 1.4), s2 = Math.sin(time * 1.4 + Math.PI);
      for (const key in J) pose[key].lerpVectors(J[key][0], J[key][1], cur.stand);
      pose.haL.y += s1 * .4 * sway; pose.elL.y += s1 * .2 * sway; pose.shL.y += s1 * .05 * sway;
      pose.haR.y += s2 * .4 * sway; pose.elR.y += s2 * .2 * sway; pose.shR.y += s2 * .05 * sway;
      pose.knL.y += s2 * .24 * sway; pose.knL.z += s2 * .16 * sway; pose.ftL.y += s2 * .12 * sway;
      pose.knR.y += s1 * .24 * sway; pose.knR.z += s1 * .16 * sway; pose.ftR.y += s1 * .12 * sway;
      pose.head.x += Math.sin(time * .9) * .08 * sway;
      const br = Math.sin(time * 2) * .025 * cur.stand;
      pose.chest.y += br; pose.head.y += br; pose.neck.y += br;

      /* where the body lives */
      const bodyY = lerp(3.2, .5, cur.stand);
      body.position.set(0, lerp(bodyY, HUB_Y - .3, cur.merge), 0);
      body.scale.setScalar(lerp(1.85, .15, cur.merge));
      bodyYaw = lerp(bodyYaw, Math.PI / 2 - az + .4, 1 - Math.exp(-dt * 1.2));
      body.rotation.y = bodyYaw + Math.sin(time * .5) * .2 * sway;
      body.updateMatrixWorld();

      pieces.forEach((p) => { p.g.position.copy(pose[p.anchor]); orient(p.g, pose[p.from], pose[p.to]); });
      const vis = 1 - cur.merge;
      const holoO = clamp01((cur.form - .1) / .3);
      const reveal = clamp01((cur.form - .42) / .5);
      body.visible = cur.form > .01 && vis > .02;
      holoMat.opacity = .85 * holoO * (1 - .78 * reveal) * vis * (.88 + .12 * Math.sin(time * 14));
      holoMat2.opacity = .22 * holoO * vis * (.7 + .3 * Math.sin(time * 3));
      clipPlane.constant = reveal >= .999 ? 1000 : reveal <= .001 ? -1000 : body.position.y + reveal * BODY_H * body.scale.y;
      const eyeO = clamp01((reveal - .85) / .15) * vis;
      eyeMat.opacity = eyeO; eyeSprites.forEach((s) => (s.material.opacity = .9 * eyeO));
      scanRing.position.y = scanEdge.position.y = reveal * BODY_H;
      scanMat.opacity = Math.sin(reveal * Math.PI) * .55 * vis;
      auraMat.opacity = .45 * holoO * vis * (1 - .4 * cur.cut);
      aura.forEach((r) => { r.rotation.z += dt * r.userData.spd * speed; r.position.y = r.userData.y + Math.sin(time * .8 + r.userData.y) * .12; });

      bodyLabelPos.copy(V(0, 4.9, 0)).applyMatrix4(body.matrixWorld).addScaledVector(rgt, 2.6);

      /* hands: one each side, turned to the camera; they dissolve when the team takes over */
      const cut = cur.cut;
      const baseY = lerp(15, 13.4, cur.stand);
      hands.forEach((h, hi) => {
        const bob = Math.sin(time * 1.4 + (hi ? Math.PI : 0)) * .3 * (1 - cur.stand);
        h.g.rotation.set(0, Math.PI / 2 - az + (hi ? -.35 : .35), Math.sin(time * .7 + hi) * .06);
        h.g.updateMatrixWorld();
        tipW.copy(tipCenter).applyMatrix4(h.g.matrixWorld).sub(h.g.position);
        h.g.position.set(h.side * 1.25 * rgt.x - tipW.x, baseY + bob - tipW.y, h.side * 1.25 * rgt.z - tipW.z);
        h.g.updateMatrixWorld();
        h.g.visible = cut < .99;
        h.glows.forEach((g) => (g.material.opacity = .8 * (1 - cut)));
      });
      for (let i = 0; i < handPts.length; i++) {
        const p = handPts[i], d = handDir[i];
        const n = Math.sin(time * 2 + i) * .025;
        handArr[i * 3] = p.x + d.x * cut + n; handArr[i * 3 + 1] = p.y + d.y * cut * 1.4 + n; handArr[i * 3 + 2] = p.z + d.z * cut;
      }
      handGeo.attributes.position.needsUpdate = true;
      handMat.opacity = .95 * (1 - cut);
      handLabelPos.set(0, baseY + 2.4, 0).addScaledVector(rgt, -5.2);

      /* shards drift, then pour into the body they become */
      shards.forEach((g, i) => {
        const h = g.userData.home;
        const f = ease(clamp01(cur.form / .45));
        pieces[i % pieces.length].g.getWorldPosition(tmp);
        g.position.set(lerp(h.x, tmp.x, f), lerp(h.y + Math.sin(time + i) * .2, tmp.y, f), lerp(h.z, tmp.z, f));
        g.scale.setScalar(lerp(1, .3, f));
        const o = clamp01(1 - f * 1.1);
        g.rotation.y += dt * g.userData.spin * speed; g.rotation.x = Math.sin(time * .7 + i) * .3;
        g.traverse((m) => { if (m.material) m.material.opacity = m.userData.base * o; });
        g.visible = o > .01;
      });

      /* strings: fingertips to shards, then to the body */
      strings.forEach((l, i) => {
        const [hi, fi, joint] = STRINGS[i];
        const a = fingerTips[fi].clone().applyMatrix4(hands[hi].g.matrixWorld);
        const target = pose[joint].clone().applyMatrix4(body.matrixWorld);
        const b = shards[(i * 4 + 1) % 27].position.clone().lerp(target, ease(clamp01(cur.form * 1.3)));
        const pos = l.geometry.attributes.position;
        pos.setXYZ(0, a.x, a.y, a.z); pos.setXYZ(1, b.x, b.y, b.z); pos.needsUpdate = true;
        l.material.opacity = .65 * (1 - cut);
        l.visible = cut < .98;
      });

      coreG.scale.setScalar(.2 + .8 * cur.merge);
      core.rotation.y += dt * .6 * speed; core.rotation.x += dt * .3 * speed;
      shell.rotation.y -= dt * .25 * speed;
      rings.forEach((r, i) => { r.rotation.z += dt * (.4 + i * .25) * speed * (i % 2 ? -1 : 1); });

      streams.forEach((s, si) => {
        const st = s.state;
        st.build = lerp(st.build, step >= 2 ? 1 : 0, reduce ? 1 : k * .8);
        st.wire = lerp(st.wire, step >= 2 ? 1 : 0, reduce ? 1 : k * .7);
        st.people = lerp(st.people, step >= 3 ? 1 : 0, k);
        st.flow = lerp(st.flow, step >= 4 ? 1 : 0, k);
        const shown = st.build * s.loops.length;
        s.loops.forEach((l, li) => { const a = clamp01(shown - li); l.visible = a > .01; l.material.opacity = .75 * a; l.scale.setScalar(.85 + .15 * a); });
        s.column.scale.y = Math.max(.001, st.build); s.column.position.y = (s.H * st.build) / 2;
        s.cap.position.y = s.H * st.build; s.cap.material.opacity = .5 * st.build;
        s.tube.geometry.setDrawRange(0, Math.floor(s.tubeCount * st.wire / 3) * 3);
        s.people_.forEach((p) => {
          const a = p.userData.off + time * .8;
          p.position.set(Math.cos(a) * 1.55, s.H * st.build + .45 + Math.sin(time * 2 + p.userData.off) * .08, Math.sin(a) * 1.55);
          p.scale.setScalar(Math.max(.001, st.people)); p.visible = st.people > .02;
        });
        s.packets.forEach((p, pi) => {
          p.visible = st.flow > .05;
          if (!p.visible) return;
          const t = (time * .32 + pi / 3 + si * .11) % 1;
          p.position.copy(s.curve.getPoint(1 - t));
          p.material.opacity = st.flow * Math.sin(t * Math.PI);
        });
      });

      const pt = (time * .45) % 1;
      pulse.scale.setScalar(1 + pt * 8); pulse.material.opacity = cur.pulse * (1 - pt) * .7;

      prod.visible = cur.prod > .01;
      prod.scale.setScalar(.6 + .4 * cur.prod);
      halo.rotation.z += dt * .4 * speed; halo2.rotation.z -= dt * .2 * speed;
      motes.forEach((m) => { const t = (m.userData.off + time * .35) % 1; m.position.set(0, -beamLen + t * beamLen, 0); m.material.opacity = .9 * Math.sin(t * Math.PI) * cur.prod; });

      fade.forEach(([m, base, fn]) => { m.opacity = base * fn(); });
      dustPts.rotation.y += dt * .01 * speed;

      labels.forEach((l) => {
        v.copy(l.pos).project(camera);
        const x = (v.x * .5 + .5) * W, y = (-v.y * .5 + .5) * Hh, o = l.key();
        l.el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, calc(-100% - 16px))`;
        l.el.style.opacity = v.z < 1 ? clamp01(o) : 0;
      });
      q("[data-cam]").textContent = `AZ ${String(Math.round(((az * 180) / Math.PI % 360 + 360) % 360)).padStart(3, "0")}° · EL ${Math.round((el * 180) / Math.PI)}°`;

      if (composer) composer.render(); else renderer.render(scene, camera);
      if (!disposed && visible && !document.hidden && (!reduce || dragging)) raf = requestAnimationFrame(frame);
    }
    resize();
    if (reduce) [...buttons, q("[data-prev]"), q("[data-next]")].forEach((b) => on(b, "click", () => wake()));

  return () => {
    disposed = true;
    clearTimeout(timer);
    cancelAnimationFrame(raf);
    ac.abort();
    ro.disconnect();
    io.disconnect();
    tagsEl.innerHTML = "";
    scene.traverse((o) => { o.geometry?.dispose(); (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m?.dispose()); });
    renderer.dispose();
  };
}
