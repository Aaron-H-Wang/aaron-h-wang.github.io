# Haoyu Wang - Personal Website

Source for [aaron-h-wang.github.io](https://aaron-h-wang.github.io).

## Local development

1. Install Ruby and Bundler.
2. Run `bundle install`.
3. Run `bundle exec jekyll serve`.
4. Open `http://localhost:4000`.

Pushing the `main` branch deploys the site through the included GitHub Pages workflow.

## Writing posts

Create posts in `_posts` using a filename such as `2026-08-11-my-post.md`. Every post should use exactly one of the two site categories:

```yaml
---
layout: post
title: "Post Title"
summary: "Short card description."
categories:
  - Research # or Life
---
```

Posts labeled `Research` appear at `/research/`; posts labeled `Life` appear at `/life/`. A reusable starter is available in `_drafts/post-template.md`.
