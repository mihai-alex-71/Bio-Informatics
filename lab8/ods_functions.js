// IC, f, GFN and GFF are copied verbatim from the Objective Digital Stains web app (the JavaScript port of PromKappa):
// https://github.com/Gagniuc/Objective-Digital-Stains (index.html)
// MIT License, Copyright (c) 2022 Dr. Paul A. Gagniuc
//
// Only the driver at the bottom was added: it reads a DNA sequence on stdin and prints, for every sliding window
// of length n (default 30, step 1, exactly as the web app), the pair [C+G %, IC] as JSON.

// Information content (Self-Sequence alignment)
function IC(s)
{
    var t = 0;
    var m = 0;
    var x = [];
    x = s.split('');
    for (var u=1; u<=(s.length - 1); u++)
    {
        for (var i=0; i<=(s.length-u); i++)
        {
			m += f(x[i], x[u+i]);
		} 
        t += (m / (s.length-u) * 100);
        m = 0;
    }
    return (100 - (t / (s.length - 1))).toFixed(2);
}
function f(x1, x2){
    if (x1 == x2) {return 1;} else {return 0;}
}
// X% content NORMAL
function GFN(s, m)
{
    var p = 0;
    s = s.toLowerCase();
    m = m.toLowerCase();
    p = s.split(m).join('').length;
    p = (s.length - p)/(s.length);
    return (p * 100).toFixed(2);
}
// CG% content FREQUENCY
function GFF(s, m, b)
{
    var p = 0;
    s = s.toLowerCase();
    m = m.toLowerCase();
    p = s.split(m).join('').length;
    p = (b/s.length)*(s.length - p);
    return p.toFixed(2);
}

// ---- driver (added) ----
const seq = require('fs').readFileSync(0, 'utf8').replace(/\s/g, '').toUpperCase();
const n = Number(process.argv[2] || 30);
const out = [];
for (let u = 0; u <= seq.length - n; u++) {
    const sw = seq.substr(u, n);
    out.push([Number(GFN(sw, 'C')) + Number(GFN(sw, 'G')), Number(IC(sw))]);
}
console.log(JSON.stringify(out));
