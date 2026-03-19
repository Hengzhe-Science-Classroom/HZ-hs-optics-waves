// === Chapter 11: Optical Instruments ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch11',
        number: 11,
        title: 'Optical Instruments',
        subtitle: 'Extending what the eye can see',
        file: 'ch11-instruments',

        sections: [
            // ============================================================
            // Section 0: The Magnifying Glass
            // ============================================================
            {
                id: 'magnifying-glass',
                title: 'The Magnifying Glass',
                content: `
<h2>The Simplest Optical Instrument</h2>

<p>The magnifying glass is nothing more than a single converging lens used with the object placed inside the focal length. This creates a virtual, upright, enlarged image that your eye can focus on comfortably.</p>

<div class="env-block definition">
<div class="env-title">Definition: Angular Magnification</div>
<div class="env-body">
<p>The <strong>angular magnification</strong> (or magnifying power) of a magnifying glass is the ratio of the angle subtended by the image when using the lens to the angle subtended by the object at the near point without the lens:</p>
\\[M_\\theta = \\frac{\\theta_{\\text{with lens}}}{\\theta_{\\text{without lens}}}\\]
</div>
</div>

<p>Without a lens, the closest you can hold an object and still focus on it is the <strong>near point</strong>, typically about 25 cm for a normal eye. Closer than that, the image blurs. A magnifying glass lets you hold the object much closer to your eye, making it appear larger.</p>

<div class="env-block theorem">
<div class="env-title">Magnifying Power</div>
<div class="env-body">
<p>For a magnifying glass with focal length \\(f\\), the angular magnification is approximately:</p>
\\[M_\\theta \\approx \\frac{25\\,\\text{cm}}{f}\\]
<p>This assumes the image forms at infinity (relaxed eye). If the image is formed at the near point (25 cm), the magnification is slightly higher:</p>
\\[M_\\theta = 1 + \\frac{25\\,\\text{cm}}{f}\\]
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: A Jeweler's Loupe</div>
<div class="env-body">
<p>A jeweler uses a loupe with \\(f = 5\\) cm. The angular magnification is:</p>
\\[M_\\theta \\approx \\frac{25}{5} = 5\\times\\]
<p>The gem appears 5 times as large angularly as it would at the near point without the lens.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">Why shorter \\(f\\) gives more magnification</div>
<div class="env-body">
<p>A shorter focal length means the lens is more strongly curved and bends light more aggressively. It can accept light from an object held very close (just inside \\(f\\)) and turn it into a virtual image that appears much larger. However, very short focal lengths require you to hold the lens uncomfortably close to both the object and your eye, and lens aberrations become severe. In practice, magnifying glasses rarely exceed about \\(10\\times\\).</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A magnifying glass has \\(f = 8\\) cm. What is its angular magnification when the eye is relaxed (image at infinity)?',
                        hint: 'Use \\(M = 25/f\\) with \\(f\\) in cm.',
                        solution: '\\(M = 25/8 \\approx 3.1\\times\\).'
                    },
                    {
                        question: 'You want a magnifying glass that provides at least \\(6\\times\\) magnification. What is the maximum focal length it can have?',
                        hint: 'Set \\(25/f \\ge 6\\) and solve for \\(f\\).',
                        solution: '\\(f \\le 25/6 \\approx 4.2\\) cm. The focal length must be 4.2 cm or shorter.'
                    }
                ]
            },

            // ============================================================
            // Section 1: The Compound Microscope
            // ============================================================
            {
                id: 'compound-microscope',
                title: 'The Compound Microscope',
                content: `
<h2>Two Lenses, Enormous Magnification</h2>

<p>A single magnifying glass tops out at about \\(10\\times\\). To see smaller objects, we need the <strong>compound microscope</strong>, which uses two converging lenses in sequence: the <strong>objective</strong> (close to the object) and the <strong>eyepiece</strong> (close to the eye).</p>

<div class="env-block definition">
<div class="env-title">Definition: Compound Microscope</div>
<div class="env-body">
<p>A <strong>compound microscope</strong> consists of two converging lenses separated by a distance much greater than either focal length:</p>
<ul>
<li>The <strong>objective lens</strong> (short focal length \\(f_o\\)) forms a real, enlarged, inverted intermediate image of the object.</li>
<li>The <strong>eyepiece</strong> (focal length \\(f_e\\)) acts as a magnifying glass to further enlarge the intermediate image.</li>
</ul>
</div>
</div>

<h3>How it works</h3>

<p>The object is placed just outside the focal point of the objective. This creates a real, magnified, inverted image inside the microscope tube. The eyepiece is positioned so that this intermediate image falls just inside its focal point. The eyepiece then produces a virtual, further-magnified image that the eye sees.</p>

<div class="env-block theorem">
<div class="env-title">Total Magnification</div>
<div class="env-body">
<p>The total magnification of a compound microscope is the product of the objective's linear magnification and the eyepiece's angular magnification:</p>
\\[M_{\\text{total}} = M_o \\times M_e = -\\frac{L}{f_o} \\times \\frac{25\\,\\text{cm}}{f_e}\\]
<p>where \\(L\\) is the tube length (distance between the focal points of the two lenses), and the negative sign indicates an inverted image.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Typical Lab Microscope</div>
<div class="env-body">
<p>A microscope has \\(f_o = 0.5\\) cm, \\(f_e = 2.5\\) cm, and tube length \\(L = 16\\) cm.</p>
\\[|M_{\\text{total}}| = \\frac{16}{0.5} \\times \\frac{25}{2.5} = 32 \\times 10 = 320\\times\\]
<p>The microscope magnifies 320 times. The image is inverted.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Resolution limit</div>
<div class="env-body">
<p>No matter how much you magnify, a light microscope cannot resolve details smaller than about half the wavelength of light (roughly 200 nm). Beyond that limit, additional magnification just makes a blurry image bigger. To see smaller structures, you need electron microscopes, which use electron "waves" with much shorter wavelengths.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-microscope"></div>
`,
                visualizations: [
                    {
                        id: 'viz-microscope',
                        title: 'Compound Microscope Ray Diagram',
                        description: 'The objective lens forms a real intermediate image, which the eyepiece magnifies further. Adjust the objective focal length and object position to see how the intermediate and final images change.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 16, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            viz.originX = w * 0.12;
                            viz.originY = h * 0.55;
                            var scale = viz.scale;
                            var ox = viz.originX, oy = viz.originY;

                            var fo = 2.0; // objective focal length
                            var fe = 3.0; // eyepiece focal length
                            var separation = 22; // lens separation in math units
                            var objDist = 2.6; // distance of object from objective

                            VizEngine.createSlider(controls, 'f_obj', 1.0, 4.0, fo, 0.1, function (v) { fo = v; });
                            VizEngine.createSlider(controls, 'f_eye', 2.0, 5.0, fe, 0.1, function (v) { fe = v; });
                            VizEngine.createSlider(controls, 'Object dist', 1.5, 6.0, objDist, 0.1, function (v) { objDist = v; });

                            function drawLens(cx, lh, color, label) {
                                var sx = ox + cx * scale;
                                ctx.save();
                                ctx.strokeStyle = color;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                ctx.moveTo(sx, oy - lh);
                                ctx.quadraticCurveTo(sx + 8, oy, sx, oy + lh);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(sx, oy - lh);
                                ctx.quadraticCurveTo(sx - 8, oy, sx, oy + lh);
                                ctx.stroke();
                                ctx.fillStyle = color;
                                ctx.beginPath(); ctx.moveTo(sx, oy - lh - 6); ctx.lineTo(sx - 4, oy - lh); ctx.lineTo(sx + 4, oy - lh); ctx.closePath(); ctx.fill();
                                ctx.beginPath(); ctx.moveTo(sx, oy + lh + 6); ctx.lineTo(sx - 4, oy + lh); ctx.lineTo(sx + 4, oy + lh); ctx.closePath(); ctx.fill();
                                ctx.restore();
                                viz.screenText(label, sx, oy + lh + 20, color, 10);
                            }

                            function drawArrow(xm, hm, color, lw) {
                                var sx = ox + xm * scale;
                                var topY = oy - hm * scale;
                                ctx.save();
                                ctx.strokeStyle = color; ctx.lineWidth = lw || 2.5;
                                ctx.beginPath(); ctx.moveTo(sx, oy); ctx.lineTo(sx, topY); ctx.stroke();
                                var dir = hm > 0 ? -1 : 1;
                                ctx.fillStyle = color;
                                ctx.beginPath();
                                ctx.moveTo(sx, topY);
                                ctx.lineTo(sx - 4, topY + dir * 10);
                                ctx.lineTo(sx + 4, topY + dir * 10);
                                ctx.closePath(); ctx.fill();
                                ctx.restore();
                            }

                            function drawRayLine(x1, y1, x2, y2, color, dashed) {
                                var sx1 = ox + x1 * scale, sy1 = oy - y1 * scale;
                                var sx2 = ox + x2 * scale, sy2 = oy - y2 * scale;
                                ctx.save();
                                ctx.strokeStyle = color; ctx.lineWidth = 1.5;
                                if (dashed) ctx.setLineDash([5, 4]);
                                ctx.beginPath(); ctx.moveTo(sx1, sy1); ctx.lineTo(sx2, sy2); ctx.stroke();
                                ctx.restore();
                                ctx.setLineDash([]);
                            }

                            function draw() {
                                viz.clear();

                                var objX = 0;
                                var lensObjX = objDist; // objective position
                                var lensEyeX = objDist + separation; // eyepiece position
                                var objH = 2.5;

                                // Compute intermediate image from objective
                                var dO1 = objDist; // object distance from objective
                                if (dO1 <= fo) dO1 = fo + 0.1; // clamp
                                var dI1 = (fo * dO1) / (dO1 - fo);
                                var mag1 = -dI1 / dO1;
                                var intImgX = lensObjX + dI1;
                                var intImgH = mag1 * objH;

                                // Compute final image from eyepiece
                                var dO2 = lensEyeX - intImgX; // distance from intermediate image to eyepiece
                                var finalImgX, finalImgH, mag2;
                                var hasImage = true;

                                if (dO2 > 0 && dO2 < fe) {
                                    // Intermediate image inside eyepiece focal length: virtual magnified image
                                    var dI2 = (fe * dO2) / (dO2 - fe);
                                    mag2 = -dI2 / dO2;
                                    finalImgX = lensEyeX + dI2;
                                    finalImgH = mag2 * intImgH;
                                } else if (dO2 > fe) {
                                    var dI2b = (fe * dO2) / (dO2 - fe);
                                    mag2 = -dI2b / dO2;
                                    finalImgX = lensEyeX + dI2b;
                                    finalImgH = mag2 * intImgH;
                                } else {
                                    hasImage = false;
                                    mag2 = 0;
                                    finalImgX = 0;
                                    finalImgH = 0;
                                }

                                // Principal axis
                                ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(w, oy); ctx.stroke();

                                // Lenses
                                var lensH = h * 0.35;
                                drawLens(lensObjX, lensH, viz.colors.cyan, 'Objective');
                                drawLens(lensEyeX, lensH, viz.colors.purple, 'Eyepiece');

                                // Focal points
                                var focalMarks = [
                                    { x: lensObjX + fo, c: viz.colors.cyan },
                                    { x: lensObjX - fo, c: viz.colors.cyan },
                                    { x: lensEyeX + fe, c: viz.colors.purple },
                                    { x: lensEyeX - fe, c: viz.colors.purple }
                                ];
                                for (var fm = 0; fm < focalMarks.length; fm++) {
                                    var fmk = focalMarks[fm];
                                    var fsx = ox + fmk.x * scale;
                                    if (fsx > 0 && fsx < w) {
                                        ctx.fillStyle = fmk.c + '88';
                                        ctx.beginPath(); ctx.arc(fsx, oy, 3, 0, Math.PI * 2); ctx.fill();
                                    }
                                }

                                // Object
                                drawArrow(objX, objH, viz.colors.orange, 3);
                                viz.screenText('Object', ox + objX * scale, oy + 20, viz.colors.orange, 10);

                                // Principal rays through objective
                                var tipX = objX, tipY = objH;

                                // Ray 1: parallel to axis, then through F of objective
                                drawRayLine(tipX, tipY, lensObjX, tipY, viz.colors.gold, false);
                                drawRayLine(lensObjX, tipY, intImgX, intImgH, viz.colors.gold, false);

                                // Ray 2: through center of objective
                                drawRayLine(tipX, tipY, intImgX, intImgH, viz.colors.green, false);

                                // Intermediate image
                                if (isFinite(intImgH) && Math.abs(intImgH) < 20) {
                                    drawArrow(intImgX, intImgH, viz.colors.pink, 2);
                                    viz.screenText('Intermediate', ox + intImgX * scale, oy + Math.abs(intImgH) * scale + 16, viz.colors.pink, 9);

                                    // Rays from intermediate image through eyepiece
                                    if (hasImage && isFinite(finalImgH) && Math.abs(finalImgH) < 30) {
                                        // Ray from top of intermediate image, parallel to axis after eyepiece
                                        drawRayLine(intImgX, intImgH, lensEyeX, intImgH, viz.colors.gold, false);
                                        // Then through eyepiece focal point (or virtual extension)
                                        if (dO2 > 0 && dO2 < fe) {
                                            // Diverging rays after eyepiece; virtual image
                                            var eyeFx = lensEyeX + fe;
                                            // Ray refracts as if coming from eyepiece F
                                            var rdx = intImgH / fe; // slope
                                            var extX = lensEyeX + 10;
                                            var extY = intImgH + rdx * 10;
                                            drawRayLine(lensEyeX, intImgH, extX, extY, viz.colors.gold, false);
                                            // Virtual extension backward
                                            drawRayLine(lensEyeX, intImgH, lensEyeX - 8, intImgH - rdx * 8, viz.colors.gold, true);
                                        }

                                        // Ray through center of eyepiece
                                        drawRayLine(intImgX, intImgH, lensEyeX, 0, viz.colors.green, false);
                                        // Continue
                                        var cdx = lensEyeX - intImgX;
                                        var cdy = 0 - intImgH;
                                        var clen = Math.sqrt(cdx * cdx + cdy * cdy);
                                        if (clen > 0.01) {
                                            drawRayLine(lensEyeX, 0, lensEyeX + cdx / clen * 12, 0 + cdy / clen * 12, viz.colors.green, false);
                                        }
                                    }
                                }

                                // Tube length annotation
                                var tubeStartX = ox + (lensObjX + fo) * scale;
                                var tubeEndX = ox + (lensEyeX - fe) * scale;
                                if (tubeStartX < tubeEndX) {
                                    ctx.strokeStyle = viz.colors.text + '66';
                                    ctx.lineWidth = 1;
                                    var annY = oy - lensH - 10;
                                    ctx.beginPath(); ctx.moveTo(tubeStartX, annY); ctx.lineTo(tubeEndX, annY); ctx.stroke();
                                    ctx.beginPath(); ctx.moveTo(tubeStartX, annY - 4); ctx.lineTo(tubeStartX, annY + 4); ctx.stroke();
                                    ctx.beginPath(); ctx.moveTo(tubeEndX, annY - 4); ctx.lineTo(tubeEndX, annY + 4); ctx.stroke();
                                    viz.screenText('L (tube length)', (tubeStartX + tubeEndX) / 2, annY - 10, viz.colors.text, 9);
                                }

                                // Info panel
                                ctx.fillStyle = 'rgba(12,12,32,0.85)';
                                ctx.fillRect(w - 200, 8, 192, 75);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.strokeRect(w - 200, 8, 192, 75);

                                var totalMag = mag1 * (hasImage ? mag2 : 0);
                                viz.screenText('Compound Microscope', w - 104, 22, viz.colors.white, 11);
                                viz.screenText('M_obj = ' + mag1.toFixed(1) + '    M_eye = ' + (hasImage ? mag2.toFixed(1) : '--'), w - 104, 42, viz.colors.text, 10);
                                viz.screenText('M_total = ' + (isFinite(totalMag) ? totalMag.toFixed(0) : '--') + '\u00d7', w - 104, 60, viz.colors.gold, 12);
                                viz.screenText(totalMag < 0 ? 'Inverted image' : 'Upright image', w - 104, 76, viz.colors.teal, 10);
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A compound microscope has \\(f_o = 0.8\\) cm, \\(f_e = 2.0\\) cm, and tube length \\(L = 18\\) cm. What is the total magnification?',
                        hint: 'Use \\(M = (L/f_o)(25/f_e)\\).',
                        solution: '\\(|M| = \\frac{18}{0.8} \\times \\frac{25}{2.0} = 22.5 \\times 12.5 = 281\\times\\).'
                    },
                    {
                        question: 'Why does the objective lens need a much shorter focal length than the eyepiece?',
                        hint: 'Think about what each lens does and how the magnification formula works.',
                        solution: 'The objective produces the initial magnified real image. A shorter focal length gives a larger magnification (\\(M_o \\approx L/f_o\\)), so a tiny \\(f_o\\) means high magnification of the first stage. The eyepiece then further magnifies this image. If the objective had a long focal length, the intermediate image would be barely enlarged, and the eyepiece alone could not compensate.'
                    }
                ]
            },

            // ============================================================
            // Section 2: The Refracting Telescope
            // ============================================================
            {
                id: 'refracting-telescope',
                title: 'The Refracting Telescope',
                content: `
<h2>Bringing the Distant Close</h2>

<p>Like the microscope, a refracting telescope uses two converging lenses, but its goal is the opposite: to magnify objects that are far away rather than very small. The key difference is that telescopes deal with objects effectively at infinity, so the incoming light is parallel.</p>

<div class="env-block definition">
<div class="env-title">Definition: Refracting Telescope</div>
<div class="env-body">
<p>A <strong>refracting telescope</strong> (Keplerian type) has:</p>
<ul>
<li>An <strong>objective lens</strong> with a large focal length \\(f_o\\) that collects parallel light from a distant object and forms a real image at its focal point.</li>
<li>An <strong>eyepiece</strong> with a short focal length \\(f_e\\) that magnifies this real image.</li>
</ul>
<p>The two lenses are separated by \\(f_o + f_e\\).</p>
</div>
</div>

<div class="env-block theorem">
<div class="env-title">Telescope Magnification</div>
<div class="env-body">
<p>The angular magnification of a refracting telescope is:</p>
\\[M_\\theta = -\\frac{f_o}{f_e}\\]
<p>The negative sign indicates the image is inverted. For astronomical observation this rarely matters, but terrestrial telescopes add an extra lens or prism to re-invert the image.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Galileo's Telescope</div>
<div class="env-body">
<p>Suppose a telescope has \\(f_o = 100\\) cm and \\(f_e = 2.5\\) cm.</p>
\\[|M| = \\frac{100}{2.5} = 40\\times\\]
<p>The Moon, for instance, would appear 40 times closer; you could resolve features only 10 km across.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Why bigger objectives are better</div>
<div class="env-body">
<p>A larger objective lens collects more light, making faint objects brighter. It also improves <strong>angular resolution</strong> (the ability to distinguish two close objects), because resolution is limited by diffraction, and a wider lens diffracts less. This is why serious telescopes have objectives many centimeters or even meters in diameter.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-telescope"></div>
`,
                visualizations: [
                    {
                        id: 'viz-telescope',
                        title: 'Refracting Telescope Ray Diagram',
                        description: 'Parallel rays from a distant object enter the objective lens (blue) and converge to a real image at its focal point. The eyepiece (purple) magnifies this image. Adjust the focal lengths to see how the magnification changes.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 12, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;
                            viz.originX = w * 0.08;
                            viz.originY = h * 0.5;
                            var scale = viz.scale;
                            var ox = viz.originX, oy = viz.originY;

                            var fo = 20; // objective focal length (long)
                            var fe = 4;  // eyepiece focal length (short)
                            var inAngle = 3; // incoming angle in degrees

                            VizEngine.createSlider(controls, 'f_obj', 10, 35, fo, 1, function (v) { fo = v; });
                            VizEngine.createSlider(controls, 'f_eye', 2, 8, fe, 0.5, function (v) { fe = v; });
                            VizEngine.createSlider(controls, 'Angle (\u00b0)', 1, 8, inAngle, 0.5, function (v) { inAngle = v; });

                            function drawLens(cx, lh, color, label) {
                                var sx = ox + cx * scale;
                                ctx.save();
                                ctx.strokeStyle = color; ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                ctx.moveTo(sx, oy - lh);
                                ctx.quadraticCurveTo(sx + 8, oy, sx, oy + lh);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(sx, oy - lh);
                                ctx.quadraticCurveTo(sx - 8, oy, sx, oy + lh);
                                ctx.stroke();
                                ctx.fillStyle = color;
                                ctx.beginPath(); ctx.moveTo(sx, oy - lh - 6); ctx.lineTo(sx - 4, oy - lh); ctx.lineTo(sx + 4, oy - lh); ctx.closePath(); ctx.fill();
                                ctx.beginPath(); ctx.moveTo(sx, oy + lh + 6); ctx.lineTo(sx - 4, oy + lh); ctx.lineTo(sx + 4, oy + lh); ctx.closePath(); ctx.fill();
                                ctx.restore();
                                viz.screenText(label, sx, oy + lh + 18, color, 10);
                            }

                            function drawRayLine(x1, y1, x2, y2, color, dashed, lw) {
                                var sx1 = ox + x1 * scale, sy1 = oy - y1 * scale;
                                var sx2 = ox + x2 * scale, sy2 = oy - y2 * scale;
                                ctx.save();
                                ctx.strokeStyle = color; ctx.lineWidth = lw || 1.5;
                                if (dashed) ctx.setLineDash([5, 4]);
                                ctx.beginPath(); ctx.moveTo(sx1, sy1); ctx.lineTo(sx2, sy2); ctx.stroke();
                                ctx.restore();
                                ctx.setLineDash([]);
                            }

                            function draw(t) {
                                viz.clear();

                                var objLensX = 5;       // objective position
                                var eyeLensX = objLensX + fo + fe; // eyepiece position
                                var lensH = h * 0.38;

                                // Axis
                                ctx.strokeStyle = viz.colors.axis; ctx.lineWidth = 1;
                                ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(w, oy); ctx.stroke();

                                // Lenses
                                drawLens(objLensX, lensH, viz.colors.cyan, 'Objective');
                                drawLens(eyeLensX, lensH, viz.colors.purple, 'Eyepiece');

                                // Shared focal point (between lenses)
                                var sharedFx = ox + (objLensX + fo) * scale;
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.arc(sharedFx, oy, 4, 0, Math.PI * 2); ctx.fill();
                                viz.screenText('F_o = F_e', sharedFx, oy + 14, viz.colors.orange, 9);

                                var thetaIn = inAngle * Math.PI / 180;
                                var imgHtAtFocus = fo * Math.tan(thetaIn); // height of intermediate image

                                // Incoming parallel rays (from upper-left, angled)
                                var numRays = 4;
                                for (var r = 0; r < numRays; r++) {
                                    var yOff = (r - (numRays - 1) / 2) * 3;
                                    var rayStartX = -4;
                                    var rayStartY = yOff + (objLensX - rayStartX) * Math.tan(thetaIn) + yOff * 0.02;

                                    // Hit point on objective
                                    var hitY = yOff;

                                    ctx.save();
                                    ctx.shadowColor = viz.colors.gold;
                                    ctx.shadowBlur = 3;

                                    // Incoming ray (parallel to each other, angled)
                                    drawRayLine(rayStartX, hitY + (objLensX - rayStartX) * Math.tan(thetaIn), objLensX, hitY, viz.colors.gold, false, 1.8);

                                    // After objective: converge to focal plane image point
                                    var focalImgY = -imgHtAtFocus;
                                    drawRayLine(objLensX, hitY, objLensX + fo, focalImgY, viz.colors.gold, false, 1.8);

                                    ctx.restore();
                                }

                                // Image point at focal plane
                                var imgPtSx = ox + (objLensX + fo) * scale;
                                var imgPtSy = oy - (-imgHtAtFocus) * scale;
                                var imgGrad = ctx.createRadialGradient(imgPtSx, imgPtSy, 0, imgPtSx, imgPtSy, 10);
                                imgGrad.addColorStop(0, 'rgba(255,215,0,0.6)');
                                imgGrad.addColorStop(1, 'rgba(255,215,0,0)');
                                ctx.fillStyle = imgGrad;
                                ctx.beginPath(); ctx.arc(imgPtSx, imgPtSy, 10, 0, Math.PI * 2); ctx.fill();

                                // Rays from intermediate image through eyepiece
                                // The intermediate image at the shared focal point sends rays through eyepiece
                                var intImgX = objLensX + fo;
                                var intImgY = -imgHtAtFocus;

                                // Output angle
                                var thetaOut = Math.atan(imgHtAtFocus / fe);

                                for (var r2 = 0; r2 < numRays; r2++) {
                                    var yOff2 = (r2 - (numRays - 1) / 2) * 3;
                                    // Ray from image point to eyepiece at height yOff2
                                    drawRayLine(intImgX, intImgY, eyeLensX, yOff2, viz.colors.cyan, false, 1.5);

                                    // After eyepiece: parallel rays at output angle
                                    var outEndX = eyeLensX + 15;
                                    var outEndY = yOff2 + 15 * Math.tan(thetaOut);
                                    drawRayLine(eyeLensX, yOff2, outEndX, outEndY, viz.colors.cyan, false, 1.5);
                                }

                                // Angle arcs
                                // Input angle at objective
                                var arcR = 40;
                                var objSx = ox + objLensX * scale;
                                ctx.strokeStyle = viz.colors.gold; ctx.lineWidth = 1.5;
                                ctx.beginPath();
                                ctx.arc(objSx, oy, arcR, -Math.PI, -Math.PI + thetaIn, false);
                                ctx.stroke();
                                viz.screenText('\u03b1', objSx - arcR - 12, oy - arcR * Math.sin(thetaIn / 2) - 2, viz.colors.gold, 11);

                                // Output angle at eyepiece
                                var eyeSx = ox + eyeLensX * scale;
                                ctx.strokeStyle = viz.colors.cyan;
                                ctx.beginPath();
                                ctx.arc(eyeSx, oy, arcR, -thetaOut, 0, false);
                                ctx.stroke();
                                viz.screenText('\u03b2', eyeSx + arcR + 10, oy - arcR * Math.sin(thetaOut / 2) - 2, viz.colors.cyan, 11);

                                // Info panel
                                ctx.fillStyle = 'rgba(12,12,32,0.85)';
                                ctx.fillRect(w - 190, 8, 182, 68);
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.strokeRect(w - 190, 8, 182, 68);

                                var magVal = fo / fe;
                                viz.screenText('Refracting Telescope', w - 99, 22, viz.colors.white, 11);
                                viz.screenText('M = f_o / f_e = ' + fo.toFixed(0) + ' / ' + fe.toFixed(1) + ' = ' + magVal.toFixed(1) + '\u00d7', w - 99, 42, viz.colors.gold, 11);
                                viz.screenText('Length = f_o + f_e = ' + (fo + fe).toFixed(1) + ' units', w - 99, 60, viz.colors.text, 10);
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A telescope has \\(f_o = 80\\) cm and \\(f_e = 4\\) cm. What is the magnification, and what is the total length of the telescope?',
                        hint: 'Magnification is \\(f_o/f_e\\). The length is \\(f_o + f_e\\) when focused at infinity.',
                        solution: '\\(M = 80/4 = 20\\times\\). Total length = \\(80 + 4 = 84\\) cm.'
                    },
                    {
                        question: 'You want to build a \\(50\\times\\) telescope that is no longer than 1 meter. What focal lengths should you choose?',
                        hint: 'You need \\(f_o/f_e = 50\\) and \\(f_o + f_e \\le 100\\) cm.',
                        solution: '\\(f_o = 50 \\cdot f_e\\) and \\(50 f_e + f_e \\le 100\\), so \\(51 f_e \\le 100\\), giving \\(f_e \\le 1.96\\) cm. Choose \\(f_e \\approx 1.96\\) cm and \\(f_o \\approx 98\\) cm. The telescope would be about 100 cm long.'
                    }
                ]
            },

            // ============================================================
            // Section 3: The Camera
            // ============================================================
            {
                id: 'camera',
                title: 'The Camera',
                content: `
<h2>Capturing Light on a Surface</h2>

<p>A camera is essentially a converging lens that forms a real image on a light-sensitive surface (film or a digital sensor). The principles are identical to what we covered in Chapter 10, but with some practical additions.</p>

<div class="env-block definition">
<div class="env-title">Definition: Camera</div>
<div class="env-body">
<p>A <strong>camera</strong> uses a converging lens (or system of lenses) to focus a real, inverted, diminished image of a distant scene onto a sensor or film at the back of the camera body. The key parameters are:</p>
<ul>
<li><strong>Focal length</strong>: determines the angle of view and magnification.</li>
<li><strong>Aperture</strong>: the opening that controls how much light enters.</li>
<li><strong>Sensor distance</strong>: adjusted (by focusing) to place the sharp image exactly on the sensor.</li>
</ul>
</div>
</div>

<h3>Focusing</h3>

<p>Objects at different distances produce images at different distances behind the lens (by the thin lens equation). To focus, the camera moves the lens forward or backward to place the image precisely on the sensor. For a very distant object (\\(d_o \\to \\infty\\)), the image forms at \\(d_i = f\\). For a closer object, the image moves further from the lens, so the lens must be moved forward.</p>

<h3>Aperture and f-number</h3>

<p>The <strong>aperture</strong> is the diameter \\(D\\) of the opening through which light passes. The <strong>f-number</strong> (f-stop) is defined as:</p>
\\[N = \\frac{f}{D}\\]

<p>A smaller f-number means a larger aperture (more light, shallower depth of field). Typical values range from \\(f/1.4\\) to \\(f/22\\).</p>

<div class="env-block remark">
<div class="env-title">Depth of field</div>
<div class="env-body">
<p>A large aperture (small f-number, like \\(f/1.4\\)) gives a shallow depth of field, where only a narrow range of distances is in sharp focus. A small aperture (large f-number, like \\(f/16\\)) gives a deep depth of field, where nearly everything from near to far is in focus. Landscape photographers use small apertures; portrait photographers often use large ones to blur the background.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Camera Focusing</div>
<div class="env-body">
<p>A camera lens has \\(f = 50\\) mm. The photographer focuses on a subject 2 m away. Where must the sensor be?</p>
\\[\\frac{1}{50} = \\frac{1}{2000} + \\frac{1}{d_i}\\]
\\[\\frac{1}{d_i} = \\frac{1}{50} - \\frac{1}{2000} = \\frac{40 - 1}{2000} = \\frac{39}{2000}\\]
\\[d_i \\approx 51.3\\,\\text{mm}\\]
<p>The sensor must be 51.3 mm behind the lens, just slightly more than the focal length.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A camera with a 50 mm lens photographs an object at infinity. Where is the image formed?',
                        hint: 'When \\(d_o \\to \\infty\\), what does the thin lens equation give for \\(d_i\\)?',
                        solution: 'When \\(d_o \\to \\infty\\), \\(1/d_o \\to 0\\), so \\(d_i = f = 50\\) mm. The image forms exactly at the focal plane.'
                    },
                    {
                        question: 'A lens has \\(f = 35\\) mm and aperture diameter \\(D = 17.5\\) mm. What is its f-number? If the aperture is reduced to \\(D = 5\\) mm, what is the new f-number?',
                        hint: 'Use \\(N = f/D\\).',
                        solution: 'First: \\(N = 35/17.5 = f/2\\). Second: \\(N = 35/5 = f/7\\).'
                    }
                ]
            },

            // ============================================================
            // Section 4: The Human Eye
            // ============================================================
            {
                id: 'human-eye',
                title: 'The Human Eye',
                content: `
<h2>The Original Optical Instrument</h2>

<p>The human eye is a remarkable optical system. It automatically adjusts its focus, adapts to enormous brightness ranges, and sends high-resolution images to the brain for processing. All the principles of lenses and image formation that we have studied are at work inside your eyes right now as you read this.</p>

<div class="env-block definition">
<div class="env-title">Definition: Accommodation</div>
<div class="env-body">
<p><strong>Accommodation</strong> is the process by which the eye changes the focal length of its crystalline lens to focus on objects at different distances. Ciliary muscles contract or relax to change the curvature of the lens. More curvature means a shorter focal length, allowing near objects to be focused.</p>
</div>
</div>

<h3>The eye as a camera</h3>

<p>The eye works very much like a camera:</p>

<ul>
<li>The <strong>cornea</strong> does most of the refraction (about 2/3 of the eye's total refractive power), because the refractive index change from air to cornea is large.</li>
<li>The <strong>crystalline lens</strong> provides fine focus adjustment. Unlike a camera that moves the lens, the eye changes the lens shape.</li>
<li>The <strong>retina</strong> is the "sensor," containing rod and cone cells that detect light.</li>
<li>The <strong>iris</strong> acts as the aperture, controlling how much light enters through the <strong>pupil</strong>.</li>
</ul>

<div class="env-block intuition">
<div class="env-title">Near point and far point</div>
<div class="env-body">
<p>The <strong>near point</strong> is the closest distance at which the eye can focus (about 25 cm for a young adult). The <strong>far point</strong> is the farthest distance (infinity for a normal eye). As people age, the lens becomes less flexible, and the near point recedes. By age 50, many people cannot focus closer than 40 cm, which is why reading glasses become necessary (a condition called <strong>presbyopia</strong>).</p>
</div>
</div>

<h3>Vision defects</h3>

<div class="env-block example">
<div class="env-title">Example: Correcting Vision</div>
<div class="env-body">
<ul>
<li><strong>Myopia</strong> (nearsightedness): The eyeball is too long or the lens too strong. Parallel rays focus in front of the retina. Corrected with a <strong>diverging lens</strong> (negative power).</li>
<li><strong>Hyperopia</strong> (farsightedness): The eyeball is too short or the lens too weak. Parallel rays would focus behind the retina. Corrected with a <strong>converging lens</strong> (positive power).</li>
<li><strong>Presbyopia</strong> (age-related loss of accommodation): Corrected with reading glasses (converging lenses for near work).</li>
</ul>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Lens power in diopters</div>
<div class="env-body">
<p>Optometrists measure lens strength in <strong>diopters</strong> (D), defined as:</p>
\\[P = \\frac{1}{f}\\quad\\text{(with } f \\text{ in meters)}\\]
<p>A lens with \\(f = 0.5\\) m has power \\(P = 2\\) D. A diverging lens with \\(f = -0.25\\) m has power \\(P = -4\\) D. Your prescription is written in diopters.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-eye"></div>
`,
                visualizations: [
                    {
                        id: 'viz-eye',
                        title: 'The Human Eye: Accommodation',
                        description: 'See how the eye adjusts its lens shape to focus on objects at different distances. The lens gets fatter (more curved) for near objects and thinner for distant objects. Try the myopia and hyperopia modes to see how corrective lenses fix the focus.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 40, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var objDist = 200; // cm
                            var visionType = 0; // 0=normal, 1=myopia, 2=hyperopia
                            var showCorrection = false;

                            VizEngine.createSlider(controls, 'Object dist (cm)', 15, 500, objDist, 5, function (v) { objDist = v; });
                            VizEngine.createButton(controls, 'Normal', function () { visionType = 0; });
                            VizEngine.createButton(controls, 'Myopic', function () { visionType = 1; });
                            VizEngine.createButton(controls, 'Hyperopic', function () { visionType = 2; });
                            VizEngine.createButton(controls, 'Toggle Correction', function () { showCorrection = !showCorrection; });

                            function draw(t) {
                                viz.clear();

                                var time = t * 0.001;
                                var eyeCx = w * 0.55;
                                var eyeCy = h * 0.5;
                                var eyeRadius = 70;

                                // Eye length adjustment for conditions
                                var eyeStretch = 0;
                                if (visionType === 1) eyeStretch = 12; // myopia: longer eye
                                if (visionType === 2) eyeStretch = -10; // hyperopia: shorter eye

                                // Draw eyeball
                                ctx.save();
                                ctx.beginPath();
                                ctx.ellipse(eyeCx, eyeCy, eyeRadius + eyeStretch, eyeRadius, 0, 0, Math.PI * 2);
                                ctx.fillStyle = 'rgba(240, 240, 255, 0.06)';
                                ctx.fill();
                                ctx.strokeStyle = 'rgba(200, 210, 230, 0.3)';
                                ctx.lineWidth = 2;
                                ctx.stroke();
                                ctx.restore();

                                // Retina (back of eye)
                                var retinaX = eyeCx + eyeRadius + eyeStretch - 5;
                                ctx.strokeStyle = viz.colors.pink + '88';
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.arc(eyeCx + eyeStretch * 0.3, eyeCy, eyeRadius - 2, -0.6, 0.6, false);
                                ctx.stroke();
                                viz.screenText('Retina', retinaX + 8, eyeCy - eyeRadius * 0.4, viz.colors.pink, 9, 'left');

                                // Cornea (front of eye)
                                var corneaX = eyeCx - eyeRadius;
                                ctx.strokeStyle = viz.colors.cyan;
                                ctx.lineWidth = 2.5;
                                ctx.beginPath();
                                ctx.arc(eyeCx - eyeRadius + 15, eyeCy, 30, Math.PI * 0.6, Math.PI * 1.4, false);
                                ctx.stroke();
                                viz.screenText('Cornea', corneaX - 18, eyeCy, viz.colors.cyan, 9, 'right');

                                // Crystalline lens (changes shape with accommodation)
                                var lensX = eyeCx - eyeRadius + 28;
                                // Accommodation: closer object = fatter lens
                                var minDist = 25;
                                var accomFactor = VizEngine.clamp(1 - (objDist - minDist) / 400, 0, 1);
                                var lensWidth = 6 + accomFactor * 12;
                                var lensHalfH = 22 + accomFactor * 5;

                                ctx.save();
                                ctx.fillStyle = 'rgba(180, 200, 255, 0.2)';
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(lensX, eyeCy - lensHalfH);
                                ctx.quadraticCurveTo(lensX + lensWidth, eyeCy, lensX, eyeCy + lensHalfH);
                                ctx.quadraticCurveTo(lensX - lensWidth, eyeCy, lensX, eyeCy - lensHalfH);
                                ctx.fill();
                                ctx.stroke();
                                ctx.restore();
                                viz.screenText('Lens', lensX, eyeCy + lensHalfH + 14, viz.colors.blue, 9);

                                // Iris / pupil
                                var pupilHalf = 16;
                                ctx.strokeStyle = '#8B4513';
                                ctx.lineWidth = 4;
                                ctx.beginPath(); ctx.moveTo(lensX - 3, eyeCy - lensHalfH - 5); ctx.lineTo(lensX - 3, eyeCy - pupilHalf); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(lensX - 3, eyeCy + pupilHalf); ctx.lineTo(lensX - 3, eyeCy + lensHalfH + 5); ctx.stroke();

                                // Corrective lens (if enabled)
                                var correctiveLensX = corneaX - 25;
                                if (showCorrection && visionType !== 0) {
                                    ctx.save();
                                    ctx.strokeStyle = viz.colors.green;
                                    ctx.lineWidth = 2;
                                    var cLensH = 45;
                                    if (visionType === 1) {
                                        // Diverging lens for myopia
                                        ctx.beginPath();
                                        ctx.moveTo(correctiveLensX, eyeCy - cLensH);
                                        ctx.quadraticCurveTo(correctiveLensX - 8, eyeCy, correctiveLensX, eyeCy + cLensH);
                                        ctx.stroke();
                                        ctx.beginPath();
                                        ctx.moveTo(correctiveLensX, eyeCy - cLensH);
                                        ctx.quadraticCurveTo(correctiveLensX + 8, eyeCy, correctiveLensX, eyeCy + cLensH);
                                        ctx.stroke();
                                        viz.screenText('Diverging', correctiveLensX, eyeCy - cLensH - 10, viz.colors.green, 9);
                                    } else {
                                        // Converging lens for hyperopia
                                        ctx.beginPath();
                                        ctx.moveTo(correctiveLensX, eyeCy - cLensH);
                                        ctx.quadraticCurveTo(correctiveLensX + 10, eyeCy, correctiveLensX, eyeCy + cLensH);
                                        ctx.stroke();
                                        ctx.beginPath();
                                        ctx.moveTo(correctiveLensX, eyeCy - cLensH);
                                        ctx.quadraticCurveTo(correctiveLensX - 10, eyeCy, correctiveLensX, eyeCy + cLensH);
                                        ctx.stroke();
                                        viz.screenText('Converging', correctiveLensX, eyeCy - cLensH - 10, viz.colors.green, 9);
                                    }
                                    ctx.restore();
                                }

                                // Incoming rays
                                var numRays = 5;
                                var rayStartX = 20;
                                var sourceY = eyeCy;

                                // Effective focal length of the eye's optical system
                                var eyeF = eyeRadius * 0.9; // simplified
                                var focalPlane = lensX + eyeF;

                                // Where the rays actually focus
                                var focusShift = 0;
                                if (visionType === 1) focusShift = -eyeStretch * 0.7; // focuses too early
                                if (visionType === 2) focusShift = -eyeStretch * 0.7; // focuses too late

                                // Correction shifts it back
                                if (showCorrection && visionType !== 0) focusShift = 0;

                                var actualFocusX = retinaX + focusShift;
                                var canFocus = Math.abs(focusShift) < 5;

                                for (var r = 0; r < numRays; r++) {
                                    var yOff = (r - (numRays - 1) / 2) * 14;
                                    if (Math.abs(yOff) < 3) continue;

                                    // Incoming ray from object
                                    var srcX = rayStartX;
                                    var srcY = eyeCy + yOff * (1 + 200 / Math.max(objDist, 30));

                                    // Ray to cornea/corrective lens
                                    var entryX = showCorrection && visionType !== 0 ? correctiveLensX : corneaX;
                                    var entryY = eyeCy + yOff;

                                    ctx.save();
                                    ctx.shadowColor = viz.colors.gold;
                                    ctx.shadowBlur = 4;
                                    ctx.strokeStyle = viz.colors.gold;
                                    ctx.lineWidth = 1.8;

                                    // Incoming ray
                                    ctx.beginPath(); ctx.moveTo(srcX, srcY); ctx.lineTo(entryX, entryY); ctx.stroke();

                                    // Through corrective lens (if applicable)
                                    if (showCorrection && visionType !== 0) {
                                        // Slightly adjust entry angle
                                        ctx.beginPath(); ctx.moveTo(correctiveLensX, entryY); ctx.lineTo(corneaX, eyeCy + yOff * 0.9); ctx.stroke();
                                        entryY = eyeCy + yOff * 0.9;
                                    }

                                    // Ray through eye converging
                                    ctx.strokeStyle = canFocus ? viz.colors.cyan : viz.colors.red;
                                    ctx.beginPath(); ctx.moveTo(corneaX, entryY); ctx.lineTo(actualFocusX, eyeCy); ctx.stroke();

                                    // Continue past focus
                                    if (actualFocusX < retinaX) {
                                        var pastDx = retinaX - actualFocusX;
                                        var pastDy = -yOff * pastDx / (actualFocusX - corneaX) * 0.3;
                                        ctx.globalAlpha = 0.3;
                                        ctx.beginPath(); ctx.moveTo(actualFocusX, eyeCy); ctx.lineTo(retinaX, eyeCy + pastDy); ctx.stroke();
                                    }

                                    ctx.restore();
                                }

                                // Focus point glow
                                var focusGlow = ctx.createRadialGradient(actualFocusX, eyeCy, 0, actualFocusX, eyeCy, 12);
                                focusGlow.addColorStop(0, canFocus ? 'rgba(0,255,100,0.5)' : 'rgba(255,80,80,0.5)');
                                focusGlow.addColorStop(1, 'rgba(0,0,0,0)');
                                ctx.fillStyle = focusGlow;
                                ctx.beginPath(); ctx.arc(actualFocusX, eyeCy, 12, 0, Math.PI * 2); ctx.fill();

                                // Object indicator
                                var objIndicatorX = 15;
                                ctx.strokeStyle = viz.colors.orange; ctx.lineWidth = 3;
                                ctx.beginPath(); ctx.moveTo(objIndicatorX, eyeCy + 30); ctx.lineTo(objIndicatorX, eyeCy - 30); ctx.stroke();
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath(); ctx.moveTo(objIndicatorX, eyeCy - 33); ctx.lineTo(objIndicatorX - 5, eyeCy - 23); ctx.lineTo(objIndicatorX + 5, eyeCy - 23); ctx.closePath(); ctx.fill();
                                viz.screenText('Object', objIndicatorX, eyeCy + 44, viz.colors.orange, 9);
                                viz.screenText(objDist + ' cm', objIndicatorX, eyeCy + 56, viz.colors.text, 9);

                                // Status
                                var typeLabels = ['Normal Eye', 'Myopic Eye (too long)', 'Hyperopic Eye (too short)'];
                                viz.screenText(typeLabels[visionType], w / 2, 18, viz.colors.white, 13);

                                if (canFocus) {
                                    viz.screenText('In focus on retina', w / 2, h - 20, viz.colors.green, 12);
                                } else if (visionType === 1) {
                                    viz.screenText('Focus falls in front of retina (blurry)', w / 2, h - 20, viz.colors.red, 12);
                                    if (!showCorrection) viz.screenText('Toggle correction to fix with diverging lens', w / 2, h - 38, viz.colors.text, 10);
                                } else if (visionType === 2) {
                                    viz.screenText('Focus falls behind retina (blurry)', w / 2, h - 20, viz.colors.red, 12);
                                    if (!showCorrection) viz.screenText('Toggle correction to fix with converging lens', w / 2, h - 38, viz.colors.text, 10);
                                }

                                // Accommodation info
                                viz.screenText('Lens curvature: ' + (accomFactor * 100).toFixed(0) + '% (accommodation)', w / 2, h - 56, viz.colors.blue, 10);
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A person\'s far point is 2 m (they cannot focus on anything beyond 2 m). Are they myopic or hyperopic? What lens power (in diopters) do they need?',
                        hint: 'If the far point is not at infinity, the person is myopic. The corrective lens must make objects at infinity appear to be at 2 m.',
                        solution: 'They are myopic (nearsighted). The corrective lens must form a virtual image of a distant object at 2 m. Using \\(1/f = 1/d_i + 1/d_o\\) with \\(d_o = \\infty\\) and \\(d_i = -2\\) m (virtual image on the same side as the object): \\(P = 1/f = 1/(-2) = -0.5\\) D. They need a \\(-0.5\\) diopter lens.'
                    },
                    {
                        question: 'A person\'s near point is 80 cm. What power reading glasses do they need to read at 25 cm?',
                        hint: 'The reading glasses must form a virtual image of the text (at 25 cm from the eye) at the person\'s near point (80 cm).',
                        solution: 'The lens must map \\(d_o = 25\\) cm to \\(d_i = -80\\) cm. \\(1/f = 1/25 + 1/(-80) = 0.04 - 0.0125 = 0.0275\\) cm\\(^{-1}\\). So \\(f = 36.4\\) cm \\(= 0.364\\) m. \\(P = 1/0.364 \\approx +2.75\\) D.'
                    }
                ]
            }
        ]
    });
})();
