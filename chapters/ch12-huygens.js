// === Chapter 12: Huygens' Principle ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch12',
        number: 12,
        title: "Huygens' Principle",
        subtitle: 'Every point on a wavefront is itself a source of waves',
        file: 'ch12-huygens',

        sections: [
            // ============================================================
            // Section 1: Every Point Is a Source
            // ============================================================
            {
                id: 'every-point-source',
                title: 'Every Point Is a Source',
                content: `
<h2>Christiaan Huygens' Revolutionary Idea</h2>

<p>In 1678, the Dutch physicist Christiaan Huygens proposed a beautifully simple principle that explains how waves propagate. At the time, Newton's particle ("corpuscle") theory of light dominated, and Huygens' wave theory was largely ignored for over a century. History proved Huygens right.</p>

<div class="env-block theorem">
<div class="env-title">Huygens' Principle</div>
<div class="env-body">
<p>Every point on a wavefront acts as a source of secondary spherical wavelets. The new wavefront at a later time is the <strong>envelope</strong> (the surface tangent to all the wavelets) of these secondary waves.</p>
</div>
</div>

<p>Think of it this way: a wavefront is not a rigid wall marching forward. Instead, each tiny piece of it radiates outward in all directions, like a pebble dropped in water. The overall wave moves forward because the forward-going contributions from all these tiny sources reinforce each other, while the backward-going parts cancel (this cancellation was later made rigorous by Fresnel and Kirchhoff).</p>

<div class="env-block intuition">
<div class="env-title">The ripple tank analogy</div>
<div class="env-body">
<p>Imagine a straight wave hitting a barrier with a tiny hole. On the other side, you see a circular wave emerging from the hole, as though the hole itself were a point source. That is Huygens' principle in action: the wavefront at the hole acts as a new source, and only the part that passes through the hole survives to create the circular wavelet on the other side.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-huygens-construction"></div>

<div class="env-block remark">
<div class="env-title">Why no backward wave?</div>
<div class="env-body">
<p>Huygens' original formulation had a weakness: it could not explain why the wavelets do not produce a backward-propagating wave. Augustin Fresnel fixed this in 1818 by adding the idea that wavelets interfere. The backward components from adjacent sources cancel each other through destructive interference, leaving only the forward-moving envelope. Kirchhoff later gave the full mathematical treatment.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-huygens-construction',
                        title: "Huygens' Construction: Wavefront Propagation",
                        description: 'Watch a plane wavefront advance step by step. At each stage, secondary wavelets (circles) emerge from sample points on the wavefront. The new wavefront is the envelope of these wavelets. Adjust the wavelet count and speed.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var nPoints = 12;
                            var speed = 0.5;
                            var t = 0;
                            var waveletRadius = 60;

                            VizEngine.createSlider(controls, 'Points', 4, 24, nPoints, 1, function (v) { nPoints = Math.round(v); });
                            VizEngine.createSlider(controls, 'Speed', 0.2, 1.5, speed, 0.1, function (v) { speed = v; });
                            VizEngine.createButton(controls, 'Reset', function () { t = 0; });

                            function draw(ts) {
                                t += speed * 0.016;
                                var cycle = t % 3.0;
                                viz.clear();

                                // Draw multiple wavefront generations
                                var numGenerations = 3;
                                var spacing = waveletRadius * 1.8;

                                for (var gen = 0; gen < numGenerations; gen++) {
                                    var baseX = 60 + gen * spacing;
                                    var phase = cycle - gen * 0.8;
                                    if (phase < 0) continue;
                                    var growFrac = VizEngine.clamp(phase / 1.0, 0, 1);

                                    // Draw the parent wavefront line
                                    var alpha = gen === 0 ? 0.6 : 0.3;
                                    ctx.strokeStyle = 'rgba(88,166,255,' + alpha + ')';
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.moveTo(baseX, 30);
                                    ctx.lineTo(baseX, h - 30);
                                    ctx.stroke();

                                    // Draw wavelets from each point
                                    var margin = 40;
                                    for (var i = 0; i < nPoints; i++) {
                                        var py = margin + (h - 2 * margin) * i / (nPoints - 1);
                                        var rad = growFrac * waveletRadius;

                                        // Wavelet circle
                                        ctx.strokeStyle = VizEngine.hsl(180 + i * 5, 70, 55) + '44';
                                        ctx.lineWidth = 1;
                                        ctx.beginPath();
                                        ctx.arc(baseX, py, rad, -Math.PI / 2, Math.PI / 2);
                                        ctx.stroke();

                                        // Source point
                                        ctx.fillStyle = viz.colors.cyan;
                                        ctx.beginPath();
                                        ctx.arc(baseX, py, 3, 0, Math.PI * 2);
                                        ctx.fill();
                                    }

                                    // Draw the envelope (new wavefront)
                                    if (growFrac > 0.3) {
                                        var envX = baseX + growFrac * waveletRadius;
                                        ctx.strokeStyle = viz.colors.orange;
                                        ctx.lineWidth = 2.5;
                                        ctx.shadowColor = viz.colors.orange;
                                        ctx.shadowBlur = 8;
                                        ctx.beginPath();
                                        ctx.moveTo(envX, margin);
                                        ctx.lineTo(envX, h - margin);
                                        ctx.stroke();
                                        ctx.shadowBlur = 0;
                                    }
                                }

                                // Labels
                                viz.screenText("Huygens' Construction", w / 2, 16, viz.colors.text, 13);
                                viz.screenText('Old wavefront', 50, h - 12, viz.colors.blue, 11, 'left');
                                viz.screenText('New wavefront (envelope)', w - 60, h - 12, viz.colors.orange, 11, 'right');

                                // Direction arrow
                                ctx.strokeStyle = viz.colors.white;
                                ctx.lineWidth = 2;
                                var ax = w - 40, ay = h / 2;
                                ctx.beginPath();
                                ctx.moveTo(ax - 30, ay);
                                ctx.lineTo(ax, ay);
                                ctx.stroke();
                                ctx.fillStyle = viz.colors.white;
                                ctx.beginPath();
                                ctx.moveTo(ax + 8, ay);
                                ctx.lineTo(ax - 4, ay - 5);
                                ctx.lineTo(ax - 4, ay + 5);
                                ctx.closePath();
                                ctx.fill();
                                viz.screenText('v', ax - 10, ay - 12, viz.colors.white, 11);
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: "State Huygens' principle in your own words. Why is it called a \"construction\" rather than a \"law\"?",
                        hint: "Think about what Huygens' principle lets you do geometrically, and whether it makes a prediction about new physics or merely provides a method.",
                        solution: "Huygens' principle says every point on a wavefront acts as a source of new spherical wavelets, and the next wavefront is the envelope of these wavelets. It is called a \"construction\" because it is a geometric method for finding the next wavefront, not a fundamental law of nature. The underlying physics is the wave equation; Huygens' construction is a tool for solving it geometrically."
                    }
                ]
            },

            // ============================================================
            // Section 2: Constructing Wavefronts
            // ============================================================
            {
                id: 'constructing-wavefronts',
                title: 'Constructing Wavefronts',
                content: `
<h2>From Wavelets to Wavefronts</h2>

<p>Huygens' construction is a step-by-step procedure:</p>

<ol>
<li>Start with a known wavefront at time \\(t\\).</li>
<li>Pick many points along this wavefront.</li>
<li>From each point, draw a spherical wavelet of radius \\(r = v \\Delta t\\), where \\(v\\) is the wave speed and \\(\\Delta t\\) is the elapsed time.</li>
<li>Draw the envelope (the common tangent surface) of all these wavelets. This is the new wavefront at time \\(t + \\Delta t\\).</li>
</ol>

<div class="env-block example">
<div class="env-title">Example: Plane wave stays plane</div>
<div class="env-body">
<p>A plane wavefront moves through a uniform medium. Every secondary wavelet has the same radius \\(v\\Delta t\\). The common tangent to a row of equal circles is a straight line displaced forward by \\(v\\Delta t\\). The wavefront remains planar and parallel to the original, exactly as expected.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Spherical wavefront expands</div>
<div class="env-body">
<p>A point source emits a spherical wavefront of radius \\(R\\). Each wavelet has radius \\(v\\Delta t\\). The envelope is a larger sphere of radius \\(R + v\\Delta t\\). The wavefront remains spherical and expands outward.</p>
</div>
</div>

<p>These two cases, plane and spherical, are the simplest. But the power of Huygens' construction is that it works for <em>any</em> wavefront shape and for media where the speed varies from place to place. This is how we will explain refraction.</p>

<div class="env-block definition">
<div class="env-title">Definition: Wavefront and Ray</div>
<div class="env-body">
<p>A <strong>wavefront</strong> is a surface of constant phase (e.g., all points at a crest). A <strong>ray</strong> is a line perpendicular to the wavefront, indicating the direction of propagation. In a uniform medium, rays are straight lines. In a non-uniform medium, rays curve.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-wavefront-types"></div>
`,
                visualizations: [
                    {
                        id: 'viz-wavefront-types',
                        title: 'Plane vs Spherical Wavefronts',
                        description: 'Toggle between a plane wave and a point-source spherical wave. In both cases, Huygens wavelets construct the next wavefront as the envelope.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var mode = 'plane'; // or 'spherical'
                            var t = 0;

                            VizEngine.createButton(controls, 'Plane Wave', function () { mode = 'plane'; t = 0; });
                            VizEngine.createButton(controls, 'Spherical Wave', function () { mode = 'spherical'; t = 0; });

                            function draw() {
                                t += 0.012;
                                var cycle = (t % 2.5);
                                viz.clear();

                                var nPts = 14;
                                var waveR = 50;
                                var growFrac = VizEngine.clamp(cycle / 1.2, 0, 1);

                                if (mode === 'plane') {
                                    // Plane wave moving right
                                    var baseX = 100 + cycle * 60;
                                    var margin = 30;

                                    // Parent wavefront
                                    ctx.strokeStyle = viz.colors.blue;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.moveTo(baseX, margin);
                                    ctx.lineTo(baseX, h - margin);
                                    ctx.stroke();

                                    for (var i = 0; i < nPts; i++) {
                                        var py = margin + (h - 2 * margin) * i / (nPts - 1);
                                        var rad = growFrac * waveR;
                                        ctx.strokeStyle = viz.colors.teal + '33';
                                        ctx.lineWidth = 1;
                                        ctx.beginPath();
                                        ctx.arc(baseX, py, rad, -Math.PI / 2, Math.PI / 2);
                                        ctx.stroke();
                                        ctx.fillStyle = viz.colors.cyan;
                                        ctx.beginPath();
                                        ctx.arc(baseX, py, 2.5, 0, Math.PI * 2);
                                        ctx.fill();
                                    }

                                    // Envelope
                                    if (growFrac > 0.2) {
                                        var envX = baseX + growFrac * waveR;
                                        ctx.strokeStyle = viz.colors.orange;
                                        ctx.lineWidth = 2.5;
                                        ctx.shadowColor = viz.colors.orange;
                                        ctx.shadowBlur = 6;
                                        ctx.beginPath();
                                        ctx.moveTo(envX, margin);
                                        ctx.lineTo(envX, h - margin);
                                        ctx.stroke();
                                        ctx.shadowBlur = 0;
                                    }

                                    // Rays
                                    ctx.strokeStyle = viz.colors.yellow + '44';
                                    ctx.lineWidth = 1;
                                    ctx.setLineDash([4, 4]);
                                    for (var ri = 0; ri < 5; ri++) {
                                        var ry = margin + (h - 2 * margin) * (ri + 0.5) / 5;
                                        ctx.beginPath();
                                        ctx.moveTo(20, ry);
                                        ctx.lineTo(w - 20, ry);
                                        ctx.stroke();
                                    }
                                    ctx.setLineDash([]);

                                    viz.screenText('PLANE WAVE', w / 2, 16, viz.colors.white, 13);
                                } else {
                                    // Spherical wave from point source
                                    var srcX = 80, srcY = h / 2;
                                    var baseR = 60 + cycle * 50;

                                    // Source
                                    ctx.fillStyle = viz.colors.gold;
                                    ctx.shadowColor = viz.colors.gold;
                                    ctx.shadowBlur = 12;
                                    ctx.beginPath();
                                    ctx.arc(srcX, srcY, 5, 0, Math.PI * 2);
                                    ctx.fill();
                                    ctx.shadowBlur = 0;

                                    // Parent wavefront arc
                                    ctx.strokeStyle = viz.colors.blue;
                                    ctx.lineWidth = 2;
                                    ctx.beginPath();
                                    ctx.arc(srcX, srcY, baseR, -Math.PI / 3, Math.PI / 3);
                                    ctx.stroke();

                                    for (var j = 0; j < nPts; j++) {
                                        var angle = -Math.PI / 3 + (2 * Math.PI / 3) * j / (nPts - 1);
                                        var px = srcX + baseR * Math.cos(angle);
                                        var py2 = srcY + baseR * Math.sin(angle);
                                        var rad2 = growFrac * waveR;

                                        ctx.strokeStyle = viz.colors.teal + '33';
                                        ctx.lineWidth = 1;
                                        ctx.beginPath();
                                        ctx.arc(px, py2, rad2, 0, Math.PI * 2);
                                        ctx.stroke();
                                        ctx.fillStyle = viz.colors.cyan;
                                        ctx.beginPath();
                                        ctx.arc(px, py2, 2.5, 0, Math.PI * 2);
                                        ctx.fill();
                                    }

                                    // Envelope arc
                                    if (growFrac > 0.2) {
                                        var envR = baseR + growFrac * waveR;
                                        ctx.strokeStyle = viz.colors.orange;
                                        ctx.lineWidth = 2.5;
                                        ctx.shadowColor = viz.colors.orange;
                                        ctx.shadowBlur = 6;
                                        ctx.beginPath();
                                        ctx.arc(srcX, srcY, envR, -Math.PI / 3, Math.PI / 3);
                                        ctx.stroke();
                                        ctx.shadowBlur = 0;
                                    }

                                    // Rays
                                    ctx.strokeStyle = viz.colors.yellow + '44';
                                    ctx.lineWidth = 1;
                                    ctx.setLineDash([4, 4]);
                                    for (var rj = 0; rj < 5; rj++) {
                                        var ra = -Math.PI / 4 + (Math.PI / 2) * rj / 4;
                                        ctx.beginPath();
                                        ctx.moveTo(srcX, srcY);
                                        ctx.lineTo(srcX + 400 * Math.cos(ra), srcY + 400 * Math.sin(ra));
                                        ctx.stroke();
                                    }
                                    ctx.setLineDash([]);

                                    viz.screenText('SPHERICAL WAVE', w / 2, 16, viz.colors.white, 13);
                                }

                                viz.screenText('Blue = old wavefront', 20, h - 12, viz.colors.blue, 10, 'left');
                                viz.screenText('Orange = new wavefront', w - 20, h - 12, viz.colors.orange, 10, 'right');
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A plane wavefront travels through water at \\(v = 1500\\,\\text{m/s}\\). After \\(\\Delta t = 0.002\\,\\text{s}\\), how far has the wavefront advanced?',
                        hint: 'Each Huygens wavelet has radius \\(r = v\\Delta t\\).',
                        solution: '\\(r = v\\Delta t = 1500 \\times 0.002 = 3.0\\,\\text{m}\\). The wavefront advances 3.0 m, and since all wavelets have the same radius, the wavefront remains planar.'
                    },
                    {
                        question: 'Explain why a spherical wavefront from a point source remains spherical as it expands, using Huygens\' construction.',
                        hint: 'Consider the symmetry of the wavelets on a spherical surface.',
                        solution: 'On a spherical wavefront of radius \\(R\\), every point generates a wavelet of the same radius \\(v\\Delta t\\). By spherical symmetry, the envelope of all these wavelets is a sphere of radius \\(R + v\\Delta t\\), centered on the original source. The wavefront stays spherical because the construction is symmetric about the center.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Explaining Reflection
            // ============================================================
            {
                id: 'explaining-reflection',
                title: 'Explaining Reflection',
                content: `
<h2>The Law of Reflection from Huygens' Principle</h2>

<p>In Chapter 7 we stated the law of reflection: the angle of incidence equals the angle of reflection (\\(\\theta_i = \\theta_r\\)). Now we can <em>derive</em> it from Huygens' principle.</p>

<p>Consider a plane wave approaching a flat reflecting surface at angle \\(\\theta_i\\). The wavefront is tilted relative to the surface. Different parts of the wavefront reach the surface at different times.</p>

<div class="env-block theorem">
<div class="env-title">Huygens' derivation of the law of reflection</div>
<div class="env-body">
<p>When a wavefront strikes a flat surface:</p>
<ol>
<li>Point A on the wavefront hits the surface first and begins radiating a secondary wavelet.</li>
<li>While the wavelet from A expands, the rest of the wavefront continues toward the surface at speed \\(v\\).</li>
<li>Point B (the last point) hits the surface after a time \\(\\Delta t\\). During that time, the wavelet from A has grown to radius \\(v\\Delta t\\).</li>
<li>The reflected wavefront is the tangent line from B to the wavelet at A.</li>
</ol>
<p>By geometry, the triangle formed by the incident wavefront and the triangle formed by the reflected wavefront are congruent, so \\(\\theta_i = \\theta_r\\).</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-huygens-reflection"></div>

<div class="env-block remark">
<div class="env-title">The same result, deeper reason</div>
<div class="env-body">
<p>The law of reflection also follows from Fermat's principle (the path of least time) and from the wave equation directly. Huygens' construction gives us a geometric, visual proof that does not require calculus. All three approaches give the same answer, which is reassuring.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-huygens-reflection',
                        title: "Reflection via Huygens' Construction",
                        description: 'A plane wavefront approaches a flat mirror at an adjustable angle. Watch the wavelets form at the surface and construct the reflected wavefront. The angle of incidence equals the angle of reflection.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var incAngle = 35; // degrees
                            var t = 0;
                            var speed = 0.4;

                            VizEngine.createSlider(controls, 'Angle (\u00B0)', 10, 70, incAngle, 1, function (v) { incAngle = v; t = 0; });
                            VizEngine.createSlider(controls, 'Speed', 0.1, 1.0, speed, 0.1, function (v) { speed = v; });

                            function draw() {
                                t += speed * 0.014;
                                var cycle = t % 3.5;
                                viz.clear();

                                var mirrorY = h * 0.65;
                                var mirrorLeft = 40, mirrorRight = w - 40;
                                var ang = incAngle * Math.PI / 180;

                                // Draw mirror
                                ctx.strokeStyle = viz.colors.white;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(mirrorLeft, mirrorY);
                                ctx.lineTo(mirrorRight, mirrorY);
                                ctx.stroke();
                                // Hatching
                                ctx.strokeStyle = viz.colors.text + '55';
                                ctx.lineWidth = 1;
                                for (var hx = mirrorLeft; hx < mirrorRight; hx += 12) {
                                    ctx.beginPath();
                                    ctx.moveTo(hx, mirrorY);
                                    ctx.lineTo(hx - 6, mirrorY + 8);
                                    ctx.stroke();
                                }

                                // Incident wavefront approaching
                                var wfLen = 180;
                                var dx = Math.sin(ang);
                                var dy = Math.cos(ang);
                                var hitX = w * 0.35;
                                var progress = cycle;

                                // Incident rays
                                var nRays = 5;
                                ctx.strokeStyle = viz.colors.blue + '55';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4, 3]);
                                for (var ri = 0; ri < nRays; ri++) {
                                    var frac = ri / (nRays - 1);
                                    var rx = hitX + frac * wfLen * Math.cos(ang);
                                    ctx.beginPath();
                                    ctx.moveTo(rx - dy * 250, mirrorY - 250 + dx * 250 * 0);
                                    ctx.lineTo(rx, mirrorY);
                                    ctx.stroke();
                                }

                                // Reflected rays
                                ctx.strokeStyle = viz.colors.orange + '55';
                                for (var rj = 0; rj < nRays; rj++) {
                                    var frac2 = rj / (nRays - 1);
                                    var rx2 = hitX + frac2 * wfLen * Math.cos(ang);
                                    ctx.beginPath();
                                    ctx.moveTo(rx2, mirrorY);
                                    ctx.lineTo(rx2 + dy * 200, mirrorY - 200);
                                    ctx.stroke();
                                }
                                ctx.setLineDash([]);

                                // Wavelets at surface
                                var nWavelets = 8;
                                var surfaceLen = wfLen * Math.cos(ang);
                                for (var wi = 0; wi < nWavelets; wi++) {
                                    var frac3 = wi / (nWavelets - 1);
                                    var wx = hitX + frac3 * surfaceLen;
                                    var hitTime = frac3;
                                    var waveletAge = cycle - hitTime * 1.5;
                                    if (waveletAge < 0) continue;
                                    var wr = VizEngine.clamp(waveletAge * 40, 0, surfaceLen * (1 - frac3) * Math.tan(ang));

                                    ctx.strokeStyle = viz.colors.teal + '44';
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    ctx.arc(wx, mirrorY, wr, -Math.PI, 0);
                                    ctx.stroke();

                                    ctx.fillStyle = viz.colors.cyan;
                                    ctx.beginPath();
                                    ctx.arc(wx, mirrorY, 3, 0, Math.PI * 2);
                                    ctx.fill();
                                }

                                // Reflected wavefront envelope
                                if (cycle > 1.5) {
                                    var envFrac = VizEngine.clamp((cycle - 1.5) / 1.5, 0, 1);
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.lineWidth = 2.5;
                                    ctx.shadowColor = viz.colors.orange;
                                    ctx.shadowBlur = 6;

                                    var ex1 = hitX + surfaceLen;
                                    var ey1 = mirrorY;
                                    var ex2 = hitX + surfaceLen * (1 - envFrac);
                                    var ey2 = mirrorY - envFrac * surfaceLen * Math.tan(ang);

                                    ctx.beginPath();
                                    ctx.moveTo(ex1, ey1);
                                    ctx.lineTo(ex2, ey2);
                                    ctx.stroke();
                                    ctx.shadowBlur = 0;
                                }

                                // Angle labels
                                var normalX = w * 0.5;
                                ctx.strokeStyle = viz.colors.text + '66';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([2, 3]);
                                ctx.beginPath();
                                ctx.moveTo(normalX, mirrorY);
                                ctx.lineTo(normalX, mirrorY - 150);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                viz.screenText('\u03B8i = ' + incAngle + '\u00B0', normalX - 50, mirrorY - 80, viz.colors.blue, 13);
                                viz.screenText('\u03B8r = ' + incAngle + '\u00B0', normalX + 50, mirrorY - 80, viz.colors.orange, 13);
                                viz.screenText('Mirror surface', w / 2, mirrorY + 22, viz.colors.text, 11);
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'In the Huygens construction for reflection, point A hits the mirror first and point B last. If the wavefront has width \\(w\\) along the surface and the incident angle is \\(\\theta_i\\), what is the time delay between A and B hitting the surface?',
                        hint: 'The extra distance that B must travel before hitting the surface is \\(w\\sin\\theta_i\\).',
                        solution: 'The extra path for B is \\(w\\sin\\theta_i\\), so \\(\\Delta t = w\\sin\\theta_i / v\\). During this time, the wavelet from A grows to radius \\(v\\Delta t = w\\sin\\theta_i\\). By constructing the tangent from B to this wavelet, you find the reflected angle satisfies \\(\\sin\\theta_r = w\\sin\\theta_i / w = \\sin\\theta_i\\), hence \\(\\theta_r = \\theta_i\\).'
                    }
                ]
            },

            // ============================================================
            // Section 4: Explaining Refraction
            // ============================================================
            {
                id: 'explaining-refraction',
                title: 'Explaining Refraction',
                content: `
<h2>Snell's Law from Huygens' Principle</h2>

<p>The most powerful application of Huygens' principle is deriving Snell's law of refraction. When a wave crosses from one medium to another, its speed changes. This speed change is what causes the wave to bend.</p>

<div class="env-block theorem">
<div class="env-title">Huygens' derivation of Snell's Law</div>
<div class="env-body">
<p>A plane wavefront crosses from medium 1 (speed \\(v_1\\)) into medium 2 (speed \\(v_2\\)). Point A enters medium 2 first. By the time point B reaches the boundary (a time \\(\\Delta t\\) later), the wavelet from A in medium 2 has radius \\(v_2 \\Delta t\\). Meanwhile, \\(B\\)'s distance to the boundary was \\(v_1 \\Delta t \\sin\\theta_1\\). By geometry:</p>
\\[\\frac{\\sin\\theta_1}{v_1} = \\frac{\\sin\\theta_2}{v_2}\\]
<p>which is Snell's law: \\(n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2\\), where \\(n = c/v\\).</p>
</div>
</div>

<p>The key insight: the wavefront bends because one side of it enters the slower medium first and slows down, while the other side is still in the fast medium. It is exactly like a marching band turning a corner, where the inside members take shorter steps than the outside members.</p>

<div class="viz-placeholder" data-viz="viz-huygens-refraction"></div>

<div class="env-block intuition">
<div class="env-title">Why does light bend toward the normal in a denser medium?</div>
<div class="env-body">
<p>If \\(v_2 < v_1\\) (denser medium, e.g., glass), the wavelets in medium 2 are smaller than those in medium 1. The envelope tilts more steeply, pulling the wavefront closer to the normal. Hence \\(\\theta_2 < \\theta_1\\): the wave bends toward the normal when entering a slower medium.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Air to glass</div>
<div class="env-body">
<p>Light in air (\\(n_1 = 1.00\\)) hits glass (\\(n_2 = 1.50\\)) at \\(\\theta_1 = 45^\\circ\\). By Snell's law:</p>
\\[\\sin\\theta_2 = \\frac{n_1}{n_2}\\sin\\theta_1 = \\frac{1.00}{1.50}\\sin 45^\\circ = \\frac{0.707}{1.50} = 0.471\\]
\\[\\theta_2 = 28.1^\\circ\\]
<p>The light bends toward the normal because it slows down in glass. Via Huygens: in glass, the wavelets are smaller (\\(v_2 = c/1.5\\)), so the envelope tilts more steeply.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-huygens-refraction',
                        title: "Refraction via Huygens' Construction",
                        description: 'A wavefront crosses from a fast medium (top, blue) to a slow medium (bottom, green). The wavelets in the slow medium are smaller, causing the wavefront to bend. Adjust the refractive index and incident angle.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var n2 = 1.5;
                            var incAngle = 40;
                            var t = 0;

                            VizEngine.createSlider(controls, '\u03B8i (\u00B0)', 5, 75, incAngle, 1, function (v) { incAngle = v; t = 0; });
                            VizEngine.createSlider(controls, 'n\u2082', 1.0, 2.5, n2, 0.1, function (v) { n2 = v; t = 0; });

                            function draw() {
                                t += 0.012;
                                var cycle = t % 3.0;
                                viz.clear();

                                var boundaryY = h * 0.45;
                                var ang1 = incAngle * Math.PI / 180;
                                var sinAng2 = Math.sin(ang1) / n2;
                                var ang2 = Math.asin(VizEngine.clamp(sinAng2, -1, 1));
                                var refAngleDeg = Math.round(ang2 * 180 / Math.PI);

                                // Background for two media
                                ctx.fillStyle = 'rgba(88,166,255,0.04)';
                                ctx.fillRect(0, 0, w, boundaryY);
                                ctx.fillStyle = 'rgba(63,185,80,0.04)';
                                ctx.fillRect(0, boundaryY, w, h - boundaryY);

                                // Boundary line
                                ctx.strokeStyle = viz.colors.white + '88';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(0, boundaryY);
                                ctx.lineTo(w, boundaryY);
                                ctx.stroke();

                                // Normal
                                var normalX = w * 0.45;
                                ctx.strokeStyle = viz.colors.text + '55';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([3, 3]);
                                ctx.beginPath();
                                ctx.moveTo(normalX, boundaryY - 140);
                                ctx.lineTo(normalX, boundaryY + 140);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Incident wavefront and wavelets
                                var hitX = normalX;
                                var surfLen = 120;

                                // Draw incident rays
                                ctx.strokeStyle = viz.colors.blue + '44';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([3, 3]);
                                for (var ri = 0; ri < 4; ri++) {
                                    var frac = ri / 3;
                                    var sx = hitX + frac * surfLen * Math.cos(0) - Math.sin(ang1) * 200;
                                    ctx.beginPath();
                                    ctx.moveTo(hitX + frac * surfLen - Math.sin(ang1) * 180, boundaryY - Math.cos(ang1) * 180);
                                    ctx.lineTo(hitX + frac * surfLen, boundaryY);
                                    ctx.stroke();
                                }

                                // Draw refracted rays
                                ctx.strokeStyle = viz.colors.green + '44';
                                for (var rj = 0; rj < 4; rj++) {
                                    var frac2 = rj / 3;
                                    ctx.beginPath();
                                    ctx.moveTo(hitX + frac2 * surfLen, boundaryY);
                                    ctx.lineTo(hitX + frac2 * surfLen + Math.sin(ang2) * 180, boundaryY + Math.cos(ang2) * 180);
                                    ctx.stroke();
                                }
                                ctx.setLineDash([]);

                                // Wavelets at boundary
                                var nWav = 7;
                                for (var wi = 0; wi < nWav; wi++) {
                                    var frac3 = wi / (nWav - 1);
                                    var wx = hitX + frac3 * surfLen;
                                    var age = cycle - frac3 * 1.5;
                                    if (age < 0) continue;

                                    // Wavelet in medium 1 (above)
                                    var r1 = VizEngine.clamp(age * 35, 0, 60);
                                    ctx.strokeStyle = viz.colors.blue + '22';
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    ctx.arc(wx, boundaryY, r1, -Math.PI, 0);
                                    ctx.stroke();

                                    // Wavelet in medium 2 (below, smaller)
                                    var r2 = r1 / n2;
                                    ctx.strokeStyle = viz.colors.green + '33';
                                    ctx.beginPath();
                                    ctx.arc(wx, boundaryY, r2, 0, Math.PI);
                                    ctx.stroke();

                                    ctx.fillStyle = viz.colors.cyan;
                                    ctx.beginPath();
                                    ctx.arc(wx, boundaryY, 3, 0, Math.PI * 2);
                                    ctx.fill();
                                }

                                // Refracted wavefront envelope
                                if (cycle > 1.0) {
                                    var envFrac = VizEngine.clamp((cycle - 1.0) / 1.5, 0, 1);
                                    // The refracted wavefront
                                    ctx.strokeStyle = viz.colors.orange;
                                    ctx.lineWidth = 2.5;
                                    ctx.shadowColor = viz.colors.orange;
                                    ctx.shadowBlur = 6;

                                    var ex1 = hitX + surfLen;
                                    var ey1 = boundaryY;
                                    var maxR2 = surfLen * Math.sin(ang1) / n2;
                                    var ex2 = hitX + surfLen * (1 - envFrac) + envFrac * maxR2 * Math.sin(ang2);
                                    var ey2 = boundaryY + envFrac * maxR2 * Math.cos(ang2);

                                    ctx.beginPath();
                                    ctx.moveTo(ex1, ey1);
                                    ctx.lineTo(hitX + surfLen * (1 - envFrac), boundaryY + envFrac * surfLen * Math.sin(ang1) / n2);
                                    ctx.stroke();
                                    ctx.shadowBlur = 0;
                                }

                                // Labels
                                viz.screenText('n\u2081 = 1.00 (fast)', 80, 20, viz.colors.blue, 12, 'left');
                                viz.screenText('n\u2082 = ' + n2.toFixed(1) + ' (slow)', 80, boundaryY + 20, viz.colors.green, 12, 'left');
                                viz.screenText('\u03B8\u2081 = ' + incAngle + '\u00B0', normalX - 60, boundaryY - 60, viz.colors.blue, 13);
                                viz.screenText('\u03B8\u2082 = ' + refAngleDeg + '\u00B0', normalX + 50, boundaryY + 60, viz.colors.green, 13);
                                viz.screenText("Snell: n\u2081sin\u03B8\u2081 = n\u2082sin\u03B8\u2082", w / 2, h - 16, viz.colors.orange, 12);
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Using Huygens\' construction, explain why a wave bends <em>away</em> from the normal when passing from glass (\\(n = 1.5\\)) to air (\\(n = 1.0\\)).',
                        hint: 'In air, the wave speed is faster, so the wavelets are larger.',
                        solution: 'When the wavefront enters air (faster medium), the wavelets on the air side are larger than they would be in glass. The first point to cross the boundary has a larger wavelet by the time the last point crosses. The envelope therefore tilts away from the normal: \\(\\theta_2 > \\theta_1\\). From Snell\'s law, \\(1.5 \\sin\\theta_1 = 1.0 \\sin\\theta_2\\), so \\(\\sin\\theta_2 = 1.5\\sin\\theta_1 > \\sin\\theta_1\\), confirming \\(\\theta_2 > \\theta_1\\).'
                    },
                    {
                        question: 'A wavefront in water (\\(n = 1.33\\)) hits the surface at \\(\\theta_1 = 30^\\circ\\). Using Huygens\' construction (or Snell\'s law), find the refracted angle in air.',
                        hint: 'Apply \\(n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2\\) with \\(n_1 = 1.33\\), \\(n_2 = 1.00\\).',
                        solution: '\\(\\sin\\theta_2 = \\frac{1.33}{1.00}\\sin 30^\\circ = 1.33 \\times 0.5 = 0.665\\). So \\(\\theta_2 = \\arcsin(0.665) \\approx 41.7^\\circ\\). The wave bends away from the normal when moving into the faster medium.'
                    }
                ]
            },

            // ============================================================
            // Section 5: Diffraction Preview
            // ============================================================
            {
                id: 'diffraction-preview',
                title: 'Diffraction Preview',
                content: `
<h2>When Waves Bend Around Obstacles</h2>

<p>Huygens' principle explains something that a particle theory of light never could: <strong>diffraction</strong>, the bending of waves around obstacles and through openings.</p>

<div class="env-block definition">
<div class="env-title">Definition: Diffraction</div>
<div class="env-body">
<p><strong>Diffraction</strong> is the spreading of waves when they encounter an obstacle or pass through an opening whose size is comparable to the wavelength. It is a consequence of Huygens' principle: the unobstructed part of the wavefront acts as a set of secondary sources, and their wavelets spread into the geometric shadow region.</p>
</div>
</div>

<p>When a plane wave passes through a wide opening (much larger than the wavelength), the wave continues almost straight, with only slight bending at the edges. But when the opening narrows to the order of the wavelength, the bending becomes dramatic: the wave fans out in all directions, as if the slit were a new point source.</p>

<div class="viz-placeholder" data-viz="viz-diffraction-preview"></div>

<div class="env-block intuition">
<div class="env-title">Why diffraction depends on the ratio of slit width to wavelength</div>
<div class="env-body">
<p>If the slit is very wide, there are many Huygens sources across it. Their wavelets cancel in all directions except straight ahead, producing a beam. If the slit is comparable to \\(\\lambda\\), there are only a few sources, and the cancellation is incomplete, so the wave spreads. In the extreme case of a slit narrower than \\(\\lambda\\), there is essentially one source, and the wave radiates as a semicircle.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Looking ahead</div>
<div class="env-body">
<p>In the coming chapters, we will explore diffraction and interference quantitatively. Young's double-slit experiment (Chapter 13), thin-film interference (Chapter 14), single-slit diffraction (Chapter 15), and diffraction gratings (Chapter 16) all build on Huygens' principle. The wave nature of light, once controversial, will become undeniable as we see interference fringes that no particle theory can explain.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-diffraction-preview',
                        title: 'Diffraction Through a Slit',
                        description: 'A plane wave passes through a slit. Adjust the slit width relative to the wavelength. When the slit is wide, the wave goes mostly straight; when narrow, it spreads dramatically.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var slitWidth = 4.0; // in wavelengths
                            var t = 0;
                            var lambda = 20; // pixels per wavelength

                            VizEngine.createSlider(controls, 'Slit / \u03BB', 0.5, 10, slitWidth, 0.5, function (v) { slitWidth = v; });

                            function draw() {
                                t += 0.06;
                                viz.clear();

                                var barrierX = w * 0.3;
                                var centerY = h / 2;
                                var slitHalfPx = slitWidth * lambda / 2;

                                // Barrier
                                ctx.fillStyle = viz.colors.text + '88';
                                ctx.fillRect(barrierX - 3, 0, 6, centerY - slitHalfPx);
                                ctx.fillRect(barrierX - 3, centerY + slitHalfPx, 6, h - centerY - slitHalfPx);

                                // Incident plane waves (left of barrier)
                                ctx.strokeStyle = viz.colors.blue + '55';
                                ctx.lineWidth = 1.5;
                                for (var wf = 0; wf < 15; wf++) {
                                    var xw = barrierX - ((t * lambda + wf * lambda) % (15 * lambda));
                                    if (xw < 0 || xw > barrierX - 4) continue;
                                    ctx.beginPath();
                                    ctx.moveTo(xw, 0);
                                    ctx.lineTo(xw, h);
                                    ctx.stroke();
                                }

                                // Huygens sources in the slit
                                var nSrc = Math.max(3, Math.round(slitWidth * 3));
                                var sources = [];
                                for (var si = 0; si < nSrc; si++) {
                                    var sy = centerY - slitHalfPx + (2 * slitHalfPx) * si / (nSrc - 1);
                                    sources.push({ x: barrierX, y: sy });
                                }

                                // Draw expanding wavelets from each source (right side only)
                                var maxRings = 12;
                                for (var si2 = 0; si2 < sources.length; si2++) {
                                    var src = sources[si2];
                                    for (var ring = 0; ring < maxRings; ring++) {
                                        var r = (t * lambda + ring * lambda) % (maxRings * lambda);
                                        if (r < 1) continue;
                                        var alpha = VizEngine.clamp(0.25 - r / (maxRings * lambda) * 0.25, 0.02, 0.2);
                                        ctx.strokeStyle = 'rgba(0,212,255,' + alpha + ')';
                                        ctx.lineWidth = 1;
                                        ctx.beginPath();
                                        ctx.arc(src.x, src.y, r, -Math.PI / 2, Math.PI / 2);
                                        ctx.stroke();
                                    }
                                }

                                // Intensity pattern on far screen
                                var screenX = w - 30;
                                ctx.strokeStyle = viz.colors.text + '44';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(screenX, 20);
                                ctx.lineTo(screenX, h - 20);
                                ctx.stroke();

                                // Compute approximate intensity at each point on screen
                                var nSample = 200;
                                ctx.beginPath();
                                var started = false;
                                for (var pi = 0; pi < nSample; pi++) {
                                    var py = 20 + (h - 40) * pi / (nSample - 1);
                                    // Sum phasors from all sources
                                    var realPart = 0, imagPart = 0;
                                    var k = 2 * Math.PI / lambda;
                                    for (var sj = 0; sj < sources.length; sj++) {
                                        var dd = Math.sqrt((screenX - sources[sj].x) * (screenX - sources[sj].x) + (py - sources[sj].y) * (py - sources[sj].y));
                                        realPart += Math.cos(k * dd);
                                        imagPart += Math.sin(k * dd);
                                    }
                                    var intensity = (realPart * realPart + imagPart * imagPart) / (sources.length * sources.length);
                                    var barLen = intensity * 60;
                                    var px = screenX + barLen;
                                    if (!started) { ctx.moveTo(px, py); started = true; }
                                    else ctx.lineTo(px, py);

                                    // Glow on screen
                                    if (intensity > 0.05) {
                                        ctx.fillStyle = 'rgba(0,212,255,' + (intensity * 0.4) + ')';
                                        ctx.fillRect(screenX - 2, py - 1, 4, 2);
                                    }
                                }
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.stroke();

                                // Source dots
                                for (var sd = 0; sd < sources.length; sd++) {
                                    ctx.fillStyle = viz.colors.gold;
                                    ctx.beginPath();
                                    ctx.arc(sources[sd].x, sources[sd].y, 2.5, 0, Math.PI * 2);
                                    ctx.fill();
                                }

                                viz.screenText('Slit width = ' + slitWidth.toFixed(1) + '\u03BB', w / 2, 14, viz.colors.white, 12);
                                viz.screenText('Intensity', screenX + 30, 14, viz.colors.orange, 10, 'left');
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Why can you hear someone talking around a corner, but you cannot see them?',
                        hint: 'Compare the wavelength of sound and light to the size of a doorway.',
                        solution: 'Sound has wavelengths on the order of 0.1 to 10 m, comparable to the size of a doorway (~1 m). Diffraction is strong when the opening is comparable to the wavelength, so sound bends readily around corners. Visible light has wavelengths around 400 to 700 nm, millions of times smaller than a doorway, so diffraction is negligible and light travels in straight lines past the door frame.'
                    },
                    {
                        question: 'A harbour entrance is 20 m wide. Ocean waves with \\(\\lambda = 15\\,\\text{m}\\) approach head-on. Will the waves diffract significantly? What about waves with \\(\\lambda = 0.5\\,\\text{m}\\)?',
                        hint: 'Compare the slit width to the wavelength in each case.',
                        solution: 'For \\(\\lambda = 15\\,\\text{m}\\), the ratio is \\(20/15 \\approx 1.3\\); the opening is about one wavelength wide, so diffraction is very strong and waves spread broadly into the harbour. For \\(\\lambda = 0.5\\,\\text{m}\\), the ratio is \\(20/0.5 = 40\\); the opening is many wavelengths wide, so diffraction is negligible and the waves continue mostly straight through.'
                    }
                ]
            }
        ]
    });
})();
