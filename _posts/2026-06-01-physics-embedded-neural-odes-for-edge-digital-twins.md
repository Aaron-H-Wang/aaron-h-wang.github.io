---
layout: post
title: "Physics-Embedded Neural ODEs for Edge Digital Twins"
card-image: /assets/img/posts/penode-framework.png
summary: "PENODE blends physical models with continuous-time residual learning for accurate, resource-efficient Sim-to-Real digital twins at the edge."
categories:
  - Research
tags:
  - Research
  - neural ODE
  - digital twins
  - edge AI
  - power electronics
---

<p class="research-intro">Edge digital twins must learn the difference between simulation and hardware without discarding the physics that makes a converter understandable. Physics-Embedded Neural ODEs, or PENODE, address that challenge by preserving the known continuous-time dynamics and learning only the missing behavior.</p>

<p class="research-byline"><strong>Authors:</strong> Jialin Zheng, Haoyu Wang, Yangbin Zeng, Di Mou, Xin Zhang, Hong Li, Sergio Vazquez, and Leopoldo G. Franquelo. Jialin Zheng and Haoyu Wang contributed equally.</p>

<div class="research-metrics" aria-label="Key results">
  <div><strong>0.99</strong><span>White-box R²</span></div>
  <div><strong>75%+</strong><span>Lower complexity</span></div>
  <div><strong>12.6 μs</strong><span>Edge latency</span></div>
  <div><strong>4.7×</strong><span>Inference speedup</span></div>
</div>

## Learning the model residual

Purely physical models are interpretable but cannot always represent parasitics, nonideal switching, temperature drift, and parameter mismatch. Black-box neural networks can fit these effects, yet they often need more data and may generalize poorly outside the training distribution.

PENODE combines both sources of knowledge:

1. A **physical ODE** describes the known converter dynamics.
2. A **Neural ODE** learns the continuous-time residual between simulation and experiment.
3. A **multi-mode event automaton** activates the correct dynamics at each switching event.
4. A cloud-to-edge workflow trains the model offline and deploys it for real-time inference.

<figure class="research-figure research-figure--wide">
  <img src="{{ '/assets/img/posts/penode-framework.png' | relative_url }}" alt="Physics-Embedded Neural ODE framework combining physical and learned continuous-time dynamics.">
  <figcaption>Fig. 1. PENODE retains the known physical model and uses a Neural ODE to correct the unknown residual dynamics.</figcaption>
</figure>

## One framework, three knowledge levels

The method was evaluated under white-box, gray-box, and black-box assumptions. The training data covered 1,200 converter trajectories spanning output-voltage references, load profiles, and disturbances, with a 70/20/10 training, validation, and test split.

In the white-box case, PENODE reached an R-squared score of **0.99**, compared with 0.95 for the physics-guided recurrent baseline. In the more practical gray-box case, PENODE achieved **0.97**, while the recurrent baseline reached 0.9088 and the incomplete physical model reached 0.68. The event-automata structure also reached an equivalent loss roughly 40 epochs earlier and reduced Neural ODE model complexity by more than 75%.

<figure class="research-figure research-figure--wide">
  <img src="{{ '/assets/img/posts/penode-sim-to-real.png' | relative_url }}" alt="Sim-to-Real comparison of PENODE and baseline models across white-box, gray-box, and black-box settings.">
  <figcaption>Fig. 2. PENODE tracks experimental current across in-domain and out-of-domain conditions while remaining effective as physical knowledge is reduced.</figcaption>
</figure>

## Designed for an edge digital twin

Using the proposed event-driven solver, the FPGA implementation completes one control-cycle inference in **12.6 μs**. It uses 19.2% of DSPs, 7.86% of BRAM, and 6.79% of LUTs—substantially less than the PINN and recurrent baselines. Relative to the slowest baseline, inference is 4.7× faster.

The model was then connected to a physical converter. It reproduced switch-level current dynamics under PI control and supplied high-frequency current estimates to MPC. The calibrated Sim-to-Real twin eliminated the overshoot produced by the uncalibrated simulation model and allowed the converter to reach its new operating point in one cycle.

## Why continuous-time learning helps

A fixed-step recurrent model learns a transition tied to one sampling interval. Changing that interval or encountering irregular switching events can require retraining. PENODE instead learns a derivative function that a compatible numerical solver can evaluate over different step sizes. The model therefore follows the converter's event timing while retaining a continuous representation between events.

Embedding the residual inside the ODE also creates a useful division of labor. Known circuit laws explain the dominant energy transfer, while the network focuses on parasitics and discrepancies that are difficult to parameterize. In white-box operation the correction remains small; as physical knowledge is removed, the learned component contributes more without changing the overall architecture.

<figure class="research-figure research-figure--compact">
  <img src="{{ '/assets/img/posts/penode-control-validation.png' | relative_url }}" alt="Experimental validation of PENODE edge-digital-twin prediction and model-predictive-control enhancement.">
  <figcaption>Fig. 3. Sim-to-Real calibration improves dynamic tracking and enables one-cycle control without direct high-frequency current sampling.</figcaption>
</figure>

## Why it matters

<div class="research-takeaway">
  <p><strong>PENODE treats physics as the structure of learning, not merely a penalty term.</strong> The result is a compact continuous-time model that can adapt from simulation to hardware and still execute on a resource-constrained edge device.</p>
</div>

Published in **IEEE Transactions on Industrial Electronics**, vol. 73, no. 6, pp. 8616–8627, June 2026.

[Read the paper on IEEE Xplore](https://ieeexplore.ieee.org/document/11358392/){: .btn }
