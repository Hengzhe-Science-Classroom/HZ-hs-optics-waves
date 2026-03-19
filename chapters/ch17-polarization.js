// === Chapter 17: Polarization ===
(function () {
    window.CHAPTERS = window.CHAPTERS || [];

    window.CHAPTERS.push({
        id: 'ch17',
        number: 17,
        title: 'Polarization',
        subtitle: 'The direction of the electric field matters',
        file: 'ch17-polarization',

        sections: [
            // ============================================================
            // Section 1: Unpolarized vs Polarized Light
            // ============================================================
            {
                id: 'unpolarized-vs-polarized',
                title: 'Unpolarized vs Polarized',
                content: `
<h2>Light Has a Direction of Vibration</h2>

<p>We know from Maxwell's equations that light is a transverse electromagnetic wave: the electric field \\(\\mathbf{E}\\) oscillates perpendicular to the direction of propagation. But <em>which</em> perpendicular direction?</p>

<p>A single source atom emits a short burst of light with a definite E-field direction. But a lightbulb or the sun contains billions of atoms emitting independently, each with a random orientation. The result is <strong>unpolarized light</strong>: the E-field direction jumps randomly on timescales of about \\(10^{-8}\\) s, far too fast for any detector to follow.</p>

<div class="env-block definition">
<div class="env-title">Polarization</div>
<div class="env-body">
<ul>
    <li><strong>Unpolarized light:</strong> The electric field vibrates in all directions perpendicular to propagation, changing randomly over time.</li>
    <li><strong>Linearly polarized light:</strong> The electric field oscillates along a single fixed direction (the <em>polarization axis</em>).</li>
    <li><strong>Partially polarized:</strong> A mixture; one direction is preferred but not exclusive.</li>
</ul>
</div>
</div>

<p>We often represent unpolarized light by drawing E-field arrows pointing in many directions in the plane perpendicular to the ray. Polarized light shows all arrows along one axis.</p>

<div class="env-block intuition">
<div class="env-title">Rope analogy</div>
<div class="env-body">
<p>Shake a rope randomly in all transverse directions: that is unpolarized. Shake it only up and down: that is vertically polarized. Thread it through a vertical slit in a fence: only the vertical component passes. The slit is a polarizer.</p>
</div>
</div>

<div class="viz-placeholder" data-viz="viz-efield-polarization"></div>

<div class="env-block remark">
<div class="env-title">Only transverse waves can be polarized</div>
<div class="env-body">
<p>Sound waves are longitudinal: the oscillation is along the propagation direction, so there is no transverse degree of freedom to select. Polarization is a phenomenon unique to transverse waves. The fact that light can be polarized was historically one of the strongest pieces of evidence that light is a transverse wave.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-efield-polarization',
                        title: 'E-Field Polarization States',
                        description: 'Watch the electric field vector of a light wave as it propagates toward you (looking along the beam axis). Toggle between unpolarized, linearly polarized, and circularly polarized states.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var mode = 0; // 0=unpolarized, 1=linear, 2=circular
                            var t = 0;
                            var polAngle = 0; // for linear
                            var randomAngle = 0;
                            var nextSwitch = 0;
                            var trailX = [], trailY = [];
                            var maxTrail = 200;

                            VizEngine.createButton(controls, 'Unpolarized', function () { mode = 0; trailX = []; trailY = []; });
                            VizEngine.createButton(controls, 'Linear', function () { mode = 1; trailX = []; trailY = []; });
                            VizEngine.createButton(controls, 'Circular', function () { mode = 2; trailX = []; trailY = []; });
                            VizEngine.createSlider(controls, 'Linear angle (\u00B0)', 0, 180, 0, 5, function (v) {
                                polAngle = v * Math.PI / 180;
                            });

                            function draw() {
                                t += 1 / 60;
                                viz.clear();

                                var cx = w * 0.5, cy = h * 0.5;
                                var amp = Math.min(w, h) * 0.28;

                                // Draw reference circle
                                ctx.strokeStyle = viz.colors.grid;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.arc(cx, cy, amp, 0, Math.PI * 2);
                                ctx.stroke();

                                // Cross hairs
                                ctx.strokeStyle = viz.colors.axis + '55';
                                ctx.lineWidth = 0.5;
                                ctx.beginPath(); ctx.moveTo(cx - amp - 10, cy); ctx.lineTo(cx + amp + 10, cy); ctx.stroke();
                                ctx.beginPath(); ctx.moveTo(cx, cy - amp - 10); ctx.lineTo(cx, cy + amp + 10); ctx.stroke();

                                var ex = 0, ey = 0;
                                var omega = 2.5;

                                if (mode === 0) {
                                    // Unpolarized: random angle changes
                                    if (t > nextSwitch) {
                                        randomAngle = Math.random() * Math.PI * 2;
                                        nextSwitch = t + 0.05 + Math.random() * 0.1;
                                    }
                                    ex = Math.cos(randomAngle) * Math.sin(omega * t * 6);
                                    ey = Math.sin(randomAngle) * Math.sin(omega * t * 6);
                                } else if (mode === 1) {
                                    // Linear
                                    var val = Math.sin(omega * t * 4);
                                    ex = Math.cos(polAngle) * val;
                                    ey = Math.sin(polAngle) * val;
                                } else {
                                    // Circular
                                    ex = Math.cos(omega * t * 3);
                                    ey = Math.sin(omega * t * 3);
                                }

                                // Trail
                                trailX.push(cx + ex * amp);
                                trailY.push(cy - ey * amp);
                                if (trailX.length > maxTrail) { trailX.shift(); trailY.shift(); }

                                // Draw trail
                                for (var i = 1; i < trailX.length; i++) {
                                    var alpha = i / trailX.length * 0.4;
                                    ctx.strokeStyle = 'rgba(255,200,100,' + alpha + ')';
                                    ctx.lineWidth = 1.5;
                                    ctx.beginPath();
                                    ctx.moveTo(trailX[i - 1], trailY[i - 1]);
                                    ctx.lineTo(trailX[i], trailY[i]);
                                    ctx.stroke();
                                }

                                // Draw E vector
                                var tipX = cx + ex * amp;
                                var tipY = cy - ey * amp;
                                ctx.save();
                                ctx.shadowColor = viz.colors.orange;
                                ctx.shadowBlur = 12;
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(cx, cy);
                                ctx.lineTo(tipX, tipY);
                                ctx.stroke();
                                // Arrowhead
                                var vLen = Math.sqrt(ex * ex + ey * ey) * amp;
                                if (vLen > 5) {
                                    var ang = Math.atan2(cy - tipY, tipX - cx);
                                    ctx.fillStyle = viz.colors.orange;
                                    ctx.beginPath();
                                    ctx.moveTo(tipX, tipY);
                                    ctx.lineTo(tipX - 10 * Math.cos(ang - 0.35), tipY + 10 * Math.sin(ang - 0.35));
                                    ctx.lineTo(tipX - 10 * Math.cos(ang + 0.35), tipY + 10 * Math.sin(ang + 0.35));
                                    ctx.closePath();
                                    ctx.fill();
                                }
                                ctx.restore();

                                // Dot at center
                                ctx.fillStyle = viz.colors.white;
                                ctx.beginPath();
                                ctx.arc(cx, cy, 3, 0, Math.PI * 2);
                                ctx.fill();

                                // Labels
                                var labels = ['Unpolarized', 'Linearly Polarized', 'Circularly Polarized'];
                                viz.screenText(labels[mode], w / 2, 20, viz.colors.gold, 14);
                                viz.screenText('Looking along the beam (wave comes toward you)', w / 2, h - 15, viz.colors.text, 10);
                                viz.screenText('E', tipX + 8, tipY - 8, viz.colors.orange, 12);
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Why can sound waves not be polarized?',
                        hint: 'Think about whether sound is transverse or longitudinal.',
                        solution: 'Sound is a longitudinal wave: the air molecules oscillate parallel to the direction of propagation. There is only one possible oscillation direction (along the wave), so there is no transverse degree of freedom to select. Polarization requires at least two independent transverse oscillation directions, which only transverse waves have.'
                    }
                ]
            },

            // ============================================================
            // Section 2: Polarization by Filters
            // ============================================================
            {
                id: 'polarization-filters',
                title: 'Polarization by Filters',
                content: `
<h2>Polaroid Filters</h2>

<p>A <strong>polarizing filter</strong> (or polarizer) transmits only the component of the E-field along its <em>transmission axis</em> and absorbs the perpendicular component. When unpolarized light enters a polarizer, only half the intensity gets through, and the transmitted light is linearly polarized along the filter's axis.</p>

<div class="env-block definition">
<div class="env-title">Polarizer action on unpolarized light</div>
<div class="env-body">
<p>If unpolarized light of intensity \\(I_0\\) passes through an ideal polarizer, the transmitted intensity is:</p>
\\[I = \\frac{I_0}{2}\\]
<p>The transmitted light is linearly polarized along the polarizer's transmission axis.</p>
</div>
</div>

<p>The factor of \\(1/2\\) comes from averaging \\(\\cos^2\\theta\\) over all random angles \\(\\theta\\) of the incoming E-field: \\(\\langle \\cos^2\\theta \\rangle = 1/2\\).</p>

<h3>How Polaroid Filters Work</h3>

<p>Edwin Land invented the Polaroid filter in 1932 as a Harvard undergraduate. The key is long, aligned polymer chains doped with iodine. These conducting chains absorb the E-field component parallel to them (it drives currents that dissipate as heat) and transmit the perpendicular component. The transmission axis is perpendicular to the chain direction.</p>

<div class="env-block example">
<div class="env-title">Example: Two crossed polarizers</div>
<div class="env-body">
<p>Place two polarizers with perpendicular transmission axes (crossed polarizers). Light passes through the first: intensity drops to \\(I_0/2\\), and it is now polarized along axis 1. At the second polarizer, the E-field is entirely perpendicular to axis 2, so \\(\\cos^2 90^\\circ = 0\\) and <strong>no light gets through</strong>. The crossed pair is opaque.</p>
</div>
</div>

<div class="env-block intuition">
<div class="env-title">The 45-degree trick</div>
<div class="env-body">
<p>Now insert a third polarizer at 45\\(^\\circ\\) <em>between</em> the two crossed ones. Surprisingly, light now passes through all three! The 45\\(^\\circ\\) filter converts the polarization direction, giving the third filter a nonzero component to transmit. Adding a filter <em>increases</em> transmission. This is deeply unintuitive and a favorite demonstration in physics classes.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Natural polarizers</div>
<div class="env-body">
<p>Certain crystals (tourmaline, calcite) are natural polarizers. Calcite produces two polarized beams (double refraction, or birefringence), which was observed as early as 1669 by Bartholin. This was one of the first clues that light has a directional property beyond color and intensity.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Unpolarized light of intensity \\(I_0\\) passes through three polarizers: the first at 0\\(^\\circ\\), the second at 45\\(^\\circ\\), the third at 90\\(^\\circ\\). What fraction of \\(I_0\\) emerges?',
                        hint: 'Apply \\(I_0/2\\) for the first polarizer, then Malus\'s law twice.',
                        solution: 'After polarizer 1: \\(I_1 = I_0/2\\) (polarized at 0\\(^\\circ\\)). After polarizer 2 (at 45\\(^\\circ\\) to polarizer 1): \\(I_2 = I_1 \\cos^2 45^\\circ = (I_0/2)(1/2) = I_0/4\\). After polarizer 3 (at 45\\(^\\circ\\) to polarizer 2): \\(I_3 = I_2 \\cos^2 45^\\circ = (I_0/4)(1/2) = I_0/8\\). So \\(1/8\\) of the original intensity emerges.'
                    }
                ]
            },

            // ============================================================
            // Section 3: Malus's Law
            // ============================================================
            {
                id: 'malus-law',
                title: "Malus's Law",
                content: `
<h2>The Cosine-Squared Law</h2>

<p>When linearly polarized light of intensity \\(I_0\\) hits a second polarizer (called the <strong>analyzer</strong>) whose transmission axis makes angle \\(\\theta\\) with the polarization direction, the transmitted intensity follows:</p>

<div class="env-block theorem">
<div class="env-title">Malus's law (1809)</div>
<div class="env-body">
\\[I = I_0 \\cos^2\\theta\\]
<p>where \\(\\theta\\) is the angle between the incoming polarization direction and the analyzer's transmission axis.</p>
</div>
</div>

<p>The reasoning is straightforward. If the incoming E-field has amplitude \\(E_0\\) along direction \\(\\hat{p}\\), only the component along the analyzer's axis passes through: \\(E_{\\text{trans}} = E_0 \\cos\\theta\\). Since intensity is proportional to \\(E^2\\):</p>

\\[I \\propto E_{\\text{trans}}^2 = E_0^2 \\cos^2\\theta = I_0 \\cos^2\\theta\\]

<div class="viz-placeholder" data-viz="viz-malus-law"></div>

<h3>Key Cases</h3>

<table style="width:100%;border-collapse:collapse;margin:0.5em 0;font-size:0.9em;">
<tr style="border-bottom:1px solid #333;">
    <th style="text-align:left;padding:4px;color:#8b949e;">Angle \\(\\theta\\)</th>
    <th style="text-align:left;padding:4px;color:#8b949e;">\\(\\cos^2\\theta\\)</th>
    <th style="text-align:left;padding:4px;color:#8b949e;">Result</th>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
    <td style="padding:4px;">0\\(^\\circ\\)</td>
    <td style="padding:4px;">1</td>
    <td style="padding:4px;">Full transmission</td>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
    <td style="padding:4px;">30\\(^\\circ\\)</td>
    <td style="padding:4px;">0.75</td>
    <td style="padding:4px;">75% transmission</td>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
    <td style="padding:4px;">45\\(^\\circ\\)</td>
    <td style="padding:4px;">0.50</td>
    <td style="padding:4px;">50% transmission</td>
</tr>
<tr style="border-bottom:1px solid #1a1a40;">
    <td style="padding:4px;">60\\(^\\circ\\)</td>
    <td style="padding:4px;">0.25</td>
    <td style="padding:4px;">25% transmission</td>
</tr>
<tr>
    <td style="padding:4px;">90\\(^\\circ\\)</td>
    <td style="padding:4px;">0</td>
    <td style="padding:4px;">Complete extinction</td>
</tr>
</table>

<div class="env-block example">
<div class="env-title">Example: Sunglasses</div>
<div class="env-body">
<p>Polarized sunglasses have vertical transmission axes to block horizontally polarized glare from flat surfaces (roads, water). If glare is fully horizontally polarized, the sunglasses transmit \\(I_0 \\cos^2 90^\\circ = 0\\). In practice, glare is only partially polarized, so the sunglasses reduce it significantly without eliminating it completely.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">Malus's law requires polarized input</div>
<div class="env-body">
<p>Malus's law applies only when the incoming light is already linearly polarized. For unpolarized light hitting a polarizer, the transmitted intensity is \\(I_0/2\\), not \\(I_0 \\cos^2\\theta\\) (there is no single \\(\\theta\\) to use). First polarize, then apply Malus's law to the analyzer.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-malus-law',
                        title: "Malus's Law: Polarizer and Analyzer",
                        description: 'Polarized light passes through an analyzer at angle theta. Adjust the angle and watch the transmitted intensity follow cos^2(theta). The brightness of the output beam and the graph on the right both reflect the law in real time.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var theta = 0; // analyzer angle in radians
                            var t = 0;
                            var animateWave = true;

                            VizEngine.createSlider(controls, 'Analyzer angle \u03B8 (\u00B0)', 0, 360, 0, 1, function (v) {
                                theta = v * Math.PI / 180;
                            });
                            VizEngine.createButton(controls, 'Animate wave', function () {
                                animateWave = !animateWave;
                            });

                            function draw() {
                                t += 1 / 60;
                                viz.clear();

                                var leftX = w * 0.05;
                                var polX = w * 0.22;
                                var anaX = w * 0.44;
                                var rightX = w * 0.56;
                                var beamY = h * 0.5;
                                var beamH = h * 0.16;

                                // Incoming beam (unpolarized -> polarizer -> polarized)
                                // Show as bright beam
                                var grad1 = ctx.createLinearGradient(leftX, beamY - beamH, leftX, beamY + beamH);
                                grad1.addColorStop(0, 'rgba(255,200,80,0)');
                                grad1.addColorStop(0.5, 'rgba(255,200,80,0.3)');
                                grad1.addColorStop(1, 'rgba(255,200,80,0)');
                                ctx.fillStyle = grad1;
                                ctx.fillRect(leftX, beamY - beamH, polX - leftX, beamH * 2);

                                // Polarizer
                                ctx.fillStyle = viz.colors.blue + '44';
                                ctx.fillRect(polX - 4, beamY - beamH * 1.6, 8, beamH * 3.2);
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(polX - 4, beamY - beamH * 1.6, 8, beamH * 3.2);
                                // Transmission axis (vertical)
                                ctx.strokeStyle = viz.colors.blue;
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([4, 3]);
                                ctx.beginPath();
                                ctx.moveTo(polX, beamY - beamH * 1.4);
                                ctx.lineTo(polX, beamY + beamH * 1.4);
                                ctx.stroke();
                                ctx.setLineDash([]);
                                viz.screenText('Polarizer', polX, beamY - beamH * 1.8, viz.colors.blue, 10);
                                viz.screenText('axis: vertical', polX, beamY + beamH * 1.8 + 12, viz.colors.blue, 9);

                                // Polarized beam between polarizer and analyzer
                                var cos2 = Math.cos(theta) * Math.cos(theta);
                                var transI = cos2;

                                // Show vertical E-field oscillation
                                var nWaves = 6;
                                var segLen = anaX - polX;
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                var wavePhase = animateWave ? t * 4 : 0;
                                for (var i = 0; i <= 200; i++) {
                                    var frac = i / 200;
                                    var px = polX + frac * segLen;
                                    var val = Math.sin(2 * Math.PI * nWaves * frac - wavePhase);
                                    var py = beamY - val * beamH * 0.7;
                                    if (i === 0) ctx.moveTo(px, py);
                                    else ctx.lineTo(px, py);
                                }
                                ctx.stroke();

                                // Analyzer
                                ctx.save();
                                ctx.translate(anaX, beamY);
                                ctx.fillStyle = viz.colors.purple + '44';
                                ctx.fillRect(-4, -beamH * 1.6, 8, beamH * 3.2);
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.lineWidth = 2;
                                ctx.strokeRect(-4, -beamH * 1.6, 8, beamH * 3.2);
                                // Transmission axis (rotated)
                                ctx.strokeStyle = viz.colors.purple;
                                ctx.lineWidth = 1.5;
                                ctx.setLineDash([4, 3]);
                                ctx.beginPath();
                                ctx.moveTo(-beamH * 1.4 * Math.sin(theta), -beamH * 1.4 * Math.cos(theta));
                                ctx.lineTo(beamH * 1.4 * Math.sin(theta), beamH * 1.4 * Math.cos(theta));
                                ctx.stroke();
                                ctx.setLineDash([]);
                                ctx.restore();

                                viz.screenText('Analyzer', anaX, beamY - beamH * 1.8, viz.colors.purple, 10);
                                var thetaDeg = Math.round(theta * 180 / Math.PI) % 360;
                                viz.screenText('\u03B8 = ' + thetaDeg + '\u00B0', anaX, beamY + beamH * 1.8 + 12, viz.colors.purple, 9);

                                // Transmitted beam (brightness = cos^2 theta)
                                if (transI > 0.001) {
                                    var grad2 = ctx.createLinearGradient(anaX, beamY - beamH, anaX, beamY + beamH);
                                    var a2 = (transI * 0.6).toFixed(3);
                                    grad2.addColorStop(0, 'rgba(255,200,80,0)');
                                    grad2.addColorStop(0.5, 'rgba(255,200,80,' + a2 + ')');
                                    grad2.addColorStop(1, 'rgba(255,200,80,0)');
                                    ctx.fillStyle = grad2;
                                    ctx.fillRect(anaX, beamY - beamH * transI, rightX - anaX, beamH * 2 * transI);

                                    // Transmitted wave (along analyzer axis projection)
                                    var projAmp = Math.cos(theta) * beamH * 0.7;
                                    if (Math.abs(projAmp) > 1) {
                                        ctx.strokeStyle = viz.colors.gold;
                                        ctx.lineWidth = 1.5;
                                        ctx.beginPath();
                                        for (var j = 0; j <= 100; j++) {
                                            var jf = j / 100;
                                            var jpx = anaX + jf * (rightX - anaX);
                                            // project onto analyzer axis
                                            var jval = Math.sin(2 * Math.PI * 3 * jf - wavePhase) * projAmp;
                                            var jpy = beamY - jval;
                                            if (j === 0) ctx.moveTo(jpx, jpy);
                                            else ctx.lineTo(jpx, jpy);
                                        }
                                        ctx.stroke();
                                    }
                                }

                                // ---- cos^2 graph on the right ----
                                var graphL = w * 0.62, graphR = w * 0.95;
                                var graphT = h * 0.12, graphB = h * 0.82;
                                var graphW = graphR - graphL, graphH = graphB - graphT;

                                // Axes
                                ctx.strokeStyle = viz.colors.axis;
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.moveTo(graphL, graphB);
                                ctx.lineTo(graphR, graphB);
                                ctx.stroke();
                                ctx.beginPath();
                                ctx.moveTo(graphL, graphB);
                                ctx.lineTo(graphL, graphT);
                                ctx.stroke();

                                viz.screenText('\u03B8', (graphL + graphR) / 2, graphB + 18, viz.colors.text, 10);
                                viz.screenText('I/I\u2080', graphL - 10, graphT - 5, viz.colors.text, 10);

                                // Tick marks
                                var tickAngles = [0, 90, 180, 270, 360];
                                for (var ti = 0; ti < tickAngles.length; ti++) {
                                    var tx = graphL + tickAngles[ti] / 360 * graphW;
                                    ctx.strokeStyle = viz.colors.axis + '66';
                                    ctx.beginPath(); ctx.moveTo(tx, graphB); ctx.lineTo(tx, graphB + 4); ctx.stroke();
                                    viz.screenText(tickAngles[ti] + '\u00B0', tx, graphB + 12, viz.colors.text, 8);
                                }
                                // y ticks
                                for (var yi = 0; yi <= 4; yi++) {
                                    var yv = yi / 4;
                                    var yy = graphB - yv * graphH;
                                    ctx.strokeStyle = viz.colors.grid;
                                    ctx.beginPath(); ctx.moveTo(graphL, yy); ctx.lineTo(graphR, yy); ctx.stroke();
                                    viz.screenText(yv.toFixed(2), graphL - 6, yy, viz.colors.text, 8);
                                }

                                // cos^2 curve
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                for (var gi = 0; gi <= 300; gi++) {
                                    var ga = gi / 300 * 2 * Math.PI;
                                    var gx = graphL + gi / 300 * graphW;
                                    var gy = graphB - Math.cos(ga) * Math.cos(ga) * graphH;
                                    if (gi === 0) ctx.moveTo(gx, gy);
                                    else ctx.lineTo(gx, gy);
                                }
                                ctx.stroke();

                                // Current point
                                var cpx = graphL + (theta % (2 * Math.PI)) / (2 * Math.PI) * graphW;
                                var cpy = graphB - cos2 * graphH;
                                ctx.save();
                                ctx.shadowColor = viz.colors.gold;
                                ctx.shadowBlur = 10;
                                ctx.fillStyle = viz.colors.gold;
                                ctx.beginPath();
                                ctx.arc(cpx, cpy, 5, 0, Math.PI * 2);
                                ctx.fill();
                                ctx.restore();

                                // Display value
                                viz.screenText('I/I\u2080 = cos\u00B2(' + thetaDeg + '\u00B0) = ' + cos2.toFixed(3), w * 0.78, h * 0.06, viz.colors.gold, 12);
                                viz.screenText("Malus's Law: I = I\u2080 cos\u00B2\u03B8", w / 2, h - 8, viz.colors.text, 10);
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Linearly polarized light of intensity \\(I_0 = 100\\,\\text{W/m}^2\\) passes through an analyzer at \\(\\theta = 60^\\circ\\). What is the transmitted intensity?',
                        hint: 'Apply Malus\'s law directly.',
                        solution: '\\(I = I_0 \\cos^2 60^\\circ = 100 \\times (0.5)^2 = 100 \\times 0.25 = 25\\,\\text{W/m}^2\\).'
                    },
                    {
                        question: 'At what angle does the transmitted intensity drop to half?',
                        hint: 'Set \\(\\cos^2\\theta = 1/2\\).',
                        solution: '\\(\\cos^2\\theta = 1/2 \\Rightarrow \\cos\\theta = 1/\\sqrt{2} \\Rightarrow \\theta = 45^\\circ\\).'
                    }
                ]
            },

            // ============================================================
            // Section 4: Brewster's Angle
            // ============================================================
            {
                id: 'brewster-angle',
                title: "Brewster's Angle",
                content: `
<h2>Polarization by Reflection</h2>

<p>When light hits a dielectric surface (glass, water), both the reflected and refracted beams become partially polarized. At one special angle of incidence, the reflected beam is <strong>completely polarized</strong>.</p>

<div class="env-block theorem">
<div class="env-title">Brewster's law (1812)</div>
<div class="env-body">
<p>When the angle of incidence \\(\\theta_B\\) satisfies:</p>
\\[\\tan\\theta_B = \\frac{n_2}{n_1}\\]
<p>the reflected light is 100% polarized, with the E-field oscillating parallel to the surface (s-polarization). The reflected and refracted rays are perpendicular to each other: \\(\\theta_B + \\theta_r = 90^\\circ\\).</p>
</div>
</div>

<p>The physical reason: at Brewster's angle, the refracted ray direction is perpendicular to where the reflected ray would go. The oscillating dipoles in the glass radiate most strongly perpendicular to their oscillation axis. The p-polarized component (E-field in the plane of incidence) would require the dipoles to radiate along their oscillation axis, which they cannot do. So only s-polarization appears in the reflected beam.</p>

<div class="viz-placeholder" data-viz="viz-brewster"></div>

<div class="env-block example">
<div class="env-title">Example: Glass surface</div>
<div class="env-body">
<p>For glass with \\(n = 1.50\\):</p>
\\[\\theta_B = \\arctan(1.50/1.00) = 56.3^\\circ\\]
<p>At this angle, the reflected light is perfectly linearly polarized. This is why polarized sunglasses are so effective at cutting glare from glass windows and water surfaces.</p>
</div>
</div>

<div class="env-block example">
<div class="env-title">Example: Water surface</div>
<div class="env-body">
<p>For water with \\(n = 1.33\\):</p>
\\[\\theta_B = \\arctan(1.33) \\approx 53.1^\\circ\\]
<p>Glare from a lake or pool at this angle is almost completely polarized. Fishers use polarized glasses to cut the surface glare and see into the water.</p>
</div>
</div>

<div class="env-block remark">
<div class="env-title">Brewster windows in lasers</div>
<div class="env-body">
<p>Laser tubes often have windows tilted at Brewster's angle. The p-polarized component passes through with zero reflection loss (at that angle), while the s-component suffers partial reflection and is gradually eliminated. This naturally produces a linearly polarized laser beam with minimal cavity losses.</p>
</div>
</div>
`,
                visualizations: [
                    {
                        id: 'viz-brewster',
                        title: "Brewster's Angle Reflection",
                        description: 'Adjust the angle of incidence. At Brewster\'s angle the reflected beam becomes fully polarized (only s-component). The red bar shows the p-component in the reflected beam: it vanishes at Brewster\'s angle. The refracted and reflected rays become perpendicular.',
                        setup: function (body, controls) {
                            var viz = new VizEngine(body, { scale: 1, originX: 0, originY: 0 });
                            var ctx = viz.ctx;
                            var w = viz.width, h = viz.height;

                            var n1 = 1.0, n2 = 1.5;
                            var incAngleDeg = 56;
                            var brewsterDeg = Math.atan(n2 / n1) * 180 / Math.PI;

                            VizEngine.createSlider(controls, 'Angle of incidence (\u00B0)', 5, 85, 56, 0.5, function (v) {
                                incAngleDeg = v;
                            });
                            VizEngine.createSlider(controls, 'n\u2082 (glass)', 1.1, 2.5, 1.5, 0.05, function (v) {
                                n2 = v;
                                brewsterDeg = Math.atan(n2 / n1) * 180 / Math.PI;
                            });

                            function fresnelRs(cosI, cosT, nn1, nn2) {
                                var num = nn1 * cosI - nn2 * cosT;
                                var den = nn1 * cosI + nn2 * cosT;
                                return (num / den) * (num / den);
                            }
                            function fresnelRp(cosI, cosT, nn1, nn2) {
                                var num = nn2 * cosI - nn1 * cosT;
                                var den = nn2 * cosI + nn1 * cosT;
                                return (num / den) * (num / den);
                            }

                            function draw() {
                                viz.clear();

                                var surfaceY = h * 0.48;
                                var hitX = w * 0.38;

                                // Surface
                                ctx.fillStyle = viz.colors.blue + '18';
                                ctx.fillRect(0, surfaceY, w, h - surfaceY);
                                ctx.strokeStyle = viz.colors.blue + '88';
                                ctx.lineWidth = 2;
                                ctx.beginPath();
                                ctx.moveTo(0, surfaceY);
                                ctx.lineTo(w, surfaceY);
                                ctx.stroke();

                                viz.screenText('n\u2081 = ' + n1.toFixed(2) + ' (air)', hitX - 80, surfaceY - 20, viz.colors.text, 10);
                                viz.screenText('n\u2082 = ' + n2.toFixed(2) + ' (glass)', hitX - 80, surfaceY + 20, viz.colors.cyan, 10);

                                // Normal
                                ctx.strokeStyle = viz.colors.axis + '66';
                                ctx.lineWidth = 1;
                                ctx.setLineDash([4, 4]);
                                ctx.beginPath();
                                ctx.moveTo(hitX, surfaceY - h * 0.4);
                                ctx.lineTo(hitX, surfaceY + h * 0.4);
                                ctx.stroke();
                                ctx.setLineDash([]);
                                viz.screenText('normal', hitX + 5, surfaceY - h * 0.38, viz.colors.text, 9);

                                var incRad = incAngleDeg * Math.PI / 180;
                                var sinT = n1 / n2 * Math.sin(incRad);
                                var tir = sinT > 1;
                                var refRad = tir ? Math.PI / 2 : Math.asin(sinT);

                                var rayLen = h * 0.38;

                                // Incident ray
                                var incDx = Math.sin(incRad);
                                var incDy = Math.cos(incRad);
                                ctx.save();
                                ctx.shadowColor = viz.colors.orange;
                                ctx.shadowBlur = 6;
                                ctx.strokeStyle = viz.colors.orange;
                                ctx.lineWidth = 3;
                                ctx.beginPath();
                                ctx.moveTo(hitX - incDx * rayLen, surfaceY - incDy * rayLen);
                                ctx.lineTo(hitX, surfaceY);
                                ctx.stroke();
                                // Arrowhead
                                var aAng = Math.atan2(incDy, incDx);
                                var aMx = hitX - incDx * rayLen * 0.35;
                                var aMy = surfaceY - incDy * rayLen * 0.35;
                                ctx.fillStyle = viz.colors.orange;
                                ctx.beginPath();
                                ctx.moveTo(aMx + 8 * Math.sin(aAng + Math.PI / 2), aMy + 8 * Math.cos(aAng + Math.PI / 2));
                                ctx.lineTo(aMx + 8 * Math.cos(aAng), aMy - 8 * Math.sin(aAng));
                                ctx.lineTo(aMx - 8 * Math.sin(aAng + Math.PI / 2), aMy - 8 * Math.cos(aAng + Math.PI / 2));
                                ctx.closePath();
                                ctx.fill();
                                ctx.restore();

                                // Reflected ray
                                var refDx = Math.sin(incRad);
                                var refDy = -Math.cos(incRad);
                                // Compute reflectances
                                var cosI = Math.cos(incRad);
                                var cosT = tir ? 0 : Math.cos(refRad);
                                var Rs = tir ? 1 : fresnelRs(cosI, cosT, n1, n2);
                                var Rp = tir ? 1 : fresnelRp(cosI, cosT, n1, n2);
                                var Rtot = (Rs + Rp) / 2;

                                ctx.save();
                                ctx.shadowColor = viz.colors.yellow;
                                ctx.shadowBlur = 6;
                                ctx.strokeStyle = viz.colors.yellow;
                                ctx.lineWidth = 2 + Rtot * 2;
                                ctx.beginPath();
                                ctx.moveTo(hitX, surfaceY);
                                ctx.lineTo(hitX + refDx * rayLen, surfaceY + refDy * rayLen);
                                ctx.stroke();
                                ctx.restore();

                                // Refracted ray
                                if (!tir) {
                                    var Ts = 1 - Rs, Tp = 1 - Rp;
                                    var Ttot = (Ts + Tp) / 2;
                                    var trDx = Math.sin(refRad);
                                    var trDy = Math.cos(refRad);
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.cyan;
                                    ctx.shadowBlur = 6;
                                    ctx.strokeStyle = viz.colors.cyan;
                                    ctx.lineWidth = 1.5 + Ttot * 2;
                                    ctx.beginPath();
                                    ctx.moveTo(hitX, surfaceY);
                                    ctx.lineTo(hitX + trDx * rayLen, surfaceY + trDy * rayLen);
                                    ctx.stroke();
                                    ctx.restore();

                                    // Angle arc for refraction
                                    ctx.strokeStyle = viz.colors.cyan + '88';
                                    ctx.lineWidth = 1;
                                    ctx.beginPath();
                                    ctx.arc(hitX, surfaceY, 30, Math.PI / 2 - refRad, Math.PI / 2, false);
                                    ctx.stroke();
                                    viz.screenText('\u03B8r=' + (refRad * 180 / Math.PI).toFixed(1) + '\u00B0', hitX + 35, surfaceY + 35, viz.colors.cyan, 9);
                                }

                                // Angle arcs
                                ctx.strokeStyle = viz.colors.orange + '88';
                                ctx.lineWidth = 1;
                                ctx.beginPath();
                                ctx.arc(hitX, surfaceY, 40, -Math.PI / 2, -Math.PI / 2 + incRad, false);
                                ctx.stroke();
                                viz.screenText('\u03B8i=' + incAngleDeg.toFixed(1) + '\u00B0', hitX - 55, surfaceY - 50, viz.colors.orange, 9);

                                // ---- Polarization bars (right side) ----
                                var barX = w * 0.68;
                                var barW = w * 0.25;
                                var barH2 = 14;

                                viz.screenText('Reflected beam polarization:', barX + barW / 2, h * 0.08, viz.colors.yellow, 11);

                                // s-polarization
                                var sBarY = h * 0.16;
                                ctx.fillStyle = viz.colors.teal + '44';
                                ctx.fillRect(barX, sBarY - barH2 / 2, barW, barH2);
                                ctx.fillStyle = viz.colors.teal;
                                ctx.fillRect(barX, sBarY - barH2 / 2, barW * Rs, barH2);
                                viz.screenText('Rs (s-pol): ' + (Rs * 100).toFixed(1) + '%', barX + barW / 2, sBarY + barH2, viz.colors.teal, 9);

                                // p-polarization
                                var pBarY = h * 0.28;
                                ctx.fillStyle = viz.colors.red + '44';
                                ctx.fillRect(barX, pBarY - barH2 / 2, barW, barH2);
                                ctx.fillStyle = viz.colors.red;
                                ctx.fillRect(barX, pBarY - barH2 / 2, barW * Rp, barH2);
                                viz.screenText('Rp (p-pol): ' + (Rp * 100).toFixed(1) + '%', barX + barW / 2, pBarY + barH2, viz.colors.red, 9);

                                // Brewster angle indicator
                                var brewRad = brewsterDeg * Math.PI / 180;
                                var nearBrewster = Math.abs(incAngleDeg - brewsterDeg) < 1.0;
                                var brewColor = nearBrewster ? viz.colors.gold : viz.colors.text;
                                viz.screenText('Brewster angle: \u03B8_B = arctan(n\u2082/n\u2081) = ' + brewsterDeg.toFixed(1) + '\u00B0', w * 0.5, h * 0.92, brewColor, 11);

                                if (nearBrewster) {
                                    ctx.save();
                                    ctx.shadowColor = viz.colors.gold;
                                    ctx.shadowBlur = 15;
                                    viz.screenText('\u2605 At Brewster\'s angle! Rp = 0, reflected light is fully s-polarized', w * 0.5, h * 0.97, viz.colors.gold, 10);
                                    ctx.restore();
                                }

                                // Check if reflected and refracted are 90 degrees apart
                                if (!tir) {
                                    var sumAng = incAngleDeg + refRad * 180 / Math.PI;
                                    viz.screenText('\u03B8i + \u03B8r = ' + sumAng.toFixed(1) + '\u00B0' + (nearBrewster ? ' = 90\u00B0 \u2713' : ''), barX + barW / 2, h * 0.4, nearBrewster ? viz.colors.gold : viz.colors.text, 10);
                                }

                                viz.screenText('Incident', hitX - incDx * rayLen * 0.5 - 15, surfaceY - incDy * rayLen * 0.5 - 10, viz.colors.orange, 10);
                                viz.screenText('Reflected', hitX + refDx * rayLen * 0.6 + 10, surfaceY + refDy * rayLen * 0.6, viz.colors.yellow, 10);
                                if (!tir) {
                                    viz.screenText('Refracted', hitX + Math.sin(refRad) * rayLen * 0.6 + 10, surfaceY + Math.cos(refRad) * rayLen * 0.6, viz.colors.cyan, 10);
                                }
                            }

                            viz.animate(draw);
                            return viz;
                        }
                    }
                ],
                exercises: [
                    {
                        question: 'Calculate Brewster\'s angle for light going from air into diamond (\\(n = 2.42\\)).',
                        hint: 'Use \\(\\theta_B = \\arctan(n_2/n_1)\\).',
                        solution: '\\(\\theta_B = \\arctan(2.42/1.00) = \\arctan(2.42) \\approx 67.6^\\circ\\).'
                    },
                    {
                        question: 'At Brewster\'s angle, show that the reflected and refracted rays are perpendicular.',
                        hint: 'Use \\(\\tan\\theta_B = n_2/n_1\\) and Snell\'s law \\(n_1 \\sin\\theta_B = n_2 \\sin\\theta_r\\).',
                        solution: 'From Snell\'s law: \\(\\sin\\theta_r = (n_1/n_2)\\sin\\theta_B\\). From Brewster\'s law: \\(n_2/n_1 = \\tan\\theta_B = \\sin\\theta_B/\\cos\\theta_B\\), so \\(n_1/n_2 = \\cos\\theta_B/\\sin\\theta_B\\). Thus \\(\\sin\\theta_r = (\\cos\\theta_B/\\sin\\theta_B)\\sin\\theta_B = \\cos\\theta_B\\), meaning \\(\\theta_r = 90^\\circ - \\theta_B\\). Therefore \\(\\theta_B + \\theta_r = 90^\\circ\\), confirming the reflected and refracted rays are perpendicular.'
                    }
                ]
            },

            // ============================================================
            // Section 5: Applications of Polarization
            // ============================================================
            {
                id: 'polarization-applications',
                title: 'Applications',
                content: `
<h2>Polarization in the Real World</h2>

<p>Once you know about polarization, you see it everywhere. Here are some of the most important applications.</p>

<h3>LCD Screens</h3>

<p>Every LCD (liquid crystal display) relies on polarization. The basic structure is a sandwich: polarizer, liquid crystal layer, analyzer (crossed polarizer). Without voltage, the liquid crystal twists the polarization by 90\\(^\\circ\\), so light passes through both filters (bright pixel). With voltage, the liquid crystal straightens, the polarization is not rotated, and light is blocked by the crossed analyzer (dark pixel). Each sub-pixel has red, green, or blue color filter, and the combination gives you full color at millions of pixels.</p>

<h3>3D Cinema</h3>

<p>3D movies project two images simultaneously: one with left-circular polarization and one with right-circular polarization. Your 3D glasses have a left-circular polarizer over one eye and a right-circular polarizer over the other. Each eye sees only its intended image, creating the stereoscopic depth illusion. (Older systems used linear polarization at \\(\\pm 45^\\circ\\), but tilting your head ruined the effect.)</p>

<h3>Polarimetry and Stress Analysis</h3>

<p>Transparent materials under stress (plastic, glass, ice) become birefringent: different polarization components travel at different speeds. Between crossed polarizers, stressed regions show vivid color fringes. Engineers use this <strong>photoelasticity</strong> technique to map stress fields in structures before building them. Geologists use it to identify minerals in thin sections under the microscope.</p>

<h3>Polarization in Nature</h3>

<div class="env-block intuition">
<div class="env-title">Bees and the sky</div>
<div class="env-body">
<p>Scattered sunlight is partially polarized, with the polarization pattern depending on the sun's position. Bees can detect polarization and use the sky's polarization pattern for navigation, even when the sun is behind clouds. Viking navigators may have used calcite "sunstones" for the same purpose, detecting the sun's position through overcast skies via polarization.</p>
</div>
</div>

<h3>Optical Communication and Quantum Key Distribution</h3>

<p>Fiber-optic systems encode data in different polarization states to double channel capacity (polarization-division multiplexing). Quantum key distribution (BB84 protocol) uses single photons in different polarization bases to establish provably secure encryption keys. The security comes from quantum mechanics: measuring a photon's polarization inevitably disturbs it, so eavesdropping is detectable.</p>

<div class="env-block remark">
<div class="env-title">Polarization is everywhere</div>
<div class="env-body">
<p>Reflections from roads and water are partially polarized. Glare from your phone screen is polarized. The cosmic microwave background radiation has a faint polarization pattern that encodes information about the universe's first moments. Polarization connects everyday optics to the frontiers of cosmology.</p>
</div>
</div>

<div class="env-block warning">
<div class="env-title">LCD screens and polarized glasses</div>
<div class="env-body">
<p>If you wear polarized sunglasses and tilt your head 90\\(^\\circ\\) while looking at your phone, the screen may go dark. That is because the phone's front polarizer and your glasses are now crossed. This is a quick way to test whether your sunglasses are actually polarized.</p>
</div>
</div>
`,
                visualizations: [],
                exercises: [
                    {
                        question: 'Explain why tilting your head while wearing polarized sunglasses can make an LCD screen appear dark.',
                        hint: 'Think about what happens when two polarizers become crossed.',
                        solution: 'LCD screens emit light that passes through a front polarizer, so the emitted light is linearly polarized (typically at 45\\(^\\circ\\)). Polarized sunglasses have a vertical transmission axis. When you tilt your head 90\\(^\\circ\\), the sunglass axis becomes horizontal, which is perpendicular to the screen\'s polarization. By Malus\'s law, \\(I = I_0 \\cos^2 90^\\circ = 0\\). The screen goes dark because the two polarizers are crossed.'
                    },
                    {
                        question: 'The reflected glare from a road surface is predominantly horizontally polarized. Why do vertically oriented polarized sunglasses reduce glare?',
                        hint: 'What does Malus\'s law say when the polarization direction is perpendicular to the transmission axis?',
                        solution: 'Horizontally polarized glare has its E-field horizontal, while the sunglasses transmit only the vertical component. Since the angle between horizontal polarization and vertical transmission axis is 90\\(^\\circ\\), Malus\'s law gives \\(I = I_0 \\cos^2 90^\\circ = 0\\). The glare is completely blocked. In practice, road glare is only partially polarized, so the sunglasses reduce it rather than eliminating it entirely.'
                    }
                ]
            }
        ]
    });
})();
