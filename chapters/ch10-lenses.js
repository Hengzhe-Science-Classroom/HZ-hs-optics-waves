// === Chapter 10: Lenses & Image Formation ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch10',
        number: 10,
        title: 'Lenses & Image Formation',
        subtitle: 'How curved glass bends light to form images',
        file: 'ch10-lenses',

        sections: [
            // ============================================================
            // Section 0: Converging Lenses
            // ============================================================
            {
                id: 'converging-lenses',
                title: 'Converging Lenses',
                content: `
<h2>Bringing Light Together</h2>

<p>A <strong>converging lens</strong> (also called a convex lens or positive lens) is thicker in the middle than at the edges. Parallel rays entering the lens are refracted inward and converge to a single point called the <strong>focal point</strong>.</p>

<div class="env-block definition">
<div class="env-title">Definition: Converging Lens</div>
<div class="env-body">
<p>A <strong>converging lens</strong> refracts parallel incoming rays so that they meet at the focal point \\(F\\) on the far side of the lens. The distance from the center of the lens to the focal point is the <strong>focal length</strong> \\(f\\), which is positive for converging lenses.</p>
</div>
</div>

<p>The basic idea: light traveling through the thicker central part of the lens is slowed more (glass has \\(n > 1\\)), bending the rays inward. The lens is shaped so that all parallel rays, regardless of how far from the axis they enter, arrive at the same focal point. This is the defining property of a well-made lens.</p>

<h3>Key features</h3>

<ul>
<li><strong>Principal axis</strong>: the horizontal line through the center of the lens, perpendicular to the lens surface.</li>
<li><strong>Optical center</strong> \\(O\\): the center of the lens. A ray through \\(O\\) passes straight through without deflection.</li>
<li><strong>Focal point</strong> \\(F\\): the point where parallel rays converge (one on each side of the lens).</li>
<li><strong>Focal length</strong> \\(f\\): the distance from \\(O\\) to \\(F\\).</li>
</ul>

<div class="env-block intuition">
<div class="env-title">A magnifying glass is a converging lens</div>
<div class="env-body">
<p>Hold a magnifying glass in sunlight and focus the light onto a piece of paper. The bright dot is the focal point, where all the nearly parallel solar rays converge. The distance from the lens to that dot is the focal length.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-converging-lens"></div>
`,
                visualizations: [
                    {
                        id: 'viz-converging-lens',
                        title: 'Converging Lens: Parallel Rays to Focus',
                        description: 'Parallel rays enter from the left and converge at the focal point. Adjust the focal length to see how a stronger lens bends light more sharply.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            viz.originX = w / 2;
                            viz.originY = h / 2;

                            var focalLen = 3.0;
                            var time = 0;

                            VizEngine.createSlider(controls, 'f (focal length)', 1.5, 6.0, focalLen, 0.1, function (v) { focalLen = v; });

                            function draw(t) {
                                time = t * 0.001;
                                viz.clear();
                                viz.drawGrid();

                                var scale = viz.scale;
                                var ox = viz.originX, oy = viz.originY;

                                // Principal axis
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(w, oy); ctx.stroke();

                                // Lens
                                var lensH = 4.5 * scale;
                                ctx.save();
                                ctx.strokeStyle = viz.colors.cyan;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(ox, oy - lensH);
                                ctx.quadraticCurveTo(ox + 15, oy, ox, oy + lensH);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(ox, oy - lensH);
                                ctx.quadraticCurveTo(ox - 15, oy, ox, oy + lensH);
                                ctx.stroke();
                                // Arrows at tips
                                ctx.fillStyle = viz.colors.cyan;
                                ctx.beginPath(); ctx.moveTo(ox, oy - lensH - 8); ctx.lineTo(ox - 5, oy - lensH); ctx.lineTo(ox + 5, oy - lensH); ctx.closePath(); ctx.fill();
                                ctx.beginPath(); ctx.moveTo(ox, oy + lensH + 8); ctx.lineTo(ox - 5, oy + lensH); ctx.lineTo(ox + 5, oy + lensH); ctx.closePath(); ctx.fill();
                                ctx.restore();

                                // Focal points
                                var fPx = ox + focalLen * scale;
                                var fPxL = ox - focalLen * scale;
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(fPx, oy, 5, 0, Math.PI * 2); ctx.fill();
                                ctx.beginPath(); ctx.arc(fPxL, oy, 5, 0, Math.PI * 2); ctx.fill();
                                viz.screenText('F', fPx, oy + 16, viz.colors.orange, 12);
                                viz.screenText("F'", fPxL, oy + 16, viz.colors.orange, 12);

                                // Parallel rays from left converging to F
                                var numRays = 7;
                                for (var i = 0; i < numRays; i++) {
                                    var yOff = (i - (numRays - 1) / 2) * (lensH * 2 / (numRays + 1));
                                    if (Math.abs(yOff) < 3) continue;
                                    var rayY = oy + yOff;

                                    // Incoming parallel ray
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.gold;
                                    ctx.shadowBlur = 4;
                                    ctx.strokeStyle = viz.colors.gold;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath(); ctx.moveTo(0, rayY); ctx.lineTo(ox, rayY); ctx.stroke();

                                    // Refracted ray to focal point
                                    ctx.strokeStyle = viz.colors.gold;
                                    ctx.beginPath(); ctx.moveTo(ox, rayY); ctx.lineTo(fPx, oy); ctx.stroke();

                                    // Continue past focus
                                    var dx = fPx - ox, dy = oy - rayY;
                                    var rLen = Math.sqrt(dx * dx + dy * dy);
                                    var extFactor = (w - fPx) / dx;
                                    ctx.globalAlpha = 0.3;
                                    ctx.beginPath(); ctx.moveTo(fPx, oy); ctx.lineTo(fPx + dx * extFactor, oy + dy * extFactor); ctx.stroke();
                                    ctx.restore();
                                }

                                // Animated pulse along center ray
                                var pulseFrac = (time * 0.5) % 1;
                                var pulseX = pulseFrac * w;
                                if (pulseX < ox) {
                                    // Still incoming
                                    ctx.save();
                                    ctx.shadowColor = '#fff'; ctx.shadowBlur = 15;
                                    ctx.fillStyle = '#fff';
                                    ctx.beginPath(); ctx.arc(pulseX, oy, 4, 0, Math.PI * 2); ctx.fill();
                                    ctx.restore();
                                }

                                // Glow at focal point
                                var glowSize = 8 + 3 * Math.sin(time * 4);
                                var fGrad = ctx.createRadialGradient(fPx, oy, 0, fPx, oy, glowSize * 3);
                                fGrad.addColorStop(0, 'rgba(255,215,0,0.5)');
                                fGrad.addColorStop(0.5, 'rgba(255,165,0,0.15)');
                                fGrad.addColorStop(1, 'rgba(255,165,0,0)');
                                ctx.fillStyle = fGrad;
                                ctx.beginPath(); ctx.arc(fPx, oy, glowSize * 3, 0, Math.PI * 2); ctx.fill();

                                // Info
                                viz.screenText('f = ' + focalLen.toFixed(1), w / 2, h - 18, viz.colors.teal, 13);
                                viz.screenText('Converging (Convex) Lens', w / 2, 18, viz.colors.white, 13);
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A converging lens has a focal length of 20 cm. Sunlight (parallel rays) passes through it. Where do the rays meet?',
                        hint: 'Parallel rays converge at the focal point.',
                        solution: 'The rays converge at the focal point, 20 cm from the center of the lens on the far side.'
                    },
                    {
                        question: 'A lens is thicker at the edges than in the middle. Is it converging or diverging?',
                        hint: 'Think about which shape causes rays to spread out vs come together.',
                        solution: 'A lens thicker at the edges is a diverging (concave) lens. A converging lens is thicker in the middle.'
                    }
                ]
            },

            // ============================================================
            // Section 1: Diverging Lenses
            // ============================================================
            {
                id: 'diverging-lenses',
                title: 'Diverging Lenses',
                content: `
<h2>Spreading Light Apart</h2>

<p>A <strong>diverging lens</strong> (also called a concave lens or negative lens) is thinner in the middle than at the edges. Parallel rays entering the lens are refracted outward and appear to diverge from a point on the same side as the incoming light.</p>

<div class="env-block definition">
<div class="env-title">Definition: Diverging Lens</div>
<div class="env-body">
<p>A <strong>diverging lens</strong> refracts parallel incoming rays so that they spread apart. The diverging rays, when traced backward, appear to originate from the <strong>virtual focal point</strong> \\(F\\) on the same side as the incoming light. The focal length \\(f\\) is negative for diverging lenses.</p>
</div>
</div>

<p>Unlike a converging lens, a diverging lens never brings real rays to a point. The focal point is "virtual" because the rays only appear to come from it when extended backward. You cannot catch the focal point on a screen.</p>

<h3>Sign convention</h3>

<p>In optics, we use a consistent sign convention:</p>

<ul>
<li>Converging lens: \\(f > 0\\) (positive focal length)</li>
<li>Diverging lens: \\(f < 0\\) (negative focal length)</li>
<li>Real images (on the far side of the lens from the object): positive image distance</li>
<li>Virtual images (on the same side as the object): negative image distance</li>
</ul>

<div class="env-block remark">
<div class="env-title">Correcting nearsightedness</div>
<div class="env-body">
<p>A nearsighted (myopic) eye focuses parallel rays in front of the retina instead of on it. A diverging lens placed in front of the eye spreads the rays slightly before they enter, so the eye's own lens can bring them to focus exactly on the retina. This is why glasses for nearsighted people have concave lenses.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Parallel light enters a diverging lens with focal length \\(f = -15\\) cm. Describe what happens to the rays after passing through the lens.',
                        hint: 'The rays diverge. Where do they appear to originate from?',
                        solution: 'The rays spread apart after passing through the lens. If you trace the diverging rays backward (extend them as straight lines to the left), they all appear to originate from a point 15 cm in front of the lens (on the same side as the incoming light). This is the virtual focal point.'
                    },
                    {
                        question: 'Can a diverging lens form a real image by itself?',
                        hint: 'A real image requires rays to actually converge at a point.',
                        solution: 'No. A diverging lens always causes rays to spread apart. It can only form virtual images (appearing on the same side as the object). A real image requires the rays to actually meet, which a diverging lens alone cannot accomplish.'
                    }
                ]
            },

            // ============================================================
            // Section 2: The Thin Lens Equation
            // ============================================================
            {
                id: 'thin-lens-equation',
                title: 'The Thin Lens Equation',
                content: `
<h2>One Equation That Governs All Lenses</h2>

<p>The relationship between an object's position, the image's position, and the focal length of a thin lens is captured by a single elegant equation.</p>

<div class="env-block theorem">
<div class="env-title">Thin Lens Equation</div>
<div class="env-body">
\\[\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_i}\\]
<p>where:</p>
<ul>
<li>\\(f\\) = focal length (positive for converging, negative for diverging)</li>
<li>\\(d_o\\) = object distance (always positive for real objects)</li>
<li>\\(d_i\\) = image distance (positive for real images, negative for virtual images)</li>
</ul>
</div>
</div>

<p>This equation is deceptively powerful. Given any two of the three quantities (\\(f\\), \\(d_o\\), \\(d_i\\)), you can find the third.</p>

<div class="env-block example">
<div class="env-title">Example: Object Beyond 2f</div>
<div class="env-body">
<p>An object is placed 30 cm from a converging lens with \\(f = 10\\) cm. Where is the image?</p>
\\[\\frac{1}{10} = \\frac{1}{30} + \\frac{1}{d_i}\\]
\\[\\frac{1}{d_i} = \\frac{1}{10} - \\frac{1}{30} = \\frac{3-1}{30} = \\frac{2}{30} = \\frac{1}{15}\\]
\\[d_i = 15\\,\\text{cm}\\]
<p>The image is real (positive \\(d_i\\)), on the far side of the lens, at 15 cm.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Object Inside f</div>
<div class="env-body">
<p>An object is placed 5 cm from a converging lens with \\(f = 10\\) cm. Where is the image?</p>
\\[\\frac{1}{10} = \\frac{1}{5} + \\frac{1}{d_i}\\]
\\[\\frac{1}{d_i} = \\frac{1}{10} - \\frac{1}{5} = \\frac{1-2}{10} = -\\frac{1}{10}\\]
\\[d_i = -10\\,\\text{cm}\\]
<p>The image distance is negative, meaning the image is <strong>virtual</strong>; on the same side as the object. This is exactly what a magnifying glass does.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Watch the signs</div>
<div class="env-body">
<p>The most common source of errors in lens problems is getting the signs wrong. Remember: for a converging lens \\(f > 0\\), for a diverging lens \\(f < 0\\). Real images have \\(d_i > 0\\), virtual images have \\(d_i < 0\\). Real objects always have \\(d_o > 0\\).</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-lens-ray-tracer"></div>
`,
                visualizations: [
                    {
                        id: 'viz-lens-ray-tracer',
                        title: 'Interactive Lens Ray Tracer',
                        description: 'SHOWPIECE: Drag the object (orange arrow) to see the three principal rays trace through the lens and form the image. Watch the thin lens equation update in real time. Move the object past \\(2f\\), between \\(f\\) and \\(2f\\), and inside \\(f\\) to see the image transform from small-real to large-real to virtual.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 30, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            viz.originX = w / 2;
                            viz.originY = h * 0.55;
                            var scale = viz.scale;
                            var ox = viz.originX, oy = viz.originY;

                            var focalLen = 3.0;
                            var objDist = -6.0; // negative x = left of lens
                            var objHeight = 2.5;

                            VizEngine.createSlider(controls, 'f', 1.5, 6.0, focalLen, 0.1, function (v) { focalLen = v; });

                            var objDrag = viz.addDraggable('obj', objDist, 0, viz.colors.orange, 10, function (mx, my) {
                                if (mx > -0.5) mx = -0.5;
                                objDrag.x = mx;
                                objDrag.y = 0;
                                objDist = mx;
                            });

                            function drawArrow(x, y, hh, color, lineW) {
                                var sx = ox + x * scale;
                                var sy = oy;
                                var ey = oy - hh * scale;
                                ctx.save();
                                ctx.shadowColor = color;
                                ctx.shadowBlur = 6;
                                ctx.strokeStyle = color;
                                ctx.lineWidth = lineW || 3;
                                ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx, ey); ctx.stroke();
                                // Arrowhead
                                var dir = hh > 0 ? -1 : 1;
                                ctx.fillStyle = color;
                                ctx.beginPath();
                                ctx.moveTo(sx, ey);
                                ctx.lineTo(sx - 6, ey + dir * 12);
                                ctx.lineTo(sx + 6, ey + dir * 12);
                                ctx.closePath(); ctx.fill();
                                ctx.restore();
                            }

                            function drawRay(x1, y1, x2, y2, color, dashed, lw) {
                                var sx1 = ox + x1 * scale, sy1 = oy - y1 * scale;
                                var sx2 = ox + x2 * scale, sy2 = oy - y2 * scale;
                                ctx.save();
                                ctx.strokeStyle = color;
                                ctx.lineWidth = lw || 1.8;
                                if (dashed) ctx.setLineDash([6, 4]);
                                ctx.beginPath(); ctx.moveTo(sx1, sy1); ctx.lineTo(sx2, sy2); ctx.stroke();
                                ctx.restore();
                                ctx.setLineDash([]);
                            }

                            function extendRay(x1, y1, x2, y2, color) {
                                var dx = x2 - x1, dy = y2 - y1;
                                var len = Math.sqrt(dx * dx + dy * dy);
                                if (len < 0.001) return;
                                var ext = 20;
                                drawRay(x2, y2, x2 + dx / len * ext, y2 + dy / len * ext, color, false, 1.8);
                            }

                            function draw(t) {
                                viz.clear();

                                var f = focalLen;
                                var dO = -objDist; // positive distance
                                objDrag.x = objDist;
                                objDrag.y = 0;

                                // Compute image
                                var dI = 1 / (1 / f - 1 / (-dO));
                                // dI > 0 means image on the right (real), < 0 means left (virtual)
                                // Using lens equation: 1/f = 1/do + 1/di, do is positive
                                dI = (f * dO) / (dO - f);
                                var mag = -dI / dO;
                                var imgHeight = mag * objHeight;
                                var imgX = dI; // position in math coords (positive = right of lens)

                                // Background grid
                                viz.drawGrid();

                                // Principal axis
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(w, oy); ctx.stroke();

                                // Lens
                                var lensH = 5.5 * scale;
                                ctx.save();
                                ctx.shadowColor = viz.colors.cyan;
                                ctx.shadowBlur = 8;
                                ctx.strokeStyle = viz.colors.cyan;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(ox, oy - lensH);
                                ctx.quadraticCurveTo(ox + 14, oy, ox, oy + lensH);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(ox, oy - lensH);
                                ctx.quadraticCurveTo(ox - 14, oy, ox, oy + lensH);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.cyan;
                                ctx.beginPath(); ctx.moveTo(ox, oy - lensH - 8); ctx.lineTo(ox - 5, oy - lensH); ctx.lineTo(ox + 5, oy - lensH); ctx.closePath(); ctx.fill();
                                ctx.beginPath(); ctx.moveTo(ox, oy + lensH + 8); ctx.lineTo(ox - 5, oy + lensH); ctx.lineTo(ox + 5, oy + lensH); ctx.closePath(); ctx.fill();
                                ctx.restore();

                                // Focal points and 2f points
                                var markers = [
                                    { x: f, label: 'F', col: viz.colors.orange },
                                    { x: -f, label: "F'", col: viz.colors.orange },
                                    { x: 2 * f, label: '2F', col: viz.colors.teal },
                                    { x: -2 * f, label: "2F'", col: viz.colors.teal }
                                ];
                                for (var m = 0; m < markers.length; m++) {
                                    var mk = markers[m];
                                    var mx = ox + mk.x * scale;
                                    ctx.fillStyle = mk.col;
                                    ctx.beginPath(); ctx.arc(mx, oy, 4, 0, Math.PI * 2); ctx.fill();
                                    viz.screenText(mk.label, mx, oy + 16, mk.col, 10);
                                }

                                // Object arrow
                                drawArrow(objDist, 0, objHeight, viz.colors.orange);

                                // === Three principal rays ===
                                var tipX = objDist;
                                var tipY = objHeight;

                                // Ray 1: Parallel to axis, then through F
                                // From tip, horizontal to lens
                                drawRay(tipX, tipY, 0, tipY, viz.colors.gold, false, 2);
                                // Then refracts toward/away from F
                                if (dO > f) {
                                    // Real image: ray goes through F on the right
                                    drawRay(0, tipY, f, 0, viz.colors.gold, false, 2);
                                    extendRay(0, tipY, f, 0, viz.colors.gold);
                                } else {
                                    // Virtual image: ray goes away from F on the right, but diverges
                                    // The refracted direction: from (0, tipY) such that extension goes through (-f, 0) (virtual focus extension)
                                    // Actually: parallel ray refracts through F on the far side
                                    drawRay(0, tipY, f, 0, viz.colors.gold, false, 2);
                                    extendRay(0, tipY, f, 0, viz.colors.gold);
                                    // Virtual extension backward
                                    var dx1 = f - 0, dy1 = 0 - tipY;
                                    var len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
                                    drawRay(0, tipY, 0 - dx1 / len1 * 15, tipY - dy1 / len1 * 15, viz.colors.gold, true, 1.2);
                                }

                                // Ray 2: Through center of lens (straight through)
                                drawRay(tipX, tipY, 0, 0, viz.colors.green, false, 2);
                                // Continue through
                                var dx2 = 0 - tipX, dy2 = 0 - tipY;
                                var len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                                extendRay(tipX, tipY, 0, 0, viz.colors.green);

                                // Ray 3: Through F' (left focal point), then parallel after lens
                                if (dO > f) {
                                    // Ray aims at F' on the left, then exits parallel
                                    // Direction from tip to F' at (-f, 0)
                                    var toFx = -f - tipX, toFy = 0 - tipY;
                                    var toFlen = Math.sqrt(toFx * toFx + toFy * toFy);
                                    // Find where this ray hits the lens (x=0)
                                    var tLens = (0 - tipX) / (toFx / toFlen);
                                    var lensYhit = tipY + (toFy / toFlen) * tLens;
                                    drawRay(tipX, tipY, 0, lensYhit, viz.colors.purple, false, 2);
                                    // Exits parallel to axis
                                    drawRay(0, lensYhit, 15, lensYhit, viz.colors.purple, false, 2);
                                } else {
                                    // Object inside f: ray aimed at F on the right, exits parallel
                                    var toFx2 = f - tipX, toFy2 = 0 - tipY;
                                    var toFlen2 = Math.sqrt(toFx2 * toFx2 + toFy2 * toFy2);
                                    var tLens2 = (0 - tipX) / (toFx2 / toFlen2);
                                    var lensYhit2 = tipY + (toFy2 / toFlen2) * tLens2;
                                    drawRay(tipX, tipY, 0, lensYhit2, viz.colors.purple, false, 2);
                                    // Exits parallel
                                    drawRay(0, lensYhit2, 15, lensYhit2, viz.colors.purple, false, 2);
                                    // Virtual extension backward
                                    drawRay(0, lensYhit2, -15, lensYhit2, viz.colors.purple, true, 1.2);
                                }

                                // Image arrow
                                if (isFinite(imgX) && isFinite(imgHeight) && Math.abs(dO - f) > 0.1) {
                                    var imgColor = dI > 0 ? viz.colors.pink : viz.colors.pink + '88';
                                    drawArrow(imgX, 0, imgHeight, imgColor, 2.5);

                                    if (dI < 0) {
                                        // Virtual image label
                                        viz.screenText('virtual', ox + imgX * scale, oy - imgHeight * scale - 14, viz.colors.pink, 10);
                                    }
                                }

                                // === Info panel ===
                                var panelX = 12, panelY = 12;
                                ctx.fillStyle = 'rgba(12,12,32,0.85)';
                                ctx.fillRect(panelX, panelY, 200, 95);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.strokeRect(panelX, panelY, 200, 95);

                                viz.screenText('Thin Lens Equation', panelX + 100, panelY + 14, viz.colors.white, 12);
                                viz.screenText('1/f = 1/d\u2092 + 1/d\u1d62', panelX + 100, panelY + 32, viz.colors.cyan, 11);
                                viz.screenText('d\u2092 = ' + dO.toFixed(1) + '    f = ' + f.toFixed(1), panelX + 100, panelY + 50, viz.colors.text, 11);
                                if (isFinite(dI) && Math.abs(dO - f) > 0.1) {
                                    viz.screenText('d\u1d62 = ' + dI.toFixed(1) + '    M = ' + mag.toFixed(2), panelX + 100, panelY + 66, viz.colors.text, 11);
                                    var imgType = dI > 0 ? 'Real' : 'Virtual';
                                    var imgOri = mag > 0 ? 'Upright' : 'Inverted';
                                    var imgSize = Math.abs(mag) > 1 ? 'Enlarged' : (Math.abs(mag) < 1 ? 'Diminished' : 'Same size');
                                    viz.screenText(imgType + ', ' + imgOri + ', ' + imgSize, panelX + 100, panelY + 82, viz.colors.gold, 11);
                                } else {
                                    viz.screenText('Object at F: image at \u221e', panelX + 100, panelY + 66, viz.colors.red, 11);
                                }

                                // Drag hint
                                viz.screenText('Drag the orange arrow to move the object', w / 2, h - 12, viz.colors.text, 10);

                                viz.drawDraggables();
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'An object is placed 12 cm from a converging lens with \\(f = 8\\) cm. Find the image distance and describe the image.',
                        hint: 'Use the thin lens equation. Check the sign of \\(d_i\\) and compute the magnification \\(M = -d_i/d_o\\).',
                        solution: '\\(\\frac{1}{8} = \\frac{1}{12} + \\frac{1}{d_i}\\). So \\(\\frac{1}{d_i} = \\frac{1}{8} - \\frac{1}{12} = \\frac{3-2}{24} = \\frac{1}{24}\\). Thus \\(d_i = 24\\) cm. The image is real (positive), inverted (\\(M = -24/12 = -2\\)), and enlarged (\\(|M| = 2\\)).'
                    },
                    {
                        question: 'Where must you place an object so that the image distance equals the object distance for a converging lens?',
                        hint: 'Set \\(d_i = d_o\\) in the thin lens equation and solve for \\(d_o\\).',
                        solution: '\\(\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_o} = \\frac{2}{d_o}\\). So \\(d_o = 2f\\). When the object is at \\(2f\\), the image forms at \\(2f\\) on the other side, same size, real, and inverted.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Magnification
            // ============================================================
            {
                id: 'magnification',
                title: 'Magnification',
                content: `
<h2>How Big Is the Image?</h2>

<p>The <strong>magnification</strong> tells you two things: how large the image is relative to the object, and whether the image is upright or inverted.</p>

<div class="env-block theorem">
<div class="env-title">Linear Magnification</div>
<div class="env-body">
\\[M = \\frac{h_i}{h_o} = -\\frac{d_i}{d_o}\\]
<p>where \\(h_i\\) is the image height, \\(h_o\\) is the object height, \\(d_i\\) is the image distance, and \\(d_o\\) is the object distance.</p>
<ul>
<li>\\(|M| > 1\\): the image is <strong>enlarged</strong></li>
<li>\\(|M| < 1\\): the image is <strong>diminished</strong></li>
<li>\\(|M| = 1\\): the image is the <strong>same size</strong></li>
<li>\\(M > 0\\): the image is <strong>upright</strong></li>
<li>\\(M < 0\\): the image is <strong>inverted</strong></li>
</ul>
</div>
</div>

<h3>Understanding the negative sign</h3>

<p>The negative sign in \\(M = -d_i/d_o\\) is not arbitrary. It encodes the geometry: when the image is on the opposite side of the lens from the object (real image, \\(d_i > 0\\)), the magnification is negative, meaning the image is inverted. When the image is on the same side as the object (virtual image, \\(d_i < 0\\)), the magnification is positive, meaning the image is upright.</p>

<div class="env-block example">
<div class="env-title">Example: Magnification Summary</div>
<div class="env-body">
<p>For a converging lens with \\(f = 10\\) cm:</p>
<ul>
<li>Object at \\(d_o = 30\\) cm: \\(d_i = 15\\) cm, \\(M = -0.5\\). Real, inverted, half-size.</li>
<li>Object at \\(d_o = 20\\) cm: \\(d_i = 20\\) cm, \\(M = -1\\). Real, inverted, same size.</li>
<li>Object at \\(d_o = 15\\) cm: \\(d_i = 30\\) cm, \\(M = -2\\). Real, inverted, double size.</li>
<li>Object at \\(d_o = 5\\) cm: \\(d_i = -10\\) cm, \\(M = +2\\). Virtual, upright, double size.</li>
</ul>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">The \\(2f\\) point is special</div>
<div class="env-body">
<p>When the object is at exactly \\(2f\\), the image forms at \\(2f\\) on the other side, with \\(M = -1\\) (same size, inverted). This is the crossover: objects farther than \\(2f\\) form diminished images, objects between \\(f\\) and \\(2f\\) form enlarged images, and objects inside \\(f\\) form enlarged virtual images.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'An object 4 cm tall is placed 25 cm from a converging lens with \\(f = 10\\) cm. Find the image height.',
                        hint: 'First find \\(d_i\\), then compute \\(M = -d_i/d_o\\), and finally \\(h_i = M \\cdot h_o\\).',
                        solution: '\\(\\frac{1}{d_i} = \\frac{1}{10} - \\frac{1}{25} = \\frac{5-2}{50} = \\frac{3}{50}\\), so \\(d_i = 16.7\\) cm. \\(M = -16.7/25 = -0.667\\). \\(h_i = -0.667 \\times 4 = -2.67\\) cm. The image is 2.67 cm tall and inverted.'
                    },
                    {
                        question: 'A diverging lens has \\(f = -12\\) cm. An object is placed 24 cm from it. Find the magnification and describe the image.',
                        hint: 'Use the thin lens equation with negative \\(f\\).',
                        solution: '\\(\\frac{1}{-12} = \\frac{1}{24} + \\frac{1}{d_i}\\). \\(\\frac{1}{d_i} = -\\frac{1}{12} - \\frac{1}{24} = \\frac{-2-1}{24} = -\\frac{3}{24} = -\\frac{1}{8}\\). So \\(d_i = -8\\) cm. \\(M = -(-8)/24 = +1/3\\). The image is virtual, upright, and diminished to 1/3 the size.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Real vs Virtual Images
            // ============================================================
            {
                id: 'real-virtual-images',
                title: 'Real vs Virtual Images',
                content: `
<h2>Can You Catch It on a Screen?</h2>

<p>This is the fundamental question that separates real images from virtual images.</p>

<div class="env-block definition">
<div class="env-title">Definition: Real Image</div>
<div class="env-body">
<p>A <strong>real image</strong> is formed where light rays actually converge. It can be projected onto a screen. Real images are always on the opposite side of the lens from the object (for a single thin lens), and they are inverted.</p>
</div>
</div>

<div class="env-block definition">
<div class="env-title">Definition: Virtual Image</div>
<div class="env-body">
<p>A <strong>virtual image</strong> is formed where light rays <em>appear</em> to diverge from, when traced backward. It cannot be projected onto a screen; it can only be seen by looking through the lens. Virtual images are on the same side of the lens as the object, and they are upright.</p>
</div>
</div>

<h3>Summary for a converging lens</h3>

<table style="width:100%;border-collapse:collapse;margin:1em 0;">
<thead>
<tr style="border-bottom:2px solid #30363d;">
<th style="padding:6px 8px;text-align:left;">Object Position</th>
<th style="padding:6px 8px;text-align:left;">Image Type</th>
<th style="padding:6px 8px;text-align:left;">Image Location</th>
<th style="padding:6px 8px;text-align:left;">Size</th>
<th style="padding:6px 8px;text-align:left;">Orientation</th>
</tr>
</thead>
<tbody>
<tr style="border-bottom:1px solid #21262d;">
<td style="padding:6px 8px;">Beyond \\(2f\\)</td>
<td style="padding:6px 8px;">Real</td>
<td style="padding:6px 8px;">Between \\(f\\) and \\(2f\\)</td>
<td style="padding:6px 8px;">Diminished</td>
<td style="padding:6px 8px;">Inverted</td>
</tr>
<tr style="border-bottom:1px solid #21262d;">
<td style="padding:6px 8px;">At \\(2f\\)</td>
<td style="padding:6px 8px;">Real</td>
<td style="padding:6px 8px;">At \\(2f\\)</td>
<td style="padding:6px 8px;">Same size</td>
<td style="padding:6px 8px;">Inverted</td>
</tr>
<tr style="border-bottom:1px solid #21262d;">
<td style="padding:6px 8px;">Between \\(f\\) and \\(2f\\)</td>
<td style="padding:6px 8px;">Real</td>
<td style="padding:6px 8px;">Beyond \\(2f\\)</td>
<td style="padding:6px 8px;">Enlarged</td>
<td style="padding:6px 8px;">Inverted</td>
</tr>
<tr style="border-bottom:1px solid #21262d;">
<td style="padding:6px 8px;">At \\(f\\)</td>
<td style="padding:6px 8px;">No image</td>
<td style="padding:6px 8px;">At infinity</td>
<td style="padding:6px 8px;">&mdash;</td>
<td style="padding:6px 8px;">&mdash;</td>
</tr>
<tr>
<td style="padding:6px 8px;">Inside \\(f\\)</td>
<td style="padding:6px 8px;">Virtual</td>
<td style="padding:6px 8px;">Same side as object</td>
<td style="padding:6px 8px;">Enlarged</td>
<td style="padding:6px 8px;">Upright</td>
</tr>
</tbody>
</table>

<div class="env-block remark">
<div class="env-title">Diverging lenses always form virtual images</div>
<div class="env-body">
<p>For a diverging lens with a real object, the image is always virtual, upright, and diminished. The image forms between the lens and the focal point, on the same side as the object. There is no "crossover" behavior like with a converging lens.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Cinema projectors</div>
<div class="env-body">
<p>A movie projector places a film strip between \\(f\\) and \\(2f\\) of a converging lens. The image is real (can be projected on the screen), inverted (the film is loaded upside-down to compensate), and enlarged (the image on the screen is much larger than the film frame). Understanding lenses is understanding how movies work.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'You hold a lens close to a printed page and see the text appear larger and upright. Is the image real or virtual? Is the lens converging or diverging?',
                        hint: 'An upright, enlarged image from a single lens is either a converging lens with the object inside \\(f\\), or you need to consider what diverging lenses do.',
                        solution: 'The image is virtual (you are looking through the lens, not projecting onto a screen, and the text is upright). The lens is converging, being used as a magnifying glass with the page inside the focal length. (A diverging lens would produce a diminished virtual image, not an enlarged one.)'
                    },
                    {
                        question: 'Can you see a real image without a screen?',
                        hint: 'Think about what your eye does when light enters it.',
                        solution: 'Yes. If you place your eye in the path of the converging light rays (beyond the image point), your eye\'s own lens refocuses the diverging light from the real image onto your retina. This is how you view images through telescopes, microscopes, and other optical instruments. A screen is not required; it is just a convenient way to display the image.'
                    }
                ]
            }
        ]
    });
})();
