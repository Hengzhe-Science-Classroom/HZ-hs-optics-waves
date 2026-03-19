// === Chapter 7: Reflection ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch07',
        number: 7,
        title: 'Reflection',
        subtitle: 'Light bouncing off surfaces and forming images',
        file: 'ch07-reflection',

        sections: [
            // ============================================================
            // Section 0: Law of Reflection
            // ============================================================
            {
                id: 'law-of-reflection',
                title: 'Law of Reflection',
                content: `
<h2>The Simplest Rule in Optics</h2>

<p>When a light ray strikes a smooth surface, it bounces off in a perfectly predictable way. The <strong>law of reflection</strong> has been known since antiquity and is arguably the simplest law in all of optics:</p>

<div class="env-block theorem">
<div class="env-title">Law of Reflection</div>
<div class="env-body">
<p>The <strong>angle of incidence</strong> \\(\\theta_i\\) equals the <strong>angle of reflection</strong> \\(\\theta_r\\):</p>
\\[\\theta_i = \\theta_r\\]
<p>Both angles are measured from the <strong>normal</strong> (the line perpendicular to the surface at the point of incidence). The incident ray, the reflected ray, and the normal all lie in the same plane.</p>
</div>
</div>

<p>This law holds for any smooth, reflective surface: flat mirrors, curved mirrors, polished metal, calm water, or even a glass window (partial reflection).</p>

<div class="viz-placeholder" data-viz="viz-law-reflection"></div>

<div class="env-block definition">
<div class="env-title">Definition: Specular vs Diffuse Reflection</div>
<div class="env-body">
<p><strong>Specular reflection</strong> occurs when a surface is smooth on the scale of the wavelength of light. Parallel rays reflect as parallel rays, preserving the image. A mirror gives specular reflection.</p>
<p><strong>Diffuse reflection</strong> occurs when the surface is rough. Each tiny patch obeys the law of reflection locally, but since the patches face different directions, the reflected rays scatter in all directions. This is why you can see a white wall from any angle but cannot see your reflection in it.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why the law of reflection works</div>
<div class="env-body">
<p>At a deeper level, the law of reflection follows from Fermat's principle: light travels the path that takes the least time. For a ray going from point A to the mirror to point B, the shortest-time path is the one where the angle of incidence equals the angle of reflection. Any other path would be longer.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-law-reflection',
                        title: 'Law of Reflection: Interactive',
                        description: 'Drag the light source (gold dot) to change the angle of incidence. The reflected ray obeys \\(\\theta_i = \\theta_r\\). The normal is shown as a dashed line. Angles are displayed in real time.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            viz.originX = w / 2;
                            viz.originY = h * 0.6;

                            var mirrorY = 0;
                            var hitX = 0;

                            var source = viz.addDraggable('src', -3, 3.5, viz.colors.gold, 10);

                            function draw() {
                                viz.clear();

                                var sx = source.x, sy = source.y;
                                if (sy < 0.3) { sy = 0.3; source.y = 0.3; }

                                // Mirror surface
                                var mirrorLeft = -7, mirrorRight = 7;
                                var mls = viz.toScreen(mirrorLeft, mirrorY);
                                var mrs = viz.toScreen(mirrorRight, mirrorY);
                                // Mirror fill
                                ctx.fillStyle = 'rgba(88,166,255,0.08)';
                                ctx.fillRect(mls[0], mls[1], mrs[0] - mls[0], h - mls[1]);
                                // Mirror line (reflective surface)
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 3;
                                ctx.beginPath(); ctx.moveTo(mls[0], mls[1]); ctx.lineTo(mrs[0], mrs[1]); ctx.stroke();
                                // Hatching below
                                ctx.strokeStyle = viz.colors.blue + '33';
                                ctx.lineWidth = 1;
                                for (var hx = mls[0]; hx < mrs[0]; hx += 12) {
                                    ctx.beginPath(); ctx.moveTo(hx, mls[1]); ctx.lineTo(hx - 8, mls[1] + 10); ctx.stroke();
                                }

                                // Incident ray hits mirror at hitX (calculated so ray hits y=0)
                                // The ray comes from (sx, sy) and hits the mirror at (hitX, 0)
                                hitX = VizEngine.clamp(sx, mirrorLeft + 0.5, mirrorRight - 0.5);
                                // Actually, let ray go straight to mirror at x = where it would intersect
                                // For interactive: hit point at x=0 (center), then reflect
                                hitX = 0;

                                // Angle of incidence
                                var incDx = hitX - sx;
                                var incDy = mirrorY - sy;
                                var incLen = Math.sqrt(incDx * incDx + incDy * incDy);
                                var thetaI = Math.atan2(Math.abs(incDx), Math.abs(incDy));
                                var thetaDeg = thetaI * 180 / Math.PI;

                                // Reflected ray: reflect across normal (y-axis at hit point)
                                // Incident direction: (incDx/incLen, incDy/incLen)
                                // Normal: (0, 1) (pointing up)
                                // Reflected direction: (rx, ry) where rx = -incDx/incLen (flip x), ry = incDy/incLen (same y)
                                // But we want the outgoing ray going upward, so ry should be positive (away from mirror)
                                var refDx = -incDx / incLen;
                                var refDy = -incDy / incLen; // same magnitude, reflected

                                var refEndX = hitX + refDx * 6;
                                var refEndY = mirrorY + (-incDy / incLen) * 6;
                                // Actually: reflected ray has same angle from normal on other side
                                refEndX = hitX + (Math.abs(incDx) / incLen) * (incDx < 0 ? 1 : -1) * (-1) * 6;
                                // Simpler: reflect about normal
                                var inUx = incDx / incLen;
                                var inUy = incDy / incLen;
                                // Normal is (0, 1)
                                var dotN = inUy; // dot with (0,1)
                                var refUx = inUx - 0;  // no, use proper reflection
                                var refUy = inUy - 2 * dotN; // reflect: r = d - 2(d.n)n
                                // But d points INTO mirror, reflection should point OUT
                                // incident direction d = (inUx, inUy) points down
                                // reflected = d - 2(d.n)n where n=(0,1)
                                refUx = inUx - 2 * dotN * 0;
                                refUy = inUy - 2 * dotN * 1;
                                // This gives refUy = inUy - 2*inUy = -inUy (pointing up, good)
                                refUx = inUx;
                                refUy = -inUy;

                                refEndX = hitX + refUx * 6;
                                refEndY = mirrorY + refUy * 6;

                                // Normal line (dashed, up from hit point)
                                viz.drawSegment(hitX, mirrorY - 0.2, hitX, 5.5, viz.colors.text, 1.5, true);
                                viz.drawText('normal', hitX + 0.3, 5.2, viz.colors.text, 10, 'left', 'bottom');

                                // Incident ray (golden glow)
                                ctx.save();
                                ctx.shadowColor = viz.colors.gold;
                                ctx.shadowBlur = 8;
                                var s1 = viz.toScreen(sx, sy);
                                var s2 = viz.toScreen(hitX, mirrorY);
                                ctx.strokeStyle = viz.colors.gold;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath(); ctx.moveTo(s1[0], s1[1]); ctx.lineTo(s2[0], s2[1]); ctx.stroke();
                                // Arrowhead on incident ray
                                var iMidX = (sx + hitX) / 2;
                                var iMidY = (sy + mirrorY) / 2;
                                var iAngle = Math.atan2(-(mirrorY - sy), (hitX - sx) * viz.scale / viz.scale);
                                ctx.restore();

                                // Reflected ray (orange glow)
                                ctx.save();
                                ctx.shadowColor = viz.colors.orange;
                                ctx.shadowBlur = 8;
                                var s3 = viz.toScreen(refEndX, refEndY);
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath(); ctx.moveTo(s2[0], s2[1]); ctx.lineTo(s3[0], s3[1]); ctx.stroke();
                                ctx.restore();

                                // Arrow tips
                                // Incident ray arrow at midpoint
                                var imx = (s1[0] + s2[0]) / 2;
                                var imy = (s1[1] + s2[1]) / 2;
                                var iAng = Math.atan2(s2[1] - s1[1], s2[0] - s1[0]);
                                ctx.fillStyle = viz.colors.gold;
                                ctx.beginPath();
                                ctx.moveTo(imx + 8 * Math.cos(iAng), imy + 8 * Math.sin(iAng));
                                ctx.lineTo(imx - 8 * Math.cos(iAng - 0.4), imy - 8 * Math.sin(iAng - 0.4));
                                ctx.lineTo(imx - 8 * Math.cos(iAng + 0.4), imy - 8 * Math.sin(iAng + 0.4));
                                ctx.closePath();
                                ctx.fill();

                                // Reflected ray arrow at midpoint
                                var rmx = (s2[0] + s3[0]) / 2;
                                var rmy = (s2[1] + s3[1]) / 2;
                                var rAng = Math.atan2(s3[1] - s2[1], s3[0] - s2[0]);
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.moveTo(rmx + 8 * Math.cos(rAng), rmy + 8 * Math.sin(rAng));
                                ctx.lineTo(rmx - 8 * Math.cos(rAng - 0.4), rmy - 8 * Math.sin(rAng - 0.4));
                                ctx.lineTo(rmx - 8 * Math.cos(rAng + 0.4), rmy - 8 * Math.sin(rAng + 0.4));
                                ctx.closePath();
                                ctx.fill();

                                // Angle arcs
                                var arcR = 1.2;
                                // Incident angle (from normal, which is +y direction = pi/2 in screen coords)
                                // In world coords, normal points up. Incident ray direction: from source to hit
                                var angNormal = Math.PI / 2; // normal points up
                                var angInc = Math.atan2(-(sx - hitX), sy - mirrorY); // angle from normal
                                // In screen, normal goes up (negative y)
                                var screenNormAng = -Math.PI / 2;
                                var screenIncAng = Math.atan2(s1[1] - s2[1], s1[0] - s2[0]);
                                var screenRefAng = Math.atan2(s3[1] - s2[1], s3[0] - s2[0]);

                                // Draw angle arcs in screen space
                                ctx.strokeStyle = viz.colors.gold;
                                ctx.lineWidth = 2;
                                var aCx = s2[0], aCy = s2[1];
                                var aR = 40;
                                // Incident angle arc (between normal and incident)
                                var a1 = Math.min(screenNormAng, screenIncAng);
                                var a2 = Math.max(screenNormAng, screenIncAng);
                                ctx.beginPath(); ctx.arc(aCx, aCy, aR, a1, a2); ctx.stroke();

                                // Reflected angle arc
                                ctx.strokeStyle = viz.colors.orange;
                                a1 = Math.min(screenNormAng, screenRefAng);
                                a2 = Math.max(screenNormAng, screenRefAng);
                                ctx.beginPath(); ctx.arc(aCx, aCy, aR + 5, a1, a2); ctx.stroke();

                                // Angle labels
                                var labelR = aR + 20;
                                var incMidAng = (screenNormAng + screenIncAng) / 2;
                                var refMidAng = (screenNormAng + screenRefAng) / 2;
                                viz.screenText('\u03B8\u1D62 = ' + thetaDeg.toFixed(1) + '\u00B0', aCx + labelR * Math.cos(incMidAng), aCy + labelR * Math.sin(incMidAng), viz.colors.gold, 12);
                                viz.screenText('\u03B8\u1D63 = ' + thetaDeg.toFixed(1) + '\u00B0', aCx + (labelR + 10) * Math.cos(refMidAng), aCy + (labelR + 10) * Math.sin(refMidAng), viz.colors.orange, 12);

                                // Source glow
                                viz.drawBall(sx, sy, 0.2, viz.colors.gold, 3);
                                viz.drawText('Source', sx, sy + 0.5, viz.colors.gold, 11, 'center', 'top');

                                // Hit point
                                ctx.fillStyle = viz.colors.white;
                                ctx.beginPath(); ctx.arc(s2[0], s2[1], 4, 0, Math.PI * 2); ctx.fill();

                                // Labels
                                viz.screenText('Incident ray', 15, 18, viz.colors.gold, 12, 'left', 'top');
                                viz.screenText('Reflected ray', 15, 34, viz.colors.orange, 12, 'left', 'top');
                                viz.screenText('Mirror', mls[0] + 20, mls[1] + 16, viz.colors.blue, 11, 'left', 'top');

                                viz.drawDraggables();
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A ray of light strikes a plane mirror at an angle of 35 degrees to the surface. What is the angle of reflection?',
                        hint: 'Angles are measured from the normal, not the surface. If the ray makes 35 degrees with the surface, what angle does it make with the normal?',
                        solution: 'The angle of incidence (from the normal) is \\(90° - 35° = 55°\\). By the law of reflection, the angle of reflection is also 55 degrees (from the normal).'
                    },
                    {
                        question: 'Two plane mirrors meet at a right angle. Show that a ray hitting one mirror and then the other will be reflected back parallel to its original direction.',
                        hint: 'Apply the law of reflection twice. Track what happens to the angle at each mirror.',
                        solution: 'Let the ray hit the first mirror at angle \\(\\theta\\) from the normal. It reflects at \\(\\theta\\). When it reaches the second (perpendicular) mirror, geometry shows it hits at angle \\(90° - \\theta\\) from that mirror\'s normal. It reflects at \\(90° - \\theta\\). The total deflection is \\(2\\theta + 2(90° - \\theta) = 180°\\), so the outgoing ray is anti-parallel to the incoming ray. This is the principle behind corner reflectors and bicycle reflectors.'
                    }
                ]
            },

            // ============================================================
            // Section 1: Plane Mirrors and Images
            // ============================================================
            {
                id: 'plane-mirrors',
                title: 'Plane Mirrors and Images',
                content: `
<h2>The Image Behind the Glass</h2>

<p>When you look in a plane mirror, you see an image of yourself that appears to be located <em>behind</em> the mirror. Your brain traces the reflected rays backward in straight lines, and they converge at a point behind the mirror surface. This is called a <strong>virtual image</strong>.</p>

<div class="env-block definition">
<div class="env-title">Definition: Real and Virtual Images</div>
<div class="env-body">
<p>A <strong>real image</strong> is formed where light rays actually converge. It can be projected onto a screen.</p>
<p>A <strong>virtual image</strong> is formed where light rays <em>appear</em> to diverge from. No light actually passes through the image point; it cannot be projected onto a screen. You can see it by looking into the mirror (or lens), but you cannot capture it on paper held at the image location.</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Properties of the plane mirror image</div>
<div class="env-body">
<ol>
<li>The image is the <strong>same distance behind the mirror</strong> as the object is in front: \\(d_i = d_o\\).</li>
<li>The image is <strong>the same size</strong> as the object (magnification = 1).</li>
<li>The image is <strong>virtual</strong> (cannot be projected).</li>
<li>The image is <strong>laterally inverted</strong> (left-right reversed).</li>
<li>The image is <strong>upright</strong> (not flipped top-to-bottom).</li>
</ol>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-plane-mirror"></div>

<div class="env-block intuition">
<div class="env-title">Why the mirror "reverses" left and right</div>
<div class="env-body">
<p>Strictly speaking, a mirror does not reverse left and right. It reverses <em>front and back</em>. When you face a mirror, your nose (front) maps to a point behind the mirror (back). Your left hand is still on the east side if it was on the east side before. But because you mentally "rotate" the image to compare it with a real person facing you (who would be rotated 180 degrees), you interpret the image as left-right reversed.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-plane-mirror',
                        title: 'Plane Mirror: Virtual Image',
                        description: 'An object (gold) stands in front of a plane mirror (blue line). Rays diverge from the object, reflect off the mirror, and appear to come from a virtual image (dashed, behind the mirror). Drag the object to see the image track it at equal distance behind.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            viz.originX = w / 2;
                            viz.originY = h / 2;

                            // Mirror at x = 0, vertical
                            var mirrorX = 0;
                            var obj = viz.addDraggable('obj', -3, 0.5, viz.colors.gold, 10);

                            function draw() {
                                viz.clear();

                                var ox = obj.x, oy = obj.y;
                                if (ox > -0.5) { ox = -0.5; obj.x = -0.5; }

                                // Image position: mirror-symmetric
                                var ix = -ox;
                                var iy = oy;

                                // Mirror surface
                                var mTop = -4, mBot = 4;
                                var mtS = viz.toScreen(mirrorX, mTop);
                                var mbS = viz.toScreen(mirrorX, mBot);
                                // Glass fill behind mirror
                                ctx.fillStyle = 'rgba(88,166,255,0.05)';
                                var mrS = viz.toScreen(7, mTop);
                                ctx.fillRect(mtS[0], mtS[1], mrS[0] - mtS[0], mbS[1] - mtS[1]);

                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 3;
                                ctx.beginPath(); ctx.moveTo(mtS[0], mtS[1]); ctx.lineTo(mbS[0], mbS[1]); ctx.stroke();

                                // Hatching on back of mirror
                                ctx.strokeStyle = viz.colors.blue + '33';
                                ctx.lineWidth = 1;
                                for (var hy = mtS[1]; hy < mbS[1]; hy += 12) {
                                    ctx.beginPath(); ctx.moveTo(mtS[0], hy); ctx.lineTo(mtS[0] + 8, hy - 8); ctx.stroke();
                                }

                                // Object (as a vertical arrow)
                                var objBase = viz.toScreen(ox, 0);
                                var objTip = viz.toScreen(ox, oy);
                                ctx.strokeStyle = viz.colors.gold;
                                ctx.lineWidth = 3;
                                ctx.beginPath(); ctx.moveTo(objBase[0], objBase[1]); ctx.lineTo(objTip[0], objTip[1]); ctx.stroke();
                                // Arrowhead
                                ctx.fillStyle = viz.colors.gold;
                                ctx.beginPath();
                                ctx.moveTo(objTip[0], objTip[1]);
                                ctx.lineTo(objTip[0] - 6, objTip[1] + 10);
                                ctx.lineTo(objTip[0] + 6, objTip[1] + 10);
                                ctx.closePath();
                                ctx.fill();
                                viz.drawText('Object', ox, -0.6, viz.colors.gold, 11, 'center', 'top');

                                // Image (dashed vertical arrow)
                                var imgBase = viz.toScreen(ix, 0);
                                var imgTip = viz.toScreen(ix, iy);
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.lineWidth = 3;
                                ctx.setLineDash([6, 4]);
                                ctx.beginPath(); ctx.moveTo(imgBase[0], imgBase[1]); ctx.lineTo(imgTip[0], imgTip[1]); ctx.stroke();
                                ctx.setLineDash([]);
                                // Arrowhead
                                ctx.fillStyle = viz.colors.purple;
                                ctx.beginPath();
                                ctx.moveTo(imgTip[0], imgTip[1]);
                                ctx.lineTo(imgTip[0] - 6, imgTip[1] + 10);
                                ctx.lineTo(imgTip[0] + 6, imgTip[1] + 10);
                                ctx.closePath();
                                ctx.fill();
                                viz.drawText('Virtual image', ix, -0.6, viz.colors.purple, 11, 'center', 'top');

                                // Draw 3 representative rays from object tip to mirror, then reflected
                                var rayTargets = [
                                    { my: oy, col: viz.colors.orange },        // horizontal ray
                                    { my: oy + 1.5, col: viz.colors.teal },     // angled ray up
                                    { my: oy - 1.5, col: viz.colors.cyan }      // angled ray down
                                ];

                                for (var ri = 0; ri < rayTargets.length; ri++) {
                                    var hitY = rayTargets[ri].my;
                                    if (hitY > mBot - 0.3 || hitY < mTop + 0.3) continue;
                                    var col = rayTargets[ri].col;

                                    // Incident ray: object tip to mirror at (0, hitY)
                                    var p1 = viz.toScreen(ox, oy);
                                    var p2 = viz.toScreen(mirrorX, hitY);
                                    ctx.save();
                                    ctx.shadowColor = col;
                                    ctx.shadowBlur = 4;
                                    ctx.strokeStyle = col;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.stroke();

                                    // Reflected ray: from hit point, direction reflected about x-normal
                                    // Incoming direction: (mirrorX - ox, hitY - oy)
                                    // Normal at flat vertical mirror: (-1, 0) (pointing left, toward object)
                                    // Reflect: flip x component
                                    var refDx = -(mirrorX - ox);
                                    var refDy = hitY - oy;
                                    var refLen = Math.sqrt(refDx * refDx + refDy * refDy);
                                    var refNx = refDx / refLen;
                                    var refNy = refDy / refLen;
                                    var refEndX = mirrorX + refNx * 5;
                                    var refEndY = hitY + refNy * 5;
                                    // Clamp to screen
                                    var p3 = viz.toScreen(refEndX, refEndY);
                                    ctx.strokeStyle = col;
                                    ctx.beginPath(); ctx.moveTo(p2[0], p2[1]); ctx.lineTo(p3[0], p3[1]); ctx.stroke();

                                    // Virtual extension behind mirror (dashed)
                                    ctx.strokeStyle = col + '55';
                                    ctx.setLineDash([4, 4]);
                                    var p4 = viz.toScreen(ix, iy);
                                    ctx.beginPath(); ctx.moveTo(p2[0], p2[1]); ctx.lineTo(p4[0], p4[1]); ctx.stroke();
                                    ctx.setLineDash([]);
                                    ctx.restore();
                                }

                                // Distance labels
                                var distObj = Math.abs(ox);
                                var distImg = Math.abs(ix);
                                var labelY1 = viz.toScreen(0, -2.5);
                                // d_o bracket
                                var oS = viz.toScreen(ox, -2.2);
                                var mS = viz.toScreen(mirrorX, -2.2);
                                ctx.strokeStyle = viz.colors.gold;
                                ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(oS[0], oS[1]); ctx.lineTo(mS[0], oS[1]); ctx.stroke();
                                viz.screenText('d\u2092 = ' + distObj.toFixed(1), (oS[0] + mS[0]) / 2, oS[1] + 14, viz.colors.gold, 10);

                                // d_i bracket
                                var iS = viz.toScreen(ix, -2.2);
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.beginPath(); ctx.moveTo(mS[0], mS[1]); ctx.lineTo(iS[0], mS[1]); ctx.stroke();
                                viz.screenText('d\u1D62 = ' + distImg.toFixed(1), (mS[0] + iS[0]) / 2, mS[1] + 14, viz.colors.purple, 10);

                                viz.screenText('Mirror', mtS[0] + 8, mtS[1] + 8, viz.colors.blue, 10, 'left', 'top');

                                viz.drawDraggables();
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'You stand 2 m in front of a plane mirror. How far away does your image appear to be from you?',
                        hint: 'The image is as far behind the mirror as you are in front.',
                        solution: 'The image is 2 m behind the mirror, so it is \\(2 + 2 = 4\\,\\text{m}\\) from you.'
                    },
                    {
                        question: 'What is the minimum height a plane mirror must have for you to see your entire body? Where should it be placed?',
                        hint: 'Draw rays from the top of your head and your feet to your eyes, reflecting off the mirror.',
                        solution: 'The mirror must be at least half your height. The top edge of the mirror should be at the midpoint between your eyes and the top of your head, and the bottom edge at the midpoint between your eyes and your feet. This result is independent of how far you stand from the mirror.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Curved Mirrors - Concave
            // ============================================================
            {
                id: 'concave-mirrors',
                title: 'Curved Mirrors \u2014 Concave',
                content: `
<h2>Mirrors That Converge Light</h2>

<p>A <strong>concave mirror</strong> (also called a converging mirror) has a reflecting surface that curves inward, like the inside of a spoon. Parallel rays striking a concave mirror converge at a single point called the <strong>focal point</strong> \\(F\\).</p>

<div class="env-block definition">
<div class="env-title">Key terms for curved mirrors</div>
<div class="env-body">
<ul>
<li><strong>Centre of curvature</strong> (\\(C\\)): the centre of the sphere of which the mirror is a section. Radius = \\(R\\).</li>
<li><strong>Focal point</strong> (\\(F\\)): the point where parallel rays converge after reflection. Located at \\(f = R/2\\) from the mirror.</li>
<li><strong>Principal axis</strong>: the line through \\(C\\), \\(F\\), and the centre of the mirror.</li>
<li><strong>Focal length</strong>: \\(f = R/2\\).</li>
</ul>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Mirror equation</div>
<div class="env-body">
\\[\\frac{1}{d_o} + \\frac{1}{d_i} = \\frac{1}{f}\\]
<p>where \\(d_o\\) is the object distance, \\(d_i\\) is the image distance (both measured from the mirror), and \\(f\\) is the focal length. For concave mirrors, \\(f > 0\\). A positive \\(d_i\\) means a real image (in front of the mirror); a negative \\(d_i\\) means a virtual image (behind the mirror).</p>
</div>
</div>

<p>The <strong>magnification</strong> is:</p>
\\[m = -\\frac{d_i}{d_o}\\]
<p>A negative \\(m\\) means the image is inverted; a positive \\(m\\) means it is upright. \\(|m| > 1\\) means the image is enlarged; \\(|m| < 1\\) means it is reduced.</p>

<div class="viz-placeholder" data-viz="viz-concave-mirror"></div>

<div class="env-block example">
<div class="env-title">Example: Object beyond C</div>
<div class="env-body">
<p>A concave mirror has \\(f = 10\\,\\text{cm}\\). An object is placed at \\(d_o = 30\\,\\text{cm}\\).</p>
\\[\\frac{1}{d_i} = \\frac{1}{f} - \\frac{1}{d_o} = \\frac{1}{10} - \\frac{1}{30} = \\frac{2}{30} = \\frac{1}{15}\\]
<p>So \\(d_i = 15\\,\\text{cm}\\). The image is real (positive \\(d_i\\)), inverted (\\(m = -15/30 = -0.5\\)), and reduced (\\(|m| < 1\\)).</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-concave-mirror',
                        title: 'Concave Mirror: Ray Diagram',
                        description: 'Drag the object (gold arrow) along the principal axis. Three principal rays are drawn: (1) parallel to axis, reflects through F; (2) through F, reflects parallel; (3) through C, reflects back on itself. The image forms where the rays converge.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 30, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            viz.originX = w * 0.85;
                            viz.originY = h * 0.5;

                            var R = 8;
                            var f = R / 2;

                            var objDist = viz.addDraggable('obj', -10, 0, viz.colors.gold, 10);
                            var objHeight = 2.0;

                            VizEngine.createSlider(controls, 'Object height', 0.5, 3.5, objHeight, 0.1, function (v) { objHeight = v; });
                            VizEngine.createSlider(controls, 'Focal length f', 2, 6, f, 0.2, function (v) { f = v; R = 2 * v; });

                            function draw() {
                                viz.clear();

                                var ox = objDist.x;
                                if (ox > -1.0) { ox = -1.0; objDist.x = -1.0; }
                                objDist.y = 0;
                                var do_ = Math.abs(ox);
                                var oh = objHeight;

                                // Mirror at x=0 (right side)
                                var mirrorX = 0;

                                // Draw concave mirror as an arc
                                ctx.save();
                                ctx.shadowColor = viz.colors.blue;
                                ctx.shadowBlur = 6;
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                var arcPoints = 60;
                                for (var ai = 0; ai <= arcPoints; ai++) {
                                    var theta = -0.6 + 1.2 * ai / arcPoints;
                                    var ax = -R + R * Math.cos(theta);
                                    var ay = R * Math.sin(theta);
                                    var sp = viz.toScreen(ax, ay);
                                    if (ai === 0) ctx.moveTo(sp[0], sp[1]);
                                    else ctx.lineTo(sp[0], sp[1]);
                                }
                                ctx.stroke();
                                ctx.restore();

                                // Principal axis
                                viz.drawSegment(-16, 0, 2, 0, viz.colors.axis, 1, false);

                                // Mark F and C
                                var fS = viz.toScreen(-f, 0);
                                var cS = viz.toScreen(-R, 0);
                                ctx.fillStyle = viz.colors.teal;
                                ctx.beginPath(); ctx.arc(fS[0], fS[1], 5, 0, Math.PI * 2); ctx.fill();
                                viz.drawText('F', -f, -0.6, viz.colors.teal, 12, 'center', 'top');
                                ctx.fillStyle = viz.colors.purple;
                                ctx.beginPath(); ctx.arc(cS[0], cS[1], 5, 0, Math.PI * 2); ctx.fill();
                                viz.drawText('C', -R, -0.6, viz.colors.purple, 12, 'center', 'top');

                                // Object arrow
                                var oBase = viz.toScreen(ox, 0);
                                var oTip = viz.toScreen(ox, oh);
                                ctx.strokeStyle = viz.colors.gold;
                                ctx.lineWidth = 3;
                                ctx.beginPath(); ctx.moveTo(oBase[0], oBase[1]); ctx.lineTo(oTip[0], oTip[1]); ctx.stroke();
                                ctx.fillStyle = viz.colors.gold;
                                ctx.beginPath();
                                ctx.moveTo(oTip[0], oTip[1]);
                                ctx.lineTo(oTip[0] - 5, oTip[1] + 10);
                                ctx.lineTo(oTip[0] + 5, oTip[1] + 10);
                                ctx.closePath(); ctx.fill();

                                // Compute image using mirror equation
                                var di = 1 / (1 / f - 1 / do_);
                                var m = -di / do_;
                                var ih = m * oh;
                                var imgX = -di; // negative di means behind mirror (virtual)

                                // Image arrow
                                var isReal = di > 0;
                                var iBase = viz.toScreen(imgX, 0);
                                var iTip = viz.toScreen(imgX, ih);
                                ctx.strokeStyle = isReal ? viz.colors.orange : viz.colors.purple;
                                ctx.lineWidth = 3;
                                if (!isReal) ctx.setLineDash([6, 4]);
                                ctx.beginPath(); ctx.moveTo(iBase[0], iBase[1]); ctx.lineTo(iTip[0], iTip[1]); ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.fillStyle = isReal ? viz.colors.orange : viz.colors.purple;
                                var arrowDir = ih > 0 ? -1 : 1;
                                ctx.beginPath();
                                ctx.moveTo(iTip[0], iTip[1]);
                                ctx.lineTo(iTip[0] - 5, iTip[1] + arrowDir * 10);
                                ctx.lineTo(iTip[0] + 5, iTip[1] + arrowDir * 10);
                                ctx.closePath(); ctx.fill();

                                // === Three principal rays ===
                                // Ray 1: From tip, parallel to axis -> hits mirror -> reflects through F
                                var ray1HitX = 0; // approximate: hits mirror at y = oh
                                // Actually hit the curved mirror surface
                                // For simplicity, approximate: ray hits mirror at (0, oh)
                                // Reflected through F: from (0, oh) to (-f, 0) and beyond
                                ctx.save();
                                ctx.shadowColor = viz.colors.orange;
                                ctx.shadowBlur = 3;
                                // Incoming: parallel
                                var r1s = viz.toScreen(ox, oh);
                                var r1h = viz.toScreen(0, oh);
                                ctx.strokeStyle = viz.colors.orange + 'cc';
                                ctx.lineWidth = 1.8;
                                ctx.beginPath(); ctx.moveTo(r1s[0], r1s[1]); ctx.lineTo(r1h[0], r1h[1]); ctx.stroke();
                                // Outgoing: through F
                                var r1dx = -f - 0, r1dy = 0 - oh;
                                var r1len = Math.sqrt(r1dx * r1dx + r1dy * r1dy);
                                var r1ex = 0 + r1dx / r1len * 20;
                                var r1ey = oh + r1dy / r1len * 20;
                                var r1e = viz.toScreen(r1ex, r1ey);
                                ctx.strokeStyle = viz.colors.orange + 'cc';
                                ctx.beginPath(); ctx.moveTo(r1h[0], r1h[1]); ctx.lineTo(r1e[0], r1e[1]); ctx.stroke();
                                ctx.restore();

                                // Ray 2: From tip through F -> hits mirror -> reflects parallel
                                if (do_ > f + 0.1) {
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.teal;
                                    ctx.shadowBlur = 3;
                                    // Direction from (ox, oh) toward (-f, 0)
                                    var r2dx = -f - ox, r2dy = 0 - oh;
                                    var r2len = Math.sqrt(r2dx * r2dx + r2dy * r2dy);
                                    // Find where this ray hits x=0 (mirror surface approx)
                                    var r2t = (0 - ox) / (r2dx / r2len);
                                    var r2hitY = oh + (r2dy / r2len) * r2t;
                                    var r2s = viz.toScreen(ox, oh);
                                    var r2h = viz.toScreen(0, r2hitY);
                                    ctx.strokeStyle = viz.colors.teal + 'cc';
                                    ctx.lineWidth = 1.8;
                                    ctx.beginPath(); ctx.moveTo(r2s[0], r2s[1]); ctx.lineTo(r2h[0], r2h[1]); ctx.stroke();
                                    // Outgoing: parallel to axis
                                    var r2e = viz.toScreen(-20, r2hitY);
                                    ctx.beginPath(); ctx.moveTo(r2h[0], r2h[1]); ctx.lineTo(r2e[0], r2e[1]); ctx.stroke();
                                    ctx.restore();
                                }

                                // Ray 3: From tip through C -> hits mirror -> reflects back on itself
                                ctx.save();
                                ctx.shadowColor = viz.colors.cyan;
                                ctx.shadowBlur = 3;
                                var r3dx = -R - ox, r3dy = 0 - oh;
                                var r3len2 = Math.sqrt(r3dx * r3dx + r3dy * r3dy);
                                var r3t = (0 - ox) / (r3dx / r3len2);
                                var r3hitY = oh + (r3dy / r3len2) * r3t;
                                var r3s = viz.toScreen(ox, oh);
                                var r3h = viz.toScreen(0, r3hitY);
                                ctx.strokeStyle = viz.colors.cyan + 'cc';
                                ctx.lineWidth = 1.8;
                                ctx.beginPath(); ctx.moveTo(r3s[0], r3s[1]); ctx.lineTo(r3h[0], r3h[1]); ctx.stroke();
                                // Reflects back the same way
                                var r3e = viz.toScreen(0 + (ox - 0) * 2, r3hitY + (oh - r3hitY) * 2);
                                ctx.beginPath(); ctx.moveTo(r3h[0], r3h[1]); ctx.lineTo(r3e[0], r3e[1]); ctx.stroke();
                                ctx.restore();

                                // Info text
                                var infoX = 15, infoY = 18;
                                viz.screenText('d\u2092 = ' + do_.toFixed(1), infoX, infoY, viz.colors.gold, 12, 'left', 'top');
                                viz.screenText('d\u1D62 = ' + di.toFixed(1) + (isReal ? ' (real)' : ' (virtual)'), infoX, infoY + 16, isReal ? viz.colors.orange : viz.colors.purple, 12, 'left', 'top');
                                viz.screenText('m = ' + m.toFixed(2), infoX, infoY + 32, viz.colors.text, 12, 'left', 'top');
                                viz.screenText('f = ' + f.toFixed(1), infoX, infoY + 48, viz.colors.teal, 12, 'left', 'top');

                                // Ray legend
                                viz.screenText('1: Parallel \u2192 through F', infoX, h - 44, viz.colors.orange, 10, 'left', 'bottom');
                                viz.screenText('2: Through F \u2192 parallel', infoX, h - 30, viz.colors.teal, 10, 'left', 'bottom');
                                viz.screenText('3: Through C \u2192 back', infoX, h - 16, viz.colors.cyan, 10, 'left', 'bottom');

                                viz.drawDraggables();
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A concave mirror has a radius of curvature of 40 cm. An object is placed 30 cm from the mirror. Where is the image, and is it real or virtual?',
                        hint: 'First find \\(f = R/2\\), then use the mirror equation.',
                        solution: '\\(f = 40/2 = 20\\,\\text{cm}\\). \\(\\frac{1}{d_i} = \\frac{1}{20} - \\frac{1}{30} = \\frac{1}{60}\\). So \\(d_i = 60\\,\\text{cm}\\). The image is real (positive \\(d_i\\)), inverted, and magnified by a factor of \\(|m| = 60/30 = 2\\).'
                    },
                    {
                        question: 'An object is placed 10 cm from a concave mirror with \\(f = 15\\,\\text{cm}\\). Describe the image.',
                        hint: 'The object is inside the focal length.',
                        solution: '\\(\\frac{1}{d_i} = \\frac{1}{15} - \\frac{1}{10} = \\frac{-1}{30}\\). So \\(d_i = -30\\,\\text{cm}\\). Negative \\(d_i\\) means the image is <strong>virtual</strong> (behind the mirror), upright, and magnified by \\(|m| = 30/10 = 3\\). This is how a shaving/makeup mirror works.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Curved Mirrors - Convex
            // ============================================================
            {
                id: 'convex-mirrors',
                title: 'Curved Mirrors \u2014 Convex',
                content: `
<h2>Mirrors That Diverge Light</h2>

<p>A <strong>convex mirror</strong> (also called a diverging mirror) has a reflecting surface that curves outward, like the back of a spoon. Parallel rays striking a convex mirror diverge after reflection, but appear to come from a focal point \\(F\\) <em>behind</em> the mirror.</p>

<div class="env-block theorem">
<div class="env-title">Convex mirror properties</div>
<div class="env-body">
<p>The mirror equation still applies:</p>
\\[\\frac{1}{d_o} + \\frac{1}{d_i} = \\frac{1}{f}\\]
<p>but for a convex mirror, \\(f < 0\\) (the focal point is behind the mirror). The image distance \\(d_i\\) is always negative, meaning the image is always <strong>virtual</strong>, <strong>upright</strong>, and <strong>reduced</strong>.</p>
</div>
</div>

<p>No matter where the object is placed, a convex mirror always produces a virtual, upright, reduced image behind the mirror. This makes convex mirrors excellent for wide-angle viewing.</p>

<div class="env-block example">
<div class="env-title">Example: Car side mirror</div>
<div class="env-body">
<p>A convex car mirror has \\(f = -1.0\\,\\text{m}\\). An approaching car is 5 m behind you.</p>
\\[\\frac{1}{d_i} = \\frac{1}{f} - \\frac{1}{d_o} = \\frac{1}{-1.0} - \\frac{1}{5.0} = -1.2\\]
<p>\\(d_i = -0.83\\,\\text{m}\\) (virtual, behind mirror). Magnification: \\(m = -(-0.83)/5 = 0.17\\). The image is about 17% the size of the actual car, which is why side mirrors carry the warning: "Objects in mirror are closer than they appear."</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Where convex mirrors are used</div>
<div class="env-body">
<p>Convex mirrors are used in car side mirrors, shop security mirrors, road blind-spot mirrors, and ATM monitors. Their wide field of view (they can show nearly 180 degrees) makes them ideal for surveillance and safety, even though the image is smaller than reality.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A convex mirror has \\(f = -20\\,\\text{cm}\\). An object is placed 60 cm in front of it. Find the image distance and magnification.',
                        hint: 'Use the mirror equation with a negative \\(f\\).',
                        solution: '\\(\\frac{1}{d_i} = \\frac{1}{-20} - \\frac{1}{60} = \\frac{-3-1}{60} = \\frac{-4}{60}\\). So \\(d_i = -15\\,\\text{cm}\\). Magnification: \\(m = -(-15)/60 = 0.25\\). The image is virtual, upright, and one-quarter the size.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Ray Diagrams
            // ============================================================
            {
                id: 'ray-diagrams',
                title: 'Ray Diagrams',
                content: `
<h2>Three Rays to Find Any Image</h2>

<p>A <strong>ray diagram</strong> is a geometric construction that locates the image formed by a mirror (or lens) without algebra. For curved mirrors, three special rays are sufficient:</p>

<div class="env-block theorem">
<div class="env-title">The three principal rays for curved mirrors</div>
<div class="env-body">
<ol>
<li><strong>Parallel ray</strong>: A ray parallel to the principal axis reflects through the focal point \\(F\\) (concave) or appears to come from \\(F\\) (convex).</li>
<li><strong>Focal ray</strong>: A ray passing through \\(F\\) (concave) or aimed at \\(F\\) (convex) reflects parallel to the principal axis.</li>
<li><strong>Centre ray</strong>: A ray passing through the centre of curvature \\(C\\) reflects back on itself (it hits the mirror along a radius, which is perpendicular to the surface).</li>
</ol>
<p>The image is located where any two of these three rays intersect (or where their extensions intersect, for virtual images).</p>
</div>
</div>

<p>You only need two rays to locate the image, but drawing all three provides a check: if they do not all meet at the same point, you have made an error.</p>

<h3>Summary of concave mirror images</h3>

<table style="width:100%;border-collapse:collapse;">
<tr style="border-bottom:1px solid #30363d;"><th style="text-align:left;padding:4px;">Object position</th><th style="text-align:left;padding:4px;">Image position</th><th style="text-align:left;padding:4px;">Nature</th></tr>
<tr><td style="padding:4px;">Beyond \\(C\\)</td><td style="padding:4px;">Between \\(F\\) and \\(C\\)</td><td style="padding:4px;">Real, inverted, reduced</td></tr>
<tr><td style="padding:4px;">At \\(C\\)</td><td style="padding:4px;">At \\(C\\)</td><td style="padding:4px;">Real, inverted, same size</td></tr>
<tr><td style="padding:4px;">Between \\(F\\) and \\(C\\)</td><td style="padding:4px;">Beyond \\(C\\)</td><td style="padding:4px;">Real, inverted, enlarged</td></tr>
<tr><td style="padding:4px;">At \\(F\\)</td><td style="padding:4px;">At infinity</td><td style="padding:4px;">No image (parallel rays)</td></tr>
<tr><td style="padding:4px;">Inside \\(F\\)</td><td style="padding:4px;">Behind mirror</td><td style="padding:4px;">Virtual, upright, enlarged</td></tr>
</table>

<div class="env-block warning">
<div class="env-title">Sign conventions matter</div>
<div class="env-body">
<p>Different textbooks use different sign conventions. The one used here: distances in front of the mirror are positive, behind the mirror negative. Concave mirrors have positive \\(f\\), convex mirrors negative \\(f\\). Always check which convention your textbook uses before applying the mirror equation.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Paraxial approximation</div>
<div class="env-body">
<p>All the neat formulas above (mirror equation, three principal rays converging to a point) rely on the <strong>paraxial approximation</strong>: rays should make small angles with the principal axis. For rays far from the axis or steeply angled, the image is blurred (an aberration called <em>spherical aberration</em>). Parabolic mirrors correct this by focusing all parallel rays to a single point regardless of their distance from the axis, which is why telescopes and satellite dishes use parabolic reflectors.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'An object is placed at the centre of curvature of a concave mirror. Describe the image using a ray diagram.',
                        hint: 'Draw the three principal rays from the tip of the object. Where do they converge?',
                        solution: 'The parallel ray reflects through \\(F\\); the focal ray reflects parallel; the centre ray reflects back on itself. All three converge at \\(C\\), producing a real, inverted image at \\(C\\), the same size as the object. \\(m = -1\\).'
                    },
                    {
                        question: 'A dentist uses a concave mirror to examine a tooth. The mirror has \\(f = 3\\,\\text{cm}\\) and the tooth is 2 cm from the mirror. What does the dentist see?',
                        hint: 'The tooth is inside the focal length.',
                        solution: '\\(\\frac{1}{d_i} = \\frac{1}{3} - \\frac{1}{2} = \\frac{-1}{6}\\). \\(d_i = -6\\,\\text{cm}\\). The image is virtual (behind the mirror), upright, and magnified by \\(|m| = 6/2 = 3\\). The dentist sees an enlarged, upright image of the tooth. This is exactly the purpose of a dentist\'s mirror.'
                    }
                ]
            }
        ]
    });
})();
