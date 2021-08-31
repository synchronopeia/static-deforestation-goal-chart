# Static Deforestation Goal Chart

## TODO

### Bootstrap The Project

- [x] Start project (this README).
- [x] Outline "Design Document" section
- [x] Add "measurement" CSV file
- [x] Add definition CSV files
- [x] Create repository
- [x] Create "index" file and make all measurement and definition data available to it

### Generate Figures

- [x] Bootstrap the project
- [x] generate a blank SVG for each jurisdiction
- [ ] create a webpage to display all (blank) SVG's
- [ ] display the axes
- [ ] display "annual-deforestation-rate" RV as points

## Design Document

### Overview

Client possesses data for multiple administrative jurisdictions within multiple countries.

The dataset variables for this project consist of:

- annual deforestation rate 
- deforestation rate baseline
- deforestation rate goal

Client wishes to create an overlay plot with "year" as abscissa and "annual deforestation rate" as ordinate. Overlay plot will display "annual deforestation rate" by year. Additional layers will represent:

1. "deforestation rate baseline"
2. "deforestation rate goal" as regression line
3. projection of "deforestation rate goal" beyond 2017 

connected scatterplot