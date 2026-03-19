// === Chapter 8: Refraction & Snell's Law ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch08',
        number: 8,
        title: "Refraction & Snell's Law",
        subtitle: 'Why light bends when it changes medium',
        file: 'ch08-refraction',

        sections: [
            // ============================================================
            // Section 0: Why Light Bends
            // ============================================================
            {
                id: 'why-light-bends',
                title: 'Why Light Bends',
                content: `
<h2>The Wavefront Explanation</h2>

<p>When light crosses the boundary between two transparent materials (say, air and glass), it changes direction. This bending is called <strong>refraction</strong>. But why does it happen?</p>

<p>The answer lies in the fact that light travels at different speeds in different media. In vacuum, light moves at \\(c = 3.00 \\times 10^8\\,\\text{m/s}\\). In glass, it is slower: roughly \\(2 \\times 10^8\\,\\text{m/s}\\). In water, about \\(2.25 \\times 10^8\\,\\text{m/s}\\).</p>

<div class="env-block intuition">
<div class="env-title">The marching band analogy</div>
<div class="env-body">
<p>Imagine a line of marchers moving at an angle from pavement onto mud. The marchers who reach the mud first slow down, while those still on pavement maintain their speed. The result: the line of marchers pivots, changing direction. The same thing happens to a wavefront of light entering a slower medium at an angle. The part of the wavefront that enters first slows down, the rest catches up at the original speed, and the wavefront pivots toward the normal.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-wavefront-refraction"></div>

<div class="env-block definition">
<div class="env-title">Definition: Refraction</div>
<div class="env-body">
<p><strong>Refraction</strong> is the change in direction of a wave as it passes from one medium to another, caused by a change in wave speed. The wave bends <strong>toward</strong> the normal when entering a slower medium and <strong>away</strong> from the normal when entering a faster medium.</p>
</div>
</div>

<p>Key observations:</p>
<ul>
<li>If light enters perpendicular to the surface (along the normal), it does not bend, even though it slows down.</li>
<li>The frequency of the wave does not change at the boundary (the oscillations on one side must match those on the other). Since \\(v = f\\lambda\\) and \\(v\\) changes but \\(f\\) does not, the <strong>wavelength</strong> changes.</li>
<li>In a slower medium, the wavelength is shorter: \\(\\lambda_{\\text{medium}} = \\lambda_{\\text{vacuum}} / n\\).</li>
</ul>
`,
                visualizations: [
                    {
                        id: 'viz-wavefront-refraction',
                        title: 'Wavefronts Bending at an Interface',
                        description: 'Watch plane wavefronts cross from one medium (top, fast) to another (bottom, slow). The part of the wavefront that enters the slower medium first compresses and slows down, causing the wavefront to pivot. Adjust the indices of refraction and the incidence angle.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var n1 = 1.0, n2 = 1.5;
                            var angleInDeg = 40;
                            var t = 0;

                            VizEngine.createSlider(controls, 'n\u2081 (top medium)', 1.0, 2.5, n1, 0.05, function (v) { n1 = v; });
                            VizEngine.createSlider(controls, 'n\u2082 (bottom medium)', 1.0, 2.5, n2, 0.05, function (v) { n2 = v; });
                            VizEngine.createSlider(controls, 'Angle of incidence (\u00B0)', 5, 80, angleInDeg, 1, function (v) { angleInDeg = v; });

                            var interfaceY = h * 0.45;

                            function draw() {
                                t += 1 / 60;
                                viz.clear();

                                var theta1 = angleInDeg * Math.PI / 180;
                                // Snell's law
                                var sinTheta2 = n1 * Math.sin(theta1) / n2;
                                var totalReflection = sinTheta2 > 1;
                                var theta2 = totalReflection ? Math.PI / 2 : Math.asin(sinTheta2);

                                // Draw media backgrounds
                                ctx.fillStyle = 'rgba(88,166,255,0.06)';
                                ctx.fillRect(0, 0, w, interfaceY);
                                ctx.fillStyle = 'rgba(63,185,80,0.06)';
                                ctx.fillRect(0, interfaceY, w, h - interfaceY);

                                // Interface line
                                ctx.strokeStyle = viz.colors.white;
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(0, interfaceY); ctx.lineTo(w, interfaceY); ctx.stroke();

                                // Labels
                                viz.screenText('n\u2081 = ' + n1.toFixed(2), 60, 25, viz.colors.blue, 13, 'center', 'top');
                                viz.screenText('(faster)', 60, 42, viz.colors.text, 10, 'center', 'top');
                                viz.screenText('n\u2082 = ' + n2.toFixed(2), 60, interfaceY + 15, viz.colors.green, 13, 'center', 'top');
                                viz.screenText('(slower)', 60, interfaceY + 32, viz.colors.text, 10, 'center', 'top');

                                // Normal (dashed vertical at hit point)
                                var hitX = w * 0.45;
                                ctx.strokeStyle = viz.colors.text;
                                ctx.lineWidth = 1;
                                ctx.setLineDash([5, 4]);
                                ctx.beginPath(); ctx.moveTo(hitX, 10); ctx.lineTo(hitX, h - 10); ctx.stroke();
                                ctx.setLineDash([]);
                                viz.screenText('normal', hitX + 5, 14, viz.colors.text, 9, 'left', 'top');

                                // Speeds
                                var v1 = 3e8 / n1;
                                var v2 = 3e8 / n2;

                                // Draw wavefronts in medium 1 (above interface)
                                // Direction of propagation makes angle theta1 with normal (downward)
                                // Propagation direction: (sin(theta1), cos(theta1)) in (right, down)
                                var propX1 = Math.sin(theta1);
                                var propY1 = Math.cos(theta1);
                                // Wavefront perpendicular to propagation
                                var wfX1 = propY1;  // perpendicular
                                var wfY1 = -propX1;

                                var speed1 = 80 / n1; // visual speed (pixels per second)
                                var lambda1 = speed1 / 3; // visual wavelength
                                var speed2 = 80 / n2;
                                var lambda2 = speed2 / 3;

                                // Draw wavefronts in upper medium
                                var numWF = 20;
                                for (var i = -numWF; i <= numWF; i++) {
                                    var phase = (i * lambda1 - speed1 * t) % (lambda1 * numWF);
                                    // Wavefront line: center at hitX, interfaceY, offset along propagation direction
                                    var cx = hitX + propX1 * phase;
                                    var cy = interfaceY - propY1 * phase;
                                    // Only draw above interface
                                    if (cy > interfaceY + 5 || cy < -100) continue;

                                    // Wavefront line endpoints
                                    var halfLen = 300;
                                    var x1 = cx - wfX1 * halfLen;
                                    var y1 = cy - wfY1 * halfLen;
                                    var x2 = cx + wfX1 * halfLen;
                                    var y2 = cy + wfY1 * halfLen;

                                    // Clip to above interface
                                    ctx.save();
                                    ctx.beginPath();
                                    ctx.rect(0, 0, w, interfaceY);
                                    ctx.clip();

                                    var alpha = 0.15 + 0.15 * Math.cos(2 * Math.PI * phase / lambda1);
                                    ctx.strokeStyle = 'rgba(88,166,255,' + alpha + ')';
                                    ctx.lineWidth = 2;
                                    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
                                    ctx.restore();
                                }

                                // Draw wavefronts in lower medium (refracted)
                                if (!totalReflection) {
                                    var propX2 = Math.sin(theta2);
                                    var propY2 = Math.cos(theta2);
                                    var wfX2 = propY2;
                                    var wfY2 = -propX2;

                                    for (var j = -numWF; j <= numWF; j++) {
                                        var phase2 = (j * lambda2 - speed2 * t) % (lambda2 * numWF);
                                        var cx2 = hitX + propX2 * phase2;
                                        var cy2 = interfaceY + propY2 * phase2;
                                        if (cy2 < interfaceY - 5 || cy2 > h + 100) continue;

                                        var halfLen2 = 300;
                                        var bx1 = cx2 - wfX2 * halfLen2;
                                        var by1 = cy2 - wfY2 * halfLen2;
                                        var bx2 = cx2 + wfX2 * halfLen2;
                                        var by2 = cy2 + wfY2 * halfLen2;

                                        ctx.save();
                                        ctx.beginPath();
                                        ctx.rect(0, interfaceY, w, h - interfaceY);
                                        ctx.clip();

                                        var alpha2 = 0.15 + 0.15 * Math.cos(2 * Math.PI * phase2 / lambda2);
                                        ctx.strokeStyle = 'rgba(63,185,80,' + alpha2 + ')';
                                        ctx.lineWidth = 2;
                                        ctx.beginPath(); ctx.moveTo(bx1, by1); ctx.lineTo(bx2, by2); ctx.stroke();
                                        ctx.restore();
                                    }
                                }

                                // Draw incident ray
                                var rayLen = 250;
                                var incStartX = hitX - propX1 * rayLen;
                                var incStartY = interfaceY - propY1 * (-rayLen);
                                ctx.save();
                                ctx.shadowColor = viz.colors.gold;
                                ctx.shadowBlur = 6;
                                ctx.strokeStyle = viz.colors.gold;
                                ctx.lineWidth = 2.5;
                                // Clip to upper region
                                ctx.beginPath();
                                ctx.rect(0, 0, w, interfaceY + 1);
                                ctx.clip();
                                ctx.beginPath();
                                ctx.moveTo(hitX - propX1 * rayLen, interfaceY + propY1 * rayLen);
                                ctx.lineTo(hitX, interfaceY);
                                ctx.stroke();
                                ctx.restore();

                                // Draw refracted ray
                                if (!totalReflection) {
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.orange;
                                    ctx.shadowBlur = 6;
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.lineWidth = 2.5;
                                    ctx.beginPath();
                                    ctx.rect(0, interfaceY - 1, w, h - interfaceY + 1);
                                    ctx.clip();
                                    ctx.beginPath();
                                    ctx.moveTo(hitX, interfaceY);
                                    ctx.lineTo(hitX + propX2 * rayLen, interfaceY + propY2 * rayLen);
                                    ctx.stroke();
                                    ctx.restore();
                                }

                                // Hit point
                                ctx.fillStyle = viz.colors.white;
                                ctx.beginPath(); ctx.arc(hitX, interfaceY, 4, 0, Math.PI * 2); ctx.fill();

                                // Angle arcs
                                var arcR = 45;
                                // Incident angle (from normal upward to incident ray)
                                ctx.strokeStyle = viz.colors.gold;
                                ctx.lineWidth = 2;
                                var normAng = -Math.PI / 2; // upward
                                var incAng = -Math.PI / 2 - theta1; // incident ray direction upward-left
                                ctx.beginPath(); ctx.arc(hitX, interfaceY, arcR, Math.min(incAng, normAng), Math.max(incAng, normAng)); ctx.stroke();
                                viz.screenText('\u03B8\u2081=' + angleInDeg + '\u00B0', hitX - arcR - 30, interfaceY - 30, viz.colors.gold, 11, 'center', 'middle');

                                // Refracted angle
                                if (!totalReflection) {
                                    var refAng = Math.PI / 2 + theta2;
                                    var normAngDown = Math.PI / 2;
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.beginPath(); ctx.arc(hitX, interfaceY, arcR + 5, Math.min(normAngDown, refAng), Math.max(normAngDown, refAng)); ctx.stroke();
                                    var theta2Deg = (theta2 * 180 / Math.PI).toFixed(1);
                                    viz.screenText('\u03B8\u2082=' + theta2Deg + '\u00B0', hitX + arcR + 30, interfaceY + 35, viz.colors.orange, 11, 'center', 'middle');
                                }

                                if (totalReflection) {
                                    viz.screenText('TOTAL INTERNAL REFLECTION', w / 2, h - 30, viz.colors.red, 14);
                                }

                                // Wavelength comparison
                                var wlTop = 'Shorter \u03BB (closer wavefronts)';
                                var wlBot = 'Longer \u03BB (wider wavefronts)';
                                if (n2 > n1) {
                                    viz.screenText('\u03BB\u2082 < \u03BB\u2081 (compressed)', w - 15, interfaceY + 55, viz.colors.green, 10, 'right', 'top');
                                } else if (n2 < n1) {
                                    viz.screenText('\u03BB\u2082 > \u03BB\u2081 (stretched)', w - 15, interfaceY + 55, viz.colors.green, 10, 'right', 'top');
                                }

                                viz.screenText('Incident ray', w - 15, 15, viz.colors.gold, 11, 'right', 'top');
                                viz.screenText('Refracted ray', w - 15, 32, viz.colors.orange, 11, 'right', 'top');
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Light enters a glass block at an angle. It slows down inside the glass. Does the wavelength increase, decrease, or stay the same? What about the frequency?',
                        hint: 'Use \\(v = f\\lambda\\). What is forced to be continuous at the boundary?',
                        solution: 'The frequency stays the same (it is determined by the source and must be continuous at the boundary). Since \\(v\\) decreases and \\(f\\) is constant, \\(\\lambda = v/f\\) must decrease. The wavelength is shorter inside the glass.'
                    }
                ]
            },

            // ============================================================
            // Section 1: Snell's Law
            // ============================================================
            {
                id: 'snells-law',
                title: "Snell's Law",
                content: `
<h2>The Quantitative Law of Refraction</h2>

<p>The exact relationship between the angles was discovered experimentally by Willebrord Snellius in 1621 and can be derived from the wavefront argument:</p>

<div class="env-block theorem">
<div class="env-title">Snell's Law</div>
<div class="env-body">
\\[n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2\\]
<p>where \\(n_1\\) and \\(n_2\\) are the refractive indices of the two media, and \\(\\theta_1\\) and \\(\\theta_2\\) are the angles of incidence and refraction (both measured from the normal).</p>
</div>
</div>

<p>When light goes from a less dense medium (smaller \\(n\\)) to a denser medium (larger \\(n\\)), it bends <strong>toward</strong> the normal (\\(\\theta_2 < \\theta_1\\)). Going the other way, it bends <strong>away</strong> from the normal.</p>

<div class="viz-placeholder" data-viz="viz-snell-interactive"></div>

<div class="env-block example">
<div class="env-title">Example: Air to water</div>
<div class="env-body">
<p>Light hits a water surface at 45 degrees. Find the refraction angle. (\\(n_{\\text{air}} = 1.00\\), \\(n_{\\text{water}} = 1.33\\)).</p>
\\[\\sin\\theta_2 = \\frac{n_1}{n_2}\\sin\\theta_1 = \\frac{1.00}{1.33}\\sin 45° = \\frac{0.707}{1.33} = 0.532\\]
\\[\\theta_2 = \\arcsin(0.532) = 32.1°\\]
<p>The ray bends toward the normal as it enters the denser medium.</p>
</div>
</div>

<h3>Total internal reflection</h3>

<p>When light travels from a denser medium to a less dense one (\\(n_1 > n_2\\)), Snell's law gives \\(\\sin\\theta_2 = (n_1/n_2)\\sin\\theta_1\\). If \\(\\theta_1\\) is large enough, \\(\\sin\\theta_2\\) exceeds 1, which is impossible. At that point, no refracted ray exists; all the light is reflected back into the denser medium. This is <strong>total internal reflection</strong>.</p>

<div class="env-block theorem">
<div class="env-title">Critical angle</div>
<div class="env-body">
<p>Total internal reflection occurs when \\(\\theta_1 \\geq \\theta_c\\), where the <strong>critical angle</strong> is:</p>
\\[\\theta_c = \\arcsin\\!\\left(\\frac{n_2}{n_1}\\right)\\]
<p>This only applies when \\(n_1 > n_2\\) (light going from denser to less dense).</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Fibre optics</div>
<div class="env-body">
<p>Optical fibres work by total internal reflection. Light enters a glass core (\\(n \\approx 1.5\\)) surrounded by cladding with a slightly lower refractive index. As long as the light hits the core-cladding boundary at an angle greater than the critical angle, it bounces along the fibre with virtually no loss, carrying internet data across oceans.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-snell-interactive',
                        title: "Snell's Law: Adjustable Refraction",
                        description: 'Drag the angle slider to change the incidence angle. Adjust the refractive indices of both media. Watch the refracted ray respond according to Snell\'s law. Push the angle past the critical angle (when going from dense to less dense) to see total internal reflection.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var n1 = 1.0, n2 = 1.5;
                            var angleDeg = 35;

                            VizEngine.createSlider(controls, 'n\u2081 (upper)', 1.0, 2.5, n1, 0.05, function (v) { n1 = v; });
                            VizEngine.createSlider(controls, 'n\u2082 (lower)', 1.0, 2.5, n2, 0.05, function (v) { n2 = v; });
                            VizEngine.createSlider(controls, '\u03B8\u2081 (degrees)', 0, 89, angleDeg, 1, function (v) { angleDeg = v; });

                            var interfaceY = h * 0.48;
                            var hitX = w * 0.5;

                            function draw() {
                                viz.clear();

                                var theta1 = angleDeg * Math.PI / 180;
                                var sinT2 = n1 * Math.sin(theta1) / n2;
                                var tir = Math.abs(sinT2) > 1;
                                var theta2 = tir ? 0 : Math.asin(sinT2);
                                var critAngle = n1 > n2 ? Math.asin(n2 / n1) : null;

                                // Media
                                ctx.fillStyle = 'rgba(88,166,255,0.05)';
                                ctx.fillRect(0, 0, w, interfaceY);
                                ctx.fillStyle = 'rgba(63,185,80,0.05)';
                                ctx.fillRect(0, interfaceY, w, h - interfaceY);

                                // Interface
                                ctx.strokeStyle = viz.colors.white;
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(0, interfaceY); ctx.lineTo(w, interfaceY); ctx.stroke();

                                // Normal
                                ctx.strokeStyle = viz.colors.text + '88';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([5, 4]);
                                ctx.beginPath(); ctx.moveTo(hitX, 15); ctx.lineTo(hitX, h - 15); ctx.stroke();
                                ctx.setLineDash([]);

                                // Medium labels
                                viz.screenText('Medium 1: n\u2081 = ' + n1.toFixed(2), 80, 20, viz.colors.blue, 12, 'center', 'top');
                                viz.screenText('Medium 2: n\u2082 = ' + n2.toFixed(2), 80, interfaceY + 15, viz.colors.green, 12, 'center', 'top');

                                var rayLen = 200;

                                // Incident ray
                                var incDx = Math.sin(theta1);
                                var incDy = Math.cos(theta1);
                                ctx.save();
                                ctx.shadowColor = viz.colors.gold;
                                ctx.shadowBlur = 8;
                                ctx.strokeStyle = viz.colors.gold;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(hitX - incDx * rayLen, interfaceY - incDy * (-rayLen));
                                ctx.lineTo(hitX, interfaceY);
                                ctx.stroke();
                                // Arrow
                                var aMidX = hitX - incDx * rayLen * 0.4;
                                var aMidY = interfaceY + incDy * rayLen * 0.4;
                                var aAng = Math.atan2(interfaceY - aMidY, hitX - aMidX);
                                ctx.fillStyle = viz.colors.gold;
                                ctx.beginPath();
                                ctx.moveTo(aMidX + 10 * Math.cos(aAng), aMidY + 10 * Math.sin(aAng));
                                ctx.lineTo(aMidX - 8 * Math.cos(aAng - 0.4), aMidY - 8 * Math.sin(aAng - 0.4));
                                ctx.lineTo(aMidX - 8 * Math.cos(aAng + 0.4), aMidY - 8 * Math.sin(aAng + 0.4));
                                ctx.closePath(); ctx.fill();
                                ctx.restore();

                                // Refracted or reflected ray
                                if (!tir) {
                                    var refDx = Math.sin(theta2);
                                    var refDy = Math.cos(theta2);
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.orange;
                                    ctx.shadowBlur = 8;
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.lineWidth = 3;
                                    ctx.beginPath();
                                    ctx.moveTo(hitX, interfaceY);
                                    ctx.lineTo(hitX + refDx * rayLen, interfaceY + refDy * rayLen);
                                    ctx.stroke();
                                    // Arrow
                                    var rMidX = hitX + refDx * rayLen * 0.5;
                                    var rMidY = interfaceY + refDy * rayLen * 0.5;
                                    var rAng = Math.atan2(rMidY - interfaceY, rMidX - hitX);
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.beginPath();
                                    ctx.moveTo(rMidX + 10 * Math.cos(rAng), rMidY + 10 * Math.sin(rAng));
                                    ctx.lineTo(rMidX - 8 * Math.cos(rAng - 0.4), rMidY - 8 * Math.sin(rAng - 0.4));
                                    ctx.lineTo(rMidX - 8 * Math.cos(rAng + 0.4), rMidY - 8 * Math.sin(rAng + 0.4));
                                    ctx.closePath(); ctx.fill();
                                    ctx.restore();
                                }

                                // Reflected ray (always present, stronger at TIR)
                                var reflAlpha = tir ? 1.0 : 0.25;
                                var reflDx = Math.sin(theta1);
                                var reflDy = -Math.cos(theta1); // upward
                                ctx.save();
                                ctx.globalAlpha = reflAlpha;
                                ctx.shadowColor = viz.colors.cyan;
                                ctx.shadowBlur = tir ? 10 : 3;
                                ctx.strokeStyle = viz.colors.cyan;
                                ctx.lineWidth = tir ? 3 : 1.5;
                                ctx.beginPath();
                                ctx.moveTo(hitX, interfaceY);
                                ctx.lineTo(hitX + reflDx * rayLen, interfaceY + reflDy * rayLen);
                                ctx.stroke();
                                ctx.restore();

                                // Hit point
                                ctx.fillStyle = viz.colors.white;
                                ctx.beginPath(); ctx.arc(hitX, interfaceY, 4, 0, Math.PI * 2); ctx.fill();

                                // Angle arcs
                                var arcR = 50;
                                ctx.strokeStyle = viz.colors.gold;
                                ctx.lineWidth = 2;
                                var nUp = -Math.PI / 2;
                                var incScreenAng = nUp - theta1;
                                ctx.beginPath(); ctx.arc(hitX, interfaceY, arcR, Math.min(incScreenAng, nUp), Math.max(incScreenAng, nUp)); ctx.stroke();

                                if (!tir) {
                                    ctx.strokeStyle = viz.colors.orange;
                                    var nDown = Math.PI / 2;
                                    var refScreenAng = nDown + theta2;
                                    ctx.beginPath(); ctx.arc(hitX, interfaceY, arcR + 5, Math.min(nDown, refScreenAng), Math.max(nDown, refScreenAng)); ctx.stroke();
                                }

                                // Angle labels
                                viz.screenText('\u03B8\u2081 = ' + angleDeg + '\u00B0', hitX - 90, interfaceY - 50, viz.colors.gold, 12);
                                if (!tir) {
                                    var t2Deg = (theta2 * 180 / Math.PI).toFixed(1);
                                    viz.screenText('\u03B8\u2082 = ' + t2Deg + '\u00B0', hitX + 60, interfaceY + 50, viz.colors.orange, 12);
                                }

                                // Snell's law display
                                var snellLeft = (n1 * Math.sin(theta1)).toFixed(3);
                                var snellRight = tir ? 'N/A' : (n2 * Math.sin(theta2)).toFixed(3);
                                viz.screenText("Snell's law: n\u2081 sin\u03B8\u2081 = n\u2082 sin\u03B8\u2082", w / 2, h - 45, viz.colors.white, 13);
                                viz.screenText(n1.toFixed(2) + ' \u00D7 sin(' + angleDeg + '\u00B0) = ' + snellLeft, w / 2, h - 28, viz.colors.gold, 11);

                                if (tir) {
                                    viz.screenText('TOTAL INTERNAL REFLECTION', w / 2, h - 10, viz.colors.red, 13);
                                    if (critAngle !== null) {
                                        viz.screenText('\u03B8_c = ' + (critAngle * 180 / Math.PI).toFixed(1) + '\u00B0', w / 2, interfaceY - 80, viz.colors.red, 12);
                                    }
                                } else {
                                    viz.screenText(n2.toFixed(2) + ' \u00D7 sin(' + t2Deg + '\u00B0) = ' + snellRight, w / 2, h - 10, viz.colors.orange, 11);
                                }

                                // Critical angle indicator (if applicable)
                                if (critAngle !== null && !tir) {
                                    viz.screenText('\u03B8_c = ' + (critAngle * 180 / Math.PI).toFixed(1) + '\u00B0', w - 15, interfaceY - 15, viz.colors.red, 10, 'right', 'bottom');
                                }

                                // Legend
                                viz.screenText('Incident', w - 15, 15, viz.colors.gold, 11, 'right', 'top');
                                viz.screenText('Refracted', w - 15, 30, viz.colors.orange, 11, 'right', 'top');
                                viz.screenText('Reflected', w - 15, 45, viz.colors.cyan, 11, 'right', 'top');
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A light ray passes from glass (\\(n = 1.50\\)) into water (\\(n = 1.33\\)) at an angle of incidence of 40 degrees. Find the angle of refraction.',
                        hint: 'Apply Snell\'s law: \\(n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2\\).',
                        solution: '\\(\\sin\\theta_2 = \\frac{1.50}{1.33}\\sin 40° = 1.128 \\times 0.643 = 0.725\\). \\(\\theta_2 = \\arcsin(0.725) = 46.5°\\). The ray bends away from the normal as it enters the less dense medium.'
                    },
                    {
                        question: 'What is the critical angle for light going from glass (\\(n = 1.50\\)) to air (\\(n = 1.00\\))?',
                        hint: 'Use \\(\\theta_c = \\arcsin(n_2/n_1)\\).',
                        solution: '\\(\\theta_c = \\arcsin(1.00/1.50) = \\arcsin(0.667) = 41.8°\\). Any ray hitting the glass-air boundary at more than 41.8 degrees from the normal will be totally internally reflected.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Index of Refraction
            // ============================================================
            {
                id: 'index-of-refraction',
                title: 'Index of Refraction',
                content: `
<h2>Measuring How Much a Medium Slows Light</h2>

<div class="env-block definition">
<div class="env-title">Definition: Index of Refraction</div>
<div class="env-body">
<p>The <strong>index of refraction</strong> (or refractive index) of a medium is:</p>
\\[n = \\frac{c}{v}\\]
<p>where \\(c = 3.00 \\times 10^8\\,\\text{m/s}\\) is the speed of light in vacuum and \\(v\\) is the speed of light in the medium. Since light always travels slower in matter than in vacuum, \\(n \\geq 1\\).</p>
</div>
</div>

<p>Some representative values:</p>
<table style="width:100%;border-collapse:collapse;">
<tr style="border-bottom:1px solid #30363d;"><th style="text-align:left;padding:4px;">Material</th><th style="text-align:right;padding:4px;">\\(n\\)</th></tr>
<tr><td style="padding:4px;">Vacuum</td><td style="text-align:right;padding:4px;">1.000</td></tr>
<tr><td style="padding:4px;">Air</td><td style="text-align:right;padding:4px;">1.0003</td></tr>
<tr><td style="padding:4px;">Water</td><td style="text-align:right;padding:4px;">1.333</td></tr>
<tr><td style="padding:4px;">Glass (typical)</td><td style="text-align:right;padding:4px;">1.5</td></tr>
<tr><td style="padding:4px;">Diamond</td><td style="text-align:right;padding:4px;">2.42</td></tr>
</table>

<div class="env-block remark">
<div class="env-title">Why diamond sparkles</div>
<div class="env-body">
<p>Diamond has a very high refractive index (2.42), which gives it a small critical angle: \\(\\theta_c = \\arcsin(1/2.42) \\approx 24.4°\\). Light entering a well-cut diamond undergoes multiple total internal reflections before exiting, spending a long time bouncing around inside. Combined with strong dispersion (different wavelengths refract by different amounts), this produces the brilliant "fire" that makes diamonds so prized.</p>
</div>
</div>

<h3>Dispersion</h3>

<p>The refractive index depends slightly on wavelength (colour). Blue light has a higher \\(n\\) than red light in most materials, so blue bends more than red. This is <strong>dispersion</strong>, and it is what causes a prism to split white light into a rainbow of colours.</p>

<div class="env-block example">
<div class="env-title">Example: Speed of light in diamond</div>
<div class="env-body">
\\[v = \\frac{c}{n} = \\frac{3.00 \\times 10^8}{2.42} = 1.24 \\times 10^8\\,\\text{m/s}\\]
<p>Light in diamond moves at only about 41% of its vacuum speed.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Light travels at \\(2.25 \\times 10^8\\,\\text{m/s}\\) in a certain liquid. What is its index of refraction?',
                        hint: 'Use \\(n = c/v\\).',
                        solution: '\\(n = (3.00 \\times 10^8) / (2.25 \\times 10^8) = 1.33\\). This is water.'
                    },
                    {
                        question: 'The refractive index of glass for red light is 1.510 and for violet light is 1.530. A white light ray enters the glass at 30 degrees. Find the angular separation between red and violet inside the glass.',
                        hint: 'Apply Snell\'s law separately for each colour.',
                        solution: '\\(\\sin\\theta_r = \\sin 30° / 1.510 = 0.3311\\), so \\(\\theta_r = 19.33°\\). \\(\\sin\\theta_v = \\sin 30° / 1.530 = 0.3268\\), so \\(\\theta_v = 19.07°\\). Angular separation = \\(19.33° - 19.07° = 0.26°\\). Small, but enough for a prism to visibly split the spectrum.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Apparent Depth
            // ============================================================
            {
                id: 'apparent-depth',
                title: 'Apparent Depth',
                content: `
<h2>Why the Pool Looks Shallower Than It Is</h2>

<p>When you look into a swimming pool, the bottom appears closer than it really is. A coin at the bottom of a glass of water seems to float partway up. This is because light refracting at the water-air surface bends away from the normal, and your brain traces the rays back in straight lines, placing the object at a shallower (apparent) depth.</p>

<div class="env-block theorem">
<div class="env-title">Apparent depth formula</div>
<div class="env-body">
<p>For an object at real depth \\(d\\) below a flat surface of a medium with index \\(n\\), viewed from directly above:</p>
\\[d_{\\text{apparent}} = \\frac{d}{n}\\]
<p>This approximation holds for rays close to the normal (small viewing angles).</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-apparent-depth"></div>

<div class="env-block example">
<div class="env-title">Example: Coin in a glass of water</div>
<div class="env-body">
<p>A coin sits at the bottom of a glass filled with 12 cm of water (\\(n = 1.33\\)). When viewed from above, it appears to be at:</p>
\\[d_{\\text{apparent}} = \\frac{12}{1.33} = 9.0\\,\\text{cm}\\]
<p>The coin appears 3 cm higher than it actually is.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Danger for swimmers and divers</div>
<div class="env-body">
<p>Because water makes pools appear shallower, people sometimes misjudge depth and dive into water that is too shallow. A pool that looks 1.5 m deep might actually be 2 m deep, but conversely, a pool with a real depth of 1.5 m looks only about 1.1 m deep from above, making it seem even more inviting for a dive. Always check posted depth markers.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Derivation sketch</div>
<div class="env-body">
<p>A ray from the coin hits the water-air surface at small angle \\(\\theta_1\\) from the normal. It refracts outward to \\(\\theta_2\\) where \\(n\\sin\\theta_1 = \\sin\\theta_2\\). For small angles, \\(\\sin\\theta \\approx \\tan\\theta\\), and tracing the refracted ray backward gives an apparent depth of \\(d/n\\). The geometry is straightforward once you draw the diagram.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-apparent-depth',
                        title: 'Apparent Depth: Coin in Water',
                        description: 'A coin (gold) sits at the real depth on the bottom. Light rays from the coin refract at the water surface and reach the eye above. The dashed extensions show where the eye perceives the coin to be (apparent depth). Adjust the water depth and refractive index.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var realDepth = 4.0; // arbitrary units
                            var n = 1.33;

                            VizEngine.createSlider(controls, 'Real depth (units)', 1.0, 8.0, realDepth, 0.1, function (v) { realDepth = v; });
                            VizEngine.createSlider(controls, 'n (water)', 1.0, 2.5, n, 0.05, function (v) { n = v; });

                            // Layout
                            var surfaceY = h * 0.30;
                            var pxPerUnit = (h - surfaceY - 30) / 8.5;
                            var coinX = w * 0.45;

                            function draw() {
                                viz.clear();

                                var apparentDepth = realDepth / n;
                                var coinY = surfaceY + realDepth * pxPerUnit;
                                var apparentCoinY = surfaceY + apparentDepth * pxPerUnit;

                                // Air region
                                ctx.fillStyle = 'rgba(12,12,32,0.3)';
                                ctx.fillRect(0, 0, w, surfaceY);

                                // Water region
                                var waterGrad = ctx.createLinearGradient(0, surfaceY, 0, h);
                                waterGrad.addColorStop(0, 'rgba(0,100,180,0.15)');
                                waterGrad.addColorStop(1, 'rgba(0,50,120,0.25)');
                                ctx.fillStyle = waterGrad;
                                ctx.fillRect(0, surfaceY, w, h - surfaceY);

                                // Water surface (wavy)
                                ctx.strokeStyle = viz.colors.cyan;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var sx = 0; sx <= w; sx++) {
                                    var wy = surfaceY + 2 * Math.sin(sx * 0.03 + performance.now() * 0.002);
                                    if (sx === 0) ctx.moveTo(sx, wy);
                                    else ctx.lineTo(sx, wy);
                                }
                                ctx.stroke();

                                // Real coin
                                ctx.save();
                                ctx.shadowColor = viz.colors.gold;
                                ctx.shadowBlur = 10;
                                ctx.fillStyle = viz.colors.gold;
                                ctx.beginPath();
                                ctx.ellipse(coinX, coinY, 18, 6, 0, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.restore();
                                viz.screenText('Real coin', coinX + 30, coinY, viz.colors.gold, 11, 'left', 'middle');

                                // Apparent coin (dashed)
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.lineWidth = 2;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath();
                                ctx.ellipse(coinX, apparentCoinY, 18, 6, 0, 0, Math.PI * 2);
                                ctx.stroke();
                                ctx.setLineDash([]);
                                viz.screenText('Apparent coin', coinX + 30, apparentCoinY, viz.colors.purple, 11, 'left', 'middle');

                                // Eye above
                                var eyeX = coinX + 30;
                                var eyeY = 30;
                                // Draw simple eye
                                ctx.fillStyle = viz.colors.white;
                                ctx.beginPath();
                                ctx.ellipse(eyeX, eyeY, 12, 8, 0, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.fillStyle = viz.colors.blue;
                                ctx.beginPath();
                                ctx.arc(eyeX, eyeY, 4, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.fillStyle = '#000';
                                ctx.beginPath();
                                ctx.arc(eyeX, eyeY, 2, 0, Math.PI * 2);
                                ctx.fill();

                                // Rays from coin to surface, then to eye
                                var rays = [
                                    { exitX: coinX - 40 },
                                    { exitX: coinX },
                                    { exitX: coinX + 40 }
                                ];

                                for (var ri = 0; ri < rays.length; ri++) {
                                    var surfHitX = (coinX + rays[ri].exitX) / 2 + (rays[ri].exitX - coinX) * 0.3;
                                    // Ray in water: from coin to surface hit point
                                    var dx_w = surfHitX - coinX;
                                    var dy_w = surfaceY - coinY;
                                    var angle_w = Math.atan2(Math.abs(dx_w), Math.abs(dy_w));

                                    // Snell's law at surface
                                    var sinAir = n * Math.sin(angle_w);
                                    sinAir = Math.min(sinAir, 0.999);
                                    var angle_a = Math.asin(sinAir);

                                    // Ray in water (solid)
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.gold;
                                    ctx.shadowBlur = 3;
                                    ctx.strokeStyle = viz.colors.gold + 'bb';
                                    ctx.lineWidth = 1.8;
                                    ctx.beginPath();
                                    ctx.moveTo(coinX, coinY);
                                    ctx.lineTo(surfHitX, surfaceY);
                                    ctx.stroke();
                                    ctx.restore();

                                    // Ray in air (refracted, solid)
                                    var airDx = Math.sin(angle_a) * (dx_w > 0 ? 1 : -1);
                                    var airDy = -Math.cos(angle_a);
                                    var airLen = 200;
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.orange;
                                    ctx.shadowBlur = 3;
                                    ctx.strokeStyle = viz.colors.orange + 'bb';
                                    ctx.lineWidth = 1.8;
                                    ctx.beginPath();
                                    ctx.moveTo(surfHitX, surfaceY);
                                    ctx.lineTo(surfHitX + airDx * airLen, surfaceY + airDy * airLen);
                                    ctx.stroke();
                                    ctx.restore();

                                    // Virtual extension back into water (dashed, from surface hit to apparent coin)
                                    ctx.strokeStyle = viz.colors.purple + '66';
                                    ctx.lineWidth = 1.2;
                                    ctx.setLineDash([3, 4]);
                                    ctx.beginPath();
                                    ctx.moveTo(surfHitX, surfaceY);
                                    ctx.lineTo(coinX, apparentCoinY);
                                    ctx.stroke();
                                    ctx.setLineDash([]);
                                }

                                // Depth brackets
                                var bracketX = w - 60;
                                // Real depth
                                ctx.strokeStyle = viz.colors.gold;
                                ctx.lineWidth = 1.5;
                                ctx.beginPath(); ctx.moveTo(bracketX - 5, surfaceY); ctx.lineTo(bracketX + 5, surfaceY); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(bracketX - 5, coinY); ctx.lineTo(bracketX + 5, coinY); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(bracketX, surfaceY); ctx.lineTo(bracketX, coinY); ctx.stroke();
                                viz.screenText('d = ' + realDepth.toFixed(1), bracketX + 15, (surfaceY + coinY) / 2, viz.colors.gold, 11, 'left', 'middle');

                                // Apparent depth
                                var bracketX2 = bracketX - 40;
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.beginPath(); ctx.moveTo(bracketX2 - 5, surfaceY); ctx.lineTo(bracketX2 + 5, surfaceY); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(bracketX2 - 5, apparentCoinY); ctx.lineTo(bracketX2 + 5, apparentCoinY); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(bracketX2, surfaceY); ctx.lineTo(bracketX2, apparentCoinY); ctx.stroke();
                                viz.screenText('d/n = ' + apparentDepth.toFixed(1), bracketX2 - 8, (surfaceY + apparentCoinY) / 2, viz.colors.purple, 11, 'right', 'middle');

                                // Labels
                                viz.screenText('Air', 30, surfaceY - 15, viz.colors.text, 11, 'left', 'bottom');
                                viz.screenText('Water (n = ' + n.toFixed(2) + ')', 30, surfaceY + 15, viz.colors.cyan, 11, 'left', 'top');

                                // Formula
                                viz.screenText('d_apparent = d / n = ' + realDepth.toFixed(1) + ' / ' + n.toFixed(2) + ' = ' + apparentDepth.toFixed(1), w / 2, h - 12, viz.colors.white, 12);
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A fish is swimming 3 m below the surface of a lake. At what depth does it appear to be when viewed from directly above?',
                        hint: 'Use \\(d_{\\text{apparent}} = d/n\\) with \\(n = 1.33\\) for water.',
                        solution: '\\(d_{\\text{apparent}} = 3.0 / 1.33 = 2.26\\,\\text{m}\\). The fish appears to be about 2.26 m deep, roughly 75 cm shallower than its actual position.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Atmospheric Refraction
            // ============================================================
            {
                id: 'atmospheric-refraction',
                title: 'Atmospheric Refraction',
                content: `
<h2>When the Air Itself Bends Light</h2>

<p>The Earth's atmosphere is not a single uniform medium; its density (and therefore its refractive index) decreases with altitude. Near the ground, air is denser and has a slightly higher \\(n\\); at high altitude, \\(n\\) approaches 1. This gradient causes light to follow gently curved paths rather than straight lines.</p>

<h3>Seeing the Sun after it has set</h3>

<p>Atmospheric refraction bends sunlight around the Earth's curvature. When you watch the Sun set, the Sun's disk has actually already dipped below the geometric horizon by about 0.5 degrees. You see it because atmospheric refraction lifts the image. This effect adds roughly 2 minutes to the visible duration of daylight.</p>

<div class="env-block example">
<div class="env-title">Example: Sunset refraction</div>
<div class="env-body">
<p>At the horizon, atmospheric refraction shifts the Sun's apparent position upward by about 0.5 degrees. Since the Sun's angular diameter is also about 0.5 degrees, at the moment the lower edge of the Sun appears to touch the horizon, the entire disk is actually below the geometric horizon.</p>
</div>
</div>

<h3>Mirages</h3>

<p>On a hot day, the air just above a road surface is hotter and less dense (lower \\(n\\)) than the air above it. Light from the sky traveling downward at a shallow angle enters progressively less dense layers, bending away from the normal each time. Eventually the light curves back upward, reaching your eye from below. Your brain interprets this as a reflection from the ground, making the road appear to shimmer with "water." This is an <strong>inferior mirage</strong>.</p>

<div class="env-block definition">
<div class="env-title">Types of mirages</div>
<div class="env-body">
<ul>
<li><strong>Inferior mirage</strong>: Hot ground, cold air above. The image appears below the real object. Common on roads and deserts.</li>
<li><strong>Superior mirage</strong>: Cold surface (e.g., cold ocean), warm air above. The image appears above the real object. Can make distant ships or coastlines appear to float above the horizon (the "Fata Morgana" effect).</li>
</ul>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why stars twinkle</div>
<div class="env-body">
<p>Turbulent pockets of air at different temperatures create small, rapidly changing variations in refractive index. As starlight passes through these pockets, its direction and intensity fluctuate from moment to moment, causing the star to appear to twinkle (astronomers call this "scintillation"). Planets twinkle less because they subtend a larger angle, averaging out the fluctuations across their disk.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Practical consequence: astronomical correction</div>
<div class="env-body">
<p>Astronomers must correct for atmospheric refraction when measuring the positions of stars and planets. Near the horizon, the correction can be as large as half a degree. Precision astrometry requires detailed models of the atmospheric density profile above the observatory.</p>
</div>
</div>

<h3>Summary of refraction effects</h3>

<table style="width:100%;border-collapse:collapse;">
<tr style="border-bottom:1px solid #30363d;"><th style="text-align:left;padding:4px;">Phenomenon</th><th style="text-align:left;padding:4px;">Cause</th></tr>
<tr><td style="padding:4px;">Straw looks bent in water</td><td style="padding:4px;">Refraction at water-air surface</td></tr>
<tr><td style="padding:4px;">Pool looks shallow</td><td style="padding:4px;">Apparent depth (\\(d/n\\))</td></tr>
<tr><td style="padding:4px;">Sunset lingers</td><td style="padding:4px;">Atmospheric refraction lifts Sun's image</td></tr>
<tr><td style="padding:4px;">Road shimmer</td><td style="padding:4px;">Inferior mirage from hot air layer</td></tr>
<tr><td style="padding:4px;">Stars twinkle</td><td style="padding:4px;">Turbulent atmospheric refraction</td></tr>
<tr><td style="padding:4px;">Rainbow</td><td style="padding:4px;">Dispersion + refraction + internal reflection in raindrops</td></tr>
</table>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Why does a straw appear to be "broken" at the surface when placed in a glass of water?',
                        hint: 'Consider light from the submerged part of the straw reaching your eye.',
                        solution: 'Light from the submerged part of the straw refracts (bends away from the normal) as it exits the water surface. Your eye traces the refracted rays backward in straight lines, locating the submerged part of the straw at a different apparent position than its real position. The result is a visual "break" or offset at the water surface.'
                    },
                    {
                        question: 'On a hot day, you see what looks like a pool of water on the road 200 m ahead, but when you reach the spot, the road is dry. Explain the physics.',
                        hint: 'Think about the temperature gradient of air near the hot road surface.',
                        solution: 'The road surface heats the air above it, creating a thin layer of hot, low-density (low \\(n\\)) air. Light from the blue sky travels downward at a shallow angle and is progressively refracted (bent upward) by the decreasing \\(n\\) near the surface. The light curves back up to your eye, making it appear as though it came from the road surface. Your brain interprets this as a reflection from water (since water also reflects blue sky). This is an inferior mirage.'
                    }
                ]
            }
        ]
    });
})();
