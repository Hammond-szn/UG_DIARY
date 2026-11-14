# UG Calc — Project Journal

## What it does

A small University of Ghana CGPA calculator. The home page leads to a calculator where a student enters grade points for Levels 100–400 and sees an estimated CGPA and class.

## How to use it

Open `mycalc.html` in a browser and select **Check Your Grade Here**. Enter each level's grade point (0–4), then select **Calculate My CGPA**.

## Calculation

The calculator follows `syntax.py`:

`CGPA = (Level 100 + Level 200 + 2 × Level 300 + 2 × Level 400) / 6`

Class thresholds: First Class (≥ 3.6), Second Class Upper (≥ 3.0), Second Class Lower (≥ 2.0), Third Class (≥ 1.5), otherwise Pass.

## Main files

- `mycalc.html` — welcome page and link to the calculator.
- `cgpa-calculator.html` — grade inputs, calculation, and result.
- `syntax.py` — original command-line version of the calculation.
- `UG logo default_0.png` — repeating logo pattern in the page backgrounds.

The pages use plain HTML, CSS, and JavaScript, so no installation or server is needed to try them locally. The result is an estimate based on the entered grade points and weighting rules.
