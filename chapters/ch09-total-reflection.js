// === Chapter 9: Total Internal Reflection ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch09',
        number: 9,
        title: 'Total Internal Reflection',
        subtitle: 'When light refuses to leave',
        file: 'ch09-total-reflection',

        sections: [
            // ============================================================
            // Section 0: Critical Angle
            // ============================================================
            {
                id: 'critical-angle',
                title: 'Critical Angle',
                content: `
<h2>The Angle That Changes Everything</h2>

<p>When light travels from a denser medium (like glass or water) into a less dense medium (like air), it bends <em>away</em> from the normal. As you increase the angle of incidence, the refracted ray bends further and further from the normal, approaching a 90-degree angle with it. At one special angle, the refracted ray skims right along the surface. This is the <strong>critical angle</strong>.</p>

<div class="env-block definition">
<div class="env-title">Definition: Critical Angle</div>
<div class="env-body">
<p>The <strong>critical angle</strong> \\(\\theta_c\\) is the angle of incidence in the denser medium at which the refracted ray in the less dense medium makes an angle of exactly \\(90^\\circ\\) with the normal. For any angle of incidence greater than \\(\\theta_c\\), no refracted ray exists; all light is reflected back into the denser medium.</p>
</div>
</div>

<p>Think of it as a threshold. Below the critical angle, light partially refracts and partially reflects. At the critical angle, the refracted ray grazes the surface. Above the critical angle, refraction becomes impossible and light bounces back entirely.</p>

<div class="env-block intuition">
<div class="env-title">Why only from dense to less dense?</div>
<div class="env-body">
<p>When light goes from a less dense medium into a denser one, it bends <em>toward</em> the normal. The refracted angle is always smaller than the incident angle, so it can never reach 90 degrees. The critical angle phenomenon only occurs when light tries to escape from a medium with a higher refractive index to one with a lower refractive index.</p>
</div>
</div>

<h3>Everyday experience</h3>

<p>If you have ever looked up from underwater in a swimming pool, you have seen total internal reflection in action. The surface appears mirror-like at steep viewing angles, and you can only see through a circular "window" directly above you. That window's edge corresponds to the critical angle of water (about \\(48.6^\\circ\\)).</p>

<div class="viz-placeholder" data-viz="viz-critical-angle"></div>
`,
                visualizations: [
                    {
                        id: 'viz-critical-angle',
                        title: 'Finding the Critical Angle',
                        description: 'A light ray travels from a denser medium (bottom, blue) into a less dense medium (top). <strong>Drag the slider</strong> to change the angle of incidence. Watch the refracted ray bend further until it vanishes at the critical angle.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 50, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            viz.originX = w / 2;
                            viz.originY = h / 2;

                            var n1 = 1.5, n2 = 1.0;
                            var angle = 30;
                            var critAngle = Math.asin(n2 / n1) * 180 / Math.PI;

                            var slAngle = VizEngine.createSlider(controls, '\u03b8\u1d62 (deg)', 0, 85, angle, 0.5, function (v) { angle = v; });
                            var slN1 = VizEngine.createSlider(controls, 'n\u2081 (dense)', 1.2, 2.5, n1, 0.05, function (v) {
                                n1 = v;
                                critAngle = n2 / n1 <= 1 ? Math.asin(n2 / n1) * 180 / Math.PI : 90;
                            });

                            function draw() {
                                viz.clear();
                                var midY = h / 2;

                                // Draw media
                                ctx.fillStyle = 'rgba(30, 60, 120, 0.25)';
                                ctx.fillRect(0, midY, w, h / 2);
                                ctx.fillStyle = 'rgba(100, 180, 255, 0.06)';
                                ctx.fillRect(0, 0, w, midY);

                                // Interface line
                                ctx.strokeStyle = 'rgba(255,255,255,0.3)';
                                ctx.lineWidth = 2;
                                ctx.beginPath(); ctx.moveTo(0, midY); ctx.lineTo(w, midY); ctx.stroke();

                                // Normal (dashed)
                                ctx.strokeStyle = 'rgba(255,255,255,0.15)';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([6, 4]);
                                ctx.beginPath(); ctx.moveTo(w / 2, midY - 180); ctx.lineTo(w / 2, midY + 180); ctx.stroke();
                                ctx.setLineDash([]);

                                // Labels
                                viz.screenText('n\u2081 = ' + n1.toFixed(2) + ' (denser)', w / 2, midY + 30, viz.colors.cyan, 12);
                                viz.screenText('n\u2082 = ' + n2.toFixed(2) + ' (air)', w / 2, midY - 22, viz.colors.text, 12);

                                var thetaI = angle * Math.PI / 180;
                                var sinThetaR = n1 * Math.sin(thetaI) / n2;
                                var isTIR = sinThetaR > 1;

                                critAngle = n2 / n1 <= 1 ? Math.asin(n2 / n1) * 180 / Math.PI : 90;

                                // Incident ray (from bottom-left to center)
                                var rayLen = 170;
                                var ix = w / 2 - rayLen * Math.sin(thetaI);
                                var iy = midY + rayLen * Math.cos(thetaI);

                                // Glowing incident ray
                                ctx.save();
                                ctx.shadowColor = viz.colors.gold;
                                ctx.shadowBlur = 12;
                                ctx.strokeStyle = viz.colors.gold;
                                ctx.lineWidth = 3;
                                ctx.beginPath(); ctx.moveTo(ix, iy); ctx.lineTo(w / 2, midY); ctx.stroke();
                                ctx.restore();

                                // Arrowhead on incident ray
                                var aDir = Math.atan2(midY - iy, w / 2 - ix);
                                var aLen = 10;
                                var aMid = 0.6;
                                var ax = ix + (w / 2 - ix) * aMid;
                                var ay = iy + (midY - iy) * aMid;
                                ctx.fillStyle = viz.colors.gold;
                                ctx.beginPath();
                                ctx.moveTo(ax + aLen * Math.cos(aDir), ay + aLen * Math.sin(aDir));
                                ctx.lineTo(ax + aLen * Math.cos(aDir + 2.6), ay + aLen * Math.sin(aDir + 2.6));
                                ctx.lineTo(ax + aLen * Math.cos(aDir - 2.6), ay + aLen * Math.sin(aDir - 2.6));
                                ctx.closePath(); ctx.fill();

                                if (!isTIR) {
                                    // Refracted ray
                                    var thetaR = Math.asin(sinThetaR);
                                    var rx = w / 2 + rayLen * Math.sin(thetaR);
                                    var ry = midY - rayLen * Math.cos(thetaR);

                                    // Intensity based on Fresnel (approximate)
                                    var reflectance = Math.pow((n1 * Math.cos(thetaI) - n2 * Math.cos(thetaR)) / (n1 * Math.cos(thetaI) + n2 * Math.cos(thetaR)), 2);
                                    var transmittance = 1 - reflectance;

                                    ctx.save();
                                    ctx.shadowColor = viz.colors.cyan;
                                    ctx.shadowBlur = 8 * transmittance;
                                    ctx.strokeStyle = viz.colors.cyan;
                                    ctx.globalAlpha = 0.3 + 0.7 * transmittance;
                                    ctx.lineWidth = 2.5;
                                    ctx.beginPath(); ctx.moveTo(w / 2, midY); ctx.lineTo(rx, ry); ctx.stroke();
                                    ctx.restore();

                                    // Partial reflected ray
                                    var prx = w / 2 + rayLen * Math.sin(thetaI) * reflectance;
                                    var pry = midY + rayLen * Math.cos(thetaI) * reflectance;
                                    ctx.save();
                                    ctx.globalAlpha = 0.15 + 0.85 * reflectance;
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath(); ctx.moveTo(w / 2, midY); ctx.lineTo(w / 2 + rayLen * Math.sin(thetaI), midY + rayLen * Math.cos(thetaI)); ctx.stroke();
                                    ctx.restore();

                                    // Angle arcs
                                    ctx.strokeStyle = viz.colors.gold;
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    ctx.arc(w / 2, midY, 35, -Math.PI / 2, -Math.PI / 2 + thetaI, false);
                                    ctx.stroke();
                                    viz.screenText('\u03b8\u1d62', w / 2 + 42 * Math.sin(thetaI / 2), midY + 42 * Math.cos(thetaI / 2), viz.colors.gold, 11);

                                    ctx.strokeStyle = viz.colors.cyan;
                                    ctx.beginPath();
                                    ctx.arc(w / 2, midY, 45, -Math.PI / 2 - thetaR, -Math.PI / 2, false);
                                    ctx.stroke();
                                    viz.screenText('\u03b8\u1d63', w / 2 + 52 * Math.sin(thetaR / 2), midY - 52 * Math.cos(thetaR / 2), viz.colors.cyan, 11);
                                } else {
                                    // Total internal reflection
                                    var rrx = w / 2 + rayLen * Math.sin(thetaI);
                                    var rry = midY + rayLen * Math.cos(thetaI);

                                    ctx.save();
                                    ctx.shadowColor = viz.colors.orange;
                                    ctx.shadowBlur = 16;
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.lineWidth = 3;
                                    ctx.beginPath(); ctx.moveTo(w / 2, midY); ctx.lineTo(rrx, rry); ctx.stroke();
                                    ctx.restore();

                                    // Glow at impact point
                                    var grad = ctx.createRadialGradient(w / 2, midY, 0, w / 2, midY, 40);
                                    grad.addColorStop(0, 'rgba(255,215,0,0.4)');
                                    grad.addColorStop(1, 'rgba(255,215,0,0)');
                                    ctx.fillStyle = grad;
                                    ctx.beginPath(); ctx.arc(w / 2, midY, 40, 0, Math.PI * 2); ctx.fill();

                                    // Angle arc
                                    ctx.strokeStyle = viz.colors.gold;
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    ctx.arc(w / 2, midY, 35, -Math.PI / 2, -Math.PI / 2 + thetaI, false);
                                    ctx.stroke();
                                    viz.screenText('\u03b8\u1d62', w / 2 + 42 * Math.sin(thetaI / 2), midY + 42 * Math.cos(thetaI / 2), viz.colors.gold, 11);

                                    viz.screenText('TOTAL INTERNAL REFLECTION', w / 2, 30, viz.colors.red, 16);
                                }

                                // Info display
                                viz.screenText('\u03b8_c = ' + critAngle.toFixed(1) + '\u00b0', w - 20, h - 50, viz.colors.teal, 13, 'right');
                                viz.screenText('\u03b8\u1d62 = ' + angle.toFixed(1) + '\u00b0', w - 20, h - 30, viz.colors.gold, 13, 'right');

                                if (Math.abs(angle - critAngle) < 1.5) {
                                    viz.screenText('At the critical angle!', w / 2, 30, viz.colors.teal, 15);
                                }
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Light travels from water (\\(n = 1.33\\)) into air (\\(n = 1.00\\)). What is the critical angle?',
                        hint: 'At the critical angle, the refracted ray is at \\(90^\\circ\\). Apply Snell\'s law: \\(n_1 \\sin\\theta_c = n_2 \\sin 90^\\circ\\).',
                        solution: '\\(\\sin\\theta_c = \\frac{n_2}{n_1} = \\frac{1.00}{1.33} = 0.752\\). So \\(\\theta_c = \\arcsin(0.752) \\approx 48.8^\\circ\\).'
                    },
                    {
                        question: 'Does a critical angle exist for light going from air into glass? Explain.',
                        hint: 'Think about which medium must be denser for TIR to occur.',
                        solution: 'No. Total internal reflection only occurs when light travels from a denser medium (higher \\(n\\)) to a less dense medium (lower \\(n\\)). When going from air into glass, the refracted angle is always smaller than the incident angle, so it never reaches \\(90^\\circ\\).'
                    }
                ]
            },

            // ============================================================
            // Section 1: Deriving the Critical Angle
            // ============================================================
            {
                id: 'deriving-critical-angle',
                title: 'Deriving the Critical Angle',
                content: `
<h2>From Snell's Law to the Formula</h2>

<p>The critical angle follows directly from Snell's law. At the critical angle, the refracted ray travels along the interface, meaning the angle of refraction is exactly \\(90^\\circ\\).</p>

<div class="env-block theorem">
<div class="env-title">Critical Angle Formula</div>
<div class="env-body">
<p>For light traveling from medium 1 (refractive index \\(n_1\\)) to medium 2 (\\(n_2\\)), where \\(n_1 > n_2\\):</p>
\\[n_1 \\sin\\theta_c = n_2 \\sin 90^\\circ = n_2\\]
\\[\\boxed{\\theta_c = \\arcsin\\!\\left(\\frac{n_2}{n_1}\\right)}\\]
</div>
</div>

<h3>Step-by-step derivation</h3>

<p>Start with Snell's law:</p>
\\[n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2\\]

<p>At the critical angle, \\(\\theta_1 = \\theta_c\\) and \\(\\theta_2 = 90^\\circ\\):</p>
\\[n_1 \\sin\\theta_c = n_2 \\cdot 1\\]

<p>Solving for \\(\\theta_c\\):</p>
\\[\\sin\\theta_c = \\frac{n_2}{n_1}\\]

<p>Since \\(n_1 > n_2\\), the ratio \\(n_2/n_1 < 1\\), so the arcsine is well-defined and \\(\\theta_c < 90^\\circ\\). If \\(n_1 \\le n_2\\), the ratio would be \\(\\ge 1\\) and no critical angle exists.</p>

<div class="env-block example">
<div class="env-title">Example: Glass-to-Air</div>
<div class="env-body">
<p>Crown glass has \\(n = 1.52\\). Find the critical angle for the glass-air boundary.</p>
\\[\\theta_c = \\arcsin\\!\\left(\\frac{1.00}{1.52}\\right) = \\arcsin(0.658) \\approx 41.1^\\circ\\]
<p>Any ray inside the glass hitting the surface at more than \\(41.1^\\circ\\) from the normal will be totally reflected.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Diamond-to-Air</div>
<div class="env-body">
<p>Diamond has an exceptionally high refractive index: \\(n = 2.42\\).</p>
\\[\\theta_c = \\arcsin\\!\\left(\\frac{1.00}{2.42}\\right) = \\arcsin(0.413) \\approx 24.4^\\circ\\]
<p>This very small critical angle is key to why diamonds sparkle so brilliantly; light gets trapped inside, bouncing around many times.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">The higher \\(n_1\\), the smaller \\(\\theta_c\\)</div>
<div class="env-body">
<p>A larger refractive index means a smaller critical angle, which means more rays undergo total internal reflection. This is why diamond (\\(\\theta_c \\approx 24^\\circ\\)) traps far more light than glass (\\(\\theta_c \\approx 41^\\circ\\)) or water (\\(\\theta_c \\approx 49^\\circ\\)).</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Find the critical angle for light going from a medium with \\(n = 1.80\\) into water (\\(n = 1.33\\)).',
                        hint: 'Use \\(\\theta_c = \\arcsin(n_2 / n_1)\\) with \\(n_1 = 1.80\\) and \\(n_2 = 1.33\\).',
                        solution: '\\(\\theta_c = \\arcsin(1.33 / 1.80) = \\arcsin(0.739) \\approx 47.6^\\circ\\).'
                    },
                    {
                        question: 'A ray inside a material hits the surface at \\(35^\\circ\\) and undergoes TIR. The outside medium is air. What can you say about the refractive index of the material?',
                        hint: 'If TIR occurs at \\(35^\\circ\\), the critical angle must be less than \\(35^\\circ\\). Use the critical angle formula to find the minimum \\(n_1\\).',
                        solution: '\\(\\theta_c < 35^\\circ\\), so \\(\\sin\\theta_c < \\sin 35^\\circ = 0.574\\). Since \\(\\sin\\theta_c = 1/n_1\\), we get \\(n_1 > 1/0.574 \\approx 1.74\\). The material\'s refractive index must be greater than about 1.74.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Total Internal Reflection in Action
            // ============================================================
            {
                id: 'tir-in-action',
                title: 'Total Internal Reflection in Action',
                content: `
<h2>What Happens at the Boundary</h2>

<p>Total internal reflection is not an approximation or a simplification. When the angle of incidence exceeds the critical angle, <strong>100% of the light energy</strong> is reflected. No light crosses into the second medium (apart from an evanescent wave that decays exponentially within a fraction of a wavelength).</p>

<div class="env-block theorem">
<div class="env-title">Conditions for Total Internal Reflection</div>
<div class="env-body">
<p>Total internal reflection occurs when both conditions are met:</p>
<ol>
<li>Light travels from a medium with higher \\(n\\) to a medium with lower \\(n\\) (i.e., \\(n_1 > n_2\\)).</li>
<li>The angle of incidence \\(\\theta_i\\) exceeds the critical angle: \\(\\theta_i > \\theta_c = \\arcsin(n_2/n_1)\\).</li>
</ol>
</div>
</div>

<p>When these conditions are met, the boundary acts as a perfect mirror. Unlike a metallic mirror, which always absorbs a small fraction of light, TIR reflects every photon. This makes it incredibly useful in technology.</p>

<div class="env-block intuition">
<div class="env-title">The transition is smooth, not sudden</div>
<div class="env-body">
<p>As the angle of incidence approaches the critical angle from below, the reflected fraction grows steadily (according to the Fresnel equations). At a small angle, most light refracts through. Near the critical angle, most light reflects. At and beyond the critical angle, reflection reaches exactly 100%. The visualization below shows this transition: notice how the refracted ray fades as the reflected ray brightens.</p>
</div>
</div>

<h3>Snell's window</h3>

<p>An underwater observer looking upward sees a bright circular window on the surface (Snell's window), surrounded by a mirror-like region. The half-angle of this window equals the critical angle. Light from above can only enter the observer's eye if it falls within a cone of half-angle \\(\\theta_c \\approx 48.6^\\circ\\) (for water). Everything outside the cone is the reflected image of the underwater world.</p>

<div class="viz-placeholder" data-viz="viz-tir-transition"></div>
`,
                visualizations: [
                    {
                        id: 'viz-tir-transition',
                        title: 'Refraction to TIR Transition',
                        description: 'Watch the smooth transition from refraction to total internal reflection. The bar on the right shows reflected vs transmitted intensity. Adjust \\(n_1\\) to see how the critical angle changes.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 50, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            viz.originX = w * 0.4;
                            viz.originY = h / 2;

                            var n1 = 1.5, n2 = 1.0;
                            var angle = 0;
                            var time = 0;

                            var slAngle = VizEngine.createSlider(controls, '\u03b8\u1d62 (deg)', 0, 89, 0, 0.5, function (v) { angle = v; });
                            var slN1 = VizEngine.createSlider(controls, 'n\u2081', 1.2, 2.5, n1, 0.05, function (v) { n1 = v; });

                            function fresnel(tI, n1v, n2v) {
                                var sinTR = n1v * Math.sin(tI) / n2v;
                                if (sinTR >= 1) return 1;
                                var tR = Math.asin(sinTR);
                                var rs = (n1v * Math.cos(tI) - n2v * Math.cos(tR)) / (n1v * Math.cos(tI) + n2v * Math.cos(tR));
                                var rp = (n2v * Math.cos(tI) - n1v * Math.cos(tR)) / (n2v * Math.cos(tI) + n1v * Math.cos(tR));
                                return (rs * rs + rp * rp) / 2;
                            }

                            function draw(t) {
                                time = t * 0.001;
                                viz.clear();
                                var midY = h / 2;
                                var cx = w * 0.4;

                                // Media
                                ctx.fillStyle = 'rgba(20, 50, 100, 0.3)';
                                ctx.fillRect(0, midY, w * 0.75, h / 2);
                                ctx.fillStyle = 'rgba(80, 160, 240, 0.05)';
                                ctx.fillRect(0, 0, w * 0.75, midY);

                                // Interface
                                ctx.strokeStyle = 'rgba(255,255,255,0.25)';
                                ctx.lineWidth = 1.5;
                                ctx.beginPath(); ctx.moveTo(0, midY); ctx.lineTo(w * 0.75, midY); ctx.stroke();

                                // Normal
                                ctx.strokeStyle = 'rgba(255,255,255,0.12)';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([5, 4]);
                                ctx.beginPath(); ctx.moveTo(cx, 20); ctx.lineTo(cx, h - 20); ctx.stroke();
                                ctx.setLineDash([]);

                                var tI = angle * Math.PI / 180;
                                var critAng = Math.asin(n2 / n1);
                                var R = fresnel(tI, n1, n2);
                                var T = 1 - R;
                                var rayLen = 150;

                                // Animated pulse along incident ray
                                var pulse = (time * 0.8) % 1;

                                // Incident ray
                                var ix = cx - rayLen * Math.sin(tI);
                                var iy = midY + rayLen * Math.cos(tI);
                                ctx.save();
                                ctx.shadowColor = viz.colors.gold;
                                ctx.shadowBlur = 10;
                                ctx.strokeStyle = viz.colors.gold;
                                ctx.lineWidth = 3;
                                ctx.beginPath(); ctx.moveTo(ix, iy); ctx.lineTo(cx, midY); ctx.stroke();
                                ctx.restore();

                                // Pulse dot on incident ray
                                var px = ix + (cx - ix) * pulse;
                                var py = iy + (midY - iy) * pulse;
                                ctx.save();
                                ctx.shadowColor = viz.colors.gold; ctx.shadowBlur = 15;
                                ctx.fillStyle = '#fff';
                                ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
                                ctx.restore();

                                if (R < 1) {
                                    // Refracted ray
                                    var sinTR = n1 * Math.sin(tI) / n2;
                                    var tR = Math.asin(sinTR);
                                    var rx = cx + rayLen * Math.sin(tR);
                                    var ry = midY - rayLen * Math.cos(tR);
                                    ctx.save();
                                    ctx.globalAlpha = 0.3 + 0.7 * T;
                                    ctx.shadowColor = viz.colors.cyan;
                                    ctx.shadowBlur = 8 * T;
                                    ctx.strokeStyle = viz.colors.cyan;
                                    ctx.lineWidth = 2.5 * T + 0.5;
                                    ctx.beginPath(); ctx.moveTo(cx, midY); ctx.lineTo(rx, ry); ctx.stroke();
                                    ctx.restore();
                                }

                                // Reflected ray
                                var reflX = cx + rayLen * Math.sin(tI);
                                var reflY = midY + rayLen * Math.cos(tI);
                                ctx.save();
                                ctx.globalAlpha = 0.2 + 0.8 * R;
                                ctx.shadowColor = viz.colors.orange;
                                ctx.shadowBlur = 10 * R;
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2.5 * R + 0.5;
                                ctx.beginPath(); ctx.moveTo(cx, midY); ctx.lineTo(reflX, reflY); ctx.stroke();
                                ctx.restore();

                                // Impact glow
                                if (R > 0.9) {
                                    var glow = ctx.createRadialGradient(cx, midY, 0, cx, midY, 30 + 15 * Math.sin(time * 4));
                                    glow.addColorStop(0, 'rgba(255,215,0,0.35)');
                                    glow.addColorStop(1, 'rgba(255,215,0,0)');
                                    ctx.fillStyle = glow;
                                    ctx.beginPath(); ctx.arc(cx, midY, 45, 0, Math.PI * 2); ctx.fill();
                                }

                                // === Intensity bar on the right ===
                                var barX = w * 0.78, barW = 30, barH = h - 80, barTop = 40;
                                // Background
                                ctx.fillStyle = 'rgba(255,255,255,0.05)';
                                ctx.fillRect(barX, barTop, barW, barH);
                                ctx.strokeStyle = 'rgba(255,255,255,0.15)';
                                ctx.strokeRect(barX, barTop, barW, barH);

                                // Reflected portion (orange, from top)
                                ctx.fillStyle = viz.colors.orange;
                                ctx.fillRect(barX, barTop, barW, barH * R);

                                // Transmitted portion (cyan, from bottom)
                                ctx.fillStyle = viz.colors.cyan;
                                ctx.fillRect(barX, barTop + barH * R, barW, barH * T);

                                viz.screenText('R=' + (R * 100).toFixed(0) + '%', barX + barW / 2, barTop - 12, viz.colors.orange, 11);
                                viz.screenText('T=' + (T * 100).toFixed(0) + '%', barX + barW / 2, barTop + barH + 14, viz.colors.cyan, 11);

                                // Critical angle line on bar
                                var critFrac = critAng / (Math.PI / 2);
                                var critBarY = barTop + barH * critFrac;
                                ctx.strokeStyle = viz.colors.teal;
                                ctx.lineWidth = 1;
                                ctx.setLineDash([3, 3]);
                                ctx.beginPath(); ctx.moveTo(barX - 5, critBarY); ctx.lineTo(barX + barW + 5, critBarY); ctx.stroke();
                                ctx.setLineDash([]);

                                // Current angle indicator on bar
                                var curFrac = tI / (Math.PI / 2);
                                var curBarY = barTop + barH * curFrac;
                                ctx.fillStyle = viz.colors.white;
                                ctx.beginPath();
                                ctx.moveTo(barX - 8, curBarY);
                                ctx.lineTo(barX - 2, curBarY - 4);
                                ctx.lineTo(barX - 2, curBarY + 4);
                                ctx.closePath(); ctx.fill();

                                // Info
                                viz.screenText('\u03b8_c = ' + (critAng * 180 / Math.PI).toFixed(1) + '\u00b0', w * 0.4, h - 15, viz.colors.teal, 12);

                                if (R >= 0.999) {
                                    viz.screenText('TOTAL INTERNAL REFLECTION', w * 0.4, 18, viz.colors.red, 14);
                                }
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Why is total internal reflection truly "total," while normal mirror reflection always loses some light?',
                        hint: 'Think about what happens at the atomic level in a metallic mirror vs at a dielectric boundary.',
                        solution: 'In a metallic mirror, light penetrates a short distance into the metal and is absorbed by free electrons, which then re-radiate it. Some energy is always lost to resistive heating. In TIR, the electromagnetic boundary conditions require that 100% of the energy is reflected; no mechanism exists for absorption at a clean dielectric interface.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Optical Fibers
            // ============================================================
            {
                id: 'optical-fibers',
                title: 'Optical Fibers',
                content: `
<h2>Guiding Light Around Corners</h2>

<p>The most important technological application of total internal reflection is the <strong>optical fiber</strong>. A thin strand of glass or plastic, no thicker than a human hair, can carry light signals over hundreds of kilometers with negligible loss. Optical fibers form the backbone of the global internet.</p>

<div class="env-block definition">
<div class="env-title">Definition: Optical Fiber</div>
<div class="env-body">
<p>An <strong>optical fiber</strong> consists of a transparent <strong>core</strong> (refractive index \\(n_\\text{core}\\)) surrounded by a <strong>cladding</strong> (refractive index \\(n_\\text{clad}\\), with \\(n_\\text{clad} < n_\\text{core}\\)). Light entering the core at a sufficiently small angle with respect to the fiber axis undergoes repeated total internal reflection at the core-cladding boundary, traveling along the fiber without escaping.</p>
</div>
</div>

<p>The key is that each time the light ray hits the core-cladding boundary, it strikes at an angle greater than the critical angle and bounces back inward. The fiber can be bent (within limits), and the light follows along, because TIR continues to work as long as the bend is not too sharp.</p>

<h3>Acceptance angle and numerical aperture</h3>

<p>Not all light entering the end of a fiber will be guided. Light must enter within a cone of half-angle \\(\\theta_a\\) called the <strong>acceptance angle</strong>. Light entering at steeper angles will hit the core-cladding boundary at less than the critical angle and leak out.</p>

<div class="env-block theorem">
<div class="env-title">Numerical Aperture</div>
<div class="env-body">
<p>The <strong>numerical aperture</strong> (NA) of an optical fiber determines the maximum acceptance angle:</p>
\\[\\text{NA} = \\sin\\theta_a = \\sqrt{n_\\text{core}^2 - n_\\text{clad}^2}\\]
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Standard Fiber</div>
<div class="env-body">
<p>A fiber has \\(n_\\text{core} = 1.50\\) and \\(n_\\text{clad} = 1.46\\).</p>
\\[\\text{NA} = \\sqrt{1.50^2 - 1.46^2} = \\sqrt{2.25 - 2.1316} = \\sqrt{0.1184} \\approx 0.344\\]
\\[\\theta_a = \\arcsin(0.344) \\approx 20.1^\\circ\\]
</div>
</div>

<div class="env-block remark">
<div class="env-title">Why fibers carry data so well</div>
<div class="env-body">
<p>Light has an extremely high frequency (around \\(10^{14}\\) Hz), which means it can carry far more information per second than radio waves or microwaves. A single optical fiber can transmit terabits per second. Transoceanic cables contain bundles of fibers linking continents at the speed of light (well, about 2/3 the speed of light, since light slows down in glass).</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-optical-fiber"></div>
`,
                visualizations: [
                    {
                        id: 'viz-optical-fiber',
                        title: 'Light Bouncing Through an Optical Fiber',
                        description: 'A glowing pulse of light bounces through a curved fiber via repeated total internal reflection. Adjust the fiber curvature and the refractive indices.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var nCore = 1.50, nClad = 1.46;
                            var curvature = 0.3;
                            var time = 0;

                            VizEngine.createSlider(controls, 'Curvature', 0, 0.8, curvature, 0.05, function (v) { curvature = v; });
                            VizEngine.createSlider(controls, 'n(core)', 1.40, 1.70, nCore, 0.01, function (v) { nCore = v; });
                            VizEngine.createSlider(controls, 'n(clad)', 1.30, 1.60, nClad, 0.01, function (v) { nClad = v; });

                            function fiberY(x) {
                                return curvature * 80 * Math.sin(x / w * Math.PI * 2);
                            }

                            function draw(t) {
                                time = t * 0.001;
                                viz.clear();

                                var fiberHalf = 28;
                                var segments = 200;

                                // Draw cladding
                                ctx.beginPath();
                                for (var i = 0; i <= segments; i++) {
                                    var fx = (i / segments) * w;
                                    var fy = h / 2 + fiberY(fx) - fiberHalf - 8;
                                    if (i === 0) ctx.moveTo(fx, fy); else ctx.lineTo(fx, fy);
                                }
                                for (var j = segments; j >= 0; j--) {
                                    var fx2 = (j / segments) * w;
                                    var fy2 = h / 2 + fiberY(fx2) + fiberHalf + 8;
                                    ctx.lineTo(fx2, fy2);
                                }
                                ctx.closePath();
                                ctx.fillStyle = 'rgba(60, 100, 160, 0.15)';
                                ctx.fill();

                                // Draw core
                                ctx.beginPath();
                                for (var i2 = 0; i2 <= segments; i2++) {
                                    var fx3 = (i2 / segments) * w;
                                    var fy3 = h / 2 + fiberY(fx3) - fiberHalf;
                                    if (i2 === 0) ctx.moveTo(fx3, fy3); else ctx.lineTo(fx3, fy3);
                                }
                                for (var j2 = segments; j2 >= 0; j2--) {
                                    var fx4 = (j2 / segments) * w;
                                    var fy4 = h / 2 + fiberY(fx4) + fiberHalf;
                                    ctx.lineTo(fx4, fy4);
                                }
                                ctx.closePath();
                                ctx.fillStyle = 'rgba(40, 80, 180, 0.2)';
                                ctx.fill();

                                // Core edges (brighter)
                                ctx.strokeStyle = viz.colors.cyan + '44';
                                ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                for (var i3 = 0; i3 <= segments; i3++) {
                                    var fx5 = (i3 / segments) * w;
                                    var fy5 = h / 2 + fiberY(fx5) - fiberHalf;
                                    if (i3 === 0) ctx.moveTo(fx5, fy5); else ctx.lineTo(fx5, fy5);
                                }
                                ctx.stroke();
                                ctx.beginPath();
                                for (var i4 = 0; i4 <= segments; i4++) {
                                    var fx6 = (i4 / segments) * w;
                                    var fy6 = h / 2 + fiberY(fx6) + fiberHalf;
                                    if (i4 === 0) ctx.moveTo(fx6, fy6); else ctx.lineTo(fx6, fy6);
                                }
                                ctx.stroke();

                                // Simulate bouncing light ray
                                var critAngle = nClad / nCore < 1 ? Math.asin(nClad / nCore) : Math.PI / 2;
                                var bounceAngle = Math.PI / 2 - critAngle + 0.15; // just above critical
                                var numBounces = 12;
                                var rayPoints = [];
                                var xStep = w / numBounces;

                                for (var b = 0; b <= numBounces; b++) {
                                    var bx = b * xStep;
                                    var sign = (b % 2 === 0) ? 1 : -1;
                                    var by = h / 2 + fiberY(bx) + sign * (fiberHalf - 3);
                                    rayPoints.push([bx, by]);
                                }

                                // Draw ray path with glow
                                for (var r = 0; r < rayPoints.length - 1; r++) {
                                    var p1 = rayPoints[r], p2 = rayPoints[r + 1];
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.gold;
                                    ctx.shadowBlur = 8;
                                    ctx.strokeStyle = viz.colors.gold + 'aa';
                                    ctx.lineWidth = 2;
                                    ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.stroke();
                                    ctx.restore();

                                    // Bounce glow
                                    var grad = ctx.createRadialGradient(p2[0], p2[1], 0, p2[0], p2[1], 12);
                                    grad.addColorStop(0, 'rgba(255,215,0,0.3)');
                                    grad.addColorStop(1, 'rgba(255,215,0,0)');
                                    ctx.fillStyle = grad;
                                    ctx.beginPath(); ctx.arc(p2[0], p2[1], 12, 0, Math.PI * 2); ctx.fill();
                                }

                                // Animated pulse
                                var totalLen = 0;
                                var segLens = [];
                                for (var s = 0; s < rayPoints.length - 1; s++) {
                                    var sdx = rayPoints[s + 1][0] - rayPoints[s][0];
                                    var sdy = rayPoints[s + 1][1] - rayPoints[s][1];
                                    var sl = Math.sqrt(sdx * sdx + sdy * sdy);
                                    segLens.push(sl);
                                    totalLen += sl;
                                }

                                // Multiple pulses
                                for (var pp = 0; pp < 3; pp++) {
                                    var phase = ((time * 120 + pp * totalLen / 3) % totalLen);
                                    var acc = 0;
                                    for (var s2 = 0; s2 < segLens.length; s2++) {
                                        if (acc + segLens[s2] >= phase) {
                                            var frac = (phase - acc) / segLens[s2];
                                            var ppx = rayPoints[s2][0] + frac * (rayPoints[s2 + 1][0] - rayPoints[s2][0]);
                                            var ppy = rayPoints[s2][1] + frac * (rayPoints[s2 + 1][1] - rayPoints[s2][1]);

                                            ctx.save();
                                            ctx.shadowColor = '#ffffff';
                                            ctx.shadowBlur = 20;
                                            var pulseGrad = ctx.createRadialGradient(ppx, ppy, 0, ppx, ppy, 15);
                                            pulseGrad.addColorStop(0, 'rgba(255,255,255,0.9)');
                                            pulseGrad.addColorStop(0.5, 'rgba(255,215,0,0.4)');
                                            pulseGrad.addColorStop(1, 'rgba(255,215,0,0)');
                                            ctx.fillStyle = pulseGrad;
                                            ctx.beginPath(); ctx.arc(ppx, ppy, 15, 0, Math.PI * 2); ctx.fill();
                                            ctx.fillStyle = '#fff';
                                            ctx.beginPath(); ctx.arc(ppx, ppy, 3, 0, Math.PI * 2); ctx.fill();
                                            ctx.restore();
                                            break;
                                        }
                                        acc += segLens[s2];
                                    }
                                }

                                // Labels
                                viz.screenText('core (n = ' + nCore.toFixed(2) + ')', w / 2, h / 2 - 2, viz.colors.cyan, 11);
                                viz.screenText('cladding (n = ' + nClad.toFixed(2) + ')', w / 2, h / 2 - fiberHalf - 20, viz.colors.text, 10);
                                viz.screenText('cladding', w / 2, h / 2 + fiberHalf + 22, viz.colors.text, 10);

                                var critDeg = critAngle * 180 / Math.PI;
                                var na = Math.sqrt(Math.max(0, nCore * nCore - nClad * nClad));
                                viz.screenText('\u03b8_c = ' + critDeg.toFixed(1) + '\u00b0    NA = ' + na.toFixed(3), w / 2, h - 18, viz.colors.teal, 12);

                                if (nCore <= nClad) {
                                    viz.screenText('No TIR: n(core) \u2264 n(clad)!', w / 2, 25, viz.colors.red, 14);
                                }
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'An optical fiber has \\(n_\\text{core} = 1.62\\) and \\(n_\\text{clad} = 1.52\\). Find its numerical aperture and acceptance angle.',
                        hint: 'Use \\(\\text{NA} = \\sqrt{n_\\text{core}^2 - n_\\text{clad}^2}\\), then \\(\\theta_a = \\arcsin(\\text{NA})\\).',
                        solution: '\\(\\text{NA} = \\sqrt{1.62^2 - 1.52^2} = \\sqrt{2.6244 - 2.3104} = \\sqrt{0.3140} \\approx 0.560\\). \\(\\theta_a = \\arcsin(0.560) \\approx 34.1^\\circ\\).'
                    },
                    {
                        question: 'Why does bending a fiber too sharply cause light to leak out?',
                        hint: 'Think about how bending changes the angle at which light hits the core-cladding boundary.',
                        solution: 'When the fiber is bent sharply, some rays hit the core-cladding boundary at angles less than the critical angle (the incidence angle decreases on the outer side of the bend). These rays are no longer totally reflected and escape into the cladding, causing signal loss.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Diamonds and Brilliance
            // ============================================================
            {
                id: 'diamonds-brilliance',
                title: 'Diamonds and Brilliance',
                content: `
<h2>Why Diamonds Sparkle</h2>

<p>A diamond is just carbon, but cut the right way, it becomes the most brilliant gemstone known. The secret is total internal reflection combined with diamond's extraordinarily high refractive index (\\(n = 2.42\\)).</p>

<h3>The physics of sparkle</h3>

<p>Diamond's critical angle is only about \\(24.4^\\circ\\). This means that any ray hitting the interior surface at more than \\(24.4^\\circ\\) from the normal is totally reflected. Since most rays inside a well-cut diamond strike the facets at steep angles, the light bounces around inside the diamond many times before finally escaping through the top (the "table" and "crown" facets).</p>

<div class="env-block intuition">
<div class="env-title">Three kinds of brilliance</div>
<div class="env-body">
<p>Jewelers distinguish three optical effects in a diamond:</p>
<ul>
<li><strong>Brilliance</strong>: the total amount of white light returned to the eye, maximized by TIR keeping light inside.</li>
<li><strong>Fire</strong>: rainbow flashes caused by dispersion (different wavelengths refract at slightly different angles when the light finally exits).</li>
<li><strong>Scintillation</strong>: the pattern of light and dark flashes as the diamond, the observer, or the light source moves.</li>
</ul>
<p>All three depend on TIR. Without it, light would pass straight through the diamond and it would look like a piece of glass.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Ideal Cut vs Shallow Cut</div>
<div class="env-body">
<p>In an ideally cut diamond, light entering the top is reflected off the bottom facets (by TIR) and directed back out through the top. In a shallow-cut diamond, the angle of incidence at the bottom facets is too small (below the critical angle), so light leaks out the bottom and the diamond appears dull. Similarly, a diamond cut too deep reflects light out the sides instead of the top.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Glass vs diamond</div>
<div class="env-body">
<p>Glass has \\(n \\approx 1.5\\) and \\(\\theta_c \\approx 41^\\circ\\). With such a large critical angle, much of the light escapes through the back. Cubic zirconia (\\(n = 2.16\\), \\(\\theta_c \\approx 27.6^\\circ\\)) is a closer imitation, but its lower \\(n\\) and lower dispersion make it visibly less brilliant than diamond to a trained eye.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-diamond"></div>
`,
                visualizations: [
                    {
                        id: 'viz-diamond',
                        title: 'Diamond Brilliance: Light Trapped by TIR',
                        description: 'Light enters a diamond from above and undergoes multiple total internal reflections off the facets. Watch the rays bounce and sparkle. Compare ideal, shallow, and deep cuts.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var cutType = 0; // 0=ideal, 1=shallow, 2=deep
                            var time = 0;

                            VizEngine.createButton(controls, 'Ideal Cut', function () { cutType = 0; });
                            VizEngine.createButton(controls, 'Shallow Cut', function () { cutType = 1; });
                            VizEngine.createButton(controls, 'Deep Cut', function () { cutType = 2; });

                            function getDiamond(type) {
                                var cx = w / 2, topY = h * 0.22;
                                var tableW, crownH, pavilionH;
                                if (type === 0) { tableW = 80; crownH = 40; pavilionH = 120; }
                                else if (type === 1) { tableW = 90; crownH = 30; pavilionH = 60; }
                                else { tableW = 70; crownH = 50; pavilionH = 170; }

                                var crownW = tableW + crownH * 1.2;
                                var crown = [
                                    [cx - tableW, topY],
                                    [cx + tableW, topY],
                                    [cx + crownW, topY + crownH],
                                    [cx - crownW, topY + crownH]
                                ];
                                var pavilion = [
                                    [cx - crownW, topY + crownH],
                                    [cx + crownW, topY + crownH],
                                    [cx, topY + crownH + pavilionH]
                                ];
                                return { crown: crown, pavilion: pavilion, cx: cx, topY: topY, tableW: tableW, crownH: crownH, crownW: crownW, pavilionH: pavilionH };
                            }

                            function pointInTriangle(px, py, ax, ay, bx, by, cx2, cy2) {
                                var d1 = (px - bx) * (ay - by) - (ax - bx) * (py - by);
                                var d2 = (px - cx2) * (by - cy2) - (bx - cx2) * (py - cy2);
                                var d3 = (px - ax) * (cy2 - ay) - (cx2 - ax) * (py - ay);
                                var hasNeg = (d1 < 0) || (d2 < 0) || (d3 < 0);
                                var hasPos = (d1 > 0) || (d2 > 0) || (d3 > 0);
                                return !(hasNeg && hasPos);
                            }

                            function draw(t) {
                                time = t * 0.001;
                                viz.clear();

                                var d = getDiamond(cutType);

                                // Diamond body with gradient
                                ctx.save();

                                // Crown
                                ctx.beginPath();
                                ctx.moveTo(d.crown[0][0], d.crown[0][1]);
                                for (var i = 1; i < d.crown.length; i++) ctx.lineTo(d.crown[i][0], d.crown[i][1]);
                                ctx.closePath();
                                var crownGrad = ctx.createLinearGradient(d.cx, d.topY, d.cx, d.topY + d.crownH);
                                crownGrad.addColorStop(0, 'rgba(200, 220, 255, 0.12)');
                                crownGrad.addColorStop(1, 'rgba(120, 160, 220, 0.08)');
                                ctx.fillStyle = crownGrad;
                                ctx.fill();
                                ctx.strokeStyle = 'rgba(180, 210, 255, 0.5)';
                                ctx.lineWidth = 1.5;
                                ctx.stroke();

                                // Pavilion
                                ctx.beginPath();
                                ctx.moveTo(d.pavilion[0][0], d.pavilion[0][1]);
                                for (var j = 1; j < d.pavilion.length; j++) ctx.lineTo(d.pavilion[j][0], d.pavilion[j][1]);
                                ctx.closePath();
                                var pavGrad = ctx.createLinearGradient(d.cx, d.topY + d.crownH, d.cx, d.topY + d.crownH + d.pavilionH);
                                pavGrad.addColorStop(0, 'rgba(120, 160, 220, 0.08)');
                                pavGrad.addColorStop(1, 'rgba(80, 120, 200, 0.15)');
                                ctx.fillStyle = pavGrad;
                                ctx.fill();
                                ctx.strokeStyle = 'rgba(180, 210, 255, 0.5)';
                                ctx.stroke();

                                // Facet lines
                                ctx.strokeStyle = 'rgba(180,210,255,0.2)';
                                ctx.lineWidth = 0.5;
                                // Crown facet divisions
                                ctx.beginPath();
                                ctx.moveTo(d.cx, d.topY);
                                ctx.lineTo(d.cx - d.crownW * 0.5, d.topY + d.crownH);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(d.cx, d.topY);
                                ctx.lineTo(d.cx + d.crownW * 0.5, d.topY + d.crownH);
                                ctx.stroke();

                                // Pavilion facet divisions
                                ctx.beginPath();
                                ctx.moveTo(d.cx - d.crownW * 0.5, d.topY + d.crownH);
                                ctx.lineTo(d.pavilion[2][0], d.pavilion[2][1]);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(d.cx + d.crownW * 0.5, d.topY + d.crownH);
                                ctx.lineTo(d.pavilion[2][0], d.pavilion[2][1]);
                                ctx.stroke();

                                ctx.restore();

                                // Simulate light rays
                                var numRays = 5;
                                var colors = [viz.colors.red, viz.colors.orange, viz.colors.gold, viz.colors.cyan, viz.colors.blue];

                                for (var r = 0; r < numRays; r++) {
                                    var offset = (r - (numRays - 1) / 2) * 18;
                                    var entryX = d.cx + offset;
                                    var entryY = d.topY;

                                    // Ray enters table going down
                                    var dx = offset * 0.02;
                                    var dy = 1;
                                    var len = Math.sqrt(dx * dx + dy * dy);
                                    dx /= len; dy /= len;

                                    var rayColor = colors[r % colors.length];
                                    var rx = entryX, ry = entryY;
                                    var bounces = 0;
                                    var maxBounces = 8;
                                    var rayPath = [[rx, ry]];

                                    // Simple ray tracing with reflections
                                    for (var b = 0; b < maxBounces; b++) {
                                        // Find intersection with diamond boundaries
                                        var bestT = 99999;
                                        var bestNx = 0, bestNy = 0;
                                        var hitType = 'none';

                                        // Check pavilion walls
                                        var walls = [
                                            { x1: d.pavilion[0][0], y1: d.pavilion[0][1], x2: d.pavilion[2][0], y2: d.pavilion[2][1], type: 'left' },
                                            { x1: d.pavilion[1][0], y1: d.pavilion[1][1], x2: d.pavilion[2][0], y2: d.pavilion[2][1], type: 'right' },
                                            { x1: d.crown[3][0], y1: d.crown[3][1], x2: d.crown[0][0], y2: d.crown[0][1], type: 'crownL' },
                                            { x1: d.crown[1][0], y1: d.crown[1][1], x2: d.crown[2][0], y2: d.crown[2][1], type: 'crownR' },
                                            { x1: d.crown[0][0], y1: d.crown[0][1], x2: d.crown[1][0], y2: d.crown[1][1], type: 'table' },
                                            { x1: d.crown[3][0], y1: d.crown[3][1], x2: d.crown[2][0], y2: d.crown[2][1], type: 'girdle' }
                                        ];

                                        for (var ww = 0; ww < walls.length; ww++) {
                                            var wl = walls[ww];
                                            var ewx = wl.x2 - wl.x1, ewy = wl.y2 - wl.y1;
                                            var denom = dx * ewy - dy * ewx;
                                            if (Math.abs(denom) < 1e-10) continue;
                                            var tt = ((wl.x1 - rx) * ewy - (wl.y1 - ry) * ewx) / denom;
                                            var uu = ((wl.x1 - rx) * dy - (wl.y1 - ry) * dx) / denom;
                                            if (tt > 1 && uu >= 0 && uu <= 1 && tt < bestT) {
                                                bestT = tt;
                                                var wLen = Math.sqrt(ewx * ewx + ewy * ewy);
                                                bestNx = -ewy / wLen;
                                                bestNy = ewx / wLen;
                                                // Make normal point inward
                                                if (bestNx * dx + bestNy * dy > 0) { bestNx = -bestNx; bestNy = -bestNy; }
                                                hitType = wl.type;
                                            }
                                        }

                                        if (bestT > 9999) break;

                                        rx = rx + dx * bestT;
                                        ry = ry + dy * bestT;
                                        rayPath.push([rx, ry]);

                                        if (hitType === 'table' || hitType === 'girdle') {
                                            // Ray exits
                                            rx += dx * 80;
                                            ry += dy * 80;
                                            rayPath.push([rx, ry]);
                                            break;
                                        }

                                        // Reflect
                                        var dot = dx * bestNx + dy * bestNy;
                                        dx = dx - 2 * dot * bestNx;
                                        dy = dy - 2 * dot * bestNy;
                                        bounces++;
                                    }

                                    // Draw ray path
                                    var phase = (time * 2 + r * 0.4) % (rayPath.length);
                                    for (var seg = 0; seg < rayPath.length - 1; seg++) {
                                        var p1 = rayPath[seg], p2 = rayPath[seg + 1];
                                        var alpha = VizEngine.clamp(0.15 + 0.5 * (1 - seg / rayPath.length), 0.1, 0.8);
                                        ctx.save();
                                        ctx.globalAlpha = alpha;
                                        ctx.shadowColor = rayColor;
                                        ctx.shadowBlur = 6;
                                        ctx.strokeStyle = rayColor;
                                        ctx.lineWidth = 1.5;
                                        ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.stroke();
                                        ctx.restore();
                                    }

                                    // Sparkle at exit point
                                    if (rayPath.length > 2) {
                                        var exitP = rayPath[rayPath.length - 2];
                                        var sparkle = 0.5 + 0.5 * Math.sin(time * 6 + r * 1.3);
                                        var sGrad = ctx.createRadialGradient(exitP[0], exitP[1], 0, exitP[0], exitP[1], 10 + sparkle * 8);
                                        sGrad.addColorStop(0, rayColor + 'cc');
                                        sGrad.addColorStop(0.5, rayColor + '44');
                                        sGrad.addColorStop(1, rayColor + '00');
                                        ctx.fillStyle = sGrad;
                                        ctx.beginPath(); ctx.arc(exitP[0], exitP[1], 18, 0, Math.PI * 2); ctx.fill();
                                    }
                                }

                                // Labels
                                var label = cutType === 0 ? 'Ideal Cut' : (cutType === 1 ? 'Shallow Cut' : 'Deep Cut');
                                viz.screenText(label, w / 2, h - 20, viz.colors.white, 14);
                                viz.screenText('n = 2.42,  \u03b8_c = 24.4\u00b0', w / 2, h - 40, viz.colors.teal, 11);

                                if (cutType === 1) {
                                    viz.screenText('Light leaks through the bottom', w / 2, 18, viz.colors.red, 12);
                                } else if (cutType === 2) {
                                    viz.screenText('Light escapes through the sides', w / 2, 18, viz.colors.red, 12);
                                } else {
                                    viz.screenText('Light returns through the top', w / 2, 18, viz.colors.green, 12);
                                }
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Compare the critical angles of diamond (\\(n = 2.42\\)), zircon (\\(n = 1.92\\)), and glass (\\(n = 1.52\\)). Which traps the most light?',
                        hint: 'Calculate \\(\\theta_c = \\arcsin(1/n)\\) for each material.',
                        solution: 'Diamond: \\(\\theta_c = \\arcsin(1/2.42) = 24.4^\\circ\\). Zircon: \\(\\theta_c = \\arcsin(1/1.92) = 31.4^\\circ\\). Glass: \\(\\theta_c = \\arcsin(1/1.52) = 41.1^\\circ\\). Diamond has the smallest critical angle and traps the most light.'
                    },
                    {
                        question: 'A diamond is submerged in water (\\(n = 1.33\\)). What is the new critical angle? Will it sparkle as much?',
                        hint: 'Replace \\(n_2 = 1.00\\) with \\(n_2 = 1.33\\) in the critical angle formula.',
                        solution: '\\(\\theta_c = \\arcsin(1.33/2.42) = \\arcsin(0.550) \\approx 33.3^\\circ\\). The critical angle increased from \\(24.4^\\circ\\) to \\(33.3^\\circ\\), so fewer rays undergo TIR and the diamond sparkles less.'
                    }
                ]
            }
        ]
    });
})();
