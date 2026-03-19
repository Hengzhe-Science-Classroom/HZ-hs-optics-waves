// === Chapter 4: The Doppler Effect ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch04',
        number: 4,
        title: 'The Doppler Effect',
        subtitle: 'Why the pitch changes as an ambulance passes',
        file: 'ch04-doppler',

        sections: [
            // ============================================================
            // Section 0: Moving Source
            // ============================================================
            {
                id: 'moving-source',
                title: 'Moving Source',
                content: `
<h2>Compressed in Front, Stretched Behind</h2>

<p>You have heard it many times: an ambulance siren sounds higher-pitched as it approaches and lower-pitched as it recedes. This is the <strong>Doppler effect</strong>, named after Christian Doppler (1842).</p>

<div class="env-block definition">
<div class="env-title">Definition: Doppler Effect</div>
<div class="env-body">
<p>The <strong>Doppler effect</strong> is the change in the observed frequency (or wavelength) of a wave when there is relative motion between the source and the observer.</p>
</div>
</div>

<p>When the source moves toward the observer, each successive wavefront is emitted from a position closer to the observer. The wavefronts "pile up" in front of the source, reducing the effective wavelength. Since \\(v = f\\lambda\\), a shorter wavelength means a higher observed frequency.</p>

<div class="env-block theorem">
<div class="env-title">Doppler Formula: Moving Source</div>
<div class="env-body">
<p>For a source moving at speed \\(v_s\\) toward a stationary observer in a medium where the wave speed is \\(v\\):</p>
\\[f_{\\text{obs}} = f_0 \\cdot \\frac{v}{v - v_s} \\quad \\text{(source approaching)}\\]
\\[f_{\\text{obs}} = f_0 \\cdot \\frac{v}{v + v_s} \\quad \\text{(source receding)}\\]
<p>where \\(f_0\\) is the frequency emitted by the source.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Ambulance Siren</div>
<div class="env-body">
<p>An ambulance siren emits at \\(f_0 = 700\\,\\text{Hz}\\). The ambulance moves at 30 m/s toward you. Speed of sound = 343 m/s.</p>
\\[f_{\\text{obs}} = 700 \\times \\frac{343}{343 - 30} = 700 \\times \\frac{343}{313} = 767\\,\\text{Hz}\\]
<p>You hear a pitch about 10% higher. After it passes and moves away at 30 m/s:</p>
\\[f_{\\text{obs}} = 700 \\times \\frac{343}{343 + 30} = 700 \\times \\frac{343}{373} = 644\\,\\text{Hz}\\]
<p>The pitch drops to about 8% below the original. The sudden shift from 767 Hz to 644 Hz as the ambulance passes is what makes the Doppler effect so dramatic.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-doppler-source"></div>
`,
                visualizations: [
                    {
                        id: 'viz-doppler-source',
                        title: 'Moving Source: Wavefront Compression',
                        description: 'A source (gold dot) moves to the right, emitting circular wavefronts. Wavefronts are <strong>compressed</strong> ahead (higher frequency, blue-shifted) and <strong>stretched</strong> behind (lower frequency, red-shifted). Adjust the source speed to see the effect intensify.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var sourceSpeed = 80;
                            var waveSpeed = 200;
                            var emitInterval = 0.12;
                            var t0 = performance.now();
                            var wavefronts = [];
                            var lastEmit = 0;

                            VizEngine.createSlider(controls, 'Source speed', 0, 190, sourceSpeed, 5, function (v) {
                                sourceSpeed = v;
                                wavefronts = [];
                                t0 = performance.now();
                                lastEmit = 0;
                            });

                            VizEngine.createButton(controls, 'Restart', function () {
                                wavefronts = [];
                                t0 = performance.now();
                                lastEmit = 0;
                            });

                            function draw(now) {
                                var t = (now - t0) / 1000;
                                viz.clear();

                                // Source position (wraps)
                                var totalWidth = w + 200;
                                var sx = ((sourceSpeed * t) % totalWidth) - 100;
                                var sy = h / 2;

                                // Emit wavefronts
                                if (t - lastEmit > emitInterval) {
                                    wavefronts.push({ x: sx, y: sy, t: t });
                                    lastEmit = t;
                                    // Remove old wavefronts
                                    while (wavefronts.length > 0 && (t - wavefronts[0].t) > 3) {
                                        wavefronts.shift();
                                    }
                                }

                                // Draw wavefronts
                                for (var i = 0; i < wavefronts.length; i++) {
                                    var wf = wavefronts[i];
                                    var age = t - wf.t;
                                    var radius = waveSpeed * age;
                                    var alpha = Math.max(0, 1 - age / 2.5);

                                    // Color based on direction from source
                                    // Full circle with direction-dependent color
                                    var steps = 120;
                                    for (var s = 0; s < steps; s++) {
                                        var a1 = (s / steps) * 2 * Math.PI;
                                        var a2 = ((s + 1) / steps) * 2 * Math.PI;

                                        // Direction from wavefront center to this arc segment
                                        var dx = Math.cos((a1 + a2) / 2);
                                        // dx > 0 means ahead (blue-shifted), dx < 0 means behind (red-shifted)
                                        var mach = sourceSpeed / waveSpeed;
                                        var shift = dx * mach;
                                        var hue;
                                        if (shift > 0) {
                                            hue = 200 + shift * 40; // toward blue
                                        } else {
                                            hue = 200 + shift * 200; // toward red
                                        }

                                        ctx.strokeStyle = VizEngine.hsl(hue, 80, 55 + alpha * 15);
                                        ctx.globalAlpha = alpha * 0.7;
                                        ctx.lineWidth = 1.5;
                                        ctx.beginPath();
                                        ctx.arc(wf.x, wf.y, radius, a1, a2);
                                        ctx.stroke();
                                    }
                                }
                                ctx.globalAlpha = 1;

                                // Source glow and ball
                                ctx.save();
                                ctx.shadowColor = viz.colors.gold;
                                ctx.shadowBlur = 20;
                                ctx.fillStyle = viz.colors.gold;
                                ctx.beginPath(); ctx.arc(sx, sy, 8, 0, Math.PI * 2); ctx.fill();
                                ctx.restore();
                                ctx.fillStyle = viz.colors.white;
                                ctx.beginPath(); ctx.arc(sx, sy, 4, 0, Math.PI * 2); ctx.fill();

                                // Velocity arrow
                                if (sourceSpeed > 5) {
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.lineWidth = 2;
                                    var arrowLen = 40;
                                    ctx.beginPath(); ctx.moveTo(sx + 14, sy); ctx.lineTo(sx + 14 + arrowLen, sy); ctx.stroke();
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.beginPath();
                                    ctx.moveTo(sx + 14 + arrowLen + 6, sy);
                                    ctx.lineTo(sx + 14 + arrowLen - 4, sy - 5);
                                    ctx.lineTo(sx + 14 + arrowLen - 4, sy + 5);
                                    ctx.fill();
                                    viz.screenText('v_s', sx + 14 + arrowLen / 2, sy - 14, viz.colors.orange, 11);
                                }

                                // Labels
                                var mach2 = sourceSpeed / waveSpeed;
                                viz.screenText('Source speed: ' + sourceSpeed.toFixed(0) + ' px/s', w / 2, 20, viz.colors.white, 13);
                                viz.screenText('Mach ' + mach2.toFixed(2), w / 2, 38, sourceSpeed >= waveSpeed ? viz.colors.red : viz.colors.text, 12);

                                // Blue/red shift labels
                                viz.screenText('Compressed (higher f)', w - 90, h - 30, viz.colors.cyan, 11);
                                viz.screenText('\u2190 Blue shift', w - 90, h - 14, viz.colors.cyan, 10);
                                viz.screenText('Stretched (lower f)', 90, h - 30, viz.colors.red, 11);
                                viz.screenText('Red shift \u2192', 90, h - 14, viz.colors.red, 10);

                                if (sourceSpeed >= waveSpeed) {
                                    viz.screenText('SUPERSONIC! Shock wave / sonic boom', w / 2, h / 2 - 60, viz.colors.red, 14);
                                }
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A car horn emits at 500 Hz. The car approaches at 25 m/s. What frequency does a stationary observer hear? (\\(v = 343\\,\\text{m/s}\\))',
                        hint: 'Source approaching: \\(f_{\\text{obs}} = f_0 \\cdot v/(v - v_s)\\).',
                        solution: '\\(f_{\\text{obs}} = 500 \\times 343/(343 - 25) = 500 \\times 343/318 = 539\\,\\text{Hz}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 1: Moving Observer
            // ============================================================
            {
                id: 'moving-observer',
                title: 'Moving Observer',
                content: `
<h2>Running Into the Waves</h2>

<p>The Doppler effect also occurs when the observer moves toward or away from a stationary source. If you run toward the source, you encounter wavefronts more frequently (higher perceived frequency). If you run away, wavefronts arrive less frequently (lower perceived frequency).</p>

<div class="env-block theorem">
<div class="env-title">Doppler Formula: Moving Observer</div>
<div class="env-body">
<p>For a stationary source and an observer moving at speed \\(v_o\\):</p>
\\[f_{\\text{obs}} = f_0 \\cdot \\frac{v + v_o}{v} \\quad \\text{(observer approaching source)}\\]
\\[f_{\\text{obs}} = f_0 \\cdot \\frac{v - v_o}{v} \\quad \\text{(observer receding from source)}\\]
</div>
</div>

<div class="env-block remark">
<div class="env-title">Moving source vs moving observer</div>
<div class="env-body">
<p>For a source moving toward you at speed \\(v_s\\), the formula involves \\(v/(v-v_s)\\). For you moving toward a stationary source at speed \\(v_o = v_s\\), the formula gives \\((v+v_o)/v\\). These are <em>not</em> the same number (except when the speeds are small compared to \\(v\\)). The difference matters because for sound, there is a preferred reference frame: the air. Who is moving relative to the air changes the physics. For light, there is no preferred frame, and the situation is symmetric (see Section 3).</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Running Toward a Bell</div>
<div class="env-body">
<p>A bell rings at 400 Hz. You run toward it at 10 m/s. (\\(v = 343\\,\\text{m/s}\\).)</p>
\\[f_{\\text{obs}} = 400 \\times \\frac{343 + 10}{343} = 400 \\times \\frac{353}{343} = 411.7\\,\\text{Hz}\\]
<p>Contrast: if the bell moved toward you at 10 m/s with you stationary:</p>
\\[f_{\\text{obs}} = 400 \\times \\frac{343}{343 - 10} = 400 \\times \\frac{343}{333} = 412.0\\,\\text{Hz}\\]
<p>The results are very close but not identical. The difference is 0.3 Hz, negligible here but significant at high speeds.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A stationary siren emits at 600 Hz. A car drives away from it at 20 m/s. What frequency does the driver hear? (\\(v = 343\\,\\text{m/s}\\))',
                        hint: 'Observer receding: \\(f_{\\text{obs}} = f_0(v - v_o)/v\\).',
                        solution: '\\(f_{\\text{obs}} = 600 \\times (343 - 20)/343 = 600 \\times 323/343 = 565\\,\\text{Hz}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 2: Both Moving
            // ============================================================
            {
                id: 'both-moving',
                title: 'Both Moving',
                content: `
<h2>The General Doppler Formula</h2>

<p>When both source and observer are moving (along the line connecting them), the two effects combine into a single formula:</p>

<div class="env-block theorem">
<div class="env-title">General Doppler Formula (Sound)</div>
<div class="env-body">
\\[f_{\\text{obs}} = f_0 \\cdot \\frac{v + v_o}{v - v_s}\\]
<p>Sign convention: speeds are positive when the motion is <em>toward</em> the other party (source toward observer, observer toward source). Speeds are negative when moving <em>away</em>.</p>
</div>
</div>

<p>This formula is sometimes written with \\(\\pm\\) signs as \\(f_{\\text{obs}} = f_0(v \\pm v_o)/(v \\mp v_s)\\), where the upper signs apply when the motion is toward. The sign convention above is cleaner if you remember: positive = approaching.</p>

<div class="env-block example">
<div class="env-title">Example: Police Car and Fleeing Suspect</div>
<div class="env-body">
<p>A police car (source, \\(f_0 = 800\\,\\text{Hz}\\)) chases a suspect's car. The police car moves at 40 m/s; the suspect moves at 30 m/s, both in the same direction. (\\(v = 343\\,\\text{m/s}\\).)</p>
<p>The source approaches the observer, so \\(v_s = +40\\). The observer moves away from the source, so \\(v_o = -30\\).</p>
\\[f_{\\text{obs}} = 800 \\times \\frac{343 + (-30)}{343 - 40} = 800 \\times \\frac{313}{303} = 826\\,\\text{Hz}\\]
<p>The suspect hears a slightly higher pitch because the police car is closing the gap.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">The source cannot exceed the wave speed (well, it can, but...)</div>
<div class="env-body">
<p>If \\(v_s \\ge v\\), the denominator becomes zero or negative. Physically, the source outruns its own waves. The wavefronts pile up into a <strong>shock wave</strong> (a sonic boom for sound, a bow wave for boats). The Doppler formula breaks down; the physics changes qualitatively.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Two cars approach each other. Car A emits a horn at 500 Hz and moves at 25 m/s. Car B moves at 15 m/s toward Car A. What frequency does Car B hear? (\\(v = 343\\,\\text{m/s}\\))',
                        hint: 'Both motions are "toward": \\(v_s = 25\\), \\(v_o = 15\\). Use \\(f = f_0(v+v_o)/(v-v_s)\\).',
                        solution: '\\(f_{\\text{obs}} = 500 \\times (343+15)/(343-25) = 500 \\times 358/318 = 563\\,\\text{Hz}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 3: Doppler for Light
            // ============================================================
            {
                id: 'doppler-light',
                title: 'Doppler for Light',
                content: `
<h2>Redshift and Blueshift</h2>

<p>Light is a wave too, and exhibits the Doppler effect. But light needs no medium, and special relativity says the laws of physics are the same in every inertial frame. So the distinction between "moving source" and "moving observer" disappears. Only the <em>relative</em> velocity matters.</p>

<div class="env-block theorem">
<div class="env-title">Relativistic Doppler Effect</div>
<div class="env-body">
<p>For a source moving at velocity \\(v_s\\) relative to the observer (positive = receding):</p>
\\[f_{\\text{obs}} = f_0 \\sqrt{\\frac{1 - v_s/c}{1 + v_s/c}}\\]
<p>where \\(c\\) is the speed of light.</p>
</div>
</div>

<p>When the source approaches (\\(v_s < 0\\)), \\(f_{\\text{obs}} > f_0\\): higher frequency, shorter wavelength. For visible light, this shifts the color toward <strong>blue</strong>, called a <strong>blueshift</strong>. When the source recedes (\\(v_s > 0\\)), \\(f_{\\text{obs}} < f_0\\): lower frequency, longer wavelength, shifted toward <strong>red</strong>, called a <strong>redshift</strong>.</p>

<div class="env-block example">
<div class="env-title">Example: Expanding Universe</div>
<div class="env-body">
<p>Edwin Hubble observed that light from distant galaxies is systematically redshifted. The farther the galaxy, the larger the redshift. This means distant galaxies are moving away from us, and the universe is expanding. The Doppler redshift of galaxies is one of the most important observations in all of science.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-doppler-light"></div>
`,
                visualizations: [
                    {
                        id: 'viz-doppler-light',
                        title: 'Redshift / Blueshift: Color Visualization',
                        description: 'A light source emits a specific color (wavelength). As you adjust its velocity, watch the <strong>observed color shift</strong>: approaching = blueshift, receding = redshift. The spectrum bar shows where the emitted and observed wavelengths fall.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var emitLambda = 550; // nm (green-ish)
                            var velocity = 0; // fraction of c, positive = receding

                            VizEngine.createSlider(controls, 'Emitted \u03bb (nm)', 380, 700, emitLambda, 5, function (v) { emitLambda = v; });
                            VizEngine.createSlider(controls, 'v / c', -0.8, 0.8, 0, 0.01, function (v) { velocity = v; });

                            function wavelengthToRGB(lambda) {
                                // Attempt to convert visible wavelength to RGB
                                var r = 0, g = 0, b = 0;
                                if (lambda < 380 || lambda > 780) {
                                    // UV or IR: show as dim purple or dim red
                                    if (lambda < 380) return { r: 80, g: 0, b: 120 };
                                    return { r: 80, g: 0, b: 0 };
                                }
                                if (lambda >= 380 && lambda < 440) {
                                    r = -(lambda - 440) / (440 - 380);
                                    g = 0; b = 1;
                                } else if (lambda >= 440 && lambda < 490) {
                                    r = 0; g = (lambda - 440) / (490 - 440); b = 1;
                                } else if (lambda >= 490 && lambda < 510) {
                                    r = 0; g = 1; b = -(lambda - 510) / (510 - 490);
                                } else if (lambda >= 510 && lambda < 580) {
                                    r = (lambda - 510) / (580 - 510); g = 1; b = 0;
                                } else if (lambda >= 580 && lambda < 645) {
                                    r = 1; g = -(lambda - 645) / (645 - 580); b = 0;
                                } else {
                                    r = 1; g = 0; b = 0;
                                }
                                // Intensity edges
                                var factor;
                                if (lambda >= 380 && lambda < 420) factor = 0.3 + 0.7 * (lambda - 380) / (420 - 380);
                                else if (lambda >= 645 && lambda <= 780) factor = 0.3 + 0.7 * (780 - lambda) / (780 - 645);
                                else factor = 1.0;
                                return {
                                    r: Math.round(255 * Math.pow(r * factor, 0.8)),
                                    g: Math.round(255 * Math.pow(g * factor, 0.8)),
                                    b: Math.round(255 * Math.pow(b * factor, 0.8))
                                };
                            }

                            function rgbStr(c) { return 'rgb(' + c.r + ',' + c.g + ',' + c.b + ')'; }

                            function draw() {
                                viz.clear();

                                // Relativistic Doppler
                                var beta = velocity;
                                var dopplerFactor = Math.sqrt((1 - beta) / (1 + beta));
                                // f_obs = f_0 * factor, so lambda_obs = lambda_0 / factor
                                var obsLambda = emitLambda / dopplerFactor;

                                var emitColor = wavelengthToRGB(emitLambda);
                                var obsColor = wavelengthToRGB(obsLambda);

                                // Draw source and observer
                                var srcX = w * 0.3;
                                var obsX = w * 0.7;
                                var midY = h * 0.35;

                                // Source glow
                                var grad = ctx.createRadialGradient(srcX, midY, 5, srcX, midY, 60);
                                grad.addColorStop(0, rgbStr(emitColor));
                                grad.addColorStop(1, 'rgba(0,0,0,0)');
                                ctx.fillStyle = grad;
                                ctx.beginPath(); ctx.arc(srcX, midY, 60, 0, Math.PI * 2); ctx.fill();

                                // Source dot
                                ctx.fillStyle = rgbStr(emitColor);
                                ctx.beginPath(); ctx.arc(srcX, midY, 12, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = 'rgba(255,255,255,0.3)';
                                ctx.beginPath(); ctx.arc(srcX - 3, midY - 3, 4, 0, Math.PI * 2); ctx.fill();

                                viz.screenText('Source', srcX, midY + 30, viz.colors.text, 11);
                                viz.screenText('\u03bb\u2080 = ' + emitLambda.toFixed(0) + ' nm', srcX, midY + 46, rgbStr(emitColor), 12);

                                // Observer glow (observed color)
                                var grad2 = ctx.createRadialGradient(obsX, midY, 5, obsX, midY, 60);
                                grad2.addColorStop(0, rgbStr(obsColor));
                                grad2.addColorStop(1, 'rgba(0,0,0,0)');
                                ctx.fillStyle = grad2;
                                ctx.beginPath(); ctx.arc(obsX, midY, 60, 0, Math.PI * 2); ctx.fill();

                                // Observer
                                ctx.fillStyle = rgbStr(obsColor);
                                ctx.beginPath(); ctx.arc(obsX, midY, 12, 0, Math.PI * 2); ctx.fill();
                                ctx.fillStyle = 'rgba(255,255,255,0.3)';
                                ctx.beginPath(); ctx.arc(obsX - 3, midY - 3, 4, 0, Math.PI * 2); ctx.fill();

                                viz.screenText('Observer', obsX, midY + 30, viz.colors.text, 11);
                                viz.screenText('\u03bb = ' + obsLambda.toFixed(0) + ' nm', obsX, midY + 46, rgbStr(obsColor), 12);

                                // Velocity arrow
                                if (Math.abs(velocity) > 0.01) {
                                    var arrowDir = velocity > 0 ? 1 : -1;
                                    var ax = srcX + arrowDir * 25;
                                    var aLen = Math.abs(velocity) * 60;
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath(); ctx.moveTo(ax, midY - 25); ctx.lineTo(ax + arrowDir * aLen, midY - 25); ctx.stroke();
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.beginPath();
                                    ctx.moveTo(ax + arrowDir * (aLen + 6), midY - 25);
                                    ctx.lineTo(ax + arrowDir * aLen, midY - 30);
                                    ctx.lineTo(ax + arrowDir * aLen, midY - 20);
                                    ctx.fill();
                                    viz.screenText('v = ' + (Math.abs(velocity) * 100).toFixed(0) + '% c', (srcX + obsX) / 2, midY - 35, viz.colors.orange, 11);
                                }

                                // Shift label
                                var shiftText = '';
                                if (velocity > 0.02) shiftText = 'REDSHIFT (receding)';
                                else if (velocity < -0.02) shiftText = 'BLUESHIFT (approaching)';
                                else shiftText = 'No shift';
                                var shiftColor = velocity > 0.02 ? viz.colors.red : (velocity < -0.02 ? viz.colors.cyan : viz.colors.text);
                                viz.screenText(shiftText, w / 2, 18, shiftColor, 14);

                                // === Spectrum bar ===
                                var barLeft = 40;
                                var barRight = w - 40;
                                var barTop = h * 0.65;
                                var barH = 30;

                                // Draw visible spectrum
                                for (var px = barLeft; px < barRight; px++) {
                                    var lam = 380 + (px - barLeft) / (barRight - barLeft) * (700 - 380);
                                    var c = wavelengthToRGB(lam);
                                    ctx.fillStyle = rgbStr(c);
                                    ctx.fillRect(px, barTop, 1, barH);
                                }

                                // Border
                                ctx.strokeStyle = viz.colors.text;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(barLeft, barTop, barRight - barLeft, barH);

                                // Mark emitted wavelength
                                var emitPx = barLeft + (emitLambda - 380) / (700 - 380) * (barRight - barLeft);
                                emitPx = VizEngine.clamp(emitPx, barLeft, barRight);
                                ctx.strokeStyle = viz.colors.white;
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(emitPx, barTop - 8); ctx.lineTo(emitPx, barTop + barH + 8); ctx.stroke();
                                viz.screenText('emitted', emitPx, barTop - 14, viz.colors.white, 10);

                                // Mark observed wavelength
                                var obsPx = barLeft + (obsLambda - 380) / (700 - 380) * (barRight - barLeft);
                                obsPx = VizEngine.clamp(obsPx, barLeft - 20, barRight + 20);
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 2;
                                ctx.setLineDash([4, 3]);
                                ctx.beginPath(); ctx.moveTo(obsPx, barTop - 5); ctx.lineTo(obsPx, barTop + barH + 5); ctx.stroke();
                                ctx.setLineDash([]);
                                viz.screenText('observed', obsPx, barTop + barH + 18, viz.colors.yellow, 10);

                                // Wavelength labels
                                viz.screenText('380 nm', barLeft, barTop + barH + 30, viz.colors.text, 9, 'center');
                                viz.screenText('700 nm', barRight, barTop + barH + 30, viz.colors.text, 9, 'center');
                                viz.screenText('UV \u2190', barLeft - 15, barTop + barH / 2, viz.colors.purple, 9, 'right');
                                viz.screenText('\u2192 IR', barRight + 15, barTop + barH / 2, viz.colors.red, 9, 'left');
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A star emits light at 500 nm and is receding at 0.1c. What wavelength does the observer measure?',
                        hint: 'Use the relativistic Doppler: \\(\\lambda_{\\text{obs}} = \\lambda_0 / \\sqrt{(1-\\beta)/(1+\\beta)}\\) with \\(\\beta = +0.1\\).',
                        solution: '\\(\\lambda_{\\text{obs}} = 500/\\sqrt{(1-0.1)/(1+0.1)} = 500/\\sqrt{0.9/1.1} = 500/\\sqrt{0.818} = 500/0.905 \\approx 553\\,\\text{nm}\\). The light is redshifted from green toward yellow.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Applications
            // ============================================================
            {
                id: 'doppler-applications',
                title: 'Applications',
                content: `
<h2>Doppler in the Real World</h2>

<p>The Doppler effect is not just a physics curiosity; it is a workhorse technology used every day:</p>

<h3>Weather Radar</h3>
<p><strong>Doppler radar</strong> emits radio waves that bounce off raindrops. By measuring the frequency shift of the reflected signal, meteorologists determine the velocity of the rain (and the wind carrying it). This is how tornado warnings are issued: the radar sees strong velocity differences across a small area, indicating rotation.</p>

<h3>Medical Ultrasound</h3>
<p>Doppler ultrasound measures the speed of blood flow. A transducer emits high-frequency sound waves that reflect off moving red blood cells. The frequency shift reveals the flow velocity. This is used to detect blood clots, heart valve problems, and fetal heartbeats.</p>

<h3>Speed Enforcement</h3>
<p>Police radar guns emit microwaves toward a vehicle and measure the Doppler shift of the reflected signal. From the frequency shift and the known wave speed (\\(c\\)), the vehicle's speed is calculated instantly.</p>

<h3>Astronomy: Exoplanet Detection</h3>
<p>When a planet orbits a star, the star wobbles slightly. This tiny wobble produces a periodic Doppler shift in the star's light. By measuring the wavelength variation over time, astronomers can detect the planet (even though it is invisible) and determine its mass and orbital period. This "radial velocity method" has discovered hundreds of exoplanets.</p>

<div class="env-block example">
<div class="env-title">Example: Radar Speed Gun</div>
<div class="env-body">
<p>A radar gun emits microwaves at \\(f_0 = 24.0\\,\\text{GHz}\\). A car approaching at 30 m/s reflects the signal. The reflected signal is Doppler-shifted twice (once on the way to the car, once on the way back), so the total frequency shift is:</p>
\\[\\Delta f = \\frac{2v_{\\text{car}}}{c}\\,f_0 = \\frac{2(30)}{3 \\times 10^8} \\times 24 \\times 10^9 = 4800\\,\\text{Hz}\\]
<p>The radar gun measures this 4.8 kHz shift and converts it to a speed reading of 30 m/s (108 km/h).</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Hubble's Law and the age of the universe</div>
<div class="env-body">
<p>By measuring the Doppler redshift of many galaxies and comparing with their distances (estimated from standard candles), Hubble discovered that recession velocity is proportional to distance: \\(v = H_0 d\\). This <strong>Hubble's Law</strong> implies the universe is expanding. Running the expansion backwards gives an estimate of the universe's age: about 13.8 billion years.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A Doppler ultrasound emits at 5 MHz. Blood flows toward the transducer at 0.5 m/s. What is the approximate frequency shift? (Speed of sound in tissue: 1540 m/s.)',
                        hint: 'For a double Doppler shift (emit and reflect): \\(\\Delta f \\approx 2v_{\\text{blood}} f_0/v\\).',
                        solution: '\\(\\Delta f = 2(0.5)(5 \\times 10^6)/1540 \\approx 3247\\,\\text{Hz}\\), or about 3.2 kHz. This is in the audible range, which is why Doppler ultrasound equipment often converts the signal to sound so the technician can hear the blood flow.'
                    },
                    {
                        question: 'Galaxy NGC 1357 has a redshift of \\(z = \\Delta\\lambda/\\lambda_0 = 0.006\\). Estimate its recession velocity.',
                        hint: 'For small velocities (\\(v \\ll c\\)), \\(z \\approx v/c\\).',
                        solution: '\\(v \\approx zc = 0.006 \\times 3 \\times 10^5\\,\\text{km/s} = 1800\\,\\text{km/s}\\).'
                    }
                ]
            }
        ]
    });
})();
