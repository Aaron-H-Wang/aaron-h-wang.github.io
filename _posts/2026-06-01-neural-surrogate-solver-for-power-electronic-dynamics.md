---
layout: post
title: "A Neural Surrogate Solver for Power-Electronic Dynamics"
card-image: /assets/img/posts/nss-framework.png
summary: "A neural surrogate solver replaces sequential numerical bottlenecks with FPGA-friendly inference, delivering 23× speedup and 60% resource savings."
categories:
  - Research
tags:
  - Research
  - neural solver
  - edge inference
  - FPGA
  - power electronics
---

<p class="research-intro">Real-time digital twins often spend most of their computation not on the physical model itself, but on repeatedly generating mode-dependent matrices and evaluating high-order numerical integration. This work asks whether those bottlenecks can be learned once, then executed efficiently at the edge.</p>

<p class="research-byline"><strong>Authors:</strong> Jialin Zheng, Haoyu Wang, Yangbin Zeng, Han Xu, Di Mou, Hong Li, Sergio Vazquez, and Leopoldo G. Franquelo. Jialin Zheng and Haoyu Wang contributed equally.</p>

<div class="research-metrics" aria-label="Key results">
  <div><strong>23×</strong><span>Total speedup</span></div>
  <div><strong>60%</strong><span>Resource saving</span></div>
  <div><strong>89.2%</strong><span>Lower cycle time</span></div>
  <div><strong>1 cycle</strong><span>MPC settling</span></div>
</div>

## Replacing solver bottlenecks

Traditional hybrid-system solvers perform a sequence of matrix construction, derivative evaluation, and high-order integration steps. These operations are accurate, but their sequential nature is difficult to accelerate and produces variable execution time.

The proposed **Neural Surrogate Solver (NSS)** uses two compact networks:

1. **NN model** maps the converter's switching state to mode-dependent system matrices.
2. **NN solver** predicts the high-order residual that corrects a lightweight first-order integration step.

The physical state update remains explicit, while the expensive numerical components become single-pass, parallelizable inference operations.

<figure class="research-figure research-figure--wide">
  <img src="{{ '/assets/img/posts/nss-framework.png' | relative_url }}" alt="Comparison of a conventional event-driven numerical solver and the proposed neural surrogate solver.">
  <figcaption>Fig. 1. NSS replaces online matrix generation and high-order sequential integration with two neural surrogates.</figcaption>
</figure>

## From algorithmic gain to hardware acceleration

The matrix network was trained on all 256 switching-mode mappings. The solver network used 512,000 trajectories generated from a high-accuracy Dormand–Prince reference, with both datasets divided into 70% training, 20% validation, and 10% testing.

On the same CPU, NSS was **3.2× faster** than the state-of-the-art event-driven solver. Mapping the parallel neural computation to FPGA provided a further **7.2× hardware acceleration**, giving an overall speedup of approximately 23× relative to the CPU event-driven baseline.

Unlike variable-step solvers, NSS also maintains a predictable execution time. Its one-cycle calculation time is 89.2% lower than the FPGA fourth-order solver and remains safely below the real-time deadline.

<figure class="research-figure research-figure--wide">
  <img src="{{ '/assets/img/posts/nss-hardware-efficiency.png' | relative_url }}" alt="FPGA computation time and hardware resource comparison for neural and conventional numerical solvers.">
  <figcaption>Fig. 2. NSS combines stable real-time execution with major reductions in DSP, memory, and logic use.</figcaption>
</figure>

## More room for control

Compared with the fourth-order FPGA baseline, NSS reduces DSP use by 72.5%, BRAM by 56.8%, and LUTs by 65.0%, corresponding to approximately **60% overall resource savings**. That leaves room for state estimation and control logic on the same edge device.

To demonstrate that the acceleration preserves useful dynamics, NSS was integrated into MPC for a dual-active-bridge converter. It supplied high-frequency current estimates in place of bandwidth-intensive sensors. During a load transition, the NSS-based MPC reached its new steady state within **one switching cycle**, compared with seven cycles under traditional PI control.

## Accuracy without unpredictable timing

For embedded control, worst-case execution time matters as much as average speed. Adaptive numerical solvers may take more internal steps when a switching event or fast transient occurs, producing latency precisely when the controller needs a new estimate. NSS uses a fixed neural dataflow at every event, so computation time remains stable and easier to schedule alongside PWM and protection logic.

The surrogate is also narrower than a black-box system model. It learns the expensive numerical operations while the surrounding state-space update and event structure remain explicit. This keeps the method portable: a new topology changes the offline training data and dimensions, but the edge implementation follows the same matrix-surrogate and residual-correction pipeline.

<figure class="research-figure research-figure--wide">
  <img src="{{ '/assets/img/posts/nss-control-response.png' | relative_url }}" alt="Experimental comparison of traditional PI control and model predictive control assisted by the neural surrogate solver.">
  <figcaption>Fig. 3. Fast edge inference turns the learned solver into a practical component of a one-cycle MPC loop.</figcaption>
</figure>

## Why it matters

<div class="research-takeaway">
  <p><strong>NSS moves numerical effort from online execution to offline learning.</strong> It preserves the converter's hybrid structure while converting sequential computation into hardware-friendly parallel inference.</p>
</div>

Published in **IEEE Transactions on Industrial Electronics**, vol. 73, no. 6, pp. 9523–9528, June 2026.

[Read the paper on IEEE Xplore](https://ieeexplore.ieee.org/document/11366028/){: .btn }
