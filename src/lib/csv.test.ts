import { describe, expect, it } from "vitest";
import { parseCsv } from "./csv";

describe("parseCsv", () => {
  it("splits rows and cells, dropping blank lines", () => {
    expect(parseCsv("a,b\r\n1,2\n\n3,4\n")).toEqual([
      ["a", "b"],
      ["1", "2"],
      ["3", "4"],
    ]);
  });

  it("keeps commas, quotes, and line breaks inside quoted cells", () => {
    expect(parseCsv('nama,catatan\n"Dr. Rina, M.Kom","kata ""halo""\nbaris dua"')).toEqual([
      ["nama", "catatan"],
      ["Dr. Rina, M.Kom", 'kata "halo"\nbaris dua'],
    ]);
  });

  it("reads semicolon files and strips the BOM", () => {
    expect(parseCsv("﻿hari;ruangan\nSenin;H.5.1")).toEqual([
      ["hari", "ruangan"],
      ["Senin", "H.5.1"],
    ]);
  });
});
