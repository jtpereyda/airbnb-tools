# AirBnb Tools

## Turno Status

Fetch and tabulate summary data from recent turnovers.

```
> node ./turno.js
┌──────────────────────────┬────────────────┬──────────────────┬────────┬────────────┐
│                     Date │           Name │          Address │ Status │      Notes │
├──────────────────────────┼────────────────┼──────────────────┼────────┼────────────┤
│ Saturday, April  1, 2023 │  Bob C         │ 123 Main, USA #B │      ✔ │            │
│   Sunday, April  2, 2023 │ Sarah B        │ 123 Main, USA #C │      ✔ │ Very tidy. │
│   Sunday, April  2, 2023 │      Alex John │ 123 Main, USA #B │      ✔ │            │
│ Thursday, April  6, 2023 │      Alex John │ 123 Main, USA #C │      ✔ │        4/5 │
│   Friday, April  7, 2023 │  Jeremiah Joe  │ 123 Main, USA #B │      ✔ │            │
│ Saturday, April  8, 2023 │      Alex John │ 123 Main, USA #C │      ✔ │      3.5/5 │
│ Saturday, April  8, 2023 │  Bob C         │ 123 Main, USA #B │      ✔ │            │
│   Sunday, April  9, 2023 │  Bob C         │ 123 Main, USA #B │      ✔ │            │
│  Tuesday, April 11, 2023 │      Alex John │ 123 Main, USA #C │      ✔ │        4/5 │
│ Thursday, April 13, 2023 │  Bob C         │ 123 Main, USA #C │      ✔ │            │
│   Friday, April 14, 2023 │  Bob C         │ 123 Main, USA #B │      ✔ │            │
│ Saturday, April 15, 2023 │  Bob C         │ 123 Main, USA #C │      ✔ │            │
│ Saturday, April 15, 2023 │  Bob C         │ 123 Main, USA #B │      ✔ │            │
│   Sunday, April 16, 2023 │      Alex John │ 123 Main, USA #C │      ✔ │        4/5 │
│   Sunday, April 16, 2023 │  Bob C         │ 123 Main, USA #B │      ✔ │            │
│ Thursday, April 20, 2023 │  Jeremiah Joe  │ 123 Main, USA #B │      ✔ │            │
│   Monday, April 24, 2023 │  Bob C         │ 123 Main, USA #C │        │            │
│   Monday, April 24, 2023 │  Bob C         │ 123 Main, USA #B │        │            │
│     Monday, May  1, 2023 │  Bob C         │ 123 Main, USA #B │        │            │
└──────────────────────────┴────────────────┴──────────────────┴────────┴────────────┘

```

Uses a Turno session cookie, since not all this data is available via the API.