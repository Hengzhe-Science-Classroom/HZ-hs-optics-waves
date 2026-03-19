// === Chapter 1: Describing Waves ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch01',
        number: 1,
        title: 'Describing Waves \u2014 \u03bb, f, v',
        subtitle: 'The language every wave speaks',
        file: 'ch01-wave-description',

        sections: [
            // ============================================================
            // Section 0: Wavelength and Amplitude
            // ============================================================
            {
                id: 'wavelength-amplitude',
                title: 'Wavelength and Amplitude',
                content: `
<h2>Measuring the Shape of a Wave</h2>

<p>Freeze a sinusoidal wave in time and look at its snapshot. Two quantities immediately stand out: how far apart the repeating units are, and how tall they are.</p>

<div class="env-block definition">
<div class="env-title">Definition: Wavelength (\u03bb)</div>
<div class="env-body">
<p>The <strong>wavelength</strong> \\(\\lambda\\) is the distance between two consecutive points that are in the same phase of oscillation (e.g., crest to crest, trough to trough, or any identical point on successive cycles). Unit: meters (m).</p>
</div>
</div>

<div class="env-block definition">
<div class="env-title">Definition: Amplitude (A)</div>
<div class="env-body">
<p>The <strong>amplitude</strong> \\(A\\) is the maximum displacement of the medium from its equilibrium position. It measures the "height" of the wave. Unit: meters (m) for mechanical waves.</p>
</div>
</div>

<p>Amplitude determines the wave's <strong>energy</strong>. For a wave on a string, the energy carried per unit length is proportional to \\(A^2\\). Double the amplitude, quadruple the energy. This is why a whisper (small amplitude) carries less energy than a shout (large amplitude).</p>

<div class="env-block remark">
<div class="env-title">Crest-to-trough distance</div>
<div class="env-body">
<p>The vertical distance from crest to trough is \\(2A\\), not \\(A\\). A common error is to confuse the full swing with the amplitude. The amplitude is always measured from the equilibrium (center) line.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-wave-params"></div>
`,
                visualizations: [
                    {
                        id: 'viz-wave-params',
                        title: 'Interactive Wave: Wavelength, Frequency, Amplitude',
                        description: 'Use the sliders to adjust the <strong>wavelength</strong> \\(\\lambda\\), <strong>frequency</strong> \\(f\\), and <strong>amplitude</strong> \\(A\\). Watch how the wave changes shape and speed. The wave speed \\(v = f\\lambda\\) updates automatically.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 35, originX: 50, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            viz.originY = h / 2;

                            var lambda = 4.0;
                            var freq = 1.0;
                            var amp = 2.0;
                            var t0 = performance.now();

                            VizEngine.createSlider(controls, '\u03bb (m)', 1.5, 8, lambda, 0.5, function (v) { lambda = v; });
                            VizEngine.createSlider(controls, 'f (Hz)', 0.2, 3, freq, 0.1, function (v) { freq = v; });
                            VizEngine.createSlider(controls, 'A (m)', 0.5, 3, amp, 0.1, function (v) { amp = v; });

                            function draw(now) {
                                var t = (now - t0) / 1000;
                                var k = 2 * Math.PI / lambda;
                                var omega = 2 * Math.PI * freq;
                                var speed = freq * lambda;

                                viz.clear();
                                viz.drawGrid();

                                // Equilibrium line
                                ctx.strokeStyle = 'rgba(255,255,255,0.08)';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath(); ctx.moveTo(0, viz.originY); ctx.lineTo(w, viz.originY); ctx.stroke();
                                ctx.setLineDash([]);

                                // Draw wave with gradient coloring
                                var xMin = -viz.originX / viz.scale;
                                var xMax = (w - viz.originX) / viz.scale;
                                ctx.lineWidth = 3;

                                // Filled wave
                                ctx.beginPath();
                                for (var i = 0; i <= 500; i++) {
                                    var x = xMin + (xMax - xMin) * i / 500;
                                    var y = amp * Math.sin(k * x - omega * t);
                                    var sp = viz.toScreen(x, y);
                                    if (i === 0) ctx.moveTo(sp[0], sp[1]);
                                    else ctx.lineTo(sp[0], sp[1]);
                                }
                                // Fill under curve
                                var lastSp = viz.toScreen(xMax, 0);
                                var firstSp = viz.toScreen(xMin, 0);
                                ctx.lineTo(lastSp[0], lastSp[1]);
                                ctx.lineTo(firstSp[0], firstSp[1]);
                                ctx.closePath();
                                var grd = ctx.createLinearGradient(0, viz.originY - amp * viz.scale, 0, viz.originY + amp * viz.scale);
                                grd.addColorStop(0, 'rgba(0,212,255,0.12)');
                                grd.addColorStop(0.5, 'rgba(0,212,255,0.02)');
                                grd.addColorStop(1, 'rgba(0,100,255,0.12)');
                                ctx.fillStyle = grd;
                                ctx.fill();

                                // Wave line on top
                                ctx.strokeStyle = viz.colors.cyan;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                for (var j = 0; j <= 500; j++) {
                                    var x2 = xMin + (xMax - xMin) * j / 500;
                                    var y2 = amp * Math.sin(k * x2 - omega * t);
                                    var sp2 = viz.toScreen(x2, y2);
                                    if (j === 0) ctx.moveTo(sp2[0], sp2[1]);
                                    else ctx.lineTo(sp2[0], sp2[1]);
                                }
                                ctx.stroke();

                                // Wavelength annotation
                                // Find first crest after x=1
                                var firstCrestX = null;
                                for (var xx = 1; xx < xMax; xx += 0.01) {
                                    var ph = k * xx - omega * t;
                                    var phMod = ((ph % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
                                    if (Math.abs(phMod - Math.PI / 2) < 0.05) {
                                        firstCrestX = xx;
                                        break;
                                    }
                                }
                                if (firstCrestX !== null && firstCrestX + lambda < xMax) {
                                    var sc1 = viz.toScreen(firstCrestX, amp);
                                    var sc2 = viz.toScreen(firstCrestX + lambda, amp);
                                    // Horizontal double arrow
                                    ctx.strokeStyle = viz.colors.yellow;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath(); ctx.moveTo(sc1[0], sc1[1] - 12); ctx.lineTo(sc2[0], sc2[1] - 12); ctx.stroke();
                                    // Arrow heads
                                    ctx.fillStyle = viz.colors.yellow;
                                    ctx.beginPath(); ctx.moveTo(sc1[0], sc1[1] - 12); ctx.lineTo(sc1[0] + 6, sc1[1] - 16); ctx.lineTo(sc1[0] + 6, sc1[1] - 8); ctx.fill();
                                    ctx.beginPath(); ctx.moveTo(sc2[0], sc2[1] - 12); ctx.lineTo(sc2[0] - 6, sc2[1] - 16); ctx.lineTo(sc2[0] - 6, sc2[1] - 8); ctx.fill();
                                    viz.screenText('\u03bb', (sc1[0] + sc2[0]) / 2, sc1[1] - 26, viz.colors.yellow, 14);
                                }

                                // Amplitude annotation
                                var ampX = 1.0;
                                var ampPh = k * ampX - omega * t;
                                var ampY = amp * Math.sin(ampPh);
                                if (Math.abs(ampY) > amp * 0.7) {
                                    var sa = viz.toScreen(ampX, 0);
                                    var sb = viz.toScreen(ampX, ampY);
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.lineWidth = 1.5;
                                    ctx.setLineDash([3, 3]);
                                    ctx.beginPath(); ctx.moveTo(sa[0], sa[1]); ctx.lineTo(sb[0], sb[1]); ctx.stroke();
                                    ctx.setLineDash([]);
                                    viz.screenText('A', sa[0] - 14, (sa[1] + sb[1]) / 2, viz.colors.orange, 13);
                                }

                                // Info panel
                                viz.screenText('\u03bb = ' + lambda.toFixed(1) + ' m', w - 120, 25, viz.colors.yellow, 13, 'left', 'middle');
                                viz.screenText('f = ' + freq.toFixed(1) + ' Hz', w - 120, 42, viz.colors.teal, 13, 'left', 'middle');
                                viz.screenText('A = ' + amp.toFixed(1) + ' m', w - 120, 59, viz.colors.orange, 13, 'left', 'middle');
                                viz.screenText('v = f\u03bb = ' + speed.toFixed(1) + ' m/s', w - 120, 80, viz.colors.green, 14, 'left', 'middle');
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A wave has a crest-to-trough height of 8 cm. What is its amplitude?',
                        hint: 'Amplitude is measured from equilibrium to crest (or trough), not from crest to trough.',
                        solution: 'The crest-to-trough distance is \\(2A = 8\\,\\text{cm}\\), so \\(A = 4\\,\\text{cm}\\).'
                    },
                    {
                        question: 'Two waves have the same amplitude but wave A has twice the wavelength of wave B. Which wave has more energy per unit length?',
                        hint: 'Energy depends on amplitude and frequency. If wavelength doubles and speed is constant, what happens to frequency?',
                        solution: 'If the medium (and hence wave speed) is the same, doubling \\(\\lambda\\) halves \\(f\\). Energy per unit length is proportional to \\(A^2 f^2\\). Since \\(A\\) is the same but \\(f_A = f_B/2\\), wave A carries \\(1/4\\) the energy per unit length of wave B.'
                    }
                ]
            },

            // ============================================================
            // Section 1: Frequency and Period
            // ============================================================
            {
                id: 'frequency-period',
                title: 'Frequency and Period',
                content: `
<h2>Counting Cycles</h2>

<p>Instead of looking at a snapshot (which gives wavelength), stand at one point and watch waves go by. Count how many complete cycles pass per second. That is the frequency.</p>

<div class="env-block definition">
<div class="env-title">Definition: Frequency (f)</div>
<div class="env-body">
<p>The <strong>frequency</strong> \\(f\\) is the number of complete wave cycles that pass a given point per second. Unit: hertz (Hz), where \\(1\\,\\text{Hz} = 1\\,\\text{cycle/s}\\).</p>
</div>
</div>

<div class="env-block definition">
<div class="env-title">Definition: Period (T)</div>
<div class="env-body">
<p>The <strong>period</strong> \\(T\\) is the time for one complete wave cycle to pass a given point. It is the reciprocal of frequency:</p>
\\[T = \\frac{1}{f}\\]
<p>Unit: seconds (s).</p>
</div>
</div>

<p>Frequency is set by the <strong>source</strong>, not the medium. If you shake a rope at 3 Hz, every part of the rope oscillates at 3 Hz, regardless of the rope's tension or density. The medium determines the wave speed, and the wavelength then adjusts: \\(\\lambda = v/f\\).</p>

<div class="env-block example">
<div class="env-title">Example: AM Radio</div>
<div class="env-body">
<p>An AM radio station broadcasts at 880 kHz. The period of this wave is:</p>
\\[T = \\frac{1}{880 \\times 10^3} = 1.14 \\times 10^{-6}\\,\\text{s} = 1.14\\,\\mu\\text{s}\\]
<p>Over a million cycles happen every second.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Angular frequency</div>
<div class="env-body">
<p>Physicists often use the angular frequency \\(\\omega = 2\\pi f\\), measured in rad/s. This simplifies the math of sinusoidal waves, since \\(\\sin(\\omega t)\\) completes one cycle when \\(\\omega t\\) increases by \\(2\\pi\\).</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A wave has a period of 0.02 s. What is its frequency?',
                        hint: 'Use \\(f = 1/T\\).',
                        solution: '\\(f = 1/0.02 = 50\\,\\text{Hz}\\).'
                    },
                    {
                        question: 'Middle C on a piano has a frequency of 261.6 Hz. What is the period of this sound wave?',
                        hint: '\\(T = 1/f\\).',
                        solution: '\\(T = 1/261.6 \\approx 3.82 \\times 10^{-3}\\,\\text{s} \\approx 3.82\\,\\text{ms}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 2: The Wave Speed Equation
            // ============================================================
            {
                id: 'wave-speed-equation',
                title: 'Wave Speed: v = f\u03bb',
                content: `
<h2>The Fundamental Relationship</h2>

<p>In one period \\(T\\), the wave advances by exactly one wavelength \\(\\lambda\\). So the wave speed is:</p>

<div class="env-block theorem">
<div class="env-title">Wave Speed Equation</div>
<div class="env-body">
\\[v = f\\lambda = \\frac{\\lambda}{T}\\]
<p>This holds for <strong>all</strong> waves: mechanical, electromagnetic, gravitational.</p>
</div>
</div>

<p>This equation connects three quantities. Given any two, you can find the third. But remember the causal chain: the medium sets \\(v\\), the source sets \\(f\\), and \\(\\lambda\\) adjusts to satisfy \\(\\lambda = v/f\\).</p>

<div class="env-block example">
<div class="env-title">Example: Sound in Air</div>
<div class="env-body">
<p>A tuning fork vibrates at 440 Hz (concert A) in air at 20 &deg;C where \\(v = 343\\,\\text{m/s}\\). The wavelength is:</p>
\\[\\lambda = \\frac{v}{f} = \\frac{343}{440} = 0.780\\,\\text{m}\\]
<p>About 78 cm, roughly the width of a desk.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Red Light</div>
<div class="env-body">
<p>Red light has a wavelength of about \\(700\\,\\text{nm} = 7.0 \\times 10^{-7}\\,\\text{m}\\) in vacuum, where \\(v = c = 3.0 \\times 10^8\\,\\text{m/s}\\). Its frequency is:</p>
\\[f = \\frac{c}{\\lambda} = \\frac{3.0 \\times 10^8}{7.0 \\times 10^{-7}} = 4.3 \\times 10^{14}\\,\\text{Hz}\\]
<p>That is 430 trillion oscillations per second.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">When a wave enters a new medium</div>
<div class="env-body">
<p>Frequency stays the same (set by the source). Speed changes (set by the new medium). Therefore wavelength changes: \\(\\lambda_{\\text{new}} = v_{\\text{new}}/f\\). This will be critically important when we study refraction.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A wave on a string has \\(f = 12\\,\\text{Hz}\\) and \\(\\lambda = 0.5\\,\\text{m}\\). Find the wave speed.',
                        hint: '\\(v = f\\lambda\\).',
                        solution: '\\(v = 12 \\times 0.5 = 6\\,\\text{m/s}\\).'
                    },
                    {
                        question: 'A sound wave traveling at 343 m/s enters water where the speed of sound is 1480 m/s. If the frequency is 500 Hz, find the wavelength in air and in water.',
                        hint: 'Frequency does not change when crossing media. Apply \\(\\lambda = v/f\\) in each medium.',
                        solution: 'In air: \\(\\lambda = 343/500 = 0.686\\,\\text{m}\\). In water: \\(\\lambda = 1480/500 = 2.96\\,\\text{m}\\). The wavelength more than quadruples.'
                    }
                ]
            },

            // ============================================================
            // Section 3: The Wave Equation
            // ============================================================
            {
                id: 'wave-equation',
                title: 'The Wave Equation',
                content: `
<h2>Writing Down a Traveling Wave</h2>

<p>A sinusoidal wave traveling in the \\(+x\\) direction can be described by:</p>

<div class="env-block theorem">
<div class="env-title">Sinusoidal Traveling Wave</div>
<div class="env-body">
\\[y(x,t) = A\\sin(kx - \\omega t + \\phi_0)\\]
<p>where:</p>
<ul>
<li>\\(A\\) = amplitude</li>
<li>\\(k = 2\\pi/\\lambda\\) = wave number (rad/m)</li>
<li>\\(\\omega = 2\\pi f\\) = angular frequency (rad/s)</li>
<li>\\(\\phi_0\\) = initial phase (rad)</li>
</ul>
<p>For a wave traveling in the \\(-x\\) direction, replace \\(kx - \\omega t\\) with \\(kx + \\omega t\\).</p>
</div>
</div>

<p>The argument \\(kx - \\omega t + \\phi_0\\) is called the <strong>phase</strong> of the wave. At any instant, all points with the same phase are at the same point in their oscillation cycle.</p>

<p>The wave number \\(k\\) tells you how many radians of phase change occur per meter of distance. The angular frequency \\(\\omega\\) tells you how many radians of phase change occur per second of time. The wave speed is:</p>
\\[v = \\frac{\\omega}{k} = \\frac{2\\pi f}{2\\pi/\\lambda} = f\\lambda\\]

<div class="env-block example">
<div class="env-title">Example: Writing a Wave Function</div>
<div class="env-body">
<p>A wave on a string has amplitude 3 cm, wavelength 2 m, and frequency 5 Hz, traveling in the +x direction with zero initial phase. Write the wave function.</p>
\\[k = \\frac{2\\pi}{2} = \\pi\\,\\text{rad/m}, \\quad \\omega = 2\\pi(5) = 10\\pi\\,\\text{rad/s}\\]
\\[y(x,t) = 0.03\\sin(\\pi x - 10\\pi t)\\,\\text{m}\\]
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A wave is described by \\(y(x,t) = 0.05\\sin(4\\pi x - 20\\pi t)\\) in SI units. Find the amplitude, wavelength, frequency, and wave speed.',
                        hint: 'Compare with \\(y = A\\sin(kx - \\omega t)\\) and identify \\(k\\) and \\(\\omega\\).',
                        solution: '\\(A = 0.05\\,\\text{m}\\). \\(k = 4\\pi\\), so \\(\\lambda = 2\\pi/k = 0.5\\,\\text{m}\\). \\(\\omega = 20\\pi\\), so \\(f = \\omega/(2\\pi) = 10\\,\\text{Hz}\\). \\(v = f\\lambda = 10 \\times 0.5 = 5\\,\\text{m/s}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 4: Phase and Phase Difference
            // ============================================================
            {
                id: 'phase-difference',
                title: 'Phase and Phase Difference',
                content: `
<h2>Timing Matters</h2>

<p>Two waves can have the same amplitude, wavelength, and frequency but be "out of step" with each other. The amount by which one wave is ahead of or behind the other is measured by the <strong>phase difference</strong>.</p>

<div class="env-block definition">
<div class="env-title">Definition: Phase Difference</div>
<div class="env-body">
<p>The <strong>phase difference</strong> \\(\\Delta\\phi\\) between two waves is the difference in their phase angles at the same point and time. Measured in radians or degrees.</p>
</div>
</div>

<p>Key values:</p>
<ul>
<li>\\(\\Delta\\phi = 0\\) (or \\(2\\pi\\)): the waves are <strong>in phase</strong>; they crest and trough together.</li>
<li>\\(\\Delta\\phi = \\pi\\) (180&deg;): the waves are <strong>completely out of phase</strong> (antiphase); one crests while the other troughs.</li>
<li>\\(\\Delta\\phi = \\pi/2\\) (90&deg;): one wave is at zero when the other is at maximum.</li>
</ul>

<p>Phase difference can arise from a difference in initial phase (the sources are not synchronized) or from a difference in path length. If two waves from the same source travel different distances to reach a point, their path difference \\(\\Delta x\\) creates a phase difference:</p>

\\[\\Delta\\phi = \\frac{2\\pi}{\\lambda}\\,\\Delta x = k\\,\\Delta x\\]

<p>This relationship between path difference and phase difference is the key to understanding interference, which is the subject of Chapter 2.</p>

<div class="viz-placeholder" data-viz="viz-phase-diff"></div>
`,
                visualizations: [
                    {
                        id: 'viz-phase-diff',
                        title: 'Phase Difference Between Two Waves',
                        description: 'Two waves with the same amplitude and frequency. Use the slider to shift the phase of the <strong style="color:#f778ba;">pink wave</strong> relative to the <strong style="color:#00d4ff;">cyan wave</strong>. When they are in phase (\\(\\Delta\\phi=0\\)), they overlap perfectly. At antiphase (\\(\\Delta\\phi=\\pi\\)), they are exact opposites.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 35, originX: 50, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            viz.originY = h / 2;

                            var phase = 0;
                            var t0 = performance.now();

                            VizEngine.createSlider(controls, '\u0394\u03c6 (rad)', 0, 6.28, 0, 0.01, function (v) { phase = v; });

                            var lambda = 4.0;
                            var freq = 0.8;
                            var amp = 1.8;

                            function draw(now) {
                                var t = (now - t0) / 1000;
                                var k = 2 * Math.PI / lambda;
                                var omega = 2 * Math.PI * freq;

                                viz.clear();

                                // Equilibrium
                                ctx.strokeStyle = 'rgba(255,255,255,0.06)';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath(); ctx.moveTo(0, viz.originY); ctx.lineTo(w, viz.originY); ctx.stroke();
                                ctx.setLineDash([]);

                                var xMin = -viz.originX / viz.scale;
                                var xMax = (w - viz.originX) / viz.scale;

                                // Wave 1 (cyan)
                                ctx.strokeStyle = viz.colors.cyan;
                                ctx.lineWidth = 2.5;
                                ctx.globalAlpha = 0.85;
                                ctx.beginPath();
                                for (var i = 0; i <= 400; i++) {
                                    var x = xMin + (xMax - xMin) * i / 400;
                                    var y = amp * Math.sin(k * x - omega * t);
                                    var s = viz.toScreen(x, y);
                                    if (i === 0) ctx.moveTo(s[0], s[1]);
                                    else ctx.lineTo(s[0], s[1]);
                                }
                                ctx.stroke();
                                ctx.globalAlpha = 1;

                                // Wave 2 (pink, phase-shifted)
                                ctx.strokeStyle = viz.colors.pink;
                                ctx.lineWidth = 2.5;
                                ctx.globalAlpha = 0.85;
                                ctx.beginPath();
                                for (var j = 0; j <= 400; j++) {
                                    var x2 = xMin + (xMax - xMin) * j / 400;
                                    var y2 = amp * Math.sin(k * x2 - omega * t + phase);
                                    var s2 = viz.toScreen(x2, y2);
                                    if (j === 0) ctx.moveTo(s2[0], s2[1]);
                                    else ctx.lineTo(s2[0], s2[1]);
                                }
                                ctx.stroke();
                                ctx.globalAlpha = 1;

                                // Sum (green, dashed)
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([6, 4]);
                                ctx.beginPath();
                                for (var m = 0; m <= 400; m++) {
                                    var x3 = xMin + (xMax - xMin) * m / 400;
                                    var y3 = amp * Math.sin(k * x3 - omega * t) + amp * Math.sin(k * x3 - omega * t + phase);
                                    var s3 = viz.toScreen(x3, y3);
                                    if (m === 0) ctx.moveTo(s3[0], s3[1]);
                                    else ctx.lineTo(s3[0], s3[1]);
                                }
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Phase indicator circle
                                var cx = w - 55, cy = 55, cr = 30;
                                ctx.strokeStyle = viz.colors.text;
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.arc(cx, cy, cr, 0, Math.PI * 2); ctx.stroke();

                                // Cyan hand at 0
                                ctx.strokeStyle = viz.colors.cyan; ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + cr * 0.8 * Math.cos(-Math.PI / 2), cy + cr * 0.8 * Math.sin(-Math.PI / 2)); ctx.stroke();
                                // Pink hand at phase
                                ctx.strokeStyle = viz.colors.pink; ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + cr * 0.8 * Math.cos(-Math.PI / 2 + phase), cy + cr * 0.8 * Math.sin(-Math.PI / 2 + phase)); ctx.stroke();

                                // Labels
                                var phDeg = (phase * 180 / Math.PI).toFixed(0);
                                var phPi = (phase / Math.PI).toFixed(2);
                                viz.screenText('\u0394\u03c6 = ' + phPi + '\u03c0 (' + phDeg + '\u00b0)', w / 2, 20, viz.colors.white, 13);

                                // Legend
                                viz.screenText('\u2014 Wave 1', 15, h - 36, viz.colors.cyan, 11, 'left');
                                viz.screenText('\u2014 Wave 2', 15, h - 22, viz.colors.pink, 11, 'left');
                                viz.screenText('- - Sum', 15, h - 8, viz.colors.green, 11, 'left');

                                // Status text
                                var status = '';
                                var normPhase = ((phase % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
                                if (normPhase < 0.15 || normPhase > 6.13) status = 'IN PHASE \u2014 constructive interference';
                                else if (Math.abs(normPhase - Math.PI) < 0.15) status = 'ANTIPHASE \u2014 destructive interference';
                                if (status) viz.screenText(status, w / 2, h - 10, viz.colors.yellow, 12);
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Two loudspeakers emit sound of wavelength 0.5 m. One speaker is 3.0 m from a listener; the other is 3.75 m from the same listener. Find the phase difference and determine whether the interference is constructive or destructive.',
                        hint: 'Find the path difference \\(\\Delta x\\), then convert to phase difference using \\(\\Delta\\phi = 2\\pi\\,\\Delta x/\\lambda\\).',
                        solution: '\\(\\Delta x = 3.75 - 3.0 = 0.75\\,\\text{m}\\). \\(\\Delta\\phi = 2\\pi(0.75)/0.5 = 3\\pi\\). Since \\(3\\pi\\) is an odd multiple of \\(\\pi\\), the interference is <strong>destructive</strong>.'
                    },
                    {
                        question: 'Two waves are described by \\(y_1 = A\\sin(kx - \\omega t)\\) and \\(y_2 = A\\sin(kx - \\omega t + \\pi/3)\\). What is the phase difference? Are they closer to constructive or destructive interference?',
                        hint: 'Read off \\(\\Delta\\phi\\) directly from the phase arguments.',
                        solution: '\\(\\Delta\\phi = \\pi/3 = 60^\\circ\\). This is closer to 0 than to \\(\\pi\\), so the interference is closer to constructive. The resultant amplitude is \\(2A\\cos(\\Delta\\phi/2) = 2A\\cos(30^\\circ) = A\\sqrt{3} \\approx 1.73A\\).'
                    }
                ]
            }
        ]
    });
})();
