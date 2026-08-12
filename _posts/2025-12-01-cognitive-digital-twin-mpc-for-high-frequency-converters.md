---
layout: post
title: "Cognitive Digital-Twin MPC for High-Frequency Converters"
card-image: /assets/img/posts/cdt-mpc-framework.png
summary: "A cognitive digital twin enables sensor-light model predictive control with three orders of magnitude higher estimation accuracy and one-cycle current dynamics."
categories:
  - Research
tags:
  - Research
  - digital twins
  - model predictive control
  - power electronics
  - FPGA
---

<p class="research-intro">A high-frequency power converter changes operating mode every few microseconds. Can its digital twin remain fast and accurate enough to participate directly in the control loop? This work develops a cognitive digital twin that identifies modes and parameters online, reconstructs internal states, and supplies them to model predictive control.</p>

<p class="research-byline"><strong>Authors:</strong> Jialin Zheng, Haoyu Wang, Yangbin Zeng, Han Xu, Di Mou, Hong Li, and Jose Rodriguez. Jialin Zheng and Haoyu Wang contributed equally.</p>

<div class="research-metrics" aria-label="Key results">
  <div><strong>1000×</strong><span>Accuracy gain</span></div>
  <div><strong>35×</strong><span>Faster inference</span></div>
  <div><strong>8</strong><span>Points per cycle</span></div>
  <div><strong>20 μs</strong><span>Current settling</span></div>
</div>

## From monitoring to control

Conventional digital twins commonly use fixed models and time-driven solvers. They are useful for monitoring, but their computational cost and sensitivity to parameter drift make safety-critical, closed-loop use difficult.

The proposed **Cognitive Digital Twin (CDT)** changes that architecture in three ways:

1. **Mode identification** follows the converter's switching events instead of advancing through many uniform time steps.
2. **Online parameter identification** continually reconfigures the model as the physical converter changes.
3. **Control enhancement** provides estimated high-frequency states directly to the MPC, reducing dependence on delayed sensor samples.

<figure class="research-figure research-figure--wide">
  <img src="{{ '/assets/img/posts/cdt-mpc-framework.png' | relative_url }}" alt="Comparison between a conventional digital twin and the proposed cognitive digital twin for power-converter control.">
  <figcaption>Fig. 1. The CDT combines mode identification, a mode-driven solver, parameter identification, and a reconfigurable model inside the control loop.</figcaption>
</figure>

## Fast, event-driven inference

Instead of resolving every switching period with hundreds of fixed steps, the CDT evaluates the system only at meaningful mode transitions. It needs **eight calculation points per switching cycle**, compared with 800, 400, and 200 points for first-, second-, and fourth-order fixed-step solvers in the tested setting.

On the FPGA implementation, this produces approximately **35× faster inference than state-of-the-art offline simulation** while improving estimation accuracy by roughly three orders of magnitude. The implementation occupies 19.2% of DSPs, 6.79% of LUTs, and 3.95% of BRAM on the target platform.

<figure class="research-figure research-figure--wide">
  <img src="{{ '/assets/img/posts/cdt-mpc-efficiency.png' | relative_url }}" alt="Accuracy and computation-time comparison of the cognitive digital twin and conventional numerical solvers.">
  <figcaption>Fig. 2. The mode-driven CDT reaches the high-accuracy, low-computation region that conventional fixed- and variable-step solvers cannot reach in real time.</figcaption>
</figure>

## Closing the loop

The framework was validated on a **50 kHz four-port multi-active-bridge converter**. Online identification recovered four inductances with a tolerance of 0.05%, allowing the reconfigurable model to remain aligned with the hardware.

When embedded in MPC, the estimated high-frequency currents reached their new steady state in one switching cycle—about **20 μs**—while the dc current settled in approximately 600 μs. Replacing sensor-aided sampling with a digital link also removed the roughly 2.5-cycle sampling delay; the communication path required only about 50 ns.

## What makes the twin cognitive?

The term describes a twin that does more than replay a fixed simulation. It observes switching commands and measured terminal quantities, identifies the active circuit mode, updates uncertain physical parameters, and changes its internal model before predicting the next state. Each layer has a distinct role: mode awareness supplies speed, parameter learning supplies long-term accuracy, and the reconfigurable model keeps those updates physically meaningful.

This separation also limits the amount of data required. The twin does not learn converter dynamics from scratch; it learns the small set of quantities that causes the physical model to diverge from the hardware. As a result, the controller receives estimates that remain interpretable and can be checked against circuit constraints.

<figure class="research-figure research-figure--compact">
  <img src="{{ '/assets/img/posts/cdt-mpc-control.png' | relative_url }}" alt="Experimental current and voltage waveforms under cognitive-digital-twin-assisted model predictive control.">
  <figcaption>Fig. 3. Experimental dynamic responses show fast state reconstruction and deadbeat current control under changing operating conditions.</figcaption>
</figure>

## Why it matters

<div class="research-takeaway">
  <p><strong>The digital twin is no longer only an observer.</strong> By combining online learning with event-driven physics, it becomes a real-time control component that can replace difficult measurements and adapt to hardware variation.</p>
</div>

Published in **IEEE Transactions on Industrial Electronics**, vol. 72, no. 12, pp. 13310–13321, December 2025.

[Read the paper on IEEE Xplore](https://ieeexplore.ieee.org/document/11077776/){: .btn }
