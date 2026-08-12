---
layout: post
title: "Reactive-Power Optimal Control for MMAB Converters"
date: 2024-08-01
card-image: /assets/img/posts/mmab-rpoc-platform.png
summary: "A high-frequency-link controller decouples active and reactive power, then minimizes circulating current online without relying on detailed converter parameters."
categories: Research
tags:
  - Research
  - Power Electronics
  - MMAB Converter
  - Reactive Power Control
---

<p class="research-intro">Reactive power in a high-frequency link raises RMS current and loss without contributing to the commanded dc power transfer. This work measures that hidden quantity directly and closes the loop around it.</p>

<p class="research-byline"><strong>Published in:</strong> <em>IEEE Journal of Emerging and Selected Topics in Industrial Electronics</em>, vol. 5, no. 3, pp. 1333–1337, July 2024. <a href="https://ieeexplore.ieee.org/document/10319663/">View on IEEE Xplore</a>.</p>

<div class="research-metrics">
  <div><strong>2 loops</strong><span>decoupled active/reactive control</span></div>
  <div><strong>4 ports</strong><span>HIL validation platform</span></div>
  <div><strong>36.72→23.24 A</strong><span>total RMS current in Condition I</span></div>
</div>

## Measuring what matters

A frequency-domain model separates active power from fundamental reactive power in the common high-frequency link. Dedicated analog conditioning circuits extract the required power information from nonsinusoidal bridge voltage and current waveforms, giving the controller real-time feedback without a computationally heavy harmonic calculation.

<figure class="research-figure">
  <img src="{{ '/assets/img/posts/mmab-rpoc-control.png' | relative_url }}" alt="Reactive-power optimal control architecture and signal-conditioning circuits">
  <figcaption>Dual-loop control architecture and high-frequency signal-conditioning hardware.</figcaption>
</figure>

## Parameter-independent online optimization

The active-power loop maintains the requested energy transfer among ports, while the reactive-power loop adjusts modulation toward the minimum circulating-current condition. Because the optimum is found from measured power information, the online controller does not require accurate leakage-inductance or device-loss parameters.

<figure class="research-figure">
  <img src="{{ '/assets/img/posts/mmab-rpoc-platform.png' | relative_url }}" alt="Four-port hardware-in-the-loop validation platform">
  <figcaption>Four-port hardware-in-the-loop platform used for dynamic and steady-state validation.</figcaption>
</figure>

## Validation across operating conditions

Across three test conditions, the method reduces the summed transformer-port RMS current from 36.72, 37.73, and 40.08 A under SPS to 23.24, 25.51, and 28.75 A, respectively. The measurements also confirm ZVS at every port for the evaluated cases.

<figure class="research-figure">
  <img src="{{ '/assets/img/posts/mmab-rpoc-results.png' | relative_url }}" alt="Measured current waveforms comparing SPS and reactive-power optimal control">
  <figcaption>Condition I measurements show the reduction in circulating current from SPS to RPOC.</figcaption>
</figure>

<div class="research-takeaway">
  <strong>Takeaway.</strong> Direct high-frequency-link feedback turns reactive-power minimization into a robust online control objective, reducing current stress without relying on a finely calibrated converter model.
</div>
