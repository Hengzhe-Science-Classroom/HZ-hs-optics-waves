// === Chapter 15: Single-Slit Diffraction ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch15',
        number: 15,
        title: 'Single-Slit Diffraction',
        subtitle: 'When a single opening sculpts light into fringes',
        file: 'ch15-single-slit',

        sections: [
            // ============================================================
            // Section 1: Diffraction Around Edges
            // ============================================================
            {
                id: 'diffraction-edges',
                title: 'Diffraction Around Edges',
                content: `
<h2>Light Does Not Travel in Perfectly Straight Lines</h2>

<p>If light were purely a ray, a sharp shadow would be razor-edged. But careful observation reveals that the shadow edge is not sharp: there is a slight brightening and a set of faint fringes at the boundary. This is <strong>diffraction</strong>, and it occurs whenever a wave encounters an obstacle or aperture.</p>

<p>In Chapter 12, we used Huygens' principle to preview diffraction. Now we treat it quantitatively for the simplest and most important case: a single slit of width \\(a\\).</p>

<div class="env-block definition">
<div class="env-title">Definition: Fraunhofer diffraction</div>
<div class="env-body">
<p><strong>Fraunhofer</strong> (far-field) diffraction occurs when both the source and the observation screen are effectively at infinity (or when lenses are used to produce parallel rays). This is the regime where the diffraction pattern depends only on angles, and the mathematics simplifies greatly. We assume Fraunhofer conditions throughout this chapter.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Diffraction vs interference</div>
<div class="env-body">
<p>Interference is the general phenomenon of wave superposition. Diffraction is a specific case of interference: it is the result of interference among the infinitely many Huygens wavelets within a single aperture. In double-slit experiments, both effects are present: the double-slit interference pattern (from the two sources) is modulated by the single-slit diffraction pattern (from the finite width of each slit).</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'What happens to the diffraction pattern as you make a slit narrower? What about wider?',
                        hint: 'Think about how many Huygens sources fit within the slit and what that implies for the angular spread.',
                        solution: 'A narrower slit means fewer effective Huygens sources across it, so the cancellation at large angles is less complete, and the pattern spreads out more. A wider slit has more sources, better cancellation at large angles, and a narrower central peak. In the limit of an infinitely wide slit, there is no diffraction at all.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Single-Slit Pattern
            // ============================================================
            {
                id: 'single-slit-pattern',
                title: 'Single-Slit Pattern',
                content: `
<h2>Dark Fringes from a Single Opening</h2>

<p>Consider a slit of width \\(a\\) illuminated by a plane wave. We want to find the angles at which destructive interference (dark fringes) occurs.</p>

<p>Divide the slit into two equal halves. For each point in the top half, there is a corresponding point in the bottom half that is exactly \\(a/2\\) away. If the path difference between these paired points equals \\(\\lambda/2\\), they cancel each other. The condition for the top half to cancel the bottom half is:</p>

\\[\\frac{a}{2}\\sin\\theta = \\frac{\\lambda}{2}\\]

<p>which gives \\(a\\sin\\theta = \\lambda\\). This is the first minimum. More generally, divide the slit into \\(2m\\) strips and apply the same argument:</p>

<div class="env-block theorem">
<div class="env-title">Single-slit minima</div>
<div class="env-body">
\\[a\\sin\\theta = m\\lambda, \\quad m = \\pm 1, \\pm 2, \\pm 3, \\ldots\\]
<p>These are the angles where destructive interference produces <strong>dark fringes</strong>. Note: \\(m = 0\\) is <em>not</em> a minimum; it is the bright central maximum.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-single-slit-pattern"></div>

<div class="env-block example">
<div class="env-title">Example: First minimum</div>
<div class="env-body">
<p>A slit of width \\(a = 0.10\\,\\text{mm}\\) is illuminated by \\(\\lambda = 633\\,\\text{nm}\\) (He-Ne laser). The first dark fringe is at:</p>
\\[\\sin\\theta = \\frac{\\lambda}{a} = \\frac{633 \\times 10^{-9}}{0.10 \\times 10^{-3}} = 6.33 \\times 10^{-3}\\]
\\[\\theta \\approx 0.36^\\circ\\]
<p>On a screen 2 m away, this is at \\(y = L\\sin\\theta = 2.0 \\times 6.33 \\times 10^{-3} = 12.7\\,\\text{mm}\\) from the centre.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-single-slit-pattern',
                        title: 'Single-Slit Diffraction Pattern',
                        description: 'Adjust the slit width \\(a\\) and wavelength \\(\\lambda\\) to see how the diffraction pattern changes. The intensity profile and a simulation of the fringe pattern are shown. Notice the broad central maximum flanked by weaker subsidiary maxima.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var aOverLam = 5;
                            var lambdaNm = 550;

                            VizEngine.createSlider(controls, 'a/\u03BB', 1, 20, aOverLam, 0.5, function (v) { aOverLam = v; });
                            VizEngine.createSlider(controls, '\u03BB (nm)', 400, 700, lambdaNm, 10, function (v) { lambdaNm = v; });

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

                            function sinc2(x) {
                                if (Math.abs(x) < 1e-8) return 1;
                                var val = Math.sin(x) / x;
                                return val * val;
                            }

                            function draw() {
                                viz.clear();

                                var margin = 50;
                                var gLeft = margin, gRight = w - margin;
                                var gTop = 40, gBot = h * 0.50;
                                var gW = gRight - gLeft, gH = gBot - gTop;

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

                                var sinMax = VizEngine.clamp(3 / aOverLam, 0.05, 1);
                                viz.screenText('sin\u03B8', (gLeft + gRight) / 2, gBot + 16, viz.colors.text, 11);
                                viz.screenText('I/I\u2080', gLeft - 10, gTop - 8, viz.colors.text, 10, 'right');

                                // Tick marks for minima
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '9px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                for (var mm = -3; mm <= 3; mm++) {
                                    if (mm === 0) continue;
                                    var sinVal = mm / aOverLam;
                                    if (Math.abs(sinVal) > sinMax) continue;
                                    var tx = gLeft + (sinVal + sinMax) / (2 * sinMax) * gW;
                                    ctx.fillText('m=' + mm, tx, gBot + 3);
                                    ctx.strokeStyle = viz.colors.text + '22';
                                    ctx.lineWidth = 0.5;
                                    ctx.beginPath();
                                    ctx.moveTo(tx, gTop);
                                    ctx.lineTo(tx, gBot);
                                    ctx.stroke();
                                }

                                // Intensity curve: I = sinc^2(pi*a*sin(theta)/lambda)
                                var nSteps = 500;
                                ctx.beginPath();
                                for (var i = 0; i <= nSteps; i++) {
                                    var frac = i / nSteps;
                                    var sinTh = -sinMax + 2 * sinMax * frac;
                                    var beta = Math.PI * aOverLam * sinTh;
                                    var intensity = sinc2(beta);
                                    var px = gLeft + frac * gW;
                                    var py = gBot - intensity * gH;
                                    if (i === 0) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.strokeStyle = viz.colors.cyan;
                                ctx.lineWidth = 2.5;
                                ctx.shadowColor = viz.colors.cyan;
                                ctx.shadowBlur = 6;
                                ctx.stroke();
                                ctx.shadowBlur = 0;

                                // Fill under curve
                                ctx.beginPath();
                                for (var j = 0; j <= nSteps; j++) {
                                    var frac2 = j / nSteps;
                                    var sinTh2 = -sinMax + 2 * sinMax * frac2;
                                    var beta2 = Math.PI * aOverLam * sinTh2;
                                    var int2 = sinc2(beta2);
                                    var px2 = gLeft + frac2 * gW;
                                    var py2 = gBot - int2 * gH;
                                    if (j === 0) ctx.moveTo(px2, py2);
                                    else ctx.lineTo(px2, py2);
                                }
                                ctx.lineTo(gRight, gBot);
                                ctx.lineTo(gLeft, gBot);
                                ctx.closePath();
                                ctx.fillStyle = viz.colors.cyan + '12';
                                ctx.fill();

                                // Fringe pattern bar
                                var barTop = h * 0.58, barBot = h * 0.75;
                                var barH = barBot - barTop;
                                var rgb = wavelengthToRGB(lambdaNm);
                                for (var bi = 0; bi < gW; bi++) {
                                    var bfrac = bi / gW;
                                    var bsinTh = -sinMax + 2 * sinMax * bfrac;
                                    var bbeta = Math.PI * aOverLam * bsinTh;
                                    var bint = sinc2(bbeta);
                                    ctx.fillStyle = 'rgb(' + Math.round(rgb[0] * bint * 255) + ',' + Math.round(rgb[1] * bint * 255) + ',' + Math.round(rgb[2] * bint * 255) + ')';
                                    ctx.fillRect(gLeft + bi, barTop, 1, barH);
                                }
                                ctx.strokeStyle = viz.colors.text + '44';
                                ctx.lineWidth = 1;
                                ctx.strokeRect(gLeft, barTop, gW, barH);

                                // Labels
                                viz.screenText('a/\u03BB = ' + aOverLam.toFixed(1) + ', \u03BB = ' + lambdaNm + ' nm', w / 2, 16, viz.colors.white, 13);
                                viz.screenText('Simulated pattern on screen', w / 2, barBot + 12, viz.colors.text, 10);

                                // Central maximum width indicator
                                var centralHalfWidth = 1 / aOverLam;
                                if (centralHalfWidth < sinMax) {
                                    var cwLeft = gLeft + (-centralHalfWidth + sinMax) / (2 * sinMax) * gW;
                                    var cwRight = gLeft + (centralHalfWidth + sinMax) / (2 * sinMax) * gW;
                                    ctx.strokeStyle = viz.colors.orange + '88';
                                    ctx.lineWidth = 1.5;
                                    var arrowY = h - 20;
                                    ctx.beginPath();
                                    ctx.moveTo(cwLeft, arrowY);
                                    ctx.lineTo(cwRight, arrowY);
                                    ctx.stroke();
                                    ctx.beginPath();
                                    ctx.moveTo(cwLeft, arrowY - 4);
                                    ctx.lineTo(cwLeft, arrowY + 4);
                                    ctx.stroke();
                                    ctx.beginPath();
                                    ctx.moveTo(cwRight, arrowY - 4);
                                    ctx.lineTo(cwRight, arrowY + 4);
                                    ctx.stroke();
                                    viz.screenText('Central max width', (cwLeft + cwRight) / 2, arrowY - 10, viz.colors.orange, 10);
                                }
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A single slit of width \\(a = 0.050\\,\\text{mm}\\) is illuminated by \\(\\lambda = 500\\,\\text{nm}\\). At what angles do the first three dark fringes occur?',
                        hint: 'Use \\(a\\sin\\theta = m\\lambda\\) for \\(m = 1, 2, 3\\).',
                        solution: '\\(\\sin\\theta_m = m\\lambda/a = m \\times 500 \\times 10^{-9} / (5 \\times 10^{-5}) = 0.01m\\). So \\(\\theta_1 \\approx 0.57^\\circ\\), \\(\\theta_2 \\approx 1.15^\\circ\\), \\(\\theta_3 \\approx 1.72^\\circ\\).'
                    }
                ]
            },

            // ============================================================
            // Section 3: Intensity Formula
            // ============================================================
            {
                id: 'intensity-formula',
                title: 'Intensity Formula',
                content: `
<h2>The sinc-Squared Function</h2>

<p>To find the intensity at every angle, not just the minima, we must sum the contributions from all points across the slit. This is an integral over the slit width, and it yields the famous sinc-squared pattern.</p>

<p>Define the variable \\(\\beta = \\frac{\\pi a \\sin\\theta}{\\lambda}\\). Then:</p>

<div class="env-block theorem">
<div class="env-title">Single-slit intensity</div>
<div class="env-body">
\\[I(\\theta) = I_0 \\left(\\frac{\\sin\\beta}{\\beta}\\right)^2\\]
<p>where \\(I_0\\) is the intensity at the centre (\\(\\theta = 0\\), \\(\\beta = 0\\)) and \\(\\beta = \\pi a \\sin\\theta / \\lambda\\).</p>
</div>
</div>

<p>Key features of this function:</p>
<ul>
<li>At \\(\\beta = 0\\): \\(\\sin\\beta/\\beta \\to 1\\), so \\(I = I_0\\). This is the central maximum.</li>
<li>At \\(\\beta = m\\pi\\) (i.e., \\(a\\sin\\theta = m\\lambda\\)): \\(\\sin(m\\pi) = 0\\), so \\(I = 0\\). These are the minima.</li>
<li>The subsidiary maxima occur roughly at \\(\\beta \\approx (m + 1/2)\\pi\\), and they are much weaker than the central maximum. The first subsidiary maximum is only about 4.7% of \\(I_0\\).</li>
</ul>

<div class="env-block remark">
<div class="env-title">The central maximum is special</div>
<div class="env-body">
<p>The central maximum is twice as wide as the subsidiary maxima (from \\(\\beta = -\\pi\\) to \\(\\beta = +\\pi\\), while subsidiary maxima span only \\(\\pi\\) each). It also contains about 84% of the total diffracted light. The pattern drops off rapidly: the first subsidiary peak is 4.7% of the central peak, the second is 1.7%, and so on.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Intensity at the first subsidiary maximum</div>
<div class="env-body">
<p>The first subsidiary maximum is approximately at \\(\\beta = 3\\pi/2\\) (midway between the first and second minima):</p>
\\[\\frac{I}{I_0} = \\left(\\frac{\\sin(3\\pi/2)}{3\\pi/2}\\right)^2 = \\left(\\frac{-1}{3\\pi/2}\\right)^2 = \\frac{4}{9\\pi^2} \\approx 0.045\\]
<p>Only about 4.5% of the peak intensity. The subsidiary maxima are very dim.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Show that the intensity at the second subsidiary maximum (\\(\\beta \\approx 5\\pi/2\\)) is about 1.6% of the central maximum.',
                        hint: 'Plug \\(\\beta = 5\\pi/2\\) into the sinc-squared formula.',
                        solution: '\\(I/I_0 = (\\sin(5\\pi/2) / (5\\pi/2))^2 = (1 / (5\\pi/2))^2 = 4/(25\\pi^2) \\approx 0.016\\). Yes, about 1.6%.'
                    },
                    {
                        question: 'Compare the double-slit intensity formula \\(I = I_0 \\cos^2(\\pi d \\sin\\theta / \\lambda)\\) with the single-slit formula \\(I = I_0 (\\sin\\beta/\\beta)^2\\). When both effects are present, what is the combined formula?',
                        hint: 'The double-slit pattern is modulated by the single-slit envelope.',
                        solution: 'The combined formula is \\(I = I_0 \\left(\\frac{\\sin\\beta}{\\beta}\\right)^2 \\cos^2\\left(\\frac{\\pi d \\sin\\theta}{\\lambda}\\right)\\), where \\(\\beta = \\pi a \\sin\\theta / \\lambda\\). The \\(\\cos^2\\) gives the fine double-slit fringes, and the sinc-squared provides the overall envelope from each slit\'s diffraction.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Central Maximum Width
            // ============================================================
            {
                id: 'central-max-width',
                title: 'Central Maximum Width',
                content: `
<h2>How Wide Is the Central Peak?</h2>

<p>The central maximum extends from the first minimum on one side to the first minimum on the other side. The first minimum is at \\(\\sin\\theta_1 = \\lambda/a\\). The full angular width of the central maximum is therefore:</p>

<div class="env-block theorem">
<div class="env-title">Angular width of the central maximum</div>
<div class="env-body">
\\[\\Delta\\theta = 2\\theta_1 \\approx \\frac{2\\lambda}{a}\\]
<p>(using the small-angle approximation \\(\\sin\\theta \\approx \\theta\\)).</p>
<p>On a screen at distance \\(L\\), the width is:</p>
\\[W = \\frac{2\\lambda L}{a}\\]
</div>
</div>

<p>This formula reveals the fundamental trade-off of diffraction:</p>
<ul>
<li><strong>Narrow slit</strong> (small \\(a\\)): broad central maximum, significant spreading.</li>
<li><strong>Wide slit</strong> (large \\(a\\)): narrow central maximum, more like a geometric shadow.</li>
</ul>

<p>Diffraction is important when the slit width is comparable to the wavelength. When \\(a \\gg \\lambda\\), the central maximum is so narrow that diffraction effects are negligible.</p>

<div class="env-block example">
<div class="env-title">Example: Width on a screen</div>
<div class="env-body">
<p>A slit of \\(a = 0.020\\,\\text{mm}\\) is illuminated by \\(\\lambda = 600\\,\\text{nm}\\). The screen is \\(L = 3.0\\,\\text{m}\\) away.</p>
\\[W = \\frac{2 \\times 600 \\times 10^{-9} \\times 3.0}{0.020 \\times 10^{-3}} = \\frac{3.6 \\times 10^{-6}}{2 \\times 10^{-5}} = 0.18\\,\\text{m} = 18\\,\\text{cm}\\]
<p>The central bright band is 18 cm wide, easily visible. Narrowing the slit spreads the light out further.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Diffraction limits everything</div>
<div class="env-body">
<p>Every optical instrument, from telescopes to microscopes to cameras, has a finite aperture. This means every image is blurred by diffraction. No matter how perfect the lens, the image of a point source is not a point but a diffraction pattern (the "Airy disc"). This fundamental limit is why larger telescopes produce sharper images, and why there is a minimum resolvable detail for any optical system.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'By what factor must you reduce the slit width to double the width of the central maximum?',
                        hint: '\\(W = 2\\lambda L / a\\). If \\(W \\to 2W\\), what must \\(a\\) become?',
                        solution: '\\(W \\propto 1/a\\). To double \\(W\\), halve \\(a\\). Reduce the slit width by a factor of 2.'
                    },
                    {
                        question: 'A camera has an aperture diameter of 5.0 mm. Estimate the angular width of the diffraction-limited central maximum for green light (\\(\\lambda = 550\\,\\text{nm}\\)).',
                        hint: 'For a circular aperture, the first minimum is at \\(\\sin\\theta \\approx 1.22\\lambda/D\\). The full angular width is about \\(2 \\times 1.22\\lambda/D\\).',
                        solution: '\\(\\Delta\\theta \\approx 2 \\times 1.22 \\times 550 \\times 10^{-9} / (5 \\times 10^{-3}) = 2.7 \\times 10^{-4}\\,\\text{rad} \\approx 0.015^\\circ\\). This is very small, confirming that diffraction is not the practical limit for most cameras (aberrations and sensor pixel size dominate).'
                    }
                ]
            },

            // ============================================================
            // Section 5: Resolving Power
            // ============================================================
            {
                id: 'resolving-power',
                title: 'Resolving Power',
                content: `
<h2>How Close Is Too Close to Distinguish?</h2>

<p>When two point sources (e.g., two stars) are very close together in the sky, their diffraction patterns overlap. If the overlap is too severe, the two sources merge into one blob and cannot be distinguished. The ability to separate two close sources is called <strong>resolving power</strong>.</p>

<div class="env-block theorem">
<div class="env-title">Rayleigh criterion</div>
<div class="env-body">
<p>Two point sources are just barely resolved when the central maximum of one falls on the first minimum of the other. For a slit of width \\(a\\):</p>
\\[\\theta_{\\min} = \\frac{\\lambda}{a}\\]
<p>For a circular aperture of diameter \\(D\\) (more realistic for telescopes and eyes):</p>
\\[\\theta_{\\min} = 1.22\\,\\frac{\\lambda}{D}\\]
<p>This is the <strong>Rayleigh criterion</strong>: the minimum angular separation at which two sources can be distinguished.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-resolving-power"></div>

<div class="env-block example">
<div class="env-title">Example: Resolving power of the human eye</div>
<div class="env-body">
<p>The pupil diameter in bright light is about \\(D = 2\\,\\text{mm}\\). For \\(\\lambda = 550\\,\\text{nm}\\):</p>
\\[\\theta_{\\min} = 1.22 \\times \\frac{550 \\times 10^{-9}}{2 \\times 10^{-3}} = 3.4 \\times 10^{-4}\\,\\text{rad} \\approx 1.2'\\]
<p>About 1.2 arcminutes, close to the commonly quoted value of 1 arcminute for normal vision. (In practice, the retinal cone spacing is the more binding constraint.)</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Hubble vs ground telescope</div>
<div class="env-body">
<p>The Hubble Space Telescope has \\(D = 2.4\\,\\text{m}\\). At \\(\\lambda = 550\\,\\text{nm}\\):</p>
\\[\\theta_{\\min} = 1.22 \\times \\frac{550 \\times 10^{-9}}{2.4} = 2.8 \\times 10^{-7}\\,\\text{rad} \\approx 0.058''\\]
<p>About 0.06 arcseconds. A ground-based telescope of the same size is limited to about 1 arcsecond by atmospheric turbulence ("seeing"), not diffraction. This is why Hubble, above the atmosphere, produces much sharper images.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Bigger is better</div>
<div class="env-body">
<p>The Rayleigh criterion says \\(\\theta_{\\min} \\propto 1/D\\). Larger apertures resolve finer details. This is why astronomers build ever-larger telescopes, and why radio telescopes (with \\(\\lambda\\) measured in centimetres) must be enormous to achieve useful angular resolution.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-resolving-power',
                        title: 'Rayleigh Criterion: Resolving Two Sources',
                        description: 'Two point sources produce overlapping diffraction patterns. Adjust their angular separation to see when they become resolved, just resolved (Rayleigh criterion), or unresolved.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var separation = 1.0; // in units of Rayleigh criterion
                            var aOverLam = 8;

                            VizEngine.createSlider(controls, 'Separation / Rayleigh', 0.3, 3.0, separation, 0.05, function (v) { separation = v; });
                            VizEngine.createSlider(controls, 'a/\u03BB', 3, 15, aOverLam, 0.5, function (v) { aOverLam = v; });

                            function sinc2(x) {
                                if (Math.abs(x) < 1e-8) return 1;
                                var val = Math.sin(x) / x;
                                return val * val;
                            }

                            function draw() {
                                viz.clear();

                                var margin = 50;
                                var gLeft = margin, gRight = w - margin;
                                var gTop = 40, gBot = h * 0.55;
                                var gW = gRight - gLeft, gH = gBot - gTop;

                                // The Rayleigh angle in sin(theta) units
                                var rayleighSin = 1.0 / aOverLam;
                                var sepSin = separation * rayleighSin;
                                var sinMax = VizEngine.clamp(4 * rayleighSin, 0.05, 0.5);

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
                                viz.screenText('I', gLeft - 10, gTop - 8, viz.colors.text, 10, 'right');

                                // Two individual patterns + combined
                                var nSteps = 400;
                                var combined = [];

                                // Source 1 centered at -sepSin/2, Source 2 at +sepSin/2
                                var c1 = -sepSin / 2;
                                var c2 = sepSin / 2;

                                // Individual patterns
                                for (var pass = 0; pass < 2; pass++) {
                                    var center = pass === 0 ? c1 : c2;
                                    var col = pass === 0 ? viz.colors.cyan + '66' : viz.colors.orange + '66';
                                    ctx.beginPath();
                                    for (var i = 0; i <= nSteps; i++) {
                                        var frac = i / nSteps;
                                        var sinTh = -sinMax + 2 * sinMax * frac;
                                        var beta = Math.PI * aOverLam * (sinTh - center);
                                        var intensity = sinc2(beta);
                                        if (pass === 0) {
                                            if (!combined[i]) combined[i] = 0;
                                            combined[i] += intensity;
                                        } else {
                                            combined[i] += intensity;
                                        }
                                        var px = gLeft + frac * gW;
                                        var py = gBot - intensity * 0.5 * gH;
                                        if (i === 0) ctx.moveTo(px, py);
                                        else ctx.lineTo(px, py);
                                    }
                                    ctx.strokeStyle = col;
                                    ctx.lineWidth = 1;
                                    ctx.setLineDash([4, 3]);
                                    ctx.stroke();
                                    ctx.setLineDash([]);
                                }

                                // Combined pattern
                                ctx.beginPath();
                                for (var j = 0; j <= nSteps; j++) {
                                    var frac2 = j / nSteps;
                                    var px2 = gLeft + frac2 * gW;
                                    var py2 = gBot - (combined[j] / 2) * 0.5 * gH;
                                    if (j === 0) ctx.moveTo(px2, py2);
                                    else ctx.lineTo(px2, py2);
                                }
                                ctx.strokeStyle = viz.colors.white;
                                ctx.lineWidth = 2.5;
                                ctx.shadowColor = viz.colors.white;
                                ctx.shadowBlur = 4;
                                ctx.stroke();
                                ctx.shadowBlur = 0;

                                // Fringe bar
                                var barTop = h * 0.62, barBot = h * 0.78;
                                var barH = barBot - barTop;
                                for (var bi = 0; bi < gW; bi++) {
                                    var bval = combined[Math.round(bi / gW * nSteps)] || 0;
                                    var bright = VizEngine.clamp(bval / 2 * 255, 0, 255);
                                    ctx.fillStyle = 'rgb(' + Math.round(bright) + ',' + Math.round(bright * 0.95) + ',' + Math.round(bright * 0.8) + ')';
                                    ctx.fillRect(gLeft + bi, barTop, 1, barH);
                                }
                                ctx.strokeStyle = viz.colors.text + '44';
                                ctx.lineWidth = 1;
                                ctx.strokeRect(gLeft, barTop, gW, barH);

                                // Status label
                                var status, statusCol;
                                if (separation >= 1.0) {
                                    status = 'RESOLVED';
                                    statusCol = viz.colors.green;
                                } else if (separation >= 0.8) {
                                    status = 'BARELY RESOLVED';
                                    statusCol = viz.colors.yellow;
                                } else {
                                    status = 'UNRESOLVED';
                                    statusCol = viz.colors.red;
                                }

                                viz.screenText(status, w / 2, 16, statusCol, 14);
                                viz.screenText('Separation = ' + separation.toFixed(2) + ' \u00D7 Rayleigh limit', w / 2, h - 16, viz.colors.white, 12);
                                viz.screenText('\u03B8_Rayleigh = \u03BB/a', w / 2, h - 4, viz.colors.text, 10);

                                // Legend
                                viz.screenText('\u2014 Source 1', w - 80, gTop + 10, viz.colors.cyan, 9, 'left');
                                viz.screenText('\u2014 Source 2', w - 80, gTop + 22, viz.colors.orange, 9, 'left');
                                viz.screenText('\u2014 Combined', w - 80, gTop + 34, viz.colors.white, 9, 'left');
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A telescope has an aperture of \\(D = 10\\,\\text{cm}\\). Can it resolve two stars separated by 1 arcsecond at \\(\\lambda = 550\\,\\text{nm}\\)?',
                        hint: 'Compute the Rayleigh limit \\(\\theta_{\\min} = 1.22\\lambda/D\\) and convert to arcseconds (1 rad = 206265 arcsec).',
                        solution: '\\(\\theta_{\\min} = 1.22 \\times 550 \\times 10^{-9} / 0.10 = 6.71 \\times 10^{-6}\\,\\text{rad} = 6.71 \\times 10^{-6} \\times 206265 = 1.38\\) arcseconds. The Rayleigh limit is 1.38 arcseconds, which is larger than the 1 arcsecond separation. So no, the telescope cannot resolve the two stars (they would appear merged).'
                    },
                    {
                        question: 'What aperture diameter would be needed to resolve two objects separated by 0.5 arcseconds at \\(\\lambda = 550\\,\\text{nm}\\)?',
                        hint: 'Set \\(\\theta_{\\min} = 0.5\\) arcsec \\(= 0.5/206265\\,\\text{rad}\\) and solve for \\(D\\).',
                        solution: '\\(D = 1.22\\lambda / \\theta_{\\min} = 1.22 \\times 550 \\times 10^{-9} / (0.5/206265) = 1.22 \\times 550 \\times 10^{-9} \\times 206265 / 0.5 = 0.277\\,\\text{m} \\approx 28\\,\\text{cm}\\).'
                    }
                ]
            }
        ]
    });
})();
