---
layout: post
title: "Common Phase-Shift Control for Efficient MMAB Converters"
date: 2023-08-01
card-image: /assets/img/posts/mmab-cps-prototype.png
summary: "Common phase-shift control adds one coordinated degree of freedom to reduce circulating current and converter loss while retaining the required multiport power flow."
categories: Research
tags:
  - Research
  - Power Electronics
  - MMAB Converter
  - Efficiency Optimization
---

<p class="research-intro">Multi-active-bridge converters can route power flexibly among several ports, but conventional single-phase-shift control may generate large circulating currents when port voltages or power levels are unbalanced. This work introduces common phase-shift (CPS) control to reduce that penalty.</p>

<p class="research-byline"><strong>Published in:</strong> <em>IEEE Journal of Emerging and Selected Topics in Power Electronics</em>, vol. 11, no. 4, pp. 3924–3936, August 2023. <a href="https://ieeexplore.ieee.org/document/10132875/">View on IEEE Xplore</a>.</p>

<div class="research-metrics">
  <div><strong>16.55%</strong><span>maximum efficiency improvement</span></div>
  <div><strong>50 kHz</strong><span>experimental switching frequency</span></div>
  <div><strong>4 ports</strong><span>hardware validation</span></div>
</div>

## Why add a common phase shift?

Single-phase-shift control determines power flow through the relative displacement among bridge voltages, leaving little freedom to reshape transformer currents. CPS introduces a common inner phase shift shared by the bridges. This extra degree of freedom changes the current waveform without disturbing the commanded port-power relationships.

<figure class="research-figure">
  <img src="{{ '/assets/img/posts/mmab-cps-topology.png' | relative_url }}" alt="Four-port modular multi-active-bridge converter topology">
  <figcaption>The four-port MMAB converter studied under common phase-shift control.</figcaption>
</figure>

## Loss-aware optimization

The switching states and current trajectories are characterized analytically, then combined with a component-level loss model. For each operating point, the common phase-shift variable is selected to minimize total semiconductor and magnetic loss while satisfying the required power transfer.

The method is particularly effective under light load and voltage mismatch, where conventional control produces substantial reactive current. In one extreme 0.2 kW condition, measured efficiency rises from 70.33% with SPS to 86.88% with CPS.

<figure class="research-figure">
  <img src="{{ '/assets/img/posts/mmab-cps-prototype.png' | relative_url }}" alt="Four-port MMAB converter laboratory prototype">
  <figcaption>Experimental platform used for loss-model and efficiency validation.</figcaption>
</figure>

## Measured performance

Tests from 0.2 to 2 kW across three representative operating conditions show a peak efficiency of 92.2% and a maximum improvement of 16.55%. The measured current reduction agrees with the predicted optimum and demonstrates that coordinated waveform shaping can recover efficiency without changing the converter hardware.

<figure class="research-figure">
  <img src="{{ '/assets/img/posts/mmab-cps-waveforms.png' | relative_url }}" alt="Measured SPS and CPS current waveforms">
  <figcaption>Measured waveforms show the reduction in RMS and circulating current achieved by CPS.</figcaption>
</figure>

<div class="research-takeaway">
  <strong>Takeaway.</strong> A single shared control variable provides a practical route to lower RMS current and higher efficiency across asymmetric multiport operating conditions.
</div>

