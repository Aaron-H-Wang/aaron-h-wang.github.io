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

<figure class="research-figure">
  <img src="{{ '/assets/img/posts/mmab-zvs-topology.png' | relative_url }}" alt="Generalized N-port modular multi-active-bridge converter topology">
  <figcaption>Generalized MMAB structure used to derive a port-scalable ZVS model.</figcaption>
</figure>

## A unified operating-region model

The paper maps every switching condition into a compact phase-shift description. It first derives the complete ZVS region for an arbitrary number of ports, then introduces practical power-transfer constraints to obtain the region that is actually reachable during operation. The resulting inequalities make it possible to evaluate soft-switching capability directly from converter parameters and commanded power flow.

This separation between the <em>full</em> and <em>constrained</em> regions also clarifies why a converter may lose ZVS even when an unconstrained phase-shift solution appears feasible: the required combination may conflict with the demanded port powers.

<figure class="research-figure">
  <img src="{{ '/assets/img/posts/mmab-zvs-prototype.png' | relative_url }}" alt="Three-port MMAB converter experimental prototype">
  <figcaption>Three-port laboratory prototype used to validate the analytical boundaries.</figcaption>
</figure>

## Experimental validation

A three-port prototype was tested across multiple voltage ratios and load levels. Measured switching waveforms agree with the predicted boundary transitions and show how voltage mismatch narrows the usable ZVS region, especially at light load.

<figure class="research-figure">
  <img src="{{ '/assets/img/posts/mmab-zvs-waveforms.png' | relative_url }}" alt="Experimental switching waveforms demonstrating ZVS operation">
  <figcaption>Representative measurements inside and near the predicted ZVS boundaries.</figcaption>
</figure>

<div class="research-takeaway">
  <strong>Takeaway.</strong> The model turns a port-by-port switching problem into a scalable design tool, helping designers select voltage ratios and operating points that preserve soft switching over the intended power range.
</div>

