// === Chapter 13: Double-Slit Interference ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch13',
        number: 13,
        title: 'Double-Slit Interference',
        subtitle: "Young's experiment that proved light is a wave",
        file: 'ch13-double-slit',

        sections: [
            // ============================================================
            // Section 1: Young's Experiment
            // ============================================================
            {
                id: 'youngs-experiment',
                title: "Young's Experiment",
                content: `
<h2>The Experiment That Changed Everything</h2>

<p>In 1801, Thomas Young performed one of the most important experiments in the history of physics. He shone light through two narrow, closely spaced slits and observed a pattern of bright and dark bands (fringes) on a distant screen. This result could not be explained by Newton's particle theory of light, but it followed naturally from wave theory.</p>

<div class="env-block definition">
<div class="env-title">Definition: Interference</div>
<div class="env-body">
<p><strong>Interference</strong> is the phenomenon that occurs when two or more waves overlap. Where crests meet crests, the waves add (constructive interference, bright). Where crests meet troughs, they cancel (destructive interference, dark).</p>
</div>
</div>

<p>Young's reasoning was simple and elegant: if light is a wave, then each slit acts as a Huygens source. The two cylindrical wavelets overlap beyond the slits, and depending on the path difference, they interfere constructively or destructively at different points on the screen. The pattern of bright and dark fringes is the signature of wave behaviour.</p>

<div class="env-block intuition">
<div class="env-title">Why two slits?</div>
<div class="env-body">
<p>You need two coherent sources (same frequency and a fixed phase relationship). A single light source passed through a single slit first creates a coherent wavefront; this then illuminates two slits, which become two synchronized sources. Without coherence, the fringe pattern washes out because the phases fluctuate randomly.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-double-slit-full"></div>

<div class="env-block remark">
<div class="env-title">Historical impact</div>
<div class="env-body">
<p>Young's experiment demolished the particle theory of light that Newton had championed. It showed decisively that light is a wave. Over a century later, quantum mechanics would reveal that light has <em>both</em> wave and particle properties, but the interference pattern remains: even single photons, sent one at a time, build up the fringe pattern. This is one of the deepest mysteries in physics, which we will revisit in Chapter 19.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-double-slit-full',
                        title: "Young's Double-Slit Experiment",
                        description: 'The showpiece visualization. Waves emerge from two slits, expand, and interfere. The resulting intensity pattern appears on the far screen. Adjust slit separation \\(d\\), wavelength \\(\\lambda\\), and screen distance \\(L\\).',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var lambda = 18;  // pixels per wavelength
                            var slitSep = 80; // pixels between slits
                            var screenDist = 0.7; // fraction of width
                            var t = 0;
                            var showWaves = true;

                            VizEngine.createSlider(controls, '\u03BB (px)', 8, 40, lambda, 1, function (v) { lambda = v; });
                            VizEngine.createSlider(controls, 'd (px)', 30, 180, slitSep, 5, function (v) { slitSep = v; });
                            VizEngine.createSlider(controls, 'L', 0.4, 0.85, screenDist, 0.05, function (v) { screenDist = v; });
                            VizEngine.createButton(controls, 'Toggle Waves', function () { showWaves = !showWaves; });

                            function draw() {
                                t += 0.08;
                                viz.clear();

                                var barrierX = w * 0.18;
                                var screenX = w * screenDist;
                                var centerY = h / 2;
                                var slit1Y = centerY - slitSep / 2;
                                var slit2Y = centerY + slitSep / 2;
                                var slitGap = 6;
                                var k = 2 * Math.PI / lambda;

                                // Barrier
                                ctx.fillStyle = '#2a2a4a';
                                ctx.fillRect(barrierX - 3, 0, 6, slit1Y - slitGap / 2);
                                ctx.fillRect(barrierX - 3, slit1Y + slitGap / 2, 6, slit2Y - slitGap / 2 - slit1Y - slitGap / 2);
                                ctx.fillRect(barrierX - 3, slit2Y + slitGap / 2, 6, h - slit2Y - slitGap / 2);

                                // Slit highlights
                                ctx.fillStyle = viz.colors.gold + '88';
                                ctx.fillRect(barrierX - 2, slit1Y - slitGap / 2, 4, slitGap);
                                ctx.fillRect(barrierX - 2, slit2Y - slitGap / 2, 4, slitGap);

                                // Incident plane waves (left of barrier)
                                ctx.strokeStyle = viz.colors.blue + '30';
                                ctx.lineWidth = 1;
                                for (var wf = 0; wf < 20; wf++) {
                                    var xw = barrierX - ((t * lambda / (2 * Math.PI) * k + wf * lambda) % (20 * lambda));
                                    if (xw < -lambda || xw > barrierX - 4) continue;
                                    ctx.beginPath();
                                    ctx.moveTo(xw, 0);
                                    ctx.lineTo(xw, h);
                                    ctx.stroke();
                                }

                                // Wave interference pattern (field computation)
                                if (showWaves) {
                                    var stepX = 4, stepY = 4;
                                    for (var px = barrierX + 8; px < screenX - 5; px += stepX) {
                                        for (var py = 10; py < h - 10; py += stepY) {
                                            var d1 = Math.sqrt((px - barrierX) * (px - barrierX) + (py - slit1Y) * (py - slit1Y));
                                            var d2 = Math.sqrt((px - barrierX) * (px - barrierX) + (py - slit2Y) * (py - slit2Y));
                                            var wave = Math.cos(k * d1 - t) + Math.cos(k * d2 - t);
                                            var intensity = wave / 2;  // range -1 to 1
                                            if (intensity > 0) {
                                                ctx.fillStyle = 'rgba(0,212,255,' + (intensity * 0.35) + ')';
                                            } else {
                                                ctx.fillStyle = 'rgba(248,81,73,' + (-intensity * 0.15) + ')';
                                            }
                                            ctx.fillRect(px - stepX / 2, py - stepY / 2, stepX, stepY);
                                        }
                                    }
                                }

                                // Screen
                                ctx.fillStyle = '#1a1a3a';
                                ctx.fillRect(screenX, 10, 8, h - 20);

                                // Intensity pattern on screen
                                var nSample = 300;
                                ctx.beginPath();
                                var maxI = 0;
                                var intensities = [];
                                for (var si = 0; si < nSample; si++) {
                                    var sy = 10 + (h - 20) * si / (nSample - 1);
                                    var dd1 = Math.sqrt((screenX - barrierX) * (screenX - barrierX) + (sy - slit1Y) * (sy - slit1Y));
                                    var dd2 = Math.sqrt((screenX - barrierX) * (screenX - barrierX) + (sy - slit2Y) * (sy - slit2Y));
                                    var dphi = k * (dd2 - dd1);
                                    var intens = Math.pow(Math.cos(dphi / 2), 2);
                                    intensities.push({ y: sy, I: intens });
                                    if (intens > maxI) maxI = intens;
                                }

                                // Draw intensity curve
                                ctx.beginPath();
                                var barMax = w - screenX - 20;
                                for (var si2 = 0; si2 < intensities.length; si2++) {
                                    var barLen = intensities[si2].I / maxI * barMax;
                                    var px2 = screenX + 10 + barLen;
                                    if (si2 === 0) ctx.moveTo(px2, intensities[si2].y);
                                    else ctx.lineTo(px2, intensities[si2].y);
                                }
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.stroke();

                                // Bright fringes on screen (glow)
                                for (var si3 = 0; si3 < intensities.length; si3++) {
                                    if (intensities[si3].I > 0.5) {
                                        var glow = intensities[si3].I;
                                        ctx.fillStyle = 'rgba(255,220,100,' + (glow * 0.5) + ')';
                                        ctx.fillRect(screenX, intensities[si3].y - 1, 8, 2);
                                    }
                                }

                                // Labels
                                viz.screenText('d = ' + slitSep + ' px', barrierX, h - 12, viz.colors.gold, 11);
                                viz.screenText('\u03BB = ' + lambda + ' px', w / 2, h - 12, viz.colors.cyan, 11);
                                viz.screenText('Intensity', w - 30, 20, viz.colors.orange, 10, 'right');

                                // Slit labels
                                viz.screenText('S\u2081', barrierX + 12, slit1Y - 8, viz.colors.gold, 10, 'left');
                                viz.screenText('S\u2082', barrierX + 12, slit2Y + 14, viz.colors.gold, 10, 'left');
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: "Why did Young use a single slit before the double slit in his original experiment?",
                        hint: "Think about what is needed for a stable interference pattern.",
                        solution: "The single slit ensures spatial coherence. Light from an extended source (like a candle) has random phases at different points. By passing it through a narrow slit first, Young created a single coherent wavefront, which then illuminated both slits with the same phase. Without this, the fringes from different source points would overlap and wash out."
                    }
                ]
            },

            // ============================================================
            // Section 2: Path Difference
            // ============================================================
            {
                id: 'path-difference',
                title: 'Path Difference',
                content: `
<h2>The Key to the Fringe Pattern</h2>

<p>Consider two slits separated by distance \\(d\\), and a distant screen at distance \\(L\\). We want to find the condition for constructive and destructive interference at a point P on the screen, located at angle \\(\\theta\\) from the centre line.</p>

<p>Each slit acts as a Huygens source. The wave from slit 1 travels a distance \\(r_1\\) to point P, and the wave from slit 2 travels \\(r_2\\). The <strong>path difference</strong> is:</p>

\\[\\Delta = r_2 - r_1\\]

<p>For a distant screen (\\(L \\gg d\\)), the two paths are nearly parallel, and the path difference is approximately:</p>

\\[\\Delta = d\\sin\\theta\\]

<div class="env-block theorem">
<div class="env-title">Conditions for constructive and destructive interference</div>
<div class="env-body">
<p><strong>Constructive</strong> (bright fringe):</p>
\\[d\\sin\\theta = m\\lambda, \\quad m = 0, \\pm 1, \\pm 2, \\ldots\\]
<p><strong>Destructive</strong> (dark fringe):</p>
\\[d\\sin\\theta = \\left(m + \\tfrac{1}{2}\\right)\\lambda, \\quad m = 0, \\pm 1, \\pm 2, \\ldots\\]
<p>The integer \\(m\\) is called the <strong>order</strong> of the fringe.</p>
</div>
</div>

<p>At the centre of the screen (\\(\\theta = 0\\)), both waves travel equal distances, so \\(\\Delta = 0\\): always constructive. This is the \\(m = 0\\) or <strong>central maximum</strong>. Moving away from the centre, we hit the first dark fringe when \\(\\Delta = \\lambda/2\\), then the first bright fringe at \\(\\Delta = \\lambda\\), and so on.</p>

<div class="env-block example">
<div class="env-title">Example: Finding the first bright fringe</div>
<div class="env-body">
<p>Two slits with \\(d = 0.25\\,\\text{mm}\\), illuminated by \\(\\lambda = 550\\,\\text{nm}\\) (green) light. Find the angle to the first-order bright fringe (\\(m = 1\\)).</p>
\\[\\sin\\theta = \\frac{m\\lambda}{d} = \\frac{1 \\times 550 \\times 10^{-9}}{0.25 \\times 10^{-3}} = 2.2 \\times 10^{-3}\\]
\\[\\theta \\approx 0.126^\\circ\\]
<p>The angle is tiny because \\(\\lambda \\ll d\\). Yet it is easily measurable on a distant screen.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Small-angle approximation</div>
<div class="env-body">
<p>When \\(\\theta\\) is small (which it usually is), \\(\\sin\\theta \\approx \\tan\\theta = y/L\\), where \\(y\\) is the position on the screen measured from the centre. This gives \\(d \\cdot y/L = m\\lambda\\), or \\(y = m\\lambda L/d\\).</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Two slits \\(d = 0.10\\,\\text{mm}\\) apart are illuminated with \\(\\lambda = 632.8\\,\\text{nm}\\) (He-Ne laser). The screen is \\(L = 2.0\\,\\text{m}\\) away. Find the distance from the central maximum to the third bright fringe.',
                        hint: 'Use \\(y_m = m\\lambda L / d\\) with \\(m = 3\\).',
                        solution: '\\(y_3 = \\frac{3 \\times 632.8 \\times 10^{-9} \\times 2.0}{0.10 \\times 10^{-3}} = \\frac{3.797 \\times 10^{-6}}{10^{-4}} = 0.0380\\,\\text{m} = 3.80\\,\\text{cm}\\).'
                    },
                    {
                        question: 'At what angle does the second dark fringe occur for \\(d = 0.20\\,\\text{mm}\\) and \\(\\lambda = 500\\,\\text{nm}\\)?',
                        hint: 'Dark fringes: \\(d\\sin\\theta = (m + 1/2)\\lambda\\). The second dark fringe is \\(m = 1\\) (since \\(m = 0\\) is the first).',
                        solution: '\\(\\sin\\theta = \\frac{(1 + 0.5) \\times 500 \\times 10^{-9}}{0.20 \\times 10^{-3}} = \\frac{750 \\times 10^{-9}}{2 \\times 10^{-4}} = 3.75 \\times 10^{-3}\\). So \\(\\theta \\approx 0.215^\\circ\\).'
                    }
                ]
            },

            // ============================================================
            // Section 3: Fringe Spacing
            // ============================================================
            {
                id: 'fringe-spacing',
                title: 'Fringe Spacing',
                content: `
<h2>How Far Apart Are the Fringes?</h2>

<p>The bright fringes on the screen are equally spaced (in the small-angle approximation). The position of the \\(m\\)-th bright fringe is:</p>

\\[y_m = \\frac{m\\lambda L}{d}\\]

<p>The spacing between consecutive bright fringes is:</p>

<div class="env-block theorem">
<div class="env-title">Fringe spacing</div>
<div class="env-body">
\\[\\Delta y = y_{m+1} - y_m = \\frac{\\lambda L}{d}\\]
<p>The fringe spacing increases with wavelength \\(\\lambda\\) and screen distance \\(L\\), and decreases with slit separation \\(d\\).</p>
</div>
</div>

<p>This formula is the practical workhorse of double-slit experiments. By measuring the fringe spacing, you can determine the wavelength of the light (if \\(d\\) and \\(L\\) are known), or the slit separation (if \\(\\lambda\\) and \\(L\\) are known). Young himself used this technique to make the first measurement of the wavelength of light.</p>

<div class="env-block example">
<div class="env-title">Example: Measuring wavelength</div>
<div class="env-body">
<p>In a double-slit experiment, \\(d = 0.15\\,\\text{mm}\\), \\(L = 1.5\\,\\text{m}\\), and the bright fringes are spaced \\(\\Delta y = 5.0\\,\\text{mm}\\) apart. What is the wavelength?</p>
\\[\\lambda = \\frac{\\Delta y \\cdot d}{L} = \\frac{5.0 \\times 10^{-3} \\times 0.15 \\times 10^{-3}}{1.5} = 5.0 \\times 10^{-7}\\,\\text{m} = 500\\,\\text{nm}\\]
<p>This is green light.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Physical reasoning</div>
<div class="env-body">
<p><strong>Why does spacing increase with \\(\\lambda\\)?</strong> Longer wavelengths need a larger path difference to reach the next constructive condition. At a given angle, longer-wavelength fringes are farther apart.</p>
<p><strong>Why does spacing decrease with \\(d\\)?</strong> Wider slit separation means the path difference grows faster with angle, so you reach the next order sooner, packing fringes closer.</p>
<p><strong>Why does spacing increase with \\(L\\)?</strong> A farther screen magnifies the angular pattern: the same angle \\(\\theta\\) maps to a larger displacement \\(y = L\\tan\\theta \\approx L\\theta\\).</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'If you double the slit separation \\(d\\), what happens to the fringe spacing?',
                        hint: '\\(\\Delta y = \\lambda L/d\\). What happens when \\(d \\to 2d\\)?',
                        solution: '\\(\\Delta y \\to \\lambda L / (2d) = \\Delta y / 2\\). The fringe spacing is halved. The fringes become denser.'
                    },
                    {
                        question: 'Red light (\\(\\lambda = 700\\,\\text{nm}\\)) and blue light (\\(\\lambda = 450\\,\\text{nm}\\)) illuminate the same double slit. Which produces wider fringe spacing?',
                        hint: '\\(\\Delta y \\propto \\lambda\\).',
                        solution: 'Red light has longer wavelength, so \\(\\Delta y_{\\text{red}} / \\Delta y_{\\text{blue}} = 700/450 \\approx 1.56\\). Red fringes are about 56% wider than blue fringes.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Intensity Pattern
            // ============================================================
            {
                id: 'intensity-pattern',
                title: 'Intensity Pattern',
                content: `
<h2>Quantifying Brightness</h2>

<p>So far we have identified where the bright and dark fringes are. Now let us find the intensity at every point. This requires adding the two waves with their phase difference.</p>

<p>Let the electric field from slit 1 at point P be \\(E_1 = E_0 \\cos(\\omega t)\\), and from slit 2 be \\(E_2 = E_0 \\cos(\\omega t + \\phi)\\), where \\(\\phi = (2\\pi/\\lambda)\\,d\\sin\\theta\\) is the phase difference due to path difference.</p>

<p>The total field is:</p>
\\[E = E_1 + E_2 = 2E_0 \\cos\\left(\\frac{\\phi}{2}\\right)\\cos\\left(\\omega t + \\frac{\\phi}{2}\\right)\\]

<p>Intensity is proportional to the square of the amplitude:</p>

<div class="env-block theorem">
<div class="env-title">Double-slit intensity</div>
<div class="env-body">
\\[I = I_0 \\cos^2\\left(\\frac{\\phi}{2}\\right) = I_0 \\cos^2\\left(\\frac{\\pi d \\sin\\theta}{\\lambda}\\right)\\]
<p>where \\(I_0 = 4I_1\\) is the maximum intensity (four times the single-slit intensity, because two equal amplitudes add to give twice the amplitude, and intensity goes as amplitude squared).</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-intensity-curve"></div>

<div class="env-block remark">
<div class="env-title">Energy conservation</div>
<div class="env-body">
<p>Where does the energy go in the dark fringes? Nowhere, because it is not destroyed. The total energy across the screen is the same as without interference. Energy is merely redistributed: taken from the dark fringes and concentrated into the bright ones. The average intensity over the full pattern is exactly \\(2I_1\\), which is what you would get from two incoherent sources.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Intensity at a specific point</div>
<div class="env-body">
<p>At a point where \\(d\\sin\\theta = 3\\lambda/4\\), find \\(I/I_0\\).</p>
\\[\\phi = \\frac{2\\pi}{\\lambda} \\cdot \\frac{3\\lambda}{4} = \\frac{3\\pi}{2}\\]
\\[\\frac{I}{I_0} = \\cos^2\\left(\\frac{3\\pi}{4}\\right) = \\cos^2(135^\\circ) = \\left(-\\frac{\\sqrt{2}}{2}\\right)^2 = 0.5\\]
<p>The intensity is half the maximum.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-intensity-curve',
                        title: 'Double-Slit Intensity Pattern',
                        description: 'The \\(\\cos^2\\) intensity envelope for double-slit interference. Adjust \\(d/\\lambda\\) to see how the fringe density changes. The bright fringes are equally spaced and equally bright (in this idealized model without single-slit diffraction).',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var dOverLambda = 5;
                            VizEngine.createSlider(controls, 'd/\u03BB', 1, 15, dOverLambda, 0.5, function (v) { dOverLambda = v; });

                            function draw() {
                                viz.clear();

                                var margin = 50;
                                var gLeft = margin, gRight = w - margin;
                                var gTop = 40, gBot = h * 0.55;
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

                                viz.screenText('sin\u03B8', (gLeft + gRight) / 2, gBot + 18, viz.colors.text, 11);
                                viz.screenText('I/I\u2080', gLeft - 8, gTop - 10, viz.colors.text, 11);
                                viz.screenText('1', gLeft - 12, gTop + 2, viz.colors.text, 10);
                                viz.screenText('0', gLeft - 12, gBot - 2, viz.colors.text, 10);

                                // Plot I = cos^2(pi * d/lambda * sin(theta))
                                var nSteps = 500;
                                var sinMax = 3 / dOverLambda;
                                if (sinMax > 1) sinMax = 1;
                                sinMax = Math.max(sinMax, 0.3);

                                // Intensity curve
                                ctx.beginPath();
                                var started = false;
                                for (var i = 0; i <= nSteps; i++) {
                                    var frac = i / nSteps;
                                    var sinTh = -sinMax + 2 * sinMax * frac;
                                    var phi2 = Math.PI * dOverLambda * sinTh;
                                    var intensity = Math.pow(Math.cos(phi2), 2);
                                    var px = gLeft + frac * gW;
                                    var py = gBot - intensity * gH;
                                    if (!started) { ctx.moveTo(px, py); started = true; }
                                    else ctx.lineTo(px, py);
                                }
                                ctx.strokeStyle = viz.colors.cyan;
                                ctx.lineWidth = 2.5;
                                ctx.shadowColor = viz.colors.cyan;
                                ctx.shadowBlur = 6;
                                ctx.stroke();
                                ctx.shadowBlur = 0;

                                // Fill under curve with glow
                                ctx.beginPath();
                                for (var j = 0; j <= nSteps; j++) {
                                    var frac2 = j / nSteps;
                                    var sinTh2 = -sinMax + 2 * sinMax * frac2;
                                    var phi22 = Math.PI * dOverLambda * sinTh2;
                                    var int2 = Math.pow(Math.cos(phi22), 2);
                                    var px2 = gLeft + frac2 * gW;
                                    var py2 = gBot - int2 * gH;
                                    if (j === 0) ctx.moveTo(px2, py2);
                                    else ctx.lineTo(px2, py2);
                                }
                                ctx.lineTo(gRight, gBot);
                                ctx.lineTo(gLeft, gBot);
                                ctx.closePath();
                                ctx.fillStyle = viz.colors.cyan + '15';
                                ctx.fill();

                                // Fringe bar below (visual representation of screen)
                                var barTop = h * 0.65, barBot = h * 0.85;
                                for (var bi = 0; bi < gW; bi++) {
                                    var bfrac = bi / gW;
                                    var bsinTh = -sinMax + 2 * sinMax * bfrac;
                                    var bphi = Math.PI * dOverLambda * bsinTh;
                                    var bint = Math.pow(Math.cos(bphi), 2);
                                    var bright = Math.round(bint * 255);
                                    ctx.fillStyle = 'rgb(' + bright + ',' + Math.round(bright * 0.95) + ',' + Math.round(bright * 0.7) + ')';
                                    ctx.fillRect(gLeft + bi, barTop, 1, barBot - barTop);
                                }

                                // Border
                                ctx.strokeStyle = viz.colors.text + '44';
                                ctx.lineWidth = 1;
                                ctx.strokeRect(gLeft, barTop, gW, barBot - barTop);

                                viz.screenText('Simulated fringe pattern on screen', w / 2, barBot + 14, viz.colors.text, 10);
                                viz.screenText('d/\u03BB = ' + dOverLambda.toFixed(1), w / 2, 16, viz.colors.white, 13);
                                viz.screenText('I = I\u2080 cos\u00B2(\u03C0 d sin\u03B8 / \u03BB)', w / 2, gBot + 36, viz.colors.cyan, 11);
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'At the centre of the pattern (\\(\\theta = 0\\)), show that \\(I = I_0\\). Why is the maximum intensity four times the single-slit intensity?',
                        hint: 'At \\(\\theta = 0\\), \\(\\phi = 0\\). For the amplitude doubling, think about superposition of two equal waves.',
                        solution: 'At \\(\\theta = 0\\), \\(\\phi = 0\\), so \\(I = I_0 \\cos^2(0) = I_0\\). The maximum intensity is four times the single-slit intensity because the amplitude doubles (two waves in phase: \\(E_0 + E_0 = 2E_0\\)) and intensity goes as amplitude squared: \\((2E_0)^2 = 4E_0^2 = 4I_1\\).'
                    }
                ]
            },

            // ============================================================
            // Section 5: White Light Fringes
            // ============================================================
            {
                id: 'white-light-fringes',
                title: 'White Light Fringes',
                content: `
<h2>Rainbows from Two Slits</h2>

<p>When white light (containing all visible wavelengths from about 400 nm to 700 nm) is used in a double-slit experiment, each wavelength produces its own set of fringes with its own spacing. The result is spectacular.</p>

<div class="env-block theorem">
<div class="env-title">White-light double-slit pattern</div>
<div class="env-body">
<ul>
<li>The <strong>central maximum</strong> (\\(m = 0\\)) is white, because all wavelengths interfere constructively at \\(\\theta = 0\\) (path difference is zero for all \\(\\lambda\\)).</li>
<li>The <strong>first-order fringes</strong> are spread into a spectrum: violet (shorter \\(\\lambda\\)) is closest to the centre, red (longer \\(\\lambda\\)) is farthest. This is because \\(y_1 = \\lambda L/d\\), so longer wavelengths are displaced more.</li>
<li>Higher orders overlap: the second-order blue may coincide with the first-order red, blending the colours.</li>
</ul>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-white-light-fringes"></div>

<div class="env-block remark">
<div class="env-title">Coherence length limits the fringes</div>
<div class="env-body">
<p>White light has a very short coherence length (only a few micrometres) because it contains many frequencies. This means only a few fringes are visible near the centre before the pattern washes out into uniform white. Laser light (nearly monochromatic, long coherence length) produces many sharp fringes across the entire screen.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Overlap of orders</div>
<div class="env-body">
<p>The first-order red fringe (\\(\\lambda = 700\\,\\text{nm}\\)) is at \\(y = 700 L/d\\) (in nm units). The second-order violet (\\(\\lambda = 400\\,\\text{nm}\\)) is at \\(y = 2 \\times 400 L/d = 800 L/d\\). These are close but not overlapping. However, the second-order green (\\(\\lambda = 525\\,\\text{nm}\\)) is at \\(y = 1050 L/d\\), and the third-order violet is at \\(y = 1200 L/d\\). By the third order, significant overlap occurs.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-white-light-fringes',
                        title: 'White Light Double-Slit Fringes',
                        description: 'White light passes through double slits, producing rainbow-colored fringes. The central fringe is white; the first-order fringes spread into spectra. Compare with monochromatic light using the toggle.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var dOverLambdaMid = 6;
                            var monoMode = false;
                            var monoLambda = 550;

                            VizEngine.createSlider(controls, 'd/\u03BB_mid', 2, 12, dOverLambdaMid, 0.5, function (v) { dOverLambdaMid = v; });
                            VizEngine.createButton(controls, 'White Light', function () { monoMode = false; });
                            VizEngine.createButton(controls, 'Monochromatic', function () { monoMode = true; });
                            VizEngine.createSlider(controls, '\u03BB (nm)', 400, 700, monoLambda, 10, function (v) { monoLambda = v; });

                            function wavelengthToRGB(nm) {
                                var r = 0, g = 0, b = 0;
                                if (nm >= 380 && nm < 440) { r = -(nm - 440) / 60; b = 1; }
                                else if (nm >= 440 && nm < 490) { g = (nm - 440) / 50; b = 1; }
                                else if (nm >= 490 && nm < 510) { g = 1; b = -(nm - 510) / 20; }
                                else if (nm >= 510 && nm < 580) { r = (nm - 510) / 70; g = 1; }
                                else if (nm >= 580 && nm < 645) { r = 1; g = -(nm - 645) / 65; }
                                else if (nm >= 645 && nm <= 780) { r = 1; }
                                var factor = 1;
                                if (nm >= 380 && nm < 420) factor = 0.3 + 0.7 * (nm - 380) / 40;
                                else if (nm > 700 && nm <= 780) factor = 0.3 + 0.7 * (780 - nm) / 80;
                                return [r * factor, g * factor, b * factor];
                            }

                            function draw() {
                                viz.clear();

                                var barTop = 30, barBot = h * 0.45;
                                var barH = barBot - barTop;
                                var margin = 40;
                                var barL = margin, barR = w - margin, barW = barR - barL;

                                // Compute fringe pattern
                                var sinMax = 0.15;
                                var nPx = barW;

                                if (monoMode) {
                                    // Monochromatic
                                    var lambdaMid = 550;
                                    var dRatio = dOverLambdaMid * lambdaMid / monoLambda;
                                    var rgb = wavelengthToRGB(monoLambda);
                                    for (var px = 0; px < nPx; px++) {
                                        var sinTh = -sinMax + 2 * sinMax * px / nPx;
                                        var phi = Math.PI * dRatio * sinTh;
                                        var intens = Math.pow(Math.cos(phi), 2);
                                        ctx.fillStyle = 'rgb(' + Math.round(rgb[0] * intens * 255) + ',' + Math.round(rgb[1] * intens * 255) + ',' + Math.round(rgb[2] * intens * 255) + ')';
                                        ctx.fillRect(barL + px, barTop, 1, barH);
                                    }
                                } else {
                                    // White light: sum over wavelengths
                                    var lambdas = [];
                                    for (var lam = 400; lam <= 700; lam += 10) lambdas.push(lam);
                                    var lambdaMid2 = 550;

                                    for (var px2 = 0; px2 < nPx; px2++) {
                                        var sinTh2 = -sinMax + 2 * sinMax * px2 / nPx;
                                        var rr = 0, gg = 0, bb = 0;
                                        for (var li = 0; li < lambdas.length; li++) {
                                            var l = lambdas[li];
                                            var dRatio2 = dOverLambdaMid * lambdaMid2 / l;
                                            var phi2 = Math.PI * dRatio2 * sinTh2;
                                            var intens2 = Math.pow(Math.cos(phi2), 2);
                                            var col = wavelengthToRGB(l);
                                            rr += col[0] * intens2;
                                            gg += col[1] * intens2;
                                            bb += col[2] * intens2;
                                        }
                                        var scale = 255 / lambdas.length * 3.5;
                                        rr = VizEngine.clamp(Math.round(rr * scale), 0, 255);
                                        gg = VizEngine.clamp(Math.round(gg * scale), 0, 255);
                                        bb = VizEngine.clamp(Math.round(bb * scale), 0, 255);
                                        ctx.fillStyle = 'rgb(' + rr + ',' + gg + ',' + bb + ')';
                                        ctx.fillRect(barL + px2, barTop, 1, barH);
                                    }
                                }

                                ctx.strokeStyle = viz.colors.text + '44';
                                ctx.lineWidth = 1;
                                ctx.strokeRect(barL, barTop, barW, barH);

                                // Intensity graph below
                                var gTop = h * 0.55, gBot = h - 30;
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

                                // Intensity curves for R, G, B if white light
                                if (!monoMode) {
                                    var lambdaMid3 = 550;
                                    var plotColors = [[700, viz.colors.red], [550, viz.colors.green], [450, viz.colors.blue]];
                                    for (var pc = 0; pc < plotColors.length; pc++) {
                                        var pLam = plotColors[pc][0];
                                        var pCol = plotColors[pc][1];
                                        var dR = dOverLambdaMid * lambdaMid3 / pLam;
                                        ctx.beginPath();
                                        for (var pi = 0; pi <= 400; pi++) {
                                            var st = -sinMax + 2 * sinMax * pi / 400;
                                            var pp = Math.PI * dR * st;
                                            var ii = Math.pow(Math.cos(pp), 2);
                                            var ppx = barL + pi / 400 * barW;
                                            var ppy = gBot - ii * gH;
                                            if (pi === 0) ctx.moveTo(ppx, ppy);
                                            else ctx.lineTo(ppx, ppy);
                                        }
                                        ctx.strokeStyle = pCol + '88';
                                        ctx.lineWidth = 1.5;
                                        ctx.stroke();
                                    }
                                    viz.screenText('R', barR + 8, gTop + 10, viz.colors.red, 10, 'left');
                                    viz.screenText('G', barR + 8, gTop + 22, viz.colors.green, 10, 'left');
                                    viz.screenText('B', barR + 8, gTop + 34, viz.colors.blue, 10, 'left');
                                } else {
                                    var dR2 = dOverLambdaMid * 550 / monoLambda;
                                    var rgb2 = wavelengthToRGB(monoLambda);
                                    var mCol = 'rgb(' + Math.round(rgb2[0] * 255) + ',' + Math.round(rgb2[1] * 255) + ',' + Math.round(rgb2[2] * 255) + ')';
                                    ctx.beginPath();
                                    for (var pi2 = 0; pi2 <= 400; pi2++) {
                                        var st2 = -sinMax + 2 * sinMax * pi2 / 400;
                                        var pp2 = Math.PI * dR2 * st2;
                                        var ii2 = Math.pow(Math.cos(pp2), 2);
                                        var ppx2 = barL + pi2 / 400 * barW;
                                        var ppy2 = gBot - ii2 * gH;
                                        if (pi2 === 0) ctx.moveTo(ppx2, ppy2);
                                        else ctx.lineTo(ppx2, ppy2);
                                    }
                                    ctx.strokeStyle = mCol;
                                    ctx.lineWidth = 2;
                                    ctx.stroke();
                                }

                                viz.screenText(monoMode ? 'Monochromatic (\u03BB = ' + monoLambda + ' nm)' : 'White Light Fringes', w / 2, 16, viz.colors.white, 13);
                                viz.screenText('m = 0', w / 2, barBot + 10, viz.colors.text, 10);
                                viz.screenText('m = +1', w / 2 + barW / (2 * dOverLambdaMid * 0.15 / sinMax), barBot + 10, viz.colors.text, 9);
                                viz.screenText('m = \u22121', w / 2 - barW / (2 * dOverLambdaMid * 0.15 / sinMax), barBot + 10, viz.colors.text, 9);
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Explain why the central fringe in a white-light double-slit experiment is white, while the first-order fringes are coloured.',
                        hint: 'Consider the path difference at \\(\\theta = 0\\) and at the first-order position for different wavelengths.',
                        solution: 'At \\(\\theta = 0\\), the path difference is zero for all wavelengths, so all colours interfere constructively at the same point, producing white. At the first-order position, \\(y_1 = \\lambda L / d\\) depends on \\(\\lambda\\). Shorter wavelengths (violet) are closer to the centre and longer wavelengths (red) are farther out, spreading the first-order fringe into a spectrum.'
                    },
                    {
                        question: 'At what order \\(m\\) does the red fringe (\\(\\lambda = 700\\,\\text{nm}\\)) overlap with the \\(m+1\\) order violet fringe (\\(\\lambda = 400\\,\\text{nm}\\))?',
                        hint: 'Set \\(m \\times 700 = (m+1) \\times 400\\) and solve for \\(m\\).',
                        solution: '\\(700m = 400(m+1) = 400m + 400\\). So \\(300m = 400\\), giving \\(m = 4/3\\). Since \\(m\\) must be an integer, exact overlap does not occur at integer orders. The closest overlap is near \\(m = 1\\) (red) and \\(m = 2\\) (violet): \\(y_{\\text{red}} = 700L/d\\) vs \\(y_{\\text{violet}} = 800L/d\\), which are close but not coincident. Significant overlap starts around the second and third orders.'
                    }
                ]
            }
        ]
    });
})();
