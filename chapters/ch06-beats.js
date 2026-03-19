// === Chapter 6: Beats & Acoustic Interference ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch06',
        number: 6,
        title: 'Beats & Acoustic Interference',
        subtitle: 'When two frequencies meet and pulse together',
        file: 'ch06-beats',

        sections: [
            // ============================================================
            // Section 0: Two Close Frequencies
            // ============================================================
            {
                id: 'two-close-frequencies',
                title: 'Two Close Frequencies',
                content: `
<h2>When Nearly-Equal Tones Overlap</h2>

<p>Imagine two tuning forks, one vibrating at 440 Hz and the other at 443 Hz. Individually, each produces a steady tone. But when both sound simultaneously, something new happens: the combined sound pulsates, growing louder and softer in a slow, rhythmic pattern. These pulsations are called <strong>beats</strong>.</p>

<p>The mathematical reason is straightforward. Suppose two waves have equal amplitude \\(A\\) but slightly different frequencies \\(f_1\\) and \\(f_2\\):</p>

\\[y_1 = A\\sin(2\\pi f_1 t), \\qquad y_2 = A\\sin(2\\pi f_2 t)\\]

<p>By the principle of superposition, the combined wave is \\(y = y_1 + y_2\\). Using the trigonometric identity for the sum of two sines:</p>

\\[\\sin\\alpha + \\sin\\beta = 2\\cos\\!\\left(\\frac{\\alpha - \\beta}{2}\\right)\\sin\\!\\left(\\frac{\\alpha + \\beta}{2}\\right)\\]

<p>we get:</p>

<div class="env-block theorem">
<div class="env-title">Beat equation</div>
<div class="env-body">
\\[y = 2A\\cos\\!\\left(2\\pi\\,\\frac{f_1 - f_2}{2}\\,t\\right)\\sin\\!\\left(2\\pi\\,\\frac{f_1 + f_2}{2}\\,t\\right)\\]
<p>The result is a wave at the <strong>average frequency</strong> \\(\\bar{f} = (f_1 + f_2)/2\\), modulated by a slowly varying envelope at frequency \\(|f_1 - f_2|/2\\).</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why the envelope pulsates</div>
<div class="env-body">
<p>When the two waves are in phase (crests align), they add constructively and the sound is loud. Half a beat cycle later, they are out of phase (crest meets trough) and cancel, making the sound nearly silent. The alternation between constructive and destructive interference creates the characteristic waxing and waning of beats.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-beats-main"></div>
`,
                visualizations: [
                    {
                        id: 'viz-beats-main',
                        title: 'Beat Pattern from Two Frequencies',
                        description: 'Two sine waves (blue and teal) combine to produce a beat pattern (orange). Adjust \\(f_1\\) and \\(f_2\\) and watch the envelope change. When the frequencies are close, you see slow pulsations; when they match, the beats vanish.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var f1 = 4.0, f2 = 4.8;
                            var t = 0;

                            VizEngine.createSlider(controls, 'f\u2081 (Hz)', 1.0, 10.0, f1, 0.1, function (v) { f1 = v; });
                            VizEngine.createSlider(controls, 'f\u2082 (Hz)', 1.0, 10.0, f2, 0.1, function (v) { f2 = v; });

                            // Layout: three horizontal wave panels
                            var leftX = 50, rightX = w - 20;
                            var panel1Mid = h * 0.17;
                            var panel2Mid = h * 0.40;
                            var panel3Mid = h * 0.72;
                            var waveH1 = h * 0.10;
                            var waveH3 = h * 0.18;

                            function draw() {
                                t += 1 / 60;
                                viz.clear();

                                var omega1 = 2 * Math.PI * f1;
                                var omega2 = 2 * Math.PI * f2;
                                var beatFreq = Math.abs(f1 - f2);
                                var avgFreq = (f1 + f2) / 2;

                                // === Panel 1: Wave 1 ===
                                viz.screenText('y\u2081 = sin(2\u03C0\u00B7' + f1.toFixed(1) + '\u00B7t)', leftX + 5, panel1Mid - waveH1 - 8, viz.colors.blue, 11, 'left', 'bottom');
                                ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(leftX, panel1Mid); ctx.lineTo(rightX, panel1Mid); ctx.stroke();
                                ctx.beginPath();
                                var started1 = false;
                                for (var px = leftX; px <= rightX; px++) {
                                    var tLocal = (px - leftX) / (rightX - leftX) * 6;
                                    var y1 = Math.sin(omega1 * tLocal - omega1 * t * 0.3);
                                    var sy = panel1Mid - y1 * waveH1;
                                    if (!started1) { ctx.moveTo(px, sy); started1 = true; }
                                    else ctx.lineTo(px, sy);
                                }
                                ctx.strokeStyle = viz.colors.blue; ctx.lineWidth = 2; ctx.stroke();

                                // === Panel 2: Wave 2 ===
                                viz.screenText('y\u2082 = sin(2\u03C0\u00B7' + f2.toFixed(1) + '\u00B7t)', leftX + 5, panel2Mid - waveH1 - 8, viz.colors.teal, 11, 'left', 'bottom');
                                ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(leftX, panel2Mid); ctx.lineTo(rightX, panel2Mid); ctx.stroke();
                                ctx.beginPath();
                                var started2 = false;
                                for (var px2 = leftX; px2 <= rightX; px2++) {
                                    var tLocal2 = (px2 - leftX) / (rightX - leftX) * 6;
                                    var y2 = Math.sin(omega2 * tLocal2 - omega2 * t * 0.3);
                                    var sy2 = panel2Mid - y2 * waveH1;
                                    if (!started2) { ctx.moveTo(px2, sy2); started2 = true; }
                                    else ctx.lineTo(px2, sy2);
                                }
                                ctx.strokeStyle = viz.colors.teal; ctx.lineWidth = 2; ctx.stroke();

                                // === Panel 3: Sum (Beat pattern) ===
                                viz.screenText('y\u2081 + y\u2082  (Beat pattern)', leftX + 5, panel3Mid - waveH3 - 12, viz.colors.orange, 12, 'left', 'bottom');
                                ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(leftX, panel3Mid); ctx.lineTo(rightX, panel3Mid); ctx.stroke();

                                // Envelope
                                var envOmega = Math.PI * Math.abs(f1 - f2);
                                ctx.beginPath();
                                var startedE = false;
                                for (var pxe = leftX; pxe <= rightX; pxe++) {
                                    var tLocalE = (pxe - leftX) / (rightX - leftX) * 6;
                                    var env = 2 * Math.abs(Math.cos(envOmega * (tLocalE - t * 0.3)));
                                    var sye = panel3Mid - env * waveH3;
                                    if (!startedE) { ctx.moveTo(pxe, sye); startedE = true; }
                                    else ctx.lineTo(pxe, sye);
                                }
                                ctx.strokeStyle = viz.colors.red + '55'; ctx.lineWidth = 1.5; ctx.setLineDash([6, 3]); ctx.stroke(); ctx.setLineDash([]);

                                // Lower envelope
                                ctx.beginPath();
                                startedE = false;
                                for (var pxe2 = leftX; pxe2 <= rightX; pxe2++) {
                                    var tLocalE2 = (pxe2 - leftX) / (rightX - leftX) * 6;
                                    var env2 = -2 * Math.abs(Math.cos(envOmega * (tLocalE2 - t * 0.3)));
                                    var sye2 = panel3Mid - env2 * waveH3;
                                    if (!startedE) { ctx.moveTo(pxe2, sye2); startedE = true; }
                                    else ctx.lineTo(pxe2, sye2);
                                }
                                ctx.strokeStyle = viz.colors.red + '55'; ctx.lineWidth = 1.5; ctx.setLineDash([6, 3]); ctx.stroke(); ctx.setLineDash([]);

                                // Combined wave
                                ctx.save();
                                ctx.shadowColor = viz.colors.orange;
                                ctx.shadowBlur = 6;
                                ctx.beginPath();
                                var started3 = false;
                                for (var px3 = leftX; px3 <= rightX; px3++) {
                                    var tLocal3 = (px3 - leftX) / (rightX - leftX) * 6;
                                    var ySum = Math.sin(omega1 * (tLocal3 - t * 0.3)) + Math.sin(omega2 * (tLocal3 - t * 0.3));
                                    var sy3 = panel3Mid - ySum * waveH3;
                                    if (!started3) { ctx.moveTo(px3, sy3); started3 = true; }
                                    else ctx.lineTo(px3, sy3);
                                }
                                ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 2.5; ctx.stroke();
                                ctx.restore();

                                // Info panel
                                var infoY = h - 18;
                                viz.screenText('f\u2081 = ' + f1.toFixed(1) + ' Hz', w * 0.15, infoY, viz.colors.blue, 12);
                                viz.screenText('f\u2082 = ' + f2.toFixed(1) + ' Hz', w * 0.35, infoY, viz.colors.teal, 12);
                                viz.screenText('f_beat = |f\u2081\u2212f\u2082| = ' + beatFreq.toFixed(1) + ' Hz', w * 0.60, infoY, viz.colors.red, 12);
                                viz.screenText('f_avg = ' + avgFreq.toFixed(1) + ' Hz', w * 0.87, infoY, viz.colors.orange, 12);

                                // Envelope label
                                viz.screenText('envelope', rightX - 30, panel3Mid - waveH3 + 5, viz.colors.red, 9, 'right', 'top');
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Two tuning forks vibrate at 256 Hz and 259 Hz. What do you hear?',
                        hint: 'Calculate the beat frequency and the average frequency.',
                        solution: 'You hear a tone at the average frequency \\((256 + 259)/2 = 257.5\\,\\text{Hz}\\) (approximately middle C) that pulsates 3 times per second. The beat frequency is \\(|259 - 256| = 3\\,\\text{Hz}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 1: Beat Frequency
            // ============================================================
            {
                id: 'beat-frequency',
                title: 'Beat Frequency',
                content: `
<h2>Counting the Pulsations</h2>

<p>How fast do the beats occur? Looking at the beat equation, the envelope has the form \\(\\cos(2\\pi\\frac{f_1-f_2}{2}t)\\). The loudness is proportional to the <em>square</em> of the amplitude, and \\(\\cos^2\\) completes a full cycle when its argument changes by \\(\\pi\\), not \\(2\\pi\\). This means the <strong>beat frequency</strong> (the number of loud-soft cycles per second) is:</p>

<div class="env-block theorem">
<div class="env-title">Beat frequency</div>
<div class="env-body">
\\[f_{\\text{beat}} = |f_1 - f_2|\\]
<p>The number of beats per second equals the absolute difference of the two frequencies.</p>
</div>
</div>

<p>This is one of the most elegant results in wave physics. You do not need to know both frequencies individually; just count the beats per second, and you know how far apart the two frequencies are.</p>

<div class="env-block example">
<div class="env-title">Example: Beats from two guitar strings</div>
<div class="env-body">
<p>A guitarist plays two strings that should both be tuned to E4 (330 Hz). She hears 2 beats per second. One string is in tune at 330 Hz; the other must be at either 328 Hz or 332 Hz. The beats alone cannot tell you <em>which</em>, just that the difference is 2 Hz.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">When beats are too fast to hear</div>
<div class="env-body">
<p>If \\(|f_1 - f_2|\\) exceeds about 15-20 Hz, the pulsations are too fast for the ear to resolve as individual beats. Instead, you perceive a "rough" or "dissonant" tone. At even larger separations, you simply hear two distinct pitches. Beats are only perceptible when the two frequencies are close.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Equal amplitudes are not required</div>
<div class="env-body">
<p>The derivation above assumed equal amplitudes for simplicity. If the amplitudes differ, beats still occur, but the cancellation is not complete: the sound gets softer at the minima but does not vanish entirely. The beat frequency is still \\(|f_1 - f_2|\\).</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Two organ pipes produce 5 beats per second. If one pipe has a frequency of 200 Hz, what are the possible frequencies of the other?',
                        hint: 'The beat frequency is \\(|f_1 - f_2|\\).',
                        solution: 'The other pipe has frequency \\(200 + 5 = 205\\,\\text{Hz}\\) or \\(200 - 5 = 195\\,\\text{Hz}\\). Both give \\(|f_1 - f_2| = 5\\,\\text{Hz}\\).'
                    },
                    {
                        question: 'You hear 8 beats in 4 seconds from two flutes. What is the frequency difference between them?',
                        hint: 'The beat frequency is the number of beats per second.',
                        solution: 'Beat frequency = 8/4 = 2 Hz. The two flutes differ in frequency by 2 Hz.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Tuning with Beats
            // ============================================================
            {
                id: 'tuning-with-beats',
                title: 'Tuning with Beats',
                content: `
<h2>A Musician's Precision Tool</h2>

<p>Beats provide musicians with a remarkably precise method for tuning instruments. The procedure is simple:</p>

<ol>
<li>Sound a reference pitch (tuning fork, electronic tuner, or a string known to be in tune).</li>
<li>Play the note to be tuned simultaneously.</li>
<li>Listen for beats. If you hear pulsations, the note is slightly off.</li>
<li>Adjust the instrument (tighten or loosen the string, adjust the reed, extend or shorten the tube) until the beats slow down and eventually <strong>vanish</strong>.</li>
</ol>

<p>When the beats disappear, the two frequencies are identical: you are in tune.</p>

<div class="env-block intuition">
<div class="env-title">Which way to adjust?</div>
<div class="env-body">
<p>Beats tell you the frequencies are different, but not which is higher. A common trick: make a small adjustment in one direction and listen. If the beats speed up, you went the wrong way (the frequencies moved further apart). If the beats slow down, continue in that direction until they vanish.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Tuning a piano</div>
<div class="env-body">
<p>A piano tuner strikes a tuning fork (A4 = 440 Hz) and the piano's A key simultaneously. She hears 3 beats per second. She tightens the string slightly and the beats slow to 1 per second. She tightens a tiny bit more, and the beats vanish. The string is now at 440 Hz.</p>
<p>Had she heard the beats speed up after tightening (say, to 5 beats/s), she would know the string was originally above 440 Hz and she should loosen instead.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Beats in orchestral tuning</div>
<div class="env-body">
<p>Before a concert, the oboe plays A4 and every instrument tunes to it. String players adjust their A string until beats with the oboe vanish, then tune their other strings in perfect fifths (which also involves listening for beats between harmonics). The entire process is an exercise in acoustic interference.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A violinist tunes her A string against a 440 Hz fork and hears 4 beats per second. She tightens the string and the beat rate drops to 2 per second. (a) Was her string initially sharp or flat? (b) What was its original frequency?',
                        hint: 'Tightening a string increases its frequency. If the beats are slowing, the frequencies are getting closer.',
                        solution: '(a) The string was flat (below 440 Hz). Tightening raised its frequency toward 440 Hz, making the beat rate decrease. (b) Original frequency: \\(440 - 4 = 436\\,\\text{Hz}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 3: Acoustic Interference in Space
            // ============================================================
            {
                id: 'acoustic-interference-space',
                title: 'Acoustic Interference in Space',
                content: `
<h2>Same Frequency, Different Paths</h2>

<p>Beats arise from two sources with <em>different</em> frequencies at the <em>same</em> location. But interference also occurs when two sources of the <em>same</em> frequency reach a listener via <em>different</em> paths. The path-length difference determines whether the waves add or cancel.</p>

<div class="env-block theorem">
<div class="env-title">Condition for constructive and destructive interference</div>
<div class="env-body">
<p>Two coherent sources of wavelength \\(\\lambda\\) reach a point P. Let \\(\\Delta r = |r_1 - r_2|\\) be the path-length difference.</p>
<ul>
<li><strong>Constructive</strong> (loud): \\(\\Delta r = n\\lambda\\) where \\(n = 0, 1, 2, \\ldots\\)</li>
<li><strong>Destructive</strong> (silent): \\(\\Delta r = (n + \\tfrac{1}{2})\\lambda\\) where \\(n = 0, 1, 2, \\ldots\\)</li>
</ul>
</div>
</div>

<p>This is exactly the same physics as in Young's double-slit experiment for light, applied to sound. The difference is that sound wavelengths are much larger (centimetres to metres), so the interference pattern has a correspondingly large spatial scale.</p>

<div class="env-block example">
<div class="env-title">Example: Two speakers</div>
<div class="env-body">
<p>Two speakers, separated by 2 m, emit the same 343 Hz tone in phase. A listener stands 4 m from speaker A and 4.5 m from speaker B. The path difference is \\(\\Delta r = 0.5\\,\\text{m}\\). The wavelength is \\(\\lambda = 343/343 = 1.0\\,\\text{m}\\). Since \\(0.5 = \\frac{1}{2}\\lambda\\), this is <strong>destructive interference</strong>: the listener hears near-silence at this frequency.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why concert halls have complex geometries</div>
<div class="env-body">
<p>If sound from the stage reflects off walls and ceiling, the reflected waves interfere with the direct sound. Concert hall designers must ensure that destructive interference does not create "dead spots" where the audience hears near-silence. Diffusing surfaces, angled panels, and careful geometry are used to scatter reflections and distribute sound evenly.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-spatial-interference"></div>
`,
                visualizations: [
                    {
                        id: 'viz-spatial-interference',
                        title: 'Spatial Acoustic Interference',
                        description: 'Two speakers (gold dots) emit sound waves at the same frequency. The colour map shows constructive (bright) and destructive (dark) interference across the room. Move the frequency slider to see the pattern change scale.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var freq = 343;
                            var separation = 2.0;
                            var v = 343;
                            var t = 0;
                            var showWaves = true;

                            VizEngine.createSlider(controls, 'Frequency (Hz)', 100, 1000, freq, 10, function (val) { freq = val; });
                            VizEngine.createSlider(controls, 'Speaker sep. (m)', 0.5, 5.0, separation, 0.1, function (val) { separation = val; });
                            VizEngine.createButton(controls, 'Toggle animation', function () { showWaves = !showWaves; });

                            // Map: screen coords to "room" coords (metres)
                            var roomW = 10; // 10m wide
                            var roomH = 8;  // 8m tall
                            var pxPerM_x = w / roomW;
                            var pxPerM_y = h / roomH;
                            var pixelStep = 4;

                            // Precompute image data
                            var imgData = ctx.createImageData(w, h);

                            function draw() {
                                t += 1 / 60;
                                viz.clear();

                                var lambda = v / freq;
                                var k = 2 * Math.PI / lambda;
                                var omega = 2 * Math.PI * freq;

                                var s1x = roomW / 2 - separation / 2;
                                var s1y = 0.5;
                                var s2x = roomW / 2 + separation / 2;
                                var s2y = 0.5;

                                // Render interference pattern
                                var data = imgData.data;
                                var phase = showWaves ? omega * t * 0.002 : 0;

                                for (var py = 0; py < h; py += pixelStep) {
                                    var roomY = py / pxPerM_y;
                                    for (var px = 0; px < w; px += pixelStep) {
                                        var roomX = px / pxPerM_x;

                                        var dx1 = roomX - s1x;
                                        var dy1 = roomY - s1y;
                                        var r1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
                                        var dx2 = roomX - s2x;
                                        var dy2 = roomY - s2y;
                                        var r2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                                        if (r1 < 0.1) r1 = 0.1;
                                        if (r2 < 0.1) r2 = 0.1;

                                        // Combined amplitude (time-averaged or animated)
                                        var val;
                                        if (showWaves) {
                                            var wave1 = Math.sin(k * r1 - phase) / Math.sqrt(r1);
                                            var wave2 = Math.sin(k * r2 - phase) / Math.sqrt(r2);
                                            val = (wave1 + wave2) * 0.5;
                                        } else {
                                            // Time-averaged intensity pattern
                                            var pathDiff = Math.abs(r1 - r2);
                                            val = Math.cos(Math.PI * pathDiff / lambda);
                                        }

                                        // Map val to color
                                        var intensity = val * val; // 0 to ~1
                                        intensity = Math.min(1, intensity);

                                        var cr, cg, cb;
                                        if (showWaves) {
                                            if (val > 0) {
                                                cr = Math.floor(30 + 200 * intensity);
                                                cg = Math.floor(100 + 155 * intensity);
                                                cb = Math.floor(180 + 75 * intensity);
                                            } else {
                                                cr = Math.floor(180 * intensity + 20);
                                                cg = Math.floor(60 * intensity + 15);
                                                cb = Math.floor(30 * intensity + 15);
                                            }
                                        } else {
                                            cr = Math.floor(20 + 220 * intensity);
                                            cg = Math.floor(150 * intensity);
                                            cb = Math.floor(255 * (1 - intensity) * 0.3 + 20);
                                        }

                                        // Fill pixel block
                                        for (var dy = 0; dy < pixelStep && py + dy < h; dy++) {
                                            for (var dx = 0; dx < pixelStep && px + dx < w; dx++) {
                                                var idx = ((py + dy) * w + (px + dx)) * 4;
                                                data[idx] = cr;
                                                data[idx + 1] = cg;
                                                data[idx + 2] = cb;
                                                data[idx + 3] = 255;
                                            }
                                        }
                                    }
                                }
                                ctx.putImageData(imgData, 0, 0);

                                // Draw speakers
                                var sp1px = s1x * pxPerM_x;
                                var sp1py = s1y * pxPerM_y;
                                var sp2px = s2x * pxPerM_x;
                                var sp2py = s2y * pxPerM_y;

                                ctx.save();
                                ctx.shadowColor = viz.colors.gold;
                                ctx.shadowBlur = 15;
                                ctx.fillStyle = viz.colors.gold;
                                ctx.beginPath(); ctx.arc(sp1px, sp1py, 6, 0, Math.PI * 2); ctx.fill();
                                ctx.beginPath(); ctx.arc(sp2px, sp2py, 6, 0, Math.PI * 2); ctx.fill();
                                ctx.restore();

                                viz.screenText('S\u2081', sp1px - 12, sp1py + 2, viz.colors.white, 11, 'right', 'middle');
                                viz.screenText('S\u2082', sp2px + 12, sp2py + 2, viz.colors.white, 11, 'left', 'middle');

                                // Info
                                viz.screenText('\u03BB = ' + lambda.toFixed(2) + ' m', w - 10, h - 15, viz.colors.white, 11, 'right', 'bottom');
                                viz.screenText('f = ' + freq + ' Hz', w - 10, h - 30, viz.colors.text, 10, 'right', 'bottom');

                                // Legend
                                ctx.fillStyle = 'rgba(12,12,32,0.7)';
                                ctx.fillRect(5, h - 40, 140, 35);
                                viz.screenText('Bright = constructive', 75, h - 27, viz.colors.cyan, 10, 'center', 'middle');
                                viz.screenText('Dark = destructive', 75, h - 13, viz.colors.text, 10, 'center', 'middle');
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Two speakers emit a 686 Hz tone in phase. A listener is 3.0 m from one speaker and 3.5 m from the other. Is the interference constructive or destructive? (Speed of sound = 343 m/s.)',
                        hint: 'Find the wavelength, then compare the path difference to it.',
                        solution: '\\(\\lambda = 343/686 = 0.50\\,\\text{m}\\). Path difference = 0.5 m = \\(1\\lambda\\). Since this is a whole number of wavelengths, the interference is <strong>constructive</strong>.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Applications
            // ============================================================
            {
                id: 'applications',
                title: 'Applications',
                content: `
<h2>Beats and Interference at Work</h2>

<p>The physics of beats and acoustic interference underpins many practical technologies and everyday phenomena.</p>

<h3>Noise-cancelling headphones</h3>

<p>Active noise cancellation works by recording ambient sound with an external microphone, inverting the waveform (shifting it by 180 degrees), and playing it back through the headphone speaker. The original noise and the inverted copy interfere destructively, cancelling each other. This is most effective for low-frequency, steady sounds (airplane cabin noise, train rumble) where the waveform is predictable.</p>

<div class="env-block intuition">
<div class="env-title">Why noise cancellation struggles with high frequencies</div>
<div class="env-body">
<p>High-frequency sounds have short wavelengths and change rapidly. The electronics must process and invert the sound within a fraction of a millisecond, and even a tiny time delay (or path-length mismatch) means the inverted wave is no longer perfectly anti-phase. Low frequencies, with their long wavelengths, are far more forgiving of small timing errors.</p>
</div>
</div>

<h3>Doppler beat detection</h3>

<p>Ultrasound Doppler devices (used in medical blood-flow measurement and speed guns) emit a known frequency and listen for the reflection. The reflected wave is Doppler-shifted by a small amount, and the device measures the beat frequency between the emitted and returned signals to determine the velocity of the reflecting object.</p>

<h3>Musical consonance and dissonance</h3>

<p>Two notes played together sound "rough" (dissonant) when their frequencies produce beats in the range of about 10-30 Hz, because the ear perceives rapid amplitude fluctuations as unpleasant roughness. Musical intervals that are considered consonant (octave, fifth, fourth) have frequency ratios of small integers (2:1, 3:2, 4:3), and their upper harmonics either coincide exactly or differ by large enough amounts that beats are absent or too fast to perceive.</p>

<div class="env-block example">
<div class="env-title">Example: Why a perfect fifth sounds clean</div>
<div class="env-body">
<p>A4 = 440 Hz and E5 = 660 Hz form a perfect fifth (ratio 3:2). The second harmonic of A (880 Hz) and the third harmonic of E (also close to 880 Hz in just intonation) line up exactly, producing no beats. The fundamentals differ by 220 Hz, far too much for audible beat roughness. The result: a smooth, stable sound.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Acoustic interference in room acoustics</div>
<div class="env-body">
<p>Standing waves in rooms create <strong>room modes</strong>: at certain frequencies, constructive interference produces loud spots and destructive interference produces quiet spots. Bass frequencies are the worst offenders because their wavelengths are comparable to room dimensions. This is why bass response varies dramatically across a room, and why studio monitors are placed carefully relative to walls.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A noise-cancelling headphone microphone detects a 200 Hz hum. The speaker produces the inverted waveform, but with a 0.5 ms delay. What is the phase error, and is the cancellation still effective?',
                        hint: 'Find the fraction of a period that 0.5 ms represents for a 200 Hz wave, then convert to degrees.',
                        solution: 'Period = 1/200 = 5 ms. The delay is 0.5/5 = 0.1 of a period = 36 degrees. The anti-phase wave should be at 180 degrees; the actual phase is 180 + 36 = 216 degrees. The cancellation is not perfect, but \\(\\cos(36°) \\approx 0.81\\), so about 81% of the amplitude is still cancelled. Reasonably effective.'
                    },
                    {
                        question: 'A rectangular room is 5 m long. What is the lowest frequency that creates a standing wave along this dimension? (Speed of sound = 343 m/s.)',
                        hint: 'The lowest mode has a wavelength equal to twice the room length.',
                        solution: 'For the fundamental room mode, \\(\\lambda = 2L = 10\\,\\text{m}\\). So \\(f = v/\\lambda = 343/10 = 34.3\\,\\text{Hz}\\). This is a deep bass note just above the threshold of hearing.'
                    }
                ]
            }
        ]
    });
})();
