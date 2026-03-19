// === Chapter 5: Sound Waves ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch05',
        number: 5,
        title: 'Sound Waves',
        subtitle: 'Vibrations that travel through matter and reach our ears',
        file: 'ch05-sound',

        sections: [
            // ============================================================
            // Section 0: Sound as a Longitudinal Wave
            // ============================================================
            {
                id: 'longitudinal-wave',
                title: 'Sound as a Longitudinal Wave',
                content: `
<h2>Waves That Push and Pull</h2>

<p>When you clap your hands, you compress the air between your palms. That compressed patch pushes on the air next to it, which pushes on the air beyond that, and so on. The disturbance propagates outward even though the air molecules themselves only jiggle back and forth around their equilibrium positions. This is a <strong>longitudinal wave</strong>: the oscillation direction is parallel to the direction of travel.</p>

<div class="env-block definition">
<div class="env-title">Definition: Longitudinal Wave</div>
<div class="env-body">
<p>A <strong>longitudinal wave</strong> is a wave in which the displacement of the medium is parallel to the direction of wave propagation. Sound in air, sound in water, and P-waves in earthquakes are all longitudinal.</p>
</div>
</div>

<p>As the wave passes through the medium, it creates alternating regions of high pressure (<strong>compressions</strong>) and low pressure (<strong>rarefactions</strong>). The distance between two successive compressions (or two successive rarefactions) is one <strong>wavelength</strong> \\(\\lambda\\).</p>

<div class="env-block intuition">
<div class="env-title">Why sound needs a medium</div>
<div class="env-body">
<p>Sound is a mechanical wave: it requires molecules to push against. In a vacuum there are no molecules, so there is nothing to compress or rarefy. This is why there is no sound in outer space, despite what science-fiction movies suggest.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-longitudinal"></div>

<p>The pressure variation at a fixed point oscillates sinusoidally in time:</p>

\\[\\Delta p(x,t) = \\Delta p_{\\max}\\sin(kx - \\omega t)\\]

<p>where \\(k = 2\\pi/\\lambda\\) is the wave number and \\(\\omega = 2\\pi f\\) is the angular frequency. The individual molecules oscillate back and forth with displacement:</p>

\\[s(x,t) = s_{\\max}\\cos(kx - \\omega t)\\]

<div class="env-block remark">
<div class="env-title">Pressure vs displacement</div>
<div class="env-body">
<p>Maximum pressure occurs where molecules are most crowded (compression). This corresponds to where the displacement function has zero slope, i.e., where molecules on both sides are displaced <em>toward</em> the same point. The pressure wave and displacement wave are 90 degrees out of phase.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-longitudinal',
                        title: 'Air Molecule Compression & Rarefaction',
                        description: 'Watch air molecules oscillate back and forth as a longitudinal sound wave passes through. <strong>Compressions</strong> (dense regions) and <strong>rarefactions</strong> (sparse regions) propagate to the right. Below, the corresponding pressure graph is drawn.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var freq = 1.0;
                            var amplitude = 12;
                            var t = 0;
                            var speed = 1.0;

                            VizEngine.createSlider(controls, 'Frequency', 0.3, 3.0, freq, 0.1, function (v) { freq = v; });
                            VizEngine.createSlider(controls, 'Amplitude', 2, 20, amplitude, 1, function (v) { amplitude = v; });

                            var paused = false;
                            VizEngine.createButton(controls, 'Pause / Play', function () { paused = !paused; });

                            // Molecule grid
                            var cols = 40;
                            var rows = 8;
                            var spacingX = (w - 40) / cols;
                            var molTop = 40;
                            var molBot = h * 0.55;
                            var spacingY = (molBot - molTop) / (rows - 1);

                            // Pressure graph region
                            var graphTop = h * 0.65;
                            var graphBot = h - 25;
                            var graphMid = (graphTop + graphBot) / 2;
                            var graphH = (graphBot - graphTop) / 2;
                            var graphLeft = 30;
                            var graphRight = w - 20;

                            function draw() {
                                if (!paused) t += 1 / 60;

                                viz.clear();

                                var omega = 2 * Math.PI * freq;
                                var k = 2 * Math.PI * freq / (w * 0.6);

                                // Title
                                viz.screenText('Longitudinal Sound Wave', w / 2, 18, viz.colors.white, 14);

                                // Direction arrow
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(w - 80, 18);
                                ctx.lineTo(w - 40, 18);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.moveTo(w - 40, 18);
                                ctx.lineTo(w - 48, 13);
                                ctx.lineTo(w - 48, 23);
                                ctx.closePath();
                                ctx.fill();
                                viz.screenText('propagation', w - 60, 30, viz.colors.text, 9);

                                // Draw molecules
                                for (var row = 0; row < rows; row++) {
                                    var baseY = molTop + row * spacingY;
                                    for (var col = 0; col < cols; col++) {
                                        var baseX = 20 + col * spacingX;
                                        // Displacement: s = A * cos(kx - wt)
                                        var displacement = amplitude * Math.cos(k * baseX - omega * t);
                                        var px = baseX + displacement;
                                        var py = baseY + (row % 2 === 0 ? 0 : spacingX * 0.15);

                                        // Color by local density (compression vs rarefaction)
                                        // Pressure proportional to -ds/dx = A*k*sin(kx - wt)
                                        var pressure = Math.sin(k * baseX - omega * t);
                                        var r, g, b;
                                        if (pressure > 0) {
                                            // Compression: orange/yellow
                                            r = Math.floor(240 + 15 * pressure);
                                            g = Math.floor(140 + 80 * pressure);
                                            b = Math.floor(60);
                                        } else {
                                            // Rarefaction: blue/cyan
                                            r = Math.floor(60);
                                            g = Math.floor(140 + 60 * pressure);
                                            b = Math.floor(220 + 35 * pressure);
                                        }
                                        var alpha = 0.5 + 0.5 * Math.abs(pressure);
                                        var molRadius = 2.5 + 1.2 * pressure; // slightly bigger in compression

                                        ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
                                        ctx.beginPath();
                                        ctx.arc(px, py, Math.max(1.5, molRadius), 0, Math.PI * 2);
                                        ctx.fill();

                                        // Glow in compression
                                        if (pressure > 0.3) {
                                            ctx.save();
                                            ctx.shadowColor = 'rgba(' + r + ',' + g + ',' + b + ',0.6)';
                                            ctx.shadowBlur = 6 * pressure;
                                            ctx.beginPath();
                                            ctx.arc(px, py, molRadius, 0, Math.PI * 2);
                                            ctx.fill();
                                            ctx.restore();
                                        }
                                    }
                                }

                                // Labels
                                // Find a compression peak and a rarefaction trough
                                for (var scan = 0; scan < cols; scan++) {
                                    var scanX = 20 + scan * spacingX;
                                    var scanP = Math.sin(k * scanX - omega * t);
                                    if (scanP > 0.9 && scanX > 80 && scanX < w - 120) {
                                        viz.screenText('Compression', scanX, molBot + 14, viz.colors.orange, 10);
                                        break;
                                    }
                                }
                                for (var scan2 = 0; scan2 < cols; scan2++) {
                                    var scanX2 = 20 + scan2 * spacingX;
                                    var scanP2 = Math.sin(k * scanX2 - omega * t);
                                    if (scanP2 < -0.9 && scanX2 > 80 && scanX2 < w - 120) {
                                        viz.screenText('Rarefaction', scanX2, molBot + 14, viz.colors.cyan, 10);
                                        break;
                                    }
                                }

                                // === Pressure graph ===
                                // Axes
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(graphLeft, graphMid);
                                ctx.lineTo(graphRight, graphMid);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(graphLeft, graphTop);
                                ctx.lineTo(graphLeft, graphBot);
                                ctx.stroke();

                                viz.screenText('\u0394p', graphLeft - 12, graphTop + 5, viz.colors.text, 11, 'center', 'top');
                                viz.screenText('x', graphRight + 10, graphMid, viz.colors.text, 11, 'center', 'middle');
                                viz.screenText('+', graphLeft - 8, graphTop + 10, viz.colors.orange, 9, 'center', 'top');
                                viz.screenText('\u2212', graphLeft - 8, graphBot - 10, viz.colors.cyan, 9, 'center', 'bottom');

                                // Pressure wave
                                ctx.beginPath();
                                var started = false;
                                for (var gx = graphLeft; gx <= graphRight; gx++) {
                                    var worldX = 20 + (gx - graphLeft) / (graphRight - graphLeft) * (cols * spacingX);
                                    var pVal = Math.sin(k * worldX - omega * t);
                                    var gy = graphMid - pVal * graphH * 0.85;
                                    if (!started) { ctx.moveTo(gx, gy); started = true; }
                                    else ctx.lineTo(gx, gy);
                                }
                                // Gradient stroke
                                var grad = ctx.createLinearGradient(graphLeft, graphTop, graphLeft, graphBot);
                                grad.addColorStop(0, viz.colors.orange);
                                grad.addColorStop(0.5, viz.colors.white);
                                grad.addColorStop(1, viz.colors.cyan);
                                ctx.strokeStyle = grad;
                                ctx.lineWidth = 2.5;
                                ctx.stroke();

                                // Fill under curve with transparency
                                for (var gx2 = graphLeft; gx2 <= graphRight; gx2 += 3) {
                                    var worldX2 = 20 + (gx2 - graphLeft) / (graphRight - graphLeft) * (cols * spacingX);
                                    var pVal2 = Math.sin(k * worldX2 - omega * t);
                                    var gy2 = graphMid - pVal2 * graphH * 0.85;
                                    if (pVal2 > 0) {
                                        ctx.fillStyle = 'rgba(240,136,62,0.08)';
                                    } else {
                                        ctx.fillStyle = 'rgba(0,212,255,0.08)';
                                    }
                                    ctx.fillRect(gx2, Math.min(gy2, graphMid), 3, Math.abs(gy2 - graphMid));
                                }

                                viz.screenText('Pressure graph', (graphLeft + graphRight) / 2, graphTop - 8, viz.colors.text, 11);
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Why can astronauts on the Moon not hear each other speak without a radio, even if they stand a metre apart?',
                        hint: 'Think about what sound needs to travel through.',
                        solution: 'The Moon has essentially no atmosphere. Sound is a mechanical wave that requires a medium (gas, liquid, or solid) to propagate. With no air molecules to compress and rarefy, there is no mechanism for sound transmission.'
                    },
                    {
                        question: 'In a longitudinal wave, at the centre of a compression, is the displacement of molecules at its maximum, minimum, or zero?',
                        hint: 'Think about where molecules converge. If molecules from the left are displaced right and molecules from the right are displaced left, they meet at a point of zero net displacement.',
                        solution: 'Zero. At the centre of a compression, molecules from both sides have been displaced toward that point. The displacement passes through zero while changing sign. The pressure is maximum, but the displacement is zero. The two quantities are 90 degrees out of phase.'
                    }
                ]
            },

            // ============================================================
            // Section 1: Speed of Sound
            // ============================================================
            {
                id: 'speed-of-sound',
                title: 'Speed of Sound',
                content: `
<h2>How Fast Does Sound Travel?</h2>

<p>Sound travels at different speeds depending on the medium. The stiffer and less dense the medium, the faster sound moves through it.</p>

<div class="env-block theorem">
<div class="env-title">Speed of sound in an ideal gas</div>
<div class="env-body">
\\[v = \\sqrt{\\frac{\\gamma R T}{M}}\\]
<p>where \\(\\gamma\\) is the adiabatic index (\\(\\gamma \\approx 1.4\\) for air), \\(R = 8.314\\,\\text{J/(mol\\cdot K)}\\) is the gas constant, \\(T\\) is the absolute temperature in kelvin, and \\(M\\) is the molar mass of the gas.</p>
</div>
</div>

<p>For air at 20 degrees Celsius (\\(T = 293\\,\\text{K}\\), \\(M = 0.029\\,\\text{kg/mol}\\)), this gives approximately \\(v \\approx 343\\,\\text{m/s}\\). A useful approximation:</p>

\\[v \\approx 331 + 0.6\\,T_C \\quad \\text{(m/s)}\\]

<p>where \\(T_C\\) is the temperature in degrees Celsius.</p>

<div class="env-block example">
<div class="env-title">Example: Speed in different media</div>
<div class="env-body">
<table style="width:100%;border-collapse:collapse;">
<tr style="border-bottom:1px solid #30363d;"><th style="text-align:left;padding:4px;">Medium</th><th style="text-align:right;padding:4px;">Speed (m/s)</th></tr>
<tr><td style="padding:4px;">Air (20 C)</td><td style="text-align:right;padding:4px;">343</td></tr>
<tr><td style="padding:4px;">Water (25 C)</td><td style="text-align:right;padding:4px;">1,497</td></tr>
<tr><td style="padding:4px;">Steel</td><td style="text-align:right;padding:4px;">5,960</td></tr>
<tr><td style="padding:4px;">Helium (20 C)</td><td style="text-align:right;padding:4px;">1,007</td></tr>
</table>
<p>Sound is about 4.4 times faster in water than in air, and about 17 times faster in steel. This is because liquids and solids are far stiffer (harder to compress) than gases.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why hotter air carries sound faster</div>
<div class="env-body">
<p>Higher temperature means molecules move faster on average. When you compress a region of hot air, the pressure disturbance is communicated more rapidly to neighbouring molecules because they are already jostling about at higher speeds. Hence the wave front advances faster.</p>
</div>
</div>

<h3>The wave equation relationship</h3>

<p>For any wave, speed, frequency, and wavelength are related by:</p>

\\[v = f\\lambda\\]

<p>This is not a special property of sound; it holds for all periodic waves. If you know any two of \\(v\\), \\(f\\), and \\(\\lambda\\), you can find the third.</p>

<div class="env-block example">
<div class="env-title">Example: Concert A</div>
<div class="env-body">
<p>The note A above middle C has frequency \\(f = 440\\,\\text{Hz}\\). In air at 20 C:</p>
\\[\\lambda = \\frac{v}{f} = \\frac{343}{440} \\approx 0.78\\,\\text{m}\\]
<p>So one wavelength of concert A is about 78 cm, roughly the length of your arm.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A lightning bolt strikes 1.7 km away. You see the flash almost instantly. How long after the flash do you hear the thunder? (Use \\(v = 343\\,\\text{m/s}\\).)',
                        hint: 'Light travels so fast that the delay is essentially the time for sound to cover 1.7 km.',
                        solution: '\\(t = d/v = 1700/343 \\approx 5.0\\,\\text{s}\\). You hear the thunder about 5 seconds after seeing the flash.'
                    },
                    {
                        question: 'A submarine sonar emits a pulse that reflects off a cliff and returns 0.4 s later. If the speed of sound in seawater is 1500 m/s, how far away is the cliff?',
                        hint: 'The pulse travels to the cliff and back, so the one-way distance is half the total travel distance.',
                        solution: 'Total distance \\(= v \\times t = 1500 \\times 0.4 = 600\\,\\text{m}\\). One-way distance \\(= 600/2 = 300\\,\\text{m}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 2: Pitch and Frequency
            // ============================================================
            {
                id: 'pitch-frequency',
                title: 'Pitch and Frequency',
                content: `
<h2>Higher Frequency, Higher Pitch</h2>

<p>Our ears perceive the <strong>frequency</strong> of a sound wave as its <strong>pitch</strong>. A high-frequency wave sounds high-pitched (a piccolo, a whistle), while a low-frequency wave sounds low-pitched (a bass drum, a foghorn).</p>

<div class="env-block definition">
<div class="env-title">Definition: Pitch</div>
<div class="env-body">
<p><strong>Pitch</strong> is the perceptual quality of a sound that allows us to order it on a scale from low to high. It correlates primarily with the <strong>frequency</strong> of the sound wave, measured in hertz (Hz).</p>
</div>
</div>

<p>The human ear can typically detect frequencies between about 20 Hz and 20,000 Hz (20 kHz). This range narrows with age; most adults cannot hear much above 15 kHz.</p>

<h3>Musical notes and octaves</h3>

<p>In Western music, an <strong>octave</strong> corresponds to a doubling of frequency. Middle C is about 262 Hz; the C one octave higher is about 524 Hz. Each octave is divided into 12 semitones on an equal-tempered scale, with each semitone multiplied by \\(2^{1/12} \\approx 1.0595\\).</p>

\\[f_n = f_0 \\times 2^{n/12}\\]

<p>where \\(n\\) is the number of semitones above the reference frequency \\(f_0\\).</p>

<div class="env-block example">
<div class="env-title">Example: From A4 to E5</div>
<div class="env-body">
<p>A4 = 440 Hz. E5 is 7 semitones above A4:</p>
\\[f_{E5} = 440 \\times 2^{7/12} = 440 \\times 1.498 \\approx 659\\,\\text{Hz}\\]
</div>
</div>

<div class="viz-placeholder" data-viz="viz-pitch-freq"></div>

<div class="env-block warning">
<div class="env-title">Pitch vs frequency is not perfectly linear</div>
<div class="env-body">
<p>Pitch perception is approximately <em>logarithmic</em> in frequency. Doubling the frequency always sounds like the same interval (one octave), regardless of the starting frequency. Going from 100 Hz to 200 Hz sounds like the same "jump" as going from 1000 Hz to 2000 Hz, even though the latter is a 1000 Hz increase and the former only 100 Hz.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-pitch-freq',
                        title: 'Frequency and Pitch',
                        description: 'Adjust the frequency slider and watch the waveform change. Higher frequency means more oscillations per second (higher pitch). The wave colour shifts from red (low) through yellow and green to blue (high) to give a visual sense of pitch.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var freq = 2.0;
                            var amp = 1.0;
                            var t = 0;

                            VizEngine.createSlider(controls, 'Frequency (visual Hz)', 0.5, 8.0, freq, 0.1, function (v) { freq = v; });
                            VizEngine.createSlider(controls, 'Amplitude', 0.1, 1.0, amp, 0.05, function (v) { amp = v; });

                            var midY = h * 0.45;
                            var waveH = h * 0.3;
                            var leftX = 50;
                            var rightX = w - 30;

                            function freqToHue(f) {
                                // 0.5 -> 0 (red), 8 -> 240 (blue)
                                return VizEngine.lerp(0, 240, (f - 0.5) / 7.5);
                            }

                            function draw() {
                                t += 1 / 60;
                                viz.clear();

                                var hue = freqToHue(freq);
                                var waveColor = VizEngine.hsl(hue, 85, 60);
                                var glowColor = VizEngine.hsl(hue, 90, 50);

                                // Axes
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(leftX, midY);
                                ctx.lineTo(rightX, midY);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(leftX, midY - waveH - 10);
                                ctx.lineTo(leftX, midY + waveH + 10);
                                ctx.stroke();

                                viz.screenText('Pressure', leftX - 8, midY - waveH - 5, viz.colors.text, 10, 'center', 'bottom');
                                viz.screenText('time', rightX + 5, midY + 12, viz.colors.text, 10, 'left', 'top');

                                // Draw wave with glow
                                ctx.save();
                                ctx.shadowColor = glowColor;
                                ctx.shadowBlur = 12;
                                ctx.beginPath();
                                var omega = 2 * Math.PI * freq;
                                var started = false;
                                for (var px = leftX; px <= rightX; px++) {
                                    var tLocal = (px - leftX) / (rightX - leftX) * 4;
                                    var y = amp * Math.sin(omega * tLocal - omega * t);
                                    var sy = midY - y * waveH;
                                    if (!started) { ctx.moveTo(px, sy); started = true; }
                                    else ctx.lineTo(px, sy);
                                }
                                ctx.strokeStyle = waveColor;
                                ctx.lineWidth = 3;
                                ctx.stroke();
                                ctx.restore();

                                // Fill area under wave
                                for (var px2 = leftX; px2 <= rightX; px2 += 2) {
                                    var tLocal2 = (px2 - leftX) / (rightX - leftX) * 4;
                                    var y2 = amp * Math.sin(omega * tLocal2 - omega * t);
                                    var sy2 = midY - y2 * waveH;
                                    var fillAlpha = Math.abs(y2) * 0.08;
                                    ctx.fillStyle = 'hsla(' + hue + ',80%,50%,' + fillAlpha + ')';
                                    ctx.fillRect(px2, Math.min(sy2, midY), 2, Math.abs(sy2 - midY));
                                }

                                // Wavelength bracket
                                var lambdaPx = (rightX - leftX) / (freq * 4);
                                if (lambdaPx > 30) {
                                    var bracketY = midY + waveH + 25;
                                    var bx1 = leftX + lambdaPx * 0.5;
                                    var bx2 = bx1 + lambdaPx;
                                    if (bx2 < rightX - 20) {
                                        ctx.strokeStyle = viz.colors.teal;
                                        ctx.lineWidth = 1.5;
                                        // Left tick
                                        ctx.beginPath(); ctx.moveTo(bx1, bracketY - 5); ctx.lineTo(bx1, bracketY + 5); ctx.stroke();
                                        // Right tick
                                        ctx.beginPath(); ctx.moveTo(bx2, bracketY - 5); ctx.lineTo(bx2, bracketY + 5); ctx.stroke();
                                        // Horizontal line
                                        ctx.beginPath(); ctx.moveTo(bx1, bracketY); ctx.lineTo(bx2, bracketY); ctx.stroke();
                                        viz.screenText('\u03BB', (bx1 + bx2) / 2, bracketY + 12, viz.colors.teal, 13, 'center', 'top');
                                    }
                                }

                                // Frequency & pitch display
                                var noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
                                var displayFreq = (freq * 110).toFixed(0);
                                var pitchLabel = freq < 2 ? 'Low pitch' : (freq < 5 ? 'Medium pitch' : 'High pitch');

                                viz.screenText('f = ' + freq.toFixed(1) + ' visual Hz (\u223C' + displayFreq + ' Hz)', w / 2, 22, waveColor, 14);
                                viz.screenText(pitchLabel, w / 2, 42, viz.colors.text, 12);

                                // Color bar showing frequency-to-color mapping
                                var barY = h - 30;
                                var barH2 = 10;
                                for (var bx = leftX; bx < rightX; bx++) {
                                    var bf = 0.5 + (bx - leftX) / (rightX - leftX) * 7.5;
                                    var bHue = freqToHue(bf);
                                    ctx.fillStyle = VizEngine.hsl(bHue, 85, 50);
                                    ctx.fillRect(bx, barY, 2, barH2);
                                }
                                // Current freq marker
                                var markerX = leftX + (freq - 0.5) / 7.5 * (rightX - leftX);
                                ctx.fillStyle = viz.colors.white;
                                ctx.beginPath();
                                ctx.moveTo(markerX, barY - 3);
                                ctx.lineTo(markerX - 4, barY - 8);
                                ctx.lineTo(markerX + 4, barY - 8);
                                ctx.closePath();
                                ctx.fill();

                                viz.screenText('Low', leftX, barY + barH2 + 10, viz.colors.red, 9, 'left', 'top');
                                viz.screenText('High', rightX, barY + barH2 + 10, viz.colors.blue, 9, 'right', 'top');
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A piano key has a frequency of 880 Hz. What note is it, and how does it relate to A4 = 440 Hz?',
                        hint: 'What happens when you double the frequency?',
                        solution: '880 Hz is exactly twice 440 Hz, which means it is one octave above A4. It is A5.'
                    },
                    {
                        question: 'The lowest note on a standard piano is A0, with \\(f = 27.5\\,\\text{Hz}\\). What is its wavelength in air at 20 C?',
                        hint: 'Use \\(\\lambda = v/f\\) with \\(v = 343\\,\\text{m/s}\\).',
                        solution: '\\(\\lambda = 343 / 27.5 \\approx 12.5\\,\\text{m}\\). Over 12 metres! Low-frequency sound waves are very long, which is why bass sounds are hard to localize and diffract around obstacles easily.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Loudness and Amplitude
            // ============================================================
            {
                id: 'loudness-amplitude',
                title: 'Loudness and Amplitude',
                content: `
<h2>Bigger Oscillations, Louder Sound</h2>

<p>While frequency determines pitch, the <strong>amplitude</strong> of the pressure wave determines how loud the sound is. A wave with larger pressure oscillations carries more energy per second per unit area, and our ears perceive this as greater loudness.</p>

<div class="env-block definition">
<div class="env-title">Definition: Sound Intensity</div>
<div class="env-body">
<p>The <strong>intensity</strong> \\(I\\) of a sound wave is the power carried per unit area perpendicular to the wave's direction:</p>
\\[I = \\frac{P}{A} \\quad \\text{(W/m}^2\\text{)}\\]
<p>For a sinusoidal sound wave in a medium of density \\(\\rho\\) with wave speed \\(v\\):</p>
\\[I = \\frac{(\\Delta p_{\\max})^2}{2\\rho v}\\]
</div>
</div>

<p>Intensity is proportional to the <strong>square</strong> of the pressure amplitude. Double the amplitude, quadruple the intensity.</p>

<h3>The decibel scale</h3>

<p>The human ear can detect an enormous range of intensities, from the threshold of hearing (\\(I_0 = 10^{-12}\\,\\text{W/m}^2\\)) to the threshold of pain (about \\(1\\,\\text{W/m}^2\\)), a factor of \\(10^{12}\\). To handle this, we use a logarithmic scale:</p>

<div class="env-block theorem">
<div class="env-title">Sound Intensity Level (Decibels)</div>
<div class="env-body">
\\[\\beta = 10\\log_{10}\\!\\left(\\frac{I}{I_0}\\right) \\quad \\text{(dB)}\\]
<p>where \\(I_0 = 10^{-12}\\,\\text{W/m}^2\\) is the reference intensity (threshold of hearing).</p>
</div>
</div>

<p>Some reference levels:</p>
<ul>
<li>0 dB: threshold of hearing</li>
<li>30 dB: quiet whisper</li>
<li>60 dB: normal conversation</li>
<li>85 dB: heavy traffic (prolonged exposure causes hearing damage)</li>
<li>120 dB: threshold of pain</li>
<li>140 dB: jet engine at 30 m</li>
</ul>

<div class="env-block warning">
<div class="env-title">Decibels are tricky</div>
<div class="env-body">
<p>Because decibels are logarithmic, adding 10 dB means multiplying the intensity by 10. Adding 3 dB roughly doubles the intensity. Two identical speakers playing the same sound do not produce twice the decibel level; they add about 3 dB.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-amplitude-loudness"></div>

<div class="env-block example">
<div class="env-title">Example: Doubling the distance</div>
<div class="env-body">
<p>For a point source radiating uniformly, intensity follows an inverse-square law: \\(I \\propto 1/r^2\\). If you double your distance from a speaker, the intensity drops to \\(1/4\\), and the sound level decreases by:</p>
\\[\\Delta\\beta = 10\\log_{10}(1/4) = -6.0\\,\\text{dB}\\]
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-amplitude-loudness',
                        title: 'Amplitude and Loudness',
                        description: 'Drag the amplitude slider and see how the wave changes. The bar on the right shows the approximate decibel level. Notice that <strong>frequency is unchanged</strong> when you adjust amplitude; loudness and pitch are independent.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var amp = 0.6;
                            var freq = 2.5;
                            var t = 0;

                            VizEngine.createSlider(controls, 'Amplitude', 0.01, 1.0, amp, 0.01, function (v) { amp = v; });
                            VizEngine.createSlider(controls, 'Frequency', 1.0, 5.0, freq, 0.1, function (v) { freq = v; });

                            var waveLeft = 50;
                            var waveRight = w * 0.72;
                            var waveMidY = h * 0.45;
                            var waveH = h * 0.32;

                            // dB bar region
                            var barLeft = w * 0.78;
                            var barRight = w * 0.88;
                            var barTop = 50;
                            var barBot = h - 40;

                            function draw() {
                                t += 1 / 60;
                                viz.clear();

                                var omega = 2 * Math.PI * freq;

                                // === Wave ===
                                // Axes
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(waveLeft, waveMidY); ctx.lineTo(waveRight, waveMidY); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(waveLeft, waveMidY - waveH - 5); ctx.lineTo(waveLeft, waveMidY + waveH + 5); ctx.stroke();

                                // Max amplitude ghost lines
                                ctx.strokeStyle = 'rgba(255,255,255,0.08)';
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath(); ctx.moveTo(waveLeft, waveMidY - waveH); ctx.lineTo(waveRight, waveMidY - waveH); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(waveLeft, waveMidY + waveH); ctx.lineTo(waveRight, waveMidY + waveH); ctx.stroke();
                                ctx.setLineDash([]);

                                // Wave with glow
                                var hue = VizEngine.lerp(120, 0, amp);
                                var waveColor = VizEngine.hsl(hue, 80, 55);
                                ctx.save();
                                ctx.shadowColor = waveColor;
                                ctx.shadowBlur = 8 + amp * 12;
                                ctx.beginPath();
                                var started = false;
                                for (var px = waveLeft; px <= waveRight; px++) {
                                    var tLocal = (px - waveLeft) / (waveRight - waveLeft) * 4;
                                    var y = amp * Math.sin(omega * tLocal - omega * t);
                                    var sy = waveMidY - y * waveH;
                                    if (!started) { ctx.moveTo(px, sy); started = true; }
                                    else ctx.lineTo(px, sy);
                                }
                                ctx.strokeStyle = waveColor;
                                ctx.lineWidth = 2.5 + amp * 2;
                                ctx.stroke();
                                ctx.restore();

                                // Amplitude bracket
                                var bracketX = waveLeft - 10;
                                var aTop = waveMidY - amp * waveH;
                                var aBot = waveMidY + amp * waveH;
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath(); ctx.moveTo(bracketX - 4, aTop); ctx.lineTo(bracketX + 4, aTop); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(bracketX - 4, aBot); ctx.lineTo(bracketX + 4, aBot); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(bracketX, aTop); ctx.lineTo(bracketX, aBot); ctx.stroke();
                                viz.screenText('A', bracketX - 14, waveMidY, viz.colors.orange, 13, 'center', 'middle');

                                // === Decibel bar ===
                                var dB = 20 * Math.log10(amp / 0.00002 + 0.001);
                                dB = VizEngine.clamp(dB, 0, 130);
                                var barFrac = dB / 130;
                                var barW = barRight - barLeft;

                                // Background
                                ctx.fillStyle = viz.colors.grid;
                                ctx.fillRect(barLeft, barTop, barW, barBot - barTop);

                                // Filled portion with gradient
                                var barFillH = barFrac * (barBot - barTop);
                                var barGrad = ctx.createLinearGradient(0, barBot, 0, barTop);
                                barGrad.addColorStop(0, viz.colors.green);
                                barGrad.addColorStop(0.5, viz.colors.yellow);
                                barGrad.addColorStop(0.8, viz.colors.orange);
                                barGrad.addColorStop(1, viz.colors.red);
                                ctx.fillStyle = barGrad;
                                ctx.fillRect(barLeft, barBot - barFillH, barW, barFillH);

                                // Border
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(barLeft, barTop, barW, barBot - barTop);

                                // Tick marks
                                for (var db = 0; db <= 130; db += 20) {
                                    var tickY = barBot - (db / 130) * (barBot - barTop);
                                    ctx.strokeStyle = viz.colors.text;
                                    ctx.beginPath(); ctx.moveTo(barRight, tickY); ctx.lineTo(barRight + 5, tickY); ctx.stroke();
                                    viz.screenText(db + '', barRight + 16, tickY, viz.colors.text, 9, 'left', 'middle');
                                }

                                viz.screenText('dB', (barLeft + barRight) / 2, barTop - 10, viz.colors.white, 12);
                                viz.screenText(dB.toFixed(0) + ' dB', (barLeft + barRight) / 2, barBot + 18, waveColor, 13);

                                // Labels
                                var labelX = barRight + 38;
                                var levels = [
                                    { db: 0, label: 'Hearing threshold', col: viz.colors.green },
                                    { db: 30, label: 'Whisper', col: viz.colors.green },
                                    { db: 60, label: 'Conversation', col: viz.colors.teal },
                                    { db: 85, label: 'Traffic', col: viz.colors.yellow },
                                    { db: 120, label: 'Pain', col: viz.colors.red }
                                ];
                                for (var li = 0; li < levels.length; li++) {
                                    var lY = barBot - (levels[li].db / 130) * (barBot - barTop);
                                    ctx.setLineDash([2, 3]);
                                    ctx.strokeStyle = levels[li].col + '44';
                                    ctx.beginPath(); ctx.moveTo(barLeft, lY); ctx.lineTo(barRight, lY); ctx.stroke();
                                    ctx.setLineDash([]);
                                }

                                viz.screenText('Amplitude = ' + amp.toFixed(2), (waveLeft + waveRight) / 2, 20, waveColor, 14);
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A sound has an intensity of \\(10^{-5}\\,\\text{W/m}^2\\). What is its intensity level in decibels?',
                        hint: 'Use \\(\\beta = 10\\log_{10}(I/I_0)\\) with \\(I_0 = 10^{-12}\\).',
                        solution: '\\(\\beta = 10\\log_{10}(10^{-5}/10^{-12}) = 10\\log_{10}(10^7) = 10 \\times 7 = 70\\,\\text{dB}\\).'
                    },
                    {
                        question: 'If the pressure amplitude of a sound wave is tripled, by what factor does the intensity change? By how many decibels does the sound level increase?',
                        hint: 'Intensity is proportional to the square of pressure amplitude.',
                        solution: 'Intensity is proportional to \\((\\Delta p_{\\max})^2\\), so tripling the amplitude gives \\(I \\to 9I\\). The increase in dB is \\(10\\log_{10}(9) \\approx 9.5\\,\\text{dB}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 4: Ultrasound and Infrasound
            // ============================================================
            {
                id: 'ultrasound-infrasound',
                title: 'Ultrasound and Infrasound',
                content: `
<h2>Beyond the Human Ear</h2>

<p>The audible range (20 Hz to 20 kHz) is just a small slice of the vast spectrum of sound frequencies that exist in nature.</p>

<div class="env-block definition">
<div class="env-title">Definition: Ultrasound and Infrasound</div>
<div class="env-body">
<p><strong>Ultrasound</strong>: sound waves with frequencies <em>above</em> 20 kHz (above human hearing).</p>
<p><strong>Infrasound</strong>: sound waves with frequencies <em>below</em> 20 Hz (below human hearing).</p>
</div>
</div>

<h3>Ultrasound applications</h3>

<ul>
<li><strong>Medical imaging</strong>: Ultrasound at 1-20 MHz is used to image internal organs, monitor fetal development, and detect tumours. The short wavelength provides high resolution.</li>
<li><strong>Echolocation</strong>: Bats emit ultrasound pulses (20-200 kHz) and listen for echoes to navigate and hunt insects in complete darkness. Dolphins use a similar system underwater.</li>
<li><strong>Industrial testing</strong>: Ultrasound can detect cracks and flaws inside metal structures (non-destructive testing) by analysing reflected pulses.</li>
<li><strong>Cleaning</strong>: Ultrasonic baths use high-frequency vibrations to dislodge dirt from jewellery, surgical instruments, and electronic components.</li>
</ul>

<h3>Infrasound applications and phenomena</h3>

<ul>
<li><strong>Earthquakes</strong>: Seismic P-waves can have frequencies well below 1 Hz. Seismometers detect these infrasound vibrations.</li>
<li><strong>Elephants</strong>: Elephants communicate using infrasound at frequencies as low as 14 Hz, which can travel many kilometres through the ground and air.</li>
<li><strong>Weather</strong>: Severe thunderstorms, tornadoes, and volcanic eruptions produce powerful infrasound. Monitoring stations around the world detect these to track nuclear tests and volcanic events.</li>
<li><strong>Wind turbines and traffic</strong>: Low-frequency rumble from these sources can be a source of discomfort, even if below the nominal hearing threshold.</li>
</ul>

<div class="env-block intuition">
<div class="env-title">Why short wavelengths give better resolution</div>
<div class="env-body">
<p>A wave cannot resolve features much smaller than its wavelength. At 1 MHz in tissue (\\(v \\approx 1540\\,\\text{m/s}\\)), the wavelength is \\(\\lambda = 1540/10^6 = 1.54\\,\\text{mm}\\). This allows medical ultrasound to see structures on the millimetre scale. Audible sound at 1 kHz has \\(\\lambda \\approx 1.5\\,\\text{m}\\), which is useless for imaging.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">The frequency spectrum of sound</div>
<div class="env-body">
<p>The full picture, from low to high:</p>
<ul>
<li>Infrasound: below 20 Hz (earthquakes, elephants)</li>
<li>Audible: 20 Hz to 20 kHz (speech, music)</li>
<li>Ultrasound: 20 kHz to ~1 GHz (bats, medical imaging)</li>
<li>Hypersound: above ~1 GHz (phonons in crystals; not usually called "sound")</li>
</ul>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A bat emits an ultrasound pulse at 50 kHz. What is the wavelength in air at 20 C?',
                        hint: 'Use \\(\\lambda = v/f\\) with \\(v = 343\\,\\text{m/s}\\).',
                        solution: '\\(\\lambda = 343 / 50{,}000 = 0.00686\\,\\text{m} \\approx 6.9\\,\\text{mm}\\). This short wavelength allows the bat to detect small insects.'
                    },
                    {
                        question: 'An elephant produces infrasound at 15 Hz. Can a human hear it? What is its wavelength?',
                        hint: 'The lower limit of human hearing is about 20 Hz.',
                        solution: 'At 15 Hz, this is below the human audible range, so most people cannot hear it (though some may feel it as a vibration). Wavelength: \\(\\lambda = 343/15 \\approx 22.9\\,\\text{m}\\). This very long wavelength diffracts easily around obstacles, allowing the sound to travel far.'
                    }
                ]
            }
        ]
    });
})();
