---
layout: post
title: "Learning Explicit Magnetic Core-Loss Equations from Data"
mathjax: true
card-image: /assets/img/posts/lssi-framework.png
summary: "LSSI discovers a four-term, physics-aware core-loss equation with 1.04% MAPE and an R-squared score of 0.9999."
categories:
  - Research
tags:
  - magnetic core loss
  - symbolic regression
  - machine learning
  - power electronics
---

<p class="research-intro">Can a model be as accurate as a neural network while remaining an equation that engineers can read, evaluate, and reason about? This recent research project explores that question for high-frequency magnetic core loss.</p>

<p class="research-byline"><strong>Authors:</strong> Haoyu Wang, Jialin Zheng, Yihao Wu, Ziyang Xu, and Alex Hanson</p>

<div class="research-metrics" aria-label="Key results">
  <div><strong>0.9999</strong><span>R-squared</span></div>
  <div><strong>1.04%</strong><span>Test MAPE</span></div>
  <div><strong>4</strong><span>Active terms</span></div>
  <div><strong>15</strong><span>Learned parameters</span></div>
</div>

## The modeling gap

Magnetic core loss increasingly limits the efficiency and thermal performance of high-frequency power converters. The classical Steinmetz Equation is compact and useful, but its fixed structure can miss nonlinear behavior over wide frequency and flux-density ranges. Modern machine-learning models improve accuracy, yet usually return a black box rather than a design equation.

The goal of **Learnable Symbolic Sparse Identification (LSSI)** is to retain both sides: the accuracy of data-driven learning and the transparency of an explicit analytical model.

<figure class="research-figure research-figure--wide">
  <img src="{{ '/assets/img/posts/lssi-framework.png' | relative_url }}" alt="Diagram of the LSSI framework, from experimental core-loss mapping through sparse symbolic regression and learnable parameter optimization to an explicit formula.">
  <figcaption>Fig. 1. LSSI jointly selects a small set of active physical terms and learns their nonlinear parameters.</figcaption>
</figure>

## LSSI in three steps

1. **Build a physics-aware library.** Candidate terms represent hysteresis, eddy-current, anomalous, saturation, cross-coupling, and bias effects.
2. **Learn structure and exponents together.** Sparse coefficients select the dominant mechanisms while learnable parameters capture the fractional power laws found in magnetic materials.
3. **Prune the equation.** AdamW-based joint optimization and thresholding remove uninformative terms, leaving a compact, non-negative loss model.

This is the key distinction from conventional symbolic regression: the candidate functions are not restricted to fixed integer exponents. Their internal parameters adapt continuously to the measured data while remaining bounded by physically meaningful ranges.

## What the framework discovered

For sinusoidal excitation, the identified normalized loss equation contains only four active contributions: a nonlinear hysteresis term, an eddy-current term, a saturation-sensitive power term, and a small flux-density term.

<div class="formula-scroll">
$$

P_{v,n} =\xi_1^* f_n^{\alpha_h^*}B_n^{\beta_h^*+\gamma_h^*\ln(B_n+\epsilon_h)}R_h(f)
+\xi_2^*f_n^{\alpha_e^*}B_n^{\beta_e^*}R_e(f)
+\xi_4^*f_n^{\alpha_s^*}B_n^{\beta_s^*}
+\xi_9^*B_n.

$$
</div>

The resulting expression uses **15 learned parameters**, compared with **4,417 parameters** in the feedforward neural-network baseline. More importantly, every retained term can be inspected and evaluated without running a black-box inference model.

## Experimental validation

The framework was evaluated using more than 1,000 experimental samples from Fair-Rite 95 ferrite cores under sinusoidal excitation at 25 degrees Celsius. The dataset was split into 80% training and 20% test data.

<figure class="research-figure research-figure--wide">
  <img src="{{ '/assets/img/posts/lssi-validation.png' | relative_url }}" alt="Experimental validation plots showing the core-loss measurement system, measured loss surface, predicted versus measured loss, residual distributions, and optimization trajectories.">
  <figcaption>Fig. 2. Experimental setup, measured loss surface, prediction accuracy, residual analysis, and optimization trajectories.</figcaption>
</figure>

Predicted and measured losses align closely across the operating range. The test residuals remain concentrated around zero, with no strong systematic trend against either flux density or frequency. This indicates that the compact equation preserves the dominant behavior without the complexity of a large statistical model.

<div class="research-table-wrap">
<table class="research-table">
  <thead>
    <tr><th>Model</th><th>MAPE</th><th>R-squared</th><th>Parameters</th><th>Active terms</th></tr>
  </thead>
  <tbody>
    <tr><td>Steinmetz Equation</td><td>10.92%</td><td>0.9868</td><td>3</td><td>1</td></tr>
    <tr><td>Random Forest</td><td>5.13%</td><td>0.9961</td><td>199,555</td><td>-</td></tr>
    <tr><td>Feedforward NN</td><td>1.37%</td><td>0.9996</td><td>4,417</td><td>-</td></tr>
    <tr><td>Fixed-parameter SSI</td><td>1.56%</td><td>0.9997</td><td>7 / 103</td><td>7</td></tr>
    <tr class="research-table__highlight"><td><strong>LSSI</strong></td><td><strong>1.04%</strong></td><td><strong>0.9999</strong></td><td><strong>15 / 24</strong></td><td><strong>4</strong></td></tr>
  </tbody>
</table>
</div>

<figure class="research-figure research-figure--compact">
  <img src="{{ '/assets/img/posts/lssi-comparison.png' | relative_url }}" alt="Radar chart comparing LSSI with the Steinmetz Equation, random forest, feedforward neural network, and fixed-parameter sparse symbolic identification.">
  <figcaption>Fig. 3. LSSI balances accuracy, interpretability, design simplicity, and implementation feasibility.</figcaption>
</figure>

## Why it matters

<div class="research-takeaway">
  <p><strong>The result is not merely a more accurate fit.</strong> It is a design-ready equation: fast to evaluate, compact enough to inspect, and structured around recognizable loss mechanisms.</p>
</div>

This makes LSSI promising for magnetic-material characterization and component design where both prediction quality and engineering intuition matter. Future work will extend the framework to temperature-dependent behavior and non-sinusoidal excitation.

[View the project source code on GitHub](https://github.com/Aaron-H-Wang/LSSI){: .btn }
