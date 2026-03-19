// === Chapter 3: Standing Waves & Resonance ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch03',
        number: 3,
        title: 'Standing Waves & Resonance',
        subtitle: 'When waves bounce and build',
        file: 'ch03-standing-waves',

        sections: [
            // ============================================================
            // Section 0: How Standing Waves Form
            // ============================================================
            {
                id: 'standing-wave-formation',
                title: 'How Standing Waves Form',
                content: `
<h2>Waves That Stand Still</h2>

<p>Send a continuous wave down a string that is fixed at both ends. When the wave reaches the far end, it reflects and travels back. The reflected wave interferes with the incoming wave. At most frequencies, the pattern is messy and unstable. But at certain special frequencies, the interference produces a beautiful, stationary pattern: a <strong>standing wave</strong>.</p>

<div class="env-block definition">
<div class="env-title">Definition: Standing Wave</div>
<div class="env-body">
<p>A <strong>standing wave</strong> is a wave pattern that does not travel. It is formed by the superposition of two waves of the same frequency and amplitude traveling in opposite directions. The medium appears to vibrate in fixed segments.</p>
</div>
</div>

<p>Mathematically, superpose a rightward and a leftward wave:</p>
\\[y_1 = A\\sin(kx - \\omega t), \\quad y_2 = A\\sin(kx + \\omega t)\\]
\\[y = y_1 + y_2 = 2A\\sin(kx)\\cos(\\omega t)\\]

<p>The result is not a traveling wave. The spatial part \\(\\sin(kx)\\) and the temporal part \\(\\cos(\\omega t)\\) are <em>separated</em>. Every point oscillates in place with an amplitude of \\(2A|\\sin(kx)|\\). Some points (where \\(\\sin(kx) = 0\\)) never move at all.</p>

<div class="env-block intuition">
<div class="env-title">Why "standing"?</div>
<div class="env-body">
<p>In a traveling wave, the crest moves. In a standing wave, the crests stay put; they just grow and shrink in place. The wave appears to be standing still, hence the name. Energy does not propagate; it sloshes back and forth between kinetic and potential energy in the segments between nodes.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Show that \\(A\\sin(kx - \\omega t) + A\\sin(kx + \\omega t) = 2A\\sin(kx)\\cos(\\omega t)\\).',
                        hint: 'Use the trigonometric identity \\(\\sin\\alpha + \\sin\\beta = 2\\sin\\frac{\\alpha+\\beta}{2}\\cos\\frac{\\alpha-\\beta}{2}\\).',
                        solution: 'Let \\(\\alpha = kx - \\omega t\\) and \\(\\beta = kx + \\omega t\\). Then \\(\\frac{\\alpha+\\beta}{2} = kx\\) and \\(\\frac{\\alpha-\\beta}{2} = -\\omega t\\). So \\(\\sin(kx-\\omega t) + \\sin(kx+\\omega t) = 2\\sin(kx)\\cos(-\\omega t) = 2\\sin(kx)\\cos(\\omega t)\\), since cosine is even.'
                    }
                ]
            },

            // ============================================================
            // Section 1: Nodes and Antinodes
            // ============================================================
            {
                id: 'nodes-antinodes',
                title: 'Nodes and Antinodes',
                content: `
<h2>Points of Stillness and Maximum Motion</h2>

<div class="env-block definition">
<div class="env-title">Definition: Node</div>
<div class="env-body">
<p>A <strong>node</strong> is a point on a standing wave that <em>never</em> moves. At a node, the amplitude is zero. Nodes occur where \\(\\sin(kx) = 0\\), i.e., at \\(x = 0, \\lambda/2, \\lambda, 3\\lambda/2, \\ldots\\)</p>
</div>
</div>

<div class="env-block definition">
<div class="env-title">Definition: Antinode</div>
<div class="env-body">
<p>An <strong>antinode</strong> is a point on a standing wave where the amplitude is <em>maximum</em>. Antinodes are located exactly midway between consecutive nodes, at \\(x = \\lambda/4, 3\\lambda/4, 5\\lambda/4, \\ldots\\)</p>
</div>
</div>

<p>Key spacing facts:</p>
<ul>
<li>Distance between adjacent nodes = \\(\\lambda/2\\)</li>
<li>Distance between adjacent antinodes = \\(\\lambda/2\\)</li>
<li>Distance between a node and its nearest antinode = \\(\\lambda/4\\)</li>
</ul>

<div class="env-block remark">
<div class="env-title">Fixed ends are always nodes</div>
<div class="env-body">
<p>If a string is clamped at both ends (like a guitar string), those endpoints must be nodes because the string cannot move there. This boundary condition restricts which standing wave patterns can exist.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A standing wave on a string has nodes at \\(x = 0, 0.4, 0.8, 1.2\\,\\text{m}\\). Find the wavelength.',
                        hint: 'Distance between adjacent nodes is \\(\\lambda/2\\).',
                        solution: 'Adjacent node spacing = \\(0.4\\,\\text{m} = \\lambda/2\\), so \\(\\lambda = 0.8\\,\\text{m}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 2: Harmonics on a String
            // ============================================================
            {
                id: 'harmonics-string',
                title: 'Harmonics on a String',
                content: `
<h2>Only Certain Frequencies Work</h2>

<p>For a string of length \\(L\\) fixed at both ends, both endpoints must be nodes. This means an integer number of half-wavelengths must fit in the string:</p>

<div class="env-block theorem">
<div class="env-title">Harmonics of a Fixed String</div>
<div class="env-body">
\\[L = n\\,\\frac{\\lambda_n}{2} \\quad \\Rightarrow \\quad \\lambda_n = \\frac{2L}{n}, \\quad f_n = \\frac{nv}{2L}\\]
<p>where \\(n = 1, 2, 3, \\ldots\\) is the <strong>harmonic number</strong> (or mode number).</p>
</div>
</div>

<ul>
<li>\\(n = 1\\): the <strong>fundamental</strong> (or first harmonic). One antinode, two nodes (the endpoints). \\(f_1 = v/(2L)\\).</li>
<li>\\(n = 2\\): the <strong>second harmonic</strong> (first overtone). Two antinodes, three nodes. \\(f_2 = 2f_1\\).</li>
<li>\\(n = 3\\): the <strong>third harmonic</strong> (second overtone). Three antinodes, four nodes. \\(f_3 = 3f_1\\).</li>
</ul>

<p>The frequencies form a simple arithmetic sequence: \\(f_1, 2f_1, 3f_1, \\ldots\\) This is what gives stringed instruments their rich, harmonic sound.</p>

<div class="env-block example">
<div class="env-title">Example: Guitar A-String</div>
<div class="env-body">
<p>The A string on a guitar is 0.65 m long and tuned to \\(f_1 = 110\\,\\text{Hz}\\). The wave speed on the string is:</p>
\\[v = 2Lf_1 = 2(0.65)(110) = 143\\,\\text{m/s}\\]
<p>The second harmonic is at \\(f_2 = 220\\,\\text{Hz}\\) (one octave higher), the third at \\(f_3 = 330\\,\\text{Hz}\\), and so on. When you pluck the string, all these harmonics sound simultaneously, producing the instrument's timbre.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-string-modes"></div>
`,
                visualizations: [
                    {
                        id: 'viz-string-modes',
                        title: 'Vibrating String: Standing Wave Modes',
                        description: 'Select the harmonic number \\(n\\) to see the standing wave pattern. <strong style="color:#00d4ff;">Nodes</strong> (blue dots) never move; <strong style="color:#f0883e;">antinodes</strong> (orange dots) have maximum displacement. The envelope shows the amplitude at each point.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: 60, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            viz.originY = h / 2;

                            var L = (w - 120) / viz.scale;
                            var modeN = 1;
                            var t0 = performance.now();

                            VizEngine.createSlider(controls, 'Harmonic n', 1, 8, 1, 1, function (v) { modeN = Math.round(v); });

                            function draw(now) {
                                var t = (now - t0) / 1000;
                                var n = modeN;
                                var lambda = 2 * L / n;
                                var k = 2 * Math.PI / lambda;
                                var freq = n * 0.8;
                                var omega = 2 * Math.PI * freq;
                                var amp = 2.0;

                                viz.clear();

                                // Fixed endpoints
                                var sLeft = viz.toScreen(0, 0);
                                var sRight = viz.toScreen(L, 0);

                                // Equilibrium line
                                ctx.strokeStyle = 'rgba(255,255,255,0.08)';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath(); ctx.moveTo(sLeft[0], sLeft[1]); ctx.lineTo(sRight[0], sRight[1]); ctx.stroke();
                                ctx.setLineDash([]);

                                // Envelope (upper and lower bounds)
                                ctx.strokeStyle = 'rgba(255,255,255,0.15)';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                for (var i = 0; i <= 300; i++) {
                                    var x = L * i / 300;
                                    var envY = amp * Math.abs(Math.sin(n * Math.PI * x / L));
                                    var s = viz.toScreen(x, envY);
                                    if (i === 0) ctx.moveTo(s[0], s[1]);
                                    else ctx.lineTo(s[0], s[1]);
                                }
                                ctx.stroke();
                                ctx.beginPath();
                                for (var i2 = 0; i2 <= 300; i2++) {
                                    var x2 = L * i2 / 300;
                                    var envY2 = -amp * Math.abs(Math.sin(n * Math.PI * x2 / L));
                                    var s2 = viz.toScreen(x2, envY2);
                                    if (i2 === 0) ctx.moveTo(s2[0], s2[1]);
                                    else ctx.lineTo(s2[0], s2[1]);
                                }
                                ctx.stroke();

                                // Fill envelope region with subtle glow
                                ctx.beginPath();
                                for (var ei = 0; ei <= 300; ei++) {
                                    var ex = L * ei / 300;
                                    var ey = amp * Math.abs(Math.sin(n * Math.PI * ex / L));
                                    var es = viz.toScreen(ex, ey);
                                    if (ei === 0) ctx.moveTo(es[0], es[1]);
                                    else ctx.lineTo(es[0], es[1]);
                                }
                                for (var ei2 = 300; ei2 >= 0; ei2--) {
                                    var ex2 = L * ei2 / 300;
                                    var ey2 = -amp * Math.abs(Math.sin(n * Math.PI * ex2 / L));
                                    var es2 = viz.toScreen(ex2, ey2);
                                    ctx.lineTo(es2[0], es2[1]);
                                }
                                ctx.closePath();
                                ctx.fillStyle = 'rgba(0,212,255,0.04)';
                                ctx.fill();

                                // Multiple time snapshots for ghost effect
                                for (var g = 0; g < 5; g++) {
                                    var tg = t - g * 0.04;
                                    var alpha = 0.15 * (1 - g / 5);
                                    ctx.strokeStyle = 'rgba(0,212,255,' + alpha + ')';
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    for (var gi = 0; gi <= 300; gi++) {
                                        var gx = L * gi / 300;
                                        var gy = amp * Math.sin(n * Math.PI * gx / L) * Math.cos(omega * tg);
                                        var gs = viz.toScreen(gx, gy);
                                        if (gi === 0) ctx.moveTo(gs[0], gs[1]);
                                        else ctx.lineTo(gs[0], gs[1]);
                                    }
                                    ctx.stroke();
                                }

                                // Current string position (bright)
                                ctx.strokeStyle = viz.colors.cyan;
                                ctx.lineWidth = 3;
                                ctx.shadowColor = viz.colors.cyan;
                                ctx.shadowBlur = 8;
                                ctx.beginPath();
                                for (var j = 0; j <= 300; j++) {
                                    var xj = L * j / 300;
                                    var yj = amp * Math.sin(n * Math.PI * xj / L) * Math.cos(omega * t);
                                    var sj = viz.toScreen(xj, yj);
                                    if (j === 0) ctx.moveTo(sj[0], sj[1]);
                                    else ctx.lineTo(sj[0], sj[1]);
                                }
                                ctx.stroke();
                                ctx.shadowBlur = 0;

                                // Nodes (blue dots)
                                for (var nn = 0; nn <= n; nn++) {
                                    var nx = nn * L / n;
                                    viz.drawBall(nx, 0, 0.1, viz.colors.cyan, 2.5);
                                }

                                // Antinodes (orange dots)
                                for (var an = 0; an < n; an++) {
                                    var ax = (an + 0.5) * L / n;
                                    var ay = amp * Math.sin(n * Math.PI * ax / L) * Math.cos(omega * t);
                                    viz.drawBall(ax, ay, 0.1, viz.colors.orange, 2.5);
                                }

                                // Fixed-end markers
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillRect(sLeft[0] - 4, sLeft[1] - 15, 4, 30);
                                ctx.fillRect(sRight[0], sRight[1] - 15, 4, 30);

                                // Info text
                                var f1 = 0.8;
                                viz.screenText('n = ' + n + '   \u03bb = 2L/' + n + '   f = ' + n + 'f\u2081', w / 2, 22, viz.colors.white, 14);
                                viz.screenText(n + ' antinode' + (n > 1 ? 's' : '') + ', ' + (n + 1) + ' nodes (including endpoints)', w / 2, h - 14, viz.colors.text, 11);
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A string is 1.2 m long with wave speed 300 m/s. Find the frequencies of the first three harmonics.',
                        hint: 'Use \\(f_n = nv/(2L)\\).',
                        solution: '\\(f_1 = 300/(2 \\times 1.2) = 125\\,\\text{Hz}\\). \\(f_2 = 250\\,\\text{Hz}\\). \\(f_3 = 375\\,\\text{Hz}\\).'
                    },
                    {
                        question: 'A standing wave on a 0.8 m string has 4 antinodes. What is the harmonic number, and what is the wavelength?',
                        hint: 'The harmonic number \\(n\\) equals the number of antinodes.',
                        solution: '\\(n = 4\\). \\(\\lambda = 2L/n = 2(0.8)/4 = 0.4\\,\\text{m}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 3: Resonance
            // ============================================================
            {
                id: 'resonance',
                title: 'Resonance',
                content: `
<h2>When the Driving Frequency Matches</h2>

<p>Every vibrating system has preferred frequencies at which it naturally oscillates: its <strong>natural frequencies</strong> (the harmonics for a string). If you drive the system at one of these natural frequencies, the response amplitude grows enormously. This is <strong>resonance</strong>.</p>

<div class="env-block definition">
<div class="env-title">Definition: Resonance</div>
<div class="env-body">
<p><strong>Resonance</strong> occurs when a system is driven at (or very near) one of its natural frequencies. Energy is efficiently transferred into the system, and the amplitude of oscillation becomes very large, limited only by damping.</p>
</div>
</div>

<p>Examples of resonance are everywhere:</p>
<ul>
<li>Pushing a child on a swing at the swing's natural frequency.</li>
<li>A singer shattering a wine glass by singing at its resonant frequency.</li>
<li>The Tacoma Narrows Bridge collapse (1940), where wind-driven oscillations matched a torsional resonance of the bridge.</li>
<li>Tuning a radio: you adjust the circuit's resonant frequency to match the station's broadcast frequency.</li>
</ul>

<div class="env-block warning">
<div class="env-title">Resonance can be destructive</div>
<div class="env-body">
<p>Soldiers break step when crossing a bridge to avoid exciting a resonant frequency. Earthquakes can cause disproportionate damage to buildings whose natural frequency matches the seismic wave frequency. Engineers must always consider resonance when designing structures.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-resonance"></div>
`,
                visualizations: [
                    {
                        id: 'viz-resonance',
                        title: 'Resonance: Frequency Sweep',
                        description: 'The string is driven at a variable frequency. Sweep the driving frequency and watch the amplitude spike dramatically when you hit a <strong>resonant frequency</strong>. The graph on the right shows the amplitude response curve.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 35, originX: 50, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            viz.originY = h / 2;
                            var splitX = w * 0.55;

                            var L = (splitX - 100) / viz.scale;
                            var v = 4.0;
                            var f1 = v / (2 * L);
                            var damping = 0.12;
                            var driveFreq = f1;
                            var t0 = performance.now();

                            VizEngine.createSlider(controls, 'Drive freq (Hz)', 0.1, f1 * 6, f1, 0.02, function (val) { driveFreq = val; });
                            VizEngine.createSlider(controls, 'Damping', 0.02, 0.5, damping, 0.01, function (val) { damping = val; });

                            function responseAmp(fDrive, fNat, damp) {
                                var ratio = fDrive / fNat;
                                return 1 / Math.sqrt((1 - ratio * ratio) * (1 - ratio * ratio) + 4 * damp * damp * ratio * ratio);
                            }

                            function draw(now) {
                                var t = (now - t0) / 1000;
                                viz.clear();

                                // === Left: string ===
                                var maxResp = 0;
                                var totalY = function (x, time) {
                                    var sum = 0;
                                    for (var n = 1; n <= 8; n++) {
                                        var fn = n * f1;
                                        var resp = responseAmp(driveFreq, fn, damping);
                                        sum += resp * Math.sin(n * Math.PI * x / L) * Math.cos(2 * Math.PI * driveFreq * time);
                                    }
                                    return sum;
                                };

                                // Calculate effective amplitude for normalization
                                var effAmp = 0;
                                for (var nn = 1; nn <= 8; nn++) {
                                    effAmp += responseAmp(driveFreq, nn * f1, damping);
                                }
                                var normFactor = 2.0 / Math.max(effAmp, 1);

                                // Equilibrium
                                var sL = viz.toScreen(0, 0);
                                var sR = viz.toScreen(L, 0);
                                ctx.strokeStyle = 'rgba(255,255,255,0.08)';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath(); ctx.moveTo(sL[0], sL[1]); ctx.lineTo(sR[0], sR[1]); ctx.stroke();
                                ctx.setLineDash([]);

                                // Current response
                                var currentResp = 0;
                                for (var nr = 1; nr <= 8; nr++) {
                                    currentResp = Math.max(currentResp, responseAmp(driveFreq, nr * f1, damping));
                                }
                                var hueShift = VizEngine.clamp(currentResp / 5, 0, 1);
                                var waveColor = VizEngine.hsl(180 - hueShift * 180, 85, 55 + hueShift * 15);

                                // Draw string
                                ctx.strokeStyle = waveColor;
                                ctx.lineWidth = 2.5;
                                ctx.save();
                                if (currentResp > 3) { ctx.shadowColor = waveColor; ctx.shadowBlur = 10 + currentResp; }
                                ctx.beginPath();
                                for (var i = 0; i <= 200; i++) {
                                    var x = L * i / 200;
                                    var y = totalY(x, t) * normFactor;
                                    y = VizEngine.clamp(y, -3, 3);
                                    var s = viz.toScreen(x, y);
                                    if (i === 0) ctx.moveTo(s[0], s[1]);
                                    else ctx.lineTo(s[0], s[1]);
                                }
                                ctx.stroke();
                                ctx.restore();

                                // Fixed ends
                                ctx.fillStyle = viz.colors.text;
                                ctx.fillRect(sL[0] - 4, sL[1] - 12, 4, 24);
                                ctx.fillRect(sR[0], sR[1] - 12, 4, 24);

                                // Current frequency label
                                viz.screenText('f = ' + driveFreq.toFixed(2) + ' Hz', splitX / 2, 22, viz.colors.white, 13);

                                // Resonance indicator
                                for (var rn = 1; rn <= 5; rn++) {
                                    if (Math.abs(driveFreq - rn * f1) < 0.08) {
                                        viz.screenText('RESONANCE n=' + rn + '!', splitX / 2, h - 16, viz.colors.yellow, 14);
                                    }
                                }

                                // === Right: response curve ===
                                var gLeft = splitX + 30;
                                var gRight = w - 15;
                                var gTop = 35;
                                var gBot = h - 25;
                                var gW = gRight - gLeft;
                                var gH = gBot - gTop;

                                // Divider
                                ctx.strokeStyle = viz.colors.grid; ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(splitX, 0); ctx.lineTo(splitX, h); ctx.stroke();

                                // Axes
                                ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(gLeft, gBot); ctx.lineTo(gRight, gBot); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(gLeft, gBot); ctx.lineTo(gLeft, gTop); ctx.stroke();
                                viz.screenText('f', (gLeft + gRight) / 2, gBot + 14, viz.colors.text, 11);
                                viz.screenText('Amplitude', gLeft - 5, gTop - 10, viz.colors.text, 10);

                                // Plot response for first 5 harmonics
                                var fMax = f1 * 6;
                                var ampMax = responseAmp(f1, f1, damping) * 1.1;

                                ctx.strokeStyle = viz.colors.cyan;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                var started = false;
                                for (var fi = 0; fi <= 400; fi++) {
                                    var ff = 0.1 + (fMax - 0.1) * fi / 400;
                                    var totalResp = 0;
                                    for (var nrr = 1; nrr <= 8; nrr++) {
                                        totalResp += responseAmp(ff, nrr * f1, damping);
                                    }
                                    var px = gLeft + (ff / fMax) * gW;
                                    var py = gBot - (totalResp / ampMax) * gH;
                                    py = Math.max(gTop, py);
                                    if (!started) { ctx.moveTo(px, py); started = true; }
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();

                                // Mark harmonics on x-axis
                                for (var hn = 1; hn <= 5; hn++) {
                                    var hx = gLeft + (hn * f1 / fMax) * gW;
                                    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
                                    ctx.lineWidth = 1;
                                    ctx.setLineDash([2, 3]);
                                    ctx.beginPath(); ctx.moveTo(hx, gBot); ctx.lineTo(hx, gTop); ctx.stroke();
                                    ctx.setLineDash([]);
                                    viz.screenText(hn + 'f\u2081', hx, gBot + 5, viz.colors.text, 9, 'center', 'top');
                                }

                                // Current frequency marker
                                var cfx = gLeft + (driveFreq / fMax) * gW;
                                var totalRespCurrent = 0;
                                for (var nc = 1; nc <= 8; nc++) {
                                    totalRespCurrent += responseAmp(driveFreq, nc * f1, damping);
                                }
                                var cfy = gBot - (totalRespCurrent / ampMax) * gH;
                                cfy = Math.max(gTop, cfy);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(cfx, cfy, 5, 0, Math.PI * 2); ctx.fill();
                                ctx.save();
                                ctx.shadowColor = viz.colors.orange; ctx.shadowBlur = 10;
                                ctx.beginPath(); ctx.arc(cfx, cfy, 4, 0, Math.PI * 2); ctx.fill();
                                ctx.restore();
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A swing has a natural period of 3 s. To make a child swing higher, at what frequency should you push?',
                        hint: 'Resonance occurs when the driving frequency matches the natural frequency.',
                        solution: 'The natural frequency is \\(f = 1/T = 1/3 \\approx 0.33\\,\\text{Hz}\\). Push once every 3 seconds (at the natural frequency) for maximum energy transfer.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Standing Waves in Pipes
            // ============================================================
            {
                id: 'standing-waves-pipes',
                title: 'Standing Waves in Pipes',
                content: `
<h2>Air Columns and Musical Instruments</h2>

<p>Standing waves also form in columns of air inside pipes (flutes, organ pipes, brass instruments). The boundary conditions are different from strings:</p>

<ul>
<li>A <strong>closed end</strong> is a <strong>displacement node</strong> (air cannot move at a rigid wall) and a <strong>pressure antinode</strong>.</li>
<li>An <strong>open end</strong> is approximately a <strong>displacement antinode</strong> (air is free to move) and a <strong>pressure node</strong>.</li>
</ul>

<div class="env-block theorem">
<div class="env-title">Harmonics of Air Columns</div>
<div class="env-body">
<p><strong>Open-open pipe</strong> (both ends open):</p>
\\[f_n = \\frac{nv}{2L}, \\quad n = 1, 2, 3, \\ldots\\]
<p>All harmonics are present (same as a string).</p>

<p><strong>Closed-open pipe</strong> (one end closed, one open):</p>
\\[f_n = \\frac{nv}{4L}, \\quad n = 1, 3, 5, \\ldots \\text{ (odd only)}\\]
<p>Only odd harmonics are present. The fundamental has \\(\\lambda = 4L\\), giving a lower pitch for the same pipe length.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Organ Pipe</div>
<div class="env-body">
<p>A closed-open organ pipe is 0.5 m long. With \\(v = 343\\,\\text{m/s}\\):</p>
\\[f_1 = \\frac{343}{4(0.5)} = 171.5\\,\\text{Hz}\\]
<p>The next allowed frequency is the third harmonic: \\(f_3 = 3 \\times 171.5 = 514.5\\,\\text{Hz}\\). Note the gap: there is no second harmonic in a closed-open pipe.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Why clarinets sound different from flutes</div>
<div class="env-body">
<p>A clarinet behaves approximately as a closed-open pipe (the reed end is effectively closed). It produces mainly odd harmonics, giving it a distinctively "hollow" sound. A flute is open at both ends and produces all harmonics, giving a brighter, fuller tone.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'An open-open pipe is 0.7 m long. Find the fundamental frequency and the first three harmonics. (\\(v = 343\\,\\text{m/s}\\))',
                        hint: 'Open-open pipe: \\(f_n = nv/(2L)\\) for \\(n = 1, 2, 3, \\ldots\\)',
                        solution: '\\(f_1 = 343/(2 \\times 0.7) = 245\\,\\text{Hz}\\). \\(f_2 = 490\\,\\text{Hz}\\). \\(f_3 = 735\\,\\text{Hz}\\).'
                    },
                    {
                        question: 'A closed-open pipe produces a fundamental of 200 Hz. What is the frequency of the next possible harmonic?',
                        hint: 'Closed-open pipes produce only odd harmonics.',
                        solution: 'The next harmonic is the third: \\(f_3 = 3 \\times 200 = 600\\,\\text{Hz}\\). (There is no \\(f_2\\) at 400 Hz for a closed-open pipe.)'
                    }
                ]
            }
        ]
    });
})();
