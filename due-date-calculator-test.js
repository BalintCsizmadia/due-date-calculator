describe("Testing the functionality", () => {
  let calculator = null;
  beforeEach(() => {
    calculator = new DueDateCalculator();
  }),
    it("should calculate due date: May 8, 2020, 14:00 -> Turnaround time: 16h -> May 12, 2020, 14:00", () => {
      const submitDate = new Date("May 8, 2020");
      submitDate.setHours(14);
      const result = calculator.calculateDueDate(submitDate, 16);

      const wantedResult = new Date("May 12, 2020");
      wantedResult.setHours(14);
      expect(result.getTime()).toBe(wantedResult.getTime());
    }),
    it("should calculate due date: May 5, 2020, 10:00 -> Turnaround time: 30h -> May 8, 2020, 16:00", () => {
      const submitDate = new Date("May 5, 2020");
      submitDate.setHours(10);
      const result = calculator.calculateDueDate(submitDate, 30);

      const wantedResult = new Date("May 8, 2020");
      wantedResult.setHours(16);
      expect(result.getDate()).toBe(wantedResult.getDate());
    }),
    it("should calculate due date: Aug 28, 2020, 15:00 -> Turnaround time: 24h -> Sep 2, 2020, 15:00", () => {
      const submitDate = new Date("Aug 28, 2020");
      submitDate.setHours(15);
      const result = calculator.calculateDueDate(submitDate, 24);

      const wantedResult = new Date("Sep 2, 2020");
      wantedResult.setHours(15);
      expect(result.getDay()).toBe(wantedResult.getDay());
    }),
    it("should return true if month changes", function () {
      const submitDate = new Date("Aug 28, 2020");
      submitDate.setHours(15);
      expect(submitDate.getMonth() === 7).toEqual(true);
      const result = calculator.calculateDueDate(submitDate, 24);
      expect(result.getMonth() === 8).toEqual(true);
    }),
    it('should throw "Invalid parameters" error', () => {
      expect(() =>
        calculator.calculateDueDate(new Date("May 8, 2020"), "16")
      ).toThrow(new Error("Invalid parameters"));
    }),
    it('should throw "Invalid submit date" error', () => {
      expect(() =>
        calculator.calculateDueDate(new Date("May 9, 2020"), 16)
      ).toThrow(new Error("Invalid submit date"));
    }),
    afterEach(() => {
      calculator = null;
    });
});
