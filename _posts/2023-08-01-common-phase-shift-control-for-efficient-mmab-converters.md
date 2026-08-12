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

<p class="research-byline"><strong>Authors:</strong> Haoyu Wang, Shiqi Ji, Di Mou, Liqiang Yuan, Yangbin Zeng, and Zhengming Zhao.</p>

<div class="research-metrics">
  <div><strong>16.55%</strong><span>maximum efficiency improvement</span></div>
  <div><strong>50 kHz</strong><span>experimental switching frequency</span></div>
  <div><strong>4 ports</strong><span>hardware validation</span></div>
</div>

## Why add a common phase shift?

Single-phase-shift control determines power flow through the relative displacement among bridge voltages, leaving little freedom to reshape transformer currents. CPS introduces a common inner phase shift shared by the bridges. This extra degree of freedom changes the current waveform without disturbing the commanded port-power relationships.

That distinction matters in multiport systems. The dc loads may request the correct average powers while the common transformer still carries large reactive and circulating currents. Those currents do not contribute useful output power, yet they increase semiconductor conduction loss, copper loss, and device stress. CPS preserves the outer phase relationships responsible for power sharing while using the shared inner shift to reduce this hidden current component.

<figure class="research-figure">
  <img src="{{ '/assets/img/posts/mmab-cps-topology.png' | relative_url }}" alt="Four-port modular multi-active-bridge converter topology">
  <figcaption>The four-port MMAB converter studied under common phase-shift control.</figcaption>
</figure>

## Loss-aware optimization

The switching states and current trajectories are characterized analytically, then combined with a component-level loss model. For each operating point, the common phase-shift variable is selected to minimize total semiconductor and magnetic loss while satisfying the required power transfer.

The optimization follows a practical sequence. First, the required port powers determine the outer phase shifts. Candidate common shifts are then evaluated using the analytical current expressions. Conduction loss, switching loss, transformer copper loss, and magnetic loss are combined into one objective, and the minimum-loss setting is passed to the modulator. Because only one coordinated variable is added, the search remains compact even though several bridges participate.

The method is particularly effective under light load and voltage mismatch, where conventional control produces substantial reactive current. In one extreme 0.2 kW condition, measured efficiency rises from 70.33% with SPS to 86.88% with CPS.

At higher load, the percentage improvement becomes smaller because useful active current already occupies a larger share of the total waveform. CPS still reduces RMS stress, but its strongest benefit appears precisely where many converters struggle: unequal port voltages, uneven power sharing, and lightly loaded operating points.

<figure class="research-figure">
  <img src="{{ '/assets/img/posts/mmab-cps-prototype.png' | relative_url }}" alt="Four-port MMAB converter laboratory prototype">
  <figcaption>Experimental platform used for loss-model and efficiency validation.</figcaption>
</figure>

## Measured performance

Tests from 0.2 to 2 kW across three representative operating conditions show a peak efficiency of 92.2% and a maximum improvement of 16.55%. The measured current reduction agrees with the predicted optimum and demonstrates that coordinated waveform shaping can recover efficiency without changing the converter hardware.

The agreement between calculated and measured loss also makes the optimization interpretable. The preferred setting can be traced to changes in waveform shape and individual loss mechanisms rather than an unexplained numerical output. Designers can therefore evaluate how a different semiconductor, transformer, or switching frequency would move the optimum.

<figure class="research-figure">
  <img src="{{ '/assets/img/posts/mmab-cps-waveforms.png' | relative_url }}" alt="Measured SPS and CPS current waveforms">
  <figcaption>Measured waveforms show the reduction in RMS and circulating current achieved by CPS.</figcaption>
</figure>

<div class="research-takeaway">
  <strong>Takeaway.</strong> A single shared control variable provides a practical route to lower RMS current and higher efficiency across asymmetric multiport operating conditions.
</div>

CPS offers a useful middle ground between basic SPS and high-dimensional modulation. It captures a large portion of the available efficiency improvement while retaining a compact control structure, making it attractive when predictable real-time execution is as important as the absolute optimum.

Published in **IEEE Journal of Emerging and Selected Topics in Power Electronics**, vol. 11, no. 4, pp. 3924–3936, August 2023.

[Read the paper on IEEE Xplore](https://ieeexplore.ieee.org/document/10132875/){: .btn }
