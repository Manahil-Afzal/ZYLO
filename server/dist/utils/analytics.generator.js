"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLast12MonthsData = generateLast12MonthsData;
async function generateLast12MonthsData(model) {
    const last12Months = [];
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    for (let i = 11; i >= 0; i--) {
        const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 0, 23, 59, 59, 999);
        const monthYear = endDate.toLocaleString('default', { day: "numeric", month: "short", year: "numeric" });
        const count = await model.countDocuments({
            createdAt: {
                $gte: startDate,
                $lte: endDate,
            }
        });
        last12Months.push({ month: monthYear, count });
    }
    ;
    return { last12Months };
}
