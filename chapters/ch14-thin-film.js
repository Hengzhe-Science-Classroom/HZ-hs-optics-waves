// === Chapter 14: Thin-Film Interference ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch14',
        number: 14,
        title: 'Thin-Film Interference',
        subtitle: 'The physics of soap bubbles, oil slicks, and coated lenses',
        file: 'ch14-thin-film',

        sections: [
            // ============================================================
            // Section 1: Reflection from Thin Films
            // ============================================================
            {
                id: 'reflection-thin-films',
                title: 'Reflection from Thin Films',
                content: `
<h2>Why Soap Bubbles Shimmer with Colour</h2>

<p>When white light hits a thin transparent film (a soap bubble, an oil slick on water, or a coating on a lens), some light reflects off the top surface and some off the bottom surface. These two reflected beams overlap and interfere. Depending on the film thickness and the wavelength, certain colours are enhanced and others are suppressed. The result is a shimmering display of colour.</p>

<div class="env-block definition">
<div class="env-title">Definition: Thin-film interference</div>
<div class="env-body">
<p><strong>Thin-film interference</strong> occurs when light reflects from the two surfaces of a film whose thickness is comparable to the wavelength of light. The two reflected beams have a phase difference determined by (1) the extra path length through the film and (2) any phase changes on reflection.</p>
</div>
</div>

<p>Consider a film of thickness \\(t\\) and refractive index \\(n\\), with light hitting it at near-normal incidence. The beam reflected from the bottom surface travels an extra distance of approximately \\(2t\\) inside the film. Since the wavelength inside the film is \\(\\lambda_n = \\lambda/n\\), the extra optical path is \\(2nt\\). This creates a phase difference between the two reflected beams.</p>

<div class="viz-placeholder" data-viz="viz-thin-film-rays"></div>

<div class="env-block intuition">
<div class="env-title">Thickness matters</div>
<div class="env-body">
<p>If the film is much thicker than the coherence length of the light, the interference washes out and you see no colours. If it is much thinner than a wavelength, the path difference is negligible and you see uniform reflection. The sweet spot is when \\(t\\) is on the order of a few hundred nanometres, comparable to visible wavelengths.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-thin-film-rays',
                        title: 'Thin Film: Ray Paths',
                        description: 'Light reflects from the top and bottom surfaces of a thin film. The two reflected rays interfere. Adjust the film thickness and refractive index to see the path difference change.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var thickness = 200; // nm
                            var nFilm = 1.4;
                            var t = 0;

                            VizEngine.createSlider(controls, 't (nm)', 50, 800, thickness, 10, function (v) { thickness = v; });
                            VizEngine.createSlider(controls, 'n_film', 1.1, 2.5, nFilm, 0.1, function (v) { nFilm = v; });

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

                            function draw() {
                                t += 0.02;
                                viz.clear();

                                // Film region
                                var filmTop = h * 0.35;
                                var filmScale = VizEngine.clamp(thickness / 800, 0.05, 1);
                                var filmH = 40 + filmScale * 100;
                                var filmBot = filmTop + filmH;

                                // Media backgrounds
                                ctx.fillStyle = 'rgba(88,166,255,0.03)';
                                ctx.fillRect(0, 0, w, filmTop);
                                ctx.fillStyle = 'rgba(63,185,80,0.06)';
                                ctx.fillRect(0, filmTop, w, filmH);
                                ctx.fillStyle = 'rgba(88,166,255,0.03)';
                                ctx.fillRect(0, filmBot, w, h - filmBot);

                                // Film boundaries
                                ctx.strokeStyle = viz.colors.white + '66';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(0, filmTop);
                                ctx.lineTo(w, filmTop);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(0, filmBot);
                                ctx.lineTo(w, filmBot);
                                ctx.stroke();

                                // Labels
                                viz.screenText('n\u2081 = 1.00 (air)', 60, filmTop - 20, viz.colors.blue, 11, 'left');
                                viz.screenText('n\u2082 = ' + nFilm.toFixed(1) + ' (film)', 60, filmTop + filmH / 2, viz.colors.green, 11, 'left');
                                viz.screenText('n\u2083 = 1.00 (air)', 60, filmBot + 20, viz.colors.blue, 11, 'left');

                                // Incident ray
                                var incX = w * 0.4;
                                var hitX = w * 0.5;
                                ctx.strokeStyle = viz.colors.gold;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(incX, 20);
                                ctx.lineTo(hitX, filmTop);
                                ctx.stroke();
                                // Arrow
                                var ang = Math.atan2(filmTop - 20, hitX - incX);
                                ctx.fillStyle = viz.colors.gold;
                                ctx.beginPath();
                                ctx.moveTo(hitX, filmTop);
                                ctx.lineTo(hitX - 10 * Math.cos(ang - 0.3), filmTop - 10 * Math.sin(ang - 0.3));
                                ctx.lineTo(hitX - 10 * Math.cos(ang + 0.3), filmTop - 10 * Math.sin(ang + 0.3));
                                ctx.closePath();
                                ctx.fill();

                                // Reflected ray 1 (top surface)
                                var ref1X = w * 0.35;
                                ctx.strokeStyle = viz.colors.cyan;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(hitX, filmTop);
                                ctx.lineTo(ref1X, 20);
                                ctx.stroke();
                                viz.screenText('Ray 1', ref1X - 10, 14, viz.colors.cyan, 10, 'right');

                                // Transmitted into film, reflects off bottom
                                var botHitX = hitX + 15;
                                ctx.strokeStyle = viz.colors.orange + '88';
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([4, 3]);
                                ctx.beginPath();
                                ctx.moveTo(hitX, filmTop);
                                ctx.lineTo(botHitX, filmBot);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Reflected ray 2 (bottom surface, exits top)
                                var ref2ExitX = botHitX + 15;
                                ctx.strokeStyle = viz.colors.orange + '88';
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([4, 3]);
                                ctx.beginPath();
                                ctx.moveTo(botHitX, filmBot);
                                ctx.lineTo(ref2ExitX, filmTop);
                                ctx.stroke();
                                ctx.setLineDash([]);

                                // Ray 2 exits
                                var ref2X = ref2ExitX - 20;
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(ref2ExitX, filmTop);
                                ctx.lineTo(ref2X, 20);
                                ctx.stroke();
                                viz.screenText('Ray 2', ref2X + 15, 14, viz.colors.orange, 10, 'left');

                                // Phase info
                                var opticalPath = 2 * nFilm * thickness;
                                var phaseShift = (opticalPath % 550) / 550;
                                viz.screenText('Optical path diff = 2nt = 2 \u00D7 ' + nFilm.toFixed(1) + ' \u00D7 ' + thickness + ' = ' + opticalPath.toFixed(0) + ' nm', w / 2, filmBot + 50, viz.colors.white, 12);
                                viz.screenText('+ \u03BB/2 phase shift from top reflection (n\u2081 < n\u2082)', w / 2, filmBot + 70, viz.colors.pink, 11);

                                // Reflected colour (constructive condition: 2nt = (m+1/2)lambda)
                                // Show what colour is brightest
                                var barTop2 = filmBot + 90;
                                var barH2 = 25;
                                var barL = 100, barR2 = w - 100;
                                for (var px = barL; px < barR2; px++) {
                                    var lam = 400 + (700 - 400) * (px - barL) / (barR2 - barL);
                                    // Constructive: 2nt + lambda/2 = m*lambda => 2nt = (m - 1/2)*lambda
                                    // Phase: delta = 2pi*2nt/lambda + pi
                                    var delta = 2 * Math.PI * opticalPath / lam + Math.PI;
                                    var intens = Math.pow(Math.cos(delta / 2), 2);
                                    var rgb = wavelengthToRGB(lam);
                                    ctx.fillStyle = 'rgb(' + Math.round(rgb[0] * intens * 255) + ',' + Math.round(rgb[1] * intens * 255) + ',' + Math.round(rgb[2] * intens * 255) + ')';
                                    ctx.fillRect(px, barTop2, 1, barH2);
                                }
                                ctx.strokeStyle = viz.colors.text + '44';
                                ctx.strokeRect(barL, barTop2, barR2 - barL, barH2);
                                viz.screenText('Reflected colour spectrum', w / 2, barTop2 + barH2 + 14, viz.colors.text, 10);
                                viz.screenText('400 nm', barL, barTop2 - 6, viz.colors.text, 9);
                                viz.screenText('700 nm', barR2, barTop2 - 6, viz.colors.text, 9);
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A thin film of oil (\\(n = 1.45\\)) floats on water. At near-normal incidence, the extra optical path for the ray that reflects off the bottom surface is \\(2nt\\). If \\(t = 200\\,\\text{nm}\\), find the optical path difference.',
                        hint: 'Optical path = \\(n \\times\\) geometric path.',
                        solution: 'Optical path difference = \\(2nt = 2 \\times 1.45 \\times 200 = 580\\,\\text{nm}\\). This is about one wavelength of yellow-green light.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Phase Change on Reflection
            // ============================================================
            {
                id: 'phase-change',
                title: 'Phase Change on Reflection',
                content: `
<h2>The Hidden Half-Wavelength Shift</h2>

<p>There is a crucial subtlety that changes everything: when a wave reflects off a medium with a <em>higher</em> refractive index, it undergoes a <strong>phase shift of \\(\\pi\\)</strong> (equivalent to a path shift of \\(\\lambda/2\\)). Reflection off a medium with a <em>lower</em> index produces no phase shift.</p>

<div class="env-block theorem">
<div class="env-title">Phase change on reflection</div>
<div class="env-body">
<ul>
<li>Reflection from a <strong>more dense medium</strong> (\\(n_2 > n_1\\)): phase shift of \\(\\pi\\) (half-wavelength shift).</li>
<li>Reflection from a <strong>less dense medium</strong> (\\(n_2 < n_1\\)): no phase shift.</li>
</ul>
<p>This is analogous to a wave on a string reflecting from a fixed end (inverts) vs a free end (does not invert).</p>
</div>
</div>

<p>For a film in air (\\(n_{\\text{air}} < n_{\\text{film}}\\)), the top reflection (air to film) gets a \\(\\pi\\) shift, but the bottom reflection (film to air) does not. This means the two reflected rays start with a half-wavelength phase difference even before accounting for the path difference.</p>

<div class="env-block example">
<div class="env-title">Example: Counting phase shifts</div>
<div class="env-body">
<p>An oil film (\\(n = 1.45\\)) on water (\\(n = 1.33\\)):</p>
<ul>
<li>Top reflection (air \\(\\to\\) oil): \\(n_{\\text{oil}} > n_{\\text{air}}\\), so \\(\\pi\\) shift.</li>
<li>Bottom reflection (oil \\(\\to\\) water): \\(n_{\\text{water}} < n_{\\text{oil}}\\), so no shift.</li>
</ul>
<p>Net phase difference from reflections: \\(\\pi\\) (one shift minus zero).</p>
<p>A glass film (\\(n = 1.50\\)) on glass (\\(n = 1.50\\)): No reflection at the bottom interface (same medium), so this is not a thin-film problem.</p>
<p>A soap film (\\(n = 1.33\\)) in air:</p>
<ul>
<li>Top: air \\(\\to\\) soap, \\(\\pi\\) shift.</li>
<li>Bottom: soap \\(\\to\\) air, no shift.</li>
</ul>
<p>Net: \\(\\pi\\) shift.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">A common mistake</div>
<div class="env-body">
<p>Students often forget the phase change on reflection and get the conditions for constructive and destructive interference reversed. Always check: does each reflection involve going from low-\\(n\\) to high-\\(n\\) or vice versa?</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'A glass lens (\\(n = 1.52\\)) has a thin coating of MgF\\(_2\\) (\\(n = 1.38\\)). Identify the phase shifts at each interface.',
                        hint: 'Check whether the wave goes from low-\\(n\\) to high-\\(n\\) or vice versa at each surface.',
                        solution: 'Top: air (\\(n=1.00\\)) to MgF\\(_2\\) (\\(n=1.38\\)). Since \\(1.38 > 1.00\\), there is a \\(\\pi\\) phase shift. Bottom: MgF\\(_2\\) (\\(n=1.38\\)) to glass (\\(n=1.52\\)). Since \\(1.52 > 1.38\\), there is also a \\(\\pi\\) phase shift. Net phase difference from reflections: \\(\\pi - \\pi = 0\\). The two phase shifts cancel.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Conditions for Thin-Film Interference
            // ============================================================
            {
                id: 'conditions',
                title: 'Conditions',
                content: `
<h2>Putting It All Together</h2>

<p>The total phase difference between the two reflected rays has two contributions:</p>
<ol>
<li><strong>Path difference:</strong> \\(2nt\\) (the extra optical path through the film and back).</li>
<li><strong>Reflection phase shifts:</strong> \\(0\\) or \\(\\lambda/2\\) at each interface.</li>
</ol>

<div class="env-block theorem">
<div class="env-title">Thin-film interference conditions (at normal incidence)</div>
<div class="env-body">
<p><strong>Case 1:</strong> One phase shift (net \\(\\lambda/2\\) shift, e.g., film in air):</p>
<ul>
<li>Constructive: \\(2nt = \\left(m + \\tfrac{1}{2}\\right)\\lambda\\), \\quad m = 0, 1, 2, \\ldots\\)</li>
<li>Destructive: \\(2nt = m\\lambda\\), \\quad m = 0, 1, 2, \\ldots\\)</li>
</ul>
<p><strong>Case 2:</strong> Zero or two phase shifts (no net shift, e.g., anti-reflection coating on glass):</p>
<ul>
<li>Constructive: \\(2nt = m\\lambda\\), \\quad m = 0, 1, 2, \\ldots\\)</li>
<li>Destructive: \\(2nt = \\left(m + \\tfrac{1}{2}\\right)\\lambda\\), \\quad m = 0, 1, 2, \\ldots\\)</li>
</ul>
</div>
</div>

<p>Notice that the conditions are <em>swapped</em> between the two cases. The half-wavelength shift from reflection flips constructive and destructive. This is why you must always count the phase shifts first.</p>

<div class="env-block example">
<div class="env-title">Example: Thinnest soap film that looks green</div>
<div class="env-body">
<p>A soap film (\\(n = 1.33\\)) in air. For what minimum thickness does it appear bright green (\\(\\lambda = 530\\,\\text{nm}\\))?</p>
<p>One phase shift (air to soap), so constructive condition: \\(2nt = (m + 1/2)\\lambda\\). For the thinnest film, take \\(m = 0\\):</p>
\\[2(1.33)t = \\frac{1}{2}(530) = 265\\,\\text{nm}\\]
\\[t = \\frac{265}{2.66} = 99.6\\,\\text{nm}\\]
<p>A soap film only about 100 nm thick glows green in reflected light.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Why the faintest films look dark</div>
<div class="env-body">
<p>When a soap bubble is so thin that \\(t \\approx 0\\), the path difference \\(2nt \\approx 0\\), and the only phase difference is the \\(\\pi\\) shift from the top reflection. The two reflected waves are exactly out of phase: destructive interference for all wavelengths. The film appears black. You can see this dark region at the top of a vertical soap film just before it pops, where drainage has made it thinnest.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'An oil film (\\(n = 1.45\\)) on water (\\(n = 1.33\\)) appears bright blue (\\(\\lambda = 460\\,\\text{nm}\\)) in reflected light. What is the minimum thickness?',
                        hint: 'First determine the number of phase shifts. Air to oil: \\(\\pi\\). Oil to water: \\(n_{\\text{water}} < n_{\\text{oil}}\\), so no shift. One net shift, so constructive: \\(2nt = (m + 1/2)\\lambda\\).',
                        solution: 'One phase shift (top reflection only). Constructive: \\(2(1.45)t = (0 + 1/2)(460)\\). So \\(2.90\\,t = 230\\), giving \\(t = 79.3\\,\\text{nm}\\).'
                    },
                    {
                        question: 'For the same oil film, at what minimum thickness would blue light (\\(\\lambda = 460\\,\\text{nm}\\)) be suppressed (destructive interference)?',
                        hint: 'With one net phase shift, destructive: \\(2nt = m\\lambda\\). The thinnest non-zero case is \\(m = 1\\).',
                        solution: 'Destructive: \\(2(1.45)t = 1 \\times 460\\). So \\(2.90\\,t = 460\\), giving \\(t = 158.6\\,\\text{nm}\\).'
                    }
                ]
            },

            // ============================================================
            // Section 4: Soap Bubbles
            // ============================================================
            {
                id: 'soap-bubbles',
                title: 'Soap Bubbles',
                content: `
<h2>Nature's Most Colourful Thin Films</h2>

<p>A soap bubble is a thin film of soapy water (\\(n \\approx 1.33\\)) surrounded by air on both sides. Its thickness varies from top to bottom due to gravity (the soap drains downward), so different parts of the bubble satisfy the constructive condition for different wavelengths. The result is the swirling, ever-changing rainbow patterns you see on bubbles.</p>

<div class="viz-placeholder" data-viz="viz-soap-bubble"></div>

<div class="env-block intuition">
<div class="env-title">Why the colours swirl</div>
<div class="env-body">
<p>The thickness of a soap film changes continuously due to gravity and air currents. As the film thins, the constructive wavelength shifts, cycling through the visible spectrum. Near the top (thinnest), you often see dark (destructive for all colours when \\(t \\to 0\\)). Below that: blue, green, yellow, red bands as thickness increases. If the film gets thick enough, higher orders overlap, and the colours become pastel and eventually white.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Newton's rings</div>
<div class="env-body">
<p>A related phenomenon: place a curved lens on a flat glass plate. The air gap between them forms a thin film that varies in thickness radially. In reflected light, you see concentric rings of colour (or bright/dark with monochromatic light). Ironically, Newton observed and catalogued these rings in detail, yet insisted light was made of particles. The correct wave explanation came from Young and Fresnel.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-soap-bubble',
                        title: 'Soap Bubble Colours',
                        description: 'A cross-section of a soap film with varying thickness (thin at top, thick at bottom). The reflected colour at each height is computed from thin-film interference. Watch how the colour bands shift as the film thins over time.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var baseThickness = 300; // nm at bottom
                            var drainRate = 0.3;
                            var tDrain = 0;

                            VizEngine.createSlider(controls, 'Max t (nm)', 100, 1200, baseThickness, 10, function (v) { baseThickness = v; });
                            VizEngine.createSlider(controls, 'Drain speed', 0, 1, drainRate, 0.1, function (v) { drainRate = v; });
                            VizEngine.createButton(controls, 'Reset', function () { tDrain = 0; });

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

                            function draw() {
                                tDrain += drainRate * 0.015;
                                viz.clear();

                                var nFilm = 1.33;
                                var filmL = 60, filmR = w * 0.45;
                                var filmT = 40, filmB = h - 40;
                                var filmHPx = filmB - filmT;
                                var filmW = filmR - filmL;

                                // Draw the film as a vertical strip with colour
                                for (var py = filmT; py < filmB; py++) {
                                    var frac = (py - filmT) / filmHPx; // 0 at top, 1 at bottom
                                    var thickNm = VizEngine.clamp((frac * frac) * baseThickness * Math.exp(-tDrain * 0.5), 0, 2000);

                                    // Compute reflected colour: sum over visible wavelengths
                                    var rr = 0, gg = 0, bb = 0;
                                    for (var lam = 400; lam <= 700; lam += 10) {
                                        var delta = 2 * Math.PI * 2 * nFilm * thickNm / lam + Math.PI;
                                        var reflectivity = Math.pow(Math.sin(delta / 2), 2) * 0.15;
                                        var col = wavelengthToRGB(lam);
                                        rr += col[0] * reflectivity;
                                        gg += col[1] * reflectivity;
                                        bb += col[2] * reflectivity;
                                    }
                                    var sc = 255 / (31 * 0.15) * 8;
                                    rr = VizEngine.clamp(Math.round(rr * sc), 0, 255);
                                    gg = VizEngine.clamp(Math.round(gg * sc), 0, 255);
                                    bb = VizEngine.clamp(Math.round(bb * sc), 0, 255);

                                    ctx.fillStyle = 'rgb(' + rr + ',' + gg + ',' + bb + ')';
                                    ctx.fillRect(filmL, py, filmW, 1);
                                }

                                // Film border
                                ctx.strokeStyle = viz.colors.text + '44';
                                ctx.lineWidth = 1;
                                ctx.strokeRect(filmL, filmT, filmW, filmHPx);

                                // Thickness profile on right
                                var profL = w * 0.55, profR = w - 40;
                                var profW = profR - profL;

                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(profL, filmT);
                                ctx.lineTo(profL, filmB);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(profL, filmB);
                                ctx.lineTo(profR, filmB);
                                ctx.stroke();

                                viz.screenText('t (nm)', (profL + profR) / 2, filmB + 16, viz.colors.text, 10);
                                viz.screenText('Height', profL - 16, (filmT + filmB) / 2, viz.colors.text, 10);

                                // Thickness curve
                                ctx.beginPath();
                                for (var pi = 0; pi <= filmHPx; pi++) {
                                    var fr = pi / filmHPx;
                                    var th = (fr * fr) * baseThickness * Math.exp(-tDrain * 0.5);
                                    var px = profL + (th / 1200) * profW;
                                    var ppy = filmT + pi;
                                    if (pi === 0) ctx.moveTo(px, ppy);
                                    else ctx.lineTo(px, ppy);
                                }
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.stroke();

                                // Labels
                                viz.screenText('Soap Film', (filmL + filmR) / 2, filmT - 14, viz.colors.white, 12);
                                viz.screenText('thin (top)', filmL - 4, filmT + 20, viz.colors.text, 9, 'right');
                                viz.screenText('thick (bottom)', filmL - 4, filmB - 20, viz.colors.text, 9, 'right');
                                viz.screenText('Thickness Profile', (profL + profR) / 2, filmT - 14, viz.colors.orange, 11);
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'A soap film (\\(n = 1.33\\)) is held vertically and illuminated with white light. Explain why you see horizontal colour bands, and why the top is dark.',
                        hint: 'Gravity causes the film to be thinner at the top and thicker at the bottom.',
                        solution: 'Gravity drains the soap solution downward, making the film thinner at the top and thicker at the bottom. Each horizontal band corresponds to a thickness where the constructive condition is met for a particular colour. At the very top, \\(t \\approx 0\\), and the half-wavelength phase shift from the top reflection causes destructive interference for all colours: the film appears dark (black).'
                    }
                ]
            },

            // ============================================================
            // Section 5: Anti-Reflection Coatings
            // ============================================================
            {
                id: 'anti-reflection',
                title: 'Anti-Reflection Coatings',
                content: `
<h2>Engineering Destructive Interference</h2>

<p>Camera lenses, eyeglasses, and solar cells all benefit from <strong>anti-reflection (AR) coatings</strong>: thin films designed so that the reflected waves interfere destructively, reducing reflection and increasing transmission.</p>

<div class="env-block theorem">
<div class="env-title">Single-layer anti-reflection coating</div>
<div class="env-body">
<p>For a coating of refractive index \\(n_c\\) on a substrate of index \\(n_s\\), with \\(n_c\\) between 1 and \\(n_s\\):</p>
<ul>
<li>Both reflections have a \\(\\pi\\) phase shift (air \\(\\to\\) coating and coating \\(\\to\\) substrate, both going from lower to higher \\(n\\)). Net phase shift from reflections: 0.</li>
<li>Destructive condition: \\(2n_c t = (m + 1/2)\\lambda\\).</li>
<li>Minimum thickness: \\(t = \\lambda / (4n_c)\\) (a "quarter-wave" coating).</li>
</ul>
<p>For maximum cancellation, the reflected amplitudes should be equal, which requires \\(n_c = \\sqrt{n_s}\\).</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: MgF\\(_2\\) on glass</div>
<div class="env-body">
<p>Glass has \\(n_s = 1.52\\). The ideal coating index is \\(\\sqrt{1.52} = 1.23\\). MgF\\(_2\\) has \\(n_c = 1.38\\), which is not perfect but close. For \\(\\lambda = 550\\,\\text{nm}\\) (green, middle of visible spectrum):</p>
\\[t = \\frac{\\lambda}{4n_c} = \\frac{550}{4 \\times 1.38} = 99.6\\,\\text{nm}\\]
<p>This AR coating minimizes reflection at 550 nm. At other wavelengths (red, blue), the cancellation is imperfect, which is why coated lenses often have a faint purple or green tint: those are the colours that are <em>not</em> fully cancelled.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-ar-coating"></div>

<div class="env-block remark">
<div class="env-title">Multi-layer coatings</div>
<div class="env-body">
<p>Modern optical elements use multiple thin-film layers (sometimes dozens) to achieve low reflection across a broad wavelength range. Each layer is tuned to a different wavelength, and the combined interference from all layers suppresses reflection over the entire visible spectrum. This is why high-quality camera lenses appear nearly transparent, with only a very faint colour tint.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-ar-coating',
                        title: 'Anti-Reflection Coating',
                        description: 'A quarter-wave coating on glass. Adjust the coating thickness to see how the reflected intensity changes across the visible spectrum. At the design wavelength, reflection drops to near zero.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var nc = 1.38;
                            var ns = 1.52;
                            var designLam = 550;
                            var thickness = designLam / (4 * nc);

                            VizEngine.createSlider(controls, 'Design \u03BB (nm)', 400, 700, designLam, 10, function (v) {
                                designLam = v;
                                thickness = designLam / (4 * nc);
                            });
                            VizEngine.createSlider(controls, 'n_coating', 1.1, 2.0, nc, 0.05, function (v) {
                                nc = v;
                                thickness = designLam / (4 * nc);
                            });

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

                            function draw() {
                                viz.clear();
                                thickness = designLam / (4 * nc);

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

                                viz.screenText('\u03BB (nm)', (gLeft + gRight) / 2, gBot + 18, viz.colors.text, 11);
                                viz.screenText('Reflectance', gLeft - 10, gTop - 10, viz.colors.text, 10, 'right');

                                // Tick marks
                                ctx.fillStyle = viz.colors.text;
                                ctx.font = '10px -apple-system,sans-serif';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'top';
                                for (var tick = 400; tick <= 700; tick += 50) {
                                    var tx = gLeft + (tick - 400) / 300 * gW;
                                    ctx.fillText(tick, tx, gBot + 3);
                                    ctx.strokeStyle = viz.colors.grid;
                                    ctx.lineWidth = 0.5;
                                    ctx.beginPath();
                                    ctx.moveTo(tx, gTop);
                                    ctx.lineTo(tx, gBot);
                                    ctx.stroke();
                                }

                                // Reflectance of uncoated glass
                                var r_uncoated = Math.pow((ns - 1) / (ns + 1), 2);

                                // Uncoated line
                                ctx.strokeStyle = viz.colors.red + '66';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4, 3]);
                                var uY = gBot - (r_uncoated / 0.10) * gH;
                                ctx.beginPath();
                                ctx.moveTo(gLeft, uY);
                                ctx.lineTo(gRight, uY);
                                ctx.stroke();
                                ctx.setLineDash([]);
                                viz.screenText('Uncoated: ' + (r_uncoated * 100).toFixed(1) + '%', gRight, uY - 8, viz.colors.red, 9, 'right');

                                // Coated reflectance curve
                                // R = ((r1 + r2*exp(i*delta)) / (1 + r1*r2*exp(i*delta)))^2
                                // Simplified for near-normal: R approx (r1^2 + r2^2 + 2*r1*r2*cos(delta)) / (1 + ...)
                                // Simple model: two-beam, R ~ r1^2 + r2^2 + 2*r1*r2*cos(delta)
                                var r1 = (nc - 1) / (nc + 1);
                                var r2 = (ns - nc) / (ns + nc);

                                ctx.beginPath();
                                var nSteps = 300;
                                for (var i = 0; i <= nSteps; i++) {
                                    var lam = 400 + 300 * i / nSteps;
                                    var delta = 2 * Math.PI * 2 * nc * thickness / lam;
                                    var R = r1 * r1 + r2 * r2 + 2 * r1 * r2 * Math.cos(delta);
                                    R = VizEngine.clamp(R, 0, 0.10);
                                    var px = gLeft + (lam - 400) / 300 * gW;
                                    var py = gBot - (R / 0.10) * gH;
                                    if (i === 0) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.strokeStyle = viz.colors.cyan;
                                ctx.lineWidth = 2.5;
                                ctx.shadowColor = viz.colors.cyan;
                                ctx.shadowBlur = 6;
                                ctx.stroke();
                                ctx.shadowBlur = 0;

                                // Mark design wavelength
                                var dX = gLeft + (designLam - 400) / 300 * gW;
                                ctx.strokeStyle = viz.colors.gold + '66';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([3, 3]);
                                ctx.beginPath();
                                ctx.moveTo(dX, gTop);
                                ctx.lineTo(dX, gBot);
                                ctx.stroke();
                                ctx.setLineDash([]);
                                viz.screenText('Design \u03BB', dX, gTop - 6, viz.colors.gold, 9);

                                // Colour bar showing reflected colour
                                var barTop2 = h * 0.62, barH2 = 25;
                                for (var px2 = gLeft; px2 < gRight; px2++) {
                                    var lam2 = 400 + 300 * (px2 - gLeft) / gW;
                                    var delta2 = 2 * Math.PI * 2 * nc * thickness / lam2;
                                    var R2 = VizEngine.clamp(r1 * r1 + r2 * r2 + 2 * r1 * r2 * Math.cos(delta2), 0, 1);
                                    var rgb = wavelengthToRGB(lam2);
                                    ctx.fillStyle = 'rgb(' + Math.round(rgb[0] * R2 * 2000) + ',' + Math.round(rgb[1] * R2 * 2000) + ',' + Math.round(rgb[2] * R2 * 2000) + ')';
                                    ctx.fillRect(px2, barTop2, 1, barH2);
                                }
                                ctx.strokeStyle = viz.colors.text + '44';
                                ctx.strokeRect(gLeft, barTop2, gW, barH2);
                                viz.screenText('Reflected colour (exaggerated)', w / 2, barTop2 + barH2 + 12, viz.colors.text, 10);

                                // Info
                                viz.screenText('Quarter-wave: t = \u03BB/(4n) = ' + thickness.toFixed(1) + ' nm', w / 2, h - 20, viz.colors.white, 12);
                                viz.screenText('n_c = ' + nc.toFixed(2) + ', n_s = ' + ns.toFixed(2) + ', ideal n_c = ' + Math.sqrt(ns).toFixed(2), w / 2, h - 6, viz.colors.text, 10);
                            }
                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Design a quarter-wave anti-reflection coating for a lens with \\(n_s = 1.80\\) (high-index glass) at \\(\\lambda = 550\\,\\text{nm}\\). What should \\(n_c\\) and \\(t\\) be?',
                        hint: 'The ideal coating index is \\(n_c = \\sqrt{n_s}\\), and the thickness is \\(\\lambda / (4n_c)\\).',
                        solution: '\\(n_c = \\sqrt{1.80} = 1.342\\). Thickness: \\(t = 550 / (4 \\times 1.342) = 102.4\\,\\text{nm}\\). In practice, you might use a material with \\(n\\) close to 1.34, such as a silicon dioxide or fluoride compound.'
                    },
                    {
                        question: 'A coated lens has a purple tint. What does this tell you about the design wavelength of the coating?',
                        hint: 'The coating suppresses reflection most at its design wavelength. The colours you see reflected are those <em>not</em> suppressed.',
                        solution: 'Purple is a mix of red and blue. If those are the colours reflected, the coating is most effective at suppressing green (the middle of the spectrum). So the design wavelength is around 520 to 560 nm (green). This is the standard choice, since green is where the eye is most sensitive.'
                    }
                ]
            }
        ]
    });
})();
