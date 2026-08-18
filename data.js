/**
 * data.js
 * -----------------------------------------------------------------------
 * Transfer-path database for the MTA Transfer Time app.
 *
 * IMPORTANT — DATA ACCURACY DISCLAIMER
 * The MTA does not publish a structured, station-by-station dataset of
 * walking times or stair counts for in-station transfers (their GTFS
 * feed only gives a single "minimum transfer time" per station, with no
 * per-path detail and no stair/pathway info). The figures below are
 * planning-grade ESTIMATES assembled from general knowledge of these
 * stations, not official measurements. Treat them as a starting point,
 * not ground truth — and see "Extending this data" at the bottom of
 * this file for how to correct or add entries once you've verified
 * numbers in the field or against MTA station plans.
 *
 * Schema
 * -----------------------------------------------------------------------
 * STATIONS: Array<Station>
 *
 * Station {
 *   id: string                 // slug, used in the URL/select
 *   name: string                // display name
 *   complexLines: string[]      // every line served anywhere in the complex
 *   transfers: Transfer[]       // every walkable path between line groups
 * }
 *
 * Transfer {
 *   from: string                // origin platform label, e.g. "1/2/3 (uptown/downtown)"
 *   fromLines: string[]         // line bullets at the origin platform
 *   to: string                  // destination platform label
 *   toLines: string[]           // line bullets at the destination platform
 *   walkTimeMin: number         // estimated one-way walking time, in minutes
 *   stairsUp: number            // number of separate up-flights encountered
 *   stairsDown: number          // number of separate down-flights encountered
 *   elevator: boolean           // true if an elevator/ADA path is available
 *   distanceNote: string        // short human description of the route
 * }
 */

const STATIONS = [
  {
    id: "times-sq-42",
    name: "Times Sq–42 St / 42 St–Port Authority",
    complexLines: ["1", "2", "3", "7", "N", "Q", "R", "W", "S", "A", "C", "E"],
    transfers: [
      {
        from: "1/2/3 platforms",
        fromLines: ["1", "2", "3"],
        to: "N/Q/R/W platforms",
        toLines: ["N", "Q", "R", "W"],
        walkTimeMin: 4,
        stairsUp: 1,
        stairsDown: 1,
        elevator: true,
        distanceNote: "Via the mezzanine under Broadway; wide but often crowded."
      },
      {
        from: "1/2/3 platforms",
        fromLines: ["1", "2", "3"],
        to: "A/C/E (42 St–Port Authority)",
        toLines: ["A", "C", "E"],
        walkTimeMin: 7,
        stairsUp: 1,
        stairsDown: 2,
        elevator: true,
        distanceNote: "Long east-west passageway under 8th Ave; this is one of the system's longest in-system transfers."
      },
      {
        from: "7 platform",
        fromLines: ["7"],
        to: "N/Q/R/W platforms",
        toLines: ["N", "Q", "R", "W"],
        walkTimeMin: 5,
        stairsUp: 1,
        stairsDown: 1,
        elevator: false,
        distanceNote: "Down from the 7's deep mezzanine, then west along the shuttle passage."
      },
      {
        from: "N/Q/R/W platforms",
        fromLines: ["N", "Q", "R", "W"],
        to: "S (42 St Shuttle)",
        toLines: ["S"],
        walkTimeMin: 3,
        stairsUp: 0,
        stairsDown: 1,
        elevator: false,
        distanceNote: "Short walk to the shuttle platform on the north side of the complex."
      }
    ]
  },
  {
    id: "union-sq-14",
    name: "14 St–Union Sq",
    complexLines: ["4", "5", "6", "L", "N", "Q", "R", "W"],
    transfers: [
      {
        from: "4/5/6 platforms",
        fromLines: ["4", "5", "6"],
        to: "L platform",
        toLines: ["L"],
        walkTimeMin: 4,
        stairsUp: 1,
        stairsDown: 1,
        elevator: true,
        distanceNote: "Via the west mezzanine; well-signed but can bottleneck at rush hour."
      },
      {
        from: "4/5/6 platforms",
        fromLines: ["4", "5", "6"],
        to: "N/Q/R/W platforms",
        toLines: ["N", "Q", "R", "W"],
        walkTimeMin: 3,
        stairsUp: 1,
        stairsDown: 1,
        elevator: true,
        distanceNote: "Short cross-platform-adjacent walk through the main mezzanine."
      },
      {
        from: "L platform",
        fromLines: ["L"],
        to: "N/Q/R/W platforms",
        toLines: ["N", "Q", "R", "W"],
        walkTimeMin: 5,
        stairsUp: 1,
        stairsDown: 2,
        elevator: false,
        distanceNote: "Longest of the three pairs in this complex; cuts across two mezzanines."
      }
    ]
  },
  {
    id: "fulton-st",
    name: "Fulton St",
    complexLines: ["2", "3", "4", "5", "A", "C", "J", "Z"],
    transfers: [
      {
        from: "2/3 platform",
        fromLines: ["2", "3"],
        to: "4/5 platform",
        toLines: ["4", "5"],
        walkTimeMin: 3,
        stairsUp: 1,
        stairsDown: 1,
        elevator: true,
        distanceNote: "Through the renovated Fulton Center concourse."
      },
      {
        from: "4/5 platform",
        fromLines: ["4", "5"],
        to: "A/C platform",
        toLines: ["A", "C"],
        walkTimeMin: 5,
        stairsUp: 1,
        stairsDown: 2,
        elevator: true,
        distanceNote: "Across the Fulton Center dome concourse, then down to the A/C level."
      },
      {
        from: "A/C platform",
        fromLines: ["A", "C"],
        to: "J/Z platform",
        toLines: ["J", "Z"],
        walkTimeMin: 6,
        stairsUp: 2,
        stairsDown: 1,
        elevator: false,
        distanceNote: "Longest path in the complex; involves the Dey St passageway toward Broadway."
      }
    ]
  },
  {
    id: "atlantic-barclays",
    name: "Atlantic Av–Barclays Ctr",
    complexLines: ["2", "3", "4", "5", "B", "D", "N", "Q", "R", "W"],
    transfers: [
      {
        from: "2/3/4/5 platforms",
        fromLines: ["2", "3", "4", "5"],
        to: "B/Q platforms",
        toLines: ["B", "Q"],
        walkTimeMin: 5,
        stairsUp: 1,
        stairsDown: 1,
        elevator: true,
        distanceNote: "Via the main below-grade concourse near the Barclays Center entrance."
      },
      {
        from: "2/3/4/5 platforms",
        fromLines: ["2", "3", "4", "5"],
        to: "N/R/W (DeKalb-bound)",
        toLines: ["N", "R", "W"],
        walkTimeMin: 6,
        stairsUp: 1,
        stairsDown: 2,
        elevator: false,
        distanceNote: "One of the longer walks in the complex; follow signs toward Flatbush Ave."
      }
    ]
  },
  {
    id: "jay-st-metrotech",
    name: "Jay St–MetroTech",
    complexLines: ["A", "C", "F", "R"],
    transfers: [
      {
        from: "A/C platform",
        fromLines: ["A", "C"],
        to: "F platform",
        toLines: ["F"],
        walkTimeMin: 3,
        stairsUp: 1,
        stairsDown: 1,
        elevator: true,
        distanceNote: "Short walk through the main mezzanine."
      },
      {
        from: "A/C platform",
        fromLines: ["A", "C"],
        to: "R platform",
        toLines: ["R"],
        walkTimeMin: 4,
        stairsUp: 1,
        stairsDown: 1,
        elevator: true,
        distanceNote: "R platform sits slightly deeper; one extra stair run vs. the F transfer."
      }
    ]
  },
  {
    id: "broadway-junction",
    name: "Broadway Junction",
    complexLines: ["A", "C", "J", "Z", "L"],
    transfers: [
      {
        from: "A/C platform",
        fromLines: ["A", "C"],
        to: "L platform",
        toLines: ["L"],
        walkTimeMin: 4,
        stairsUp: 1,
        stairsDown: 0,
        elevator: false,
        distanceNote: "Elevated-to-elevated walkway; mostly flat once you're up top."
      },
      {
        from: "A/C platform",
        fromLines: ["A", "C"],
        to: "J/Z platform",
        toLines: ["J", "Z"],
        walkTimeMin: 5,
        stairsUp: 2,
        stairsDown: 0,
        elevator: false,
        distanceNote: "Longer elevated walkway connecting the two el structures."
      }
    ]
  },
  {
    id: "59-columbus-circle",
    name: "59 St–Columbus Circle",
    complexLines: ["A", "B", "C", "D", "1"],
    transfers: [
      {
        from: "1 platform",
        fromLines: ["1"],
        to: "A/B/C/D platforms",
        toLines: ["A", "B", "C", "D"],
        walkTimeMin: 3,
        stairsUp: 0,
        stairsDown: 1,
        elevator: true,
        distanceNote: "Short walk via the shopping-concourse level."
      }
    ]
  },
  {
    id: "grand-central-42",
    name: "Grand Central–42 St",
    complexLines: ["4", "5", "6", "7", "S"],
    transfers: [
      {
        from: "4/5/6 platforms",
        fromLines: ["4", "5", "6"],
        to: "7 platform",
        toLines: ["7"],
        walkTimeMin: 4,
        stairsUp: 1,
        stairsDown: 1,
        elevator: true,
        distanceNote: "Via the main mezzanine beneath 42nd St."
      },
      {
        from: "4/5/6 platforms",
        fromLines: ["4", "5", "6"],
        to: "S (Times Sq Shuttle)",
        toLines: ["S"],
        walkTimeMin: 3,
        stairsUp: 0,
        stairsDown: 1,
        elevator: false,
        distanceNote: "Short walk to the shuttle's east end platform."
      }
    ]
  },
  {
    id: "34-herald-sq",
    name: "34 St–Herald Sq",
    complexLines: ["B", "D", "F", "M", "N", "Q", "R", "W"],
    transfers: [
      {
        from: "B/D/F/M platforms",
        fromLines: ["B", "D", "F", "M"],
        to: "N/Q/R/W platforms",
        toLines: ["N", "Q", "R", "W"],
        walkTimeMin: 3,
        stairsUp: 1,
        stairsDown: 1,
        elevator: false,
        distanceNote: "Cross via the island mezzanine in the middle of the complex."
      }
    ]
  },
  {
    id: "court-sq",
    name: "Court Sq",
    complexLines: ["7", "E", "M", "G"],
    transfers: [
      {
        from: "7 platform",
        fromLines: ["7"],
        to: "E/M platform",
        toLines: ["E", "M"],
        walkTimeMin: 4,
        stairsUp: 1,
        stairsDown: 1,
        elevator: false,
        distanceNote: "Connecting passage between the elevated 7 and the underground E/M."
      },
      {
        from: "E/M platform",
        fromLines: ["E", "M"],
        to: "G platform",
        toLines: ["G"],
        walkTimeMin: 3,
        stairsUp: 1,
        stairsDown: 0,
        elevator: false,
        distanceNote: "Short connector within the underground portion of the complex."
      }
    ]
  },
  {
    id: "canal-st",
    name: "Canal St",
    complexLines: ["A", "C", "E", "J", "Z", "N", "Q", "R", "W", "6"],
    transfers: [
      {
        from: "6 platform",
        fromLines: ["6"],
        to: "N/Q/R/W platforms",
        toLines: ["N", "Q", "R", "W"],
        walkTimeMin: 4,
        stairsUp: 1,
        stairsDown: 1,
        elevator: false,
        distanceNote: "Via the Lafayette St mezzanine."
      },
      {
        from: "N/Q/R/W platforms",
        fromLines: ["N", "Q", "R", "W"],
        to: "J/Z platform",
        toLines: ["J", "Z"],
        walkTimeMin: 3,
        stairsUp: 1,
        stairsDown: 0,
        elevator: false,
        distanceNote: "Adjacent platforms, short crossover."
      },
      {
        from: "N/Q/R/W platforms",
        fromLines: ["N", "Q", "R", "W"],
        to: "A/C/E platform",
        toLines: ["A", "C", "E"],
        walkTimeMin: 6,
        stairsUp: 1,
        stairsDown: 2,
        elevator: false,
        distanceNote: "Longest walk in this complex; crosses under Canal St to the 6th Ave line."
      }
    ]
  },
  {
    id: "w4-wash-sq",
    name: "W 4 St–Wash Sq",
    complexLines: ["A", "C", "E", "B", "D", "F", "M"],
    transfers: [
      {
        from: "A/C/E platform",
        fromLines: ["A", "C", "E"],
        to: "B/D/F/M platform",
        toLines: ["B", "D", "F", "M"],
        walkTimeMin: 4,
        stairsUp: 1,
        stairsDown: 1,
        elevator: true,
        distanceNote: "Via the upper mezzanine; the two platform levels stack directly."
      }
    ]
  },
  {
    id: "chambers-wtc",
    name: "Chambers St / WTC / Park Pl / Cortlandt complex",
    complexLines: ["A", "C", "2", "3", "E", "R", "W"],
    transfers: [
      {
        from: "A/C platform",
        fromLines: ["A", "C"],
        to: "2/3 platform",
        toLines: ["2", "3"],
        walkTimeMin: 3,
        stairsUp: 1,
        stairsDown: 1,
        elevator: true,
        distanceNote: "Short connection at Chambers St proper."
      },
      {
        from: "2/3 platform",
        fromLines: ["2", "3"],
        to: "E (WTC) / R/W (Cortlandt)",
        toLines: ["E", "R", "W"],
        walkTimeMin: 8,
        stairsUp: 1,
        stairsDown: 1,
        elevator: true,
        distanceNote: "Long underground walk through the Fulton/WTC corridor network — allow extra time."
      }
    ]
  },
  {
    id: "149-grand-concourse",
    name: "149 St–Grand Concourse",
    complexLines: ["2", "4", "5"],
    transfers: [
      {
        from: "2 platform",
        fromLines: ["2"],
        to: "4/5 platforms",
        toLines: ["4", "5"],
        walkTimeMin: 3,
        stairsUp: 1,
        stairsDown: 1,
        elevator: true,
        distanceNote: "Cross-platform-adjacent transfer via a short stairway."
      }
    ]
  },
  {
    id: "nevins-st",
    name: "Nevins St",
    complexLines: ["2", "3", "4", "5"],
    transfers: [
      {
        from: "2/5 platform",
        fromLines: ["2", "5"],
        to: "3/4 platform",
        toLines: ["3", "4"],
        walkTimeMin: 2,
        stairsUp: 0,
        stairsDown: 0,
        elevator: false,
        distanceNote: "Same-level cross-platform transfer — no stairs needed."
      }
    ]
  },
  {
    id: "hoyt-schermerhorn",
    name: "Hoyt–Schermerhorn",
    complexLines: ["A", "C", "G"],
    transfers: [
      {
        from: "A/C platform",
        fromLines: ["A", "C"],
        to: "G platform",
        toLines: ["G"],
        walkTimeMin: 2,
        stairsUp: 0,
        stairsDown: 0,
        elevator: false,
        distanceNote: "Same-level cross-platform transfer — no stairs needed."
      }
    ]
  }
];

/**
 * Extending this data
 * -----------------------------------------------------------------------
 * To add or correct a station, push a new object onto STATIONS following
 * the schema above. A few tips:
 *   - Keep "from"/"to" labels short and line-grouped, matching how riders
 *     actually think about a platform ("4/5/6 platforms", not "level 2").
 *   - walkTimeMin should be a brisk-but-not-running walking pace.
 *   - Count stairsUp/stairsDown as separate flights, not steps. An
 *     escalator running the same direction as a stair counts too — riders
 *     care about the change in level, not the mechanism.
 *   - Set elevator: true only if there's a continuous ADA-accessible path
 *     for that specific transfer (not just "the station has an elevator
 *     somewhere").
 *   - Good sources for verifying real figures: on-site measurement,
 *     MTA station renovation plans/environmental filings (which sometimes
 *     include pathway diagrams), and NYC's Vision Zero / DCP pedestrian
 *     mobility studies.
 */