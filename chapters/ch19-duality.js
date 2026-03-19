// === Chapter 19: Wave-Particle Duality ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch19',
        number: 19,
        title: 'Wave-Particle Duality',
        subtitle: 'Light and matter at the quantum frontier',
        file: 'ch19-duality',

        sections: [
            // ============================================================
            // Section 1: The Photoelectric Effect
            // ============================================================
            {
                id: 'photoelectric-effect',
                title: 'The Photoelectric Effect',
                content: `
<h2>Light Ejects Electrons from Metal</h2>

<p>In 1887, Heinrich Hertz noticed that ultraviolet light helped produce sparks across a gap in his apparatus. By 1902, Philipp Lenard had studied the effect systematically: when light shines on a clean metal surface, electrons are ejected. This is the <strong>photoelectric effect</strong>.</p>

<p>The experimental results were deeply puzzling from the wave perspective:</p>

<div class="env-block definition">
<div class="env-title">Photoelectric effect observations</div>
<div class="env-body">
<ol>
    <li>Electrons are ejected only if the light frequency \\(f\\) exceeds a threshold \\(f_0\\), regardless of intensity.</li>
    <li>Below threshold, no electrons are emitted, even at enormous intensities.</li>
    <li>The maximum kinetic energy of emitted electrons depends on frequency, not intensity.</li>
    <li>Above threshold, electrons appear <em>instantaneously</em> (within \\(\\sim 10^{-9}\\) s), even at very low intensities.</li>
    <li>Higher intensity means more electrons per second, but not faster electrons.</li>
</ol>
</div>
</div>

<p>The wave theory of light predicts that any frequency should eject electrons given enough intensity (energy accumulates continuously) and that brighter light should give faster electrons. Every one of these predictions is wrong.</p>

<div class="viz-placeholder" data-viz="viz-photoelectric"></div>

<div class="env-block intuition">
<div class="env-title">Why the wave picture fails</div>
<div class="env-body">
<p>In the wave picture, the energy of light is spread over the whole wavefront. An electron on the surface intercepts only a tiny fraction of this energy. For dim light at low frequency, the electron would need to accumulate energy for hours before it had enough to escape. But experiments show emission is instantaneous. Something is delivering a concentrated packet of energy to a single electron all at once.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-photoelectric',
                        title: 'The Photoelectric Effect',
                        description: 'Shine light on a metal surface. Adjust the frequency (color) and intensity. Below the threshold frequency, no electrons escape regardless of brightness. Above threshold, electrons are ejected immediately, and their kinetic energy increases with frequency.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var frequency = 6.0; // in units of 10^14 Hz
                            var intensity = 0.5; // 0 to 1
                            var workFunc = 4.0; // threshold frequency in 10^14 Hz (for e.g. ~1.65 eV)
                            var t = 0;
                            var electrons = [];
                            var photonParticles = [];
                            var emissionRate = 0;

                            VizEngine.createSlider(controls, 'Frequency (10\u00B9\u2074 Hz)', 2.0, 12.0, 6.0, 0.1, function (v) {
                                frequency = v;
                            });
                            VizEngine.createSlider(controls, 'Intensity', 0.05, 1.0, 0.5, 0.05, function (v) {
                                intensity = v;
                            });
                            VizEngine.createSlider(controls, 'Work function f\u2080 (10\u00B9\u2074 Hz)', 2.0, 8.0, 4.0, 0.1, function (v) {
                                workFunc = v;
                            });

                            function wavelengthToColor(f14) {
                                // f in 10^14 Hz; visible ~4.3 to 7.5
                                var nm = 3e8 / (f14 * 1e14) * 1e9;
                                var r = 0, g = 0, b = 0;
                                if (nm >= 380 && nm < 440) { r = -(nm - 440) / (440 - 380); b = 1; }
                                else if (nm >= 440 && nm < 490) { g = (nm - 440) / (490 - 440); b = 1; }
                                else if (nm >= 490 && nm < 510) { g = 1; b = -(nm - 510) / (510 - 490); }
                                else if (nm >= 510 && nm < 580) { r = (nm - 510) / (580 - 510); g = 1; }
                                else if (nm >= 580 && nm < 645) { r = 1; g = -(nm - 645) / (645 - 580); }
                                else if (nm >= 645 && nm <= 780) { r = 1; }
                                else if (nm < 380) { r = 0.4; b = 1; } // UV shown as blueish
                                else { r = 0.7; g = 0.1; } // IR shown as dim red
                                return 'rgb(' + Math.round(r * 255) + ',' + Math.round(g * 255) + ',' + Math.round(b * 255) + ')';
                            }

                            function draw() {
                                t += 1 / 60;
                                viz.clear();

                                var metalX = w * 0.38;
                                var metalTop = h * 0.15;
                                var metalBot = h * 0.85;
                                var metalW = 15;

                                // Metal plate
                                ctx.fillStyle = '#667788';
                                ctx.fillRect(metalX, metalTop, metalW, metalBot - metalTop);
                                ctx.strokeStyle = '#99aabb';
                                ctx.lineWidth = 1;
                                ctx.strokeRect(metalX, metalTop, metalW, metalBot - metalTop);
                                viz.screenText('Metal', metalX + metalW / 2, metalBot + 12, viz.colors.text, 9);

                                // Light source (left side)
                                var lightColor = wavelengthToColor(frequency);

                                // Incoming photon particles (from left)
                                if (Math.random() < intensity * 0.5) {
                                    photonParticles.push({
                                        x: 10 + Math.random() * 20,
                                        y: metalTop + Math.random() * (metalBot - metalTop),
                                        vx: 3 + Math.random() * 2
                                    });
                                }

                                // Draw and update photons
                                var newPhotons = [];
                                for (var pi = 0; pi < photonParticles.length; pi++) {
                                    var p = photonParticles[pi];
                                    p.x += p.vx;

                                    if (p.x < metalX) {
                                        // Draw wavy photon
                                        ctx.save();
                                        ctx.shadowColor = lightColor;
                                        ctx.shadowBlur = 6;
                                        ctx.fillStyle = lightColor;
                                        ctx.beginPath();
                                        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                                        ctx.fill();
                                        ctx.restore();

                                        // Small wave trail
                                        ctx.strokeStyle = lightColor;
                                        ctx.lineWidth = 1;
                                        ctx.globalAlpha = 0.4;
                                        ctx.beginPath();
                                        for (var wv = 0; wv < 15; wv++) {
                                            var wx = p.x - wv * 2;
                                            var wy = p.y + Math.sin(wv * 1.5 + t * 10) * 2;
                                            if (wv === 0) ctx.moveTo(wx, wy);
                                            else ctx.lineTo(wx, wy);
                                        }
                                        ctx.stroke();
                                        ctx.globalAlpha = 1;

                                        newPhotons.push(p);
                                    } else {
                                        // Photon hits metal - check if electron emitted
                                        if (frequency > workFunc && Math.random() < 0.3) {
                                            var ke = (frequency - workFunc) * 0.4; // kinetic energy proxy
                                            electrons.push({
                                                x: metalX + metalW + 5,
                                                y: p.y,
                                                vx: 1.5 + ke * 0.8,
                                                vy: (Math.random() - 0.5) * 2,
                                                life: 0
                                            });
                                        }
                                    }
                                }
                                photonParticles = newPhotons;

                                // Draw and update electrons
                                var newElectrons = [];
                                for (var ei = 0; ei < electrons.length; ei++) {
                                    var e = electrons[ei];
                                    e.x += e.vx;
                                    e.y += e.vy;
                                    e.life += 1 / 60;

                                    if (e.x < w && e.life < 3) {
                                        ctx.save();
                                        ctx.shadowColor = viz.colors.cyan;
                                        ctx.shadowBlur = 8;
                                        ctx.fillStyle = viz.colors.cyan;
                                        ctx.beginPath();
                                        ctx.arc(e.x, e.y, 3, 0, Math.PI * 2);
                                        ctx.fill();
                                        ctx.restore();

                                        // Label first electron
                                        if (ei === 0 && e.life < 0.5) {
                                            viz.screenText('e\u207B', e.x + 8, e.y - 8, viz.colors.cyan, 9);
                                        }
                                        newElectrons.push(e);
                                    }
                                }
                                electrons = newElectrons;

                                // Light beam glow on left
                                var beamGrad = ctx.createLinearGradient(0, 0, metalX, 0);
                                var rgba = lightColor.replace('rgb', 'rgba').replace(')', ',0.08)');
                                beamGrad.addColorStop(0, rgba);
                                beamGrad.addColorStop(1, rgba.replace('0.08', '0.15'));
                                ctx.fillStyle = beamGrad;
                                ctx.fillRect(0, metalTop, metalX, metalBot - metalTop);

                                // ---- Info panel ----
                                var infoX = w * 0.62;
                                var aboveThreshold = frequency > workFunc;

                                viz.screenText('Photoelectric Effect', w * 0.5, 12, viz.colors.gold, 13);

                                viz.screenText('f = ' + frequency.toFixed(1) + ' \u00D7 10\u00B9\u2074 Hz', infoX + 40, h * 0.12, lightColor, 11);
                                var nm = (3e8 / (frequency * 1e14) * 1e9).toFixed(0);
                                viz.screenText('\u03BB = ' + nm + ' nm', infoX + 40, h * 0.17, lightColor, 10);
                                viz.screenText('f\u2080 = ' + workFunc.toFixed(1) + ' \u00D7 10\u00B9\u2074 Hz (threshold)', infoX + 40, h * 0.24, viz.colors.text, 10);

                                // Energy bar
                                var photonE = frequency; // proportional
                                var workE = workFunc;
                                var barX = infoX, barY = h * 0.34, barW = w * 0.3, barH = 18;

                                ctx.fillStyle = viz.colors.axis + '44';
                                ctx.fillRect(barX, barY, barW, barH);

                                // Work function portion
                                var wfFrac = Math.min(workE / 12, 1);
                                ctx.fillStyle = viz.colors.red + '88';
                                ctx.fillRect(barX, barY, barW * wfFrac, barH);
                                viz.screenText('Work function \u03C6', barX + barW * wfFrac / 2, barY - 5, viz.colors.red, 8);

                                // Photon energy
                                var peFrac = Math.min(photonE / 12, 1);
                                ctx.strokeStyle = lightColor;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(barX + barW * peFrac, barY - 2);
                                ctx.lineTo(barX + barW * peFrac, barY + barH + 2);
                                ctx.stroke();
                                viz.screenText('hf', barX + barW * peFrac, barY + barH + 12, lightColor, 9);

                                if (aboveThreshold) {
                                    // KE portion
                                    ctx.fillStyle = viz.colors.green + '88';
                                    ctx.fillRect(barX + barW * wfFrac, barY, barW * (peFrac - wfFrac), barH);
                                    viz.screenText('KE\u2098\u2090\u2093', barX + barW * (wfFrac + peFrac) / 2, barY + barH / 2 + 1, viz.colors.green, 8);

                                    ctx.save();
                                    ctx.shadowColor = viz.colors.green;
                                    ctx.shadowBlur = 10;
                                    viz.screenText('\u2713 Electrons emitted!', infoX + 40, h * 0.60, viz.colors.green, 12);
                                    ctx.restore();
                                    viz.screenText('KE_max = hf \u2212 \u03C6 = h(f \u2212 f\u2080)', infoX + 40, h * 0.66, viz.colors.green, 10);
                                    var keVal = ((frequency - workFunc) * 0.414).toFixed(2); // rough eV
                                    viz.screenText('KE_max \u2248 ' + keVal + ' eV', infoX + 40, h * 0.72, viz.colors.green, 10);
                                } else {
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.red;
                                    ctx.shadowBlur = 10;
                                    viz.screenText('\u2717 No electrons! f < f\u2080', infoX + 40, h * 0.60, viz.colors.red, 12);
                                    ctx.restore();
                                    viz.screenText('Photon energy hf < work function \u03C6', infoX + 40, h * 0.66, viz.colors.red, 10);
                                    viz.screenText('Increasing intensity does NOT help!', infoX + 40, h * 0.72, viz.colors.yellow, 10);
                                }

                                // Einstein equation
                                viz.screenText('Einstein (1905): KE_max = hf \u2212 \u03C6', w * 0.5, h - 12, viz.colors.gold, 10);
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Why does increasing the intensity of below-threshold light never eject electrons, according to the photon picture?',
                        hint: 'What does intensity mean in terms of photons?',
                        solution: 'In the photon picture, intensity means more photons per second, but each photon still carries energy \\(hf\\). If \\(hf < \\phi\\) (work function), then no single photon has enough energy to liberate an electron. More photons means more "tries," but each try fails. An electron cannot accumulate energy from multiple photons (at ordinary intensities) because the absorption is a single quantum event: one photon, one electron, all-or-nothing.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Photons
            // ============================================================
            {
                id: 'photons',
                title: 'Photons',
                content: `
<h2>Einstein's Quantum of Light</h2>

<p>In 1905, Albert Einstein proposed a radical idea: light comes in discrete packets of energy, which we now call <strong>photons</strong>. Each photon carries energy proportional to the light's frequency:</p>

<div class="env-block theorem">
<div class="env-title">Photon energy</div>
<div class="env-body">
\\[E = hf = \\frac{hc}{\\lambda}\\]
<p>where \\(h = 6.626 \\times 10^{-34}\\,\\text{J\\cdot s}\\) is <strong>Planck's constant</strong>, \\(f\\) is the frequency, and \\(\\lambda\\) is the wavelength.</p>
</div>
</div>

<p>Einstein's photoelectric equation immediately explains all the puzzling observations:</p>

<div class="env-block theorem">
<div class="env-title">Einstein's photoelectric equation</div>
<div class="env-body">
\\[KE_{\\max} = hf - \\phi\\]
<p>where \\(\\phi = hf_0\\) is the <strong>work function</strong> of the metal (the minimum energy needed to free an electron from the surface).</p>
</div>
</div>

<ul>
    <li>If \\(hf < \\phi\\): no electron is ejected, regardless of intensity. Each photon simply does not carry enough energy.</li>
    <li>If \\(hf > \\phi\\): electrons are ejected with maximum kinetic energy \\(KE_{\\max} = hf - \\phi\\).</li>
    <li>Higher intensity means more photons per second, hence more electrons per second, but each photon still gives the same \\(KE_{\\max}\\).</li>
    <li>Emission is instantaneous because a single photon delivers all its energy to a single electron in one event.</li>
</ul>

<div class="env-block example">
<div class="env-title">Example: Sodium surface</div>
<div class="env-body">
<p>Sodium has a work function \\(\\phi = 2.28\\,\\text{eV}\\). UV light of wavelength 250 nm shines on it.</p>
\\[E = \\frac{hc}{\\lambda} = \\frac{6.626 \\times 10^{-34} \\times 3 \\times 10^8}{250 \\times 10^{-9}} = 7.95 \\times 10^{-19}\\,\\text{J} = 4.97\\,\\text{eV}\\]
\\[KE_{\\max} = 4.97 - 2.28 = 2.69\\,\\text{eV}\\]
<p>The fastest emitted electrons have 2.69 eV of kinetic energy.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Nobel Prize, not for relativity</div>
<div class="env-body">
<p>Einstein received the 1921 Nobel Prize in Physics not for relativity, but for "his discovery of the law of the photoelectric effect." The photon concept was considered more revolutionary and better supported by direct experiment at the time. It took decades for the full implications (quantum mechanics) to be worked out.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Photon momentum</div>
<div class="env-body">
<p>Despite having zero mass, a photon carries momentum:</p>
\\[p = \\frac{E}{c} = \\frac{h}{\\lambda}\\]
<p>This is confirmed by the Compton effect (1923): X-ray photons bounce off electrons and lose energy, exactly as predicted by conservation of momentum and energy for particle-particle collisions. Light exerts radiation pressure, which is now used to manipulate atoms with laser tweezers and proposed for solar sails in space.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'What is the energy (in eV) of a single photon of green light (\\(\\lambda = 550\\,\\text{nm}\\))?',
                        hint: 'Use \\(E = hc/\\lambda\\) and convert to eV by dividing by \\(1.602 \\times 10^{-19}\\).',
                        solution: '\\(E = \\frac{6.626 \\times 10^{-34} \\times 3 \\times 10^8}{550 \\times 10^{-9}} = 3.614 \\times 10^{-19}\\,\\text{J} = \\frac{3.614 \\times 10^{-19}}{1.602 \\times 10^{-19}} = 2.26\\,\\text{eV}\\).'
                    },
                    {
                        question: 'A 5 mW laser pointer emits at 650 nm. How many photons per second does it emit?',
                        hint: 'Each photon has energy \\(E = hc/\\lambda\\). The number per second is power divided by energy per photon.',
                        solution: '\\(E = hc/\\lambda = 6.626 \\times 10^{-34} \\times 3 \\times 10^8 / (650 \\times 10^{-9}) = 3.058 \\times 10^{-19}\\,\\text{J}\\). Number per second: \\(N = P/E = 5 \\times 10^{-3} / 3.058 \\times 10^{-19} = 1.64 \\times 10^{16}\\) photons/s. That is about 16 quadrillion photons every second from a tiny laser pointer.'
                    }
                ]
            },

            // ============================================================
            // Section 3: de Broglie Wavelength
            // ============================================================
            {
                id: 'de-broglie',
                title: 'de Broglie Wavelength',
                content: `
<h2>Matter Waves</h2>

<p>In 1924, Louis de Broglie, a French physics PhD student, made a breathtaking proposal in his doctoral thesis: if light (a wave) can behave as particles (photons), then perhaps particles (electrons, atoms) can behave as waves.</p>

<div class="env-block theorem">
<div class="env-title">de Broglie wavelength</div>
<div class="env-body">
<p>Every particle with momentum \\(p\\) has an associated wavelength:</p>
\\[\\lambda = \\frac{h}{p} = \\frac{h}{mv}\\]
<p>where \\(h\\) is Planck's constant, \\(m\\) is the particle's mass, and \\(v\\) is its velocity.</p>
</div>
</div>

<p>This was a symmetry argument: Einstein had shown \\(p = h/\\lambda\\) for photons. De Broglie simply inverted the relation and applied it to all particles.</p>

<div class="env-block example">
<div class="env-title">Example: Electron wavelength</div>
<div class="env-body">
<p>An electron (\\(m = 9.11 \\times 10^{-31}\\,\\text{kg}\\)) accelerated through 100 V has kinetic energy \\(KE = eV = 1.6 \\times 10^{-17}\\,\\text{J}\\) and speed:</p>
\\[v = \\sqrt{\\frac{2 \\cdot KE}{m}} = \\sqrt{\\frac{2 \\times 1.6 \\times 10^{-17}}{9.11 \\times 10^{-31}}} = 5.93 \\times 10^6\\,\\text{m/s}\\]
\\[\\lambda = \\frac{h}{mv} = \\frac{6.626 \\times 10^{-34}}{9.11 \\times 10^{-31} \\times 5.93 \\times 10^6} = 0.123\\,\\text{nm}\\]
<p>This is comparable to atomic spacings in crystals, which is why electrons can be diffracted by crystals, confirming de Broglie's hypothesis.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Baseball wavelength</div>
<div class="env-body">
<p>A baseball (\\(m = 0.145\\,\\text{kg}\\)) at 40 m/s:</p>
\\[\\lambda = \\frac{6.626 \\times 10^{-34}}{0.145 \\times 40} = 1.14 \\times 10^{-34}\\,\\text{m}\\]
<p>This is about \\(10^{-19}\\) times smaller than a proton. The wave nature of macroscopic objects is utterly undetectable; quantum effects are relevant only for particles of very small mass and/or very low speed.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why we don't see quantum effects in daily life</div>
<div class="env-body">
<p>Planck's constant \\(h = 6.626 \\times 10^{-34}\\,\\text{J\\cdot s}\\) is extraordinarily small. For any object you can see or hold, the de Broglie wavelength is vastly smaller than any conceivable detector could resolve. Quantum wave behavior only becomes apparent for particles with very small mass (electrons, neutrons, atoms) or at very low temperatures where momenta are small. The classical world emerges because \\(h\\) is so tiny.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Experimental confirmation</div>
<div class="env-body">
<p>In 1927, Clinton Davisson and Lester Germer scattered electrons off a nickel crystal and observed a diffraction pattern, exactly as predicted by de Broglie. G.P. Thomson independently observed electron diffraction through thin metal foils. De Broglie received the Nobel Prize in 1929, Davisson and Thomson in 1937. Today, electron diffraction is a standard tool for determining crystal structures.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A neutron (\\(m = 1.675 \\times 10^{-27}\\,\\text{kg}\\)) has kinetic energy 0.025 eV (thermal neutron at room temperature). What is its de Broglie wavelength?',
                        hint: 'First find \\(v\\) from \\(KE = \\frac{1}{2}mv^2\\), then compute \\(\\lambda = h/(mv)\\).',
                        solution: '\\(KE = 0.025 \\times 1.602 \\times 10^{-19} = 4.005 \\times 10^{-21}\\,\\text{J}\\). \\(v = \\sqrt{2 \\cdot KE / m} = \\sqrt{2 \\times 4.005 \\times 10^{-21} / 1.675 \\times 10^{-27}} = 2187\\,\\text{m/s}\\). \\(\\lambda = 6.626 \\times 10^{-34} / (1.675 \\times 10^{-27} \\times 2187) = 0.181\\,\\text{nm}\\). This is comparable to interatomic spacings, which is why thermal neutrons are used for diffraction studies of crystal and molecular structures.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Double-Slit with Single Photons
            // ============================================================
            {
                id: 'double-slit-single-photons',
                title: 'Double-Slit with Single Photons',
                content: `
<h2>The Most Beautiful Experiment</h2>

<p>In Chapter 13, we saw that light passing through two narrow slits produces an interference pattern. This is explained perfectly by wave optics: two coherent waves overlap and produce constructive and destructive interference.</p>

<p>But what happens when we reduce the intensity so far that only <strong>one photon at a time</strong> passes through the apparatus?</p>

<div class="env-block definition">
<div class="env-title">The single-photon double-slit experiment</div>
<div class="env-body">
<ol>
    <li>Send photons one at a time toward a double slit.</li>
    <li>Each photon hits the detector screen at a single, definite point (particle behavior).</li>
    <li>The arrival points appear random at first.</li>
    <li>After thousands of photons, the accumulated hits form the <em>same interference pattern</em> as the classical wave prediction (wave behavior).</li>
</ol>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-single-photon"></div>

<p>This result is profoundly strange. Each photon passes through the apparatus individually, yet the final pattern shows interference, which requires wave-like behavior. But each photon is detected at a single point, which is particle-like. Somehow, each photon "interferes with itself."</p>

<div class="env-block intuition">
<div class="env-title">The mystery deepens</div>
<div class="env-body">
<p>If you try to determine which slit each photon passes through (by placing a detector at one slit), the interference pattern <em>disappears</em>. The photons then arrive in two broad bands (one behind each slit), as particles would. The act of measurement changes the outcome. This is not a limitation of equipment; it is a fundamental feature of quantum mechanics.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Electrons too</div>
<div class="env-body">
<p>The same experiment works with electrons, neutrons, atoms, and even molecules. In 1999, researchers at the University of Vienna observed interference fringes with C\\(_{60}\\) fullerene molecules (720 atomic mass units). The wave nature is universal for all quantum objects.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-single-photon',
                        title: 'Single-Photon Double-Slit Experiment',
                        description: 'Photons arrive one by one at the double slit. Each lands at a definite point on the screen. Watch as the interference pattern gradually emerges from what initially looks like random noise. The red curve shows the theoretical interference pattern.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var photonCount = 0;
                            var maxPhotons = 8000;
                            var hits = []; // {x, y} screen coordinates
                            var histogram = new Array(200).fill(0);
                            var rate = 5; // photons per frame
                            var paused = false;
                            var slitSep = 0.15; // in mm, controls fringe spacing
                            var screenDist = 1.0; // meters
                            // Flying photon
                            var flyingPhoton = null;
                            var flyTimer = 0;

                            VizEngine.createSlider(controls, 'Photon rate', 1, 50, 5, 1, function (v) { rate = v; });
                            VizEngine.createButton(controls, 'Reset', function () {
                                photonCount = 0; hits = []; histogram = new Array(200).fill(0);
                            });
                            VizEngine.createButton(controls, 'Pause / Resume', function () { paused = !paused; });

                            // Double-slit interference probability distribution
                            // P(y) ~ cos^2(pi * d * y / (lambda * L)) * sinc^2(pi * a * y / (lambda * L))
                            function probability(yScreen) {
                                // yScreen: -1 to 1 (normalized)
                                var d = 6; // slit separation parameter
                                var a = 1.5; // slit width parameter
                                var cosArg = Math.PI * d * yScreen;
                                var sincArg = Math.PI * a * yScreen;
                                var sinc = sincArg === 0 ? 1 : Math.sin(sincArg) / sincArg;
                                return Math.cos(cosArg) * Math.cos(cosArg) * sinc * sinc;
                            }

                            // Sample from distribution using rejection sampling
                            function sampleY() {
                                while (true) {
                                    var y = (Math.random() - 0.5) * 2;
                                    var p = probability(y);
                                    if (Math.random() < p) return y;
                                }
                            }

                            function draw() {
                                flyTimer++;
                                viz.clear();

                                // Layout
                                var slitX = w * 0.28;
                                var screenX = w * 0.55;
                                var screenTop = h * 0.05;
                                var screenBot = h * 0.95;
                                var screenH = screenBot - screenTop;
                                var screenMidY = (screenTop + screenBot) / 2;

                                // Source
                                ctx.save();
                                ctx.shadowColor = viz.colors.gold;
                                ctx.shadowBlur = 10;
                                ctx.fillStyle = viz.colors.gold;
                                ctx.beginPath();
                                ctx.arc(w * 0.05, h * 0.5, 6, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.restore();
                                viz.screenText('Source', w * 0.05, h * 0.5 + 18, viz.colors.gold, 9);

                                // Barrier with two slits
                                var slitGap = h * 0.06;
                                var slitWidth = h * 0.025;
                                ctx.fillStyle = '#334455';
                                ctx.fillRect(slitX - 3, screenTop, 6, screenMidY - slitGap - slitWidth / 2 - screenTop);
                                ctx.fillRect(slitX - 3, screenMidY - slitGap + slitWidth / 2, 6, slitGap * 2 - slitWidth);
                                ctx.fillRect(slitX - 3, screenMidY + slitGap + slitWidth / 2, 6, screenBot - screenMidY - slitGap - slitWidth / 2);

                                // Slit labels
                                viz.screenText('Slit 1', slitX + 12, screenMidY - slitGap, viz.colors.text, 8);
                                viz.screenText('Slit 2', slitX + 12, screenMidY + slitGap, viz.colors.text, 8);

                                // Detection screen
                                ctx.fillStyle = '#112233';
                                ctx.fillRect(screenX - 2, screenTop, 4, screenH);

                                // Add new photons
                                if (!paused && photonCount < maxPhotons) {
                                    for (var ni = 0; ni < rate; ni++) {
                                        if (photonCount >= maxPhotons) break;
                                        var yNorm = sampleY();
                                        var yPx = screenMidY + yNorm * screenH * 0.45;
                                        var xJitter = screenX + (Math.random() - 0.5) * 3;
                                        hits.push({ x: xJitter, y: yPx });

                                        // Histogram
                                        var bin = Math.floor((yPx - screenTop) / screenH * histogram.length);
                                        if (bin >= 0 && bin < histogram.length) {
                                            histogram[bin]++;
                                        }
                                        photonCount++;
                                    }
                                }

                                // Flying photon animation
                                if (!paused && flyTimer % 3 === 0) {
                                    flyingPhoton = {
                                        x: w * 0.05,
                                        y: h * 0.5,
                                        targetY: hits.length > 0 ? hits[hits.length - 1].y : screenMidY,
                                        progress: 0
                                    };
                                }
                                if (flyingPhoton) {
                                    flyingPhoton.progress += 0.08;
                                    if (flyingPhoton.progress < 1) {
                                        var fp = flyingPhoton.progress;
                                        var fpx, fpy;
                                        if (fp < 0.4) {
                                            // Source to slit
                                            var frac = fp / 0.4;
                                            fpx = w * 0.05 + (slitX - w * 0.05) * frac;
                                            fpy = h * 0.5;
                                        } else {
                                            // Slit to screen
                                            var frac2 = (fp - 0.4) / 0.6;
                                            fpx = slitX + (screenX - slitX) * frac2;
                                            fpy = h * 0.5 + (flyingPhoton.targetY - h * 0.5) * frac2;
                                        }
                                        ctx.save();
                                        ctx.shadowColor = viz.colors.gold;
                                        ctx.shadowBlur = 10;
                                        ctx.fillStyle = viz.colors.gold;
                                        ctx.beginPath();
                                        ctx.arc(fpx, fpy, 2.5, 0, Math.PI * 2);
                                        ctx.fill();
                                        ctx.restore();
                                    }
                                }

                                // Draw accumulated hits
                                for (var hi = 0; hi < hits.length; hi++) {
                                    var hit = hits[hi];
                                    var age = (hits.length - hi) / hits.length;
                                    var alpha = 0.3 + 0.5 * (1 - age * 0.8);
                                    ctx.fillStyle = 'rgba(0,212,255,' + alpha.toFixed(2) + ')';
                                    ctx.fillRect(hit.x - 0.8, hit.y - 0.8, 1.6, 1.6);
                                }

                                // Draw histogram on the right
                                var histX = w * 0.62;
                                var histW = w * 0.15;
                                var maxH = 0;
                                for (var hh = 0; hh < histogram.length; hh++) {
                                    if (histogram[hh] > maxH) maxH = histogram[hh];
                                }

                                if (maxH > 0) {
                                    ctx.fillStyle = viz.colors.cyan + '55';
                                    for (var hhi = 0; hhi < histogram.length; hhi++) {
                                        var binH = histogram[hhi] / maxH * histW;
                                        var binY = screenTop + hhi / histogram.length * screenH;
                                        var binSize = screenH / histogram.length;
                                        ctx.fillRect(histX, binY, binH, binSize + 0.5);
                                    }
                                }

                                // Theoretical curve
                                ctx.strokeStyle = viz.colors.red + 'aa';
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                for (var ti = 0; ti < 300; ti++) {
                                    var tyNorm = (ti / 300 - 0.5) * 2;
                                    var tyPx = screenTop + ti / 300 * screenH;
                                    var pVal = probability(tyNorm) * histW * 0.95;
                                    var txPx = histX + pVal;
                                    if (ti === 0) ctx.moveTo(txPx, tyPx);
                                    else ctx.lineTo(txPx, tyPx);
                                }
                                ctx.stroke();

                                // Legend and info
                                viz.screenText('Single-Photon Double-Slit', w * 0.5, 12, viz.colors.gold, 13);
                                viz.screenText('Photons: ' + photonCount + ' / ' + maxPhotons, w * 0.88, 20, viz.colors.text, 10);

                                // Phase labels
                                var phaseLabel;
                                if (photonCount < 20) phaseLabel = 'Random dots (particle behavior)';
                                else if (photonCount < 200) phaseLabel = 'Pattern beginning to emerge...';
                                else if (photonCount < 1000) phaseLabel = 'Interference fringes appearing!';
                                else phaseLabel = 'Clear interference pattern (wave behavior)';
                                viz.screenText(phaseLabel, w * 0.5, h - 12, viz.colors.gold, 10);

                                viz.screenText('Histogram', histX + histW / 2, screenTop - 8, viz.colors.cyan, 9);
                                viz.screenText('Theory', histX + histW + 12, screenTop + 10, viz.colors.red, 9);

                                // Faint guide lines between source and slits
                                ctx.strokeStyle = viz.colors.gold + '15';
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(w * 0.05, h * 0.5);
                                ctx.lineTo(slitX, screenMidY - slitGap);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(w * 0.05, h * 0.5);
                                ctx.lineTo(slitX, screenMidY + slitGap);
                                ctx.stroke();
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'In the single-photon double-slit experiment, each photon passes through the slits one at a time. How can interference occur if there is only one photon present at any moment?',
                        hint: 'Think about what interferes. Is it two photons, or something else?',
                        solution: 'The photon does not take one definite path. In quantum mechanics, the photon is described by a probability amplitude (wave function) that passes through <em>both</em> slits simultaneously. The amplitudes from the two slits interfere (add or cancel depending on phase). The photon then "collapses" to a single point when detected. It is the probability amplitude that interferes, not multiple photons with each other. Each photon interferes with itself.'
                    }
                ]
            },

            // ============================================================
            // Section 5: The Quantum Mystery
            // ============================================================
            {
                id: 'quantum-mystery',
                title: 'The Quantum Mystery',
                content: `
<h2>Neither Wave Nor Particle</h2>

<p>The double-slit experiment with single photons (or electrons) reveals the central mystery of quantum mechanics: quantum objects are neither classical waves nor classical particles. They exhibit both behaviors, depending on the experimental arrangement.</p>

<div class="env-block definition">
<div class="env-title">Wave-particle duality</div>
<div class="env-body">
<p><strong>Wave-particle duality:</strong> Quantum objects (photons, electrons, atoms, molecules) exhibit wave-like behavior (interference, diffraction) when not observed, and particle-like behavior (discrete detection events at definite points) when measured. No classical concept fully captures their nature.</p>
</div>
</div>

<h3>Complementarity</h3>

<p>Niels Bohr articulated the <strong>principle of complementarity</strong> (1928): wave and particle descriptions are complementary aspects of quantum reality. No experiment can reveal both simultaneously in full. If you set up the experiment to see interference (wave behavior), you cannot determine which slit the photon went through. If you set up the experiment to determine the path (particle behavior), the interference vanishes.</p>

<div class="env-block intuition">
<div class="env-title">The measurement problem</div>
<div class="env-body">
<p>The deepest puzzle is this: quantum mechanics tells us that an unobserved photon is described by a superposition (a wave that goes through both slits). But when we look, we always find the photon at one definite place. How and why does the superposition "collapse" into a definite outcome? This is the <strong>measurement problem</strong>, and it remains one of the most debated questions in the foundations of physics. After nearly a century, there is no consensus on its resolution.</p>
</div>
</div>

<h3>The Uncertainty Principle</h3>

<p>Wave-particle duality is intimately connected to Heisenberg's uncertainty principle:</p>

<div class="env-block theorem">
<div class="env-title">Heisenberg uncertainty principle (1927)</div>
<div class="env-body">
\\[\\Delta x \\cdot \\Delta p \\geq \\frac{\\hbar}{2}\\]
<p>where \\(\\hbar = h/(2\\pi) = 1.055 \\times 10^{-34}\\,\\text{J\\cdot s}\\). You cannot simultaneously know both the position and momentum of a particle with arbitrary precision. The more precisely you know one, the less precisely you can know the other.</p>
</div>
</div>

<p>If you try to determine which slit the photon goes through (pinning down its position to one slit), you inevitably disturb its momentum, which destroys the precise phase relationship needed for interference. Complementarity and uncertainty are two faces of the same underlying quantum reality.</p>

<div class="env-block remark">
<div class="env-title">What quantum mechanics actually says</div>
<div class="env-body">
<p>The mathematical framework of quantum mechanics (Schrodinger's equation, probability amplitudes, Hilbert spaces) is precise, elegant, and spectacularly successful. It predicts every experimental result to extraordinary accuracy. What physicists disagree about is not the formalism or its predictions, but its <em>interpretation</em>: what is really happening when no one is looking? The Copenhagen, many-worlds, decoherence, and pilot-wave interpretations all reproduce the same predictions but tell radically different stories about reality.</p>
</div>
</div>

<h3>The End, and the Beginning</h3>

<p>With wave-particle duality, we reach the frontier of classical optics and step into quantum mechanics. Everything you have learned in this course, from wave motion through interference, diffraction, and polarization, remains valid. Classical wave optics is not wrong; it is an extraordinarily accurate description of light when many photons are involved. But at the deepest level, light consists of individual quantum objects, and their behavior is described by the rules of quantum mechanics.</p>

<div class="env-block intuition">
<div class="env-title">The arc of this course</div>
<div class="env-body">
<p>We began with mechanical waves on ropes and in air. We discovered that light is a wave: it diffracts, interferes, and is polarized. We measured its wavelength, understood its colors, and built instruments with lenses and gratings. And now, at the very end, we find that light is also something else entirely: quanta of the electromagnetic field, objects that obey rules no classical picture can fully capture. The story of optics is the story of humanity learning to see what light really is, and each answer has opened deeper questions.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'An electron is confined to a region of size \\(\\Delta x = 0.1\\,\\text{nm}\\) (roughly atomic size). What is the minimum uncertainty in its speed?',
                        hint: 'Use \\(\\Delta p \\geq \\hbar/(2\\Delta x)\\) and \\(\\Delta v = \\Delta p / m\\).',
                        solution: '\\(\\Delta p \\geq \\frac{\\hbar}{2\\Delta x} = \\frac{1.055 \\times 10^{-34}}{2 \\times 10^{-10}} = 5.28 \\times 10^{-25}\\,\\text{kg\\cdot m/s}\\). So \\(\\Delta v = \\Delta p / m = 5.28 \\times 10^{-25} / 9.11 \\times 10^{-31} = 5.8 \\times 10^{5}\\,\\text{m/s}\\). The speed uncertainty is about 580 km/s, or roughly 0.2% of the speed of light. At atomic scales, the uncertainty principle imposes a significant "quantum jitter" that is the origin of atomic structure and chemistry.'
                    },
                    {
                        question: 'Richard Feynman called the double-slit experiment "the only mystery" of quantum mechanics. What did he mean?',
                        hint: 'Think about what the experiment reveals that no classical picture can explain.',
                        solution: 'Feynman meant that the double-slit experiment, in its simplest form, contains all the essential strangeness of quantum mechanics: superposition (the photon goes through both slits), interference of probability amplitudes, collapse upon measurement, and complementarity (observing the path destroys the pattern). Every other quantum phenomenon (entanglement, tunneling, quantized energy levels) is ultimately a variation on the same theme. If you can accept and understand what happens in the double slit, you have grasped the core logic of quantum mechanics.'
                    }
                ]
            }
        ]
    });
})();
