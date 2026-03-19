// === Chapter 16: Diffraction Gratings ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch16',
        number: 16,
        title: 'Diffraction Gratings',
        subtitle: 'Many slits make sharp rainbows and unlock spectroscopy',
        file: 'ch16-grating',

        sections: [
            // ============================================================
            // Section 1: Many Slits
            // ============================================================
            {
                id: 'many-slits',
                title: 'Many Slits',
                content: `
<h2>From Two Slits to a Thousand</h2>

<p>In Chapter 13, we saw that two slits produce a \\(\\cos^2\\) interference pattern. What happens if we add more slits, all equally spaced by distance \\(d\\)? The answer is one of the most powerful ideas in optics.</p>

<div class="env-block definition">
<div class="env-title">Definition: Diffraction grating</div>
<div class="env-body">
<p>A <strong>diffraction grating</strong> is an optical element with a large number \\(N\\) of equally spaced parallel slits (or grooves). Typical gratings have hundreds to thousands of slits per millimetre.</p>
</div>
</div>

<p>With \\(N\\) slits, each slit radiates a Huygens wavelet, and all \\(N\\) wavelets interfere. The condition for constructive interference is the same as for the double slit:</p>

\\[d\\sin\\theta = m\\lambda, \\quad m = 0, \\pm 1, \\pm 2, \\ldots\\]

<p>But the <em>character</em> of the maxima changes dramatically. With two slits, the maxima are broad. With \\(N\\) slits, the maxima become <strong>sharp peaks</strong> (called principal maxima), because the \\(N\\) waves must all be in phase simultaneously, and any slight deviation from the exact angle causes rapid destructive interference.</p>

<div class="env-block intuition">
<div class="env-title">Why more slits = sharper peaks</div>
<div class="env-body">
<p>With 2 slits, two waves must be in phase. This is easy to achieve over a range of angles. With 1000 slits, 1000 waves must be in phase simultaneously. Even a tiny angular deviation puts successive waves slightly out of step, and after many slits, the accumulated phase error causes cancellation. The more slits, the narrower the range of angles over which all waves stay in phase.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-grating-n-slits"></div>
`,
                visualizations: [
                    {
                        id: 'viz-grating-n-slits',
                        title: 'Effect of Number of Slits',
                        description: 'Compare interference patterns for \\(N = 2, 5, 10, 50\\) slits. As \\(N\\) increases, the principal maxima become sharper and brighter. Adjust \\(N\\) and \\(d/\\lambda\\).',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var N = 5;
                            var dOverLam = 4;

                            VizEngine.createSlider(controls, 'N slits', 2, 60, N, 1, function (v) { N = Math.round(v); });
                            VizEngine.createSlider(controls, 'd/\u03BB', 2, 10, dOverLam, 0.5, function (v) { dOverLam = v; });

                            function gratingIntensity(sinTh, N2, dLam) {
                                var phi = Math.PI * dLam * sinTh;
                                var denom = Math.sin(phi);
                                if (Math.abs(denom) < 1e-10) return 1.0;
                                var numer = Math.sin(N2 * phi);
                                var val = numer / (N2 * denom);
                                return val * val;
                            }

                            function draw() {
                                viz.clear();

                                var margin = 50;
                                var gLeft = margin, gRight = w - margin;
                                var gTop = 40, gBot = h * 0.52;
                                var gW = gRight - gLeft, gH = gBot - gTop;

                                var sinMax = VizEngine.clamp(2.5 / dOverLam, 0.05, 1);

                                // Axes
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.moveTo(gLeft, gBot);
                                ctx.lineTo(gRight, gBot);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(gLeft, gBot);
                                ctx.lineTo(gLeft, gTop);
                                ctx.stroke();

                                viz.screenText('sin\u03B8', (gLeft + gRight) / 2, gBot + 16, viz.colors.text, 11);
                                viz.screenText('I/I\u2080', gLeft - 10, gTop - 8, viz.colors.text, 10, 'right');

                                // Order labels
                                for (var mm = -3; mm <= 3; mm++) {
                                    var sinVal = mm / dOverLam;
                                    if (Math.abs(sinVal) > sinMax) continue;
                                    var tx = gLeft + (sinVal + sinMax) / (2 * sinMax) * gW;
                                    ctx.fillStyle = viz.colors.text;
                                    ctx.font = '9px -apple-system,sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'top';
                                    ctx.fillText('m=' + mm, tx, gBot + 3);
                                }

                                // Intensity curve
                                var nSteps = 800;
                                ctx.beginPath();
                                for (var i = 0; i <= nSteps; i++) {
                                    var frac = i / nSteps;
                                    var sinTh = -sinMax + 2 * sinMax * frac;
                                    var intensity = gratingIntensity(sinTh, N, dOverLam);
                                    var px = gLeft + frac * gW;
                                    var py = gBot - intensity * gH;
                                    if (i === 0) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.strokeStyle = viz.colors.cyan;
                                ctx.lineWidth = 2;
                                ctx.shadowColor = viz.colors.cyan;
                                ctx.shadowBlur = 4;
                                ctx.stroke();
                                ctx.shadowBlur = 0;

                                // Fill
                                ctx.beginPath();
                                for (var j = 0; j <= nSteps; j++) {
                                    var frac2 = j / nSteps;
                                    var sinTh2 = -sinMax + 2 * sinMax * frac2;
                                    var int2 = gratingIntensity(sinTh2, N, dOverLam);
                                    var px2 = gLeft + frac2 * gW;
                                    var py2 = gBot - int2 * gH;
                                    if (j === 0) ctx.moveTo(px2, py2);
                                    else ctx.lineTo(px2, py2);
                                }
                                ctx.lineTo(gRight, gBot);
                                ctx.lineTo(gLeft, gBot);
                                ctx.closePath();
                                ctx.fillStyle = viz.colors.cyan + '10';
                                ctx.fill();

                                // Fringe bar
                                var barTop = h * 0.60, barBot = h * 0.78;
                                var barH = barBot - barTop;
                                for (var bi = 0; bi < gW; bi++) {
                                    var bfrac = bi / gW;
                                    var bsinTh = -sinMax + 2 * sinMax * bfrac;
                                    var bint = gratingIntensity(bsinTh, N, dOverLam);
                                    var bright = VizEngine.clamp(Math.pow(bint, 0.5) * 255, 0, 255);
                                    ctx.fillStyle = 'rgb(' + Math.round(bright) + ',' + Math.round(bright * 0.95) + ',' + Math.round(bright * 0.7) + ')';
                                    ctx.fillRect(gLeft + bi, barTop, 1, barH);
                                }
                                ctx.strokeStyle = viz.colors.text + '44';
                                ctx.lineWidth = 1;
                                ctx.strokeRect(gLeft, barTop, gW, barH);

                                viz.screenText('N = ' + N + ' slits, d/\u03BB = ' + dOverLam.toFixed(1), w / 2, 16, viz.colors.white, 13);
                                viz.screenText('Between principal maxima: ' + (N - 2) + ' subsidiary maxima, ' + (N - 1) + ' minima', w / 2, h - 12, viz.colors.text, 10);
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A grating has \\(N = 500\\) slits. How many minima are there between two adjacent principal maxima?',
                        hint: 'Between two principal maxima of an \\(N\\)-slit grating, there are \\(N - 1\\) minima.',
                        solution: 'There are \\(N - 1 = 499\\) minima between adjacent principal maxima. There are also \\(N - 2 = 498\\) subsidiary maxima (very weak peaks between the minima).'
                    }
                ]
            },

            // ============================================================
            // Section 2: Sharp Maxima
            // ============================================================
            {
                id: 'sharp-maxima',
                title: 'Sharp Maxima',
                content: `
<h2>The Intensity Pattern of N Slits</h2>

<p>The intensity pattern of \\(N\\) equally spaced slits is:</p>

<div class="env-block theorem">
<div class="env-title">N-slit intensity</div>
<div class="env-body">
\\[I = I_1 \\left(\\frac{\\sin(N\\phi/2)}{\\sin(\\phi/2)}\\right)^2\\]
<p>where \\(\\phi = (2\\pi/\\lambda)\\,d\\sin\\theta\\) is the phase difference between adjacent slits and \\(I_1\\) is the single-slit intensity. At the principal maxima, \\(I_{\\max} = N^2 I_1\\).</p>
</div>
</div>

<p>Key features:</p>
<ul>
<li><strong>Principal maxima</strong> at \\(d\\sin\\theta = m\\lambda\\) (same condition as double slit). The peak intensity is \\(N^2\\) times the single-slit intensity.</li>
<li>Between adjacent principal maxima, there are \\(N - 1\\) minima and \\(N - 2\\) subsidiary maxima (very weak).</li>
<li>The angular width of each principal maximum is approximately \\(\\Delta\\theta \\approx \\lambda / (Nd\\cos\\theta)\\). Larger \\(N\\) means sharper peaks.</li>
</ul>

<div class="env-block example">
<div class="env-title">Example: Peak brightness</div>
<div class="env-body">
<p>A grating with \\(N = 1000\\) slits concentrates light into peaks that are \\(N^2 = 10^6\\) times brighter than a single slit (at the exact peak angle). This enormous concentration is what makes gratings so useful for spectroscopy: even very faint spectral features become visible.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Energy conservation again</div>
<div class="env-body">
<p>The total energy is still \\(N\\) times the single-slit energy (not \\(N^2\\)). The peaks are \\(N^2\\) times brighter, but they are also \\(N\\) times narrower, so the product (brightness times width) is \\(N\\), as it must be.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A grating has 600 lines/mm and is illuminated by \\(\\lambda = 500\\,\\text{nm}\\). Find the slit spacing \\(d\\), and determine the maximum order \\(m\\) visible.',
                        hint: 'Slit spacing \\(d = 1/600\\,\\text{mm}\\). The maximum order satisfies \\(d\\sin 90^\\circ \\geq m\\lambda\\).',
                        solution: '\\(d = 1/600\\,\\text{mm} = 1.667\\,\\mu\\text{m} = 1667\\,\\text{nm}\\). Maximum order: \\(m_{\\max} = d/\\lambda = 1667/500 = 3.33\\). Since \\(m\\) must be an integer, the highest visible order is \\(m = 3\\).'
                    }
                ]
            },

            // ============================================================
            // Section 3: Grating Equation
            // ============================================================
            {
                id: 'grating-equation',
                title: 'Grating Equation',
                content: `
<h2>Predicting Where the Light Goes</h2>

<p>The condition for constructive interference from a grating is the same as for a double slit, but now with \\(N\\) slits making the maxima razor-sharp:</p>

<div class="env-block theorem">
<div class="env-title">Grating equation</div>
<div class="env-body">
\\[d\\sin\\theta_m = m\\lambda, \\quad m = 0, \\pm 1, \\pm 2, \\ldots\\]
<p>where \\(d\\) is the slit spacing, \\(\\theta_m\\) is the angle of the \\(m\\)-th order maximum, and \\(\\lambda\\) is the wavelength.</p>
</div>
</div>

<p>This equation is the foundation of <strong>spectroscopy</strong>. If you know \\(d\\) and measure \\(\\theta_m\\), you can determine \\(\\lambda\\). Conversely, if you know \\(\\lambda\\), you can find \\(d\\) (or vice versa). Gratings can measure wavelengths with extraordinary precision.</p>

<div class="env-block example">
<div class="env-title">Example: Angle to second order</div>
<div class="env-body">
<p>A grating with 300 lines/mm is illuminated by sodium light (\\(\\lambda = 589\\,\\text{nm}\\)). Find the angle of the second-order maximum.</p>
\\[d = \\frac{1}{300}\\,\\text{mm} = 3333\\,\\text{nm}\\]
\\[\\sin\\theta_2 = \\frac{2 \\times 589}{3333} = 0.353\\]
\\[\\theta_2 = 20.7^\\circ\\]
</div>
</div>

<div class="env-block intuition">
<div class="env-title">White light through a grating</div>
<div class="env-body">
<p>When white light hits a grating, each wavelength is diffracted to a different angle (since \\(\\theta_m\\) depends on \\(\\lambda\\)). The zero-order maximum (\\(m = 0\\)) is white (all wavelengths go straight through). But the first-order and higher-order maxima are spread into <strong>spectra</strong>: rainbows, with violet at smaller angles and red at larger angles. This is how a grating acts as a spectrometer.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-grating-spectrum"></div>
`,
                visualizations: [
                    {
                        id: 'viz-grating-spectrum',
                        title: 'White Light Through a Grating',
                        description: 'White light passes through a diffraction grating, splitting into rainbow spectra at each order. The zero-order is white; the first and second orders show dispersed spectra. Adjust the number of lines/mm.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var linesPerMm = 400;
                            var N = 20;

                            VizEngine.createSlider(controls, 'Lines/mm', 100, 1200, linesPerMm, 50, function (v) { linesPerMm = v; });
                            VizEngine.createSlider(controls, 'N (sharpness)', 5, 80, N, 1, function (v) { N = Math.round(v); });

                            function wavelengthToRGB(nm) {
                                var r = 0, g = 0, b = 0;
                                if (nm >= 380 && nm < 440) { r = -(nm - 440) / 60; b = 1; }
                                else if (nm >= 440 && nm < 490) { g = (nm - 440) / 50; b = 1; }
                                else if (nm >= 490 && nm < 510) { g = 1; b = -(nm - 510) / 20; }
                                else if (nm >= 510 && nm < 580) { r = (nm - 510) / 70; g = 1; }
                                else if (nm >= 580 && nm < 645) { r = 1; g = -(nm - 645) / 65; }
                                else if (nm >= 645 && nm <= 780) { r = 1; }
                                var f = 1;
                                if (nm >= 380 && nm < 420) f = 0.3 + 0.7 * (nm - 380) / 40;
                                else if (nm > 700 && nm <= 780) f = 0.3 + 0.7 * (780 - nm) / 80;
                                return [r * f, g * f, b * f];
                            }

                            function draw() {
                                viz.clear();

                                var dNm = 1e6 / linesPerMm; // nm
                                var sinMax = 0.95;
                                var margin = 40;
                                var barL = margin, barR = w - margin, barW = barR - barL;

                                // Compute spectral pattern: for each pixel, sum over wavelengths
                                var barTop = 30, barBot = h * 0.45;
                                var barH = barBot - barTop;

                                for (var px = 0; px < barW; px++) {
                                    var sinTh = -sinMax + 2 * sinMax * px / barW;
                                    var rr = 0, gg = 0, bb = 0;

                                    for (var lam = 400; lam <= 700; lam += 5) {
                                        var phi = 2 * Math.PI * dNm * sinTh / lam;
                                        var halfPhi = phi / 2;
                                        var denom = Math.sin(halfPhi);
                                        var intensity;
                                        if (Math.abs(denom) < 1e-10) {
                                            intensity = 1.0;
                                        } else {
                                            var val = Math.sin(N * halfPhi) / (N * denom);
                                            intensity = val * val;
                                        }
                                        var col = wavelengthToRGB(lam);
                                        rr += col[0] * intensity;
                                        gg += col[1] * intensity;
                                        bb += col[2] * intensity;
                                    }

                                    var sc = 255 / (61 * 0.15) * 2.5;
                                    rr = VizEngine.clamp(Math.round(rr * sc), 0, 255);
                                    gg = VizEngine.clamp(Math.round(gg * sc), 0, 255);
                                    bb = VizEngine.clamp(Math.round(bb * sc), 0, 255);
                                    ctx.fillStyle = 'rgb(' + rr + ',' + gg + ',' + bb + ')';
                                    ctx.fillRect(barL + px, barTop, 1, barH);
                                }

                                ctx.strokeStyle = viz.colors.text + '44';
                                ctx.lineWidth = 1;
                                ctx.strokeRect(barL, barTop, barW, barH);

                                // Order labels
                                for (var mm = -3; mm <= 3; mm++) {
                                    var midLam = 550;
                                    var sinVal = mm * midLam / dNm;
                                    if (Math.abs(sinVal) > sinMax) continue;
                                    var lx = barL + (sinVal + sinMax) / (2 * sinMax) * barW;
                                    viz.screenText('m=' + mm, lx, barBot + 12, viz.colors.text, 10);
                                }

                                // Intensity graph for a single wavelength
                                var gTop = h * 0.55, gBot2 = h - 30;
                                var gH = gBot2 - gTop;

                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(barL, gBot2);
                                ctx.lineTo(barR, gBot2);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(barL, gBot2);
                                ctx.lineTo(barL, gTop);
                                ctx.stroke();

                                // Plot for three wavelengths
                                var lambdas = [[450, viz.colors.blue], [550, viz.colors.green], [650, viz.colors.red]];
                                for (var li = 0; li < lambdas.length; li++) {
                                    var lam2 = lambdas[li][0];
                                    var col2 = lambdas[li][1];
                                    ctx.beginPath();
                                    var nSteps = 600;
                                    for (var si = 0; si <= nSteps; si++) {
                                        var frac = si / nSteps;
                                        var sinTh2 = -sinMax + 2 * sinMax * frac;
                                        var phi2 = Math.PI * dNm * sinTh2 / lam2;
                                        var denom2 = Math.sin(phi2);
                                        var int2;
                                        if (Math.abs(denom2) < 1e-10) int2 = 1.0;
                                        else {
                                            var val2 = Math.sin(N * phi2) / (N * denom2);
                                            int2 = val2 * val2;
                                        }
                                        var ppx = barL + frac * barW;
                                        var ppy = gBot2 - int2 * gH;
                                        if (si === 0) ctx.moveTo(ppx, ppy);
                                        else ctx.lineTo(ppx, ppy);
                                    }
                                    ctx.strokeStyle = col2 + '88';
                                    ctx.lineWidth = 1.5;
                                    ctx.stroke();
                                }

                                viz.screenText(linesPerMm + ' lines/mm (d = ' + dNm.toFixed(0) + ' nm), N = ' + N, w / 2, 16, viz.colors.white, 12);
                                viz.screenText('R', barR + 8, gTop + 8, viz.colors.red, 9, 'left');
                                viz.screenText('G', barR + 8, gTop + 20, viz.colors.green, 9, 'left');
                                viz.screenText('B', barR + 8, gTop + 32, viz.colors.blue, 9, 'left');
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A grating with 500 lines/mm is used with a sodium lamp that emits two closely spaced yellow lines at \\(\\lambda_1 = 589.0\\,\\text{nm}\\) and \\(\\lambda_2 = 589.6\\,\\text{nm}\\). At what angle does each line appear in the first order?',
                        hint: '\\(d = 1/500\\,\\text{mm} = 2000\\,\\text{nm}\\). Use \\(d\\sin\\theta = \\lambda\\).',
                        solution: '\\(d = 2000\\,\\text{nm}\\). For \\(\\lambda_1\\): \\(\\sin\\theta_1 = 589.0/2000 = 0.2945\\), \\(\\theta_1 = 17.13^\\circ\\). For \\(\\lambda_2\\): \\(\\sin\\theta_2 = 589.6/2000 = 0.2948\\), \\(\\theta_2 = 17.15^\\circ\\). The angular difference is about \\(0.02^\\circ\\), which is resolvable with enough slits.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Spectral Resolution
            // ============================================================
            {
                id: 'spectral-resolution',
                title: 'Spectral Resolution',
                content: `
<h2>How Well Can a Grating Separate Two Wavelengths?</h2>

<p>The <strong>resolving power</strong> of a grating measures its ability to distinguish two close wavelengths. It is defined as:</p>

<div class="env-block theorem">
<div class="env-title">Resolving power of a grating</div>
<div class="env-body">
\\[R = \\frac{\\lambda}{\\Delta\\lambda} = mN\\]
<p>where \\(m\\) is the order number, \\(N\\) is the total number of slits, and \\(\\Delta\\lambda\\) is the minimum wavelength difference that can be resolved.</p>
</div>
</div>

<p>This elegant formula says that to resolve finer wavelength differences, you can either use a higher order \\(m\\) or a grating with more slits \\(N\\).</p>

<div class="env-block example">
<div class="env-title">Example: Resolving the sodium doublet</div>
<div class="env-body">
<p>The sodium D lines are at \\(\\lambda_1 = 589.0\\,\\text{nm}\\) and \\(\\lambda_2 = 589.6\\,\\text{nm}\\), so \\(\\Delta\\lambda = 0.6\\,\\text{nm}\\). The resolving power needed is:</p>
\\[R = \\frac{589}{0.6} \\approx 982\\]
<p>In first order (\\(m = 1\\)), we need \\(N = R/m = 982\\) slits. A grating with 1000 slits can resolve the sodium doublet in first order.</p>
<p>In second order, only \\(N = 982/2 = 491\\) slits are needed.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Resolving power vs dispersion</div>
<div class="env-body">
<p><strong>Dispersion</strong> (how far apart two wavelengths are spread on the screen) and <strong>resolving power</strong> (whether they appear as separate peaks) are related but different. A grating with large \\(d\\) may have low dispersion but high resolving power if it has many slits. A grating with small \\(d\\) has high dispersion (wide angular spread) but needs enough slits for sufficient resolving power.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A grating has 8000 slits. What is its resolving power in third order? What is the minimum resolvable \\(\\Delta\\lambda\\) near \\(\\lambda = 500\\,\\text{nm}\\)?',
                        hint: '\\(R = mN\\). Then \\(\\Delta\\lambda = \\lambda/R\\).',
                        solution: '\\(R = 3 \\times 8000 = 24000\\). \\(\\Delta\\lambda = 500/24000 = 0.021\\,\\text{nm}\\). This grating can resolve wavelength differences as small as 0.021 nm in third order, which is precise enough for detailed atomic spectroscopy.'
                    },
                    {
                        question: 'To resolve two spectral lines at 486.1 nm and 486.3 nm, how many slits are needed in first order?',
                        hint: '\\(R = \\lambda / \\Delta\\lambda\\), then \\(N = R/m\\).',
                        solution: '\\(R = 486.1/0.2 = 2431\\). In first order: \\(N = 2431\\). You need at least 2431 slits.'
                    }
                ]
            },

            // ============================================================
            // Section 5: Applications
            // ============================================================
            {
                id: 'applications',
                title: 'Applications',
                content: `
<h2>Gratings in Science and Technology</h2>

<p>Diffraction gratings are among the most important optical instruments ever invented. Their applications span astronomy, chemistry, physics, telecommunications, and everyday technology.</p>

<div class="env-block definition">
<div class="env-title">Types of gratings</div>
<div class="env-body">
<ul>
<li><strong>Transmission gratings:</strong> Light passes through parallel slits (like the ones we have analysed).</li>
<li><strong>Reflection gratings:</strong> Light reflects off parallel grooves cut into a mirror surface. Most research-grade spectrometers use reflection gratings.</li>
<li><strong>Blazed gratings:</strong> The groove shape is tilted to concentrate most of the diffracted light into a particular order, dramatically improving efficiency.</li>
</ul>
</div>
</div>

<h3>Spectroscopy</h3>

<p>By far the most important application. Every element emits light at characteristic wavelengths. A grating spreads these wavelengths into a spectrum, allowing identification of the element. This is how we know the chemical composition of stars, the atmosphere of exoplanets, and the purity of materials.</p>

<div class="env-block example">
<div class="env-title">Example: Identifying elements</div>
<div class="env-body">
<p>Hydrogen emits visible light at four wavelengths: 656.3 nm (red), 486.1 nm (blue-green), 434.0 nm (violet), and 410.2 nm (violet). A grating spectrometer can separate all four lines easily. The pattern is unique to hydrogen, like a fingerprint.</p>
</div>
</div>

<h3>Everyday Gratings</h3>

<p>The rainbow shimmer on a CD or DVD is diffraction from the spiral track of tiny pits, which acts as a reflection grating. Holographic security labels on credit cards and banknotes use micro-gratings to produce angle-dependent colour effects that are difficult to counterfeit.</p>

<div class="viz-placeholder" data-viz="viz-spectroscopy"></div>

<div class="env-block remark">
<div class="env-title">Gratings vs prisms</div>
<div class="env-body">
<p>Both gratings and prisms disperse light, but they work by different mechanisms. A prism uses refraction (wavelength-dependent speed); a grating uses interference. Gratings produce a more uniform (linear) dispersion across the spectrum and achieve higher resolving power. Prisms are sometimes preferred for compactness or when only a wide-band separation is needed.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Beyond visible light</div>
<div class="env-body">
<p>Gratings work at any wavelength where waves can interfere. X-ray crystallography uses the regular atomic spacing of crystals as a three-dimensional diffraction grating to determine molecular structures. Radio astronomy uses antenna arrays as effective gratings to image the sky. The principle is universal.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-spectroscopy',
                        title: 'Grating Spectroscopy: Emission Lines',
                        description: 'Simulated emission spectra of hydrogen and sodium through a diffraction grating. The grating separates each emission line into sharp peaks at different angles. Toggle between elements.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var element = 'hydrogen';
                            var linesPerMm = 600;
                            var N = 40;

                            var spectra = {
                                hydrogen: [
                                    { lam: 410.2, name: 'H\u03B4' },
                                    { lam: 434.0, name: 'H\u03B3' },
                                    { lam: 486.1, name: 'H\u03B2' },
                                    { lam: 656.3, name: 'H\u03B1' }
                                ],
                                sodium: [
                                    { lam: 589.0, name: 'D\u2082' },
                                    { lam: 589.6, name: 'D\u2081' }
                                ],
                                mercury: [
                                    { lam: 404.7, name: 'violet' },
                                    { lam: 435.8, name: 'blue' },
                                    { lam: 546.1, name: 'green' },
                                    { lam: 577.0, name: 'yellow' },
                                    { lam: 579.1, name: 'yellow' }
                                ]
                            };

                            VizEngine.createButton(controls, 'Hydrogen', function () { element = 'hydrogen'; });
                            VizEngine.createButton(controls, 'Sodium', function () { element = 'sodium'; });
                            VizEngine.createButton(controls, 'Mercury', function () { element = 'mercury'; });
                            VizEngine.createSlider(controls, 'Lines/mm', 200, 1200, linesPerMm, 50, function (v) { linesPerMm = v; });

                            function wavelengthToRGB(nm) {
                                var r = 0, g = 0, b = 0;
                                if (nm >= 380 && nm < 440) { r = -(nm - 440) / 60; b = 1; }
                                else if (nm >= 440 && nm < 490) { g = (nm - 440) / 50; b = 1; }
                                else if (nm >= 490 && nm < 510) { g = 1; b = -(nm - 510) / 20; }
                                else if (nm >= 510 && nm < 580) { r = (nm - 510) / 70; g = 1; }
                                else if (nm >= 580 && nm < 645) { r = 1; g = -(nm - 645) / 65; }
                                else if (nm >= 645 && nm <= 780) { r = 1; }
                                var f = 1;
                                if (nm >= 380 && nm < 420) f = 0.3 + 0.7 * (nm - 380) / 40;
                                else if (nm > 700 && nm <= 780) f = 0.3 + 0.7 * (780 - nm) / 80;
                                return [r * f, g * f, b * f];
                            }

                            function draw() {
                                viz.clear();

                                var dNm = 1e6 / linesPerMm;
                                var lines = spectra[element] || spectra.hydrogen;
                                var sinMax = 0.85;
                                var margin = 40;
                                var barL = margin, barR = w - margin, barW = barR - barL;

                                // Title
                                var elName = element.charAt(0).toUpperCase() + element.slice(1);
                                viz.screenText(elName + ' Emission Spectrum (d = ' + dNm.toFixed(0) + ' nm)', w / 2, 16, viz.colors.white, 13);

                                // Spectral bar (top section)
                                var barTop = 35, barBot2 = h * 0.35;
                                var barH = barBot2 - barTop;

                                // Dark background
                                ctx.fillStyle = '#080810';
                                ctx.fillRect(barL, barTop, barW, barH);

                                // Draw emission lines as bright vertical streaks at their grating angles
                                for (var li = 0; li < lines.length; li++) {
                                    var lam = lines[li].lam;
                                    var rgb = wavelengthToRGB(lam);
                                    var colStr = 'rgb(' + Math.round(rgb[0] * 255) + ',' + Math.round(rgb[1] * 255) + ',' + Math.round(rgb[2] * 255) + ')';

                                    for (var mm = -2; mm <= 2; mm++) {
                                        var sinTh = mm * lam / dNm;
                                        if (Math.abs(sinTh) > sinMax) continue;
                                        var px = barL + (sinTh + sinMax) / (2 * sinMax) * barW;

                                        // Glow
                                        var grad = ctx.createLinearGradient(px - 8, 0, px + 8, 0);
                                        grad.addColorStop(0, colStr.replace('rgb', 'rgba').replace(')', ',0)'));
                                        grad.addColorStop(0.3, colStr.replace('rgb', 'rgba').replace(')', ',0.6)'));
                                        grad.addColorStop(0.5, colStr);
                                        grad.addColorStop(0.7, colStr.replace('rgb', 'rgba').replace(')', ',0.6)'));
                                        grad.addColorStop(1, colStr.replace('rgb', 'rgba').replace(')', ',0)'));
                                        ctx.fillStyle = grad;
                                        ctx.fillRect(px - 8, barTop, 16, barH);

                                        // Core line
                                        ctx.strokeStyle = colStr;
                                        ctx.lineWidth = 2;
                                        ctx.shadowColor = colStr;
                                        ctx.shadowBlur = 8;
                                        ctx.beginPath();
                                        ctx.moveTo(px, barTop);
                                        ctx.lineTo(px, barBot2);
                                        ctx.stroke();
                                        ctx.shadowBlur = 0;

                                        // Label (only for positive orders or m=0)
                                        if (mm >= 0) {
                                            viz.screenText(lines[li].name, px, barBot2 + 10, colStr, 9);
                                        }
                                    }
                                }

                                ctx.strokeStyle = viz.colors.text + '44';
                                ctx.lineWidth = 1;
                                ctx.strokeRect(barL, barTop, barW, barH);

                                // Order markers
                                for (var om = -2; om <= 2; om++) {
                                    var oSin = om * 550 / dNm;
                                    if (Math.abs(oSin) > sinMax) continue;
                                    var opx = barL + (oSin + sinMax) / (2 * sinMax) * barW;
                                    viz.screenText('m=' + om, opx, barBot2 + 24, viz.colors.text, 9);
                                }

                                // Intensity graph below
                                var gTop = h * 0.52, gBot = h - 25;
                                var gH = gBot - gTop;

                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(barL, gBot);
                                ctx.lineTo(barR, gBot);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(barL, gBot);
                                ctx.lineTo(barL, gTop);
                                ctx.stroke();
                                viz.screenText('sin\u03B8', (barL + barR) / 2, gBot + 14, viz.colors.text, 10);

                                // Plot intensity for each emission line
                                var nSteps = 600;
                                for (var li2 = 0; li2 < lines.length; li2++) {
                                    var lam2 = lines[li2].lam;
                                    var rgb2 = wavelengthToRGB(lam2);
                                    var colStr2 = 'rgb(' + Math.round(rgb2[0] * 255) + ',' + Math.round(rgb2[1] * 255) + ',' + Math.round(rgb2[2] * 255) + ')';

                                    ctx.beginPath();
                                    for (var si = 0; si <= nSteps; si++) {
                                        var frac = si / nSteps;
                                        var sinTh2 = -sinMax + 2 * sinMax * frac;
                                        var phi = Math.PI * dNm * sinTh2 / lam2;
                                        var denom = Math.sin(phi);
                                        var intens;
                                        if (Math.abs(denom) < 1e-10) intens = 1.0;
                                        else {
                                            var val = Math.sin(N * phi) / (N * denom);
                                            intens = val * val;
                                        }
                                        var ppx = barL + frac * barW;
                                        var ppy = gBot - intens * gH * 0.8;
                                        if (si === 0) ctx.moveTo(ppx, ppy);
                                        else ctx.lineTo(ppx, ppy);
                                    }
                                    ctx.strokeStyle = colStr2;
                                    ctx.lineWidth = 1.5;
                                    ctx.stroke();
                                }
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A CD has a track spacing of about 1.6 \\(\\mu\\text{m}\\). At what angle will you see the first-order diffraction of red light (\\(\\lambda = 650\\,\\text{nm}\\)) when you tilt the CD under a lamp?',
                        hint: 'Use the grating equation with \\(d = 1600\\,\\text{nm}\\) and \\(m = 1\\).',
                        solution: '\\(\\sin\\theta = \\lambda/d = 650/1600 = 0.406\\). So \\(\\theta = 24.0^\\circ\\). You see a reddish glint at about 24 degrees from the surface normal.'
                    },
                    {
                        question: 'The Balmer series of hydrogen has lines at 656.3, 486.1, 434.0, and 410.2 nm. Using a grating with 400 lines/mm, determine whether the second-order red line (656.3 nm) overlaps with any third-order lines.',
                        hint: 'The second-order red is at \\(\\sin\\theta = 2 \\times 656.3 / 2500\\). Compute the third-order positions of each line and check for overlap.',
                        solution: '\\(d = 2500\\,\\text{nm}\\). Second-order red: \\(\\sin\\theta = 2 \\times 656.3/2500 = 0.525\\). Third-order lines: \\(\\sin\\theta = 3\\lambda/2500\\). For 434.0 nm: \\(3 \\times 434/2500 = 0.521\\). The third-order 434 nm line (violet) is at almost the same angle as the second-order 656.3 nm (red). They overlap. This overlap between different orders is a practical limitation of grating spectroscopy.'
                    }
                ]
            }
        ]
    });
})();
