// === Chapter 18: Dispersion & Color ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch18',
        number: 18,
        title: 'Dispersion & Color',
        subtitle: 'Why prisms make rainbows and skies are blue',
        file: 'ch18-dispersion',

        sections: [
            // ============================================================
            // Section 1: Refractive Index Depends on Wavelength
            // ============================================================
            {
                id: 'n-depends-on-lambda',
                title: 'n Depends on \u03BB',
                content: `
<h2>Dispersion: The Refractive Index Is Not Constant</h2>

<p>Until now, we treated the refractive index \\(n\\) of a material as a single number. In reality, \\(n\\) depends on the wavelength (or equivalently, the frequency) of light. This phenomenon is called <strong>dispersion</strong>.</p>

<div class="env-block definition">
<div class="env-title">Dispersion</div>
<div class="env-body">
<p><strong>Dispersion</strong> is the variation of refractive index with wavelength: \\(n = n(\\lambda)\\). In most transparent materials (glass, water), shorter wavelengths (blue/violet) are refracted more than longer wavelengths (red). This is called <strong>normal dispersion</strong>.</p>
</div>
</div>

<p>For ordinary glass, the numbers look roughly like this:</p>

<table style="width:100%;border-collapse:collapse;margin:0.5em 0;font-size:0.9em;">
<tr style="border-bottom:1px solid #333;">
    <th style="text-align:left;padding:4px;color:#8b949e;">Color</th>
    <th style="text-align:left;padding:4px;color:#8b949e;">Wavelength (nm)</th>
    <th style="text-align:left;padding:4px;color:#8b949e;">\\(n\\) (crown glass)</th>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
    <td style="padding:4px;color:#f85149;">Red</td>
    <td style="padding:4px;">700</td>
    <td style="padding:4px;">1.510</td>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
    <td style="padding:4px;color:#d29922;">Yellow</td>
    <td style="padding:4px;">580</td>
    <td style="padding:4px;">1.517</td>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
    <td style="padding:4px;color:#3fb950;">Green</td>
    <td style="padding:4px;">550</td>
    <td style="padding:4px;">1.519</td>
</tr>
<tr>
    <td style="padding:4px;color:#bc8cff;">Violet</td>
    <td style="padding:4px;">400</td>
    <td style="padding:4px;">1.532</td>
</tr>
</table>

<p>The variation is small (about 1.5%) but enough to separate colors dramatically over a sufficient optical path.</p>

<div class="env-block intuition">
<div class="env-title">Why does n depend on wavelength?</div>
<div class="env-body">
<p>In a material, the E-field of the light wave drives bound electrons into oscillation. These oscillating electrons re-radiate, and the superposition of incident and re-radiated waves gives a net wave traveling at speed \\(c/n\\). The electrons respond differently to different driving frequencies (just as a mass-spring system has a frequency-dependent response). Near a resonance (in the ultraviolet for glass), the response is strongest and changes rapidly with frequency. This frequency-dependent response is the microscopic origin of dispersion.</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Cauchy's equation (approximate)</div>
<div class="env-body">
<p>For wavelengths far from absorption resonances, the refractive index is well approximated by:</p>
\\[n(\\lambda) \\approx A + \\frac{B}{\\lambda^2} + \\frac{C}{\\lambda^4}\\]
<p>where \\(A\\), \\(B\\), \\(C\\) are material-specific constants. Since shorter \\(\\lambda\\) gives larger \\(n\\), blue light bends more than red.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Anomalous dispersion</div>
<div class="env-body">
<p>Near an absorption line, \\(n\\) can <em>decrease</em> with decreasing wavelength (anomalous dispersion). This occurs in narrow spectral regions and is responsible for exotic effects like slow light and superluminal group velocities (the latter does not violate relativity; no information travels faster than \\(c\\)).</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Crown glass has \\(n_{\\text{red}} = 1.510\\) and \\(n_{\\text{violet}} = 1.532\\). A beam enters at 45\\(^\\circ\\). What is the angular spread between the red and violet refracted rays?',
                        hint: 'Apply Snell\'s law separately for each color: \\(\\sin\\theta_r = \\sin 45^\\circ / n\\).',
                        solution: 'Red: \\(\\sin\\theta_r = \\sin 45^\\circ / 1.510 = 0.7071/1.510 = 0.4683\\), so \\(\\theta_r = 27.90^\\circ\\). Violet: \\(\\sin\\theta_r = 0.7071/1.532 = 0.4616\\), so \\(\\theta_r = 27.49^\\circ\\). Spread: \\(27.90 - 27.49 = 0.41^\\circ\\). Small, but a prism amplifies it.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Prism Dispersion
            // ============================================================
            {
                id: 'prism-dispersion',
                title: 'Prism Dispersion',
                content: `
<h2>Newton's Prism Experiment</h2>

<p>In 1666, Isaac Newton directed a beam of sunlight through a glass prism and observed that it spread out into a band of colors: red, orange, yellow, green, blue, indigo, violet. This was the first demonstration that white light is a mixture of all visible colors, and that the prism separates them because \\(n\\) differs for each color.</p>

<div class="env-block theorem">
<div class="env-title">Prism separation mechanism</div>
<div class="env-body">
<p>At each surface of the prism, Snell's law applies: \\(n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2\\). Since \\(n\\) is larger for violet than red, violet light bends more at both surfaces. The cumulative effect produces a visible spectrum.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-prism"></div>

<p>The angular width of the spectrum depends on the prism's apex angle and the glass's <strong>dispersive power</strong>, defined as:</p>

\\[\\omega = \\frac{n_F - n_C}{n_D - 1}\\]

<p>where \\(n_F\\), \\(n_D\\), \\(n_C\\) are refractive indices at specific standard wavelengths (blue hydrogen line, yellow sodium line, red hydrogen line). High dispersive power means more color spreading.</p>

<div class="env-block example">
<div class="env-title">Example: Crown vs flint glass</div>
<div class="env-body">
<p>Crown glass: \\(\\omega \\approx 0.016\\) (low dispersion). Flint glass: \\(\\omega \\approx 0.028\\) (high dispersion). Camera lens designers use combinations of crown and flint elements (achromatic doublets) to bring two colors to the same focus, correcting chromatic aberration.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Newton's crucial test</div>
<div class="env-body">
<p>Newton proved white light is composite, not altered by the prism, by passing one color from the spectrum through a second prism. The second prism bent it further but did not split it into more colors. A single spectral color is already "pure" (monochromatic). He then recombined the full spectrum with a lens, recovering white light. The prism does not create color; it reveals the colors already present.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-prism',
                        title: 'White Light Through a Prism',
                        description: 'A beam of white light enters a glass prism and disperses into the visible spectrum. Adjust the prism apex angle and glass type to see how the rainbow changes. Individual wavelengths are traced with their true colors.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var apexAngle = 60; // degrees
                            var glassType = 0; // 0=crown, 1=flint
                            var nBase = 1.52;
                            var dispersion = 0.025;

                            VizEngine.createSlider(controls, 'Apex angle (\u00B0)', 20, 80, 60, 1, function (v) {
                                apexAngle = v;
                            });
                            VizEngine.createButton(controls, 'Crown glass', function () { glassType = 0; nBase = 1.52; dispersion = 0.025; });
                            VizEngine.createButton(controls, 'Flint glass', function () { glassType = 1; nBase = 1.62; dispersion = 0.045; });

                            function wavelengthToRGB(nm) {
                                var r = 0, g = 0, b = 0;
                                if (nm >= 380 && nm < 440) { r = -(nm - 440) / (440 - 380); b = 1; }
                                else if (nm >= 440 && nm < 490) { g = (nm - 440) / (490 - 440); b = 1; }
                                else if (nm >= 490 && nm < 510) { g = 1; b = -(nm - 510) / (510 - 490); }
                                else if (nm >= 510 && nm < 580) { r = (nm - 510) / (580 - 510); g = 1; }
                                else if (nm >= 580 && nm < 645) { r = 1; g = -(nm - 645) / (645 - 580); }
                                else if (nm >= 645 && nm <= 780) { r = 1; }
                                var factor;
                                if (nm >= 380 && nm < 420) factor = 0.3 + 0.7 * (nm - 380) / (420 - 380);
                                else if (nm >= 645 && nm <= 780) factor = 0.3 + 0.7 * (780 - nm) / (780 - 645);
                                else if (nm >= 420 && nm < 645) factor = 1;
                                else factor = 0;
                                return [Math.round(r * factor * 255), Math.round(g * factor * 255), Math.round(b * factor * 255)];
                            }

                            function nForWavelength(nm) {
                                // Cauchy-like: n = nBase + dispersion * (550^2/nm^2 - 1)
                                return nBase + dispersion * (550 * 550 / (nm * nm) - 1);
                            }

                            function draw() {
                                viz.clear();

                                var apex = apexAngle * Math.PI / 180;
                                // Prism: equilateral-ish triangle
                                var pcx = w * 0.42, pcy = h * 0.52;
                                var prismSize = Math.min(w, h) * 0.3;

                                // Prism vertices: top, bottom-left, bottom-right
                                var topX = pcx, topY = pcy - prismSize * Math.sin(apex / 2);
                                var halfBase = prismSize * Math.cos(apex / 2) * Math.tan(apex / 2);
                                // Adjust for general apex angle
                                var leftX = pcx - prismSize * 0.5, leftY = pcy + prismSize * 0.35;
                                var rightX = pcx + prismSize * 0.5, rightY = pcy + prismSize * 0.35;
                                // Recompute with apex angle
                                topY = pcy - prismSize * 0.45;
                                var baseHalf = prismSize * 0.45 * Math.tan(apex / 2);
                                if (baseHalf > prismSize * 0.7) baseHalf = prismSize * 0.7;
                                leftX = pcx - baseHalf;
                                rightX = pcx + baseHalf;

                                // Draw prism
                                ctx.save();
                                ctx.beginPath();
                                ctx.moveTo(topX, topY);
                                ctx.lineTo(leftX, leftY);
                                ctx.lineTo(rightX, rightY);
                                ctx.closePath();
                                ctx.fillStyle = 'rgba(100,180,255,0.08)';
                                ctx.fill();
                                ctx.strokeStyle = viz.colors.cyan + '88';
                                ctx.lineWidth = 2;
                                ctx.stroke();
                                ctx.restore();

                                // Apex angle arc
                                var arcAng1 = Math.atan2(leftY - topY, leftX - topX);
                                var arcAng2 = Math.atan2(rightY - topY, rightX - topX);
                                ctx.strokeStyle = viz.colors.text + '66';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.arc(topX, topY, 25, arcAng1, arcAng2, false);
                                ctx.stroke();
                                viz.screenText(apexAngle + '\u00B0', topX, topY + 35, viz.colors.text, 9);

                                // Left face normal direction
                                var lnx = -(leftY - topY), lny = (leftX - topX);
                                var lnLen = Math.sqrt(lnx * lnx + lny * lny);
                                lnx /= lnLen; lny /= lnLen;
                                // Make sure normal points outward (to the left)
                                if (lnx > 0) { lnx = -lnx; lny = -lny; }

                                // Entry point on left face (midpoint)
                                var entryFrac = 0.5;
                                var entryX = topX + (leftX - topX) * entryFrac;
                                var entryY = topY + (leftY - topY) * entryFrac;

                                // Left face angle from vertical
                                var leftFaceAngle = Math.atan2(leftX - topX, leftY - topY); // angle of face from vertical

                                // Incoming white beam
                                var inAngle = Math.PI * 0.15; // slight downward angle
                                var beamDirX = 1, beamDirY = 0.15;
                                var bdLen = Math.sqrt(beamDirX * beamDirX + beamDirY * beamDirY);
                                beamDirX /= bdLen; beamDirY /= bdLen;

                                // Draw incoming beam (white, glowing)
                                ctx.save();
                                ctx.shadowColor = '#ffffff';
                                ctx.shadowBlur = 12;
                                ctx.strokeStyle = 'rgba(255,255,255,0.9)';
                                ctx.lineWidth = 4;
                                ctx.beginPath();
                                ctx.moveTo(entryX - beamDirX * w * 0.35, entryY - beamDirY * w * 0.35);
                                ctx.lineTo(entryX, entryY);
                                ctx.stroke();
                                ctx.restore();
                                viz.screenText('White light', entryX - beamDirX * w * 0.25 - 10, entryY - beamDirY * w * 0.25 - 12, viz.colors.white, 10);

                                // Trace rays for different wavelengths through prism
                                var wavelengths = [];
                                for (var wl = 400; wl <= 700; wl += 5) {
                                    wavelengths.push(wl);
                                }

                                // Compute angle of incidence on left face
                                // Left face direction
                                var faceDx = leftX - topX, faceDy = leftY - topY;
                                var faceLen = Math.sqrt(faceDx * faceDx + faceDy * faceDy);
                                faceDx /= faceLen; faceDy /= faceLen;
                                // Inward normal of left face
                                var inNx = -faceDy, inNy = faceDx; // perpendicular, rotated 90 CW
                                // Make sure it points into the prism (roughly rightward)
                                if (inNx < 0) { inNx = -inNx; inNy = -inNy; }

                                // cos of incidence angle
                                var cosInc = Math.abs(beamDirX * inNx + beamDirY * inNy);
                                var sinInc = Math.sqrt(1 - cosInc * cosInc);
                                var incAng = Math.asin(sinInc);

                                // Right face direction
                                var rfDx = rightX - topX, rfDy = rightY - topY;
                                var rfLen = Math.sqrt(rfDx * rfDx + rfDy * rfDy);
                                rfDx /= rfLen; rfDy /= rfLen;
                                // Outward normal of right face
                                var outNx = rfDy, outNy = -rfDx;
                                if (outNx < 0) { outNx = -outNx; outNy = -outNy; }

                                for (var wi = 0; wi < wavelengths.length; wi++) {
                                    var nm = wavelengths[wi];
                                    var n = nForWavelength(nm);
                                    var rgb = wavelengthToRGB(nm);
                                    var colorStr = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';

                                    // Refraction at left face
                                    var sinRef1 = sinInc / n;
                                    if (sinRef1 > 1) continue; // TIR
                                    var ref1Ang = Math.asin(sinRef1);

                                    // Direction inside prism after first refraction
                                    // Rotate beam direction toward normal by (incAng - ref1Ang)
                                    var crossSign = beamDirX * inNy - beamDirY * inNx; // cross product sign
                                    var rotAng = crossSign > 0 ? -(incAng - ref1Ang) : (incAng - ref1Ang);

                                    var innerDx = beamDirX * Math.cos(rotAng) - beamDirY * Math.sin(rotAng);
                                    var innerDy = beamDirX * Math.sin(rotAng) + beamDirY * Math.cos(rotAng);

                                    // Find exit point on right face (ray-line intersection)
                                    // Parametric: entry + t * innerDir = top + s * (right - top)
                                    var denom = innerDx * rfDy - innerDy * rfDx;
                                    if (Math.abs(denom) < 1e-10) continue;
                                    var tt = ((topX - entryX) * rfDy - (topY - entryY) * rfDx) / denom;
                                    if (tt < 0) continue;
                                    var exitX = entryX + tt * innerDx;
                                    var exitY = entryY + tt * innerDy;

                                    // Check exit is on the face segment
                                    var sf = ((exitX - topX) * rfDx + (exitY - topY) * rfDy);
                                    if (sf < 0 || sf > rfLen * faceLen) continue;

                                    // Angle of incidence on right face (inside)
                                    var cosInc2 = Math.abs(innerDx * outNx + innerDy * outNy);
                                    var sinInc2 = Math.sqrt(1 - cosInc2 * cosInc2);
                                    var sinRef2 = n * sinInc2;
                                    if (sinRef2 > 1) continue; // TIR
                                    var ref2Ang = Math.asin(sinRef2);
                                    var inc2Ang = Math.asin(sinInc2);

                                    // Exit direction
                                    var crossSign2 = innerDx * outNy - innerDy * outNx;
                                    var rotAng2 = crossSign2 > 0 ? (ref2Ang - inc2Ang) : -(ref2Ang - inc2Ang);
                                    var exitDx = innerDx * Math.cos(rotAng2) - innerDy * Math.sin(rotAng2);
                                    var exitDy = innerDx * Math.sin(rotAng2) + innerDy * Math.cos(rotAng2);

                                    // Draw internal ray (thin)
                                    ctx.strokeStyle = colorStr;
                                    ctx.globalAlpha = 0.25;
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    ctx.moveTo(entryX, entryY);
                                    ctx.lineTo(exitX, exitY);
                                    ctx.stroke();

                                    // Draw exit ray
                                    ctx.globalAlpha = 0.7;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.moveTo(exitX, exitY);
                                    ctx.lineTo(exitX + exitDx * w * 0.4, exitY + exitDy * w * 0.4);
                                    ctx.stroke();
                                    ctx.globalAlpha = 1;
                                }

                                // Labels for red and violet at edges
                                var nRed = nForWavelength(700);
                                var nVio = nForWavelength(400);
                                viz.screenText('Red (700 nm), n=' + nRed.toFixed(3), w * 0.78, h * 0.25, '#ff4444', 9);
                                viz.screenText('Violet (400 nm), n=' + nVio.toFixed(3), w * 0.78, h * 0.85, '#9944ff', 9);
                                viz.screenText(glassType === 0 ? 'Crown glass' : 'Flint glass', w * 0.5, h - 12, viz.colors.cyan, 11);
                                viz.screenText('Newton\'s prism experiment (1666)', w * 0.5, 15, viz.colors.gold, 11);
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A prism has apex angle 60\\(^\\circ\\). For red light (\\(n=1.510\\)), what is the minimum deviation angle? (Hint: minimum deviation occurs when the ray passes symmetrically through the prism.)',
                        hint: 'At minimum deviation \\(\\delta_{\\min}\\), the formula is \\(n = \\sin\\left(\\frac{A + \\delta_{\\min}}{2}\\right) / \\sin(A/2)\\).',
                        solution: '\\(1.510 = \\sin\\left(\\frac{60 + \\delta}{2}\\right) / \\sin 30^\\circ = \\sin\\left(\\frac{60 + \\delta}{2}\\right) / 0.5\\). So \\(\\sin\\left(\\frac{60+\\delta}{2}\\right) = 0.755\\), giving \\(\\frac{60+\\delta}{2} = 49.0^\\circ\\), thus \\(\\delta_{\\min} = 38.0^\\circ\\).'
                    }
                ]
            },

            // ============================================================
            // Section 3: Rainbow Formation
            // ============================================================
            {
                id: 'rainbow-formation',
                title: 'Rainbow Formation',
                content: `
<h2>The Rainbow: Nature's Prism</h2>

<p>A rainbow forms when sunlight enters a spherical raindrop, refracts at the front surface, reflects off the back surface, and refracts again on exit. Each color exits at a slightly different angle because of dispersion, creating the arc of colors we see.</p>

<div class="env-block theorem">
<div class="env-title">Rainbow angle</div>
<div class="env-body">
<p>For the primary rainbow, the deviation angle has a minimum (the rainbow angle) at approximately:</p>
<ul>
    <li>Red: \\(42.0^\\circ\\)</li>
    <li>Violet: \\(40.6^\\circ\\)</li>
</ul>
<p>The rainbow angle depends on \\(n\\) and can be derived: for a spherical drop, the minimum deviation occurs at incidence angle \\(\\theta_i\\) satisfying \\(\\cos\\theta_i = \\sqrt{(n^2-1)/3}\\). The rainbow angle is then \\(\\delta_{\\min} = 4\\theta_r - 2\\theta_i + 180^\\circ\\) for the primary bow (one internal reflection).</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-rainbow-drop"></div>

<h3>Key Features</h3>

<ul>
    <li><strong>Red on outside, violet on inside</strong> for the primary rainbow.</li>
    <li><strong>Alexander's dark band:</strong> the sky between the primary and secondary rainbow is noticeably darker because no light from single or double reflections is directed there.</li>
    <li><strong>Secondary rainbow:</strong> formed by two internal reflections inside the drop. It is fainter and has reversed color order (red on inside). Its angle is about 51\\(^\\circ\\).</li>
    <li><strong>Circular arc:</strong> the rainbow is always a circle (or arc) centered on the anti-solar point (directly opposite the sun from your perspective). You see an arc because the ground cuts off the bottom.</li>
</ul>

<div class="env-block intuition">
<div class="env-title">Why a bow, not a smear?</div>
<div class="env-body">
<p>Most refracted-reflected rays exit the drop at various angles and spread out, creating only a faint background glow. But near the minimum deviation angle, many rays pile up (a caustic). This concentration of light is what makes the rainbow bright at a specific angle. The mathematical term is that \\(d\\delta/d\\theta_i = 0\\) at the rainbow angle: the deviation is stationary, so rays near this angle exit nearly parallel.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Supernumerary bows</div>
<div class="env-body">
<p>Just inside the primary rainbow, you sometimes see faint pastel-colored fringes. These are <em>supernumerary bows</em>, caused by interference between two rays that exit the drop at the same angle but with different path lengths. They cannot be explained by ray optics alone; they require the wave theory of light. Their observation was historically an important confirmation that light is a wave.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-rainbow-drop',
                        title: 'Rainbow in a Water Droplet',
                        description: 'A cross-section of a spherical raindrop. Parallel rays of different colors enter, refract, reflect internally, and exit. The rainbow angle where rays concentrate is highlighted. Adjust the droplet size and see the geometry.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var showSecondary = false;
                            var highlightRay = 0.5;

                            VizEngine.createSlider(controls, 'Ray height (impact parameter)', 0.1, 0.95, 0.86, 0.01, function (v) {
                                highlightRay = v;
                            });
                            VizEngine.createButton(controls, 'Toggle secondary bow', function () {
                                showSecondary = !showSecondary;
                            });

                            function wavelengthToRGB(nm) {
                                var r = 0, g = 0, b = 0;
                                if (nm >= 380 && nm < 440) { r = -(nm - 440) / (440 - 380); b = 1; }
                                else if (nm >= 440 && nm < 490) { g = (nm - 440) / (490 - 440); b = 1; }
                                else if (nm >= 490 && nm < 510) { g = 1; b = -(nm - 510) / (510 - 490); }
                                else if (nm >= 510 && nm < 580) { r = (nm - 510) / (580 - 510); g = 1; }
                                else if (nm >= 580 && nm < 645) { r = 1; g = -(nm - 645) / (645 - 580); }
                                else if (nm >= 645 && nm <= 780) { r = 1; }
                                var factor;
                                if (nm >= 380 && nm < 420) factor = 0.3 + 0.7 * (nm - 380) / (420 - 380);
                                else if (nm >= 645 && nm <= 780) factor = 0.3 + 0.7 * (780 - nm) / (780 - 645);
                                else if (nm >= 420 && nm < 645) factor = 1;
                                else factor = 0;
                                return 'rgb(' + Math.round(r * factor * 255) + ',' + Math.round(g * factor * 255) + ',' + Math.round(b * factor * 255) + ')';
                            }

                            function traceRay(cx, cy, R, impactY, n, numReflections) {
                                // impactY: fractional height (-1 to 1), incoming ray goes rightward
                                var y0 = impactY * R; // y offset from center
                                var entryX = cx - Math.sqrt(R * R - y0 * y0);
                                var entryY = cy + y0;

                                // Normal at entry point (points outward, toward left)
                                var nx = (entryX - cx) / R;
                                var ny = (entryY - cy) / R;

                                // Incoming direction: (1, 0) rightward
                                var dx = 1, dy = 0;

                                // Angle of incidence
                                var cosI = -(dx * nx + dy * ny); // dot with inward normal
                                if (cosI < 0) { nx = -nx; ny = -ny; cosI = -cosI; }
                                var sinI = Math.sqrt(1 - cosI * cosI);
                                var sinR = sinI / n;
                                if (sinR > 1) return null; // TIR at entry
                                var cosR = Math.sqrt(1 - sinR * sinR);

                                // Refract at entry
                                var eta = 1 / n;
                                var rdx = eta * dx + (eta * cosI - cosR) * nx;
                                var rdy = eta * dy + (eta * cosI - cosR) * ny;

                                var points = [{ x: entryX - dx * w * 0.3, y: entryY }, { x: entryX, y: entryY }];

                                var px = entryX, py = entryY;
                                dx = rdx; dy = rdy;

                                // Internal reflections
                                for (var ref = 0; ref < numReflections; ref++) {
                                    // Find intersection with circle (next point on sphere)
                                    var a2 = dx * dx + dy * dy;
                                    var b2 = 2 * ((px - cx) * dx + (py - cy) * dy);
                                    var c2 = (px - cx) * (px - cx) + (py - cy) * (py - cy) - R * R;
                                    var disc = b2 * b2 - 4 * a2 * c2;
                                    if (disc < 0) return null;
                                    var t2 = (-b2 + Math.sqrt(disc)) / (2 * a2);
                                    if (t2 < 1) t2 = (-b2 + Math.sqrt(disc)) / (2 * a2); // take far intersection

                                    var hitX = px + t2 * dx;
                                    var hitY = py + t2 * dy;
                                    points.push({ x: hitX, y: hitY });

                                    // Normal at hit (outward)
                                    var hnx = (hitX - cx) / R;
                                    var hny = (hitY - cy) / R;

                                    // Reflect
                                    var dot = dx * hnx + dy * hny;
                                    dx = dx - 2 * dot * hnx;
                                    dy = dy - 2 * dot * hny;

                                    px = hitX; py = hitY;
                                }

                                // Final intersection for exit
                                var a3 = dx * dx + dy * dy;
                                var b3 = 2 * ((px - cx) * dx + (py - cy) * dy);
                                var c3 = (px - cx) * (px - cx) + (py - cy) * (py - cy) - R * R;
                                var disc3 = b3 * b3 - 4 * a3 * c3;
                                if (disc3 < 0) return null;
                                var t3 = (-b3 + Math.sqrt(disc3)) / (2 * a3);

                                var exitX = px + t3 * dx;
                                var exitY = py + t3 * dy;
                                points.push({ x: exitX, y: exitY });

                                // Refract at exit
                                var enx = (exitX - cx) / R;
                                var eny = (exitY - cy) / R;
                                var ecosI = dx * enx + dy * eny;
                                if (ecosI < 0) { enx = -enx; eny = -eny; ecosI = -ecosI; }
                                var esinI = Math.sqrt(1 - ecosI * ecosI);
                                var esinR = esinI * n;
                                if (esinR > 1) return null; // TIR at exit
                                var ecosR = Math.sqrt(1 - esinR * esinR);

                                var eeta = n;
                                var edx = eeta * dx + (eeta * ecosI - ecosR) * (-enx);
                                var edy = eeta * dy + (eeta * ecosI - ecosR) * (-eny);
                                // Normalize
                                var eLen = Math.sqrt(edx * edx + edy * edy);
                                edx /= eLen; edy /= eLen;

                                points.push({ x: exitX + edx * w * 0.35, y: exitY + edy * w * 0.35 });

                                return points;
                            }

                            function draw() {
                                viz.clear();

                                var dropCx = w * 0.4, dropCy = h * 0.5;
                                var R = Math.min(w, h) * 0.28;

                                // Draw drop
                                ctx.save();
                                ctx.shadowColor = viz.colors.cyan;
                                ctx.shadowBlur = 15;
                                ctx.strokeStyle = viz.colors.cyan + '66';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.arc(dropCx, dropCy, R, 0, Math.PI * 2);
                                ctx.stroke();
                                ctx.fillStyle = 'rgba(100,200,255,0.05)';
                                ctx.fill();
                                ctx.restore();

                                // Draw multiple colored rays
                                var colorWavelengths = [
                                    [700, 1.331], [650, 1.332], [600, 1.333],
                                    [550, 1.335], [500, 1.337], [450, 1.340], [400, 1.343]
                                ];

                                var numRef = showSecondary ? 2 : 1;

                                // Draw a fan of rays at the highlighted impact parameter
                                for (var ci = 0; ci < colorWavelengths.length; ci++) {
                                    var nm2 = colorWavelengths[ci][0];
                                    var n2 = colorWavelengths[ci][1];
                                    var col = wavelengthToRGB(nm2);

                                    var pts = traceRay(dropCx, dropCy, R, -highlightRay, n2, numRef);
                                    if (!pts) continue;

                                    ctx.strokeStyle = col;
                                    ctx.lineWidth = 2;
                                    ctx.globalAlpha = 0.85;
                                    ctx.beginPath();
                                    ctx.moveTo(pts[0].x, pts[0].y);
                                    for (var pi = 1; pi < pts.length; pi++) {
                                        ctx.lineTo(pts[pi].x, pts[pi].y);
                                    }
                                    ctx.stroke();
                                    ctx.globalAlpha = 1;
                                }

                                // Also draw a few parallel rays to show concentration
                                ctx.globalAlpha = 0.2;
                                var nGreen = 1.335;
                                for (var ri = 0; ri < 15; ri++) {
                                    var impact = -0.2 - ri * 0.05;
                                    if (impact < -0.98) break;
                                    var gpts = traceRay(dropCx, dropCy, R, impact, nGreen, numRef);
                                    if (!gpts) continue;
                                    ctx.strokeStyle = viz.colors.green;
                                    ctx.lineWidth = 0.8;
                                    ctx.beginPath();
                                    ctx.moveTo(gpts[0].x, gpts[0].y);
                                    for (var gi = 1; gi < gpts.length; gi++) {
                                        ctx.lineTo(gpts[gi].x, gpts[gi].y);
                                    }
                                    ctx.stroke();
                                }
                                ctx.globalAlpha = 1;

                                // Labels
                                viz.screenText('Water droplet (cross-section)', dropCx, dropCy - R - 15, viz.colors.cyan, 10);
                                viz.screenText('Sunlight \u2192', w * 0.05, dropCy - R * highlightRay - 5, viz.colors.white, 10);
                                viz.screenText(showSecondary ? 'Secondary bow (2 reflections)' : 'Primary bow (1 reflection)', w * 0.5, h - 12, viz.colors.gold, 11);
                                viz.screenText('Rainbow angle \u2248 42\u00B0 (red) to 40.6\u00B0 (violet)', w * 0.5, 15, viz.colors.gold, 10);

                                viz.screenText('Impact parameter: ' + highlightRay.toFixed(2), w * 0.82, h * 0.5, viz.colors.text, 9);
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'For water with \\(n = 1.333\\), verify the rainbow angle. (Hint: the critical incidence angle satisfies \\(\\cos\\theta_i = \\sqrt{(n^2-1)/3}\\).)',
                        hint: 'Compute \\(\\theta_i\\), then \\(\\theta_r = \\arcsin(\\sin\\theta_i/n)\\), then the deviation \\(\\delta = 2\\theta_i - 4\\theta_r + 180^\\circ\\). The rainbow angle is \\(180^\\circ - \\delta\\).',
                        solution: '\\(\\cos\\theta_i = \\sqrt{(1.333^2 - 1)/3} = \\sqrt{0.7769/3} = \\sqrt{0.2590} = 0.5089\\), so \\(\\theta_i = 59.4^\\circ\\). Then \\(\\sin\\theta_r = \\sin 59.4^\\circ / 1.333 = 0.8607/1.333 = 0.6455\\), so \\(\\theta_r = 40.2^\\circ\\). Deviation: \\(\\delta = 2(59.4) - 4(40.2) + 180 = 118.8 - 160.8 + 180 = 138.0^\\circ\\). Rainbow angle: \\(180 - 138.0 = 42.0^\\circ\\). This matches observation.'
                    }
                ]
            },

            // ============================================================
            // Section 4: Color Mixing
            // ============================================================
            {
                id: 'color-mixing',
                title: 'Color Mixing',
                content: `
<h2>How We Perceive Color</h2>

<p>Color is not a property of light alone; it is a property of the interaction between light and the human visual system. The eye has three types of cone cells, sensitive roughly to red, green, and blue wavelengths. The brain interprets the ratio of signals from these three cone types as "color."</p>

<div class="env-block definition">
<div class="env-title">Additive vs subtractive color mixing</div>
<div class="env-body">
<ul>
    <li><strong>Additive mixing</strong> (light): Combining colored lights. Red + Green = Yellow. Red + Blue = Magenta. Green + Blue = Cyan. Red + Green + Blue = White. This is how screens work.</li>
    <li><strong>Subtractive mixing</strong> (pigments): Combining paints or filters that each absorb certain wavelengths. Cyan + Magenta + Yellow = Black (ideally). This is how printers work.</li>
</ul>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-color-mixer"></div>

<h3>Metamerism</h3>

<p>Two lights can look identical to the human eye while having completely different spectra. For example, monochromatic 580 nm light looks yellow, but so does a mixture of 550 nm (green) and 630 nm (red). These are <strong>metamers</strong>: spectrally different but perceptually identical. This is why RGB screens can reproduce most colors without generating actual monochromatic light at those wavelengths.</p>

<div class="env-block intuition">
<div class="env-title">Why is yellow "red + green"?</div>
<div class="env-body">
<p>Monochromatic yellow light at 580 nm stimulates both the red-sensitive and green-sensitive cones. A mixture of red (630 nm) and green (550 nm) light <em>also</em> stimulates both cone types in nearly the same ratio. The brain cannot distinguish the two cases, so it reports "yellow" in both situations. Color is a three-dimensional signal (R, G, B cone responses), not a faithful report of the full spectrum.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Animals see differently</div>
<div class="env-body">
<p>Humans have three cone types (trichromatic vision). Mantis shrimp have sixteen types of photoreceptors. Many birds have four (tetrachromatic), including sensitivity to ultraviolet. Dogs have only two (dichromatic). The "color" an organism perceives depends entirely on its receptor biology, not on any intrinsic property of the light.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-color-mixer',
                        title: 'RGB Color Mixer',
                        description: 'Adjust the intensity of Red, Green, and Blue light sources. Watch how they combine additively to produce any color. The overlapping regions show the secondary colors (cyan, magenta, yellow) and white at the center.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var rVal = 1, gVal = 1, bVal = 1;

                            VizEngine.createSlider(controls, 'Red', 0, 1, 1, 0.01, function (v) { rVal = v; });
                            VizEngine.createSlider(controls, 'Green', 0, 1, 1, 0.01, function (v) { gVal = v; });
                            VizEngine.createSlider(controls, 'Blue', 0, 1, 1, 0.01, function (v) { bVal = v; });

                            function draw() {
                                viz.clear();

                                var cx = w * 0.38, cy = h * 0.5;
                                var radius = Math.min(w, h) * 0.25;
                                var sep = radius * 0.5;

                                // Three overlapping circles for additive color mixing
                                // Use globalCompositeOperation for additive blending
                                // Red circle (top)
                                var rCx = cx, rCy = cy - sep * 0.6;
                                var gCx = cx - sep * 0.55, gCy = cy + sep * 0.4;
                                var bCx = cx + sep * 0.55, bCy = cy + sep * 0.4;

                                // Draw with screen blend mode for additive
                                ctx.save();
                                ctx.globalCompositeOperation = 'screen';

                                // Red
                                var rGrad = ctx.createRadialGradient(rCx, rCy, 0, rCx, rCy, radius);
                                rGrad.addColorStop(0, 'rgba(' + Math.round(rVal * 255) + ',0,0,1)');
                                rGrad.addColorStop(0.7, 'rgba(' + Math.round(rVal * 200) + ',0,0,0.6)');
                                rGrad.addColorStop(1, 'rgba(' + Math.round(rVal * 100) + ',0,0,0)');
                                ctx.fillStyle = rGrad;
                                ctx.beginPath();
                                ctx.arc(rCx, rCy, radius, 0, Math.PI * 2);
                                ctx.fill();

                                // Green
                                var gGrad = ctx.createRadialGradient(gCx, gCy, 0, gCx, gCy, radius);
                                gGrad.addColorStop(0, 'rgba(0,' + Math.round(gVal * 255) + ',0,1)');
                                gGrad.addColorStop(0.7, 'rgba(0,' + Math.round(gVal * 200) + ',0,0.6)');
                                gGrad.addColorStop(1, 'rgba(0,' + Math.round(gVal * 100) + ',0,0)');
                                ctx.fillStyle = gGrad;
                                ctx.beginPath();
                                ctx.arc(gCx, gCy, radius, 0, Math.PI * 2);
                                ctx.fill();

                                // Blue
                                var bGrad = ctx.createRadialGradient(bCx, bCy, 0, bCx, bCy, radius);
                                bGrad.addColorStop(0, 'rgba(0,0,' + Math.round(bVal * 255) + ',1)');
                                bGrad.addColorStop(0.7, 'rgba(0,0,' + Math.round(bVal * 200) + ',0.6)');
                                bGrad.addColorStop(1, 'rgba(0,0,' + Math.round(bVal * 100) + ',0)');
                                ctx.fillStyle = bGrad;
                                ctx.beginPath();
                                ctx.arc(bCx, bCy, radius, 0, Math.PI * 2);
                                ctx.fill();

                                ctx.restore();

                                // Labels
                                viz.screenText('R', rCx, rCy - radius - 8, '#ff4444', 12);
                                viz.screenText('G', gCx - radius - 5, gCy + 5, '#44ff44', 12);
                                viz.screenText('B', bCx + radius + 5, bCy + 5, '#4444ff', 12);

                                // Result color swatch on the right
                                var swatchX = w * 0.7, swatchY = h * 0.2;
                                var swatchW = w * 0.22, swatchH = h * 0.25;
                                var mixR = Math.round(rVal * 255);
                                var mixG = Math.round(gVal * 255);
                                var mixB = Math.round(bVal * 255);
                                var mixColor = 'rgb(' + mixR + ',' + mixG + ',' + mixB + ')';

                                ctx.save();
                                ctx.shadowColor = mixColor;
                                ctx.shadowBlur = 20;
                                ctx.fillStyle = mixColor;
                                ctx.fillRect(swatchX, swatchY, swatchW, swatchH);
                                ctx.restore();
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.strokeRect(swatchX, swatchY, swatchW, swatchH);

                                viz.screenText('Mixed color', swatchX + swatchW / 2, swatchY - 10, viz.colors.text, 10);
                                viz.screenText('RGB(' + mixR + ', ' + mixG + ', ' + mixB + ')', swatchX + swatchW / 2, swatchY + swatchH + 15, viz.colors.text, 10);

                                // Additive color rules
                                var rulesY = h * 0.58;
                                viz.screenText('Additive Color Mixing', w * 0.78, rulesY, viz.colors.gold, 11);
                                var rules = [
                                    ['R + G = Yellow', '#ffff00'],
                                    ['R + B = Magenta', '#ff00ff'],
                                    ['G + B = Cyan', '#00ffff'],
                                    ['R + G + B = White', '#ffffff']
                                ];
                                for (var ri = 0; ri < rules.length; ri++) {
                                    viz.screenText(rules[ri][0], w * 0.78, rulesY + 18 + ri * 16, rules[ri][1], 9);
                                }

                                viz.screenText('Additive mixing (light)', w * 0.5, h - 10, viz.colors.text, 10);
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A screen pixel emits red light at intensity 200/255 and green at intensity 200/255, with blue at 0. What color does this appear to the human eye?',
                        hint: 'Red + Green in additive mixing gives...',
                        solution: 'Red + Green in additive color mixing produces yellow. At roughly equal intensities (200/255 each), the result is a bright yellow. The exact shade is RGB(200, 200, 0).'
                    }
                ]
            },

            // ============================================================
            // Section 5: Why the Sky Is Blue
            // ============================================================
            {
                id: 'why-sky-is-blue',
                title: 'Why the Sky Is Blue',
                content: `
<h2>Rayleigh Scattering</h2>

<p>When sunlight enters the atmosphere, it encounters molecules of nitrogen and oxygen, which are much smaller than visible wavelengths. These tiny molecules scatter light in a process called <strong>Rayleigh scattering</strong>, and the key result is:</p>

<div class="env-block theorem">
<div class="env-title">Rayleigh scattering intensity</div>
<div class="env-body">
\\[I_{\\text{scattered}} \\propto \\frac{1}{\\lambda^4}\\]
<p>Shorter wavelengths are scattered much more strongly. Violet light (\\(\\lambda \\approx 400\\,\\text{nm}\\)) is scattered about \\((700/400)^4 \\approx 9.4\\) times more than red light (\\(\\lambda \\approx 700\\,\\text{nm}\\)).</p>
</div>
</div>

<p>When you look at the sky away from the sun, you see light that has been scattered toward your eyes. Because blue and violet scatter most, the sky appears blue. (Why not violet? Partly because the sun emits less violet than blue, partly because our eyes are less sensitive to violet, and partly because atmospheric absorption removes some violet.)</p>

<h3>Sunsets Are Red</h3>

<p>At sunset, sunlight travels through a much thicker layer of atmosphere. The short wavelengths (blue, violet) are almost entirely scattered away before reaching your eyes. What remains is the long-wavelength end of the spectrum: red and orange. This is why sunsets and sunrises are red.</p>

<div class="env-block intuition">
<div class="env-title">The \\(1/\\lambda^4\\) power</div>
<div class="env-body">
<p>Rayleigh scattering arises because the molecule acts as a tiny oscillating dipole driven by the incoming E-field. The radiated power of an oscillating dipole scales as \\(\\omega^4\\) (fourth power of frequency). Since \\(\\omega = 2\\pi c/\\lambda\\), this gives the \\(1/\\lambda^4\\) dependence. The fourth power makes the effect dramatic: a small wavelength ratio produces a large intensity ratio.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Mie scattering and clouds</div>
<div class="env-body">
<p>Clouds are white, not blue, because water droplets in clouds are much larger than visible wavelengths. Large particles scatter all wavelengths roughly equally (Mie scattering), so the scattered light contains all colors equally: white. Fog and mist are white for the same reason.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Intensity ratio</div>
<div class="env-body">
<p>Compare scattering of blue (450 nm) vs red (650 nm):</p>
\\[\\frac{I_{\\text{blue}}}{I_{\\text{red}}} = \\left(\\frac{650}{450}\\right)^4 = (1.444)^4 \\approx 4.35\\]
<p>Blue light is scattered about 4.4 times more intensely than red. Across the entire visible spectrum (violet to red), the ratio is nearly 10:1. This enormous preference for short wavelengths is why the effect is so visually striking.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Polarization of the sky</div>
<div class="env-body">
<p>Rayleigh-scattered light is partially polarized. The degree of polarization is maximum at 90\\(^\\circ\\) from the sun. This connects back to Chapter 17: the sky is a natural source of polarized light, used by bees and Viking navigators.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Other skies</div>
<div class="env-body">
<p>Mars has a thin atmosphere with lots of fine iron-oxide dust. The dust particles are comparable to visible wavelengths, so Mie scattering dominates, and the Martian sky appears butterscotch-pink. At Martian sunset, the geometry reverses: a blue glow surrounds the setting sun because the fine dust preferentially forward-scatters blue. Every planet's sky color tells us about its atmosphere.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'If Rayleigh scattering goes as \\(1/\\lambda^4\\), by what factor is 400 nm light scattered more than 700 nm light?',
                        hint: 'Compute \\((700/400)^4\\).',
                        solution: '\\((700/400)^4 = (1.75)^4 = 9.38\\). Violet light is scattered about 9.4 times more intensely than red light. This large factor is why the sky is so prominently blue rather than a subtle tint.'
                    },
                    {
                        question: 'Explain why the sky near the horizon is paler (whiter) than the sky directly overhead.',
                        hint: 'Think about how much atmosphere the scattered light must traverse to reach your eyes from different directions.',
                        solution: 'Light from near the horizon has traversed a long atmospheric path. The initially blue-scattered light gets scattered again and again along this path, and the multiply-scattered light includes all wavelengths more equally. Additionally, forward-scattered white light from aerosols and haze contributes. The net effect is a dilution of the blue toward white near the horizon. Directly overhead, the atmospheric path is shortest, the blue scattering is purest, and the sky is deepest blue.'
                    }
                ]
            }
        ]
    });
})();
