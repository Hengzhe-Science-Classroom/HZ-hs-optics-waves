// === VizEngine: Visualization toolkit for Classical Mechanics ===
// Extended with physics simulation helpers: trails, vectors, energy bars, RK4 integrator
class VizEngine {
    constructor(container, opts = {}) {
        const containerWidth = container.clientWidth ? container.clientWidth - 32 : 0;
        const defaultWidth = containerWidth > 560 ? Math.min(containerWidth, 900) : 560;
        this.width = opts.width || defaultWidth;
        this.height = opts.height || Math.round(this.width * 0.65);
        this.scale = opts.scale || 40;
        this.originX = opts.originX ?? this.width / 2;
        this.originY = opts.originY ?? this.height / 2;

        const dpr = window.devicePixelRatio || 1;
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.canvas.style.width = this.width + 'px';
        this.canvas.style.height = this.height + 'px';
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(dpr, dpr);
        container.appendChild(this.canvas);

        this.colors = {
            bg:'#0c0c20', grid:'#1a1a40', axis:'#4a4a7a', text:'#8b949e',
            white:'#f0f6fc', blue:'#58a6ff', teal:'#3fb9a0', orange:'#f0883e',
            green:'#3fb950', purple:'#bc8cff', red:'#f85149', yellow:'#d29922',
            pink:'#f778ba', gold:'#ffd700', cyan:'#00d4ff'
        };
        this.draggables = [];
        this.animationId = null;
        this._dragBound = false;
        this.dragState = null;
    }

    toScreen(x, y) { return [this.originX + x * this.scale, this.originY - y * this.scale]; }
    toMath(sx, sy) { return [(sx - this.originX) / this.scale, (this.originY - sy) / this.scale]; }

    clear() {
        this.ctx.fillStyle = this.colors.bg;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    drawGrid(spacing = 1) {
        const ctx = this.ctx;
        const minX = Math.floor(-this.originX / this.scale / spacing) * spacing;
        const maxX = Math.ceil((this.width - this.originX) / this.scale / spacing) * spacing;
        const minY = Math.floor(-(this.height - this.originY) / this.scale / spacing) * spacing;
        const maxY = Math.ceil(this.originY / this.scale / spacing) * spacing;
        ctx.strokeStyle = this.colors.grid; ctx.lineWidth = 0.5;
        for (let x = minX; x <= maxX; x += spacing) {
            const [sx] = this.toScreen(x, 0);
            ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx, this.height); ctx.stroke();
        }
        for (let y = minY; y <= maxY; y += spacing) {
            const [, sy] = this.toScreen(0, y);
            ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(this.width, sy); ctx.stroke();
        }
    }

    drawAxes(labelX, labelY) {
        const ctx = this.ctx;
        ctx.strokeStyle = this.colors.axis; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(0, this.originY); ctx.lineTo(this.width, this.originY); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(this.originX, 0); ctx.lineTo(this.originX, this.height); ctx.stroke();
        ctx.fillStyle = this.colors.text; ctx.font = '11px -apple-system,sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        const minX = Math.ceil(-this.originX / this.scale), maxX = Math.floor((this.width - this.originX) / this.scale);
        for (let x = minX; x <= maxX; x++) { if (x === 0) continue; const [sx] = this.toScreen(x, 0); ctx.fillText(x, sx, this.originY + 4); }
        ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
        const minY = Math.ceil(-(this.height - this.originY) / this.scale), maxY = Math.floor(this.originY / this.scale);
        for (let y = minY; y <= maxY; y++) { if (y === 0) continue; const [, sy] = this.toScreen(0, y); ctx.fillText(y, this.originX - 6, sy); }
        if (labelX) { ctx.textAlign = 'right'; ctx.textBaseline = 'top'; ctx.fillStyle = this.colors.text; ctx.font = 'italic 13px -apple-system,sans-serif'; ctx.fillText(labelX, this.width - 8, this.originY + 6); }
        if (labelY) { ctx.textAlign = 'left'; ctx.textBaseline = 'bottom'; ctx.fillText(labelY, this.originX + 6, 8); }
    }

    drawPoint(x, y, color, label, r = 5) {
        const ctx = this.ctx; const [sx, sy] = this.toScreen(x, y);
        ctx.fillStyle = color; ctx.beginPath(); ctx.arc(sx, sy, r, 0, Math.PI * 2); ctx.fill();
        if (label) { ctx.fillStyle = color; ctx.font = '12px -apple-system,sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'bottom'; ctx.fillText(label, sx + r + 4, sy - r); }
    }

    drawSegment(x1, y1, x2, y2, color, lw = 1, dashed = false) {
        const ctx = this.ctx;
        const [sx1, sy1] = this.toScreen(x1, y1), [sx2, sy2] = this.toScreen(x2, y2);
        ctx.strokeStyle = color; ctx.lineWidth = lw;
        if (dashed) ctx.setLineDash([6, 4]);
        ctx.beginPath(); ctx.moveTo(sx1, sy1); ctx.lineTo(sx2, sy2); ctx.stroke();
        if (dashed) ctx.setLineDash([]);
    }

    drawPolygon(points, fill, stroke, lw = 1) {
        const ctx = this.ctx; ctx.beginPath();
        points.forEach(([x, y], i) => { const [sx, sy] = this.toScreen(x, y); i === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy); });
        ctx.closePath();
        if (fill) { ctx.fillStyle = fill; ctx.fill(); }
        if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
    }

    drawCircle(cx, cy, r, fill, stroke, lw = 1) {
        const ctx = this.ctx; const [sx, sy] = this.toScreen(cx, cy);
        ctx.beginPath(); ctx.arc(sx, sy, r * this.scale, 0, Math.PI * 2);
        if (fill) { ctx.fillStyle = fill; ctx.fill(); }
        if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
    }

    drawFunction(f, xMin, xMax, color, lw = 2, steps = 300) {
        const ctx = this.ctx;
        ctx.strokeStyle = color; ctx.lineWidth = lw;
        ctx.beginPath();
        let started = false;
        for (let i = 0; i <= steps; i++) {
            const x = xMin + (xMax - xMin) * i / steps;
            const y = f(x);
            if (!isFinite(y)) { started = false; continue; }
            const [sx, sy] = this.toScreen(x, y);
            if (!started) { ctx.moveTo(sx, sy); started = true; }
            else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
    }

    drawParametric(fx, fy, tMin, tMax, color, lw = 2, steps = 500) {
        const ctx = this.ctx;
        ctx.strokeStyle = color; ctx.lineWidth = lw;
        ctx.beginPath();
        let started = false;
        for (let i = 0; i <= steps; i++) {
            const t = tMin + (tMax - tMin) * i / steps;
            const x = fx(t), y = fy(t);
            if (!isFinite(x) || !isFinite(y)) { started = false; continue; }
            const [sx, sy] = this.toScreen(x, y);
            if (!started) { ctx.moveTo(sx, sy); started = true; }
            else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
    }

    drawText(text, x, y, color, size = 14, align = 'center', baseline = 'middle') {
        const ctx = this.ctx; const [sx, sy] = this.toScreen(x, y);
        ctx.fillStyle = color || this.colors.white; ctx.font = size + 'px -apple-system,sans-serif';
        ctx.textAlign = align; ctx.textBaseline = baseline; ctx.fillText(text, sx, sy);
    }

    screenText(text, px, py, color, size = 14, align = 'center', baseline = 'middle') {
        const ctx = this.ctx;
        ctx.fillStyle = color || this.colors.white; ctx.font = size + 'px -apple-system,sans-serif';
        ctx.textAlign = align; ctx.textBaseline = baseline; ctx.fillText(text, px, py);
    }

    // === PHYSICS-SPECIFIC DRAWING ===

    // Draw a force/velocity vector arrow (in world coords)
    drawVector(x, y, vx, vy, color, label, lw = 2.5, headSize = 10) {
        const ctx = this.ctx;
        const [sx1, sy1] = this.toScreen(x, y);
        const [sx2, sy2] = this.toScreen(x + vx, y + vy);
        const dx = sx2 - sx1, dy = sy2 - sy1, len = Math.sqrt(dx * dx + dy * dy);
        if (len < 2) return;
        const angle = Math.atan2(dy, dx);
        // Shaft with glow
        ctx.save();
        ctx.shadowColor = color; ctx.shadowBlur = 6;
        ctx.strokeStyle = color; ctx.lineWidth = lw;
        ctx.beginPath(); ctx.moveTo(sx1, sy1); ctx.lineTo(sx2 - Math.cos(angle) * headSize * 0.8, sy2 - Math.sin(angle) * headSize * 0.8); ctx.stroke();
        // Arrowhead
        ctx.fillStyle = color; ctx.beginPath();
        ctx.moveTo(sx2, sy2);
        ctx.lineTo(sx2 - headSize * Math.cos(angle - 0.35), sy2 - headSize * Math.sin(angle - 0.35));
        ctx.lineTo(sx2 - headSize * Math.cos(angle + 0.35), sy2 - headSize * Math.sin(angle + 0.35));
        ctx.closePath(); ctx.fill();
        ctx.restore();
        if (label) {
            const nx = -dy / len, ny = dx / len;
            ctx.fillStyle = color; ctx.font = 'bold 13px -apple-system,sans-serif';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(label, (sx1 + sx2) / 2 + nx * 16, (sy1 + sy2) / 2 + ny * 16);
        }
    }

    // Draw a glowing ball (for particles/objects)
    drawBall(x, y, r, color, glowRadius) {
        const ctx = this.ctx; const [sx, sy] = this.toScreen(x, y);
        const pr = r * this.scale;
        if (glowRadius) {
            const grad = ctx.createRadialGradient(sx, sy, pr * 0.5, sx, sy, pr * glowRadius);
            grad.addColorStop(0, color + '66');
            grad.addColorStop(1, color + '00');
            ctx.fillStyle = grad;
            ctx.beginPath(); ctx.arc(sx, sy, pr * glowRadius, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = color;
        ctx.beginPath(); ctx.arc(sx, sy, pr, 0, Math.PI * 2); ctx.fill();
        // Highlight
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.beginPath(); ctx.arc(sx - pr * 0.25, sy - pr * 0.25, pr * 0.35, 0, Math.PI * 2); ctx.fill();
    }

    // Draw a motion trail (array of [x,y] points, fading out)
    drawTrail(trail, color, maxAlpha = 0.8) {
        const ctx = this.ctx;
        const n = trail.length;
        if (n < 2) return;
        for (let i = 1; i < n; i++) {
            const alpha = (i / n) * maxAlpha;
            const lw = 1 + (i / n) * 2;
            const [sx1, sy1] = this.toScreen(trail[i - 1][0], trail[i - 1][1]);
            const [sx2, sy2] = this.toScreen(trail[i][0], trail[i][1]);
            ctx.strokeStyle = color; ctx.globalAlpha = alpha; ctx.lineWidth = lw;
            ctx.beginPath(); ctx.moveTo(sx1, sy1); ctx.lineTo(sx2, sy2); ctx.stroke();
        }
        ctx.globalAlpha = 1;
    }

    // Draw energy bar chart (KE, PE, Total) at screen position
    drawEnergyBars(sx, sy, barW, barH, ke, pe, total) {
        const ctx = this.ctx;
        const maxE = Math.max(Math.abs(total) * 1.2, 1);
        const keH = (ke / maxE) * barH;
        const peH = (pe / maxE) * barH;
        const totH = ((ke + pe) / maxE) * barH;
        // Background
        ctx.fillStyle = this.colors.bg + 'cc';
        ctx.fillRect(sx - 5, sy - barH - 25, barW * 3 + 30, barH + 45);
        ctx.strokeStyle = this.colors.grid;
        ctx.strokeRect(sx - 5, sy - barH - 25, barW * 3 + 30, barH + 45);
        // KE bar
        ctx.fillStyle = this.colors.orange;
        ctx.fillRect(sx, sy - keH, barW, keH);
        this.screenText('KE', sx + barW / 2, sy + 12, this.colors.orange, 10);
        // PE bar
        ctx.fillStyle = this.colors.blue;
        ctx.fillRect(sx + barW + 5, sy - peH, barW, peH);
        this.screenText('PE', sx + barW + 5 + barW / 2, sy + 12, this.colors.blue, 10);
        // Total bar
        ctx.fillStyle = this.colors.green;
        ctx.fillRect(sx + 2 * (barW + 5), sy - totH, barW, totH);
        this.screenText('E', sx + 2 * (barW + 5) + barW / 2, sy + 12, this.colors.green, 10);
    }

    // Draw a spring between two points (in world coords)
    drawSpring(x1, y1, x2, y2, coils, amplitude, color, lw = 1.5) {
        const ctx = this.ctx;
        const [sx1, sy1] = this.toScreen(x1, y1);
        const [sx2, sy2] = this.toScreen(x2, y2);
        const dx = sx2 - sx1, dy = sy2 - sy1;
        const len = Math.sqrt(dx * dx + dy * dy);
        if (len < 1) return;
        const ux = dx / len, uy = dy / len;
        const nx = -uy, ny = ux;
        ctx.strokeStyle = color; ctx.lineWidth = lw;
        ctx.beginPath(); ctx.moveTo(sx1, sy1);
        const segLen = len / (coils * 2 + 2);
        let cx = sx1 + ux * segLen, cy = sy1 + uy * segLen;
        ctx.lineTo(cx, cy);
        for (let i = 0; i < coils * 2; i++) {
            const sign = (i % 2 === 0) ? 1 : -1;
            cx += ux * segLen;
            cy += uy * segLen;
            ctx.lineTo(cx + nx * amplitude * sign, cy + ny * amplitude * sign);
        }
        cx += ux * segLen;
        cy += uy * segLen;
        ctx.lineTo(cx, cy);
        ctx.lineTo(sx2, sy2);
        ctx.stroke();
    }

    // Draw ground hatching
    drawGround(y, color) {
        const ctx = this.ctx;
        const [, sy] = this.toScreen(0, y);
        ctx.strokeStyle = color || this.colors.text; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(this.width, sy); ctx.stroke();
        for (let x = 0; x < this.width; x += 15) {
            ctx.beginPath(); ctx.moveTo(x, sy); ctx.lineTo(x - 8, sy + 10); ctx.stroke();
        }
    }

    // Draw angle arc between two lines from origin point
    drawAngle(cx, cy, angle1, angle2, radius, color, label) {
        const ctx = this.ctx;
        const [sx, sy] = this.toScreen(cx, cy);
        const r = radius * this.scale;
        ctx.strokeStyle = color; ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(sx, sy, r, -angle2, -angle1);
        ctx.stroke();
        if (label) {
            const midAngle = -(angle1 + angle2) / 2;
            const lx = sx + (r + 12) * Math.cos(midAngle);
            const ly = sy + (r + 12) * Math.sin(midAngle);
            ctx.fillStyle = color; ctx.font = '12px -apple-system,sans-serif';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(label, lx, ly);
        }
    }

    // Screen-space helpers
    drawScreenRect(sx, sy, sw, sh, color) { this.ctx.fillStyle = color; this.ctx.fillRect(sx, sy, sw, sh); }
    drawScreenCircle(sx, sy, r, color) { this.ctx.fillStyle = color; this.ctx.beginPath(); this.ctx.arc(sx, sy, r, 0, Math.PI * 2); this.ctx.fill(); }
    drawScreenLine(sx1, sy1, sx2, sy2, color, lw = 1) { this.ctx.strokeStyle = color; this.ctx.lineWidth = lw; this.ctx.beginPath(); this.ctx.moveTo(sx1, sy1); this.ctx.lineTo(sx2, sy2); this.ctx.stroke(); }

    // --- Draggables ---
    addDraggable(id, x, y, color, radius = 8, onDrag) {
        const d = { id, x, y, color, radius: radius || 8, onDrag };
        this.draggables.push(d);
        if (!this._dragBound) {
            this._dragBound = true;
            const getPos = (e) => {
                const r = this.canvas.getBoundingClientRect();
                const cx = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
                const cy = (e.touches ? e.touches[0].clientY : e.clientY) - r.top;
                return this.toMath(cx, cy);
            };
            const startDrag = (e) => {
                const [wx, wy] = getPos(e);
                for (const dr of this.draggables) {
                    if (Math.sqrt((wx - dr.x) ** 2 + (wy - dr.y) ** 2) < dr.radius / this.scale * 2.5) {
                        this.dragState = dr; e.preventDefault(); break;
                    }
                }
            };
            const moveDrag = (e) => {
                if (!this.dragState) return;
                e.preventDefault();
                const [wx, wy] = getPos(e);
                this.dragState.x = wx; this.dragState.y = wy;
                if (this.dragState.onDrag) this.dragState.onDrag(wx, wy);
            };
            const endDrag = () => { this.dragState = null; };
            this.canvas.addEventListener('mousedown', startDrag);
            this.canvas.addEventListener('mousemove', moveDrag);
            this.canvas.addEventListener('mouseup', endDrag);
            this.canvas.addEventListener('mouseleave', endDrag);
            this.canvas.addEventListener('touchstart', startDrag, { passive: false });
            this.canvas.addEventListener('touchmove', moveDrag, { passive: false });
            this.canvas.addEventListener('touchend', endDrag);
        }
        return d;
    }

    drawDraggables() {
        for (const d of this.draggables) {
            const [sx, sy] = this.toScreen(d.x, d.y);
            const ctx = this.ctx;
            ctx.fillStyle = d.color + '33'; ctx.beginPath(); ctx.arc(sx, sy, d.radius + 4, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = d.color; ctx.beginPath(); ctx.arc(sx, sy, d.radius, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#ffffff44'; ctx.beginPath(); ctx.arc(sx - 2, sy - 2, d.radius * 0.3, 0, Math.PI * 2); ctx.fill();
        }
    }

    // --- Animation ---
    animate(drawFrame) {
        const loop = (t) => { drawFrame(t); this.animationId = requestAnimationFrame(loop); };
        this.animationId = requestAnimationFrame(loop);
    }
    stopAnimation() { if (this.animationId) { cancelAnimationFrame(this.animationId); this.animationId = null; } }

    // --- UI Controls ---
    static createSlider(container, label, min, max, val, step, onChange) {
        const g = document.createElement('div'); g.className = 'viz-slider-group';
        const l = document.createElement('span'); l.className = 'viz-slider-label'; l.textContent = label;
        const s = document.createElement('input'); s.type = 'range'; s.className = 'viz-slider';
        s.min = min; s.max = max; s.value = val; s.step = step || 0.1;
        const v = document.createElement('span'); v.className = 'viz-slider-value'; v.textContent = parseFloat(val).toFixed(1);
        s.addEventListener('input', () => { v.textContent = parseFloat(s.value).toFixed(step < 0.01 ? 2 : 1); onChange(parseFloat(s.value)); });
        g.appendChild(l); g.appendChild(s); g.appendChild(v); container.appendChild(g);
        return s;
    }

    static createButton(container, label, onClick) {
        const b = document.createElement('button');
        b.style.cssText = 'padding:4px 12px;border:1px solid #30363d;border-radius:4px;background:#1a1a40;color:#c9d1d9;font-size:0.78rem;cursor:pointer;';
        b.textContent = label; b.addEventListener('click', onClick); container.appendChild(b); return b;
    }

    // === PHYSICS UTILITIES ===

    // 4th-order Runge-Kutta step for state vector
    // state: array of numbers, derivs: function(state, t) => array of derivatives
    static rk4(state, t, dt, derivs) {
        const n = state.length;
        const k1 = derivs(state, t);
        const s2 = state.map((s, i) => s + 0.5 * dt * k1[i]);
        const k2 = derivs(s2, t + 0.5 * dt);
        const s3 = state.map((s, i) => s + 0.5 * dt * k2[i]);
        const k3 = derivs(s3, t + 0.5 * dt);
        const s4 = state.map((s, i) => s + dt * k3[i]);
        const k4 = derivs(s4, t + dt);
        return state.map((s, i) => s + (dt / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
    }

    // Simple Euler step
    static euler(state, t, dt, derivs) {
        const k = derivs(state, t);
        return state.map((s, i) => s + dt * k[i]);
    }

    // Utilities
    static lerp(a, b, t) { return a + (b - a) * t; }
    static clamp(x, lo, hi) { return Math.max(lo, Math.min(hi, x)); }
    static hsl(h, s, l) { return 'hsl(' + h + ',' + s + '%,' + l + '%)'; }
    static vecLen(v) { return Math.sqrt(v[0] * v[0] + v[1] * v[1]); }
    static vecNorm(v) { const l = VizEngine.vecLen(v); return l < 1e-10 ? [0, 0] : [v[0] / l, v[1] / l]; }
    static dot(u, v) { return u[0] * v[0] + u[1] * v[1]; }
}

window.VizEngine = VizEngine;
