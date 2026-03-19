// === Chapter 2: Superposition & Interference ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch02',
        number: 2,
        title: 'Superposition & Interference',
        subtitle: 'When waves collide, they add',
        file: 'ch02-superposition',

        sections: [
            // ============================================================
            // Section 0: The Superposition Principle
            // ============================================================
            {
                id: 'superposition-principle',
                title: 'The Superposition Principle',
                content: `
<h2>Waves Pass Through Each Other</h2>

<p>When two waves meet, they do not bounce off each other like billiard balls. They pass right through each other. While they overlap, the displacement of the medium at every point is simply the <strong>sum</strong> of the displacements from each individual wave.</p>

<div class="env-block theorem">
<div class="env-title">Principle of Superposition</div>
<div class="env-body">
<p>When two or more waves overlap in the same region, the resultant displacement at any point is the algebraic sum of the individual displacements:</p>
\\[y_{\\text{total}}(x,t) = y_1(x,t) + y_2(x,t) + \\cdots\\]
</div>
</div>

<p>After the waves pass through each other, each continues on its way as if the other were never there. The waves do not interact; they simply add while overlapping and then separate. This is true as long as the amplitudes are not so extreme that the medium behaves nonlinearly (e.g., shock waves).</p>

<div class="env-block intuition">
<div class="env-title">Why superposition works</div>
<div class="env-body">
<p>Superposition is a consequence of the wave equation being <em>linear</em>. If \\(y_1\\) and \\(y_2\\) are each solutions to the wave equation, then \\(y_1 + y_2\\) is also a solution. This linearity holds for small-amplitude waves in elastic media and for electromagnetic waves.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-superpos-1d"></div>
`,
                visualizations: [
                    {
                        id: 'viz-superpos-1d',
                        title: 'Two Pulses Meeting and Passing Through',
                        description: 'A <strong style="color:#00d4ff;">blue pulse</strong> travels right; a <strong style="color:#f0883e;">orange pulse</strong> travels left. Watch them overlap, add, and then continue undisturbed. The <strong style="color:#3fb950;">green curve</strong> shows the sum.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 35, originX: 50, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            viz.originY = h / 2;

                            var t0 = performance.now();
                            var speed = 2.0;
                            var sigma = 1.2;
                            var amp1 = 2.0;
                            var amp2 = 2.0;
                            var sameDir = false;

                            VizEngine.createSlider(controls, 'Pulse 1 height', -2.5, 2.5, amp1, 0.1, function (v) { amp1 = v; });
                            VizEngine.createSlider(controls, 'Pulse 2 height', -2.5, 2.5, amp2, 0.1, function (v) { amp2 = v; });
                            VizEngine.createButton(controls, 'Restart', function () { t0 = performance.now(); });
                            VizEngine.createButton(controls, 'Same direction', function () { sameDir = !sameDir; t0 = performance.now(); });

                            function gauss(x, center) {
                                var d = x - center;
                                return Math.exp(-d * d / (2 * sigma * sigma));
                            }

                            function draw(now) {
                                var t = (now - t0) / 1000;
                                viz.clear();

                                var xMin = -viz.originX / viz.scale;
                                var xMax = (w - viz.originX) / viz.scale;
                                var startX1 = xMin - 2;
                                var startX2 = sameDir ? xMin - 6 : xMax + 2;
                                var dir2 = sameDir ? 1 : -1;

                                var c1 = startX1 + speed * t;
                                var c2 = startX2 + dir2 * speed * t;

                                // Restart when both pass through
                                if (c1 > xMax + 4 && (sameDir ? c2 > xMax + 4 : c2 < xMin - 4)) {
                                    t0 = now;
                                }

                                // Equilibrium line
                                ctx.strokeStyle = 'rgba(255,255,255,0.06)';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath(); ctx.moveTo(0, viz.originY); ctx.lineTo(w, viz.originY); ctx.stroke();
                                ctx.setLineDash([]);

                                var steps = 500;

                                // Pulse 1 (cyan, transparent)
                                ctx.strokeStyle = viz.colors.cyan;
                                ctx.lineWidth = 1.5;
                                ctx.globalAlpha = 0.5;
                                ctx.beginPath();
                                for (var i = 0; i <= steps; i++) {
                                    var x = xMin + (xMax - xMin) * i / steps;
                                    var y = amp1 * gauss(x, c1);
                                    var s = viz.toScreen(x, y);
                                    if (i === 0) ctx.moveTo(s[0], s[1]);
                                    else ctx.lineTo(s[0], s[1]);
                                }
                                ctx.stroke();
                                ctx.globalAlpha = 1;

                                // Pulse 2 (orange, transparent)
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 1.5;
                                ctx.globalAlpha = 0.5;
                                ctx.beginPath();
                                for (var j = 0; j <= steps; j++) {
                                    var x2 = xMin + (xMax - xMin) * j / steps;
                                    var y2 = amp2 * gauss(x2, c2);
                                    var s2 = viz.toScreen(x2, y2);
                                    if (j === 0) ctx.moveTo(s2[0], s2[1]);
                                    else ctx.lineTo(s2[0], s2[1]);
                                }
                                ctx.stroke();
                                ctx.globalAlpha = 1;

                                // Sum (green, bold)
                                ctx.strokeStyle = viz.colors.green;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                for (var m = 0; m <= steps; m++) {
                                    var x3 = xMin + (xMax - xMin) * m / steps;
                                    var yy = amp1 * gauss(x3, c1) + amp2 * gauss(x3, c2);
                                    var s3 = viz.toScreen(x3, yy);
                                    if (m === 0) ctx.moveTo(s3[0], s3[1]);
                                    else ctx.lineTo(s3[0], s3[1]);
                                }
                                ctx.stroke();

                                // Legend
                                viz.screenText('\u2014 Pulse 1', 15, 18, viz.colors.cyan, 11, 'left');
                                viz.screenText('\u2014 Pulse 2', 15, 34, viz.colors.orange, 11, 'left');
                                viz.screenText('\u2014 Sum', 15, 50, viz.colors.green, 11, 'left');
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Two pulses approach each other on a string. One has amplitude +3 cm and the other +3 cm. What is the maximum displacement at the point where they completely overlap?',
                        hint: 'Apply superposition: displacements add.',
                        solution: 'The maximum displacement is \\(3 + 3 = 6\\,\\text{cm}\\). After they pass through each other, each pulse continues with its original amplitude of 3 cm.'
                    }
                ]
            },

            // ============================================================
            // Section 1: Constructive Interference
            // ============================================================
            {
                id: 'constructive',
                title: 'Constructive Interference',
                content: `
<h2>Adding in Step</h2>

<p>When two waves arrive at the same point <strong>in phase</strong> (crest meets crest, trough meets trough), their displacements add to produce a wave with a larger amplitude. This is <strong>constructive interference</strong>.</p>

<div class="env-block definition">
<div class="env-title">Definition: Constructive Interference</div>
<div class="env-body">
<p><strong>Constructive interference</strong> occurs when two waves combine to produce a resultant wave with an amplitude <em>greater</em> than either individual wave. This happens when the phase difference is:</p>
\\[\\Delta\\phi = 0, \\; 2\\pi, \\; 4\\pi, \\ldots = 2n\\pi \\quad (n = 0, 1, 2, \\ldots)\\]
<p>Equivalently, the path difference is an integer multiple of the wavelength:</p>
\\[\\Delta x = 0, \\; \\lambda, \\; 2\\lambda, \\ldots = n\\lambda\\]
</div>
</div>

<p>For two waves of equal amplitude \\(A\\), the maximum constructive interference produces a resultant amplitude of \\(2A\\). This represents four times the energy of a single wave (since energy \\(\\propto A^2\\)).</p>

<div class="env-block example">
<div class="env-title">Example: Two identical speakers, same distance</div>
<div class="env-body">
<p>Two speakers emit identical 500 Hz sound waves. A listener stands equidistant from both speakers (\\(\\Delta x = 0\\)). The phase difference is \\(\\Delta\\phi = 0\\): perfectly constructive. The sound is louder (doubled amplitude, quadrupled intensity).</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Energy conservation</div>
<div class="env-body">
<p>If constructive interference produces 4 times the energy at some points, destructive interference must produce zero energy at others, so the total energy is conserved. Interference does not create or destroy energy; it redistributes it.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Two waves of amplitude 5 cm interfere constructively. What is the resultant amplitude?',
                        hint: 'In perfect constructive interference, amplitudes add.',
                        solution: 'Resultant amplitude = \\(5 + 5 = 10\\,\\text{cm}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 2: Destructive Interference
            // ============================================================
            {
                id: 'destructive',
                title: 'Destructive Interference',
                content: `
<h2>Adding Out of Step</h2>

<p>When two waves arrive <strong>completely out of phase</strong> (crest meets trough), their displacements cancel. This is <strong>destructive interference</strong>.</p>

<div class="env-block definition">
<div class="env-title">Definition: Destructive Interference</div>
<div class="env-body">
<p><strong>Destructive interference</strong> occurs when two waves combine to produce a resultant wave with an amplitude <em>less</em> than the larger individual wave. Complete cancellation occurs when the phase difference is:</p>
\\[\\Delta\\phi = \\pi, \\; 3\\pi, \\; 5\\pi, \\ldots = (2n+1)\\pi \\quad (n = 0, 1, 2, \\ldots)\\]
<p>Equivalently, the path difference is an odd multiple of half a wavelength:</p>
\\[\\Delta x = \\frac{\\lambda}{2}, \\; \\frac{3\\lambda}{2}, \\; \\frac{5\\lambda}{2}, \\ldots = \\left(n + \\tfrac{1}{2}\\right)\\lambda\\]
</div>
</div>

<p>For two waves of equal amplitude \\(A\\), complete destructive interference produces zero displacement. The energy is not lost; it is redirected to points where constructive interference occurs.</p>

<div class="env-block example">
<div class="env-title">Example: Noise-Cancelling Headphones</div>
<div class="env-body">
<p>Active noise-cancelling headphones record ambient noise with a microphone, invert the signal (shift by \\(\\pi\\)), and play it through the speaker. The inverted sound wave destructively interferes with the incoming noise, producing near-silence. This works best for low-frequency, steady sounds.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Partial interference</div>
<div class="env-body">
<p>Most of the time, waves are neither perfectly in phase nor perfectly out of phase. The result is <em>partial</em> constructive or destructive interference. The resultant amplitude for two equal-amplitude waves is \\(2A|\\cos(\\Delta\\phi/2)|\\), which varies continuously from \\(0\\) to \\(2A\\).</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Two waves of equal amplitude meet with a phase difference of \\(2\\pi/3\\). Is the interference constructive, destructive, or partial? Find the resultant amplitude in terms of \\(A\\).',
                        hint: 'Use the formula \\(A_{\\text{result}} = 2A|\\cos(\\Delta\\phi/2)|\\).',
                        solution: '\\(A_{\\text{result}} = 2A|\\cos(\\pi/3)| = 2A \\times 0.5 = A\\). The resultant amplitude equals one individual amplitude; this is partial constructive interference.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Two-Source Interference Pattern
            // ============================================================
            {
                id: 'two-source-pattern',
                title: 'Two-Source Interference Pattern',
                content: `
<h2>The Ripple Tank Experiment</h2>

<p>Place two point sources of waves side by side in a water tank, both emitting waves of the same frequency and in phase. The overlapping circular wavefronts create a striking pattern of alternating bright (constructive) and dark (destructive) regions.</p>

<p>At some points, a crest from source 1 always arrives with a crest from source 2: constructive interference, large oscillation. At other points, a crest always arrives with a trough: destructive interference, stillness. The result is a pattern of <strong>antinodal lines</strong> (constructive) and <strong>nodal lines</strong> (destructive) radiating out from the two sources.</p>

<div class="env-block theorem">
<div class="env-title">Condition for Two-Source Maxima and Minima</div>
<div class="env-body">
<p>For two coherent point sources separated by distance \\(d\\), emitting waves of wavelength \\(\\lambda\\):</p>
<ul>
<li><strong>Constructive (bright)</strong>: path difference \\(= n\\lambda\\), where \\(n = 0, \\pm 1, \\pm 2, \\ldots\\)</li>
<li><strong>Destructive (dark)</strong>: path difference \\(= (n + \\frac{1}{2})\\lambda\\)</li>
</ul>
</div>
</div>

<p>The central antinodal line (\\(n=0\\)) lies on the perpendicular bisector of the line joining the two sources (equal path lengths). Higher-order lines fan out on either side at increasingly steep angles.</p>

<div class="viz-placeholder" data-viz="viz-two-source"></div>
`,
                visualizations: [
                    {
                        id: 'viz-two-source',
                        title: 'Two-Source Interference: Ripple Pattern',
                        description: 'Two point sources emit circular waves in phase. The color shows the <strong>instantaneous displacement</strong>: bright = crest, dark = trough. Regions of permanent stillness (nodes) form clear lines. Adjust the wavelength and source separation to see how the pattern changes.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var lambda = 40;
                            var sep = 120;
                            var t0 = performance.now();
                            var speed = 120;

                            VizEngine.createSlider(controls, '\u03bb (px)', 15, 80, lambda, 1, function (v) { lambda = v; });
                            VizEngine.createSlider(controls, 'Separation', 40, 250, sep, 5, function (v) { sep = v; });

                            // Pre-create ImageData for pixel manipulation
                            var imgData = ctx.createImageData(w, h);
                            var data = imgData.data;

                            function draw(now) {
                                var t = (now - t0) / 1000;
                                var k = 2 * Math.PI / lambda;
                                var omega = speed * k;

                                var cx = w / 2;
                                var cy = h / 2;
                                var s1x = cx - sep / 2;
                                var s1y = cy;
                                var s2x = cx + sep / 2;
                                var s2y = cy;

                                // Render interference pattern pixel by pixel
                                for (var py = 0; py < h; py += 2) {
                                    for (var px = 0; px < w; px += 2) {
                                        var dx1 = px - s1x;
                                        var dy1 = py - s1y;
                                        var r1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
                                        var dx2 = px - s2x;
                                        var dy2 = py - s2y;
                                        var r2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                                        // Displacement from each source (with 1/sqrt(r) falloff for 2D)
                                        var att1 = r1 > 3 ? 1 / Math.sqrt(r1) : 1;
                                        var att2 = r2 > 3 ? 1 / Math.sqrt(r2) : 1;
                                        var wave = att1 * Math.sin(k * r1 - omega * t) + att2 * Math.sin(k * r2 - omega * t);

                                        // Map to color: blue-white-red (displacement-based)
                                        var norm = wave / 2;
                                        var rr, gg, bb;
                                        if (norm > 0) {
                                            rr = Math.floor(20 + 200 * norm);
                                            gg = Math.floor(60 + 150 * norm);
                                            bb = Math.floor(120 + 135 * norm);
                                        } else {
                                            var absN = -norm;
                                            rr = Math.floor(20 + 80 * absN);
                                            gg = Math.floor(15 + 20 * absN);
                                            bb = Math.floor(60 + 60 * absN);
                                        }
                                        rr = VizEngine.clamp(rr, 0, 255);
                                        gg = VizEngine.clamp(gg, 0, 255);
                                        bb = VizEngine.clamp(bb, 0, 255);

                                        // Fill 2x2 block
                                        for (var dy = 0; dy < 2 && py + dy < h; dy++) {
                                            for (var dx = 0; dx < 2 && px + dx < w; dx++) {
                                                var idx = ((py + dy) * w + (px + dx)) * 4;
                                                data[idx] = rr;
                                                data[idx + 1] = gg;
                                                data[idx + 2] = bb;
                                                data[idx + 3] = 255;
                                            }
                                        }
                                    }
                                }
                                ctx.putImageData(imgData, 0, 0);

                                // Source markers
                                ctx.fillStyle = viz.colors.white;
                                ctx.beginPath(); ctx.arc(s1x, s1y, 5, 0, Math.PI * 2); ctx.fill();
                                ctx.beginPath(); ctx.arc(s2x, s2y, 5, 0, Math.PI * 2); ctx.fill();

                                // Glow around sources
                                ctx.save();
                                ctx.shadowColor = viz.colors.cyan; ctx.shadowBlur = 15;
                                ctx.fillStyle = viz.colors.cyan;
                                ctx.beginPath(); ctx.arc(s1x, s1y, 3, 0, Math.PI * 2); ctx.fill();
                                ctx.beginPath(); ctx.arc(s2x, s2y, 3, 0, Math.PI * 2); ctx.fill();
                                ctx.restore();

                                // Labels
                                viz.screenText('S\u2081', s1x, s1y - 14, viz.colors.white, 12);
                                viz.screenText('S\u2082', s2x, s2y - 14, viz.colors.white, 12);
                                viz.screenText('\u03bb = ' + lambda.toFixed(0) + ' px   d = ' + sep.toFixed(0) + ' px', w / 2, h - 12, viz.colors.white, 11);
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Two coherent sources are separated by 3 m, emitting sound waves of wavelength 0.5 m. How many nodal (destructive) lines exist between the two sources?',
                        hint: 'Count the number of times the path difference equals a half-integer multiple of \\(\\lambda\\) as you sweep from one source to the other.',
                        solution: 'The maximum path difference equals the source separation: \\(d = 3\\,\\text{m}\\). For destructive interference, \\(\\Delta x = (n+1/2)\\lambda\\). The largest \\(n\\) satisfying \\((n+1/2)(0.5) \\le 3\\) is \\(n = 5\\): \\((5.5)(0.5) = 2.75 < 3\\). So \\(n = 0,1,2,3,4,5\\) gives 6 nodal lines on each side, for 12 total, but the ones symmetric about the center line should be counted once each. More carefully: there are 11 nodal lines (the pattern is symmetric, with destructive lines at path differences \\(\\pm 0.25, \\pm 0.75, \\pm 1.25, \\pm 1.75, \\pm 2.25, \\pm 2.75\\,\\text{m}\\)), giving 12 nodal lines.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Path Difference
            // ============================================================
            {
                id: 'path-difference',
                title: 'Path Difference',
                content: `
<h2>The Geometry Behind Interference</h2>

<p>Whether interference is constructive or destructive at a given point depends on a single number: the <strong>path difference</strong>, which is the difference in distance from that point to the two sources.</p>

<div class="env-block definition">
<div class="env-title">Definition: Path Difference</div>
<div class="env-body">
<p>If point P is a distance \\(r_1\\) from source 1 and \\(r_2\\) from source 2, the <strong>path difference</strong> is:</p>
\\[\\Delta x = r_2 - r_1\\]
</div>
</div>

<p>The path difference determines the phase difference (for two sources emitting in phase):</p>
\\[\\Delta\\phi = \\frac{2\\pi}{\\lambda}\\,\\Delta x\\]

<p>So the interference conditions can be stated either in terms of \\(\\Delta\\phi\\) or \\(\\Delta x\\):</p>

<table style="width:100%; margin:1em 0; border-collapse:collapse;">
<tr style="border-bottom:1px solid #333;"><th style="padding:6px 12px; text-align:left;">Condition</th><th style="padding:6px 12px;">Path difference \\(\\Delta x\\)</th><th style="padding:6px 12px;">Phase difference \\(\\Delta\\phi\\)</th></tr>
<tr style="border-bottom:1px solid #222;"><td style="padding:6px 12px;">Constructive</td><td style="padding:6px 12px; text-align:center;">\\(n\\lambda\\)</td><td style="padding:6px 12px; text-align:center;">\\(2n\\pi\\)</td></tr>
<tr><td style="padding:6px 12px;">Destructive</td><td style="padding:6px 12px; text-align:center;">\\((n+\\frac{1}{2})\\lambda\\)</td><td style="padding:6px 12px; text-align:center;">\\((2n+1)\\pi\\)</td></tr>
</table>

<div class="env-block example">
<div class="env-title">Example: Where Is It Quiet?</div>
<div class="env-body">
<p>Two speakers emit 680 Hz sound in phase. They are 4 m apart. A microphone is placed 3 m from speaker 1 and 5 m from speaker 2. Is the interference constructive or destructive? (Speed of sound = 340 m/s.)</p>
<p><strong>Solution:</strong> \\(\\lambda = v/f = 340/680 = 0.5\\,\\text{m}\\). Path difference: \\(\\Delta x = 5 - 3 = 2\\,\\text{m} = 4\\lambda\\). Since \\(4\\lambda\\) is an integer multiple of \\(\\lambda\\), the interference is <strong>constructive</strong>.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Far-field approximation</div>
<div class="env-body">
<p>When the observation point is very far compared to the source separation (\\(r \\gg d\\)), the path difference simplifies to \\(\\Delta x \\approx d\\sin\\theta\\), where \\(\\theta\\) is the angle from the perpendicular bisector. This approximation is the basis for the analysis of Young's double-slit experiment in Chapter 13.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Two in-phase sources emit waves of wavelength 2 m. Point P is 7 m from source 1 and 10 m from source 2. Determine the type of interference at P.',
                        hint: 'Find \\(\\Delta x\\) and express it as a multiple of \\(\\lambda\\).',
                        solution: '\\(\\Delta x = 10 - 7 = 3\\,\\text{m} = 1.5\\lambda\\). Since \\(1.5\\lambda = (1 + 1/2)\\lambda\\), this is an odd half-integer multiple of \\(\\lambda\\): <strong>destructive interference</strong>.'
                    },
                    {
                        question: 'Two sources separated by 0.6 m emit waves of wavelength \\(\\lambda\\). For what values of \\(\\lambda\\) will there be NO destructive interference anywhere beyond the sources?',
                        hint: 'Destructive interference requires \\(\\Delta x = (n+1/2)\\lambda\\). The maximum possible \\(\\Delta x\\) is the source separation \\(d\\). For no destructive node, the minimum destructive path difference \\(\\lambda/2\\) must exceed \\(d\\).',
                        solution: 'The minimum path difference for destructive interference is \\(\\lambda/2\\). If \\(\\lambda/2 > d\\), then \\(\\lambda > 2d = 1.2\\,\\text{m}\\). For \\(\\lambda > 1.2\\,\\text{m}\\), no point has a path difference large enough for destructive interference.'
                    }
                ]
            }
        ]
    });
})();
