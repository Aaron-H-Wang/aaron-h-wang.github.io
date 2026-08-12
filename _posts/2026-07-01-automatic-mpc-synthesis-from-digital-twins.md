---
layout: post
title: "Automatically Synthesizing MPC from Digital Twins"
card-image: /assets/img/posts/hypermcp-workflow.png
summary: "A digital-twin-driven workflow turns a circuit netlist into an FPGA-ready predictive controller, cutting engineering time by 95.4%."
categories:
  - Research
tags:
  - Research
  - digital twins
  - model predictive control
  - automated design
  - FPGA
---

<p class="research-intro">Model predictive control can deliver excellent converter performance, but building each controller still demands extensive modeling, derivation, optimization, coding, and hardware verification. This research develops an end-to-end digital-twin workflow that automates that path from circuit description to an FPGA-ready controller.</p>

<p class="research-byline"><strong>Authors:</strong> Jialin Zheng, Haoyu Wang, Yangbin Zeng, Han Xu, Di Mou, Hong Li, Patrick Wheeler, Sergio Vazquez, and Leopoldo G. Franquelo. Jialin Zheng and Haoyu Wang contributed equally.</p>

<div class="research-metrics" aria-label="Key results">
  <div><strong>95.4%</strong><span>Less design time</span></div>
  <div><strong>1.12 μs</strong><span>FPGA prediction</span></div>
  <div><strong>8–9</strong><span>Settling cycles</span></div>
  <div><strong>1500 W</strong><span>Prototype power</span></div>
</div>

## From a netlist to control hardware

The framework begins with the converter topology, parameters, modulation scheme, and performance objectives. A high-fidelity digital twin is generated programmatically from the circuit netlist and used to create training and verification data. Two components then make real-time MPC practical:

1. A **physics-neural hybrid predictor** combines a lightweight physical update with a learned residual correction.
2. A **gradient-free simplex search optimizer** explores the modulation variables without requiring a hand-derived gradient model.
3. Quantization-aware training and high-level synthesis convert the predictor into an FPGA IP core.
4. The predictor, optimizer, state monitoring, and plant interface are integrated into a cloud-to-edge workflow.

<figure class="research-figure research-figure--wide">
  <img src="{{ '/assets/img/posts/hypermcp-workflow.png' | relative_url }}" alt="End-to-end digital-twin-driven workflow from a dual-active-bridge converter model to FPGA model predictive control.">
  <figcaption>Fig. 1. Circuit information flows through digital-twin generation, predictor training, hardware synthesis, and embedded MPC deployment.</figcaption>
</figure>

## A predictor built for real time

The physics-neural hybrid predictor evaluates only eight points per control cycle. On FPGA it completes a prediction in **1.12 μs**, more than seven times faster than the 100 kHz converter's real-time requirement. Across the triple-phase-shift control space, the mean relative errors are 0.05% for output voltage and 0.18% for inductor current.

The framework was validated on a **1500 W dual-active-bridge converter** operating at 100 kHz over a 16–32 V output range. Under both load and voltage-reference changes, the synthesized DT-MPC reached steady state in eight or nine switching cycles. It also maintained zero-voltage switching across all eight devices and remained robust under ±20% parameter mismatch.

<figure class="research-figure research-figure--wide">
  <img src="{{ '/assets/img/posts/hypermcp-dynamic-response.png' | relative_url }}" alt="Dynamic voltage, current, switching waveform, and phase-shift responses of the synthesized model predictive controller.">
  <figcaption>Fig. 2. Closed-loop responses show rapid voltage recovery, controlled inductor current, and coordinated phase-shift optimization.</figcaption>
</figure>

## Compressing the engineering workflow

Conventional MPC development was estimated at a median of **46 hours**, distributed across mode analysis, current derivation, discretization, soft-switching and stress analysis, objective construction, debugging, and validation.

The digital-twin workflow completes the same path in **127 minutes (about 2.1 hours)**, of which only 50 minutes require direct human work. Netlist-driven model construction, automated data generation, predictor training, and FPGA deployment together reduce total engineering time by 95.4%.

## How the synthesized controller is evaluated

Automation is useful only if it preserves engineering constraints. The workflow therefore evaluates the predictor across the full modulation space before deployment, checks quantized FPGA inference against the floating-point reference, and validates the closed loop under large load and voltage steps. Soft switching, current stress, output regulation, and efficiency remain visible objectives rather than hidden consequences of training.

The cloud and edge tasks are deliberately separated. Computationally intensive data generation and training run offline, while the deployed controller contains only the compact predictor and optimizer needed every switching cycle. When converter parameters or objectives change, the offline pipeline can regenerate the controller without redesigning each analytical stage by hand.

<figure class="research-figure research-figure--compact">
  <img src="{{ '/assets/img/posts/hypermcp-design-time.png' | relative_url }}" alt="Comparison of conventional model-predictive-control engineering time and the automated digital-twin workflow.">
  <figcaption>Fig. 3. Automation reduces a multi-day controller-development process to a little over two hours.</figcaption>
</figure>

## Why it matters

<div class="research-takeaway">
  <p><strong>The key result is repeatability as much as speed.</strong> By converting converter topology and design goals into a structured software-to-hardware pipeline, advanced MPC becomes easier to reproduce, update, and transfer to new systems.</p>
</div>

Published in **IEEE Transactions on Power Electronics** in 2026 (early access, pp. 1–17).

[Read the paper on IEEE Xplore](https://ieeexplore.ieee.org/document/11589405/){: .btn }
