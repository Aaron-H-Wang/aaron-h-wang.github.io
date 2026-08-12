---
layout: post
title: "Universal Phase-Shift Optimization for MMAB Converters"
date: 2024-07-01
card-image: /assets/img/posts/mmab-ups-prototype.png
summary: "A scalable universal phase-shift scheme coordinates all bridge legs to achieve full ZVS and minimize RMS current in an N-port MMAB converter."
categories: Research
tags:
  - Research
  - Power Electronics
  - MMAB Converter
  - Modulation
---

<p class="research-intro">As the number of ports grows, MMAB modulation needs enough freedom to satisfy power flow, soft switching, and efficiency objectives simultaneously. This work develops a universal phase-shift (UPS) framework that scales naturally with port count.</p>

<p class="research-byline"><strong>Published in:</strong> <em>IEEE Transactions on Industrial Electronics</em>, vol. 71, no. 7, pp. 7312–7321, July 2024. <a href="https://ieeexplore.ieee.org/document/10242261/">View on IEEE Xplore</a>.</p>

<div class="research-metrics">
  <div><strong>2N−1</strong><span>independent phase-shift variables</span></div>
  <div><strong>94.53%</strong><span>maximum measured efficiency</span></div>
  <div><strong>20.49%</strong><span>maximum gain over SPS</span></div>
</div>

## A scalable modulation framework

UPS assigns phase shifts at the bridge-leg level, producing (2N-1) independent control variables for an N-port converter. Of these, (N-1) variables enforce the required port powers and full ZVS conditions; the remaining degree of freedom is used to minimize transformer RMS current.

The leg-level description unifies several familiar modulation schemes. SPS, dual-phase-shift, and more specialized multiport patterns can be interpreted as restricted subsets of the same phase space. UPS removes those artificial restrictions and exposes all modulation freedom available in the converter, which becomes increasingly valuable as new ports and operating constraints are added.

<figure class="research-figure">
  <img src="{{ '/assets/img/posts/mmab-ups-topology.png' | relative_url }}" alt="N-port MMAB converter under universal phase-shift modulation">
  <figcaption>Generalized N-port converter and the phase-shift variables used by UPS.</figcaption>
</figure>

## From constraints to an optimum

The paper formulates power transfer, soft-switching conditions, and current stress in a unified model. The optimization is then reduced to a tractable search over the remaining modulation freedom. Unlike strategies developed for a fixed port count, the same procedure applies when additional active bridges are added.

The variables are not all assigned to efficiency at once. Required dc power establishes equality constraints, and current polarity at switching instants establishes the ZVS constraints. Only solutions satisfying both are retained. The remaining freedom is then used to minimize the RMS currents that determine semiconductor and winding conduction loss.

This hierarchy avoids a weakness of unconstrained efficiency optimization: a mathematically low-current waveform is not useful if it misses a port-power command or loses soft switching. By treating power transfer and ZVS as hard requirements, UPS makes efficiency the objective only within a physically acceptable region.

<figure class="research-figure">
  <img src="{{ '/assets/img/posts/mmab-ups-prototype.png' | relative_url }}" alt="Four-port MMAB experimental setup for universal phase-shift modulation">
  <figcaption>Four-port prototype used to evaluate UPS under highly unequal operating conditions.</figcaption>
</figure>

## Efficiency under extreme conditions

Experiments cover three deliberately asymmetric voltage and power conditions. UPS maintains ZVS while substantially lowering RMS current; in one case, three port currents fall from 26.21, 26.31, and 27.64 A to 7.95, 13.21, and 18.57 A. The measured peak efficiency reaches 94.53%, with a maximum improvement of 20.49% over SPS.

The large current reduction is especially significant for multiport hardware because every port shares the magnetic structure. Lower RMS current reduces loss in bridge devices and transformer windings simultaneously, while relaxing thermal and current-rating requirements. The measured transitions confirm that this reduction is not obtained by sacrificing ZVS.

<figure class="research-figure">
  <img src="{{ '/assets/img/posts/mmab-ups-waveforms.png' | relative_url }}" alt="Experimental waveforms comparing SPS and UPS operation">
  <figcaption>Experimental waveforms confirm full ZVS and reduced current stress under UPS.</figcaption>
</figure>

<div class="research-takeaway">
  <strong>Takeaway.</strong> UPS uses the full modulation freedom of an MMAB converter to meet power commands, preserve soft switching, and reduce conduction loss within one scalable framework.
</div>

The formulation also provides a foundation for later controller designs. Objectives such as peak-current limitation, transformer flux balancing, or thermal sharing can be placed on top of the same constraint structure. UPS is therefore not only one optimized pattern; it is a systematic way to organize the feasible control space of an N-port converter.

For practical implementation, this organization also separates offline derivation from online decision-making. The generalized equations can be solved in advance to construct feasible maps or used inside a real-time optimizer, depending on the available processor and response requirement. Both approaches retain the same definitions of power, ZVS, and current stress.
