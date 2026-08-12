---
layout: post
title: "Mapping ZVS Operating Regions in Modular Multi-Active-Bridge Converters"
date: 2023-07-01
card-image: /assets/img/posts/mmab-zvs-prototype.png
summary: "A scalable analytical model reveals the complete and constrained zero-voltage-switching regions of an N-port MMAB converter under single-phase-shift control."
categories: Research
tags:
  - Research
  - Power Electronics
  - MMAB Converter
  - Zero-Voltage Switching
---

<p class="research-intro">How can the soft-switching boundaries of a multiport converter be described without rebuilding the analysis for every new port count? This work develops a unified answer for modular multi-active-bridge (MMAB) converters under single-phase-shift control.</p>

<p class="research-byline"><strong>Published in:</strong> <em>IEEE Transactions on Industrial Electronics</em>, vol. 70, no. 7, pp. 6865–6875, July 2023. <a href="https://ieeexplore.ieee.org/document/9893537/">View on IEEE Xplore</a>.</p>

<div class="research-metrics">
  <div><strong>N-port</strong><span>generalized model</span></div>
  <div><strong>20 kHz</strong><span>prototype switching frequency</span></div>
  <div><strong>1–9 kW</strong><span>experimental output range</span></div>
</div>

## The challenge

An MMAB converter links several active bridges through a common high-frequency transformer. Zero-voltage switching (ZVS) is essential for efficient operation, but its boundary depends on port voltages, transferred powers, leakage inductances, and relative phase shifts. Direct time-domain case analysis quickly becomes unwieldy as the number of ports grows.

This is more than a mathematical inconvenience. When a switching device turns on before its output capacitance has discharged, part of the stored energy is dissipated during every transition. At high switching frequency, that loss raises temperature, limits power density, and can dominate light-load efficiency. Designers therefore need to know not only whether a nominal point achieves ZVS, but how much margin remains as voltages and port powers change.

<figure class="research-figure">
  <img src="{{ '/assets/img/posts/mmab-zvs-topology.png' | relative_url }}" alt="Generalized N-port modular multi-active-bridge converter topology">
  <figcaption>Generalized MMAB structure used to derive a port-scalable ZVS model.</figcaption>
</figure>

## A unified operating-region model

The paper maps every switching condition into a compact phase-shift description. It first derives the complete ZVS region for an arbitrary number of ports, then introduces practical power-transfer constraints to obtain the region that is actually reachable during operation. The resulting inequalities make it possible to evaluate soft-switching capability directly from converter parameters and commanded power flow.

This separation between the <em>full</em> and <em>constrained</em> regions also clarifies why a converter may lose ZVS even when an unconstrained phase-shift solution appears feasible: the required combination may conflict with the demanded port powers.

## How the map is constructed

The derivation starts from the piecewise-linear transformer currents created by the bridge voltages. Their values at each switching instant determine the direction of device current and, consequently, whether the next semiconductor transition can discharge the relevant output capacitance. Expressing those current signs with normalized phase shifts turns a collection of waveform cases into algebraic boundaries.

Power-balance equations are then superimposed on the switching boundaries. This second step matters because phase shifts are not freely selectable during operation: they must deliver the requested power at every port. The intersection of the ZVS inequalities with the power constraints yields a realizable operating map that can be evaluated without rerunning a detailed switching simulation.

<figure class="research-figure">
  <img src="{{ '/assets/img/posts/mmab-zvs-prototype.png' | relative_url }}" alt="Three-port MMAB converter experimental prototype">
  <figcaption>Three-port laboratory prototype used to validate the analytical boundaries.</figcaption>
</figure>

## Experimental validation

A three-port prototype was tested across multiple voltage ratios and load levels. Measured switching waveforms agree with the predicted boundary transitions and show how voltage mismatch narrows the usable ZVS region, especially at light load.

Inside the predicted region, the device voltage falls before the gate command arrives and the transition occurs with little voltage-current overlap. Close to or outside the boundary, residual voltage becomes visible in the measured waveform. This agreement verifies both the sign-based analytical model and the constrained-region construction.

<figure class="research-figure">
  <img src="{{ '/assets/img/posts/mmab-zvs-waveforms.png' | relative_url }}" alt="Experimental switching waveforms demonstrating ZVS operation">
  <figcaption>Representative measurements inside and near the predicted ZVS boundaries.</figcaption>
</figure>

<div class="research-takeaway">
  <strong>Takeaway.</strong> The model turns a port-by-port switching problem into a scalable design tool, helping designers select voltage ratios and operating points that preserve soft switching over the intended power range.
</div>

For system design, the map can be used before hardware is built to compare transformer ratios, leakage inductances, and allowable port-voltage windows. During operation, the same inequalities can support modulation selection or serve as constraints in an optimizer. Adding another active bridge changes the model dimension, but does not require inventing a new analysis method.
