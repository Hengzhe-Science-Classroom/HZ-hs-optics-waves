// === Chapter 0: What Is a Wave? ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch00',
        number: 0,
        title: 'What Is a Wave?',
        subtitle: 'Energy in motion, matter standing still',
        file: 'ch00-wave-basics',

        sections: [
            // ============================================================
            // Section 0: Waves Carry Energy, Not Matter
            // ============================================================
            {
                id: 'energy-not-matter',
                title: 'Waves Carry Energy, Not Matter',
                content: `
<h2>Something Moves, but It Is Not the Stuff</h2>

<p>Drop a stone into a still pond. Ripples spread outward in every direction. A leaf floating on the surface bobs up and down but does not travel with the ripple. The <em>wave</em> moves outward; the <em>water</em> merely oscillates in place. This is the single most important idea in wave physics:</p>

<div class="env-block definition">
<div class="env-title">Definition: Wave</div>
<div class="env-body">
<p>A <strong>wave</strong> is a disturbance that propagates through a medium (or through empty space, for electromagnetic waves) and transports <strong>energy</strong> and <strong>momentum</strong> without transporting matter.</p>
</div>
</div>

<p>Think of a stadium "wave": each person stands up and sits down in place, yet the pattern races around the stadium. The people are the medium; the pattern is the wave. The wave carries the excitement (energy), but no person changes seats.</p>

<div class="env-block intuition">
<div class="env-title">Why does this matter?</div>
<div class="env-body">
<p>Sound reaches your ears, but no air molecules travel from the speaker to your eardrum. Ocean waves deliver energy to the shore, but the water in the deep ocean stays in the deep ocean. Earthquakes shake buildings hundreds of kilometers from the fault. In every case, energy moves; matter oscillates locally.</p>
</div>
</div>

<h3>Mechanical vs Electromagnetic Waves</h3>

<p>Waves that need a physical medium (water, air, a rope, the Earth's crust) are called <strong>mechanical waves</strong>. Sound, ocean waves, and seismic waves are all mechanical. <strong>Electromagnetic waves</strong> (light, radio, X-rays) need no medium; they can travel through the vacuum of space. This course begins with mechanical waves and builds toward light.</p>

<div class="viz-placeholder" data-viz="viz-rope-wave"></div>
`,
                visualizations: [
                    {
                        id: 'viz-rope-wave',
                        title: 'A Pulse on a Rope',
                        description: 'A wave pulse travels along the rope from left to right. Watch each <strong>particle</strong> (colored dot): it moves only up and down, never sideways. The wave carries energy horizontally while matter oscillates vertically.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: 40, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            viz.originY = h / 2;

                            var N = 60;
                            var spacing = 0.22;
                            var speed = 2.5;
                            var pulseWidth = 1.8;
                            var amplitude = 2.0;
                            var t0 = performance.now();
                            var paused = false;

                            VizEngine.createButton(controls, 'Restart', function () { t0 = performance.now(); });
                            VizEngine.createButton(controls, 'Pause / Play', function () { paused = !paused; if (!paused) t0 = performance.now() - tLast * 1000; });

                            var tLast = 0;

                            function pulse(x, xc) {
                                var d = x - xc;
                                return amplitude * Math.exp(-d * d / (2 * pulseWidth * pulseWidth));
                            }

                            function draw(now) {
                                if (!paused) {
                                    tLast = (now - t0) / 1000;
                                }
                                var t = tLast;
                                var xCenter = -3 + speed * t;
                                // loop
                                if (xCenter > N * spacing + 5) { t0 = now; tLast = 0; }

                                viz.clear();

                                // Faint horizontal baseline
                                ctx.strokeStyle = 'rgba(255,255,255,0.08)';
                                ctx.lineWidth = 1;
                                var s0 = viz.toScreen(0, 0);
                                var s1 = viz.toScreen(N * spacing, 0);
                                ctx.beginPath(); ctx.moveTo(s0[0], s0[1]); ctx.lineTo(s1[0], s1[1]); ctx.stroke();

                                // Draw rope as smooth curve
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                for (var i = 0; i <= N; i++) {
                                    var px = i * spacing;
                                    var py = pulse(px, xCenter);
                                    var sp = viz.toScreen(px, py);
                                    if (i === 0) ctx.moveTo(sp[0], sp[1]);
                                    else ctx.lineTo(sp[0], sp[1]);
                                }
                                ctx.stroke();

                                // Draw particles with vertical trails
                                for (var j = 0; j <= N; j += 3) {
                                    var px2 = j * spacing;
                                    var py2 = pulse(px2, xCenter);
                                    // Vertical guide line
                                    var sb = viz.toScreen(px2, 0);
                                    var st = viz.toScreen(px2, py2);
                                    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
                                    ctx.lineWidth = 1;
                                    ctx.beginPath(); ctx.moveTo(sb[0], sb[1]); ctx.lineTo(st[0], st[1]); ctx.stroke();

                                    // Particle glow
                                    var hue = (j / N) * 280;
                                    var col = VizEngine.hsl(hue, 80, 60);
                                    viz.drawBall(px2, py2, 0.12, col, 2.5);
                                }

                                // Arrow showing propagation direction
                                var arrowX = xCenter;
                                var arrowY = amplitude + 0.8;
                                if (arrowX > 0 && arrowX < N * spacing) {
                                    viz.drawVector(arrowX - 0.6, arrowY, 1.4, 0, viz.colors.orange, 'v', 2, 10);
                                }

                                // Labels
                                viz.screenText('Wave propagation direction \u2192', w / 2, 22, viz.colors.orange, 13);
                                viz.screenText('Each particle moves only \u2195', w / 2, h - 16, viz.colors.teal, 12);
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A cork floats on the surface of a pond. When a wave passes, does the cork move toward the shore?',
                        hint: 'Think about what waves transport and what they do not.',
                        solution: 'No. The cork bobs up and down (and slightly in a circular path for water surface waves), but it does not travel with the wave. Waves transport energy, not matter.'
                    },
                    {
                        question: 'An earthquake\'s P-wave travels at 6 km/s through rock. Does the rock itself move at 6 km/s?',
                        hint: 'Distinguish between the speed of the wave pattern and the speed of the medium particles.',
                        solution: 'No. The rock particles oscillate back and forth over tiny distances (millimeters to centimeters). The wave pattern, not the rock, travels at 6 km/s.'
                    }
                ]
            },

            // ============================================================
            // Section 1: Transverse vs Longitudinal
            // ============================================================
            {
                id: 'transverse-longitudinal',
                title: 'Transverse vs Longitudinal',
                content: `
<h2>Two Fundamental Types of Wave</h2>

<p>The direction in which the medium oscillates relative to the wave's travel direction determines the wave type.</p>

<div class="env-block definition">
<div class="env-title">Definition: Transverse Wave</div>
<div class="env-body">
<p>In a <strong>transverse wave</strong>, the particles of the medium oscillate <strong>perpendicular</strong> to the direction of wave propagation. Example: a wave on a rope, electromagnetic waves.</p>
</div>
</div>

<div class="env-block definition">
<div class="env-title">Definition: Longitudinal Wave</div>
<div class="env-body">
<p>In a <strong>longitudinal wave</strong>, the particles of the medium oscillate <strong>parallel</strong> to the direction of wave propagation, creating regions of <strong>compression</strong> (high density) and <strong>rarefaction</strong> (low density). Example: sound waves in air.</p>
</div>
</div>

<p>On a rope, you can flick it sideways to make a transverse wave, or push and pull along its length to make a longitudinal one (harder to see on a rope, but easy with a slinky). Sound in air is purely longitudinal: air molecules push forward and pull back, creating pressure variations that your ear detects.</p>

<div class="env-block remark">
<div class="env-title">Surface waves are both</div>
<div class="env-body">
<p>Water surface waves are neither purely transverse nor purely longitudinal. Each water molecule traces an approximately <strong>circular</strong> (or elliptical) path, combining horizontal and vertical oscillation. This is why a floating cork bobs in a small circle rather than straight up and down.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-trans-long"></div>
`,
                visualizations: [
                    {
                        id: 'viz-trans-long',
                        title: 'Transverse vs Longitudinal: Side by Side',
                        description: 'Top: <strong>transverse</strong> wave; particles move up/down while the wave travels right. Bottom: <strong>longitudinal</strong> wave; particles move left/right, creating compressions (crowded) and rarefactions (spread out).',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 30, originX: 50, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            viz.originY = h * 0.3;

                            var N = 40;
                            var sp = 0.35;
                            var amp = 1.5;
                            var waveLen = 5.0;
                            var freq = 0.8;
                            var t0 = performance.now();

                            var speedVal = 1.0;
                            VizEngine.createSlider(controls, 'Speed', 0.2, 2.0, speedVal, 0.1, function (v) { speedVal = v; });

                            function draw(now) {
                                var t = ((now - t0) / 1000) * speedVal;
                                var k = 2 * Math.PI / waveLen;
                                var omega = 2 * Math.PI * freq;

                                viz.clear();

                                // === TRANSVERSE (top half) ===
                                var yOff = 0;
                                viz.screenText('TRANSVERSE', 50, viz.originY - amp * viz.scale - 30, viz.colors.cyan, 13, 'left', 'bottom');
                                viz.screenText('wave \u2192', w - 60, viz.originY - amp * viz.scale - 30, viz.colors.orange, 11, 'right', 'bottom');

                                // Baseline
                                var bl1 = viz.toScreen(0, yOff);
                                var bl2 = viz.toScreen(N * sp, yOff);
                                ctx.strokeStyle = 'rgba(255,255,255,0.07)';
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(bl1[0], bl1[1]); ctx.lineTo(bl2[0], bl2[1]); ctx.stroke();

                                // Rope curve
                                ctx.strokeStyle = viz.colors.cyan;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var i = 0; i <= 300; i++) {
                                    var xc = (i / 300) * N * sp;
                                    var yc = amp * Math.sin(k * xc - omega * t) + yOff;
                                    var sc = viz.toScreen(xc, yc);
                                    if (i === 0) ctx.moveTo(sc[0], sc[1]);
                                    else ctx.lineTo(sc[0], sc[1]);
                                }
                                ctx.stroke();

                                // Particles
                                for (var j = 0; j < N; j += 2) {
                                    var px = j * sp;
                                    var py = amp * Math.sin(k * px - omega * t) + yOff;
                                    var hue = (j / N) * 200 + 160;
                                    viz.drawBall(px, py, 0.1, VizEngine.hsl(hue, 75, 55), 2);
                                    // Vertical guide
                                    var sb = viz.toScreen(px, yOff);
                                    var st = viz.toScreen(px, py);
                                    ctx.strokeStyle = 'rgba(100,200,255,0.12)';
                                    ctx.lineWidth = 0.5;
                                    ctx.beginPath(); ctx.moveTo(sb[0], sb[1]); ctx.lineTo(st[0], st[1]); ctx.stroke();
                                }

                                // === LONGITUDINAL (bottom half) ===
                                var yBase = -(h * 0.35) / viz.scale;
                                var longY = viz.originY + h * 0.35;
                                viz.screenText('LONGITUDINAL', 50, longY - 25, viz.colors.orange, 13, 'left', 'bottom');
                                viz.screenText('wave \u2192', w - 60, longY - 25, viz.colors.orange, 11, 'right', 'bottom');

                                // Baseline for longitudinal
                                ctx.strokeStyle = 'rgba(255,255,255,0.05)';
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(bl1[0], longY); ctx.lineTo(bl2[0], longY); ctx.stroke();

                                // Longitudinal particles
                                var longAmp = sp * 1.4;
                                for (var m = 0; m < N; m++) {
                                    var eqX = m * sp;
                                    var displacement = longAmp * Math.sin(k * eqX - omega * t);
                                    var actualX = eqX + displacement;
                                    var sx = viz.toScreen(actualX, 0)[0];

                                    // Color by density (compression = bright, rarefaction = dim)
                                    var dydx = longAmp * k * Math.cos(k * eqX - omega * t);
                                    // Compression: dydx < 0 (particles converge)
                                    var brightness = VizEngine.clamp(50 - dydx * 30, 25, 85);
                                    var sat = VizEngine.clamp(80 + dydx * 20, 40, 100);
                                    var col = VizEngine.hsl(25, sat, brightness);

                                    ctx.fillStyle = col;
                                    ctx.beginPath();
                                    ctx.arc(sx, longY, 5, 0, Math.PI * 2);
                                    ctx.fill();

                                    // Glow for dense regions
                                    if (dydx < -0.3) {
                                        ctx.save();
                                        ctx.shadowColor = viz.colors.orange;
                                        ctx.shadowBlur = 8;
                                        ctx.beginPath();
                                        ctx.arc(sx, longY, 3, 0, Math.PI * 2);
                                        ctx.fill();
                                        ctx.restore();
                                    }
                                }

                                // Labels for compression/rarefaction
                                for (var nn = 0; nn < 3; nn++) {
                                    var phase = omega * t + nn * Math.PI;
                                    var compX = (phase / k) % (N * sp);
                                    if (compX > 1 && compX < N * sp - 1) {
                                        var csx = viz.toScreen(compX, 0)[0];
                                        viz.screenText('C', csx, longY + 18, viz.colors.yellow, 10);
                                    }
                                    var rarX = compX + waveLen / 2;
                                    if (rarX > 1 && rarX < N * sp - 1) {
                                        var rsx = viz.toScreen(rarX, 0)[0];
                                        viz.screenText('R', rsx, longY + 18, viz.colors.text, 10);
                                    }
                                }

                                viz.screenText('C = compression   R = rarefaction', w / 2, h - 12, viz.colors.text, 10);
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Classify each of the following as transverse, longitudinal, or both: (a) light, (b) sound in air, (c) waves on a guitar string, (d) ocean surface waves.',
                        hint: 'Consider the direction of oscillation relative to the direction of wave travel.',
                        solution: '(a) Transverse (EM waves oscillate E and B fields perpendicular to propagation). (b) Longitudinal (air molecules oscillate along the direction of propagation). (c) Transverse (string moves perpendicular to the direction along the string). (d) Both (water molecules trace circular/elliptical paths combining transverse and longitudinal motion).'
                    }
                ]
            },

            // ============================================================
            // Section 2: Pulse vs Continuous Wave
            // ============================================================
            {
                id: 'pulse-continuous',
                title: 'Pulse vs Continuous Wave',
                content: `
<h2>One Shake or a Steady Oscillation</h2>

<p>Give a rope a single flick and a solitary hump, a <strong>pulse</strong>, travels down the rope. Now shake the rope back and forth steadily, and a continuous train of crests and troughs propagates away from your hand. Both are waves, but they have different characteristics.</p>

<div class="env-block definition">
<div class="env-title">Definition: Pulse</div>
<div class="env-body">
<p>A <strong>pulse</strong> is a single, short-duration disturbance that moves through a medium. It has a definite beginning and end.</p>
</div>
</div>

<div class="env-block definition">
<div class="env-title">Definition: Continuous (Periodic) Wave</div>
<div class="env-body">
<p>A <strong>continuous wave</strong> (or periodic wave) is an ongoing, repeating disturbance generated by a source that oscillates steadily. The wave has a well-defined wavelength, frequency, and amplitude.</p>
</div>
</div>

<p>Most of the mathematical machinery of wave physics (wavelength, frequency, period) applies directly to continuous waves. A pulse can be thought of as a superposition of many continuous waves of different frequencies, but we will save that (Fourier analysis) for later.</p>

<div class="env-block remark">
<div class="env-title">Why sinusoidal waves are special</div>
<div class="env-body">
<p>A sine wave is the simplest periodic wave. Any periodic wave, no matter how complex its shape, can be decomposed into a sum of sinusoidal waves (Fourier's theorem). So mastering sine waves gives you the tools to handle any wave.</p>
</div>
</div>

<h3>The Shape of a Pulse</h3>

<p>A Gaussian pulse has the mathematical form \\(y(x,t) = A\\,e^{-(x-vt)^2/(2\\sigma^2)}\\), where \\(A\\) is the peak amplitude, \\(v\\) is the wave speed, and \\(\\sigma\\) controls the pulse width. Notice that the argument \\(x - vt\\) means the entire shape moves to the right at speed \\(v\\) without changing form (in an ideal, non-dispersive medium).</p>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A single clap of thunder vs a sustained musical note: which is more like a pulse and which is more like a continuous wave?',
                        hint: 'Consider the duration and repetition of each disturbance.',
                        solution: 'Thunder is a short, non-repeating disturbance, so it is pulse-like. A sustained musical note is an ongoing, periodic oscillation, so it is a continuous wave.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Wave Speed Depends on the Medium
            // ============================================================
            {
                id: 'wave-speed-medium',
                title: 'Wave Speed Depends on the Medium',
                content: `
<h2>The Medium Decides How Fast</h2>

<p>You cannot change the speed of a wave by shaking your hand faster. Shaking faster changes the frequency (and therefore the wavelength), but the wave speed is determined by the properties of the medium. This is a crucial point that many students get wrong.</p>

<div class="env-block theorem">
<div class="env-title">Wave Speed on a String</div>
<div class="env-body">
<p>The speed of a transverse wave on a taut string is:</p>
\\[v = \\sqrt{\\frac{T}{\\mu}}\\]
<p>where \\(T\\) is the tension in the string (in newtons) and \\(\\mu\\) is the linear mass density (mass per unit length, in kg/m).</p>
</div>
</div>

<p>This makes physical sense:</p>
<ul>
<li><strong>Higher tension</strong> means a stronger restoring force, pulling displaced particles back faster, so the wave moves faster.</li>
<li><strong>Higher mass density</strong> means more inertia, so particles respond more sluggishly, and the wave moves slower.</li>
</ul>

<div class="env-block example">
<div class="env-title">Example: Guitar String</div>
<div class="env-body">
<p>A guitar string has linear mass density \\(\\mu = 0.005\\,\\text{kg/m}\\) and is under tension \\(T = 80\\,\\text{N}\\). The wave speed is:</p>
\\[v = \\sqrt{\\frac{80}{0.005}} = \\sqrt{16000} = 126.5\\,\\text{m/s}\\]
</div>
</div>

<div class="env-block remark">
<div class="env-title">Sound speed in air</div>
<div class="env-body">
<p>For sound in air, the speed depends on temperature: \\(v \\approx 331 + 0.6\\,T_{\\text{C}}\\) m/s, where \\(T_{\\text{C}}\\) is the temperature in degrees Celsius. At 20 &deg;C, \\(v \\approx 343\\) m/s. Higher temperature means faster-moving air molecules and faster sound propagation.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Common misconception</div>
<div class="env-body">
<p>"Shaking the rope harder makes the wave go faster." <strong>False.</strong> Shaking harder increases the amplitude (the wave carries more energy), but the speed stays the same. Shaking faster increases the frequency (more waves per second), but the speed still stays the same. Only changing the medium (tension, density, temperature) changes the speed.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A string of length 2 m has a mass of 10 g and is under 200 N of tension. Find the wave speed.',
                        hint: 'First find \\(\\mu = m/L\\), then use \\(v = \\sqrt{T/\\mu}\\).',
                        solution: '\\(\\mu = 0.010/2 = 0.005\\,\\text{kg/m}\\). \\(v = \\sqrt{200/0.005} = \\sqrt{40000} = 200\\,\\text{m/s}\\).'
                    },
                    {
                        question: 'If you double the tension on a string while keeping everything else the same, by what factor does the wave speed change?',
                        hint: 'Wave speed depends on \\(\\sqrt{T}\\).',
                        solution: '\\(v \\propto \\sqrt{T}\\). If \\(T \\to 2T\\), then \\(v \\to \\sqrt{2}\\,v \\approx 1.41\\,v\\). The speed increases by a factor of \\(\\sqrt{2}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 4: Water Waves
            // ============================================================
            {
                id: 'water-waves',
                title: 'Water Waves',
                content: `
<h2>Circular Orbits Beneath the Surface</h2>

<p>Water waves are among the most familiar and yet most complex waves in nature. They are neither purely transverse nor purely longitudinal. Each water molecule traces an approximately circular orbit: it moves forward at the crest, down on the trailing face, backward at the trough, and up on the leading face. The net result is no horizontal transport (ignoring wind-driven currents), but the wave pattern glides across the surface.</p>

<div class="env-block definition">
<div class="env-title">Definition: Surface Wave</div>
<div class="env-body">
<p>A <strong>surface wave</strong> travels along the interface between two media (e.g., air and water). Water surface waves involve a combination of transverse and longitudinal motion, with particles tracing approximately circular paths.</p>
</div>
</div>

<h3>Deep Water vs Shallow Water</h3>

<p>The speed of water surface waves depends on the depth relative to the wavelength:</p>
<ul>
<li><strong>Deep water</strong> (depth \\(\\gg \\lambda\\)): \\(v = \\sqrt{g\\lambda/(2\\pi)}\\). Speed depends on wavelength; long waves travel faster. This is why a distant storm's swell arrives at the beach as long, smooth waves before the short, choppy ones.</li>
<li><strong>Shallow water</strong> (depth \\(\\ll \\lambda\\)): \\(v = \\sqrt{gd}\\). Speed depends only on depth \\(d\\); all wavelengths travel at the same speed. Waves slow down as they approach a beach, which is why they steepen and break.</li>
</ul>

<div class="env-block intuition">
<div class="env-title">Why do waves break on the shore?</div>
<div class="env-body">
<p>As a wave approaches shallow water, the bottom drags on the lower part of the circular orbits. The wave slows down, the wavelength shortens, and the wave height grows (energy conservation). Eventually the top outruns the bottom, and the crest curls forward and breaks.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-water-wave"></div>
`,
                visualizations: [
                    {
                        id: 'viz-water-wave',
                        title: 'Circular Motion in a Water Wave',
                        description: 'Water particles trace <strong>circular orbits</strong>. At the crest they move with the wave; at the trough they move against it. The colored dots show individual particle paths, and the trails reveal the circular motion.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: 40, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            viz.originY = h * 0.35;

                            var waveLen = 5.0;
                            var amp = 1.0;
                            var freq = 0.4;
                            var k = 2 * Math.PI / waveLen;
                            var omega = 2 * Math.PI * freq;
                            var t0 = performance.now();

                            var speedMult = 1.0;
                            VizEngine.createSlider(controls, 'Speed', 0.2, 2.0, speedMult, 0.1, function (v) { speedMult = v; });
                            VizEngine.createSlider(controls, 'Amplitude', 0.3, 2.0, amp, 0.1, function (v) { amp = v; });

                            // Particles at different depths
                            var particles = [];
                            var cols = 8;
                            var rows = 4;
                            for (var r = 0; r < rows; r++) {
                                for (var c = 0; c < cols; c++) {
                                    var eqX = 1 + c * (waveLen / (cols - 1)) * 1.6;
                                    var eqY = -r * 0.8;
                                    var depthFactor = Math.exp(k * eqY * 0.7);
                                    particles.push({
                                        eqX: eqX, eqY: eqY,
                                        depthFactor: depthFactor,
                                        trail: [],
                                        hue: (c / cols) * 360
                                    });
                                }
                            }

                            function draw(now) {
                                var t = ((now - t0) / 1000) * speedMult;
                                viz.clear();

                                // Water surface (smooth curve)
                                ctx.strokeStyle = viz.colors.cyan;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                var surfacePoints = [];
                                for (var i = 0; i <= 400; i++) {
                                    var sx = (i / 400) * 14;
                                    var sy = amp * Math.sin(k * sx - omega * t);
                                    var sp = viz.toScreen(sx, sy);
                                    surfacePoints.push(sp);
                                    if (i === 0) ctx.moveTo(sp[0], sp[1]);
                                    else ctx.lineTo(sp[0], sp[1]);
                                }
                                ctx.stroke();

                                // Water fill (gradient below surface)
                                ctx.beginPath();
                                ctx.moveTo(surfacePoints[0][0], surfacePoints[0][1]);
                                for (var si = 1; si < surfacePoints.length; si++) {
                                    ctx.lineTo(surfacePoints[si][0], surfacePoints[si][1]);
                                }
                                ctx.lineTo(surfacePoints[surfacePoints.length - 1][0], h);
                                ctx.lineTo(surfacePoints[0][0], h);
                                ctx.closePath();
                                var grad = ctx.createLinearGradient(0, viz.originY, 0, h);
                                grad.addColorStop(0, 'rgba(0,60,120,0.25)');
                                grad.addColorStop(1, 'rgba(0,20,60,0.5)');
                                ctx.fillStyle = grad;
                                ctx.fill();

                                // Update and draw particles
                                for (var p = 0; p < particles.length; p++) {
                                    var pr = particles[p];
                                    var phase = k * pr.eqX - omega * t;
                                    var df = pr.depthFactor * amp;
                                    var px = pr.eqX + df * Math.cos(phase);
                                    var py = pr.eqY + df * Math.sin(phase);

                                    // Update trail
                                    pr.trail.push([px, py]);
                                    if (pr.trail.length > 80) pr.trail.shift();

                                    // Draw trail
                                    if (pr.trail.length > 2) {
                                        var trailColor = VizEngine.hsl(pr.hue, 70, 50);
                                        viz.drawTrail(pr.trail, trailColor, 0.4);
                                    }

                                    // Draw particle
                                    var pcol = VizEngine.hsl(pr.hue, 80, 65);
                                    viz.drawBall(px, py, 0.07, pcol, 2);
                                }

                                // Labels
                                viz.screenText('Particle orbits shrink with depth', w / 2, h - 14, viz.colors.text, 11);
                                viz.screenText('\u2192 wave direction', w - 80, 18, viz.colors.orange, 11);
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Deep-water waves with wavelength 100 m travel at what speed? Use \\(v = \\sqrt{g\\lambda/(2\\pi)}\\) with \\(g = 9.8\\,\\text{m/s}^2\\).',
                        hint: 'Substitute \\(\\lambda = 100\\) directly into the formula.',
                        solution: '\\(v = \\sqrt{(9.8)(100)/(2\\pi)} = \\sqrt{980/6.283} = \\sqrt{155.9} \\approx 12.5\\,\\text{m/s}\\), which is about 45 km/h.'
                    },
                    {
                        question: 'Why do all ocean waves, regardless of wavelength, slow down as they enter very shallow water?',
                        hint: 'In shallow water, the wave speed formula simplifies to a form that depends on depth but not wavelength.',
                        solution: 'In shallow water (\\(d \\ll \\lambda\\)), \\(v = \\sqrt{gd}\\). The speed depends only on the depth \\(d\\), which decreases near shore, so all waves slow down. Wavelength does not appear in the formula, so all wavelengths experience the same slowdown.'
                    }
                ]
            }
        ]
    });
})();
