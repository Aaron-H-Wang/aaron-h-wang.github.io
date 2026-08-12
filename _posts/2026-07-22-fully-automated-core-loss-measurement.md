---
layout: post
title: "Fully Automated Core-Loss Measurement for Sub-MHz Magnetics"
mathjax: true
card-image: /assets/img/posts/automated-core-loss-system.png
summary: "A resonant measurement platform captures 1,320 core-loss data points in 20 seconds through switched capacitor sequences and onboard signal processing."
categories:
  - Research
tags:
  - magnetic core loss
  - automated measurement
  - power magnetics
  - COMPEL 2026
---

<p class="research-intro">High-frequency magnetic characterization is accurate only when the measurement itself keeps pace with the material. This project turns a traditionally manual resonant test into a fully automated, high-throughput measurement platform.</p>

<p class="research-byline"><strong>Authors:</strong> Haoyu Wang, Ethan Zheng, Alyssa Brown, Ziyang Xu, Yihao Wu, and Alex Hanson<br><strong>Presented at:</strong> IEEE Workshop on Control and Modeling for Power Electronics (COMPEL 2026)</p>

<div class="research-metrics" aria-label="Key results">
  <div><strong>1,320</strong><span>Valid points</span></div>
  <div><strong>20 s</strong><span>Acquisition time</span></div>
  <div><strong>4,000x</strong><span>Faster than manual</span></div>
  <div><strong>4</strong><span>Materials tested</span></div>
</div>

## Why automate resonant measurements?

Core loss strongly influences the efficiency, temperature, and size of high-frequency power converters. Resonant methods can characterize this loss accurately, but conventional testing requires repeated capacitor replacement, frequency tuning, oscilloscope capture, and FFT processing. The procedure is slow, equipment-dependent, and vulnerable to thermal drift.

The proposed system automates the entire sequence: capacitor selection, resonance search, drive-level sweep, fundamental-component extraction, and loss calculation.

<figure class="research-figure research-figure--wide">
  <img src="{{ '/assets/img/posts/automated-core-loss-system.png' | relative_url }}" alt="Architecture of the automated resonant core-loss measurement system, including switched capacitor sequences, conditioning circuits, and a digital signal processor.">
  <figcaption>Fig. 1. The resonant test circuit and onboard signal-processing architecture operate as one closed measurement loop.</figcaption>
</figure>

## The system in three layers

1. **Digitally switched capacitor sequences** reconfigure both the resonant and blocking capacitances, allowing the operating frequency to sweep without manual component replacement.
2. **High-frequency analog conditioning circuits** extract the magnitude and phase of the fundamental signals directly, avoiding oscilloscope-based FFT processing.
3. **A local DSP controller** commands the waveform generator and relays, fine-tunes resonance at every operating point, and calculates flux density and volumetric core loss.

The dual capacitor banks each contain ten independently controlled branches. In principle, this provides up to $2^{10}$ capacitance configurations while retaining the high sensitivity of the resonant method.

<figure class="research-figure research-figure--wide">
  <img src="{{ '/assets/img/posts/automated-core-loss-hardware.png' | relative_url }}" alt="Prototype PCB with power relays, switched capacitor branches, conditioning circuits, DSP board, and magnetic device under test.">
  <figcaption>Fig. 2. The prototype integrates relay-switched capacitor banks, analog conditioning, digital control, and the device under test on a single platform.</figcaption>
</figure>

## Accuracy across magnetic materials

The prototype was evaluated at 25 degrees Celsius using Fair-Rite 78, Fair-Rite 95, Fair-Rite 79, and TDK N87 ferrites over frequencies reaching 1 MHz. Measured loss curves closely follow the manufacturers' reference data across a wide range of flux density.

Most acquired points remain within a **±5% error band**, while the maximum observed deviation from the datasheet values is approximately **13%**. This agreement shows that automation does not trade away the accuracy of the underlying resonant technique.

<figure class="research-figure research-figure--wide">
  <img src="{{ '/assets/img/posts/automated-core-loss-validation.png' | relative_url }}" alt="Measured core-loss curves compared with manufacturer datasheet curves for four ferrite materials.">
  <figcaption>Fig. 3. Experimental measurements and manufacturer data for four ferrite materials across their representative frequency ranges.</figcaption>
</figure>

## High-throughput data acquisition

For Fair-Rite 78, the system swept 33 frequencies from 60 kHz to 1 MHz and evaluated 40 drive points at each frequency. The complete map contains **1,320 valid measurements collected in only 20 seconds**.

That is approximately **4,000 times faster** than a skilled operator taking one manual point per minute, and about **450 times faster** than a previously reported automated resonant platform. Rapid acquisition also limits device self-heating, helping keep material conditions consistent throughout a sweep.

<figure class="research-figure research-figure--wide">
  <img src="{{ '/assets/img/posts/automated-core-loss-speed.png' | relative_url }}" alt="Dense core-loss map for Fair-Rite 78 acquired from 60 kHz to 1 MHz in 20 seconds.">
  <figcaption>Fig. 4. A dense 1,320-point loss map acquired in a single 20-second automated run.</figcaption>
</figure>

## Why it matters

<div class="research-takeaway">
  <p><strong>The main contribution is a repeatable measurement pipeline, not simply a faster instrument.</strong> By combining resonant accuracy with hardware-controlled sweeping and local signal processing, the system can generate large, consistent datasets for magnetic design and data-driven loss modeling.</p>
</div>

The present relay implementation targets the sub-MHz range. The architecture itself can scale toward higher frequencies as switching devices with lower on-state resistance and off-state capacitance become available.

<p><a class="btn" href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=n_b7zXEAAAAJ&citation_for_view=n_b7zXEAAAAJ:j3f4tGmQtD8C">View the publication on Google Scholar</a></p>
